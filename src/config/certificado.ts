/*
 * Conteúdo da página de certificado digital.
 *
 * Mora fora de `site.ts` porque certificado é PRODUTO, não serviço recorrente:
 * tem SKU (tipo × mídia × validade), decisão de compra curta e público que
 * chega pela busca já sabendo o que quer. Ganha página própria com a mesma
 * gramática de /pj — herói, para que serve, o que é, como funciona, dúvidas —
 * em vez de virar mais um item de lista em /servicos.
 *
 * ⚠️ SEM PREÇO, de propósito: depende da AC parceira e da tabela vigente, e a
 * referência do setor também não publica. O CTA leva pra orçamento.
 *
 * ⚠️ A gccont emite COMO PARCEIRA de uma Autoridade Certificadora credenciada
 * no ICP-Brasil. A copy nunca diz que a gccont é uma AC ou uma AR — confirmar
 * a parceria antes de publicar.
 */

export const certificado = {
  hero: {
    eyebrow: 'Certificado digital ICP-Brasil',
    title: 'e-CPF e e-CNPJ',
    titleHighlight: 'com validação por videoconferência',
    lead: 'Emissão, renovação e instalação do seu certificado digital sem sair'
      + ' do escritório. A gente cuida do agendamento, acompanha a validação e'
      + ' testa o certificado com você antes de encerrar o atendimento.',
    proofs: [
      'Validação por videoconferência ou presencial',
      'Padrão ICP-Brasil, com Autoridade Certificadora credenciada',
      'Instalação e teste acompanhados por nós',
    ],
    image: '/img/certificado-hero.jpg',
    imageAlt: 'Pessoa assinando um documento ao lado de um notebook',
  },

  /** O gancho de busca: quem procura certificado procura pelo uso, não pelo produto. */
  uses: {
    eyebrow: 'Para que serve',
    title: 'Se alguma dessas obrigações é sua, o certificado é obrigatório',
    lead: 'O certificado digital é a sua identidade — ou a da sua empresa — no'
      + ' meio eletrônico. É ele que assina, autentica e dá validade jurídica.',
    items: [
      {
        icon: 'i-lucide-landmark',
        title: 'e-CAC e Receita Federal',
        text: 'Acesso completo ao portal, entrega de declarações, parcelamentos'
          + ' e procurações eletrônicas.',
      },
      {
        icon: 'i-lucide-file-check',
        title: 'Nota fiscal eletrônica',
        text: 'Emissão de NF-e, NFC-e e, em boa parte dos municípios, da NFS-e'
          + ' pelo próprio sistema da empresa.',
      },
      {
        icon: 'i-lucide-users',
        title: 'eSocial e FGTS Digital',
        text: 'Envio dos eventos trabalhistas e acesso ao FGTS Digital e à'
          + ' Conectividade Social.',
      },
      {
        icon: 'i-lucide-pen-tool',
        title: 'Assinatura de documentos',
        text: 'Contrato, procuração e distrato assinados com validade jurídica,'
          + ' sem reconhecer firma em cartório.',
      },
      {
        icon: 'i-lucide-gavel',
        title: 'Licitações e processos',
        text: 'Compras públicas, peticionamento eletrônico e sistemas que'
          + ' exigem identificação forte.',
      },
      {
        icon: 'i-lucide-shield-check',
        title: 'Conta gov.br nível ouro',
        text: 'O e-CPF eleva a sua conta gov.br ao nível mais alto e libera os'
          + ' serviços restritos.',
      },
    ],
  },

  /** Os dois produtos, cada um com o público e os usos que o justificam. */
  products: {
    eyebrow: 'Os certificados',
    title: 'Um identifica você. O outro identifica a empresa.',
    lead: 'São documentos diferentes e não se substituem — muita gente compra'
      + ' errado e descobre no meio da obrigação.',
    items: [
      {
        id: 'e-cpf',
        badge: 'Pessoa física',
        title: 'e-CPF',
        text: 'A sua identidade digital. Vinculado ao seu CPF, acompanha você'
          + ' mesmo se trocar de empresa.',
        isFeatured: false,
        features: [
          'Imposto de renda e e-CAC pessoa física',
          'Assinatura de contratos e procurações em seu nome',
          'Conta gov.br nível ouro',
          'Processos judiciais e sistemas do INSS',
        ],
        ctaLabel: 'Pedir orçamento de e-CPF',
        ctaMessage: 'Oi! Quero um orçamento de e-CPF.',
      },
      {
        id: 'e-cnpj',
        badge: 'Pessoa jurídica',
        title: 'e-CNPJ',
        text: 'A identidade digital da empresa. Emitido em nome do CNPJ, com o'
          + ' responsável legal como titular.',
        isFeatured: true,
        features: [
          'Emissão de NF-e, NFC-e e NFS-e',
          'eSocial, FGTS Digital e Conectividade Social',
          'e-CAC da empresa e Domicílio Tributário Eletrônico',
          'Licitações e sistemas de compras públicas',
        ],
        ctaLabel: 'Pedir orçamento de e-CNPJ',
        ctaMessage: 'Oi! Quero um orçamento de e-CNPJ.',
      },
    ],
  },

  /** A decisão que o cliente realmente precisa tomar. */
  media: {
    eyebrow: 'A1 ou A3',
    title: 'A diferença está em onde a chave fica guardada',
    lead: 'Os dois têm a mesma validade jurídica. O que muda é a mídia, o prazo'
      + ' e o jeito de usar no dia a dia.',
    columns: ['A1 · arquivo', 'A3 · token ou cartão'],
    rows: [
      {
        label: 'Onde fica',
        a1: 'Arquivo instalado no computador ou em nuvem',
        a3: 'Dentro de um token USB ou cartão com leitora',
      },
      { label: 'Validade', a1: '1 ano', a3: 'De 1 a 3 anos' },
      { label: 'Precisa de hardware', a1: 'Não', a3: 'Sim — o token ou a leitora' },
      {
        label: 'Pode ser copiado',
        a1: 'Sim, pode ficar em mais de uma máquina',
        a3: 'Não — a chave não sai do dispositivo',
      },
      {
        label: 'Melhor para',
        a1: 'Sistema que emite nota automaticamente',
        a3: 'Quem quer o certificado só na sua mão, com prazo mais longo',
      },
      {
        label: 'Se o computador formatar',
        a1: 'Perde o certificado, se não houver backup',
        a3: 'Continua no token: é só plugar em outra máquina',
      },
    ],
    note: 'Na dúvida, a gente escolhe com você a partir de como a sua empresa'
      + ' emite nota e de quem vai precisar usar o certificado.',
  },

  howItWorks: {
    eyebrow: 'Como funciona',
    title: 'Do pedido ao certificado instalado',
    steps: [
      {
        title: 'A gente identifica o que você precisa',
        text: 'e-CPF ou e-CNPJ, A1 ou A3, e por quanto tempo. Cinco minutos de'
          + ' conversa evitam comprar o certificado errado.',
      },
      {
        title: 'Você envia os documentos',
        text: 'Documento com foto e CPF. Para o e-CNPJ, também o contrato social'
          + ' ou a última alteração e os dados do responsável legal.',
      },
      {
        title: 'Validação por videoconferência',
        text: 'Agendamento em horário que você escolhe. A validação é feita pela'
          + ' Autoridade Certificadora e dura poucos minutos. Se preferir'
          + ' presencial, também dá.',
      },
      {
        title: 'Emissão, instalação e teste',
        text: 'O certificado é emitido na hora. A gente instala com você, testa'
          + ' num acesso real e só encerra quando estiver funcionando.',
      },
    ],
  },

  faq: {
    eyebrow: 'Dúvidas',
    title: 'O que perguntam antes de comprar',
    items: [
      {
        q: 'Qual a diferença entre A1 e A3, na prática?',
        a: 'A validade jurídica é a mesma. O A1 é um arquivo que fica instalado'
          + ' no computador ou em nuvem, vale 1 ano e pode ser copiado — é o'
          + ' formato de quem tem sistema emitindo nota automaticamente. O A3'
          + ' fica dentro de um token ou cartão, vale de 1 a 3 anos e a chave'
          + ' nunca sai do dispositivo, o que é mais seguro, mas exige plugar a'
          + ' mídia toda vez que for usar.',
      },
      {
        q: 'Preciso de e-CPF, e-CNPJ ou os dois?',
        a: 'Depende do que você assina. Obrigação da empresa — nota fiscal,'
          + ' eSocial, FGTS Digital, e-CAC do CNPJ — pede e-CNPJ. Coisa em seu'
          + ' nome — imposto de renda, procuração, gov.br ouro — pede e-CPF.'
          + ' Muitos empresários acabam com os dois, e isso é normal.',
      },
      {
        q: 'Como funciona a validação por videoconferência?',
        a: 'Você agenda um horário e, na hora marcada, entra numa chamada com um'
          + ' agente de validação da Autoridade Certificadora. Ele confere seus'
          + ' documentos ao vivo e confirma sua identidade. Leva poucos minutos'
          + ' e tem o mesmo valor da validação presencial. Precisa de câmera,'
          + ' boa iluminação e os documentos originais em mãos.',
      },
      {
        q: 'Quais documentos eu preciso separar?',
        a: 'Para o e-CPF: documento de identidade com foto (RG ou CNH) e CPF.'
          + ' Para o e-CNPJ: os mesmos documentos do responsável legal, mais o'
          + ' contrato social ou a última alteração consolidada e o cartão CNPJ.'
          + ' Se a empresa já é nossa cliente, boa parte disso está com a gente.',
      },
      {
        q: 'Quanto tempo demora?',
        a: 'Feita a validação, a emissão é na hora. O prazo total depende de'
          + ' quando você consegue agendar a videoconferência — normalmente dá'
          + ' pra resolver no mesmo dia ou no dia seguinte.',
      },
      {
        q: 'Meu certificado está vencendo. Dá pra renovar?',
        a: 'Se ainda estiver dentro da validade, em muitos casos a renovação é'
          + ' mais simples e pode dispensar nova validação — varia conforme a'
          + ' Autoridade Certificadora e o tipo do certificado. Depois de'
          + ' vencido não existe renovação: é uma emissão nova, com validação'
          + ' nova. Por isso a gente avisa antes do vencimento.',
      },
      {
        q: 'Perdi o token ou ele quebrou. E agora?',
        a: 'Não tem recuperação: a chave estava dentro do dispositivo e não sai'
          + ' de lá. É preciso revogar o certificado e emitir outro. Se o token'
          + ' foi perdido ou roubado, avise imediatamente para a revogação — é o'
          + ' que impede o uso indevido.',
      },
      {
        q: 'O certificado assina contrato com validade jurídica?',
        a: 'Sim. A assinatura com certificado ICP-Brasil tem presunção de'
          + ' autenticidade e integridade pela MP 2.200-2/2001 e é aceita sem'
          + ' reconhecimento de firma. É o padrão mais forte que existe hoje no'
          + ' Brasil para documento eletrônico.',
      },
      {
        q: 'Já sou cliente da contabilidade. Muda alguma coisa?',
        a: 'Fica mais rápido: a gente já tem sua documentação societária e já'
          + ' sabe quais obrigações da sua empresa exigem certificado. Você só'
          + ' confirma o tipo e agenda a validação.',
      },
    ],
  },

  finalCta: {
    title: 'Pede o orçamento e a gente já diz qual é o certificado certo',
    lead: 'Conte em duas linhas o que você precisa assinar. A gente responde com'
      + ' o tipo, a mídia, o prazo e o valor.',
    ctaLabel: 'Pedir orçamento no WhatsApp',
    ctaMessage: 'Oi! Quero um orçamento de certificado digital.',
    note: 'Atendimento de segunda a sexta, das 9h às 18h.',
  },

  /** Faixa reaproveitada na home e no fim de /servicos. */
  band: {
    eyebrow: 'Certificado digital',
    title: 'e-CPF e e-CNPJ com validação por videoconferência',
    lead: 'Emissão, renovação e instalação no padrão ICP-Brasil — sem fila, sem'
      + ' cartório e sem sair do escritório.',
    items: [
      {
        title: 'e-CPF',
        text: 'A sua identidade digital: imposto de renda, gov.br ouro e'
          + ' assinatura em seu nome.',
      },
      {
        title: 'e-CNPJ',
        text: 'A da empresa: nota fiscal, eSocial, FGTS Digital e e-CAC do'
          + ' CNPJ.',
      },
    ],
    ctaLabel: 'Ver certificados',
    ctaHref: '/certificado-digital',
  },
};
