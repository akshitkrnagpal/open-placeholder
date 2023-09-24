import { z } from 'zod';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

const optionsSchema = z.object({
  width: z.coerce.number().positive().catch(DEFAULT_WIDTH),
  height: z.coerce.number().positive().catch(DEFAULT_HEIGHT),
});

export const getPlaceholdOptions = (filename: string) => {
  const [width, height] = filename.split('x');
  return optionsSchema.parse({ width, height: height ?? width });
};
