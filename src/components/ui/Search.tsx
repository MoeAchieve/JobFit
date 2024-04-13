"use client";

import {
  Box,
  Button,
  Divider,
  Input,
  InputAdornment,
} from "@mui/material";
import { GoSearch } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";

export default function SearchBar() {
  return (
    <Box
      border="1px solid #eee"
      p={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Input
        id="keyword"
        fullWidth
        placeholder="Search for jobs"
        startAdornment={
          <InputAdornment position="start">
            <GoSearch />
          </InputAdornment>
        }
        sx={{ flexGrow: 1, flexShrink: 1 }}
      />
      <Divider orientation="vertical" flexItem />
      <Input
        id="location"
        fullWidth
        placeholder="Location"
        startAdornment={
          <InputAdornment position="start">
            <FaLocationDot />
          </InputAdornment>
        }
        sx={{ flexGrow: 1, flexShrink: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ flexGrow: 0, flexShrink: 0 }}
      >
        Search
      </Button>
    </Box>
  );
}
