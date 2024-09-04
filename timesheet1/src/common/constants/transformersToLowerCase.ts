/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';

export function LowercaseTransform() {
  return Transform(({ value }: any) => value.toLowerCase());
}
