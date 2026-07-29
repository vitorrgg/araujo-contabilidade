<template>
  <div class="lg:hidden">
    <button
      type="button"
      class="inline-flex items-center justify-center size-10 rounded-lg
      brand-ink hover:brand-surface-alt"
      :aria-expanded="isOpen"
      aria-controls="mobile-nav"
      aria-label="Abrir menu"
      @click="isOpen = !isOpen"
    >
      <span :class="isOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="text-2xl" />
    </button>

    <div
      v-show="isOpen"
      id="mobile-nav"
      class="fixed inset-x-0 top-[65px] z-40 border-b brand-border
      brand-surface px-5 py-4 shadow-lg"
    >
      <nav class="flex flex-col" aria-label="Principal">
        <a
          v-for="item in items"
          :key="item.href"
          :href="item.href"
          class="border-b brand-divider py-3 text-base font-medium brand-ink"
          @click="isOpen = false"
        >
          {{ item.label }}
        </a>
      </nav>
      <a
        :href="waHref"
        target="_blank"
        rel="noopener"
        class="brand-btn ui-btn mt-4 w-full"
      >
        <span class="i-lucide-message-circle" />
        Falar no WhatsApp
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  items: Array<{ label: string; href: string }>;
  waHref: string;
}>();

const isOpen = ref(false);
</script>
