"use client";

import { IJob } from "@/types";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Image from "next/image";

interface Props {
  job: IJob;
  onJobClick: (jobId: string) => void;
}

export default function Job({
  job,
  onJobClick
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
        "&:hover": { cursor: "pointer", opacity: 0.9 },
      }}
      onClick={() => onJobClick(job.id)}
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
    </Card>
  );
}
