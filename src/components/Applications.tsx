"use client"

import { IApplicationView } from "@/types";
import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { mapFromEnum } from "./recruiter/Applicants";
import dayjs from "dayjs";

export default function Applications({ id }: { id: string }) {
  const [applications, setApplications] = useState<IApplicationView[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await fetch(`/api/user/${id}/applications/`);
      const applications = await data.json();
      setApplications(applications);
    }

    fetchApplications();
  }
  , []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Applications
      </Typography>

      <Box
        my={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {applications.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <Typography variant="h6" color="textSecondary">
              No Applications yet
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" width="100%">
            <Typography variant="h6" component="div" m={2}>
              Total Applicants: {applications.length}
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Applied Date</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>{application.job.title}</TableCell>
                      <TableCell>{mapFromEnum(application.status)}</TableCell>
                      <TableCell>
                        {dayjs(application.createdAt).format("YYYY/MM/DD")}
                      </TableCell>
                      <TableCell>{application.job.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </>
  );
}
