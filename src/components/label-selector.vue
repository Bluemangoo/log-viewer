<script setup lang="ts">
import { isWhiteList, selectedLabels } from "../data/filter.ts";
import { onMounted, ref, watch } from "vue";
const isExpanded = ref(false);

const displayKeys = ref<string[]>([]);

const updateDisplayOrder = () => {
    const keys = Object.keys(selectedLabels);

    if (!isExpanded.value) {
        displayKeys.value = [...keys].sort((a, b) => {
            const aSelected = selectedLabels[a] ? 1 : 0;
            const bSelected = selectedLabels[b] ? 1 : 0;
            return bSelected - aSelected;
        });
    } else {
        displayKeys.value = keys;
    }
};

watch(isExpanded, () => {
    updateDisplayOrder();
});

watch(
    () => Object.keys(selectedLabels),
    (newKeys) => {
        if (isExpanded.value) {
            displayKeys.value = newKeys;
        } else {
            updateDisplayOrder();
        }
    },
    { deep: false },
);

onMounted(() => {
    updateDisplayOrder();
});

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

const selectAll = () => {
    Object.keys(selectedLabels).forEach((key) => {
        selectedLabels[key] = true;
    });
};

const deselectAll = () => {
    Object.keys(selectedLabels).forEach((key) => {
        selectedLabels[key] = false;
    });
};
</script>

<template>
    <div class="w-full p-4 text-sm border border-zinc-600 rounded-3xl layer">
        <div class="flex flex-nowrap">
            <div
                class="flex-1 transition-all duration-200"
                :class="
                    isExpanded
                        ? 'flex flex-wrap gap-y-2.5 gap-x-4'
                        : 'block truncate whitespace-nowrap'
                "
            >
                <div
                    v-for="key in displayKeys"
                    :key="key"
                    class="inline-flex items-center gap-1.5 cursor-pointer select-none"
                    :class="isExpanded ? '' : 'mr-4 align-middle'"
                    @click="selectedLabels[key] = !selectedLabels[key]"
                >
                    <div
                        class="transition-colors"
                        :class="
                            selectedLabels[key]
                                ? 'text-zinc-700 hover:text-peach-700 dark:text-zinc-400 dark:hover:text-zinc-500'
                                : 'text-zinc-400 hover:text-zinc-500 dark:text-zinc-700 dark:hover:text-zinc-600'
                        "
                    >
                        {{ key }}
                    </div>
                </div>
            </div>
            <div>
                <button
                    @click="toggleExpand"
                    class="w-max text-zinc-700 hover:text-peach-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                >
                    {{ isExpanded ? "收起" : "展开" }}
                </button>
            </div>
        </div>

        <div
            v-if="isExpanded"
            class="mt-2.5 flex items-center gap-3 text-xs text-zinc-700 dark:text-zinc-400"
        >
            <button
                @click="selectAll"
                class="hover:text-peach-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            >
                全选
            </button>
            <span class="text-gray-500">/</span>
            <button
                @click="deselectAll"
                class="hover:text-peach-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            >
                清空
            </button>
            <span class="text-gray-500">/</span>
            <button
                @click="isWhiteList = !isWhiteList"
                class="hover:text-peach-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            >
                {{ isWhiteList ? "白名单" : "黑名单" }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>
