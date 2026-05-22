// 我懒得维护状态，别学。

import { reactive, ref } from "vue";

export const selectedLevel = reactive({
    info: true,
    warn: true,
    error: true,
});

export const selectedLabels: Record<string, boolean> = reactive({});

export const isWhiteList = ref(true);
