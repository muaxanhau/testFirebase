import {z} from 'zod';

export const addCategoryFormSchema = z.object({
  name: z
    .string({required_error: 'name is required'})
    .trim()
    .min(1, 'name is required'),
  description: z.string().trim().default('Empty...'),
  image: z.string().url('must be url').default(''),
});
