import dayjs from "dayjs";
import { Rule } from "../types/gridTypes"; // define Rule and ColumnConfig in a shared types file

export function getHeatmapColor(value: number, min: number, max: number, scale = "red-white"): string {
  const percent = (value - min) / (max - min + 0.0001);
  const intensity = Math.floor(percent * 255);
  return scale === "red-white"
    ? `rgb(255, ${255 - intensity}, ${255 - intensity})`
    : `rgba(0, 0, 0, 0.1)`;
}

export const ruleHandlers: Record<string, (rule: Rule, val: any) => boolean> = {
  equals: (rule, val) => val === rule.value,
  greater_than: (rule, val) => typeof val === "number" && val > rule.value,
  smaller_than: (rule, val) => typeof val === "number" && val < rule.value,
  recent: (rule, val) => typeof val === "string" && dayjs().diff(dayjs(val), "hour") < 24,
};
