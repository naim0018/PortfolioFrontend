import { z } from "zod";

export const socialLinkSchema = z.object({
  logo: z.string().min(1, "Logo is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  link: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), { message: "Invalid URL" }),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  coverImage: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), { message: "Invalid URL" }),
  images: z.array(z.string().url("Invalid image URL")).default([]),
  link: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), { message: "Invalid URL" }),
  tags: z.array(z.string()).default([]),
  repositoryLink: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), { message: "Invalid URL" }),
  notes: z.string().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  logo: z.string().min(1, "Logo is required"),
  progress: z.number().min(0).max(100),
  category: z.string().min(1, "Category is required"),
});

export const experienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Description is required"),
  logo: z.string().min(1, "Company logo is required"),
  link: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), { message: "Invalid URL" }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().default("Present"),
  location: z.string().min(1, "Location is required"),
});

export const educationSchema = z.object({
  title: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  description: z.string().min(1, "Description is required"),
  logo: z.string().min(1, "Logo is required"),
  link: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), { message: "Invalid URL" }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  location: z.string().min(1, "Location is required"),
});

export const profileSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  shortDescription: z.string().min(1, "Short bio is required"),
  longDescription: z.string().min(1, "About me is required"),
  profilePicture: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), { message: "Invalid URL" }),
  resume: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), { message: "Invalid URL" }),
  socialLinks: z.array(socialLinkSchema).default([]),
  projects: z.array(projectSchema).default([]),
  skills: z.array(skillSchema).default([]),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  selectedTemplate: z.string().optional(),
  status: z.enum(["draft", "published"]).default("published"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type SocialLinkData = z.infer<typeof socialLinkSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type SkillData = z.infer<typeof skillSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type EducationData = z.infer<typeof educationSchema>;
