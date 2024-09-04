import { Transform } from 'class-transformer';

export function ToLowerCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value) && typeof value === 'string') {
        return value.toLowerCase();
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return value?.map((v) => v?.toLowerCase());
    },
    {
      toClassOnly: true,
    },
  );
}

export function ToUpperCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value) && typeof value === 'string') {
        return value.toUpperCase();
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return value?.map((v) => v?.toUpperCase());
    },
    {
      toClassOnly: true,
    },
  );
}
