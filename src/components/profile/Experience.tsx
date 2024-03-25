import { IExperience } from "@/types";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import ExperienceMenu from "./ExperienceMenu";
import dayjs from "dayjs";

interface ExperienceProps {
  exp: IExperience;
}

export default function Experience({ exp }: ExperienceProps) {
  const { company, title, type, from, to, description, length } = exp;

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 0,
        boxShadow: "none",
        display: "flex",
        border: "1px solid #e0e0e0",
        width: "100%",
        position: "relative",
      }}
    >
      <Image
        src={company.image || "/images/nocompany.png"}
        alt={company.name}
        width={50}
        height={50}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          ml: 2,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">
          {company.name} · {type}
        </Typography>
        <Typography variant="body2">
          {dayjs(from).format("MMMM YYYY")} to {dayjs(to).format("MMMM YYYY")}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <ExperienceMenu exp={exp} />
    </Card>
  );
}
