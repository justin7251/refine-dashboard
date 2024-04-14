import Add from "@mui/icons-material/Add";
import { useTable } from "@refinedev/core";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { PropertyCard, CustomButton } from "../../components";

export const PropertyList: React.FC = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable({
    sorters: {
      initial: [
        {
          field: "price",
          order: "desc",
        },
      ],
    },
  });

  const allProperties = data?.data ?? [];

  const currentPrice = sorters.find((item) => item.field === "price")?.order;

  const toggleSort = (field: string) => {
    setSorters([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };

  return (
    <Box>
      <Stack direction="row">
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          {!allProperties.length
              ? "There are no properties"
              : "All Properties"}
        </Typography>
        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
          mb={{ xs: "20px", sm: 0 }}
        >
          <CustomButton
              title={`Sort price ${
                  currentPrice === "asc" ? "↑" : "↓"
              }`}
              handleClick={() => toggleSort("price")}
              backgroundColor="#475be8"
              color="#fcfcfc"
          />
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center">
                <CustomButton
                    title="Add Property"
                    handleClick={() => navigate("/properties/create")}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    icon={<Add />}
                />
        </Stack>
      </Stack>
    </Box>
  )
}