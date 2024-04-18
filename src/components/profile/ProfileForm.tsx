"use client";

import { editProfileSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MouseEvent } from "react";
import SaveButton from "../ui/SaveButton";
import { toast } from "sonner";

type ProfileFormProps = {
  bio: string;
  location: string;
  website: string;
};

export default function ProfileForm({ bio, location, website }: ProfileFormProps) {
  const [show, setShow] = useState(false);

  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      bio: bio,
      location: location,
      website: website,
    },
  });

  const handleCancle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset({
      bio: bio,
      location: location,
      website: website,
    });
    setShow(false);
  };

  const { watch } = form;
  const wbio = watch("bio") || "";
  const bioCharsLeft = 160 - wbio.length;

  const onSubmit = async (values: any) => {
    const { bio, location, website } = values;
    const res = await fetch("/api/profile/edit", {
      method: "PUT",
      body: JSON.stringify({ bio, location, website }),
    });
    const data = await res.json();
    
    if (!data.success) {
      toast.error("Something went wrong");
      return;
    }

    setShow(false);
    toast.success("Updated successfully");
  };

  return (
    <Box
      component="form"
      mt={4}
      onSubmit={form.handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Controller
        name="bio"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            label="Bio"
            multiline
            rows={4}
            fullWidth
            inputProps={{
              maxLength: 160,
            }}
            error={!!form.formState.errors.bio}
            helperText={
              form.formState.errors.bio ? form.formState.errors.bio.message : ""
            }
            onChange={(e) => {
              field.onChange(e);
              setShow(true);
            }}
          />
        )}
      />
      {show && (
        <Box>
          <Typography
            variant="caption"
            color={bioCharsLeft == 0 ? "#f44336" : "gray"}
          >
            {bioCharsLeft} / 160
          </Typography>
        </Box>
      )}
      <Controller
        name="location"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            label="Location"
            fullWidth
            error={!!form.formState.errors.location}
            helperText={
              form.formState.errors.location
                ? form.formState.errors.location.message
                : ""
            }
            onChange={(e) => {
              field.onChange(e);
              setShow(true);
            }}
          />
        )}
      />
      <Controller
        name="website"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            label="Website"
            fullWidth
            error={!!form.formState.errors.website}
            helperText={
              form.formState.errors.website
                ? form.formState.errors.website.message
                : ""
            }
            onChange={(e) => {
              field.onChange(e);
              setShow(true);
            }}
          />
        )}
      />
      <SaveButton show={show} handleCancle={handleCancle} />
    </Box>
  );
}
