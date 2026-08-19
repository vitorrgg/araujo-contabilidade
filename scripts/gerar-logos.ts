/*
 * Gera os arquivos de logo distribuíveis a partir da MESMA fonte da verdade que
 * o site usa (`src/config/brand.ts`). Rodar com `npm run logos`.
 *
 * Por que existe: `Logo.astro` desenha a assinatura no navegador, com texto
 * vivo em Playfair Display. Isso é ótimo pro site e inútil pra quem precisa do
 * arquivo — designer, gráfica, quem monta um post. Este script produz SVG e PNG
 * com **o texto convertido em contorno**, então o arquivo abre igual em qualquer
 * máquina, com ou sem a fonte instalada.
 *
 * Mudou a paleta em `brand.ts`? Rode de novo e todos os arquivos saem atualizados.
 *
 * A fonte fica em `.fonts/` (fora do versionamento, ver .gitignore) e é baixada
 * pelo próprio script quando falta — Playfair Display é OFL, então distribuir o
 * contorno dentro do logo é permitido.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import { Resvg } from '@resvg/resvg-js';
import JSZip from 'jszip';
import { palette, tokens } from '../src/config/brand.ts';
import { logoFiles, type Variante as NomeVariante } from '../src/config/logos.ts';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destino = path.join(raiz, 'public/marca/logos');
const pastaFontes = path.join(raiz, '.fonts');

/* Instâncias estáticas da Playfair Display no Google Fonts. A variável não
 * serve: o opentype.js só enxerga o master padrão dela, e o logotipo precisa
 * de 700 e 400 de verdade. */
const FONTES = {
  700: {
    arquivo: 'PlayfairDisplay-Bold.ttf',
    url: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf',
  },
  400: {
    arquivo: 'PlayfairDisplay-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.ttf',
  },
};

const carregarFonte = async (peso: 400 | 700) => {
  const { arquivo, url } = FONTES[peso];
  const caminho = path.join(pastaFontes, arquivo);
  if (!fs.existsSync(caminho)) {
    fs.mkdirSync(pastaFontes, { recursive: true });
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error(`Falha ao baixar ${arquivo}: ${resposta.status}`);
    fs.writeFileSync(caminho, Buffer.from(await resposta.arrayBuffer()));
    console.log(`  baixei ${arquivo}`);
  }
  const buffer = fs.readFileSync(caminho);
  return opentype.parse(
    buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
  );
};

const fonteBold = await carregarFonte(700);
const fonteRegular = await carregarFonte(400);

/* --- tipografia em contorno --------------------------------------------- */

type Trecho = { texto: string; peso: 400 | 700 };

/**
 * Compõe os trechos numa única path, aplicando o tracking manualmente — o
 * opentype.js não conhece letter-spacing, então o avanço é somado à mão.
 */
const traçar = (trechos: Trecho[], tamanho: number, tracking: number) => {
  const path = new opentype.Path();
  let x = 0;
  for (const { texto, peso } of trechos) {
    const fonte = peso === 700 ? fonteBold : fonteRegular;
    for (const letra of texto) {
      path.extend(fonte.getPath(letra, x, 0, tamanho));
      x += fonte.getAdvanceWidth(letra, tamanho) + tracking * tamanho;
    }
  }
  const caixa = path.getBoundingBox();
  return {
    d: path.toPathData(3),
    largura: caixa.x2 - caixa.x1,
    altura: caixa.y2 - caixa.y1,
    x1: caixa.x1,
    y1: caixa.y1,
    y2: caixa.y2,
  };
};

/** Move uma path por (dx, dy) sem reprocessar os contornos. */
const mover = (d: string, dx: number, dy: number) => {
  return `<path d="${d}" transform="translate(${dx.toFixed(3)} ${dy.toFixed(3)})"`;
};

/* --- geometria (o emblema vale 100 unidades; tudo escala a partir dele) --- */

const E = 100;
const RAIO_EXTERNO = 16;
const RECUO_FIO = 7.5;
const RAIO_INTERNO = 10;
const CORPO_MONOGRAMA = 46;
const TRACKING_MONOGRAMA = -0.03;
const CORPO_LOGOTIPO = 50;
const TRACKING_LOGOTIPO = -0.015;
const ESPACO = 30;

const ink = palette.ink[900];
const dourado = tokens['brand-accent'];
const branco = '#FFFFFF';

type Variante = {
  fundoEmblema: string | null;
  marca: string;
  logotipo: string;
  opacidadeFio: number;
};

const VARIANTES: Record<string, Variante> = {
  cor: { fundoEmblema: ink, marca: dourado, logotipo: ink, opacidadeFio: 0.7 },
  negativa: { fundoEmblema: null, marca: dourado, logotipo: branco, opacidadeFio: 0.85 },
  'mono-escura': { fundoEmblema: ink, marca: branco, logotipo: ink, opacidadeFio: 0.7 },
  'mono-branca': { fundoEmblema: null, marca: branco, logotipo: branco, opacidadeFio: 0.85 },
};

const monograma = traçar([{ texto: 'gc', peso: 700 }], CORPO_MONOGRAMA, TRACKING_MONOGRAMA);
const logotipo = traçar(
  [{ texto: 'gc', peso: 700 }, { texto: 'cont', peso: 400 }],
  CORPO_LOGOTIPO,
  TRACKING_LOGOTIPO,
);

/** O emblema, já centrado ópticamente pela caixa real do desenho. */
const emblema = (v: Variante) => {
  const fundo = v.fundoEmblema
    ? `<rect width="${E}" height="${E}" rx="${RAIO_EXTERNO}" fill="${v.fundoEmblema}"/>`
    : '';
  const fio = `<rect x="${RECUO_FIO}" y="${RECUO_FIO}" width="${E - RECUO_FIO * 2}"`
    + ` height="${E - RECUO_FIO * 2}" rx="${RAIO_INTERNO}" fill="none"`
    + ` stroke="${v.marca}" stroke-width="1" opacity="${v.opacidadeFio}"/>`;
  // Centrar pela caixa do glifo, e não pela linha de base: "gc" tem descendente
  // no g, e centrar pela linha deixaria o desenho alto dentro do quadrado.
  const dx = (E - monograma.largura) / 2 - monograma.x1;
  const dy = (E - monograma.altura) / 2 - monograma.y1;
  return `${fundo}${fio}${mover(monograma.d, dx, dy)} fill="${v.marca}"/>`;
};

const svg = (largura: number, altura: number, conteudo: string, fundo?: string) => {
  const base = fundo ? `<rect width="${largura}" height="${altura}" fill="${fundo}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largura} ${altura}"`
    + ` width="${largura}" height="${altura}" role="img" aria-label="gccont">\n`
    + `  <title>gccont</title>\n  ${base}${conteudo}\n</svg>\n`;
};

/* --- as composições ------------------------------------------------------ */

const assinaturaHorizontal = (v: Variante, fundo?: string) => {
  const largura = E + ESPACO + logotipo.largura;
  const dx = E + ESPACO - logotipo.x1;
  const dy = (E - logotipo.altura) / 2 - logotipo.y1;
  const margem = fundo ? 24 : 0;
  const conteudo = `<g transform="translate(${margem} ${margem})">${emblema(v)}`
    + `${mover(logotipo.d, dx, dy)} fill="${v.logotipo}"/></g>`;
  return svg(largura + margem * 2, E + margem * 2, conteudo, fundo);
};

const assinaturaVertical = (v: Variante, fundo?: string) => {
  const espacoVertical = 26;
  const largura = Math.max(E, logotipo.largura);
  const altura = E + espacoVertical + logotipo.altura;
  const margem = fundo ? 24 : 0;
  const dxEmblema = (largura - E) / 2;
  const dxLogotipo = (largura - logotipo.largura) / 2 - logotipo.x1;
  const dyLogotipo = E + espacoVertical - logotipo.y1;
  const conteudo = `<g transform="translate(${margem} ${margem})">`
    + `<g transform="translate(${dxEmblema.toFixed(3)} 0)">${emblema(v)}</g>`
    + `${mover(logotipo.d, dxLogotipo, dyLogotipo)} fill="${v.logotipo}"/></g>`;
  return svg(largura + margem * 2, altura + margem * 2, conteudo, fundo);
};

const icone = (v: Variante) => svg(E, E, emblema(v));

/*
 * O monograma solto: só o "gc", sem o quadrado e sem o fio.
 *
 * A caixa do SVG abraça o desenho (sem respiro), porque quem usa a marca solta
 * quer controlar o espaçamento por conta. E a cor NÃO vem de `Variante.marca`:
 * lá o "gc" é o que aparece dentro do quadrado, então na monocromática escura
 * ele é branco. Solto sobre fundo claro, tem que ser azul-marinho.
 */
const COR_MONOGRAMA: Record<string, string> = {
  cor: dourado,
  negativa: dourado,
  'mono-escura': ink,
  'mono-branca': branco,
};

const monogramaSolto = (variante: string) => {
  const cor = COR_MONOGRAMA[variante] ?? ink;
  const conteudo = `${mover(monograma.d, -monograma.x1, -monograma.y1)} fill="${cor}"/>`;
  return svg(
    Number(monograma.largura.toFixed(3)),
    Number(monograma.altura.toFixed(3)),
    conteudo,
  );
};

/* --- o catálogo ----------------------------------------------------------
 * A lista de arquivos vem de `src/config/logos.ts`, a mesma que a área de
 * download do manual consome — a página não tem como oferecer um arquivo que
 * este script não gera. */

const FUNDOS = { branco, marinho: ink } as const;

const desenhar = (arquivo: (typeof logoFiles)[number]) => {
  const v = VARIANTES[arquivo.variante as NomeVariante]!;
  const fundo = arquivo.fundo ? FUNDOS[arquivo.fundo] : undefined;
  if (arquivo.composicao === 'monograma') return monogramaSolto(arquivo.variante);
  if (arquivo.composicao === 'icone') return icone(v);
  if (arquivo.composicao === 'vertical') return assinaturaVertical(v, fundo);
  return assinaturaHorizontal(v, fundo);
};

/* --- escrita ------------------------------------------------------------- */

fs.rmSync(destino, { recursive: true, force: true });
fs.mkdirSync(destino, { recursive: true });

const zip = new JSZip();

for (const arquivo of logoFiles) {
  const { nome, larguraPng } = arquivo;
  const conteudo = desenhar(arquivo);
  fs.writeFileSync(path.join(destino, `${nome}.svg`), conteudo);
  const png = new Resvg(conteudo, { fitTo: { mode: 'width', value: larguraPng } })
    .render()
    .asPng();
  fs.writeFileSync(path.join(destino, `${nome}.png`), png);
  zip.file(`${nome}.svg`, conteudo);
  zip.file(`${nome}.png`, png);
  console.log(`  ${nome}  (svg + png ${larguraPng}px)`);
}

const pacote = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
fs.writeFileSync(path.join(destino, 'gccont-logos.zip'), pacote);

console.log(`\n${logoFiles.length} logos (SVG + PNG) e o .zip em public/marca/logos/`);
