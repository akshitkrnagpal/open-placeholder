import { z } from "zod";

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

const optionsSchema = z.object({
  width: z.coerce.number().default(DEFAULT_WIDTH).catch(DEFAULT_WIDTH),
  height: z.coerce.number().default(DEFAULT_HEIGHT).catch(DEFAULT_HEIGHT),
});

export const getPlaceholdOptions = (filename: string) => {
  const options: Record<string, any> = {};

  const [width, height] = filename.split("x");

  return optionsSchema.parse({ width, height });
};
