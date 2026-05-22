import type { Line } from "../types/server.ts";
import { pushLog } from "./logs.ts";

export const ws = new WebSocket("ws://" + window.location.host + "/ws");

ws.onmessage = (event: MessageEvent) => {
    try {
        const line: Line = JSON.parse(event.data);
        pushLog(line);
    } catch (e) {
        console.error(e);
    }
};
