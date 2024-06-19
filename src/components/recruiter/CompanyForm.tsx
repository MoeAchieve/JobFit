"use client";

import { createCompanySchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import UserAvatar from "../ui/UserAvatar";
import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function CompanyForm() {
  const [image, setImage] = useState<string | null>(null);
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      location: "",
      image: "",
      founded: "",
    },
  });

  const { setValue } = form;

  const changeImage = async (file?: File) => {
    if (!file) {
      return;
    }
    try {
      const res = await edgestore.publicFiles.upload({
        file: file,
      });
      if (!res) {
        toast.error("Something went wrong");
      }
      setImage(res.url);
      setValue("image", res.url);
    } catch (error) {
      toast.error("Error uploading image:");
    }
  };

  const handleSubmit = (data: any) => {
    const fetched = fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetched
      .then((res) => {
        if (res.ok) {
          toast.success("Company created successfully");
          router.refresh();
        } else {
          console.log(res)
          toast.error("Error creating company");
        }
      })
      .catch((error) => {
        toast.error("Error creating company");
      }); 
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "80%",
      }}
      mt={4}
      gap={2}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Company Name"
            variant="outlined"
            error={!!form.formState.errors.name}
            helperText={
              form.formState.errors.name
                ? form.formState.errors.name.message
                : null
            }
          />
        )}
      />
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <input {...field} type="text" hidden value={image || ""} />
              <br />
              {fieldState.error ? (
                <Typography variant="caption" color="red">
                  {fieldState.error?.message}
                </Typography>
              ) : null}
            </>
          )}
        />
        <UserAvatar image={image} name={""} size="small" />
        <Button
          variant="outlined"
          component="label"
          size="small"
          color="secondary"
        >
          <Typography variant="caption">Upload Logo</Typography>
          <input
            type="file"
            accept="image/png"
            hidden
            onChange={(e) => changeImage(e.target.files?.[0])}
          />
        </Button>
      </Box>
      <Controller
        name="founded"
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              label="Founded"
              maxDate={dayjs()}
              ref={field.ref}
              name={field.name}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date.toISOString() : null);
              }}
            />
            {fieldState.error ? (
              <Typography variant="caption" color="red">
                {fieldState.error?.message}
              </Typography>
            ) : null}
          </>
        )}
      />
      <Controller
        name="description"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            multiline
            fullWidth
            error={!!form.formState.errors.description}
            helperText={
              form.formState.errors.description
                ? form.formState.errors.description.message
                : null
            }
          />
        )}
      />
      <Controller
        name="website"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Website"
            variant="outlined"
            fullWidth
            error={!!form.formState.errors.website}
            helperText={
              form.formState.errors.website
                ? form.formState.errors.website.message
                : null
            }
          />
        )}
      />
      <Controller
        name="location"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Location"
            variant="outlined"
            fullWidth
            error={!!form.formState.errors.location}
            helperText={
              form.formState.errors.location
                ? form.formState.errors.location.message
                : null
            }
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
}
