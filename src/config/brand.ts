/*
 * FONTE ÚNICA DA VERDADE da identidade visual da gccont.
 *
 * Tudo que é "marca" (cor, tipografia, assinatura, tom) nasce aqui e é
 * consumido por três lugares — nunca duplique um hex fora deste arquivo:
 *
 *   1. `uno.config.ts`            → as escalas viram utilitários (`bg-primary`,
 *                                   `text-ink-700`, `ring-accent-300`…);
 *   2. `src/components/BrandTokens.astro` → emite as variáveis CSS `--brand-*`
 *                                   usadas por `src/assets/brand.css`;
 *   3. `src/pages/marca.astro`    → o manual de identidade LÊ deste arquivo,
 *                                   então ele não tem como desatualizar.
 *
 * Trocar a paleta da marca = editar `palette` aqui. Site e manual acompanham.
 */

/** Azul-marinho — cor da marca. Títulos, blocos de destaque, superfícies escuras. */
const ink = {
  50: '#F3F6FA',
  100: '#E5EBF3',
  200: '#C7D3E4',
  300: '#9BAECB',
  400: '#6B84AA',
  500: '#48628C',
  600: '#33496F',
  700: '#26385A',
  800: '#1B2A45',
  900: '#132038',
  950: '#0B1526',
};

/** Azul institucional — cor primária. Botões, links, elementos de ação. */
const primary = {
  50: '#EFF5FC',
  100: '#DAE7F7',
  200: '#B6CDEE',
  300: '#85ACE1',
  400: '#5286CE',
  500: '#2F66B4',
  600: '#1F5195',
  700: '#1A4179',
  800: '#163460',
  900: '#12294B',
  950: '#0A1930',
};

/**
 * Dourado — cor de destaque. É a camada de elegância da marca: fios, molduras,
 * numeração, realce sobre azul-marinho.
 *
 * ⚠️ O dourado 500 NÃO passa contraste AA como texto sobre branco (2,8:1).
 * Para texto dourado sobre fundo claro existe o `accent-strong` (700, 5,9:1).
 * Sobre azul-marinho, o 500 tem 5,6:1 e é o uso preferencial.
 */
const accent = {
  50: '#FBF7EC',
  100: '#F6EDD3',
  200: '#EDDCA6',
  300: '#E1C46F',
  400: '#D4AC43',
  500: '#C1922B',
  600: '#A67722',
  700: '#855B1E',
  800: '#6B491F',
  900: '#5A3D1D',
  950: '#33210F',
};

export const palette = { ink, primary, accent };

/**
 * Tokens semânticos: o que cada cor SIGNIFICA na comunicação.
 * Componentes referenciam papel (`--brand-primary`), nunca o hex.
 */
export const tokens = {
  'brand-ink': ink[900],
  'brand-ink-soft': ink[600],
  'brand-ink-muted': ink[500],
  /* Sobre azul-marinho os tons de texto precisam subir na escala pra manter
   * contraste AA — daí o par dedicado em vez de reaproveitar os de cima. */
  'brand-on-ink-soft': ink[200],
  'brand-on-ink-muted': ink[300],
  'brand-primary': primary[600],
  'brand-primary-hover': primary[700],
  'brand-primary-contrast': '#FFFFFF',
  'brand-primary-soft': primary[50],
  'brand-accent': accent[500],
  'brand-accent-strong': accent[700],
  'brand-accent-soft': accent[50],
  'brand-surface': '#FFFFFF',
  'brand-surface-alt': ink[50],
  'brand-surface-ink': ink[900],
  'brand-border': ink[200],
  /* Arredondamento contido: elegância vem de canto reto, não de pílula. */
  'brand-radius': '0.375rem',
};

/** Bloco `:root { … }` pronto pra injetar no <head>. */
export const tokensCss = `:root{\n${Object.entries(tokens)
  .map(([key, value]) => `  --${key}: ${value};`)
  .join('\n')}\n}`;

export const typography = {
  display: {
    family: 'Playfair Display',
    cssVar: '--brand-font-display',
    role: 'Títulos e a assinatura da marca',
    detail: 'Serifada de alto contraste. É a fonte que carrega a elegância da'
      + ' marca — e é por isso que ela aparece só em título e assinatura,'
      + ' nunca em texto corrido ou em corpo pequeno.',
    weights: [
      { weight: 700, label: 'Playfair Display Bold', usage: 'Títulos principais (H1, H2)' },
      { weight: 500, label: 'Playfair Display Medium', usage: 'Subtítulos e o logotipo (H3)' },
    ],
  },
  text: {
    family: 'Inter',
    cssVar: '--brand-font-sans',
    role: 'Textos corridos, interface e materiais impressos',
    detail: 'Alta legibilidade em corpo pequeno e números bem resolvidos — é a'
      + ' fonte que carrega contrato, tabela de alíquota e post de Instagram.',
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
    name: 'Azul-Marinho',
    hex: ink[900],
    role: 'Cor da marca',
    usage: 'Títulos, blocos em destaque e fundos escuros',
    isDark: true,
  },
  {
    name: 'Azul Institucional',
    hex: primary[600],
    role: 'Cor primária',
    usage: 'Botões, links internos e externos, elementos de ação',
    isDark: true,
  },
  {
    name: 'Dourado',
    hex: accent[500],
    role: 'Cor de destaque',
    usage: 'Fios, molduras, numeração e realce sobre azul-marinho',
    isDark: true,
  },
  {
    name: 'Branco',
    hex: '#FFFFFF',
    role: 'Cor de fundo',
    usage: 'Fundo padrão de toda a comunicação da marca',
    isDark: false,
  },
  {
    name: 'Azul Névoa',
    hex: ink[50],
    role: 'Fundo alternativo',
    usage: 'Separa seções sem quebrar o branco institucional',
    isDark: false,
  },
  {
    name: 'Dourado Escuro',
    hex: accent[700],
    role: 'Destaque em texto',
    usage: 'A única variação de dourado permitida como texto sobre fundo claro',
    isDark: true,
  },
];

/** Escalas completas — só pra documentar no manual o que existe no código. */
export const colorScales = [
  { name: 'Azul-Marinho', prefix: 'ink', scale: ink },
  { name: 'Azul Institucional', prefix: 'primary', scale: primary },
  { name: 'Dourado', prefix: 'accent', scale: accent },
];
