import { z } from 'zod';

export const phoneNumberSchema = z
  .string()
  .min(7, { message: 'Bitte geben sie eine valide Telefonnummer an' });
