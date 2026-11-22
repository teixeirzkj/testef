# Relatório de edição do vídeo

**Origem:** `video-iphone.mp4`, com 8:11 (491,2 s), 1280×720, 29,97 fps, H.264 Main e áudio AAC LC estéreo a 48 kHz, cerca de 1,26 Mbps no total.
**Backup do original:** `../backup/video-iphone.original.mp4`, fora do repositório. O arquivo de origem não foi alterado.
**Resultado:** `public/videos/fonte-prime-editado.mp4`, com 6:47 (407,0 s), 1280×720, 29,97 fps, H.264 High (CRF 22) e AAC a 128 kbps, cerca de 1,55 Mbps e 79 MB. Tem `faststart` para começar a tocar antes de baixar inteiro.

**Método:** transcrição local com Whisper (whisper.cpp, modelo *small*, embutido no FFmpeg 9), com marcação de tempo palavra por palavra. Os pontos de corte foram conferidos pela energia do áudio, para não cortar palavras, e quadro a quadro, para não sobrar texto na tela. Cada corte tem uma transição de 0,12 s (fade de vídeo e crossfade de áudio). A fala não foi alterada nem gerada por IA.

## Trechos removidos (tempos do vídeo original)

| # | Início | Fim | Conteúdo removido |
|---|---|---|---|
| A | 04:39.30 | 04:46.95 | "E eu tenho tanta certeza disso que vou te dar 120 dias de garantia para você testar tudo. Já explico isso." Também sai o grafismo "120 dias de garantia". |
| B | 06:03.98 | 07:03.50 | "Seria justo te cobrar… não vai ser mil reais, nem 500, nem 300, só hoje você vai investir 37 reais, apenas R$ 37… 120 dias de garantia… 4 meses… clica no botão… se em 120 dias você achar que não valeu, eu devolvo 100% do seu dinheiro… leva sua grana de volta." Também saem os grafismos "R$ 37,00 só hoje", "120 dias de garantia" e "4 meses de garantia". |
| C | 07:23.42 | 07:29.88 | "Já comprei curso e não funcionou. Eu sei que tem muita gente ruim, e é por isso que eu te dou 120 dias de garantia." |
| D | 08:00.95 | 08:11.20 | "Clique no botão agora e vem viver de iPhone", com o nome da marca original, e a música final. |

## Validação

- Retranscrevi o arquivo editado: não sobrou menção a R$ 37, parcelamento, garantia de 120 dias, reembolso ou "viver de iPhone".
- Duas ocorrências ficaram de propósito, porque não são da oferta: o preço de vitrine das lojas ("5.000 ou 5.500 reais") e a garantia de fábrica do aparelho ("mesmo lacre, mesma garantia").
- Não há quadros pretos inesperados. O único é o fade final de cerca de 0,07 s.
- Aos **05:50** do vídeo editado o apresentador acabou de perguntar "quanto valeria pra você ter o contato desse fornecedor?". É nesse momento que a oferta aparece na página.

## Pontos de atenção (não removidos)

O vídeo é narrado em primeira pessoa pelo apresentador original e ainda contém trechos que **não correspondem ao produto atual** (Grupo VIP de Promoções no Telegram):

- **03:14–04:19 e 06:39:** "pegar o contato do fornecedor", "fornecedor no seu WhatsApp".
- **05:19–05:46:** a lista do que se leva, que inclui "te ensino a vender", "script de vendas", "emitir nota fiscal" e "MacBook, iPad".
- **04:29–04:39 e 05:04–05:13:** promessas de ganho ("até 4 mil reais de lucro", "gente que ganha 300 mil reais").
- **04:47–05:17:** depoimentos de alunos do apresentador.

Recomendação: revisar esses trechos, ou substituí-los por um vídeo próprio, antes de veicular anúncios.
