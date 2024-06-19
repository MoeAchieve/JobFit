"use client";

import { createJobSchema, editJobSchema } from "@/lib/schemas";
import { ICompany, IJob } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import { JOB_TYPE } from "@prisma/client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

const useFormHandler = (
  mode: "add" | "edit",
  handleClose: () => void,
  company: ICompany,
  job?: IJob
) => {
  const router = useRouter();

  const schema = mode === "add" ? createJobSchema : editJobSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: job?.title || "",
      description: job?.description || "",
      location: job?.location || "",
      type: job?.type || "",
      company: parseInt(company.id),
    },
  });

  const setValue = form.setValue;
  setValue("company", parseInt(company.id));

  const onSubmit = async (values: any) => {
    if (mode === "add") {
      const res = await fetch("/api/jobs/", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!data.success) {
        return;
      }
      handleClose()
      toast.success("Job added successfully");
    } else if (mode === "edit") {
      const res = await fetch(`/api/jobs/${job?.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) {
        return;
      }
      handleClose();
      toast.success("Job updated successfully");
    }

    startTransition(() => {
      router.refresh();
    });
  };

  return { form, onSubmit };
};

interface JobModal {
  open: boolean;
  handleClose: () => void;
  mode: "add" | "edit";
  job?: IJob;
  company: ICompany;
}

export default function JobModal({
  company,
  open,
  handleClose,
  job,
  mode,
}: JobModal) {
    const handleCancel = () => {
      form.reset();
      handleClose();
    };
  const { form, onSubmit } = useFormHandler(mode, handleCancel, company, job);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={style}
        component="form"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Controller
            control={form.control}
            name="title"
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                id="title"
                label="Title"
                size="small"
                error={!!form.formState.errors.title}
                helperText={
                  form.formState.errors.title
                    ? form.formState.errors.title.message
                    : ""
                }
              />
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                id="description"
                label="Description"
                multiline
                error={!!form.formState.errors.description}
                helperText={
                  form.formState.errors.description
                    ? form.formState.errors.description.message
                    : ""
                }
              />
            )}
          />
          <Controller
            control={form.control}
            name="location"
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                id="location"
                label="Location"
                error={!!form.formState.errors.location}
                helperText={
                  form.formState.errors.location
                    ? form.formState.errors.location.message
                    : ""
                }
              />
            )}
          />
          <Controller
            control={form.control}
            name="type"
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Type"
                id="Type"
                error={!!form.formState.errors.type}
                helperText={
                  form.formState.errors.type
                    ? form.formState.errors.type.message
                    : ""
                }
                defaultValue={JOB_TYPE.FullTime}
                {...field}
              >
                {Object.values(JOB_TYPE).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Box mt={2}>
            <Box
              gap={4}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
