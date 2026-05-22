<script setup lang="ts">
import LevelSelector from "./components/level-selector.vue";
import LabelSelector from "./components/label-selector.vue";
import LogView from "./components/log-view.vue";
</script>

<template>
    <div class="h-screen flex flex-col justify-center items-center p-4 lg:px-[15%] lg:py-10 gap-6">
        <level-selector />
        <label-selector />
        <div class="flex-1 w-full min-h-0">
            <log-view />
        </div>
    </div>
</template>
