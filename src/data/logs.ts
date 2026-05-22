import CircularQueue from "../types/circular-queue.ts";
import type { Line } from "../types/server.ts";
import { AnsiUp } from "ansi_up";
import { type Reactive, reactive } from "vue";
import { selectedLabels } from "./filter.ts";

export const logs: Reactive<CircularQueue<Line>> = reactive(new CircularQueue(500));
const ansiUp = new AnsiUp();
ansiUp.use_classes = true;

export function pushLog(line: Line) {
    line.content = ansiUp.ansi_to_html(line.content);
    for (const l of line.labels) {
        if (selectedLabels[l] == null) {
            selectedLabels[l] = true;
        }
    }
    logs.push(line);
}
