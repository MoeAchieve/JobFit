"use client";

import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";

const locations = ["Remote", "San Francisco", "New York", "Los Angeles", "Chicago"];
const types = ["FullTime", "PartTime", "Contract"];

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

export default function Filters({
  query,
}: {
  query?: string;
  }) {
  const initialFilter = new URLSearchParams(query);
  const initialLocation = initialFilter.getAll('location')
  
  const initialType = initialFilter.getAll('type');
  
  const [filter, setFilter] = useState({
    location: initialLocation,
    type: initialType,
  })

  const router = useRouter();
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

  const pathname = usePathname();

  useEffect(() => {
    const searchParams = toSearchParams(filter);
    const search = searchParams.toString();
    const data = fetch(`/api/jobs/?${search}`);
      router.replace(`${pathname}?${search}`)
  }, [filter])

  return (
    <>
      <FormGroup>
        <FormControl>
          <FormLabel>Location</FormLabel>
          {locations.map(location => (
            <FormControlLabel
              key={location}
              control={<Checkbox name={location} checked={filter.location.includes(location)} onChange={(event: ChangeEvent<HTMLInputElement>) => applyArrayFilter({
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
              key={type}
              control={<Checkbox name={type} checked={filter.type.includes(type)} onChange={(event: ChangeEvent<HTMLInputElement>) => applyArrayFilter({
                category: 'type',
                value: type,
              })}/>}
              label={type.split(" ").join("")}
              name="type"
            />
          ))}
        </FormControl>
      </FormGroup>
    </>
  );
}
