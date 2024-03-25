"use client";

import { useTransition, useState, MouseEvent, startTransition } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdDelete, MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import ExperienceModal from "./ExperienceForm";
import { IExperience } from "@/types";
import { useRouter } from "next/navigation";

interface LongMenuProps {
  exp: IExperience;
}

export default function LongMenu({ exp }: LongMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleEdit = () => {
    setOpenModal(true);
    handleClose();
  };

  const handleDelete = async () => {
    await fetch(`/api/profile/experience/${exp.id}`, {
      method: "DELETE",
    });

    handleClose();
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: "0.5rem",
      }}
    >
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <BsThreeDotsVertical />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>
          <MdEdit color="#757575" size="1.2em" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <MdDelete color="#757575" size="1.2em" />
          Delete
        </MenuItem>
      </Menu>
      <ExperienceModal
        open={openModal}
        handleClose={handleModalClose}
        mode="edit"
        exp={exp}
      />
    </div>
  );
}
