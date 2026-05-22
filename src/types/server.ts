export type Line = {
    level: "info" | "warn" | "error";
    labels: string[];
    content: string;
};