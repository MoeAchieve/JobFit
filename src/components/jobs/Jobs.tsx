"use client";

import { IJob } from "@/types";
import { useEffect, useState, useTransition } from "react";
import Job from "./Job";
import JobsSkeleton from "./Skeleton";
import Paginate from "./Paginate";
import { Chip, Grid, Typography } from "@mui/material";
import JobDetails from "./JobDetails";
import { toast } from "sonner";

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

export default function Jobs({ page = 1, limit = 10 }: Props) {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [isPending, startTransition] = useTransition();
  const [pages, setPages] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState("");
  // const searchParams = useSearchParams();
  // const [searchParam, setSearchParam] = useState({
  //   type: searchParams.get("type") || "",
  // });
  // const router = useRouter();

  // useEffect(() => {
  //   const newParams = new URLSearchParams(window.location.search);
  //   newParams.set("type", searchParam.type.toString());
  //   router.replace(`jobs?${newParams.toString()}`);

  //   console.log(searchParam)
  // }, [searchParams, router, searchParam]);

  const handleJobClick = (id: string) => setSelectedJobId(id);
  useEffect(() => {
    startTransition(() => {
      fetch(`/api/jobs?page=${page}&limit=${limit}&status=1`)
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.jobs);
          setPages(data.pages);
        });
    });
  }, [page]);

  const handleClick = () => {
    startTransition(async () => {
      const res = await fetch(`/api/jobs/recommended`);
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
        setJobs([]);
        setPages(0);
        return;
      }
      setJobs(data.jobs);
      setPages(data.pages);
    });
  };

  return (
    <>
      <Grid item sm={12} md={4}>
        {/* <Select
          native
          value={searchParam}
          onChange={(e) => {
            console.log(e.target.value)
            setSearchParam({
              type: e.target.value,
            })
          }}
        >
          <option value="">All</option>
          {types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select> */}
        <Chip
          label="View Recommendations"
          variant="outlined"
          color="primary"
          onClick={handleClick}
        />
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
