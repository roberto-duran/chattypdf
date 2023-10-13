import { customType } from "drizzle-orm/pg-core";

export const vector = customType<{
  data: number[];
  driverData: string;
  config: { dimension: number };
  default: false;
}>({
  dataType(config) {
    return `vector(${config?.dimension ?? 3})`;
  },
  toDriver(value: number[]): string {
    return JSON.stringify(value);
  },
  fromDriver(value: string): number[] {
    return JSON.parse(value);
  },
});
