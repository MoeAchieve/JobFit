"use client";

import { ICompany, IJob } from "@/types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { JOB_STATUS } from "@prisma/client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaBan, FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import { BiSolidArchiveOut } from "react-icons/bi";
import JobModal from "./JobModal";

const setColor = (status: string) => {
  switch (status) {
    case JOB_STATUS.Active:
      return "success";
    case JOB_STATUS.Expired:
      return "error";
    case JOB_STATUS.Archived:
      return "secondary";
    default:
      return "default";
  }
};

export default function JobsTable({ company }: { company: ICompany }) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [jobs, setJobs] = useState<IJob[] | []>([]);

  const handleArchive = async (id: string) => {
    setIsPending(true);
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: JOB_STATUS.Archived }),
    });
    const data = await res.json();
    if (!data.success) {
      toast.error("Failed to update job status");
      setIsPending(false);
      return;
    }
    const job: IJob = data.updatedJob;
    const updatedJob = jobs.map((j) => (j.id === job.id ? job : j));
    setJobs(updatedJob);
    setIsPending(false);
    toast.success("Job status updated successfully");
  };

  const handleActive = async (id: string) => {
    setIsPending(true);
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: JOB_STATUS.Active }),
    });
    const data = await res.json();
    if (!data.success) {
      toast.error("Failed to update job status");
      setIsPending(false);
      return;
    }
    const job: IJob = data.updatedJob;
    const updatedJob = jobs.map((j) => (j.id === job.id ? job : j));
    setJobs(updatedJob);
    setIsPending(false);
    toast.success("Job status updated successfully");
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(`/api/company/${company.id}/jobs`);
      const data = await res.json();
      setJobs(data.jobs);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <Box
        my={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="500" gutterBottom>
          Posted Jobs
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          Post Job
        </Button>
      </Box>
      {jobs.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={3}>
          <Typography variant="h6" color="textSecondary">
            No jobs posted yet
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job: IJob) => (
                <TableRow key={job.id}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Chip label={job.status} color={setColor(job.status)} />
                  </TableCell>
                  <TableCell>
                    {dayjs(job.createdAt).format("YYYY/MM/DD")}
                  </TableCell>
                  <TableCell>
                    {job.status === "Active" ? (
                      <IconButton
                        color="secondary"
                        onClick={() => handleArchive(job.id)}
                        disabled={isPending}
                      >
                        <FaBan />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="secondary"
                        onClick={() => handleActive(job.id)}
                        disabled={isPending}
                      >
                        <BiSolidArchiveOut />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <JobModal
        company={company}
        mode="add"
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}
