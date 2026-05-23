<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { logs } from "../data/logs.ts";
import { isWhiteList, selectedLabels, selectedLevel } from "../data/filter.ts";
import {
    DynamicScroller,
    DynamicScrollerItem,
    type DynamicScrollerExposed,
} from "vue-virtual-scroller";

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
const scrollContainer = ref<(DynamicScrollerExposed & HTMLElement) | null>(null);

onMounted(() => {
    scrollContainer.value?.scrollToBottom();
});

const onInsert = async () => {
    if (!scrollContainer.value) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value!;

    const isAtBottom = scrollHeight - (scrollTop + clientHeight) <= 5;

    if (isAtBottom) {
        await nextTick();
        scrollContainer.value.scrollToBottom();
    }
};
watch(displays, onInsert);
</script>

<template>
    <div class="size-full p-4 border border-zinc-600 rounded-3xl layer">
        <DynamicScroller
            :items="displays"
            :min-item-size="144"
            class="size-full p-2 flex flex-col overflow-y-auto scrollbar"
            ref="scrollContainer"
        >
            <template #default="{ item, index, active }">
                <DynamicScrollerItem :item="item" :active="active" :index="index">
                    <div
                        class="inline mb-0.5 text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed wrap-break-word"
                    >
                        <div
                            class="inline-block size-3 mr-2 border border-zinc-800 rounded-full align-middle"
                            :class="
                                item.level === 'info'
                                    ? 'bg-green-400 dark:bg-green-800'
                                    : item.level === 'warn'
                                      ? 'bg-yellow-300 dark:bg-yellow-800'
                                      : 'bg-red-400 dark:bg-red-900'
                            "
                        />
                        <span
                            v-for="label in item.labels"
                            :key="label"
                            class="text-xs mr-2 p-px rounded-full border border-zinc-500 bg-peach-200 dark:text-zinc-500 dark:bg-zinc-700 dark:border-0 px-1 size-max align-middle"
                        >
                            {{ label }}
                        </span>
                        <span class="whitespace-pre-wrap align-middle" v-html="item.content" />
                    </div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>

<style scoped></style>
