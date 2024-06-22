"use client";

import { IJob } from "@/types";
import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ApplyModal from "./ApplyModal";
import dayjs from "dayjs";

function formatAsPostedX(dateString: string) {
  const date = dayjs(dateString);
  const now = dayjs();
  const differenceInDays = now.diff(date, "day");
  const differenceInHours = now.diff(date, "hour") % 24;
  const differenceInMinutes = now.diff(date, "minute") % 60;

  if (differenceInDays === 0) {
    if (differenceInHours === 0) {
      if (differenceInMinutes === 0) {
        return "just now";
      } else {
        return `${differenceInMinutes} minutes ago`;
      }
    } else {
      return `${differenceInHours} hours ago`;
    }
  } else {
    return `${differenceInDays} days ago`;
  }
}

export default function JobDetails({
  selectedJobId,
  jobDetails,
}: {
  selectedJobId: string;
  jobDetails: IJob[];
}) {
  const selectedJob = jobDetails.find((job) => job.id === selectedJobId);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!selectedJob) {
    return null;
  }

  return (
    <Grid item xs={12} md={8}>
      <Card elevation={0}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Image
              src={selectedJob.company?.image || "/images/nocompany.png"}
              width={50}
              height={50}
              alt={selectedJob.company?.image}
            />
            <Typography variant="h6">{selectedJob.company.name}</Typography>
          </Box>
          <Typography variant="h5">{selectedJob.title}</Typography>
          <Typography variant="body1">
            {selectedJob.company.location}
          </Typography>
          <Typography variant="body1">
            {formatAsPostedX(selectedJob.createdAt)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              my: 3,
              px: 6,
              py: 1,
              fontWeight: 600,
            }}
            onClick={handleOpen}
          >
            Apply
          </Button>

          <Divider />
          <Box my={2}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body1">{selectedJob.description}</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Job Type" secondary={selectedJob.type} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Location"
                  secondary={selectedJob.location}
                />
              </ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>
      <ApplyModal
        open={open}
        handleClose={handleClose}
        jobId={selectedJob.id}
      />
    </Grid>
  );
}
