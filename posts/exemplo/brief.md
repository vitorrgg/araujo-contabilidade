# Exemplo — um slide de cada tipo

Não é post pra publicar: é o brief que exercita os seis tipos de slide de uma
vez. Rode `npm run posts -- exemplo` depois de mexer em `scripts/posts/` e olhe
`output/exemplo/` antes de dar o trabalho por terminado.

## Slide 1
```yaml
tipo: capa
olho: Tipo capa
titulo: |-
  o título da capa
  vai até o ponto
  de virada
destaque: e a virada vem aqui
apoio: Uma linha de apoio, que explica o assunto sem repetir o título.
imagem: hero-home.jpg
```

## Slide 2
```yaml
tipo: texto
titulo: O tipo texto
paragrafos:
  - Um a três parágrafos por slide. Curtos, mas com conteúdo — frase solta em slide grande parece anúncio, e anúncio ninguém arrasta.
  - 'Cuidado com ":" seguido de espaço: dentro de lista o yaml lê como mapeamento. Entre aspas resolve.'
```

## Slide 3
```yaml
tipo: lista
titulo: O tipo lista
itens:
  - A numeração sai dourada, que é o papel da cor no manual
  - Cada item ganha uma divisória, então cabe texto de tamanho diferente
  - De três a cinco itens; acima disso o corpo cai e some no feed
```

## Slide 4
```yaml
tipo: numero
olho: Tipo numero
valor: 6%
rotulo: A alíquota inicial do Anexo III
apoio: Um número por slide. Se precisar de dois, o tipo é comparativo.
```

## Slide 5
```yaml
tipo: comparativo
titulo: O tipo comparativo
colunas: [Por aí, Na gccont]
linhas:
  - item: Mensalidade típica de um PJ
    esquerda: R$ 400 a R$ 450
    direita: R$ 249
  - item: Emissão de nota fiscal
    esquerda: Cobrada por nota, em muitos casos
    direita: Ilimitada, você emite em um clique
  - item: Canal de atendimento
    esquerda: E-mail e chamado
    direita: WhatsApp com o contador do seu caso
```

## Slide 6
```yaml
tipo: fechamento
titulo: O tipo fechamento
apoio: Fecha com assinatura, chamada e contato. Sem seta — o carrossel acabou.
cta: Chama no WhatsApp
```
