/*
 * Catálogo dos arquivos de logo distribuíveis.
 *
 * Consumido por dois lados, de propósito:
 *   - `scripts/gerar-logos.ts` desenha os SVG/PNG a partir desta lista;
 *   - `src/pages/marca.astro` monta a área de download a partir dela também.
 *
 * Assim a página nunca oferece um arquivo que o gerador não produz, nem deixa
 * de listar um que existe. Para adicionar uma variação, acrescente aqui e rode
 * `npm run logos`.
 */

/** Como o desenho é composto. */
export type Composicao = 'horizontal' | 'vertical' | 'icone';

/** Qual jogo de cores. Espelha as 4 variações do manual. */
export type Variante = 'cor' | 'negativa' | 'mono-escura' | 'mono-branca';

export type ArquivoLogo = {
  nome: string;
  rotulo: string;
  uso: string;
  composicao: Composicao;
  variante: Variante;
  /** Fundo chapado dentro do arquivo. `null` = transparente. */
  fundo: null | 'branco' | 'marinho';
  /** Superfície do preview no manual — precisa contrastar com o desenho. */
  preview: 'claro' | 'escuro';
  larguraPng: number;
};

export const logoFiles: ArquivoLogo[] = [
  {
    nome: 'gccont-assinatura-cor',
    rotulo: 'Assinatura colorida',
    uso: 'Uso preferencial, sobre fundo branco ou azul névoa.',
    composicao: 'horizontal',
    variante: 'cor',
    fundo: null,
    preview: 'claro',
    larguraPng: 1200,
  },
  {
    nome: 'gccont-assinatura-negativa',
    rotulo: 'Assinatura negativa',
    uso: 'Sobre azul-marinho ou foto escura, com contraste suficiente.',
    composicao: 'horizontal',
    variante: 'negativa',
    fundo: null,
    preview: 'escuro',
    larguraPng: 1200,
  },
  {
    nome: 'gccont-assinatura-mono-escura',
    rotulo: 'Assinatura monocromática',
    uso: 'Impressão em uma cor, carimbo e gravação.',
    composicao: 'horizontal',
    variante: 'mono-escura',
    fundo: null,
    preview: 'claro',
    larguraPng: 1200,
  },
  {
    nome: 'gccont-assinatura-mono-branca',
    rotulo: 'Assinatura negativa monocromática',
    uso: 'Fundo escuro com restrição de cor — ex.: aplicação em vinil.',
    composicao: 'horizontal',
    variante: 'mono-branca',
    fundo: null,
    preview: 'escuro',
    larguraPng: 1200,
  },
  {
    nome: 'gccont-assinatura-fundo-branco',
    rotulo: 'Assinatura com fundo branco',
    uso: 'Quando o arquivo vai cair sobre fundo que você não controla.',
    composicao: 'horizontal',
    variante: 'cor',
    fundo: 'branco',
    preview: 'claro',
    larguraPng: 1200,
  },
  {
    nome: 'gccont-assinatura-fundo-marinho',
    rotulo: 'Assinatura com fundo azul-marinho',
    uso: 'Selo pronto para slide, banner e material de terceiro.',
    composicao: 'horizontal',
    variante: 'negativa',
    fundo: 'marinho',
    preview: 'claro',
    larguraPng: 1200,
  },
  {
    nome: 'gccont-assinatura-vertical-cor',
    rotulo: 'Assinatura vertical',
    uso: 'Espaços altos e estreitos: cartão, crachá, rodapé de peça.',
    composicao: 'vertical',
    variante: 'cor',
    fundo: null,
    preview: 'claro',
    larguraPng: 800,
  },
  {
    nome: 'gccont-assinatura-vertical-negativa',
    rotulo: 'Assinatura vertical negativa',
    uso: 'A mesma composição, para fundo escuro.',
    composicao: 'vertical',
    variante: 'negativa',
    fundo: null,
    preview: 'escuro',
    larguraPng: 800,
  },
  {
    nome: 'gccont-icone-cor',
    rotulo: 'Ícone colorido',
    uso: 'Avatar de rede social, favicon e selo. Tem fundo próprio.',
    composicao: 'icone',
    variante: 'cor',
    fundo: null,
    preview: 'claro',
    larguraPng: 512,
  },
  {
    nome: 'gccont-icone-negativo',
    rotulo: 'Ícone negativo',
    uso: 'Sem fundo: o emblema fica só no fio e no monograma dourado.',
    composicao: 'icone',
    variante: 'negativa',
    fundo: null,
    preview: 'escuro',
    larguraPng: 512,
  },
  {
    nome: 'gccont-icone-mono-escuro',
    rotulo: 'Ícone monocromático',
    uso: 'Uma cor sobre fundo claro.',
    composicao: 'icone',
    variante: 'mono-escura',
    fundo: null,
    preview: 'claro',
    larguraPng: 512,
  },
  {
    nome: 'gccont-icone-mono-branco',
    rotulo: 'Ícone negativo monocromático',
    uso: 'Uma cor sobre fundo escuro.',
    composicao: 'icone',
    variante: 'mono-branca',
    fundo: null,
    preview: 'escuro',
    larguraPng: 512,
  },
];

/** Onde os arquivos são servidos. */
export const logosBase = '/marca/logos';
export const logosZip = `${logosBase}/gccont-logos.zip`;

/** Agrupamento usado na área de download do manual. */
export const logoGrupos: Array<{ titulo: string; composicao: Composicao }> = [
  { titulo: 'Assinatura horizontal', composicao: 'horizontal' },
  { titulo: 'Assinatura vertical', composicao: 'vertical' },
  { titulo: 'Ícone', composicao: 'icone' },
];
