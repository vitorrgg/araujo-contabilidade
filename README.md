# gccont

Site institucional + manual de identidade visual da **gccont** — escritório de
contabilidade e consultoria.

**Posicionamento:** a gccont é um escritório completo (assessoria contábil e
fiscal, departamento pessoal, abertura e legalização, consultoria e due
diligence). A frente de **contabilidade para PJ** é o canal de aquisição rápida
— tem landing própria, preço fechado e é o destino dos anúncios — mas não é o
negócio. A arquitetura do site existe pra sustentar as duas leituras ao mesmo
tempo: o PJ que vem do anúncio e a empresa avaliando um due diligence.

## Stack

Mesma arquitetura do `www.e-com.plus`, sem a camada de e-commerce:

| | |
|---|---|
| **Astro 7** | site estático, HTML puro no output |
| **Vue 3** | só onde precisa de interação, como island (`client:load` / `idle` / `visible`) |
| **UnoCSS** (`presetWind3`) | sintaxe Tailwind v3 — classe escrita no `www.e-com.plus` funciona aqui |
| **Firebase Hosting** | deploy estático |
| **Node 22** | ver `.nvmrc` |

```bash
nvm use            # 22
npm i
npm run dev        # http://localhost:4321
npm run build      # gera dist/
npm run check      # astro check (types)
npm run logos      # regenera os arquivos de logo (SVG + PNG + zip)
npm run posts      # renderiza os carrosséis de Instagram (`-- <slug>` para um só)
npm run deploy     # firebase deploy --only hosting
```

## Páginas

| rota | o que é | preço? |
|---|---|---|
| `/` | institucional: hero rotativo, 3 pilares, diferenciais, ponte pro PJ, contato | não |
| `/servicos` | catálogo completo em 4 frentes, com âncoras `#contabil` `#pessoal` `#legalizacao` `#consultoria` | não |
| `/pj` | landing de aquisição da frente de PJ: planos, comparativo, FAQ | **sim** |
| `/certificado-digital` | produto: e-CPF e e-CNPJ, A1 vs A3, como funciona, FAQ | não |
| `/marca` | manual de identidade visual (`noindex`, fora do sitemap e do robots) | — |
| `/marca/estudo-logo` | as 3 direções de logo em avaliação, com os testes de tamanho real | — |

O **hero da home rotaciona entre públicos** e cada estado leva pra página certa
(`/pj`, `/servicos#contabil`, `#consultoria`, `#pessoal`). É o comportamento
pedido pra funcionar como página de chegada de anúncio: o visitante se
reconhece na primeira linha. Clicar num marcador encerra a rotação — seguir
trocando por baixo de quem está lendo perde o visitante.

As âncoras de `/servicos` são referenciadas pelo menu, pelos cards da home e
pelo hero: **não renomeie sem procurar as referências**.

## Como isso está organizado

### A marca é um arquivo, não um PDF

`src/config/brand.ts` é a **fonte única da verdade** da identidade: paleta,
escalas, tipografia e os tokens semânticos. Três consumidores:

1. `uno.config.ts` — as escalas viram utilitários (`bg-primary`, `text-ink-700`);
2. `src/components/BrandTokens.astro` — emite as variáveis CSS `--brand-*`;
3. `src/pages/marca.astro` — o manual **lê** deste arquivo.

Consequência: **trocar a paleta da marca é editar um objeto.** O site e o manual
acompanham juntos, e não existe o cenário clássico de "o manual em PDF diz uma
coisa e o site faz outra".

**Paleta:** azul-marinho (cor da marca) + azul institucional (ação: botão e
link) + dourado (a camada de elegância: fio, moldura, numeração, realce sobre
escuro) + branco.

⚠️ O dourado 500 **não passa AA como texto sobre branco** (2,8:1). Para texto
dourado em fundo claro existe o `accent-strong` (700, 5,9:1) — é ele que a
classe `.brand-eyebrow` usa. No hero, o dourado entra como *sublinhado* e não
como cor do texto, justamente por isso.

**Tipografia:** Playfair Display (títulos e a assinatura) + Inter (todo o
resto). A serifada é restrita a `h1`/`h2` — em card pequeno ela pesa e perde
legibilidade; onde um `h3` precisa dela, a classe `brand-display` é aplicada
explicitamente. Se o Gabriel mandar o nome da fonte que usou na logo, trocar é
uma linha em `brand.ts` mais o pacote `@fontsource-*`.

### O logo

`src/components/Logo.astro` gera as **4 variações** do manual — nunca arquivos
de imagem soltos, que é como uma identidade começa a divergir. Construção:
emblema quadrado com fio dourado interno e o monograma `gc`, mais o logotipo
`gccont` (peso 700 em `gc`, 400 em `cont` — as iniciais e a atividade).

Na versão **negativa** o emblema perde o fundo em vez de virar um selo branco:
sobre azul-marinho isso mantém o dourado em 5,6:1 e é bem mais elegante que um
retângulo branco chapado. A **monocromática** é a que abre mão do dourado.

#### Arquivos distribuíveis

`Logo.astro` resolve o site, mas não serve pra quem precisa do **arquivo** —
designer, gráfica, quem monta um post. `npm run logos` roda
`scripts/gerar-logos.ts`, que produz 18 versões em SVG e PNG (mais um `.zip`)
em `public/marca/logos/`, servidas e listadas para download em `/marca#arquivos`.

O ponto crítico: **o texto sai convertido em contorno**. Um SVG com texto vivo
abre com fonte errada em qualquer máquina sem Playfair Display instalada — o que
é justamente a máquina de quem recebe o arquivo. O script baixa as instâncias
estáticas da fonte (OFL) para `.fonts/`, fora do versionamento, e converte os
glifos com `opentype.js`. A variável não serve: o opentype.js só enxerga o
master padrão dela, e o logotipo precisa de 700 e 400 de verdade.

O catálogo dos arquivos vive em `src/config/logos.ts` e é lido pelos **dois**
lados — o gerador e a área de download do manual. A página não tem como
oferecer um arquivo que o script não produz. Para acrescentar uma variação,
edite a lista e rode `npm run logos`.

Cores vêm de `brand.ts`: mudou a paleta, rode de novo e todos saem atualizados.

### Camadas de CSS

| arquivo | responsabilidade |
|---|---|
| `src/assets/brand.css` | classes de **marca** (`brand-surface`, `brand-btn`, `brand-rule`) — só falam em papel, resolvem via token |
| `src/assets/style.css` | **estrutura**: container, ritmo vertical, títulos, métrica de botão |
| `src/assets/print.css` | impressão do manual (uma seção = uma página A4 paisagem) |

Componente nenhum referencia hex. Se você precisou escrever `#` num componente,
o token está faltando.

**Cuidado com a cascata:** o CSS gerado pelo UnoCSS entra *antes* de
`brand.css`/`style.css` no bundle, então um utilitário (`py-3`) **perde** para
uma classe de componente (`.ui-block`). Três consequências práticas:

- container e ritmo vertical são classes **separadas**, aplicadas em elementos
  diferentes (`ui-block` na `<section>`, `ui-section` no `<div>` interno);
- `hover:brand-*` não funciona — variante do Uno só se aplica a utilitário do
  Uno. Estados das classes de marca (`.brand-link`, `.brand-card-hover`) moram
  em `brand.css`;
- `hidden sm:block` **no mesmo elemento** que `.brand-btn` não esconde nada,
  porque `.brand-btn` declara `display`. Ponha o `hidden` num wrapper (é o que o
  `SiteHeader` faz com o CTA do WhatsApp).

`--un-default-border-color` aponta pro token da marca, então `border`,
`border-b` e `divide-y` já saem na cor certa sem repetir `brand-border`.

### Conteúdo

Quase toda a copy está em `src/config/site.ts`, não espalhada nos componentes — nesta
fase a proposta ainda vai mudar várias vezes, e mudar preço ou promessa não
deveria exigir mexer em layout. A landing de PJ vive no objeto `pj`, separada
do institucional, e o certificado digital tem módulo próprio em
`src/config/certificado.ts` — é produto, não serviço recorrente, e `site.ts`
já passava de 600 linhas.

Blocos reaproveitados entre landings vivem na raiz de `src/components/` e são
dirigidos por props: `FaqSection` (com o JSON-LD de FAQPage junto),
`StepsSection`, `FinalCta` e `CertificadoBand`. Os que só fazem sentido numa
landing ficam na pasta dela.

**Ícones precisam de safelist.** Eles são string dentro dos configs, então o
extrator do UnoCSS não os vê. A lista não é mais mantida à mão — `uno.config.ts`
varre os configs e recolhe todo `i-lucide-*`. Adicionar um ícone no conteúdo
basta; a lista manual já custou um ícone faltando na página.

### Imagens

Fotografias do Unsplash em `public/img/`, baixadas para o repo (não hotlink).
Fotógrafos e onde cada uma é usada estão em [CREDITS.md](CREDITS.md) — **atualize
essa tabela ao trocar uma foto**. Só contribuidores regulares: nada de
Unsplash+/Getty, que são licença paga.

### Os posts de Instagram

`posts/<slug>/brief.md` descreve um carrossel em markdown — um `## Slide N` por
slide, cada um com um bloco yaml. `npm run posts` renderiza tudo em
`output/<slug>/slide-N.png`, 1080×1350, pronto pra subir.

```
posts/GUIA.md            linha editorial: voz, públicos, pilares e o que não se publica
posts/<slug>/brief.md    os slides
posts/<slug>/legenda.md  a legenda do Instagram (não entra na imagem)
scripts/gerar-posts.ts   lê o brief, confere e escreve os PNG
scripts/posts/tokens.ts  escala e papéis de cor do formato, derivados de brand.ts
scripts/posts/slides.ts  os seis tipos de slide, como árvore Satori
output/<slug>/           o que vai pro Instagram
```

Renderização por [Satori](https://github.com/vercel/satori) + resvg: dois
pacotes npm, sem Chromium e sem fonte instalada na máquina.

O ponto da coisa é o mesmo do gerador de logos — **a identidade é código**. As
cores e a tipografia do post saem de `src/config/brand.ts`, o logo vem dos
arquivos que `npm run logos` produz (os mesmos que `/marca#arquivos` distribui
"pra quem monta um post"), e o rodapé do fechamento lê contato e perfil de
`src/config/site.ts`. Trocou a paleta? `npm run posts` republica a série inteira
coerente. Não existe post desalinhado do manual, porque não existe um segundo
lugar onde a marca esteja escrita.

Escolhas de formato — e o porquê, que é o que não dá pra deduzir olhando o PNG:

- **Fundo branco é o padrão.** No manual, branco é o fundo de toda a comunicação
  e o azul-marinho é superfície de destaque. Capa, número e fechamento saem
  escuros porque são os momentos de peso; o miolo é claro.
- **O dourado nunca vira texto corrido.** Ele entra como fio, moldura e
  numeração — e é por isso que existe numeração de slide.
- **Contraste é aplicado, não confiado.** Sobre claro o dourado cai pro
  `accent-strong` (o 500 tem 2,8:1 sobre branco); sobre azul-marinho volta pro
  500. O botão do fechamento inverte pra branco, igual à regra do
  `.brand-surface-ink .brand-btn` no site.
- **O render confere antes de escrever**: capa no começo e fechamento no fim,
  `gccont` sempre minúsculo, foto declarada no `CREDITS.md`, legenda presente,
  número de slides. Nenhuma delas quebra o render — todas viram aviso, menos as
  que produziriam um arquivo errado.

Antes de escrever qualquer post, leia [posts/GUIA.md](posts/GUIA.md): é lá que
estão os públicos, os pilares e os limites (nada de dado de cliente, nada de
promessa de resultado, preço só o que já está publicado em `/pj`).

## Gerar o PDF do manual

Abrir `/marca` → botão "Salvar em PDF" (ou Ctrl/Cmd+P) → orientação paisagem →
ativar "gráficos de segundo plano".

## Pendências antes de publicar

- [ ] **Parceria com a Autoridade Certificadora** — a página de certificado diz
      "com Autoridade Certificadora credenciada" e nunca que a gccont é uma AC
      ou AR. Confirmar o credenciamento/parceria antes de publicar
- [ ] **Preço do certificado** — a página inteira é sem preço, como a
      referência do setor. Se houver tabela fechada, ela entra em
      `src/config/certificado.ts`
- [ ] **Domínio** — `site.domain` / `site.url` assumem `gccont.com.br`;
      confirmar registro (e o `robots.txt`, que aponta pro sitemap nesse domínio)
- [ ] **CRC e cidade** — `site.crc` está com número fictício no rodapé e no
      cartão de visita do manual
- [ ] **Preços** — R$ 249 / R$ 349 em `pj.plans` são hipótese a partir da
      conversa (mercado cobra R$ 400–450; a ideia era entrar em R$ 250–300)
- [ ] **A logo que o Gabriel gerou** — se ela for o caminho, mandar o arquivo e
      o nome da fonte; o `Logo.astro` é substituível sem tocar em mais nada.
      Ela precisa passar pela mesma bateria de `/marca/estudo-logo` antes de
      qualquer comparação
- [ ] **Decidir a direção do logo** — `/marca/estudo-logo` tem as 3 opções e o
      que cada teste já eliminou. Escolhida a direção, ela sobe para o
      `Logo.astro` (o contrato de props é o mesmo) e saem do repo a página, o
      `LogoConcept.astro` e o `src/config/logo-concepts.ts`
- [ ] **Busca no INPI** — para o nome `gccont` e para a forma escolhida, antes
      de investir em refinamento
- [ ] **Banner de compartilhamento** (og:image, 1200×630) — hoje o `<meta>` sai
      omitido de propósito, em vez de apontar pra um arquivo que não existe
- [ ] **Formulário** — hoje todo CTA vai pro WhatsApp, como combinado pra v1.
      Quando virar formulário, o ponto de entrada é `waLink()` em
      `src/config/site.ts`
- [ ] **Projeto no Firebase** — `.firebaserc` ainda aponta pro id
      `araujo-contabilidade`, do nome antigo

## Próximos passos previstos

- Coleção de conteúdo em MDX (`@astrojs/mdx` já está instalado) para artigos de
  SEO — canal de aquisição discutido junto com o Instagram. O artigo e o
  carrossel tendem a nascer do mesmo assunto; vale reaproveitar o `brief.md`.
- Página/rota por anúncio, se a rotação do hero não der conta de segmentar.
- Formato 1080×1080 e story 1080×1920 no gerador de posts, se o feed pedir. Hoje
  só existe o 4:5, que é o carrossel.
