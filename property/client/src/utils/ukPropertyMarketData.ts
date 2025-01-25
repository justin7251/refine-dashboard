import axios from 'axios';

interface MarketUpdateData {
  averageSalePrice: number;
  salesPriceChange: number;
  averageRent: number;
  rentChange: number;
  topPerformingRegions: string[];
  lastUpdated: string;
}

const SPARQL_ENDPOINT = "https://landregistry.data.gov.uk/landregistry/query";

// Utility function to execute SPARQL queries
const executeSPARQLQuery = async (query: string) => {
  try {
    console.log('Executing SPARQL Query:', query);
    const response = await axios.post(
      SPARQL_ENDPOINT,
      `query=${encodeURIComponent(query)}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    
    // Log full response for inspection
    console.log('SPARQL Query Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('SPARQL Query Error:', error);
    return null;
  }
};

// Fetch Average Sale Price
const fetchSalePrice = async () => {
  const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX ukhpi: <http://landregistry.data.gov.uk/def/ukhpi/>

    SELECT (AVG(?price) AS ?averagePrice)
    WHERE {
      ?record ukhpi:averagePrice ?price .
      FILTER(xsd:float(?price) > 0)
    }
    LIMIT 1
  `;

  const result = await executeSPARQLQuery(query);
  
  // More robust parsing
  const price = result?.results?.bindings?.[0]?.averagePrice?.value;
  console.log('Parsed Average Price:', price);
  
  return price ? parseFloat(price) : 300000;
};

// Fetch Sales Price Change
const fetchSalesPriceChange = async () => {
  const query = `
    PREFIX ukhpi: <http://landregistry.data.gov.uk/def/ukhpi/>
    SELECT ?priceChange
    WHERE {
      ?s ukhpi:percentageChange ?priceChange .
    }
    LIMIT 1
  `;

  const result = await executeSPARQLQuery(query);
  return result?.results?.bindings[0]?.priceChange?.value || 1.2;
};

// Fetch Average Rent
const fetchRentData = async () => {
  const query = `
    PREFIX ukhpi: <http://landregistry.data.gov.uk/def/ukhpi/>
    SELECT ?averageRent
    WHERE {
      ?s ukhpi:averageRent ?averageRent .
      FILTER (?averageRent > 0)
    }
    LIMIT 1
  `;

  const result = await executeSPARQLQuery(query);
  return result?.results?.bindings[0]?.averageRent?.value || 1200;
};

// Fetch Rent Change
const fetchRentChange = async () => {
  const query = `
    PREFIX ukhpi: <http://landregistry.data.gov.uk/def/ukhpi/>
    SELECT ?rentChange
    WHERE {
      ?s ukhpi:rentPercentageChange ?rentChange .
    }
    LIMIT 1
  `;

  const result = await executeSPARQLQuery(query);
  return result?.results?.bindings[0]?.rentChange?.value || -0.5;
};

// Fetch Top Performing Regions
const fetchTopRegions = async () => {
  const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX ukhpi: <http://landregistry.data.gov.uk/def/ukhpi/>

    SELECT ?regionName (MAX(?priceIndex) AS ?maxPriceIndex)
    WHERE {
      ?region 
        rdfs:label ?regionName ;
        ukhpi:housePriceIndex ?priceIndex .
      
      FILTER(
        langMatches(lang(?regionName), "EN") &&
        ?regionName != "" &&
        xsd:float(?priceIndex) > 0
      )
    }
    GROUP BY ?regionName
    ORDER BY DESC(?maxPriceIndex)
    LIMIT 5
  `;

  const result = await executeSPARQLQuery(query);
  
  // More robust region extraction
  const regions = result?.results?.bindings?.map(
    binding => binding.regionName?.value
  ).filter(Boolean);

  console.log('Extracted Regions:', regions);
  
  return regions?.length > 0 
    ? regions 
    : ['London', 'Manchester', 'Bristol', 'Birmingham', 'Edinburgh'];
};

// Main function to fetch UK Property Market Updates
export const fetchUKPropertyMarketUpdates = async (): Promise<MarketUpdateData> => {
  try {
    const [
      averageSalePrice, 
      salesPriceChange, 
      averageRent, 
      rentChange, 
      topPerformingRegions
    ] = await Promise.all([
      fetchSalePrice(),
      fetchSalesPriceChange(),
      fetchRentData(),
      fetchRentChange(),
      fetchTopRegions()
    ]);

    return {
      averageSalePrice,
      salesPriceChange,
      averageRent,
      rentChange,
      topPerformingRegions,
      lastUpdated: new Date().toLocaleDateString()
    };
  } catch (error) {
    console.error('Failed to fetch UK property market data:', error);
    
    // Fallback data
    return {
      averageSalePrice: 300000,
      salesPriceChange: 1.2,
      averageRent: 1200,
      rentChange: -0.5,
      topPerformingRegions: ['London', 'Manchester', 'Bristol'],
      lastUpdated: new Date().toLocaleDateString()
    };
  }
}; 