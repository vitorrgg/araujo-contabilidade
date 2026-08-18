/*
 * Estudo de logo — as três direções em avaliação.
 *
 * Copy separada do layout pela mesma razão de `site.ts`: nesta fase o que muda
 * é o argumento, não a página. O desenho de cada direção vive em
 * `src/components/marca/LogoConcept.astro`; aqui mora só o porquê.
 *
 * Quando uma direção for escolhida, ela sobe para `src/components/Logo.astro`
 * (o contrato de props é o mesmo, de propósito) e este arquivo sai do repo
 * junto com a página `/marca/estudo-logo`.
 */

export type ConceptId = 'fio-duplo' | 'selo' | 'partida' | 'gabriel';

export const concepts: Array<{
  id: ConceptId;
  order: string;
  name: string;
  claim: string;
  /** De onde a forma vem — o argumento conceitual. */
  rationale: string;
  /** O que essa direção compra. */
  strength: string;
  /** O que ela custa. Toda direção custa alguma coisa. */
  risk: string;
  /** Marca a direção que não é desenho nosso — ver o aviso na página. */
  isReconstruction?: boolean;
}> = [
  {
    id: 'fio-duplo',
    order: '01',
    name: 'Fio duplo',
    claim: 'O fechamento de conta como assinatura',
    rationale: 'Na contabilidade, um total fechado se sublinha com duas linhas.'
      + ' É uma convenção que todo contador reconhece de imediato e que leigo'
      + ' nenhum estranha — lê como um detalhe elegante. O dourado da gccont já'
      + ' é descrito na identidade como "fio": esta direção não inventa um'
      + ' elemento novo, ela dá significado ao que a marca já usa.',
    strength: 'É tipográfica, então não depende de pictograma para existir, e'
      + ' o conceito é próprio — não há outro escritório usando isso. O fio'
      + ' duplo também vira grafismo de apoio (fim de seção, rodapé de post)'
      + ' sem precisar do logo inteiro.',
    risk: 'Duas linhas finas e próximas são o primeiro elemento a somar num'
      + ' borrão em 16px. Provavelmente exige uma redução para o favicon — uma'
      + ' linha só —, o que é prática normal de sistema de marca, mas é uma'
      + ' peça a mais para manter.',
  },
  {
    id: 'selo',
    order: '02',
    name: 'Selo tipográfico',
    claim: 'O canto dobrado do documento',
    rationale: 'Evolução direta do emblema atual, com uma decisão de forma no'
      + ' lugar de um pictograma: o canto superior direito é cortado, como a'
      + ' dobra de uma folha. O fio dourado interno acompanha o corte. Não'
      + ' representa contabilidade por metáfora — representa por ofício, que é'
      + ' papel assinado.',
    strength: 'É a mais atemporal das três e a mais segura de executar. O corte'
      + ' dá uma silhueta reconhecível mesmo desfocada, que é exatamente o que'
      + ' um quadrado comum não tem. Sobrevive bem a bordado, carimbo e'
      + ' impressão em uma cor.',
    risk: 'É a menos "conceito" das três: se alguém perguntar o que significa,'
      + ' a resposta é discreta. Também é a mais próxima do território de'
      + ' escritório de advocacia — a diferenciação vai depender da letra'
      + ' desenhada, não da moldura.',
  },
  {
    id: 'partida',
    order: '03',
    name: 'Partida dobrada',
    claim: 'Duas entradas em equilíbrio',
    rationale: 'O princípio fundador da contabilidade: todo lançamento tem'
      + ' débito e crédito, e as duas colunas precisam bater. A marca é um anel'
      + ' partido feito de dois arcos idênticos girados em 180° — a mesma peça'
      + ' duas vezes, em equilíbrio. Os dois arcos também são os dois "c" que'
      + ' existem no nome.',
    strength: 'A melhor silhueta das três: anel fecha bem em recorte circular,'
      + ' que é o formato do WhatsApp e do Instagram, e a simetria rotacional'
      + ' segura a forma em tamanho pequeno melhor que qualquer letra.',
    risk: 'É abstrata. Sozinha ela não lê como "gc" — lê como equilíbrio, e'
      + ' precisa do logotipo ao lado para amarrar o nome. Anel também é'
      + ' território disputado: exige busca no INPI antes de investir.',
  },
  {
    id: 'gabriel',
    order: '04',
    name: 'Proposta do Gabriel',
    claim: 'Monograma entrelaçado — reconstruído para teste',
    isReconstruction: true,
    rationale: 'Monograma "GC" entrelaçado (o C invade o G), fio vertical'
      + ' dourado e o logotipo em caixa alta com a tagline embutida. As'
      + ' proporções aqui foram MEDIDAS da imagem original: o GCCONT tem 0,435'
      + ' da altura do monograma e a tagline, 0,109. As letras são Playfair'
      + ' aplicada, não o desenho dele — esta reconstrução testa a construção'
      + ' do bloco, não a qualidade da letra.',
    strength: 'Chega com a paleta da marca já certa — azul-marinho, dourado e'
      + ' branco, praticamente os valores do brand.ts. O entrelaçamento é mais'
      + ' autoral que qualquer coisa montada com fonte aplicada, e o registro'
      + ' de caixa alta com serifada de alto contraste sustenta bem a leitura'
      + ' institucional de quem avalia um due diligence.',
    risk: 'A cor está fazendo trabalho estrutural: o que separa o G do C é só o'
      + ' contraste branco/dourado, então em uma tinta os dois se fundem. Não'
      + ' existe versão positiva para fundo branco — que é o fundo padrão da'
      + ' marca —, não existe símbolo isolado para avatar, e a tagline embutida'
      + ' impõe um tamanho mínimo altíssimo ao conjunto.',
  },
];

/*
 * Os testes que qualquer proposta precisa passar, inclusive a do Gabriel.
 * `surface` é o fundo REAL daquele contexto — testar favicon sobre azul-marinho
 * ou header sobre escuro maquia o resultado, que é justamente o que uma
 * apresentação de logo costuma fazer.
 */
export const tests: Array<{
  id: string;
  label: string;
  detail: string;
  surface: 'alt' | 'white' | 'ink';
}> = [
  {
    id: 'favicon',
    label: '16px · favicon',
    detail: 'Ainda é uma forma reconhecível ou virou borrão?',
    surface: 'alt',
  },
  {
    id: 'header',
    label: '32px · header do site',
    detail: 'O tamanho em que a marca mais aparece na vida real.',
    surface: 'white',
  },
  {
    id: 'whatsapp',
    label: '40px · avatar do WhatsApp',
    detail: 'Recorte circular. É o primeiro sinal de confiança do funil inteiro.',
    surface: 'alt',
  },
  {
    id: 'instagram',
    label: '96px · avatar do Instagram',
    detail: 'Recorte circular de novo — o canto do emblema é o que se perde.',
    surface: 'alt',
  },
  {
    id: 'mono',
    label: 'Uma cor · carimbo e contrato',
    detail: 'Se a marca depende do dourado para existir, ela não tem estrutura.',
    surface: 'white',
  },
  {
    id: 'negativo',
    label: 'Negativo · rodapé e bloco escuro',
    detail: 'Sem o fundo do emblema, sobra estrutura suficiente?',
    surface: 'ink',
  },
  {
    id: 'silhueta',
    label: 'Silhueta · teste do olho apertado',
    detail: 'Desfocado, a forma continua distinguível das outras duas?',
    surface: 'alt',
  },
];

/*
 * O que a bateria de testes já mostrou, rodada em 05/08/2026 sobre estes
 * desenhos. Fica no repo porque é resultado, não opinião — e porque a proposta
 * do Gabriel vai ser medida contra a mesma régua.
 */
export const findings = [
  {
    title: 'O teste de uma cor elimina a 04 — e só ela',
    detail: 'Em uma tinta, o G e o C do Gabriel se fundem num único bloco'
      + ' ambíguo: o que separava as duas letras era só o contraste'
      + ' branco/dourado. As outras três passam. Era o critério eliminatório e'
      + ' ele eliminou exatamente uma. Conserto conhecido: um fio de respiro'
      + ' (recorte) onde o C cruza o G, para a forma existir sem depender de'
      + ' cor — é refinamento de meia hora, não redesenho.',
  },
  {
    title: 'No recorte circular, a 04 é a melhor das quatro',
    detail: 'O monograma GC atravessa o avatar do WhatsApp e do Instagram'
      + ' melhor que qualquer uma das outras — não tem canto nem detalhe fino'
      + ' para perder. Ironia útil: o símbolo isolado é justamente a peça que'
      + ' NÃO veio no kit do Gabriel, e é o ativo mais forte que ele tem.',
  },
  {
    title: 'O recorte circular mata justamente o que a 02 tem de melhor',
    detail: 'O canto cortado é a assinatura do selo — e é a primeira coisa que'
      + ' o círculo apaga. Marca cuja ideia só existe fora do círculo é um'
      + ' problema num funil em que todo CTA termina no WhatsApp. Somado ao'
      + ' fracasso em 16px, a 02 fica difícil de defender.',
  },
  {
    title: 'O bloco da 04 só é legível a partir de ~340px de largura',
    detail: 'A tagline embutida tem 0,109 da altura do monograma. Para ela'
      + ' passar de 6px de altura de caixa, o monograma precisa de ~104px — o'
      + ' que joga o conjunto para ~340px de largura. Header de site usa'
      + ' 130–180px. Ou a tagline sai do bloco e vira elemento opcional com'
      + ' regra própria, ou o logo não cabe onde mais aparece.',
  },
  {
    title: 'Em 16px, só a direção 03 sobrevive',
    detail: 'O fio duplo some, o "gc" do selo vira mancha e o GC da 04 fecha'
      + ' num borrão. Três das quatro precisam de uma redução própria para'
      + ' favicon; o anel não precisa de nada.',
  },
  {
    title: 'O dourado da 04 tem que virar dois tons',
    detail: 'A tagline do Gabriel é texto dourado. Sobre azul-marinho o dourado'
      + ' 500 está certo (5,6:1); sobre branco ele dá 2,8:1 e reprova em AA. Na'
      + ' versão positiva a tagline precisa do `accent-strong`, que é a regra'
      + ' que o brand.ts já tinha — só não havia versão positiva para aplicá-la.',
  },
];
