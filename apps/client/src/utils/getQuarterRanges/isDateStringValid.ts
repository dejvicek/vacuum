import { z } from "zod";

export const isDateStringValid = (input: string): boolean => {
  const dateSchema = z.string().date();

  const { success } = dateSchema.safeParse(input);

  if (!success)
    console.error(
      `Invalid date string: "${input}". Expected format: YYYY-MM-DD`
    );

  return success;
};
