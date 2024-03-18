import { Avatar, CircularProgress } from "@mui/material";

interface IUserAvatar {
  name: string | null | undefined;
  image: string | null | undefined;
  size: "small" | "medium" | "large";
}

export default function UserAvatar({ name, image, size }: IUserAvatar) {
  const avatarSize = size === "small" ? 48 : size === "medium" ? 96 : 192;
  const avatarFontSize = size === "small" ? 24 : size === "medium" ? 48 : 48;

  return (
    <Avatar
      sx={{
        width: avatarSize,
        height: avatarSize,
        fontSize: avatarFontSize,
        mr: 1,
      }}
      alt={name || undefined}
      src={image || undefined}
    >
      {name ? name.charAt(0) : undefined}
    </Avatar>
  );
}
