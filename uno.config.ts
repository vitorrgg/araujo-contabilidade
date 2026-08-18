import {
  defineConfig,
  presetWind3,
  presetIcons,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { palette } from './src/config/brand';
import * as siteConfig from './src/config/site';
import { certificado } from './src/config/certificado';

/*
 * As escalas vêm de `src/config/brand.ts` — não redeclare cor aqui.
 * `presetWind3` mantém a sintaxe Tailwind v3 usada no www.e-com.plus,
 * então classe escrita lá funciona aqui sem tradução.
 */
/** Varre um objeto de configuração e junta todo `i-lucide-*` que encontrar. */
const collectIcons = (value: unknown, found = new Set<string>()) => {
  if (typeof value === 'string') {
    if (value.startsWith('i-lucide-')) found.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectIcons(item, found));
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectIcons(item, found));
  }
  return found;
};

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
      accent: { ...palette.accent, DEFAULT: palette.accent[500] },
    },
    fontFamily: {
      sans: 'var(--brand-font-sans)',
      display: 'var(--brand-font-display)',
    },
  },
  /*
   * Ícones vêm como string dentro dos configs, então o extrator do UnoCSS não
   * os enxerga — precisam de safelist. Manter a lista à mão já custou um ícone
   * faltando em produção, então ela é derivada dos próprios configs: adicionar
   * um `i-lucide-*` no conteúdo passa a bastar.
   */
  safelist: [...collectIcons({ ...siteConfig, certificado })],
});
