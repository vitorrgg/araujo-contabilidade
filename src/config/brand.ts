/*
 * FONTE ÚNICA DA VERDADE da identidade visual.
 *
 * Tudo que é "marca" (cor, tipografia, assinatura, tom) nasce aqui e é
 * consumido por três lugares — nunca duplique um hex fora deste arquivo:
 *
 *   1. `uno.config.ts`            → as escalas viram utilitários (`bg-primary`,
 *                                   `text-ink-700`, `ring-primary-300`…);
 *   2. `src/components/BrandTokens.astro` → emite as variáveis CSS `--brand-*`
 *                                   usadas por `src/assets/brand.css`;
 *   3. `src/pages/marca.astro`    → o manual de identidade LÊ deste arquivo,
 *                                   então ele não tem como desatualizar.
 *
 * Trocar a paleta da marca = editar `palette` aqui. Site e manual acompanham.
 */

/** Grafite — cor da marca. Títulos, blocos de destaque, superfícies escuras. */
const ink = {
  50: '#F6F7F9',
  100: '#EBEEF2',
  200: '#D5DBE3',
  300: '#B0BAC7',
  400: '#7F8DA0',
  500: '#5C6B80',
  600: '#465468',
  700: '#364154',
  800: '#232E3E',
  900: '#1B2430',
  950: '#111823',
};

/** Verde esmeralda — cor primária. Botões, links, detalhes em destaque. */
const primary = {
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',
  600: '#0E9F6E',
  700: '#0B7F58',
  800: '#096646',
  900: '#075239',
  950: '#032F21',
};

export const palette = { ink, primary };

/**
 * Tokens semânticos: o que cada cor SIGNIFICA na comunicação.
 * Componentes referenciam papel (`--brand-primary`), nunca o hex.
 */
export const tokens = {
  'brand-ink': ink[900],
  'brand-ink-soft': ink[600],
  'brand-ink-muted': ink[500],
  /* Sobre grafite os tons de texto precisam subir na escala pra manter
   * contraste AA — daí o par dedicado em vez de reaproveitar os de cima. */
  'brand-on-ink-soft': ink[200],
  'brand-on-ink-muted': ink[300],
  'brand-primary': primary[600],
  'brand-primary-hover': primary[700],
  'brand-primary-contrast': '#FFFFFF',
  'brand-primary-soft': primary[50],
  'brand-accent': primary[400],
  'brand-surface': '#FFFFFF',
  'brand-surface-alt': ink[50],
  'brand-surface-ink': ink[900],
  'brand-border': ink[200],
  'brand-radius': '0.625rem',
};

/** Bloco `:root { … }` pronto pra injetar no <head>. */
export const tokensCss = `:root{\n${Object.entries(tokens)
  .map(([key, value]) => `  --${key}: ${value};`)
  .join('\n')}\n}`;

export const typography = {
  display: {
    family: 'Sora',
    cssVar: '--brand-font-display',
    role: 'Títulos e a assinatura da marca',
    detail: 'Geométrica, com números bem desenhados — importante pra uma marca'
      + ' que comunica valores, prazos e alíquotas o tempo todo.',
    weights: [
      { weight: 700, label: 'Sora Bold', usage: 'Títulos principais (H1, H2)' },
      { weight: 600, label: 'Sora SemiBold', usage: 'Subtítulos e destaques (H3, números)' },
    ],
  },
  text: {
    family: 'Inter',
    cssVar: '--brand-font-sans',
    role: 'Textos corridos, interface e materiais impressos',
    detail: 'Alta legibilidade em corpo pequeno — é a fonte que carrega'
      + ' contrato, tabela de preço e post de Instagram.',
    weights: [
      { weight: 600, label: 'Inter SemiBold', usage: 'Rótulos, botões e ênfase' },
      { weight: 400, label: 'Inter Regular', usage: 'Texto corrido' },
    ],
  },
};

/**
 * Cores institucionais, na ordem em que aparecem no manual.
 * `role` é a função na comunicação; `usage` é a regra de aplicação.
 */
export const institutionalColors = [
  {
    name: 'Grafite',
    hex: ink[900],
    role: 'Cor da marca',
    usage: 'Títulos, blocos em destaque e fundos escuros',
    isDark: true,
  },
  {
    name: 'Verde Esmeralda',
    hex: primary[600],
    role: 'Cor primária',
    usage: 'Botões, links internos e externos, detalhes em destaque',
    isDark: true,
  },
  {
    name: 'Verde Menta',
    hex: primary[400],
    role: 'Cor de apoio',
    usage: 'Realces, ícones e gráficos sobre fundo escuro',
    isDark: false,
  },
  {
    name: 'Branco',
    hex: '#FFFFFF',
    role: 'Cor de fundo',
    usage: 'Fundo padrão de toda a comunicação da marca',
    isDark: false,
  },
  {
    name: 'Cinza Névoa',
    hex: ink[50],
    role: 'Fundo alternativo',
    usage: 'Separa seções sem quebrar o branco institucional',
    isDark: false,
  },
];

/** Escalas completas — só pra documentar no manual o que existe no código. */
export const colorScales = [
  { name: 'Grafite', prefix: 'ink', scale: ink },
  { name: 'Verde', prefix: 'primary', scale: primary },
];
