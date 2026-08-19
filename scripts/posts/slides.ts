/*
 * Os tipos de slide, como árvore Satori (o mesmo modelo do Open Graph image do
 * Vercel: JSX descrito em objeto, renderizado sem navegador).
 *
 * Cada construtor recebe o bloco yaml de um slide do brief e devolve a árvore.
 * Quem lê o brief e escreve o PNG é `scripts/gerar-posts.ts`.
 *
 * DECISÕES DE FORMATO — por que o post da gccont não sai igual ao de qualquer
 * outra marca que use este mesmo pipeline:
 *
 *  · O fundo padrão é BRANCO. No manual, branco é "fundo padrão de toda a
 *    comunicação" e o azul-marinho é superfície de destaque. Então capa,
 *    número e fechamento vêm escuros (são os momentos de peso) e o miolo de
 *    conteúdo vem claro. Carrossel inteiro escuro ficaria bonito e fora da marca.
 *
 *  · O dourado nunca vira texto corrido. Ele entra como fio, moldura e
 *    NUMERAÇÃO — e a numeração de slide existe justamente porque esse é o
 *    papel que o manual dá pra cor.
 *
 *  · O conteúdo é centrado verticalmente, em vez de ancorado por um respiro
 *    calculado a cada tipo de slide. Texto de tamanho variável não estoura nem
 *    abre um vão embaixo, e ninguém precisa recalibrar margem a cada post.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../../src/config/site.ts';
import {
  CANVAS,
  CORPO,
  FIO_TOPO,
  FONTE,
  MARGEM,
  RAIO,
  TRACKING_OLHO,
  papeis,
  type Papeis,
  type Tema,
} from './tokens.ts';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** Largura útil entre as margens. */
const COLUNA = CANVAS.largura - MARGEM * 2;

/* --- assets -------------------------------------------------------------- *
 * O logo vem dos arquivos que `npm run logos` gera. É de propósito: o manual
 * publica esses PNGs em /marca#arquivos justamente para "quem monta um post",
 * então o post consome a mesma assinatura que o designer baixa — e não uma
 * segunda cópia que envelhece sozinha. */

const dataUri = (caminho: string, mime: string) => {
  return `data:${mime};base64,${fs.readFileSync(caminho).toString('base64')}`;
};

const logo = (p: Papeis) => dataUri(
  path.join(
    raiz,
    'public/marca/logos',
    p.escuro ? 'gccont-assinatura-negativa.png' : 'gccont-assinatura-cor.png',
  ),
  'image/png',
);

/** Proporção do arquivo de assinatura horizontal (1200×431). */
const LOGO = { largura: 300, altura: Math.round((300 * 431) / 1200) };

export const caminhoImagem = (nome: string) => path.join(raiz, 'public/img', nome);

const imagemUri = (nome: string) => {
  const caminho = caminhoImagem(nome);
  if (!fs.existsSync(caminho)) {
    throw new Error(`imagem não encontrada: public/img/${nome}`);
  }
  return dataUri(caminho, nome.endsWith('.png') ? 'image/png' : 'image/jpeg');
};

/* --- helpers de árvore --------------------------------------------------- */

type No = Record<string, unknown>;

/**
 * O Satori tenta parsear cada propriedade de estilo e quebra com um
 * "Cannot read properties of undefined" se alguma vier `undefined` — o que
 * acontece o tempo todo em estilo condicional (`i < n ? borda : undefined`).
 * Limpar aqui evita espalhar spread condicional por todo o arquivo.
 */
const limpar = (style: Record<string, unknown>) => {
  return Object.fromEntries(Object.entries(style).filter(([, valor]) => valor !== undefined));
};

const bloco = (style: Record<string, unknown>, children?: unknown): No => ({
  type: 'div',
  props: { style: limpar({ display: 'flex', ...style }), children },
});

/**
 * Texto com quebra manual: cada "\n" do yaml (bloco `|-`) vira uma linha
 * própria, e cada linha ainda quebra sozinha se passar da coluna.
 */
const texto = (conteudo: string, style: Record<string, unknown>): No => {
  const linhas = String(conteudo).split('\n');
  if (linhas.length === 1) return bloco({ flexDirection: 'column', ...style }, conteudo);
  return bloco(
    { flexDirection: 'column', ...style },
    linhas.map((linha) => bloco({}, linha)),
  );
};

/** Rótulo em caixa alta — espelha `.brand-eyebrow` do brand.css. */
const olho = (conteudo: string, p: Papeis): No => texto(conteudo, {
  fontFamily: FONTE.texto,
  fontWeight: 600,
  fontSize: CORPO.olho,
  letterSpacing: TRACKING_OLHO,
  textTransform: 'uppercase',
  color: p.douradoTexto,
  marginBottom: 26,
});

/** O fio dourado — o detalhe que assina a marca embaixo de um título. */
const fio = (p: Papeis, margemAcima = 28): No => bloco({
  width: 88,
  height: 3,
  backgroundColor: p.douradoGrafico,
  marginTop: margemAcima,
});

const tituloDisplay = (conteudo: string, p: Papeis, tamanho = CORPO.titulo): No => texto(conteudo, {
  width: COLUNA,
  fontFamily: FONTE.display,
  fontWeight: 700,
  fontSize: tamanho,
  lineHeight: 1.14,
  letterSpacing: '-0.01em',
  color: p.titulo,
});

const paragrafos = (lista: string[], p: Papeis): No => bloco(
  { flexDirection: 'column', width: COLUNA },
  lista.map((linha, i) => texto(linha, {
    width: COLUNA,
    fontSize: CORPO.paragrafo,
    lineHeight: 1.5,
    color: p.corpo,
    marginBottom: i < lista.length - 1 ? 30 : 0,
  })),
);

const imagemBloco = (nome: string, altura: number, margemAcima = 48): No => bloco(
  {
    width: COLUNA,
    height: altura,
    borderRadius: RAIO,
    overflow: 'hidden',
    marginTop: margemAcima,
  },
  [{
    type: 'img',
    props: {
      src: imagemUri(nome),
      style: { width: '100%', height: '100%', objectFit: 'cover' },
    },
  }],
);

const seta = (cor: string): No => ({
  type: 'svg',
  props: {
    width: 54,
    height: 20,
    viewBox: '0 0 54 20',
    fill: 'none',
    children: [
      { type: 'path', props: { d: 'M0 10 H45', stroke: cor, strokeWidth: 2 } },
      {
        type: 'path',
        props: {
          d: 'M36 1 L46 10 L36 19',
          stroke: cor,
          strokeWidth: 2,
          fill: 'none',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
      },
    ],
  },
});

const assinatura = (p: Papeis): No => ({
  type: 'img',
  props: { src: logo(p), width: LOGO.largura, height: LOGO.altura },
});

/**
 * A numeração do slide, no canto inferior direito. Dourada porque numeração é
 * literalmente o papel que o manual dá pra cor — e serifada porque é número,
 * não texto corrido.
 */
const paginacao = (indice: number, total: number, p: Papeis): No => bloco(
  {
    position: 'absolute',
    right: MARGEM,
    bottom: MARGEM - 8,
    alignItems: 'baseline',
    fontFamily: FONTE.display,
    fontWeight: 700,
  },
  [
    bloco(
      { fontSize: CORPO.paginacao, color: p.douradoTexto },
      String(indice).padStart(2, '0'),
    ),
    bloco(
      { fontSize: CORPO.paginacao - 8, color: p.apoio, marginLeft: 6 },
      `/${String(total).padStart(2, '0')}`,
    ),
  ],
);

/* --- a moldura ----------------------------------------------------------- */

type Moldura = {
  p: Papeis;
  /** Foto em sangria, com véu por cima — só faz sentido no tema escuro. */
  fundoImagem?: string;
  numero?: { indice: number; total: number };
  justificar?: 'center' | 'space-between';
};

const moldura = (
  filhos: unknown[],
  { p, fundoImagem, numero, justificar = 'center' }: Moldura,
): No => {
  const fundo = fundoImagem
    ? [
      {
        type: 'img',
        props: {
          src: imagemUri(fundoImagem),
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: CANVAS.largura,
            height: CANVAS.altura,
            objectFit: 'cover',
          },
        },
      },
      bloco({
        position: 'absolute',
        top: 0,
        left: 0,
        width: CANVAS.largura,
        height: CANVAS.altura,
        backgroundImage: p.veu,
      }),
    ]
    : [];

  return {
    type: 'div',
    props: {
      style: {
        width: CANVAS.largura,
        height: CANVAS.altura,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justificar,
        position: 'relative',
        padding: MARGEM,
        /* Centro óptico: bloco exatamente no meio geométrico parece baixo.
         * Só no layout centrado — a capa usa space-between. */
        ...(justificar === 'center' ? { paddingBottom: MARGEM + 70 } : {}),
        backgroundColor: p.fundo,
        ...(p.fundoGradiente && !fundoImagem ? { backgroundImage: p.fundoGradiente } : {}),
        fontFamily: FONTE.texto,
      },
      children: [
        ...fundo,
        /* Fio dourado no topo: é o que faz a série ser reconhecida no feed
         * antes de alguém ler uma palavra. */
        bloco({
          position: 'absolute',
          top: 0,
          left: 0,
          width: CANVAS.largura,
          height: FIO_TOPO,
          backgroundColor: p.douradoGrafico,
        }),
        ...filhos.filter(Boolean),
        ...(numero ? [paginacao(numero.indice, numero.total, p)] : []),
      ],
    },
  };
};

/* --- os tipos de slide --------------------------------------------------- */

export type Contexto = { indice: number; total: number };

type Base = { tema?: Tema };

export type Capa = Base & {
  olho?: string;
  titulo: string;
  destaque?: string;
  apoio?: string;
  imagem?: string;
};

/**
 * Slide 1. O `destaque` sai numa linha própria em dourado, embaixo do título, e
 * não no meio da frase: o Satori quebra linha por bloco, então texto colorido
 * dentro de um parágrafo viraria uma sequência de palavras com espaçamento
 * errado. Escreva o título até o ponto de virada e ponha a virada no `destaque`.
 */
export const capa = ({
  olho: rotulo,
  titulo,
  destaque,
  apoio,
  imagem,
  tema = 'escuro',
}: Capa) => {
  const p = papeis(tema);
  return moldura(
    [
      assinatura(p),
      bloco({ flexGrow: 1 }),
      bloco({ flexDirection: 'column', width: COLUNA }, [
        rotulo ? olho(rotulo, p) : null,
        tituloDisplay(titulo, p, CORPO.tituloCapa),
        destaque
          ? texto(destaque, {
            width: COLUNA,
            fontFamily: FONTE.display,
            fontWeight: 700,
            fontSize: CORPO.tituloCapa,
            lineHeight: 1.14,
            letterSpacing: '-0.01em',
            color: p.douradoTexto,
          })
          : null,
        apoio
          ? texto(apoio, {
            width: COLUNA,
            fontSize: CORPO.apoio,
            lineHeight: 1.45,
            color: p.corpo,
            marginTop: 30,
          })
          : null,
      ].filter(Boolean)),
      bloco(
        {
          width: COLUNA,
          marginTop: 56,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        [
          bloco(
            {
              fontSize: CORPO.rodape,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: p.apoio,
            },
            'Arrasta pro lado',
          ),
          seta(p.douradoGrafico),
        ],
      ),
    ],
    { p, fundoImagem: tema === 'escuro' ? imagem : undefined, justificar: 'space-between' },
  );
};

export type SlideTexto = Base & {
  olho?: string;
  titulo?: string;
  paragrafos: string[];
  imagem?: string;
};

export const slideTexto = (
  { olho: rotulo, titulo, paragrafos: lista, imagem, tema = 'claro' }: SlideTexto,
  ctx: Contexto,
) => {
  const p = papeis(tema);
  return moldura(
    [
      bloco({ flexDirection: 'column', width: COLUNA }, [
        rotulo ? olho(rotulo, p) : null,
        titulo ? tituloDisplay(titulo, p) : null,
        titulo ? fio(p) : null,
        bloco({ marginTop: titulo ? 40 : 0 }, [paragrafos(lista, p)]),
        imagem ? imagemBloco(imagem, 400) : null,
      ].filter(Boolean)),
    ],
    { p, numero: ctx },
  );
};

export type Lista = Base & {
  olho?: string;
  titulo: string;
  itens: string[];
  imagem?: string;
};

/** Lista numerada — a numeração é dourada, que é o papel dela no manual. */
export const lista = (
  { olho: rotulo, titulo, itens, imagem, tema = 'claro' }: Lista,
  ctx: Contexto,
) => {
  const p = papeis(tema);
  return moldura(
    [
      bloco({ flexDirection: 'column', width: COLUNA }, [
        rotulo ? olho(rotulo, p) : null,
        tituloDisplay(titulo, p),
        fio(p),
        bloco(
          { flexDirection: 'column', width: COLUNA, marginTop: 44 },
          itens.map((item, i) => bloco(
            {
              width: COLUNA,
              alignItems: 'flex-start',
              paddingBottom: i < itens.length - 1 ? 26 : 0,
              marginBottom: i < itens.length - 1 ? 26 : 0,
              borderBottom: i < itens.length - 1 ? `1px solid ${p.divisoria}` : undefined,
            },
            [
              bloco(
                {
                  width: 62,
                  fontFamily: FONTE.display,
                  fontWeight: 700,
                  fontSize: CORPO.item,
                  color: p.douradoTexto,
                  lineHeight: 1.35,
                },
                String(i + 1).padStart(2, '0'),
              ),
              texto(item, {
                flex: 1,
                fontSize: CORPO.item,
                lineHeight: 1.4,
                color: p.corpo,
              }),
            ],
          )),
        ),
        imagem ? imagemBloco(imagem, 320) : null,
      ].filter(Boolean)),
    ],
    { p, numero: ctx },
  );
};

export type Numero = Base & {
  olho?: string;
  valor: string;
  rotulo: string;
  apoio?: string;
};

/**
 * O slide de um número só. Contabilidade se comunica em número — alíquota,
 * prazo, percentual — e o carrossel precisa de um momento em que a página
 * inteira é o dado.
 */
export const numero = (
  { olho: chapeu, valor, rotulo, apoio, tema = 'escuro' }: Numero,
  ctx: Contexto,
) => {
  const p = papeis(tema);
  return moldura(
    [
      bloco({ flexDirection: 'column', width: COLUNA, alignItems: 'flex-start' }, [
        chapeu ? olho(chapeu, p) : null,
        texto(valor, {
          fontFamily: FONTE.display,
          fontWeight: 700,
          fontSize: CORPO.numeroGigante,
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          color: p.douradoTexto,
        }),
        fio(p, 36),
        texto(rotulo, {
          width: COLUNA,
          fontFamily: FONTE.display,
          fontWeight: 700,
          fontSize: CORPO.titulo,
          lineHeight: 1.2,
          color: p.titulo,
          marginTop: 36,
        }),
        apoio
          ? texto(apoio, {
            width: COLUNA,
            fontSize: CORPO.apoio,
            lineHeight: 1.45,
            color: p.corpo,
            marginTop: 28,
          })
          : null,
      ].filter(Boolean)),
    ],
    { p, numero: ctx },
  );
};

export type Comparativo = Base & {
  olho?: string;
  titulo: string;
  colunas: [string, string];
  linhas: { item: string; esquerda: string; direita: string }[];
};

/**
 * Duas colunas, "por aí" contra "aqui". É a peça que mais convence quem está
 * comparando escritório — a mesma tabela que vive em `pj.comparison` no site.
 */
export const comparativo = (
  { olho: rotulo, titulo, colunas, linhas, tema = 'claro' }: Comparativo,
  ctx: Contexto,
) => {
  const p = papeis(tema);
  const celula = COLUNA / 2 - 18;
  return moldura(
    [
      bloco({ flexDirection: 'column', width: COLUNA }, [
        rotulo ? olho(rotulo, p) : null,
        tituloDisplay(titulo, p),
        fio(p),
        bloco(
          {
            width: COLUNA,
            marginTop: 44,
            paddingBottom: 18,
            borderBottom: `1px solid ${p.divisoria}`,
            justifyContent: 'space-between',
            fontSize: 25,
            fontWeight: 600,
            letterSpacing: '0.1em',
            /* Sem caixa alta de propósito: o nome da marca é minúsculo, e o
             * cabeçalho da coluna quase sempre é "Na gccont". */
          },
          [
            bloco({ width: celula, color: p.apoio }, colunas[0]),
            bloco({ width: celula, color: p.douradoTexto }, colunas[1]),
          ],
        ),
        bloco(
          { flexDirection: 'column', width: COLUNA },
          linhas.map((linha, i) => bloco(
            {
              flexDirection: 'column',
              width: COLUNA,
              paddingTop: 24,
              paddingBottom: 24,
              borderBottom: i < linhas.length - 1 ? `1px solid ${p.divisoria}` : undefined,
            },
            [
              texto(linha.item, {
                width: COLUNA,
                fontSize: 27,
                fontWeight: 600,
                color: p.titulo,
                marginBottom: 14,
              }),
              bloco(
                { width: COLUNA, justifyContent: 'space-between', alignItems: 'flex-start' },
                [
                  texto(linha.esquerda, {
                    width: celula,
                    fontSize: 26,
                    lineHeight: 1.35,
                    color: p.apoio,
                  }),
                  texto(linha.direita, {
                    width: celula,
                    fontSize: 26,
                    lineHeight: 1.35,
                    fontWeight: 600,
                    color: p.titulo,
                  }),
                ],
              ),
            ],
          )),
        ),
      ].filter(Boolean)),
    ],
    { p, numero: ctx },
  );
};

export type Fechamento = Base & {
  titulo: string;
  apoio?: string;
  cta?: string;
  contato?: string;
};

/** Último slide: assinatura, chamada e pra onde ir. Sem seta — acabou. */
export const fechamento = ({
  titulo,
  apoio,
  cta = 'Chama no WhatsApp',
  contato,
  tema = 'escuro',
}: Fechamento) => {
  const p = papeis(tema);
  const perfil = `@${site.instagram.replace(/\/+$/, '').split('/').pop()}`;
  return moldura(
    [
      assinatura(p),
      bloco({ flexGrow: 1 }),
      bloco({ flexDirection: 'column', width: COLUNA, alignItems: 'flex-start' }, [
        tituloDisplay(titulo, p, 62),
        apoio
          ? texto(apoio, {
            width: COLUNA,
            fontSize: CORPO.apoio,
            lineHeight: 1.45,
            color: p.corpo,
            marginTop: 28,
          })
          : null,
        /* Botão sobre azul-marinho inverte para branco — mesma regra do
         * `.brand-surface-ink .brand-btn` no site. */
        bloco(
          {
            marginTop: 44,
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 22,
            paddingBottom: 22,
            borderRadius: RAIO,
            backgroundColor: p.botaoFundo,
            color: p.botaoTexto,
            fontSize: 30,
            fontWeight: 600,
          },
          cta,
        ),
      ].filter(Boolean)),
      bloco(
        {
          width: COLUNA,
          marginTop: 56,
          paddingTop: 28,
          borderTop: `1px solid ${p.divisoria}`,
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: CORPO.rodape,
          color: p.apoio,
        },
        [
          bloco({}, contato ?? `${perfil} · ${site.phoneDisplay}`),
          bloco({ color: p.douradoTexto }, site.domain),
        ],
      ),
    ],
    { p, justificar: 'space-between' },
  );
};

/**
 * O mapa que o `gerar-posts.ts` consulta — a chave é o `tipo` do yaml.
 * `capa` e `fechamento` ignoram o contexto: não levam numeração.
 */
export const CONSTRUTORES = {
  capa: (dados: Capa) => capa(dados),
  texto: slideTexto,
  lista,
  numero,
  comparativo,
  fechamento: (dados: Fechamento) => fechamento(dados),
} as const;

export type TipoSlide = keyof typeof CONSTRUTORES;
