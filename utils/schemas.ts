import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z
    .string()
    .min(2, { message: 'first name should contain at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'last name should contain at least 2 characters' }),
  username: z
    .string()
    .min(2, { message: 'username should contain at least 2 characters' }),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    const errors = validatedFields.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }

  return validatedFields.data;
}
