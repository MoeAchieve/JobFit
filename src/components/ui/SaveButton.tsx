"use client";

import { Button } from "@mui/material";
import { MouseEvent } from "react";

interface SaveButtonProps {
  show: boolean;
  handleCancle: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function SaveButton({ show, handleCancle }: SaveButtonProps) {
  return (
    <div
      style={{
        alignSelf: "flex-end",
      }}
      hidden={!show}
    >
      <Button
        variant="text"
        size="small"
        type="submit"
        onClick={handleCancle}
        color="secondary"
      >
        Cancle
      </Button>
      <Button
        variant="contained"
        size="small"
        sx={{ ml: 2 }}
        type="submit"
        color="secondary"
      >
        Save
      </Button>
    </div>
  );
}
