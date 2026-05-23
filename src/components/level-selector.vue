<script setup lang="ts">
import { selectedLevel } from "../data/filter.ts";
</script>

<template>
    <div class="flex flex-row border border-zinc-600 rounded-3xl layer text-center w-max h-10">
        <div
            class="p-4 flex flex-row flex-nowrap rounded-full items-center gap-2 cursor-pointer"
            @click="selectedLevel.info = !selectedLevel.info"
            role="button"
        >
            <div
                class="size-3 border border-zinc-800 rounded-full transition-colors"
                :class="selectedLevel.info ? 'bg-green-400 dark:bg-green-800' : 'text-zinc-400 dark:bg-zinc-700'"
            />
            <div
                class="transition-colors"
                :class="
                    selectedLevel.info
                        ? 'text-zinc-700 hover:text-peach-700 dark:text-zinc-400 dark:hover:text-zinc-500'
                        : 'text-zinc-400 hover:text-zinc-500 dark:text-zinc-700 dark:hover:text-zinc-600'
                "
            >
                info
            </div>
        </div>

        <div
            class="p-4 flex flex-row flex-nowrap rounded-full items-center gap-2 cursor-pointer"
            @click="selectedLevel.warn = !selectedLevel.warn"
            role="button"
        >
            <div
                class="size-3 border border-zinc-800 rounded-full transition-colors"
                :class="selectedLevel.warn ? 'bg-yellow-300 dark:bg-yellow-800' : 'text-zinc-400 dark:bg-zinc-700'"
            />
            <div
                class="transition-colors"
                :class="
                    selectedLevel.warn
                        ? 'text-zinc-700 hover:text-peach-700 dark:text-zinc-400 dark:hover:text-zinc-500'
                        : 'text-zinc-400 hover:text-zinc-500 dark:text-zinc-700 dark:hover:text-zinc-600'
                "
            >
                warn
            </div>
        </div>

        <div
            class="p-4 flex flex-row flex-nowrap rounded-full items-center gap-2 cursor-pointer"
            @click="selectedLevel.error = !selectedLevel.error"
            role="button"
        >
            <div
                class="size-3 border border-zinc-800 rounded-full transition-colors"
                :class="
                    selectedLevel.error
                        ? 'bg-red-400 dark:bg-red-900'
                        : 'text-zinc-400 dark:bg-zinc-700'
                "
            />
            <div
                class="transition-colors"
                :class="
                    selectedLevel.error
                        ? 'text-zinc-700 hover:text-peach-700 dark:text-zinc-400 dark:hover:text-zinc-500'
                        : 'text-zinc-400 hover:text-zinc-500 dark:text-zinc-700 dark:hover:text-zinc-600'
                "
            >
                error
            </div>
        </div>
    </div>
</template>

<style scoped></style>
