/*
 * Os tokens do post, derivados de `src/config/brand.ts`.
 *
 * Mesma regra do site: nenhum hex é escrito aqui. O que este arquivo faz é
 * traduzir a paleta para as decisões que só existem no formato post — tamanho
 * da tela, margem, escala tipográfica e o par de papéis claro/escuro.
 *
 * Trocar a paleta continua sendo editar UM objeto em `brand.ts`; os posts
 * renderizados depois disso já saem na cor nova.
 */
import { palette, tokens as brandTokens } from '../../src/config/brand.ts';

const { ink, accent } = palette;

/** 1080×1350 (4:5) — o maior retrato que o Instagram aceita sem recortar. */
export const CANVAS = { largura: 1080, altura: 1350 };

/** Margem tipográfica. Marca de escritório respira; não encoste no corte. */
export const MARGEM = 96;

/** O fio dourado do topo, que amarra os slides da série no feed. */
export const FIO_TOPO = 10;

export const FONTE = {
  display: 'Playfair Display',
  texto: 'Inter',
};

/**
 * Escala tipográfica do formato. Playfair só em título, número e assinatura —
 * a mesma restrição do site (`typography.display.detail` em brand.ts): em
 * corpo pequeno a serifada de alto contraste pesa e perde legibilidade.
 */
export const CORPO = {
  olho: 26,
  tituloCapa: 78,
  titulo: 54,
  paragrafo: 33,
  item: 32,
  apoio: 30,
  numeroGigante: 190,
  rodape: 24,
  paginacao: 28,
};

/** Tracking do rótulo em caixa alta — espelha `.brand-eyebrow` no brand.css. */
export const TRACKING_OLHO = '0.14em';

export type Tema = 'claro' | 'escuro';

const hexParaRgb = (hex: string) => {
  const limpo = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(limpo.slice(i, i + 2), 16));
};

/** `rgba()` a partir de um token — para véu e divisória, sem inventar cor. */
export const comAlfa = (hex: string, alfa: number) => {
  const [r, g, b] = hexParaRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alfa})`;
};

/**
 * Os papéis de cor por tema.
 *
 * ⚠️ A regra crítica da marca mora aqui: o dourado 500 NÃO passa AA como texto
 * sobre branco (2,8:1). Por isso `douradoTexto` cai para o `accent-strong`
 * (700, 5,9:1) no tema claro, enquanto `douradoGrafico` — fio, moldura, régua,
 * onde não há texto para ler — segue no 500 nos dois temas.
 */
export const papeis = (tema: Tema) => {
  const escuro = tema === 'escuro';
  return {
    escuro,
    fundo: escuro ? ink[900] : brandTokens['brand-surface'],
    /* Um degradê curtíssimo: dá profundidade ao azul-marinho sem virar "fundo
     * colorido", que é o que o manual não quer. */
    fundoGradiente: escuro
      ? `linear-gradient(160deg, ${ink[800]} 0%, ${ink[900]} 48%, ${ink[950]} 100%)`
      : undefined,
    titulo: escuro ? brandTokens['brand-primary-contrast'] : ink[900],
    corpo: escuro ? ink[200] : ink[600],
    apoio: escuro ? ink[300] : ink[500],
    douradoTexto: escuro ? accent[500] : accent[700],
    douradoGrafico: accent[500],
    divisoria: escuro ? comAlfa('#FFFFFF', 0.14) : ink[200],
    /* Botão sobre azul-marinho inverte para branco — a mesma regra que o
     * `.brand-surface-ink .brand-btn` aplica no site. */
    botaoFundo: escuro ? brandTokens['brand-primary-contrast'] : brandTokens['brand-primary'],
    botaoTexto: escuro ? ink[900] : brandTokens['brand-primary-contrast'],
    /* Véu sobre foto: escurece o suficiente para o título branco ficar legível
     * sem apagar a imagem. */
    veu: [
      `linear-gradient(180deg, ${comAlfa(ink[950], 0.45)} 0%,`,
      `${comAlfa(ink[950], 0.72)} 52%,`,
      `${comAlfa(ink[950], 0.94)} 78%,`,
      `${comAlfa(ink[950], 0.98)} 100%)`,
    ].join(' '),
  };
};

export type Papeis = ReturnType<typeof papeis>;

/** Cantos contidos: elegância vem de canto reto, não de pílula (brand.ts). */
export const RAIO = 10;
