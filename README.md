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
npm run deploy     # firebase deploy --only hosting
```

## Páginas

| rota | o que é | preço? |
|---|---|---|
| `/` | institucional: hero rotativo, 3 pilares, diferenciais, ponte pro PJ, contato | não |
| `/servicos` | catálogo completo em 4 frentes, com âncoras `#contabil` `#pessoal` `#legalizacao` `#consultoria` | não |
| `/pj` | landing de aquisição da frente de PJ: planos, comparativo, FAQ | **sim** |
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

Toda a copy está em `src/config/site.ts`, não espalhada nos componentes — nesta
fase a proposta ainda vai mudar várias vezes, e mudar preço ou promessa não
deveria exigir mexer em layout. A landing de PJ vive no objeto `pj`, separada
do institucional.

### Imagens

Fotografias do Unsplash em `public/img/`, baixadas para o repo (não hotlink).
Fotógrafos e onde cada uma é usada estão em [CREDITS.md](CREDITS.md) — **atualize
essa tabela ao trocar uma foto**. Só contribuidores regulares: nada de
Unsplash+/Getty, que são licença paga.

## Gerar o PDF do manual

Abrir `/marca` → botão "Salvar em PDF" (ou Ctrl/Cmd+P) → orientação paisagem →
ativar "gráficos de segundo plano".

## Pendências antes de publicar

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
  SEO — canal de aquisição discutido junto com o Instagram.
- Página/rota por anúncio, se a rotação do hero não der conta de segmentar.
