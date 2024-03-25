"use client";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { startTransition, useEffect, useState } from "react";
import Experience from "./Experience";
import { Controller, useForm } from "react-hook-form";
import { addExperienceSchema } from "@/lib/schemas";
import { ICompany, IExperience } from "@/types";
import { z } from "zod";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import ExperienceModal from "./ExperienceForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #eee",
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

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
