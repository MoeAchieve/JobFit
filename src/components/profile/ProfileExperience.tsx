"use client";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Experience from "./Experience";
import { IExperience } from "@/types";
import dayjs from "dayjs";
import ExperienceModal from "./ExperienceForm";

interface ExperienceProps {
  exp?: IExperience[];
}

export default function ProfileExperience({ exp }: ExperienceProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      mb={2}
      mr={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      {exp ? (
        exp
          .sort((a, b) => {
            return dayjs(b.from).diff(dayjs(a.from));
          })
          .map((experience) => (
            <Experience key={experience.id} exp={experience} />
          ))
      ) : (
        <Typography variant="body1">No experience added yet.</Typography>
      )}
      <Button
        variant="text"
        color="secondary"
        sx={{
          mt: 2,
        }}
        onClick={handleOpen}
      >
        + Add Experience
      </Button>
      <ExperienceModal mode="add" open={open} handleClose={handleClose} />
    </Box>
  );
}
