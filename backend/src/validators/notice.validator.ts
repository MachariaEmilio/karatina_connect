import { z } from "zod";

export const createNoticeSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  location: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  expiresAt: z.string().datetime().optional(),
  isPinned: z.boolean().optional(),
  userId: z.string().uuid(),
  categoryId: z.string().uuid(),
});
