import {
  defineConfig,
  presetWind3,
  presetIcons,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { palette } from './src/config/brand';

/*
 * As escalas vêm de `src/config/brand.ts` — não redeclare cor aqui.
 * `presetWind3` mantém a sintaxe Tailwind v3 usada no www.e-com.plus,
 * então classe escrita lá funciona aqui sem tradução.
 */
export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      scale: 1.2,
      extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      ink: { ...palette.ink, DEFAULT: palette.ink[900] },
      primary: { ...palette.primary, DEFAULT: palette.primary[600] },
    },
    fontFamily: {
      sans: 'var(--brand-font-sans)',
      display: 'var(--brand-font-display)',
    },
  },
  // Classes montadas dinamicamente (ícones vindos de src/config/site.ts).
  safelist: [
    'i-lucide-clock-alert', 'i-lucide-receipt', 'i-lucide-message-circle-question',
    'i-lucide-file-plus', 'i-lucide-code-xml', 'i-lucide-palette',
    'i-lucide-briefcase', 'i-lucide-stethoscope', 'i-lucide-rocket',
    'i-lucide-repeat', 'i-lucide-file-check', 'i-lucide-calendar-check',
    'i-lucide-wallet', 'i-lucide-calculator', 'i-lucide-user-check',
    'i-lucide-message-square-more',
  ],
});
