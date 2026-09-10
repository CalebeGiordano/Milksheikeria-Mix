/* ==========================================================================
   Ponte entre o painel administrativo e o site
   --------------------------------------------------------------------------
   O painel administrativo é um projeto separado (repositório
   "Milkshake Mix - Painel"). Ele guarda as alterações no navegador, e este
   arquivo as aplica por cima do que está em data.js, para que a pessoa veja
   o resultado no site antes de publicar.

   Importante: isso é só uma PRÉ-VISUALIZAÇÃO, e vale apenas no navegador de
   quem editou — e apenas quando o painel está no mesmo domínio do site.
   Para o site no ar mudar de verdade, é preciso usar o botão "Baixar data.js"
   no painel e substituir o arquivo assets/js/data.js deste repositório.

   Carregue este arquivo DEPOIS de data.js e ANTES de app.js.
   ========================================================================== */

(function () {
  "use strict";

  const CHAVE_DADOS = "mix_admin_data_v1";
  const CHAVE_PREVIEW = "mix_admin_preview_v1";

  /* Campos que o site aceita receber do painel. Qualquer outra coisa guardada
     no navegador é ignorada, para uma edição malfeita não quebrar a página. */
  const CAMPOS = [
    "LOJA",
    "CATEGORIAS",
    "PRODUTOS",
    "GALERIA",
    "BASES",
    "SABORES",
    "TAMANHOS",
    "ACOMPANHAMENTOS",
    "CALDAS",
    "MIX_PADRAO",
    "SABORES_FAIXA",
    "AVALIACOES",
  ];

  function ler(chave) {
    try {
      return localStorage.getItem(chave);
    } catch (e) {
      return null;
    }
  }

  /* A pré-visualização só entra se estiver ligada no painel. */
  if (ler(CHAVE_PREVIEW) !== "1") return;

  const bruto = ler(CHAVE_DADOS);
  if (!bruto) return;

  let alteracoes;
  try {
    alteracoes = JSON.parse(bruto);
  } catch (e) {
    console.warn("[Painel] Não consegui ler as alterações salvas. Usando data.js.", e);
    return;
  }

  if (!alteracoes || typeof alteracoes !== "object") return;

  CAMPOS.forEach(function (campo) {
    const valor = alteracoes[campo];
    if (valor === undefined || valor === null) return;
    /* Listas precisam continuar listas, e objetos precisam continuar objetos. */
    const originalEhLista = Array.isArray(window.DADOS[campo]);
    if (originalEhLista !== Array.isArray(valor)) return;
    window.DADOS[campo] = valor;
  });

  /* Fotos enviadas pelo painel ainda não existem como arquivo na pasta.
     Enquanto isso, a pré-visualização usa a imagem embutida (_preview). */
  function aplicarPreviaDeImagem(lista) {
    if (!Array.isArray(lista)) return;
    lista.forEach(function (item) {
      if (item && item._preview) {
        if (item.image) item.image = item._preview;
        if (item.src) item.src = item._preview;
      }
    });
  }
  aplicarPreviaDeImagem(window.DADOS.PRODUTOS);
  aplicarPreviaDeImagem(window.DADOS.GALERIA);
})();
