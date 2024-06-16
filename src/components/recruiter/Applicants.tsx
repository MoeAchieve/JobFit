"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Applicant, ICompany } from "@/types";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import UserAvatar from "../ui/UserAvatar";
import ViewModal from "./ViewModal";
import ActionMenu from "./ActionMenu";
import { Status } from "@prisma/client";

function mapFromEnum(value: Status) {
  switch (value) {
    case "APPROVED":
      return <Chip label="Approved" variant="outlined" color="success" />;
    case "PENDING":
      return <Chip label="Pending" variant="outlined" color="warning" />;
    case "REJECTED":
      return <Chip label="Rejected" variant="outlined" color="error" />;
  }
}

export default function ApplicantsTable({ company }: { company: ICompany }) {
  const user = useCurrentUser();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [applications, setApplications] = useState<Applicant[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (!user) return;

  useEffect(() => {
    fetch(`http://localhost:3000/api/company/${company.id}/applicants/`)
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, [applications]);

  return (
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
            No Applicants yet
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
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applied Data</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application: Applicant) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <UserAvatar
                          name={application.user.name}
                          image={application.user.image}
                          size="small"
                        />
                        {application.user.name}
                      </Box>
                    </TableCell>
                    <TableCell>{application.user.email}</TableCell>
                    <TableCell>{mapFromEnum(application.status)}</TableCell>
                    <TableCell>
                      {dayjs(application.createdAt).format("YYYY/MM/DD")}
                    </TableCell>
                    <TableCell>{application.job.title}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-start">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleOpen}
                        >
                          See Application
                        </Button>
                        <ActionMenu id={application.id} />
                      </Box>
                    </TableCell>
                    <ViewModal
                      handleClose={handleClose}
                      open={open}
                      coverLetter={application.coverLetter}
                      resume={application.resume}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
