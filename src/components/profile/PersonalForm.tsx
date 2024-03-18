"use client";

import UserAvatar from "@/components/ui/UserAvatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEdgeStore } from "@/lib/edgestore";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useTransition, MouseEvent } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { changeNameSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SaveButton from "@/components/ui/SaveButton";

export default function PersonalForm() {
  const user = useCurrentUser();
  const { update } = useSession();
  const { edgestore } = useEdgeStore();
  const [image, setImage] = useState<string | null>(user?.image || null);
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);

  const form = useForm({
    resolver: zodResolver(changeNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  const handleChangeName = async (values: z.infer<typeof changeNameSchema>) => {
    const { name } = values;
    if (!name) {
      return;
    }
    startTransition(async () => {
      try {
        await fetch("/api/user", {
          method: "PUT",
          body: JSON.stringify({ name }),
        });
        setShow(false);
        update({ name });
      } catch (error) {
        console.error("Error updating name:", error);
      }
    });
  };

  const handleCancle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset({ name: user?.name || "" });
    setShow(false);
  };

  const changeImage = async (file?: File) => {
    if (!file) {
      return;
    }
    try {
      startTransition(async () => {
        const res = await edgestore.publicFiles.upload({
          file: file,
        });

        await fetch("/api/user/image", {
          method: "POST",
          body: JSON.stringify({ image: res.url }),
        });

        update({ image: res.url });
        setImage(res.url);
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <Box
        mb={2}
        mr={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        component="form"
        onSubmit={form.handleSubmit(handleChangeName)}
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              id="name"
              label="Name"
              size="small"
              disabled={isPending}
              error={!!form.formState.errors.name}
              helperText={
                form.formState.errors.name
                  ? form.formState.errors.name.message
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

      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <UserAvatar image={image} name={user?.name} size="small" />
        <Button
          variant="outlined"
          disabled={isPending}
          component="label"
          size="small"
          color="secondary"
        >
          <Typography variant="caption">
            {isPending ? `Loading...` : "Upload a new picture"}
          </Typography>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => changeImage(e.target.files?.[0])}
          />
        </Button>
      </Box>
    </>
  );
}
