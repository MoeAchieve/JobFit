"use client";

import { ISkill } from "@/types";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";

interface SkillsProps {
  skills: ISkill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [options, setOptions] = useState<ISkill[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await fetch(`/api/skills`);
      const data = await res.json();
      setOptions(data);
    };

    fetchSkills();
  }, []);

  const handleSkillChange = async (newValue: any) => {
    if (newValue) {
      try {
        await fetch(`/api/profile/skill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: newValue }),
        });
        startTransition(() => {
          router.refresh();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSkillDelete = async (id: string) => {
    try {
      await fetch(`/api/profile/skill/${id}`, {
        method: "DELETE",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 1,
          border: "1px solid #eee",
          backgroundColor: "#f9f9f9",
        }}
        mb={2}
        p={3}
      >
        {skills.map((skill) => (
          <Chip
            key={skill.id}
            label={skill.name}
            clickable
            variant="outlined"
            color="primary"
            onDelete={() => handleSkillDelete(skill.id)}
            deleteIcon={<CiCircleRemove />}
          />
        ))}
      </Box>
      <Autocomplete
        options={options.map((option) => option)}
        filterSelectedOptions
        getOptionLabel={(option) => option.name}
        size="small"
        value={null}
        blurOnSelect={true}
        onChange={(event, newValue) => {
          handleSkillChange(newValue?.id);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Skill" variant="outlined" />
        )}
      />
    </>
  );
}
