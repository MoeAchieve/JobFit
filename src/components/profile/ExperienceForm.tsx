"use client";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { startTransition, useEffect, useState } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { addExperienceSchema, editExperienceSchema } from "@/lib/schemas";
import { ICompany, IExperience } from "@/types";
import { z } from "zod";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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
  exp?: IExperience,
) => {
  const router = useRouter();

  const schema = mode === "add" ? addExperienceSchema : editExperienceSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: exp?.title || "",
      company: exp?.company?.name || "",
      from: exp?.from || "",
      to: exp?.to ? exp?.to : "",
      description: exp?.description || "",
      location: exp?.location || "",
      current: exp?.current || false,
    },
  });

  const onSubmit = async (values: any) => {
    if (mode === "add") {
      await fetch("/api/profile/experience/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (mode === "edit") {
      await fetch(`/api/profile/experience/${exp?.id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    handleClose();

    startTransition(() => {
      router.refresh();
    });
  };

  return { form, onSubmit };
};

interface ExperienceModalProps {
  open: boolean;
  handleClose: () => void;
  mode: "add" | "edit";
  exp?: IExperience;
}

export default function ExperienceModal({
  open,
  handleClose,
  exp,
  mode,
}: ExperienceModalProps) {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const { form, onSubmit } = useFormHandler(
    mode,
    handleClose,
    exp,
  );

  const [from, current] = form.watch(["from", "current"]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch("/api/company");
      const data = await res.json();
      setCompanies(data);
    };

    startTransition(() => {
      fetchCompanies();
    });
  }, []);

  const handleCancel = () => {
    form.reset();
    handleClose();
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component="form"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Typography variant="h6" gutterBottom>
          Add Experience
        </Typography>
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
            name="company"
            rules={{
              required: "Company is required",
            }}
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={companies.map((option) => option.name)}
                filterSelectedOptions
                freeSolo
                disableClearable
                onChange={(e, value) => {
                  onChange(value);
                }}
                value={value}
                fullWidth
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Company"
                    variant="outlined"
                    ref={ref}
                    error={!!error}
                    onChange={onChange}
                    helperText={error && error.message}
                  />
                )}
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
                id="location"
                label="Location"
                size="small"
                error={!!form.formState.errors.location}
                helperText={
                  form.formState.errors.location
                    ? form.formState.errors.location.message
                    : null
                }
              />
            )}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              gap: 3,
              my: 2,
            }}
          >
            <Controller
              control={form.control}
              name="from"
              render={({ field, fieldState }) => (
                <>
                  <DatePicker
                    label="From"
                    ref={field.ref}
                    name={field.name}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date ? date.toISOString() : null);
                    }}
                  />
                  <br />
                  {fieldState.error ? (
                    <span style={{ color: "red" }}>
                      {fieldState.error?.message}
                    </span>
                  ) : null}
                </>
              )}
            />
            <Controller
              control={form.control}
              name="to"
              disabled={current}
              render={({ field, fieldState }) => (
                <>
                  <DatePicker
                    label="To"
                    minDate={from ? dayjs(from) : undefined}
                    ref={field.ref}
                    name={field.name}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date ? date.toISOString() : null);
                    }}
                  />
                  <br />
                  {fieldState.error ? (
                    <span style={{ color: "red" }}>
                      {fieldState.error?.message}
                    </span>
                  ) : null}
                </>
              )}
            />
          </Box>
          <Controller
            control={form.control}
            name="current"
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Current"
              ></FormControlLabel>
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                id="description"
                label="Description"
                multiline
                fullWidth
                rows={4}
                error={!!form.formState.errors.description}
                helperText={
                  form.formState.errors.description
                    ? form.formState.errors.description.message
                    : ""
                }
              />
            )}
          />
        </Box>
        <Button type="submit">Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>
    </Modal>
  );
}
