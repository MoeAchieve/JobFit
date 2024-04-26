"use client";

import { IJob } from "@/types";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import Job from "./Job";
import JobsSkeleton from "./Skeleton";
import Paginate from "./Paginate";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Typography } from "@mui/material";
import debounce from "lodash.debounce";

const types = [
  {
    value: "FullTime",
    label: "Full Time",
  },
  {
    value: "PartTime",
    label: "Part Time",
  },
  {
    value: "Contract",
    label: "Contract",
  },
]

const toSearchParams = (filter: Record<string, string[]>) => {
  const searchParams = new URLSearchParams();
  Object.entries(filter).forEach(([key, values]) => {
    if (values.length === 0) return;
    if (values.length === 1) {
      searchParams.append(key, values[0]);
      return;
    }
    searchParams.append(key, values.join(','));
  });
  return searchParams;
}

interface Props {
  page?: number;
  limit?: number;
  query?: string;
}

export default function Jobs({ page, limit = 10, query }: Props) {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const pages = Math.ceil(jobs.length / limit);
  const [isPending, startTransition] = useTransition();
  const [locations, setLocations] = useState<string[]>([]);
  const [filter, setFilter] = useState({
    location: [],
    type: [],
  })

   const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof typeof filter
    value: string
  }) => {
    const isFilterApplied = filter[category].includes(value as never)

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }))
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }))
    }
  }

  const debouncedFetchJobs = debounce(async () => {
  startTransition(async () => {
    const filters = toSearchParams(filter);
    const response = await fetch(`/api/jobs/?page=${page}&limit=${limit}&${new URLSearchParams(filters)}`);
    const data = await response.json();

    setJobs(data);
    setLocations(data.map((job: IJob) => job.location));
    });
  }, 500);
  
  useEffect(() => {
  debouncedFetchJobs();
  return () => {
    debouncedFetchJobs.cancel();
  };
}, [filter]);

  return (
    <>
      <Grid item sm={12} md={4}>
        <Typography variant="h6" sx={{ fontWeight: 500 }} gutterBottom>
              Filters
        </Typography>
         <FormGroup>
        <FormControl>
          <FormLabel>Location</FormLabel>
          {locations.map(location => (
            <FormControlLabel
              key={location}
              control={<Checkbox name={location} onChange={(event: ChangeEvent<HTMLInputElement>) => applyArrayFilter({
                category: 'location',
                value: location,
              })}/>}
              label={location}
              name="location"
            />
          ))}
        </FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl>
          <FormLabel>Type</FormLabel>
          {types.map(type => (
            <FormControlLabel
              key={type.value}
              control={<Checkbox name={type.value} onChange={(event: ChangeEvent<HTMLInputElement>) => applyArrayFilter({
                category: 'type',
                value: type.value,
              })}/>}
              label={type.label}
              name="type"
            />
          ))}
        </FormControl>
      </FormGroup>
      </Grid>
      <Grid item sm={12} md={8}>
        <div>
          {isPending && <JobsSkeleton />}
          {!isPending && jobs.length === 0 && <Typography variant="body1">No jobs found</Typography>}
          {jobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
          <Paginate pages={pages} currentPage={page || 1} />
        </div>
      </Grid>
    </>
  );
}
