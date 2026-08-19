# Linha editorial dos posts

O que o site já resolve, este arquivo não repete: cor, tipografia e logo vivem
em [`src/config/brand.ts`](../src/config/brand.ts) e são aplicados sozinhos pelo
render. **O que está aqui é o que o código não decide** — quem fala, com quem,
sobre o quê, e o que não se publica.

---

## Quem fala

Um escritório pequeno onde o cliente fala com o contador que assina. Não é uma
"assessoria", não é um "time de especialistas", não é uma plataforma. Isso muda
o tom:

- **"a gente"**, não "a empresa" nem "nós, da gccont". Primeira pessoa do
  plural, sem cerimônia.
- **"você"** pro leitor, sempre. Nunca "o empresário", "o contribuinte", "o
  cliente" — vira circular de órgão público.
- **Explica a regra e mostra o número.** Um post que diz "planejamento
  tributário reduz sua carga" não vale nada; um que diz "com folha acima de 28%
  da receita a atividade cai no Anexo III, que começa em 6% em vez de 15,5%"
  vale, e é o mesmo assunto.
- **Diz "depende" quando depende, e "não" quando é não.** A frase que o site já
  usa — "se o MEI resolver o seu caso, a gente fala isso na cara dura" — é o
  tom. Contador que só concorda não é procurado por conselho.
- **Sem juridiquês e sem emoji.** "Vedada a compensação" vira "não dá pra
  descontar". A elegância da marca é a serifada e o fio dourado; o texto é
  direto.

O nome da marca é **`gccont`, minúsculo, em qualquer posição** — inclusive
começando frase. O render avisa quando escapa um `Gccont` no brief, e o tipo
`comparativo` não usa caixa alta no cabeçalho justamente por causa disso.

## Para quem

Os mesmos quatro públicos do hero rotativo da home (`heroRotator` em
`src/config/site.ts`) — se um post não é pra um deles, ele provavelmente não é
pra este perfil:

| público | o que dói | pra onde levar |
|---|---|---|
| **PJ que emite nota** — dev, design, marketing, consultoria, saúde | nota travada no dia 5, mensalidade de R$ 400, ninguém explicou pró-labore e Fator R | `/pj` |
| **Empresa que quer regularizar** | escrituração atrasada, obrigação vencida, medo de olhar o passivo | `/servicos#contabil` |
| **Empresa em negociação** | due diligence chegando, demonstrativo que não aguenta contestação | `/servicos#consultoria` |
| **Quem perde tempo com folha** | admissão, férias, eSocial, rescisão | `/servicos#pessoal` |

A frente de PJ é o canal de aquisição rápida, **não é o negócio**. Um feed
inteiro sobre emissão de nota ensina o mercado que a gccont só faz isso — e aí
o due diligence não chega. Regra prática: **a cada três posts de PJ, um de
consultoria, regularização ou departamento pessoal.**

## Sobre o quê

Seis pilares. Rode entre eles em vez de esgotar um:

1. **A regra explicada** — Fator R, anexos do Simples, pró-labore, prazo de
   entrega, o que muda ao trocar de regime. É o pilar que constrói autoridade.
2. **O erro que custa caro** — o que a gente vê acontecer: distribuir lucro
   acima do que o balanço sustenta, pró-labore de fachada, deixar o CNPJ
   inativo sem baixar.
3. **Quanto custa e como funciona** — transparência de preço e de processo.
   Só com o que já está publicado em `/pj`.
4. **O calendário** — a obrigação do mês, antes do vencimento. É o post mais
   útil e o mais fácil de fazer.
5. **A decisão grande** — venda de participação, entrada de sócio, due
   diligence, projeção pra banco. Fala com o público que não vem por anúncio.
6. **Como a gente trabalha** — "você fala com quem assina", migração sem custo,
   o que a gente pede e o que a gente devolve. Prova, não promessa.

## Como um carrossel é montado

De 6 a 8 slides. Mais que 10 e a taxa de conclusão cai (o render avisa).

```
1  capa          a pergunta, ou o número que provoca
2  texto         a dor, concreta e reconhecível — não a solução ainda
3  texto/lista   a regra: como funciona de verdade
4  numero        o dado que sustenta o argumento
5  lista         o que fazer / o que está incluso
6  comparativo   só quando o post é de aquisição (público 1)
7  fechamento    a chamada
```

Não é obrigatório, é o esqueleto que funciona. O que é obrigatório: **capa no
começo, fechamento no fim** — o render avisa se faltar.

Cada post é uma pasta:

```
posts/<slug>/
  brief.md     os slides (um "## Slide N" por slide, cada um com um bloco yaml)
  legenda.md   a legenda do Instagram + hashtags — não entra na imagem
```

A legenda não é opcional na prática: o carrossel entrega o argumento, a legenda
entrega o CTA clicável e o contexto que não coube na arte. O render avisa quando
falta.

### Os tipos de slide

| tipo | campos | tema padrão |
|---|---|---|
| `capa` | `olho?`, `titulo`, `destaque?`, `apoio?`, `imagem?` | escuro |
| `texto` | `olho?`, `titulo?`, `paragrafos[]`, `imagem?` | claro |
| `lista` | `olho?`, `titulo`, `itens[]`, `imagem?` | claro |
| `numero` | `olho?`, `valor`, `rotulo`, `apoio?` | escuro |
| `comparativo` | `olho?`, `titulo`, `colunas[2]`, `linhas[{item, esquerda, direita}]` | claro |
| `fechamento` | `titulo`, `apoio?`, `cta?`, `contato?` | escuro |

Todos aceitam `tema: claro` ou `tema: escuro`. **Não troque sem motivo:** o
branco é o fundo padrão da marca e o azul-marinho é superfície de destaque —
capa, número e fechamento são escuros porque são os momentos de peso. Carrossel
inteiro escuro fica bonito e fora da marca.

Detalhes de escrita que o formato impõe:

- **`titulo` de capa aceita quebra manual** com o bloco `|-` do yaml. Escreva a
  frase até o ponto de virada e ponha a virada no `destaque`, que sai dourado na
  linha seguinte. Acima de ~80 caracteres somando os dois, o render avisa.
- **`:` seguido de espaço dentro de item de lista** vira mapeamento no yaml.
  Ponha a linha entre aspas. O render falha com essa mensagem, não com um erro
  de renderização.
- **`imagem`** aponta pra um arquivo em `public/img/`. Na capa escura ela sangra
  no slide inteiro com véu por cima; nos outros tipos entra como bloco. Foto
  nova entra no repo **e** no [CREDITS.md](../CREDITS.md) — o render avisa se
  faltar.

## O que não se publica

Isto não é preciosismo: contabilidade é profissão regulamentada, e a publicidade
dela responde ao Código de Ética Profissional do Contador (CFC).

- **Nada de cliente.** Nem nome, nem faturamento, nem print de documento, nem
  "um cliente nosso economizou X". Sigilo profissional não tem exceção pra
  marketing, e caso anonimizado costuma ser reconhecível por quem é do ramo.
- **Nada de promessa de resultado.** "Reduza 40% do seu imposto" é promessa;
  "quem se enquadra no Anexo III paga a partir de 6%" é informação. A diferença
  é o que separa conteúdo técnico de propaganda com sentido mercantilista.
- **Nada de comparação nominal.** O tipo `comparativo` diz "por aí", nunca o
  nome de outro escritório.
- **Preço só o que já está publicado** em `/pj` (`pj.plans` em `site.ts`). Se o
  valor mudar lá, os posts com preço saem do ar ou são refeitos — e enquanto os
  preços forem hipótese (ver as pendências no [README](../README.md)), **nenhum
  post leva preço.**
- **Toda alíquota, prazo ou limite citado precisa estar certo na data da
  publicação.** Regra tributária muda por lei complementar e por instrução
  normativa. Se você não tem certeza, o post vira "como isso funciona" em vez de
  "o número é X".
- **CRC e endereço** ainda são placeholder no site. Não coloque em post.

## O que já existe

Antes de escrever um novo, confira se o assunto não é um mergulho em algum
destes — dois posts explicando a mesma coisa gastam o mesmo público duas vezes.

**Institucionais** — quem somos, o que fazemos, como se começa. São os que ficam
fixados no perfil e os primeiros a mandar pra quem chega sem saber quem está
falando:

| post | o que é | destino |
|---|---|---|
| `quem-e-a-gccont` | apresentação e os diferenciais | `/` |
| `o-que-a-gente-faz` | o catálogo das 4 frentes, um slide cada | `/servicos` |
| `como-comeca` | a primeira conversa e o que vem depois | `/#contato` |

**Um por frente de serviço e por produto** — o panorama de cada coisa que o site
vende:

| post | público | destino |
|---|---|---|
| `assessoria-contabil` | regularizar | `/servicos#contabil` |
| `departamento-pessoal` | folha | `/servicos#pessoal` |
| `abertura-e-legalizacao` | abrir empresa | `/servicos#legalizacao` |
| `consultoria-e-assessoria` | negociação | `/servicos#consultoria` |
| `certificado-digital` | produto | `/certificado-digital` |
| `contabilidade-para-pj` | PJ | `/pj` |

**Tema geral** — os que atraem quem ainda não está procurando escritório. Não
falam do serviço, falam do problema:

| post | pilar | destino |
|---|---|---|
| `acompanhamento-contabil` | a regra explicada | `/servicos#contabil` |
| `imposto-pago-errado` | o erro que custa caro | `/servicos#contabil` |
| `reforma-tributaria` | a regra explicada | `/servicos#consultoria` |
| `mei-ate-quando` | a regra explicada | `/pj` |
| `distribuicao-de-lucros` | o erro que custa caro | `/servicos#contabil` |
| `fator-r` | a regra explicada | `/pj` |
| `due-diligence` | a decisão grande | `/servicos#consultoria` |
| `migrar-de-contador` | como a gente trabalha | `/servicos#contabil` |

`exemplo` não é post: é o brief que exercita os seis tipos de slide.

**O que ainda falta:** o pilar do **calendário do mês** não tem nenhum post — e
provavelmente nunca vai ter um fixo aqui, porque é conteúdo que nasce e morre no
mês. O jeito certo é gerar um a cada competência a partir do que vence, não
manter um brief evergreen no repositório.

**O que está pronto mas travado:** `certificado-digital` espera a confirmação da
parceria com a Autoridade Certificadora, e `contabilidade-para-pj` espera o preço
fechar. Os dois briefs trazem o aviso no cabeçalho.

## Antes de renderizar

- [ ] O post é pra um dos quatro públicos, e o CTA leva pra página desse público
- [ ] Tem um número, uma regra ou uma decisão concreta — não é motivacional
- [ ] Nenhum dado de cliente, nenhuma promessa de resultado, nenhum concorrente
- [ ] As alíquotas e prazos foram conferidos hoje
- [ ] `gccont` minúsculo em toda parte
- [ ] Existe `legenda.md`, e a legenda tem CTA
- [ ] `npm run posts -- <slug>` rodou sem aviso
