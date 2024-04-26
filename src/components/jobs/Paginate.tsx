"use client";

import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

interface PaginateProps {
  pages: number;
  currentPage: number;
}

export default function Paginate({ pages, currentPage }: PaginateProps) {
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`?page=${value}`);
  };
  return (
    <Pagination
      count={pages}
      variant="outlined"
      color="primary"
      className="pagination"
      sx={{ display: "flex", justifyContent: "center" }}
      page={currentPage}
      onChange={handleChange}
    />
  );
}
