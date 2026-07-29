<template>
  <div class="relative">
    <p class="brand-eyebrow text-xs sm:text-sm">{{ eyebrow }}</p>

    <h1 class="ui-title-lg mt-4">
      {{ titlePrefix }}
      <!-- A altura é reservada pelo item mais longo (renderizado invisível),
           pra troca de mensagem não empurrar a página. -->
      <span class="relative block">
        <span class="invisible" aria-hidden="true">{{ longest }}</span>
        <Transition name="rot">
          <!-- Sublinhado dourado em vez de texto dourado: no corpo de display o
               dourado fica na fronteira do contraste AA, e o fio lê melhor. -->
          <a
            :key="index"
            :href="current.href"
            class="absolute inset-0 underline decoration-[3px]
            underline-offset-[0.14em] hover:decoration-4"
            style="text-decoration-color: var(--brand-accent)"
          >{{ current.audience }}</a>
        </Transition>
      </span>
    </h1>

    <!-- Leitor de tela recebe a lista inteira de uma vez: um carrossel que
         reescreve o <h1> a cada 5s seria hostil com leitura assistiva. -->
    <span class="sr-only">
      Atendemos: {{ items.map((item) => item.audience).join('; ') }}.
    </span>

    <p
      class="brand-ink-soft mt-6 max-w-xl text-lg leading-relaxed"
      aria-hidden="true"
    >
      <Transition name="rot" mode="out-in">
        <span :key="index">{{ current.lead }}</span>
      </Transition>
    </p>

    <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a :href="waHref" target="_blank" rel="noopener" class="brand-btn ui-btn-lg">
        <span class="i-lucide-message-circle" />
        {{ ctaLabel }}
      </a>
      <a :href="current.href" class="brand-btn-ghost ui-btn-lg">
        {{ current.ctaLabel }}
      </a>
    </div>

    <!-- Os marcadores também são a navegação manual: quem quer ler tudo não
         precisa esperar o ciclo. -->
    <div class="mt-9 flex items-center gap-2.5">
      <button
        v-for="(item, i) in items"
        :key="item.audience"
        type="button"
        class="h-1 rounded-full transition-all duration-300"
        :class="i === index ? 'w-9 bg-accent' : 'w-4 bg-ink-200'"
        :aria-label="`Mostrar: ${item.audience}`"
        @click="select(i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, computed, onMounted, onUnmounted,
} from 'vue';

type Item = {
  audience: string;
  lead: string;
  ctaLabel: string;
  href: string;
};

const props = defineProps<{
  eyebrow: string;
  titlePrefix: string;
  items: Item[];
  ctaLabel: string;
  waHref: string;
}>();

const index = ref(0);
const current = computed(() => props.items[index.value] as Item);
const longest = computed(() => props.items.reduce((acc, item) => {
  return item.audience.length > acc.length ? item.audience : acc;
}, ''));

let timer: ReturnType<typeof setInterval> | undefined;
const start = () => {
  timer = setInterval(() => {
    index.value = (index.value + 1) % props.items.length;
  }, 5000);
};
const select = (i: number) => {
  // Clique manual encerra a rotação: seguir trocando por baixo de quem está
  // lendo é o jeito mais rápido de perder o visitante.
  if (timer) clearInterval(timer);
  timer = undefined;
  index.value = i;
};

onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.rot-enter-active,
.rot-leave-active {
  transition: opacity 400ms ease, transform 400ms ease;
}
.rot-enter-from {
  opacity: 0;
  transform: translateY(0.4em);
}
.rot-leave-to {
  opacity: 0;
  transform: translateY(-0.4em);
}
</style>
