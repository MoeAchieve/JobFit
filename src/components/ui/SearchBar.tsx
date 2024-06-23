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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("keyword", keyword);
    if (location) {
      params.set("location", location);
    }

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <Box
      border="1px solid #eee"
      p={3}
      height="3rem"
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
        onChange={(e) => setKeyword(e.target.value)}
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
        onChange={(e) => setLocation(e.target.value)}
        sx={{ flexGrow: 1, flexShrink: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ flexGrow: 0, flexShrink: 0 }}
        onClick={handleSearch}
      >
        search
      </Button>
    </Box>
  );
}
