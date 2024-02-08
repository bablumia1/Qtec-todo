import { Prority } from "../types";

export function generateUUID(): string {
  let timestamp = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (timestamp + Math.random() * 16) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export const getBorderColor = (priority: Prority): string => {
  switch (priority) {
    case "low":
      return "border-blue-400";
    case "medium":
      return "border-yellow-400";
    case "high":
      return "border-red-400";
    default:
      return "border-gray-400";
  }
};
