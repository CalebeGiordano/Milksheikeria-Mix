/* ==========================================================================
   Estatísticas do site
   --------------------------------------------------------------------------
   Duas coisas acontecem aqui:

   1. Google Analytics 4 — é ele que junta os números de TODOS os visitantes.
      O identificador fica em LOJA.googleAnalyticsId (data.js) e pode ser
      configurado pelo painel. Se estiver vazio, nada é enviado.

   2. Um contador guardado no próprio navegador. Ele NÃO substitui o Analytics
      (só enxerga quem está usando aquele computador), mas serve para conferir
      no painel se o rastreamento está funcionando.

   Carregue este arquivo DEPOIS de data.js e ANTES de app.js.
   ========================================================================== */

(function () {
  "use strict";

  const LOJA = (window.DADOS && window.DADOS.LOJA) || {};
  const ID = (LOJA.googleAnalyticsId || "").trim();
  const CHAVE_STATS = "mix_stats_v1";

  /* ----------------------------------------------------------------------
     Google Analytics 4
     ---------------------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  const analyticsLigado = /^G-[A-Z0-9]+$/i.test(ID);

  if (analyticsLigado) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ID);
    document.head.appendChild(s);

    gtag("js", new Date());
    gtag("config", ID, { send_page_view: true });
  }

  /* ----------------------------------------------------------------------
     Contador local (só para conferência no painel)
     ---------------------------------------------------------------------- */
  function lerStats() {
    try {
      const bruto = localStorage.getItem(CHAVE_STATS);
      if (bruto) return JSON.parse(bruto);
    } catch (e) {
      /* ignora */
    }
    return {
      desde: new Date().toISOString(),
      visitas: 0,
      ultimaVisita: null,
      eventos: {},
      produtos: {},
      categorias: {},
      whatsapp: {},
    };
  }

  function salvarStats(stats) {
    try {
      localStorage.setItem(CHAVE_STATS, JSON.stringify(stats));
    } catch (e) {
      /* navegação privada ou armazenamento cheio: segue sem contar */
    }
  }

  function contar(objeto, chave) {
    if (!chave) return;
    objeto[chave] = (objeto[chave] || 0) + 1;
  }

  const stats = lerStats();
  stats.visitas += 1;
  stats.ultimaVisita = new Date().toISOString();
  salvarStats(stats);

  /* ----------------------------------------------------------------------
     API usada pelo app.js
     ---------------------------------------------------------------------- */
  window.MixAnalytics = {
    ligado: analyticsLigado,

    /**
     * Registra um evento no Google Analytics e no contador local.
     * @param {string} nome    nome do evento (ex.: "whatsapp_click")
     * @param {object} params  dados extras (ex.: { origem: "rodape" })
     */
    evento: function (nome, params) {
      params = params || {};

      if (analyticsLigado) {
        try {
          gtag("event", nome, params);
        } catch (e) {
          /* não deixa o rastreamento derrubar o site */
        }
      }

      const s = lerStats();
      contar(s.eventos, nome);
      /* "produtos" conta só o que foi para o carrinho — se contasse qualquer
         item_name, as fotos da galeria entrariam na lista de mais pedidos. */
      if (nome === "add_to_cart" && params.item_name) contar(s.produtos, params.item_name);
      if (params.categoria) contar(s.categorias, params.categoria);
      if (nome === "whatsapp_click") contar(s.whatsapp, params.origem || "outro");
      salvarStats(s);
    },
  };
})();
