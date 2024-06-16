"use client";

import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #eee",
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

interface IViewModal {
  handleClose: () => void;
  open: boolean;
  coverLetter?: string;
  resume?: string;
}

export default function ViewModal({ handleClose, open, resume, coverLetter }: IViewModal) {

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={style}
      >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Resume</Typography>
        <Box sx={{ mb: 2 }}>
          <a href={resume} target="_blank" rel="noreferrer">
            {resume}
          </a>
        </Box>
      </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Cover Letter</Typography>
          { coverLetter ?  <Typography>{coverLetter}</Typography> : <Typography>No cover letter</Typography> }
        </Box>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}
