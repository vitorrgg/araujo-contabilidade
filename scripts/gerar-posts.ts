/*
 * Renderiza os carrosséis de Instagram a partir dos briefs em `posts/`.
 *
 *   npm run posts            → renderiza todos os posts
 *   npm run posts -- <slug>  → renderiza um só
 *
 * O "todos" não é conveniência: a identidade é código (`src/config/brand.ts`),
 * então mudar a paleta e rodar de novo republica a série inteira coerente —
 * do mesmo jeito que `npm run logos` refaz os arquivos de logo.
 *
 * Como funciona: Satori transforma a árvore de estilo em SVG (é o motor das
 * Open Graph images do Vercel) e o resvg rasteriza. São dois pacotes npm; não
 * há Chromium, nem dependência de sistema, nem fonte instalada na máquina.
 *
 * Saída: `output/<slug>/slide-N.png`, 1080×1350, pronto pra subir.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { arquivoFonte } from './lib/fontes.ts';
import { CANVAS, FONTE } from './posts/tokens.ts';
import { CONSTRUTORES, caminhoImagem, type TipoSlide } from './posts/slides.ts';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pastaPosts = path.join(raiz, 'posts');
const pastaSaida = path.join(raiz, 'output');

const TIPOS = Object.keys(CONSTRUTORES) as TipoSlide[];

/** O Instagram aceita até 20 imagens num carrossel. */
const MAX_SLIDES = 20;
/** Acima disso ninguém arrasta até o fim — é aviso, não erro. */
const SLIDES_CONFORTAVEIS = 10;

const avisos: string[] = [];
const aviso = (mensagem: string) => {
  avisos.push(mensagem);
  console.warn(`  ⚠ ${mensagem}`);
};

/* --- leitura do brief ---------------------------------------------------- */

type Slide = { tipo: TipoSlide } & Record<string, unknown>;

const lerBrief = (slug: string): Slide[] => {
  const caminho = path.join(pastaPosts, slug, 'brief.md');
  if (!fs.existsSync(caminho)) {
    throw new Error(`não achei posts/${slug}/brief.md`);
  }
  const brief = fs.readFileSync(caminho, 'utf8');
  const blocos = brief.split(/^## Slide \d+\s*$/m).slice(1);
  if (blocos.length === 0) {
    throw new Error(`${slug}: nenhum slide — o brief separa slides com "## Slide 1", "## Slide 2"…`);
  }

  return blocos.map((bloco, i) => {
    const n = i + 1;
    const yaml = bloco.match(/```yaml\n([\s\S]*?)```/);
    if (!yaml) throw new Error(`${slug}, slide ${n}: falta o bloco \`\`\`yaml … \`\`\``);

    const dados = load(yaml[1]) as Slide;
    if (!dados?.tipo || !TIPOS.includes(dados.tipo)) {
      throw new Error(
        `${slug}, slide ${n}: "tipo" precisa ser um de ${TIPOS.join(', ')} (veio "${dados?.tipo}")`,
      );
    }

    /* Pegadinha clássica do yaml: um ":" seguido de espaço dentro de um item de
     * lista vira mapeamento em vez de string. Falha aqui, com o texto do erro
     * dizendo o que fazer, em vez de estourar lá dentro do Satori. */
    for (const campo of ['paragrafos', 'itens'] as const) {
      const valor = dados[campo];
      if (!Array.isArray(valor)) continue;
      valor.forEach((item, j) => {
        if (typeof item !== 'string') {
          throw new Error(
            `${slug}, slide ${n}: ${campo}[${j}] não é texto (veio ${JSON.stringify(item)}).`
            + ' Provavelmente tem um ":" seguido de espaço no meio da frase —'
            + ' ponha a linha entre aspas.',
          );
        }
      });
    }

    if (dados.tipo === 'comparativo') {
      const linhas = dados.linhas as unknown;
      if (!Array.isArray(linhas) || linhas.length === 0) {
        throw new Error(`${slug}, slide ${n}: comparativo precisa de "linhas".`);
      }
      linhas.forEach((linha, j) => {
        for (const chave of ['item', 'esquerda', 'direita']) {
          if (typeof (linha as Record<string, unknown>)?.[chave] !== 'string') {
            throw new Error(
              `${slug}, slide ${n}: linhas[${j}] precisa de "item", "esquerda" e "direita" em texto.`,
            );
          }
        }
      });
    }

    return dados;
  });
};

/* --- conferências que não param o render --------------------------------- */

const creditos = fs.readFileSync(path.join(raiz, 'CREDITS.md'), 'utf8');

/** Todo texto do slide, incluindo o que está dentro de lista e de mapeamento. */
const textos = (valor: unknown): string[] => {
  if (typeof valor === 'string') return [valor];
  if (Array.isArray(valor)) return valor.flatMap(textos);
  if (valor && typeof valor === 'object') return Object.values(valor).flatMap(textos);
  return [];
};

const conferir = (slug: string, slides: Slide[]) => {
  if (slides.length > MAX_SLIDES) {
    throw new Error(`${slug}: ${slides.length} slides — o Instagram aceita no máximo ${MAX_SLIDES}.`);
  }
  if (slides.length > SLIDES_CONFORTAVEIS) {
    aviso(`${slug}: ${slides.length} slides. Acima de ${SLIDES_CONFORTAVEIS} a taxa de conclusão cai bastante.`);
  }
  if (slides[0].tipo !== 'capa') {
    aviso(`${slug}: o slide 1 não é uma capa — é ele que decide se alguém arrasta.`);
  }
  if (slides.at(-1)!.tipo !== 'fechamento') {
    aviso(`${slug}: o último slide não é um fechamento — o carrossel termina sem chamada e sem assinatura.`);
  }

  /* A arte entrega o argumento; a legenda entrega o CTA clicável e o contexto
   * que não coube. Post sem legenda chega no feed pela metade. */
  if (!fs.existsSync(path.join(pastaPosts, slug, 'legenda.md'))) {
    aviso(`${slug}: falta posts/${slug}/legenda.md — a legenda do Instagram.`);
  }

  const capa = slides[0] as { titulo?: string; destaque?: string };
  const tituloCapa = `${capa.titulo ?? ''} ${capa.destaque ?? ''}`.trim();
  if (tituloCapa.length > 80) {
    aviso(`${slug}: título de capa com ${tituloCapa.length} caracteres. Acima de ~80 o corpo grande ocupa o slide inteiro.`);
  }

  slides.forEach((slide, i) => {
    /* O nome da marca é minúsculo em qualquer contexto. */
    for (const texto of textos(slide)) {
      const errado = texto.match(/\b(?!gccont\b)[Gg][Cc][Cc][Oo][Nn][Tt]\b/);
      if (errado) {
        aviso(`${slug}, slide ${i + 1}: "${errado[0]}" — o nome da marca é sempre "gccont", minúsculo.`);
      }
    }
    /* `olho` sai em caixa alta por CSS, então nem escrito certo escapa. */
    if (typeof slide.olho === 'string' && /gccont/i.test(slide.olho)) {
      aviso(`${slug}, slide ${i + 1}: "olho" vira caixa alta na renderização — tire o nome da marca de lá.`);
    }
  });

  for (const slide of slides) {
    const imagem = slide.imagem as string | undefined;
    if (!imagem) continue;
    if (!fs.existsSync(caminhoImagem(imagem))) {
      throw new Error(`${slug}: public/img/${imagem} não existe.`);
    }
    /* Mesma regra do site: foto entra no repo E na tabela de créditos. */
    if (!creditos.includes(imagem)) {
      aviso(`${slug}: public/img/${imagem} não está no CREDITS.md — credite o fotógrafo antes de publicar.`);
    }
  }
};

/* --- render -------------------------------------------------------------- */

const fontes = [
  { name: FONTE.display, data: await arquivoFonte('playfair-700'), weight: 700 as const, style: 'normal' as const },
  { name: FONTE.display, data: await arquivoFonte('playfair-400'), weight: 400 as const, style: 'normal' as const },
  { name: FONTE.texto, data: await arquivoFonte('inter-400'), weight: 400 as const, style: 'normal' as const },
  { name: FONTE.texto, data: await arquivoFonte('inter-600'), weight: 600 as const, style: 'normal' as const },
];

const renderizar = async (slug: string) => {
  const slides = lerBrief(slug);
  conferir(slug, slides);

  const destino = path.join(pastaSaida, slug);
  fs.rmSync(destino, { recursive: true, force: true });
  fs.mkdirSync(destino, { recursive: true });

  for (const [i, { tipo, ...dados }] of slides.entries()) {
    const construir = CONSTRUTORES[tipo] as (d: unknown, ctx: unknown) => object;
    const arvore = construir(dados, { indice: i + 1, total: slides.length });

    const svg = await satori(arvore as Parameters<typeof satori>[0], {
      width: CANVAS.largura,
      height: CANVAS.altura,
      fonts: fontes,
    });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: CANVAS.largura } })
      .render()
      .asPng();

    fs.writeFileSync(path.join(destino, `slide-${i + 1}.png`), png);
  }

  console.log(`  ${slug}  (${slides.length} slides)`);
};

/* --- cli ----------------------------------------------------------------- */

const pedido = process.argv[2];
const todos = fs
  .readdirSync(pastaPosts, { withFileTypes: true })
  .filter((entrada) => entrada.isDirectory())
  .map((entrada) => entrada.name)
  .sort();

if (pedido && !todos.includes(pedido)) {
  console.error(`Não existe posts/${pedido}/. Disponíveis: ${todos.join(', ')}`);
  process.exit(1);
}

for (const slug of pedido ? [pedido] : todos) {
  await renderizar(slug);
}

console.log(
  `\n${pedido ? 1 : todos.length} post(s) em output/`
  + (avisos.length ? ` — ${avisos.length} aviso(s) acima.` : '.'),
);
