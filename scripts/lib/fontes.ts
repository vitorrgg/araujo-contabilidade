/*
 * Baixa e cacheia as instâncias ESTÁTICAS das fontes da marca em `.fonts/`.
 *
 * Existe porque dois geradores precisam do arquivo da fonte, e não do CSS:
 *   - `scripts/gerar-logos.ts`  converte o logotipo em contorno (opentype.js);
 *   - `scripts/gerar-posts.ts`  desenha os slides fora do navegador (Satori).
 *
 * Nenhum dos dois aceita `@fontsource` (woff2) nem `<link>` do Google Fonts.
 *
 * ⚠️ A variável NÃO serve aqui. O opentype.js enxerga só o master padrão dela,
 * e o Satori idem — o resultado é tudo saindo no mesmo peso. Por isso as URLs
 * abaixo apontam para as instâncias estáticas, uma por peso.
 *
 * As duas famílias são OFL (Playfair Display e Inter), então distribuir o
 * contorno dentro de um logo ou de um PNG de post é permitido. Os arquivos
 * ficam em `.fonts/`, fora do versionamento (ver .gitignore).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pastaFontes = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../.fonts',
);

/** `família-peso`, como o resto do código se refere a uma fonte. */
export type ChaveFonte =
  | 'playfair-400'
  | 'playfair-700'
  | 'inter-400'
  | 'inter-600';

/* URLs colhidas de
 * `https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@400;700`
 * requisitado SEM User-Agent — assim o Google devolve truetype em vez de woff2. */
const FONTES: Record<ChaveFonte, { arquivo: string; url: string }> = {
  'playfair-400': {
    arquivo: 'PlayfairDisplay-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.ttf',
  },
  'playfair-700': {
    arquivo: 'PlayfairDisplay-Bold.ttf',
    url: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf',
  },
  'inter-400': {
    arquivo: 'Inter-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf',
  },
  'inter-600': {
    arquivo: 'Inter-SemiBold.ttf',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf',
  },
};

/** Devolve o arquivo da fonte, baixando na primeira vez. */
export const arquivoFonte = async (chave: ChaveFonte): Promise<Buffer> => {
  const { arquivo, url } = FONTES[chave];
  const caminho = path.join(pastaFontes, arquivo);
  if (!fs.existsSync(caminho)) {
    fs.mkdirSync(pastaFontes, { recursive: true });
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error(`Falha ao baixar ${arquivo}: ${resposta.status}`);
    fs.writeFileSync(caminho, Buffer.from(await resposta.arrayBuffer()));
    console.log(`  baixei ${arquivo}`);
  }
  return fs.readFileSync(caminho);
};
