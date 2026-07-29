<template>
  <div class="mx-auto mt-12 max-w-3xl">
    <div
      v-for="(item, index) in items"
      :key="item.q"
      class="border-b brand-divider"
    >
      <h3>
        <button
          type="button"
          class="flex w-full items-start justify-between gap-4 py-5 text-left"
          :aria-expanded="openIndex === index"
          :aria-controls="`faq-answer-${index}`"
          @click="toggle(index)"
        >
          <span class="brand-ink text-lg font-semibold">{{ item.q }}</span>
          <span
            class="i-lucide-chevron-down brand-text-primary mt-1 shrink-0
            text-xl transition-transform duration-200"
            :class="openIndex === index && 'rotate-180'"
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        v-show="openIndex === index"
        :id="`faq-answer-${index}`"
        class="brand-ink-soft pb-6 pr-9 text-[0.98rem] leading-relaxed"
      >
        {{ item.a }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ items: Array<{ q: string; a: string }> }>();

// Acordeão de item único: mantém a página curta e o próximo item visível.
const openIndex = ref<number | null>(0);
const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>
