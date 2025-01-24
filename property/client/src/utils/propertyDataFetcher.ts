import axios from 'axios';

interface PropertyPriceData {
  year: number;
  averagePrice: number;
  averageRent: number;
  region?: string;
}

export const fetchLastYearPropertyData = async (): Promise<PropertyPriceData[]> => {
  try {
    // Adjust the API endpoint to match your backend
    const response = await axios.get('/api/v1/property-data/last-year');
    
    // Transform and validate the data
    const propertyData: PropertyPriceData[] = response.data.map((item: any) => ({
      year: new Date().getFullYear() - 1,
      averagePrice: parseFloat(item.averagePrice),
      averageRent: parseFloat(item.averageRent),
      region: item.region || 'National'
    }));

    // Store in localStorage for offline access
    localStorage.setItem('lastYearPropertyData', JSON.stringify(propertyData));

    return propertyData;
  } catch (error) {
    console.error('Failed to fetch property data:', error);
    
    // Fallback to localStorage if network request fails
    const storedData = localStorage.getItem('lastYearPropertyData');
    if (storedData) {
      return JSON.parse(storedData);
    }

    // Return default/mock data if no data is available
    return [{
      year: new Date().getFullYear() - 1,
      averagePrice: 0,
      averageRent: 0,
      region: 'National'
    }];
  }
};

// Optional: Function to retrieve stored data
export const getStoredPropertyData = (): PropertyPriceData[] => {
  const storedData = localStorage.getItem('lastYearPropertyData');
  return storedData ? JSON.parse(storedData) : [];
}; 