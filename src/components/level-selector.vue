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
                :class="selectedLevel.info ? 'bg-green-800' : 'bg-zinc-600'"
            />
            <div
                class="hover:text-zinc-300 transition-colors"
                :class="selectedLevel.info ? 'text-zinc-400' : 'text-zinc-600'"
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
                :class="selectedLevel.warn ? 'bg-yellow-800' : 'bg-zinc-600'"
            />
            <div
                class="hover:text-zinc-300 transition-colors"
                :class="selectedLevel.warn ? 'text-zinc-400' : 'text-zinc-600'"
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
                :class="selectedLevel.error ? 'bg-red-900' : 'bg-zinc-600'"
            />
            <div
                class="hover:text-zinc-300 transition-colors"
                :class="selectedLevel.error ? 'text-zinc-400' : 'text-zinc-600'"
            >
                error
            </div>
        </div>
    </div>
</template>

<style scoped></style>
