import { JOB_STATUS } from "@prisma/client";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  cofngirmPassword: z.string().min(6, {
    message: "Confirm Password is required",
  }),
}).refine((data) => data.password === data.cofngirmPassword, {
  message: "Passwords do not match",
  path: ["cofngirmPassword"],
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const changeUserDataSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phone: z.string().regex(phoneRegex, {
    message: "Phone number is invalid",
  }),
});

export const editProfileSchema = z.object({
  bio: z.optional(z.string().max(160, {
    message: "Bio must be at most 100 characters",
  })),
  location: z.optional(z.string().min(1, {
    message: "Location is required",
  })),
  website: z.optional(z.string()),
  resume: z.optional(z.string().url()),
});

export const addCompanySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  image: z.optional(z.string().url({
    message: "Image is required",
  })),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  website: z.optional(z.string().url({
    message: "Website is required",
  })),
});

export const addExperienceSchema = z.object({
  title: z.string().min(6, {
    message: "Title is required",
  }),
  company: z.string().min(3, {
    message: "Company is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  from: z.string().min(1, {
    message: "From date is required",
  }),
  to: z.optional(z.string().min(1, {
    message: "To date is required",
  })),
  description: z.optional(z.string().min(1, {
    message: "Description is required",
  })),
  current: z.optional(z.boolean()),
});

export const editExperienceSchema = z.object({
  title: z.optional(z.string().min(1, {
    message: "Title is required",
  })),
  company: z.optional(z.string().min(1, {
    message: "Company is required",
  })),
  location: z.optional(z.string().min(1, {
    message: "Location is required",
  })),
  from: z.optional(z.string().min(1, {
    message: "From date is required",
  })),
  to: z.optional(z.string().min(1, {
    message: "To date is required",
  })),
  description: z.optional(z.string().min(1, {
    message: "Description is required",
  })),
  current: z.optional(z.boolean()),
});

export const createJobSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  type: z.string().min(1, {
    message: "Type is required",
  }),
  company: z.number().min(1, {
    message: "Company is required",
  }),
});

export const editJobSchema = z.object({
  title: z.optional(z.string().min(1, {
    message: "Title is required",
  })),
  description: z.optional(z.string().min(1, {
    message: "Description is required",
  })),
  location: z.optional(z.string().min(1, {
    message: "Location is required",
  })),
  type: z.optional(z.string().min(1, {
    message: "Type is required",
  })),
  status: z.enum(['Expired', 'Active', 'Archived']).optional(),
  company: z.optional(z.number().min(1, {
    message: "Company is required",
  })),
});

export const createCompanySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  website: z.optional(z.string().url({
    message: "Website is required",
  })),
  image: z.string().optional(),
  founded: z.string().min(1, {
    message: "Founded is required",
  }),
});

export const editCompanySchema = z.object({
  name: z.optional(z.string().min(1, {
    message: "Name is required",
  })),
  description: z.optional(z.string().min(1, {
    message: "Description is required",
  })),
  location: z.optional(z.string().min(1, {
    message: "Location is required",
  })),
  website: z.optional(z.string().url({
    message: "Website is required",
  })),
  image: z.optional(z.string().url({
    message: "Image is required",
  })),
});


export const createAdminSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),

});
