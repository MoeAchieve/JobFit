"use client";

import { IJob } from "@/types";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
// import LongMenu from "./Menu";
import Image from "next/image";

interface Props {
  job: IJob;
}

export default function Job({
  job
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        my: 1,
        display: "flex",
        alignItems: "center",
        px: 1,
      }}
    >
      <CardMedia
        sx={{
          maxWidth: "100%",
          height: "auto",
          p: 0,
          m: 0,
        }}
      >
        <Image
          src={job.company?.image || "/images/nocompany.png"}
          width={50}
          height={50}
          alt={job.company?.name}
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h6" style={{ fontWeight: 600 }} component="div">
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.company?.name} - {job.company?.location}
        </Typography>
        <Chip
          size="small"
          label={job.type}
          color="primary"
          variant="outlined"
          sx={{ my: 1 }}
        />
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          ml: "auto",
          mr: 2,
          px: 6,
          py: 1,
          fontWeight: 600
        }}
      >
        Apply
      </Button>
      {/* <LongMenu /> */}
    </Card>
  );
}
