# Araujo Contabilidade

Site institucional + manual de identidade visual da nova contabilidade do
Gabriel, focada em profissionais que atuam como **PJ**.

> ⚠️ **"Araujo Contabilidade" é placeholder.** O nome definitivo ainda não foi
> decidido. Trocar o nome é editar `site.name` em `src/config/site.ts` e o
> texto do logotipo em `src/components/Logo.astro`.

## Stack

Mesma arquitetura do `www.e-com.plus`, sem a camada de e-commerce:

| | |
|---|---|
| **Astro 7** | site estático, HTML puro no output |
| **Vue 3** | só onde precisa de interação, como island (`client:visible` / `client:idle`) |
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

## Como isso está organizado

### A marca é um arquivo, não um PDF

`src/config/brand.ts` é a **fonte única da verdade** da identidade: paleta,
escalas, tipografia e os tokens semânticos. Três consumidores:

1. `uno.config.ts` — as escalas viram utilitários (`bg-primary`, `text-ink-700`);
2. `src/components/BrandTokens.astro` — emite as variáveis CSS `--brand-*`;
3. `src/pages/marca.astro` — o manual **lê** deste arquivo.

Consequência: **trocar a paleta da marca é editar um objeto.** O site e o
manual acompanham juntos, e não existe o cenário clássico de "o manual em PDF
diz uma coisa e o site faz outra".

### Camadas de CSS

| arquivo | responsabilidade |
|---|---|
| `src/assets/brand.css` | classes de **marca** (`brand-surface`, `brand-btn`, `brand-ink`) — só falam em papel, resolvem via token |
| `src/assets/style.css` | **estrutura**: container, ritmo vertical, títulos, métrica de botão |
| `src/assets/print.css` | impressão do manual (uma seção = uma página A4 paisagem) |

Componente nenhum referencia hex. Se você precisou escrever `#` num
componente, o token está faltando.

**Cuidado com a cascata:** o CSS gerado pelo UnoCSS entra *antes* de
`brand.css`/`style.css` no bundle, então um utilitário (`py-3`) **perde** para
uma classe de componente (`.ui-block`). Por isso container e ritmo vertical são
classes separadas, aplicadas em elementos diferentes (`ui-block` na `<section>`,
`ui-section` no `<div>` interno). Pelo mesmo motivo, `hover:brand-*` não
funciona — variante do Uno só se aplica a utilitário do Uno. Estados das
classes de marca (`.brand-link`, `.brand-card-hover`) moram em `brand.css`.

O mesmo vale pra `display`: `hidden sm:block` **no mesmo elemento** que
`.brand-btn` não esconde nada, porque `.brand-btn` declara `display`. Ponha o
`hidden` num wrapper (é o que o `SiteHeader` faz com o CTA do WhatsApp).

### Conteúdo

Toda a copy de venda está em `src/config/site.ts`, não espalhada nos
componentes — nesta fase a proposta de valor ainda vai mudar várias vezes, e
mudar preço ou promessa não deveria exigir mexer em layout.

## Páginas

| rota | o que é |
|---|---|
| `/` | site institucional |
| `/marca` | manual de identidade visual (`noindex`, fora do sitemap e do robots) |

O manual espelha a estrutura do manual de referência (Rodrigo Casa &
Construção): capa → apresentação → assinatura → variações → usos indevidos →
cores institucionais → uso das cores → tipografia → aplicações.

**Para gerar o PDF:** abrir `/marca`, botão "Salvar em PDF" (ou Ctrl/Cmd+P) →
orientação paisagem → ativar "gráficos de segundo plano".

## Pendências antes de publicar

- [ ] **Nome da marca** — `site.name` (e o logotipo) estão em placeholder
- [ ] **Número do WhatsApp** — `whatsapp.number` em `src/config/site.ts` está
      com `5531900000000`
- [ ] **Preços** — R$ 249 / R$ 349 são hipótese a partir da conversa (mercado
      cobra R$ 400–450; a ideia era entrar em R$ 250–300). Confirmar o que
      entra em cada plano.
- [ ] **CRC e cidade** — `site.crc` está com número fictício no rodapé e no
      cartão de visita do manual
- [ ] **Banner de compartilhamento** (og:image, 1200×630) — hoje o `<meta>` sai
      omitido de propósito, em vez de apontar pra um arquivo que não existe
- [ ] **Formulário** — hoje todo CTA vai pro WhatsApp, como combinado pra v1.
      Quando virar formulário, o ponto de entrada é `waLink()` em
      `src/config/site.ts`.
- [ ] **Projeto no Firebase** — `.firebaserc` está com o id `araujo-contabilidade`,
      que ainda precisa ser criado

## Próximos passos previstos

- Coleção de conteúdo em MDX (`@astrojs/mdx` já está instalado) para artigos de
  SEO — foi um dos canais de aquisição discutidos, junto com o Instagram.
- Página de checkout/self-service, se o produto for mesmo self-service no
  ticket de R$ 250–300.
