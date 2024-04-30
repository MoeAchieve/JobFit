"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useEdgeStore } from "@/lib/edgestore";
import { Box, Button, Link, Modal, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { FiUpload } from "react-icons/fi";

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

interface ApplyModalProps {
  open: boolean;
  handleClose: () => void;
  jobId: string;
}

export default function ApplyModal({
  open,
  handleClose,
  jobId,
}: ApplyModalProps) {
  const [isPending, startTransition] = useTransition();
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const user = useCurrentUser();
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchResume = async () => {
      const profile = await fetch(`/api/profile/${user.id}`);
      const data = await profile.json();
      if (!data) {
        return;
      }
      console.log(data);
      setResume(data.profile.resume);
    };

    fetchResume();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted");

    if (!user) {
      return;
    }

    if (!resume) {
      toast.error("Please upload a resume");
      return;
    }

    const apply = async () => {
      const application = await fetch(`/api/jobs/${jobId}/applications`, {
        method: "POST",
        body: JSON.stringify({
          coverLetter: coverLetter,
          resume: resume,
        }),
      });
      console.log(application);
      const data = await application.json();
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      toast.success("Applied to job successfully");
      handleClose();
    };

    apply();
  };

  const uploadResume = async (file?: File) => {
    if (!file) {
      return;
    }

    try {
      startTransition(async () => {
        const res = await edgestore.publicFiles.upload({
          file: file,
          options: {
            manualFileName: file.name,
          },
        });

        const resume = await fetch(`/api/profile/edit/`, {
          method: "PUT",
          body: JSON.stringify({ resume: res.url }),
        });

        const data = await resume.json();
        setResume(data.profile.resume);
        if (!data.success) {
          toast.error("Error updating image");
          return;
        }
        toast.success("Resume uploaded successfully");
      });
    } catch (error) {
      toast.error("Error uploading resume, Try Again");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          id="coverLetter"
          label="Cover Letter"
          size="medium"
          multiline
          rows={4}
          fullWidth
          inputProps={{
            maxLength: 160,
          }}
          disabled={isPending}
          onChange={(e) => {
            setCoverLetter(e.target.value);
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: 2,
          }}
        >
          <Typography variant="body1" color="textSecondary">
            Resume
          </Typography>
          {resume && (
            <Link
              sx={{
                fontSize: "1.2rem",
              }}
              color="secondary"
              href={resume}
            >
              {resume.substring(resume.lastIndexOf("/") + 1)}
            </Link>
          )}
          <Button
            variant="outlined"
            component="label"
            startIcon={<FiUpload />}
            sx={{
              mt: 1,
            }}
          >
            Upload Resume
            <input
              type="file"
              hidden
              onChange={(evt) => {
                uploadResume(evt.target.files?.[0]);
              }}
            />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 2,
              px: 6,
              py: 1,
              fontWeight: 600,
            }}
            disabled={isPending}
          >
            Apply
          </Button>
          <Button
            variant="text"
            color="primary"
            size="small"
            sx={{
              mt: 2,
              px: 6,
              py: 1,
              fontWeight: 600,
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
