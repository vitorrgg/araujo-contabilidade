/*
 * Conteúdo e parâmetros do site.
 *
 * Copy mora aqui (e não espalhada nos componentes) porque nesta fase a
 * proposta ainda vai mudar várias vezes — trocar preço, público ou promessa
 * deve ser edição de UM arquivo, sem mexer em layout.
 *
 * ARQUITETURA DA MENSAGEM
 * A gccont é um escritório de contabilidade completo; a frente de PJ é o canal
 * de aquisição rápida, não o negócio. Por isso:
 *   - `/`          institucional, os 3 pilares de serviço, SEM preço;
 *   - `/servicos`  o catálogo inteiro, incluindo consultoria e due diligence;
 *   - `/pj`        a landing de aquisição, com preço, comparativo e FAQ.
 * O hero da home rotaciona entre públicos e cada mensagem leva pra página certa.
 *
 * ⚠️ PLACEHOLDERS a confirmar antes de publicar: `site.crc`,
 * `site.domain`/`url`, e os preços em `pj.plans`.
 */

export const site = {
  name: 'gccont',
  legalName: 'gccont Contabilidade',
  tagline: 'Contabilidade e consultoria',
  domain: 'gccont.com.br',
  url: 'https://gccont.com.br',
  description: 'Escritório de contabilidade e consultoria para empresas e'
    + ' profissionais. Assessoria contábil e fiscal, departamento pessoal,'
    + ' abertura e legalização, due diligence e projeções financeiras.',
  /** Placeholder: trocar pelo CRC real quando o registro sair. */
  crc: 'CRC/MG 000.000/O-0',
  city: 'Belo Horizonte, MG',
  email: 'gccontcontabilidade@gmail.com',
  /** E.164 para `tel:` e schema.org; `phoneDisplay` é o que aparece na tela. */
  phone: '+5531996306851',
  phoneDisplay: '(31) 99630-6851',
  instagram: 'https://instagram.com/gccont',
};

export const whatsapp = {
  /** Formato internacional, só dígitos — é o que o wa.me espera. */
  number: '5531996306851',
  message: 'Oi! Vim pelo site e quero falar com um especialista.',
};

/** Monta o link do WhatsApp, opcionalmente com mensagem de contexto. */
export const waLink = (message = whatsapp.message) => {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;
};

export const nav = [
  { label: 'Serviços', href: '/servicos' },
  { label: 'Consultoria', href: '/servicos#consultoria' },
  { label: 'Para PJ', href: '/pj' },
  { label: 'Certificado digital', href: '/certificado-digital' },
  { label: 'Contato', href: '/#contato' },
];

/* ------------------------------------------------------------------ */
/* HOME                                                                */
/* ------------------------------------------------------------------ */

/**
 * Hero rotativo: em vez de uma promessa genérica, o hero cicla entre públicos
 * e cada estado leva pro destino certo. Serve também como página de chegada dos
 * anúncios — o visitante se reconhece na primeira linha.
 */
export const heroRotator = {
  eyebrow: 'Contabilidade e consultoria',
  titlePrefix: 'Para você que',
  /*
   * Trocam automaticamente; clicar leva pro href.
   * Mantenha as frases com comprimento parecido (~30 a 35 caracteres): o hero
   * reserva a altura da mais longa pra não empurrar a página na troca, e uma
   * frase muito maior que as outras abre um vão embaixo do título.
   */
  items: [
    {
      audience: 'trabalha como PJ e emite nota',
      lead: 'Abertura do CNPJ, Simples Nacional e as obrigações do mês'
        + ' resolvidas — com a nota fiscal emitida por você, em um clique.',
      ctaLabel: 'Ver a frente para PJ',
      href: '/pj',
    },
    {
      audience: 'quer regularizar a empresa',
      lead: 'Assumimos a escrituração, colocamos as obrigações em dia e'
        + ' devolvemos previsibilidade ao seu calendário fiscal.',
      ctaLabel: 'Ver assessoria contábil',
      href: '/servicos#contabil',
    },
    {
      audience: 'está negociando a empresa',
      lead: 'Due diligence contábil, demonstrativos auditáveis e projeções'
        + ' financeiras que sustentam a negociação.',
      ctaLabel: 'Ver consultoria',
      href: '/servicos#consultoria',
    },
    {
      audience: 'perde tempo com a folha',
      lead: 'Departamento pessoal terceirizado: folha, encargos, férias e as'
        + ' obrigações trabalhistas dentro do prazo.',
      ctaLabel: 'Ver departamento pessoal',
      href: '/servicos#pessoal',
    },
  ],
  ctaLabel: 'Falar com um especialista',
  proofs: [
    'Atendimento direto com o contador responsável',
    'Assumimos a migração do seu escritório atual',
    'Da abertura da empresa ao due diligence',
  ],
};

/** Os 3 pilares destacados na home. O catálogo completo vive em /servicos. */
export const pillars = {
  eyebrow: 'O que fazemos',
  title: 'Três frentes, um escritório só',
  lead: 'Da rotina contábil que não pode falhar até a decisão que muda o rumo'
    + ' da empresa — sem você precisar montar um time pra cada coisa.',
  items: [
    {
      id: 'contabil',
      icon: 'i-lucide-book-open-check',
      title: 'Assessoria contábil e fiscal',
      text: 'A contabilidade em si: escrituração, apuração de tributos,'
        + ' obrigações acessórias e demonstrações contábeis confiáveis.',
      image: '/img/servico-contabil.jpg',
      imageAlt: 'Profissional analisando planilha de dados contábeis',
      highlights: [
        'Escrituração contábil e fiscal',
        'Apuração de tributos e guias',
        'Demonstrações contábeis',
      ],
    },
    {
      id: 'pessoal',
      icon: 'i-lucide-users',
      title: 'Departamento pessoal',
      text: 'Folha de pagamento, admissões, encargos e obrigações trabalhistas'
        + ' fora do seu colo e dentro do prazo.',
      image: '/img/servico-pessoal.jpg',
      imageAlt: 'Equipe reunida em sala de reunião discutindo processos',
      highlights: [
        'Folha, férias e 13º',
        'Admissão e desligamento',
        'eSocial e encargos',
      ],
    },
    {
      id: 'consultoria',
      icon: 'i-lucide-line-chart',
      title: 'Assessoria e consultoria',
      text: 'Quando a decisão é grande: due diligence, projeções financeiras e'
        + ' leitura contábil pra sustentar a negociação.',
      image: '/img/servico-consultoria.jpg',
      imageAlt: 'Reunião de consultoria com apresentação de números',
      highlights: [
        'Due diligence contábil',
        'Projeções financeiras',
        'Consultoria tributária',
      ],
    },
  ],
  ctaLabel: 'Ver todos os serviços',
  ctaHref: '/servicos',
};

export const differentials = {
  eyebrow: 'Por que a gccont',
  title: 'Pequeno pra te atender, completo pra te acompanhar',
  items: [
    {
      icon: 'i-lucide-user-check',
      title: 'Você fala com quem assina',
      text: 'Sem central de atendimento e sem chamado. A dúvida vai direto pro'
        + ' contador que conhece o seu caso.',
    },
    {
      icon: 'i-lucide-calendar-check',
      title: 'Prazo tratado como entrega',
      text: 'Calendário fiscal e trabalhista acompanhado por nós. Você recebe'
        + ' a guia pronta, com antecedência, e o aviso quando algo precisa de você.',
    },
    {
      icon: 'i-lucide-trending-up',
      title: 'Cresce com a empresa',
      text: 'Começa como MEI ou Simples e vira Presumido, Real ou grupo'
        + ' societário — sem trocar de escritório no meio do caminho.',
    },
    {
      icon: 'i-lucide-shield-check',
      title: 'Número que aguenta auditoria',
      text: 'Demonstrativo consistente é o que sustenta crédito, entrada de'
        + ' investidor e venda de participação. É assim que a gente escritura.',
    },
  ],
};

/** Faixa na home que direciona pra landing de aquisição de PJ. */
export const pjFront = {
  eyebrow: 'Frente para profissionais PJ',
  title: 'Emite nota para uma empresa e não quer pagar preço de folha inteira?',
  lead: 'Montamos uma frente específica pra quem fatura pelo próprio CNPJ:'
    + ' abertura ou migração inclusa, emissão de nota em um clique pelo app e'
    + ' mensalidade abaixo do que o mercado cobra — porque a operação é outra.',
  bullets: [
    'Abertura do CNPJ e enquadramento no regime certo',
    'Você emite a nota sozinho, sem taxa por emissão',
    'Pró-labore, DAS e obrigações do mês acompanhados',
  ],
  ctaLabel: 'Ver planos e preços',
  ctaHref: '/pj',
  image: '/img/frente-pj.jpg',
  imageAlt: 'Profissional autônomo trabalhando no notebook',
};

export const contact = {
  eyebrow: 'Contato',
  title: 'Conte o seu caso e a gente diz o que dá pra fazer',
  lead: 'Na primeira conversa você já sai sabendo o que precisa ser feito, em'
    + ' quanto tempo e quanto custa. Sem proposta comercial de dez páginas.',
  ctaLabel: 'Falar no WhatsApp',
  note: 'Atendimento de segunda a sexta, das 9h às 18h.',
};

/* ------------------------------------------------------------------ */
/* /servicos                                                           */
/* ------------------------------------------------------------------ */

export const servicesPage = {
  eyebrow: 'Serviços',
  title: 'O escritório inteiro, em quatro frentes',
  lead: 'Cada frente pode ser contratada isolada ou em conjunto. Se você não'
    + ' sabe do que precisa, essa é justamente a primeira conversa.',
  groups: [
    {
      id: 'contabil',
      icon: 'i-lucide-book-open-check',
      title: 'Assessoria contábil e fiscal',
      lead: 'A rotina que não pode falhar — e que é a base de tudo que vem'
        + ' depois, do crédito bancário ao due diligence.',
      image: '/img/servico-contabil.jpg',
      imageAlt: 'Profissional analisando planilha de dados contábeis',
      items: [
        {
          title: 'Escrituração contábil',
          text: 'Lançamentos, conciliação bancária, razão e balancetes mensais'
            + ' com a movimentação real da empresa.',
        },
        {
          title: 'Apuração tributária e fiscal',
          text: 'Cálculo dos tributos do regime, geração das guias e controle'
            + ' de créditos e retenções.',
        },
        {
          title: 'Obrigações acessórias',
          text: 'SPED, DCTF, EFD, DEFIS e as declarações municipais e estaduais'
            + ' que o seu CNAE exigir.',
        },
        {
          title: 'Demonstrações contábeis',
          text: 'Balanço patrimonial, DRE e notas explicativas em padrão'
            + ' auditável, não só para cumprir obrigação.',
        },
        {
          title: 'Planejamento tributário',
          text: 'Revisão de enquadramento entre Simples, Presumido e Real'
            + ' sempre que o faturamento muda de patamar.',
        },
        {
          title: 'Regularização',
          text: 'Retificação de declarações, parcelamentos e recuperação da'
            + ' regularidade fiscal de quem chegou atrasado.',
        },
      ],
    },
    {
      id: 'pessoal',
      icon: 'i-lucide-users',
      title: 'Departamento pessoal',
      lead: 'Terceirização completa da rotina trabalhista, com o risco'
        + ' controlado por quem responde por ele.',
      image: '/img/servico-pessoal.jpg',
      imageAlt: 'Equipe reunida em sala de reunião discutindo processos',
      items: [
        {
          title: 'Folha de pagamento',
          text: 'Cálculo mensal, holerite, encargos e os recolhimentos de'
            + ' INSS e FGTS.',
        },
        {
          title: 'Admissão e desligamento',
          text: 'Documentação, registro, exames e cálculo de rescisão com as'
            + ' verbas corretas.',
        },
        {
          title: 'Férias, 13º e benefícios',
          text: 'Programação de férias, provisões e controle de vale'
            + ' transporte, alimentação e plano de saúde.',
        },
        {
          title: 'eSocial e obrigações',
          text: 'Envio dos eventos, DCTFWeb e as declarações trabalhistas'
            + ' dentro do prazo legal.',
        },
        {
          title: 'Pró-labore de sócios',
          text: 'Definição do valor, recolhimento do INSS e o encaixe com a'
            + ' distribuição de lucros.',
        },
      ],
    },
    {
      id: 'legalizacao',
      icon: 'i-lucide-building-2',
      title: 'Abertura, legalização e encerramento',
      lead: 'O ciclo de vida do CNPJ: nascer certo, mudar sem travar e, quando'
        + ' for o caso, encerrar sem deixar passivo aberto.',
      items: [
        {
          title: 'Abertura de empresa',
          text: 'Escolha do CNAE e do regime, contrato social, registro na'
            + ' Junta e inscrições federal, estadual e municipal.',
        },
        {
          title: 'Alterações contratuais',
          text: 'Entrada e saída de sócio, mudança de endereço, capital,'
            + ' atividade ou natureza jurídica.',
        },
        {
          title: 'Licenças e alvarás',
          text: 'Alvará de funcionamento, licença sanitária e as exigências'
            + ' específicas da atividade e do município.',
        },
        {
          title: 'Certificado digital',
          text: 'Emissão e renovação do e-CPF e do e-CNPJ, com validação por'
            + ' videoconferência, além das procurações eletrônicas no e-CAC.',
          href: '/certificado-digital',
          hrefLabel: 'Ver e-CPF e e-CNPJ',
        },
        {
          title: 'Encerramento e baixa',
          text: 'Distrato, baixa nos órgãos e as declarações finais, pra o CNPJ'
            + ' não voltar a assombrar depois.',
        },
      ],
    },
    {
      id: 'consultoria',
      icon: 'i-lucide-line-chart',
      title: 'Assessoria e consultoria',
      lead: 'Trabalho por projeto, para as decisões que saem da rotina — e onde'
        + ' o número precisa aguentar contestação de terceiro.',
      image: '/img/servico-consultoria.jpg',
      imageAlt: 'Reunião de consultoria com apresentação de números',
      items: [
        {
          title: 'Due diligence contábil',
          text: 'Levantamento de passivos, teste de consistência dos números e'
            + ' relatório de achados para compra, venda ou entrada de sócio.',
        },
        {
          title: 'Consultoria contábil',
          text: 'Leitura crítica da contabilidade que existe hoje, com plano de'
            + ' correção do que estiver comprometendo a informação.',
        },
        {
          title: 'Elaboração de demonstrativos',
          text: 'Montagem e revisão de balanço, DRE e fluxo de caixa para'
            + ' banco, investidor ou processo societário.',
        },
        {
          title: 'Projeções financeiras',
          text: 'Cenários de receita, custo e caixa a partir da contabilidade'
            + ' real — não de planilha de intenção.',
        },
        {
          title: 'Apoio societário',
          text: 'Suporte contábil em reorganização, apuração de haveres e'
            + ' avaliação de participação.',
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* /pj — landing de aquisição                                          */
/* ------------------------------------------------------------------ */

export const pj = {
  hero: {
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
  },

  painPoints: {
    title: 'Se você recebe como PJ, provavelmente já passou por isso',
    items: [
      {
        icon: 'i-lucide-clock-alert',
        title: 'A nota que trava todo dia 5',
        text: 'O cliente cobra a nota, o portal da prefeitura é de outro século'
          + ' e o contador só responde depois do almoço.',
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
        text: 'Você assina o que mandam assinar e descobre no fim do ano que'
          + ' dava pra ter pago menos imposto, dentro da lei.',
      },
      {
        icon: 'i-lucide-file-plus',
        title: 'Quer abrir o CNPJ e não sabe por onde começa',
        text: 'CNAE, regime, município, certificado digital, alvará. É muita'
          + ' sigla pra quem só quer emitir nota e trabalhar.',
      },
    ],
  },

  audience: {
    eyebrow: 'Para quem é',
    title: 'Feito para quem fatura pelo próprio CNPJ',
    lead: 'Esta frente atende profissionais que prestam serviço como PJ —'
      + ' sozinhos ou com um sócio — e não precisam da estrutura (nem do preço)'
      + ' de uma contabilidade feita para indústria e comércio.',
    items: [
      { icon: 'i-lucide-code-xml', title: 'Devs e profissionais de TI', text: 'Contrato PJ com uma ou duas empresas, faturamento recorrente.' },
      { icon: 'i-lucide-palette', title: 'Design, marketing e conteúdo', text: 'Freelas, retainers mensais e clientes que exigem nota.' },
      { icon: 'i-lucide-briefcase', title: 'Consultores e especialistas', text: 'Projetos por hora ou por escopo, com faturamento variável.' },
      { icon: 'i-lucide-stethoscope', title: 'Saúde e outras liberais', text: 'Plantões, atendimentos e repasses de clínica pelo seu CNPJ.' },
    ],
  },

  services: {
    eyebrow: 'O que está incluso',
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
        text: 'Definimos o mix entre pró-labore e distribuição de lucros que'
          + ' faz sentido pro seu caso, considerando INSS e Fator R.',
      },
      {
        icon: 'i-lucide-calculator',
        title: 'Planejamento tributário',
        text: 'Simples, Presumido ou Real: revisamos seu enquadramento sempre'
          + ' que o faturamento muda de patamar.',
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
  },

  howItWorks: {
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
  },

  /**
   * ⚠️ Preços de hipótese (mercado cobra R$ 400–450; a ideia é entrar em
   * R$ 250–300). Validar antes de publicar. Estes números aparecem SÓ aqui —
   * a home institucional é deliberadamente sem preço.
   */
  plans: {
    eyebrow: 'Planos',
    title: 'Preço de quem tirou o trabalho manual do meio',
    lead: 'A maior parte das contabilidades cobra de R$ 400 a R$ 450 por mês de'
      + ' um PJ — e ainda cobra por nota emitida. Como a emissão é'
      + ' self-service, esse custo não existe aqui.',
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
  },

  comparison: {
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
  },

  faq: {
    eyebrow: 'Dúvidas',
    title: 'O que perguntam antes de fechar',
    items: [
      {
        q: 'Quanto vou pagar de imposto trabalhando como PJ?',
        a: 'Na maioria dos casos de prestação de serviço, o CNPJ fica no Simples'
          + ' Nacional. A alíquota depende do seu CNAE e do Fator R — quando a'
          + ' folha (incluindo pró-labore) representa pelo menos 28% da receita,'
          + ' a atividade cai no Anexo III, que começa em 6%, em vez do Anexo V,'
          + ' que começa em 15,5%. Faz muita diferença no fim do mês, e é uma'
          + ' das primeiras coisas que a gente calcula pra você.',
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
          + ' bastante conforme a cidade e a atividade — a gente te dá a'
          + ' estimativa do seu caso na primeira conversa e acompanha cada etapa.',
      },
      {
        q: 'Como funciona a emissão da nota, na prática?',
        a: 'Você entra no app, escolhe o cliente já cadastrado, confere o valor'
          + ' e emite. Se a nota do mês é sempre igual, é literalmente um clique'
          + ' repetindo a anterior. A nota chega em PDF e XML pra você e pro seu'
          + ' cliente, e já entra na nossa apuração automaticamente.',
      },
      {
        q: 'Vocês cobram por nota emitida?',
        a: 'Não. Notas ilimitadas em qualquer plano. Essa cobrança existe em'
          + ' escritórios onde alguém digita a nota manualmente — aqui quem'
          + ' emite é você, então não há por que cobrar.',
      },
      {
        q: 'Não seria melhor eu ser MEI?',
        a: 'Depende. O MEI tem um limite de faturamento bem menor e não aceita'
          + ' várias atividades comuns em TI, consultoria e saúde — e o'
          + ' contratante costuma exigir uma empresa fora do MEI. A gente confere'
          + ' o seu CNAE e o seu faturamento antes de indicar qualquer coisa; se'
          + ' o MEI resolver o seu caso, a gente fala isso na cara dura.',
      },
      {
        q: 'Posso pagar tudo como distribuição de lucros?',
        a: 'Não. O sócio que trabalha na empresa precisa de pró-labore, que é a'
          + ' base do INSS. O que dá pra fazer — e é onde mora a economia — é'
          + ' calibrar o valor do pró-labore junto com o Fator R e o restante'
          + ' das retiradas. A gente monta esse desenho com você e revisa quando'
          + ' o faturamento muda.',
      },
      {
        q: 'E se minha empresa crescer e sair do Simples?',
        a: 'Continua com a gente. O escritório atende Presumido e Real, folha'
          + ' com funcionários, demonstrações contábeis e consultoria — essa'
          + ' frente de PJ é a porta de entrada, não o teto do que fazemos.',
      },
    ],
  },

  finalCta: {
    title: 'Chama no WhatsApp e conta o seu caso',
    lead: 'Em poucos minutos você sabe quanto vai pagar de mensalidade, quanto'
      + ' vai pagar de imposto e o que precisa pra começar.',
    ctaLabel: 'Falar com um contador agora',
    note: 'Respondemos de segunda a sexta, das 9h às 18h.',
  },
};
