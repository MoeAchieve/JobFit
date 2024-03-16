"use client";

import UserAvatar from "@/components/ui/UserAvatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const user = useCurrentUser();
  const { update } = useSession();
  const { edgestore } = useEdgeStore();
  const [image, setImage] = useState<string | null>(user?.image || null);
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);

  const onChange = async (file?: File) => {
    if (!file) {
      return;
    }
    try {
      startTransition(async () => {
        const res = await edgestore.publicFiles.upload({
          file: file,
          options: {
            manualFileName: new Date().toISOString() + user?.id,
          },
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });

        await fetch("/api/user", {
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
    <div>
      <Container maxWidth="md">
        <Grid container spacing={4} my={1}>
          <Grid item xs={4}>
            <Typography variant="h6">About</Typography>
            <Typography variant="body1" color="gray">
              Tell us about yourself.
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <UserAvatar image={image} name={user?.name} size="small" />
            <Button variant="outlined" disabled={isPending} component="label">
              Upload a new picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onChange(e.target.files?.[0])}
              />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
