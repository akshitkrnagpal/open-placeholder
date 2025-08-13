import { z } from 'zod';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

const optionsSchema = z.object({
  width: z.coerce.number().positive().min(1).max(4000).catch(DEFAULT_WIDTH),
  height: z.coerce.number().positive().min(1).max(4000).catch(DEFAULT_HEIGHT),
});

export interface PlaceholderOptions {
  width: number;
  height: number;
  text?: string;
}

export const getPlaceholdOptions = (filename: string): PlaceholderOptions => {
  // Check if there's custom text after a slash
  const parts = filename.split('/');
  let dimensions = parts[0];
  let customText: string | undefined;
  
  if (parts.length > 1) {
    // Decode the custom text from URL encoding
    customText = decodeURIComponent(parts.slice(1).join('/'));
  }
  
  // Parse dimensions (support both 600x400 and 600 formats)
  const [width, height] = dimensions.split('x');
  const parsedOptions = optionsSchema.parse({ width, height: height ?? width });
  
  return {
    ...parsedOptions,
    text: customText,
  };
};
