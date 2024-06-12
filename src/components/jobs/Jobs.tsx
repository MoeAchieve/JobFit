"use client";

import { IJob } from "@/types";
import { useEffect, useState, useTransition } from "react";
import Job from "./Job";
import JobsSkeleton from "./Skeleton";
import Paginate from "./Paginate";
import { Grid, Typography } from "@mui/material";
import JobDetails from "./JobDetails";

const types = [
  { label: "Full Time", value: "FullTime" },
  { label: "Part Time", value: "PartTime" },
  { label: "Contract", value: "Contract" },
  { label: "Internship", value: "Internship" },
];

interface Props {
  page?: number;
  limit?: number;
  query?: any;
}

export default function Jobs({ page = 1, limit = 10, query }: Props) {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [isPending, startTransition] = useTransition();
  const [pages, setPages] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState("");
  const handleJobClick = (id: string) => setSelectedJobId(id);
  if (query) {
    query = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");
  }
  useEffect(() => {
    startTransition(() => {
      fetch(`/api/jobs?page=${page}&limit=${limit}&status=1&${query}`)
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.jobs);
          setPages(data.pages);
        });
    });
  }, [page, query]);

  return (
    <>
      <Grid item sm={12} md={4}>
        <div>
          {isPending && <JobsSkeleton />}
          {!isPending && jobs.length === 0 && (
            <Typography variant="body1">No jobs found</Typography>
          )}
          {jobs.map((job) => (
            <Job key={job.id} job={job} onJobClick={handleJobClick} />
          ))}
          <Paginate pages={pages} currentPage={page} />
        </div>
      </Grid>
      <Grid item sm={12} md={8}>
        <JobDetails selectedJobId={selectedJobId} jobDetails={jobs} />
      </Grid>
    </>
  );
}
