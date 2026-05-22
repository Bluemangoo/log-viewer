<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { logs } from "../data/logs.ts";
import { isWhiteList, selectedLabels, selectedLevel } from "../data/filter.ts";

const displays = computed(() => {
    const all = logs.frozen();
    return all.filter((log) => {
        if (!selectedLevel[log.level]) {
            return false;
        }
        for (const label of log.labels) {
            // white is
            if (selectedLabels[label]) {
                if (isWhiteList.value) {
                    return true;
                }
            } else {
                // black not
                if (!isWhiteList.value) {
                    return false;
                }
            }
        }
        // white none -> false; black all -> true
        return !isWhiteList.value;
    });
});
const scrollContainer = ref<HTMLElement | null>(null);
const scrollToBottom = (smooth = false) => {
    if (scrollContainer.value) {
        if (smooth) {
            scrollContainer.value.scrollTo({
                top: scrollContainer.value.scrollHeight,
                behavior: "smooth",
            });
        } else {
            scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
        }
    }
};

onMounted(() => {
    scrollToBottom();
});

const onInsert = async () => {
    if (!scrollContainer.value) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;

    const isAtBottom = scrollHeight - (scrollTop + clientHeight) <= 5;

    if (isAtBottom) {
        await nextTick();
        scrollToBottom(true);
    }
};
watch(displays, onInsert, { deep: true });
</script>

<template>
    <div class="size-full p-4 border border-zinc-600 rounded-3xl layer">
        <div class="size-full p-2 flex flex-col overflow-y-auto scrollbar" ref="scrollContainer">
            <div
                v-for="(log, i) in displays"
                :key="i"
                class="inline mb-0.5 text-sm text-zinc-300 leading-relaxed wrap-break-word"
            >
                <div
                    class="inline-block size-3 mr-2 border border-zinc-800 rounded-full"
                    :class="
                        log.level === 'info'
                            ? 'bg-green-800'
                            : log.level === 'warn'
                              ? 'bg-yellow-800'
                              : 'bg-red-900'
                    "
                />
                <span
                    v-for="label in log.labels"
                    :key="label"
                    class="text-xs mr-2 text-zinc-500 bg-zinc-700 rounded px-1 size-max"
                >
                    {{ label }}
                </span>
                <span class="whitespace-pre-wrap align-middle" v-html="log.content" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
