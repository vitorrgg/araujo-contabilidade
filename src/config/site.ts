/*
 * Conteúdo e parâmetros do site institucional.
 *
 * Copy de venda mora aqui (e não espalhada nos componentes) porque nesta fase
 * a proposta de valor ainda vai mudar várias vezes — trocar preço, público ou
 * promessa deve ser edição de UM arquivo, sem mexer em layout.
 *
 * ⚠️ PLACEHOLDERS a confirmar com o Gabriel antes de publicar:
 *    - `name` / `legalName` (o nome "Araujo Contabilidade" é provisório);
 *    - `whatsapp.number` (número real);
 *    - preços e o que entra em cada plano;
 *    - `crc` e demais dados de registro no rodapé.
 */

export const site = {
  name: 'Araujo Contabilidade',
  /** Usado no <title> e na assinatura da marca (linha de apoio). */
  tagline: 'Contabilidade para PJ',
  domain: 'araujocontabilidade.com.br',
  url: 'https://araujocontabilidade.com.br',
  description: 'Contabilidade para quem trabalha como PJ. Abertura de CNPJ,'
    + ' Simples Nacional e todas as obrigações do seu mês — com nota fiscal'
    + ' emitida por você, em um clique, sem taxa por emissão.',
  /** Placeholder: trocar pelo CRC real quando o registro sair. */
  crc: 'CRC/MG 000.000/O-0',
  city: 'Belo Horizonte, MG',
  email: 'contato@araujocontabilidade.com.br',
  instagram: 'https://instagram.com/araujocontabilidade',
};

export const whatsapp = {
  /** Formato internacional, só dígitos. PLACEHOLDER. */
  number: '5531900000000',
  message: 'Oi! Vim pelo site e quero falar sobre a contabilidade do meu PJ.',
};

/** Monta o link do WhatsApp, opcionalmente com mensagem de contexto. */
export const waLink = (message = whatsapp.message) => {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;
};

export const nav = [
  { label: 'Para quem é', href: '/#para-quem' },
  { label: 'O que fazemos', href: '/#servicos' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Planos', href: '/#planos' },
  { label: 'Dúvidas', href: '/#duvidas' },
];

export const hero = {
  eyebrow: 'Contabilidade para profissionais que atuam como PJ',
  title: 'Sua nota fiscal em um clique.',
  titleHighlight: 'Sua contabilidade sem susto no boleto.',
  lead: 'Abertura de CNPJ, Simples Nacional e todas as obrigações do mês'
    + ' resolvidas. Você emite sua nota sozinho pelo app, quando quiser —'
    + ' sem esperar horário comercial e sem pagar por emissão.',
  proofs: [
    'Abertura de CNPJ inclusa',
    'Migração do seu contador atual sem custo',
    'Sem taxa por nota emitida',
  ],
};

/** A dor antes da solução: o visitante precisa se reconhecer aqui. */
export const painPoints = {
  title: 'Se você recebe como PJ, provavelmente já passou por isso',
  items: [
    {
      icon: 'i-lucide-clock-alert',
      title: 'A nota que trava todo dia 5',
      text: 'O cliente cobra a nota, o portal da prefeitura é de outro século e'
        + ' o contador só responde depois do almoço.',
    },
    {
      icon: 'i-lucide-receipt',
      title: 'Mensalidade de R$ 400 e boleto por emissão',
      text: 'Você paga preço de empresa com folha inteira — e ainda leva'
        + ' cobrança avulsa a cada nota fiscal emitida.',
    },
    {
      icon: 'i-lucide-message-circle-question',
      title: 'Ninguém te explicou pró-labore, DAS e Fator R',
      text: 'Você assina o que mandam assinar e descobre no fim do ano que dava'
        + ' pra ter pago menos imposto, dentro da lei.',
    },
    {
      icon: 'i-lucide-file-plus',
      title: 'Quer abrir o CNPJ e não sabe por onde começa',
      text: 'CNAE, regime, município, certificado digital, alvará. É muita'
        + ' sigla pra quem só quer emitir nota e trabalhar.',
    },
  ],
};

export const audience = {
  eyebrow: 'Para quem é',
  title: 'Feito para quem fatura pelo próprio CNPJ',
  lead: 'A gente atende profissionais que prestam serviço como PJ — sozinhos ou'
    + ' com um sócio — e não precisam da estrutura (nem do preço) de uma'
    + ' contabilidade feita para indústria e comércio.',
  items: [
    { icon: 'i-lucide-code-xml', title: 'Devs e profissionais de TI', text: 'Contrato PJ com uma ou duas empresas, faturamento recorrente.' },
    { icon: 'i-lucide-palette', title: 'Design, marketing e conteúdo', text: 'Freelas, retainers mensais e clientes que exigem nota.' },
    { icon: 'i-lucide-briefcase', title: 'Consultores e especialistas', text: 'Projetos por hora ou por escopo, com faturamento variável.' },
    { icon: 'i-lucide-stethoscope', title: 'Saúde e outras liberais', text: 'Plantões, atendimentos e repasses de clínica pelo seu CNPJ.' },
  ],
};

export const services = {
  eyebrow: 'O que fazemos',
  title: 'Tudo que o seu CNPJ precisa, no mesmo lugar',
  lead: 'Sem módulo extra, sem "isso é serviço avulso". O que está aqui está'
    + ' incluso na mensalidade.',
  items: [
    {
      icon: 'i-lucide-rocket',
      title: 'Abertura do CNPJ',
      text: 'Escolha do CNAE, contrato social, inscrição municipal e'
        + ' enquadramento no regime certo. Você só assina.',
    },
    {
      icon: 'i-lucide-repeat',
      title: 'Migração de contabilidade',
      text: 'Já tem contador? A gente pede a documentação, revisa o que veio'
        + ' e assume daqui pra frente. Sem custo e sem você no meio.',
    },
    {
      icon: 'i-lucide-file-check',
      title: 'Emissão de nota fiscal',
      text: 'Você emite pelo app em um clique, repetindo a última nota ou'
        + ' trocando só o valor. Prefere que a gente emita? Também fazemos.',
    },
    {
      icon: 'i-lucide-calendar-check',
      title: 'Obrigações do mês',
      text: 'DAS, DEFIS, declarações municipais e o calendário inteiro'
        + ' acompanhado — você recebe o boleto pronto, no prazo.',
    },
    {
      icon: 'i-lucide-wallet',
      title: 'Pró-labore e retiradas',
      text: 'Definimos o mix entre pró-labore e distribuição de lucros que faz'
        + ' sentido pro seu caso, considerando INSS e Fator R.',
    },
    {
      icon: 'i-lucide-calculator',
      title: 'Planejamento tributário',
      text: 'Simples, Presumido ou Real: revisamos seu enquadramento sempre que'
        + ' o faturamento muda de patamar.',
    },
    {
      icon: 'i-lucide-user-check',
      title: 'Imposto de renda do sócio',
      text: 'A declaração da pessoa física conversando com a da empresa, sem'
        + ' informação solta que vira malha fina.',
    },
    {
      icon: 'i-lucide-message-square-more',
      title: 'Contador no WhatsApp',
      text: 'Sua dúvida respondida por quem entende do seu caso, e não por um'
        + ' atendimento genérico que abre chamado.',
    },
  ],
};

export const howItWorks = {
  eyebrow: 'Como funciona',
  title: 'Do primeiro contato à primeira nota',
  steps: [
    {
      title: 'Você chama no WhatsApp',
      text: 'Conta em duas linhas o que você faz e quanto fatura. A gente diz'
        + ' na hora se o seu caso cabe aqui e quanto vai custar.',
    },
    {
      title: 'Cuidamos da papelada',
      text: 'Abertura ou migração, certificado digital e inscrições. Você'
        + ' assina digitalmente e acompanha o andamento.',
    },
    {
      title: 'Você emite sua primeira nota',
      text: 'Acesso ao app liberado, dados do seu cliente já cadastrados.'
        + ' Um clique e a nota está emitida.',
    },
    {
      title: 'Todo mês, no automático',
      text: 'A gente apura, envia os boletos com antecedência e avisa quando'
        + ' alguma coisa precisa da sua atenção. Só isso.',
    },
  ],
};

/**
 * ⚠️ Preços de hipótese, baseados na conversa (mercado cobra R$ 400–450;
 * a ideia é entrar em R$ 250–300). Validar com o Gabriel.
 */
export const plans = {
  eyebrow: 'Planos',
  title: 'Preço de quem tirou o trabalho manual do meio',
  lead: 'A maior parte das contabilidades cobra de R$ 400 a R$ 450 por mês de'
    + ' um PJ — e ainda cobra por nota emitida. Como a emissão é self-service,'
    + ' esse custo não existe aqui.',
  items: [
    {
      name: 'PJ Essencial',
      price: 'R$ 249',
      period: '/mês',
      pitch: 'Para quem fatura por um ou poucos contratos e emite as próprias notas.',
      isFeatured: true,
      features: [
        'Abertura ou migração do CNPJ inclusa',
        'App de emissão de nota em um clique',
        'Notas ilimitadas, sem taxa por emissão',
        'Apuração e guias do Simples Nacional',
        'Pró-labore do sócio e obrigações acessórias',
        'Contador no WhatsApp em horário comercial',
      ],
      ctaLabel: 'Começar pelo WhatsApp',
      ctaMessage: 'Oi! Quero contratar o plano PJ Essencial. Meu caso é:',
    },
    {
      name: 'PJ Completo',
      price: 'R$ 349',
      period: '/mês',
      pitch: 'Para quem quer delegar tudo, inclusive a emissão e o IR pessoal.',
      isFeatured: false,
      features: [
        'Tudo do PJ Essencial',
        'A gente emite suas notas por você',
        'Imposto de renda do sócio incluso',
        'Revisão de enquadramento e planejamento tributário',
        'Relatório trimestral de retiradas e impostos',
        'Prioridade no atendimento',
      ],
      ctaLabel: 'Falar sobre o Completo',
      ctaMessage: 'Oi! Quero saber mais sobre o plano PJ Completo.',
    },
  ],
  note: 'Valores no plano anual. Sem fidelidade e sem multa: se quiser sair,'
    + ' entregamos toda a sua documentação organizada.',
};

export const comparison = {
  title: 'Por que sai mais barato',
  lead: 'Não é desconto — é uma operação diferente.',
  rows: [
    { label: 'Mensalidade típica de um PJ', them: 'R$ 400 a R$ 450', us: 'R$ 249' },
    { label: 'Emissão de nota fiscal', them: 'Cobrada por nota, em muitos casos', us: 'Ilimitada, você emite em um clique' },
    { label: 'Para emitir fora do horário', them: 'Espera o escritório abrir', us: 'App disponível 24/7' },
    { label: 'Abertura de CNPJ', them: 'Taxa à parte', us: 'Inclusa no plano' },
    { label: 'Canal de atendimento', them: 'E-mail e chamado', us: 'WhatsApp com o contador do seu caso' },
    { label: 'Fidelidade', them: 'Contrato com multa', us: 'Sem fidelidade' },
  ],
};

export const faq = {
  eyebrow: 'Dúvidas',
  title: 'O que perguntam antes de fechar',
  items: [
    {
      q: 'Quanto vou pagar de imposto trabalhando como PJ?',
      a: 'Na maioria dos casos de prestação de serviço, o CNPJ fica no Simples'
        + ' Nacional. A alíquota depende do seu CNAE e do Fator R — quando a'
        + ' folha (incluindo pró-labore) representa pelo menos 28% da receita,'
        + ' a atividade cai no Anexo III, que começa em 6%, em vez do Anexo V,'
        + ' que começa em 15,5%. Faz muita diferença no fim do mês, e é uma das'
        + ' primeiras coisas que a gente calcula pra você.',
    },
    {
      q: 'Já tenho contador. Dá trabalho migrar?',
      a: 'Pra você, quase nenhum. A gente solicita os documentos e acessos ao'
        + ' escritório atual, revisa o que veio, regulariza o que estiver'
        + ' pendente e assume a partir da competência seguinte. A migração é'
        + ' sem custo e você não precisa entrar na conversa.',
    },
    {
      q: 'Quanto tempo demora pra abrir o CNPJ?',
      a: 'Em geral de 5 a 15 dias úteis, contando registro na Junta Comercial,'
        + ' CNPJ, inscrição municipal e certificado digital. O prazo varia'
        + ' bastante conforme a cidade e a atividade — a gente te dá a estimativa'
        + ' do seu caso na primeira conversa e acompanha cada etapa.',
    },
    {
      q: 'Como funciona a emissão da nota, na prática?',
      a: 'Você entra no app, escolhe o cliente já cadastrado, confere o valor e'
        + ' emite. Se a nota do mês é sempre igual, é literalmente um clique'
        + ' repetindo a anterior. A nota chega em PDF e XML pra você e pro seu'
        + ' cliente, e já entra na nossa apuração automaticamente.',
    },
    {
      q: 'Vocês cobram por nota emitida?',
      a: 'Não. Notas ilimitadas em qualquer plano. Essa cobrança existe em'
        + ' escritórios onde alguém digita a nota manualmente — aqui quem emite'
        + ' é você, então não há por que cobrar.',
    },
    {
      q: 'Não seria melhor eu ser MEI?',
      a: 'Depende. O MEI tem um limite de faturamento bem menor e não aceita'
        + ' várias atividades comuns em TI, consultoria e saúde — e o contratante'
        + ' costuma exigir uma empresa fora do MEI. A gente confere o seu CNAE e'
        + ' o seu faturamento antes de indicar qualquer coisa; se o MEI resolver'
        + ' o seu caso, a gente fala isso na cara dura.',
    },
    {
      q: 'Posso pagar tudo como distribuição de lucros?',
      a: 'Não. O sócio que trabalha na empresa precisa de pró-labore, que é a'
        + ' base do INSS. O que dá pra fazer — e é onde mora a economia — é'
        + ' calibrar o valor do pró-labore junto com o Fator R e o restante das'
        + ' retiradas. A gente monta esse desenho com você e revisa quando o'
        + ' faturamento muda.',
    },
    {
      q: 'Atende quem está em outro estado?',
      a: 'Sim. O atendimento é remoto de ponta a ponta: documento por assinatura'
        + ' digital, dúvida por WhatsApp e emissão pelo app. O que muda de cidade'
        + ' pra cidade é a regra do ISS, e isso a gente resolve na configuração.',
    },
  ],
};

export const finalCta = {
  title: 'Chama no WhatsApp e conta o seu caso',
  lead: 'Em poucos minutos você sabe quanto vai pagar de mensalidade, quanto vai'
    + ' pagar de imposto e o que precisa pra começar. Sem proposta comercial de'
    + ' dez páginas.',
  ctaLabel: 'Falar com um contador agora',
  note: 'Respondemos de segunda a sexta, das 9h às 18h.',
};
