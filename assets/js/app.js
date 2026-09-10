/* ==========================================================================
   Milk Shake Mix — comportamento do site
   Depende de assets/js/data.js (carregado antes deste arquivo).
   ========================================================================== */

(function () {
  "use strict";

  /* ======================================================================
     0. Fonte dos dados

     Tudo vem de window.DADOS, montado no fim do data.js. O admin-bridge.js
     pode ter substituído esses valores pelos do painel (pré-visualização).
     ====================================================================== */

  const D = window.DADOS;
  const LOJA = D.LOJA;
  const CATEGORIAS = D.CATEGORIAS;
  const PRODUTOS = D.PRODUTOS;
  const GALERIA = D.GALERIA;
  const BASES = D.BASES;
  const SABORES = D.SABORES;
  const TAMANHOS = D.TAMANHOS;
  const ACOMPANHAMENTOS = D.ACOMPANHAMENTOS;
  const CALDAS = D.CALDAS;
  const MIX_PADRAO = D.MIX_PADRAO;
  const SABORES_FAIXA = D.SABORES_FAIXA;
  const AVALIACOES = D.AVALIACOES;

  /* Registra um evento de estatística (não quebra se analytics.js faltar) */
  function rastrear(nome, params) {
    if (window.MixAnalytics) window.MixAnalytics.evento(nome, params);
  }

  /* ======================================================================
     1. Utilitários
     ====================================================================== */

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* Formata valores como no site: 16.9 -> "R$ 16,90" */
  const moeda = (valor) => "R$ " + valor.toFixed(2).replace(".", ",");

  /* Monta o link do WhatsApp com a mensagem já preenchida */
  const linkWhatsApp = (texto) =>
    "https://wa.me/" + LOJA.whatsapp + "?text=" + encodeURIComponent(texto);

  /* ----------------------------------------------------------------------
     Ícones (Lucide). Cada entrada guarda só o conteúdo interno do <svg>.
     ---------------------------------------------------------------------- */
  const ICONS = {
    "arrow-right": '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>',
    check: '<path d="M20 6 9 17l-5-5"></path>',
    "cup-soda":
      '<path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"></path><path d="M5 8h14"></path><path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"></path><path d="m12 8 1-6h2"></path>',
    "glass-water":
      '<path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z"></path><path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"></path>',
    "ice-cream-cone":
      '<path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"></path><path d="M17 7A5 5 0 0 0 7 7"></path><path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"></path>',
    minus: '<path d="M5 12h14"></path>',
    plus: '<path d="M5 12h14"></path><path d="M12 5v14"></path>',
    quote:
      '<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>',
    "shopping-bag":
      '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>',
    "trash-2":
      '<path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line>',
  };

  /* Devolve o HTML de um ícone com as classes pedidas */
  function icon(nome, classes) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" class="lucide lucide-' +
      nome +
      " " +
      (classes || "") +
      '">' +
      (ICONS[nome] || "") +
      "</svg>"
    );
  }

  /* Escapa texto que vai para dentro do HTML */
  function esc(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ======================================================================
     2. Dados da loja no HTML
     Mantém endereço, telefone, nota etc. sempre iguais ao que está em
     data.js — o HTML já traz o texto certo, isto só evita divergência
     quando alguém edita apenas o data.js.
     ====================================================================== */

  function aplicarDadosDaLoja() {
    const valores = {
      nome: LOJA.nome,
      endereco: LOJA.endereco,
      telefone: LOJA.telefone,
      horario: LOJA.horario,
      horarioObs: LOJA.horarioObs,
      nota: String(LOJA.nota).replace(".", "."),
      totalAvaliacoes: String(LOJA.totalAvaliacoes),
      instagramUser: LOJA.instagramUser,
      pagamentos: LOJA.pagamentos.join(" • "),
    };

    $$("[data-loja]").forEach((el) => {
      const chave = el.dataset.loja;
      if (valores[chave] !== undefined) el.textContent = valores[chave];
    });

    $$("[data-loja-href]").forEach((el) => {
      const chave = el.dataset.lojaHref;
      if (chave === "tel") el.href = "tel:" + LOJA.telefoneIntl;
      else if (LOJA[chave]) el.href = LOJA[chave];
    });
  }

  /* ======================================================================
     3. Estrelinhas e faixa de sabores
     ====================================================================== */

  function montarEstrelas() {
    $$("[data-stars]").forEach((el) => {
      const total = Number(el.dataset.stars) || 5;
      const cls = el.dataset.starClass || "h-4 w-4";
      let html = "";
      for (let i = 0; i < total; i++) html += icon("star", cls + " fill-current");
      el.innerHTML = html;
    });
  }

  /* A faixa desliza -50%, então os sabores aparecem duas vezes. */
  function montarMarquee() {
    const faixa = $("#marquee");
    if (!faixa) return;
    const bloco = SABORES_FAIXA.map(
      (sabor) =>
        '<div class="flex items-center gap-8">' +
        '<span class="text-xl font-extrabold uppercase tracking-[0.18em] text-white/85 sm:text-2xl">' +
        esc(sabor) +
        "</span>" +
        '<span class="text-xl text-[#FFD600]">✦</span>' +
        "</div>"
    ).join("");
    faixa.innerHTML = bloco + bloco;
  }

  /* ======================================================================
     4. Cabeçalho, menu mobile e rolagem suave
     ====================================================================== */

  function ligarCabecalho() {
    const header = $("#site-header");
    const aoRolar = () => {
      const rolou = window.scrollY > 24;
      header.className =
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 " +
        (rolou
          ? "bg-[#2D0A31]/75 backdrop-blur-xl shadow-[0_8px_40px_-16px_rgba(45,10,49,0.6)] py-3"
          : "bg-transparent py-5");
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
  }

  function ligarMenuMobile() {
    const botao = $("#menu-toggle");
    const menu = $("#mobile-menu");
    const iconeMenu =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu h-5 w-5"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>';
    const iconeX =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-5 w-5"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';

    const fechar = () => {
      menu.hidden = true;
      botao.innerHTML = iconeMenu;
      botao.setAttribute("aria-expanded", "false");
    };

    botao.addEventListener("click", () => {
      if (menu.hidden) {
        menu.hidden = false;
        botao.innerHTML = iconeX;
        botao.setAttribute("aria-expanded", "true");
      } else {
        fechar();
      }
    });

    $$("a", menu).forEach((a) => a.addEventListener("click", fechar));
  }

  function ligarRolagemSuave() {
    document.addEventListener("click", (ev) => {
      const link = ev.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      if (!id) return;
      const alvo = document.getElementById(id);
      if (!alvo) return;
      ev.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", "#" + id);
    });
  }

  /* ======================================================================
     5. Reveal ao rolar (substitui o framer-motion do site original)
     ====================================================================== */

  let observadorReveal = null;

  function ligarReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    observadorReveal = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observadorReveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    $$(".reveal").forEach((el) => observadorReveal.observe(el));
  }

  /* Para elementos criados depois (ex.: cartões da galeria) */
  function observarReveal(el) {
    if (observadorReveal) observadorReveal.observe(el);
    else el.classList.add("is-visible");
  }

  /* ======================================================================
     6. Carrinho
     ====================================================================== */

  const CHAVE_CARRINHO = "mix_cart_v1";

  const carrinho = {
    itens: [],

    carregar() {
      try {
        const bruto = localStorage.getItem(CHAVE_CARRINHO);
        this.itens = bruto ? JSON.parse(bruto) : [];
      } catch (e) {
        this.itens = [];
      }
    },

    salvar() {
      try {
        localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(this.itens));
      } catch (e) {
        /* modo privado / storage bloqueado: segue sem persistir */
      }
    },

    adicionar(produto) {
      const quantidade = produto.qty || 1;
      const existente = this.itens.find((i) => i.id === produto.id);
      if (existente) {
        existente.qty += quantidade;
      } else {
        this.itens.push({
          id: produto.id,
          name: produto.name,
          price: produto.price,
          image: produto.image || null,
          note: produto.note || null,
          qty: quantidade,
        });
      }
      this.salvar();
      renderizarCarrinho();
      abrirCarrinho();
    },

    definirQtd(id, qtd) {
      this.itens = this.itens
        .map((i) => (i.id === id ? Object.assign({}, i, { qty: Math.max(0, qtd) }) : i))
        .filter((i) => i.qty > 0);
      this.salvar();
      renderizarCarrinho();
    },

    remover(id) {
      this.itens = this.itens.filter((i) => i.id !== id);
      this.salvar();
      renderizarCarrinho();
    },

    esvaziar() {
      this.itens = [];
      this.salvar();
      renderizarCarrinho();
    },

    get quantidade() {
      return this.itens.reduce((soma, i) => soma + i.qty, 0);
    },

    get total() {
      return this.itens.reduce((soma, i) => soma + i.price * i.qty, 0);
    },

    linkFinalizar() {
      if (this.itens.length === 0) return null;
      const linhas = this.itens
        .map((i) =>
          i.note
            ? "• " + i.qty + "x " + i.name + " (" + i.note + ") — " + moeda(i.price * i.qty)
            : "• " + i.qty + "x " + i.name + " — " + moeda(i.price * i.qty)
        )
        .join("\n");
      const texto =
        "Olá! Vim pelo site e gostaria de finalizar meu pedido:\n\n" +
        linhas +
        "\n\n*Total: " +
        moeda(this.total) +
        "*\n\nPode confirmar, por favor? 🍦";
      return linkWhatsApp(texto);
    },
  };

  function abrirCarrinho() {
    const overlay = $("#cart-overlay");
    const painel = $("#cart-panel");
    overlay.hidden = false;
    painel.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      overlay.classList.add("is-open");
      painel.classList.add("is-open");
    });
  }

  function fecharCarrinho() {
    const overlay = $("#cart-overlay");
    const painel = $("#cart-panel");
    overlay.classList.remove("is-open");
    painel.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => {
      overlay.hidden = true;
      painel.hidden = true;
    }, 400);
  }

  function renderizarCarrinho() {
    const qtd = carrinho.quantidade;

    const selo = $("#cart-badge");
    selo.textContent = qtd;
    selo.hidden = qtd === 0;

    $("#cart-count").textContent = qtd + " " + (qtd === 1 ? "item" : "itens");

    const vazio = $("#cart-empty");
    const lista = $("#cart-list");
    const rodape = $("#cart-footer");

    if (carrinho.itens.length === 0) {
      vazio.hidden = false;
      lista.hidden = true;
      rodape.hidden = true;
      return;
    }

    vazio.hidden = true;
    lista.hidden = false;
    rodape.hidden = false;

    $("#cart-items").innerHTML = carrinho.itens
      .map(function (item) {
        const miniatura = item.image
          ? '<img src="' +
            esc(item.image) +
            '" alt="' +
            esc(item.name) +
            '" loading="lazy" class="h-16 w-16 shrink-0 rounded-xl object-cover">'
          : '<div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#9D00FF] to-[#FF008A] text-white">' +
            icon("shopping-bag", "h-6 w-6") +
            "</div>";

        const observacao = item.note
          ? '<p class="mt-0.5 text-[11px] leading-snug text-[#2D0A31]/55">' + esc(item.note) + "</p>"
          : "";

        return (
          '<div class="flex gap-3 rounded-2xl border border-[#2D0A31]/8 bg-white p-3 shadow-sm cart-item-in">' +
          miniatura +
          '<div class="flex flex-1 flex-col">' +
          '<div class="flex items-start justify-between gap-2">' +
          '<h3 class="text-sm font-bold leading-tight text-[#2D0A31]">' +
          esc(item.name) +
          "</h3>" +
          '<button data-cart-remove="' +
          esc(item.id) +
          '" aria-label="Remover ' +
          esc(item.name) +
          '" class="text-[#2D0A31]/40 transition-colors hover:text-[#FF008A]">' +
          icon("trash-2", "h-4 w-4") +
          "</button>" +
          "</div>" +
          observacao +
          '<p class="mt-0.5 text-sm font-extrabold text-[#FF008A]">' +
          moeda(item.price * item.qty) +
          "</p>" +
          '<div class="mt-auto flex items-center gap-2 pt-2">' +
          '<button data-cart-qty="' +
          esc(item.id) +
          '" data-delta="-1" aria-label="Diminuir" class="flex h-7 w-7 items-center justify-center rounded-full bg-[#2D0A31]/8 text-[#2D0A31] transition-colors hover:bg-[#2D0A31]/15">' +
          icon("minus", "h-3.5 w-3.5") +
          "</button>" +
          '<span class="w-7 text-center text-sm font-bold text-[#2D0A31]">' +
          item.qty +
          "</span>" +
          '<button data-cart-qty="' +
          esc(item.id) +
          '" data-delta="1" aria-label="Aumentar" class="flex h-7 w-7 items-center justify-center rounded-full bg-[#2D0A31]/8 text-[#2D0A31] transition-colors hover:bg-[#2D0A31]/15">' +
          icon("plus", "h-3.5 w-3.5") +
          "</button>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    $("#cart-total").textContent = moeda(carrinho.total);
    $("#cart-checkout").href = carrinho.linkFinalizar() || "#";
  }

  function ligarCarrinho() {
    $("#cart-toggle").addEventListener("click", () => {
      abrirCarrinho();
      rastrear("view_cart", { currency: "BRL", value: carrinho.total });
    });
    $("#cart-close").addEventListener("click", fecharCarrinho);
    $("#cart-overlay").addEventListener("click", fecharCarrinho);
    $("#cart-clear").addEventListener("click", () => carrinho.esvaziar());
    $("#cart-empty-cta").addEventListener("click", () => {
      fecharCarrinho();
      const alvo = document.getElementById("cardapio");
      if (alvo) alvo.scrollIntoView({ behavior: "smooth" });
    });
    $("#cart-checkout").addEventListener("click", () => {
      rastrear("begin_checkout", { currency: "BRL", value: carrinho.total });
      rastrear("whatsapp_click", { origem: "carrinho" });
      fecharCarrinho();
    });

    $("#cart-items").addEventListener("click", (ev) => {
      const remover = ev.target.closest("[data-cart-remove]");
      if (remover) {
        const id = remover.dataset.cartRemove;
        carrinho.remover(isNaN(Number(id)) ? id : Number(id));
        return;
      }
      const qtd = ev.target.closest("[data-cart-qty]");
      if (qtd) {
        const bruto = qtd.dataset.cartQty;
        const id = isNaN(Number(bruto)) ? bruto : Number(bruto);
        const item = carrinho.itens.find((i) => i.id === id);
        if (item) carrinho.definirQtd(id, item.qty + Number(qtd.dataset.delta));
      }
    });
  }

  /* ======================================================================
     7. Cardápio: filtros e cartões
     ====================================================================== */

  let categoriaAtiva = CATEGORIAS[0];

  function classeFiltro(ativo) {
    return (
      "rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] " +
      (ativo
        ? "scale-105 bg-[#FF008A] text-white shadow-lg shadow-[#FF008A]/30"
        : "bg-white text-[#2D0A31]/70 hover:bg-[#2D0A31]/5")
    );
  }

  function renderizarFiltros() {
    $("#filtros").innerHTML = CATEGORIAS.map(function (cat) {
      const ativo = cat === categoriaAtiva;
      return (
        '<button data-categoria="' +
        esc(cat) +
        '" aria-pressed="' +
        ativo +
        '" class="' +
        classeFiltro(ativo) +
        '">' +
        esc(cat) +
        "</button>"
      );
    }).join("");
  }

  function renderizarProdutos() {
    const grade = $("#grade-produtos");
    const lista =
      categoriaAtiva === CATEGORIAS[0]
        ? PRODUTOS
        : PRODUTOS.filter((p) => p.category === categoriaAtiva);

    grade.innerHTML = lista
      .map(function (p, indice) {
        const selo = p.badge
          ? '<span class="absolute left-4 top-4 rounded-full bg-[#FFD600] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#2D0A31] shadow-lg">' +
            esc(p.badge) +
            "</span>"
          : "";

        return (
          '<article class="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[#2D0A31]/8 bg-white shadow-[0_20px_50px_-35px_rgba(45,10,49,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_70px_-30px_rgba(157,0,255,0.4)] card-in" style="animation-delay: ' +
          indice * 0.04 +
          's">' +
          '<div class="relative aspect-square overflow-hidden bg-[#FDF9F2]">' +
          '<img src="' +
          esc(p.image) +
          '" alt="' +
          esc(p.alt || p.name) +
          '" loading="lazy" decoding="async" width="1024" height="1024" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105">' +
          selo +
          "</div>" +
          '<div class="flex flex-1 flex-col p-5">' +
          '<h3 class="text-lg font-bold leading-snug tracking-tight text-[#2D0A31]">' +
          esc(p.name) +
          "</h3>" +
          '<p class="mt-1.5 flex-1 text-sm leading-relaxed text-[#2D0A31]/60">' +
          esc(p.desc) +
          "</p>" +
          '<div class="mt-5 flex items-center justify-between">' +
          '<span class="rounded-full bg-[#FF008A]/10 px-3 py-1.5 text-base font-extrabold text-[#FF008A]">' +
          moeda(p.price) +
          "</span>" +
          '<button data-add-produto="' +
          p.id +
          '" aria-label="Adicionar ' +
          esc(p.name) +
          ' ao carrinho" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2D0A31] text-white transition-all hover:bg-[#9D00FF] hover:rotate-90">' +
          icon("plus", "h-5 w-5") +
          "</button>" +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function ligarCardapio() {
    renderizarFiltros();
    renderizarProdutos();

    $("#filtros").addEventListener("click", (ev) => {
      const botao = ev.target.closest("[data-categoria]");
      if (!botao) return;
      categoriaAtiva = botao.dataset.categoria;
      renderizarFiltros();
      renderizarProdutos();
      rastrear("view_item_list", { item_list_name: categoriaAtiva, categoria: categoriaAtiva });
    });

    $("#grade-produtos").addEventListener("click", (ev) => {
      const botao = ev.target.closest("[data-add-produto]");
      if (!botao) return;
      const produto = PRODUTOS.find((p) => p.id === Number(botao.dataset.addProduto));
      if (!produto) return;

      carrinho.adicionar(produto);
      rastrear("add_to_cart", {
        currency: "BRL",
        value: produto.price,
        item_name: produto.name,
        categoria: produto.category,
      });

      /* Feedback: o "+" vira um "✓" por 1,2s, como no site original */
      const original = botao.innerHTML;
      botao.innerHTML = icon("check", "h-5 w-5");
      setTimeout(() => {
        botao.innerHTML = original;
      }, 1200);
    });
  }

  /* ======================================================================
     8. Galeria e lightbox

     Sobre o `object-cover`: as fotos da loja são verticais (1200x1600) e os
     quadros da grade têm proporções diferentes. Sem `object-cover` a imagem
     é esticada para preencher o quadro e as pessoas/objetos ficam
     deformados. Com ele, a foto é recortada mantendo a proporção original.
     ====================================================================== */

  function renderizarGaleria() {
    const grade = $("#grade-galeria");
    if (!grade) return;

    grade.innerHTML = GALERIA.map(function (foto, indice) {
      return (
        '<div class="group relative cursor-pointer overflow-hidden rounded-3xl shadow-[0_20px_50px_-35px_rgba(45,10,49,0.5)] reveal ' +
        esc(foto.span || "") +
        '" style="--reveal-delay: ' +
        ((indice % 4) * 0.06).toFixed(2) +
        's">' +
        '<button data-galeria="' +
        indice +
        '" class="block h-full w-full" aria-label="Ampliar foto: ' +
        esc(foto.alt) +
        '">' +
        '<img src="' +
        esc(foto.src) +
        '" alt="' +
        esc(foto.alt) +
        '" loading="lazy" decoding="async" width="1200" height="1600" ' +
        'class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110">' +
        '<span class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2D0A31]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>' +
        "</button>" +
        "</div>"
      );
    }).join("");

    $$(".reveal", grade).forEach(observarReveal);
  }

  function abrirLightbox(indice) {
    const foto = GALERIA[indice];
    if (!foto) return;
    const caixa = $("#lightbox");
    const img = $("#lightbox-img");
    img.src = foto.src;
    img.alt = foto.alt;
    caixa.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => caixa.classList.add("is-open"));
    $("#lightbox-close").focus();
  }

  function fecharLightbox() {
    const caixa = $("#lightbox");
    caixa.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => {
      caixa.hidden = true;
      $("#lightbox-img").src = "";
    }, 300);
  }

  function ligarGaleria() {
    renderizarGaleria();

    const grade = $("#grade-galeria");
    if (grade) {
      grade.addEventListener("click", (ev) => {
        const botao = ev.target.closest("[data-galeria]");
        if (botao) {
          const indice = Number(botao.dataset.galeria);
          abrirLightbox(indice);
          rastrear("gallery_open", { item_name: (GALERIA[indice] || {}).alt || "foto" });
        }
      });
    }

    const caixa = $("#lightbox");
    $("#lightbox-close").addEventListener("click", fecharLightbox);
    /* Clicar no fundo fecha; clicar na foto, não. */
    caixa.addEventListener("click", (ev) => {
      if (!ev.target.closest("#lightbox-img")) fecharLightbox();
    });
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && !caixa.hidden) fecharLightbox();
    });
  }

  /* ======================================================================
     9. Avaliações
     ====================================================================== */

  function renderizarAvaliacoes() {
    const grade = $("#grade-avaliacoes");
    if (!grade) return;

    grade.innerHTML = AVALIACOES.map(function (av, indice) {
      const estrelas = Array(5).fill(icon("star", "h-4 w-4 fill-current")).join("");
      return (
        '<div class="reveal" style="--reveal-delay: ' +
        (indice * 0.08).toFixed(2) +
        's">' +
        '<figure class="flex h-full flex-col rounded-[1.75rem] p-7 transition-transform duration-500 hover:-translate-y-2 ' +
        (av.featured
          ? "bg-[#FF008A] text-white shadow-[0_30px_60px_-30px_rgba(255,0,138,0.6)]"
          : "border border-[#2D0A31]/8 bg-white shadow-[0_20px_50px_-40px_rgba(45,10,49,0.5)]") +
        '">' +
        icon("quote", "h-7 w-7 " + (av.featured ? "text-[#FFD600]" : "text-[#FF008A]/30")) +
        '<div class="mt-4 flex text-[#FFD600]">' +
        estrelas +
        "</div>" +
        '<blockquote class="mt-4 flex-1 text-[15px] leading-relaxed ' +
        (av.featured ? "text-white/95" : "text-[#2D0A31]/70") +
        '">“' +
        esc(av.text) +
        '”</blockquote>' +
        '<figcaption class="mt-6">' +
        '<p class="text-sm font-extrabold ' +
        (av.featured ? "text-white" : "text-[#2D0A31]") +
        '">' +
        esc(av.name) +
        "</p>" +
        '<p class="text-[11px] font-bold uppercase tracking-[0.18em] ' +
        (av.featured ? "text-[#FFD600]" : "text-[#9D00FF]") +
        '">' +
        esc(av.role) +
        "</p>" +
        "</figcaption>" +
        "</figure>" +
        "</div>"
      );
    }).join("");

    $$(".reveal", grade).forEach(observarReveal);
  }

  /* ======================================================================
     10. Monte seu Mix
     ====================================================================== */

  const mix = {
    base: MIX_PADRAO.base,
    sabor: MIX_PADRAO.sabor,
    tamanho: MIX_PADRAO.tamanho,
    acompanhamentos: MIX_PADRAO.acompanhamentos.slice(),
    calda: MIX_PADRAO.calda,
    quantidade: MIX_PADRAO.quantidade,
  };

  function precoDe(lista, rotulo) {
    const achado = lista.find((o) => o.label === rotulo);
    return achado ? achado.price : 0;
  }

  /* Preço de uma unidade do Mix montado */
  function precoUnitarioDoMix() {
    const base = precoDe(TAMANHOS, mix.tamanho);
    const sabor = precoDe(SABORES, mix.sabor);
    const extras = ACOMPANHAMENTOS.filter((a) => mix.acompanhamentos.includes(a.label)).reduce(
      (soma, a) => soma + a.price,
      0
    );
    const calda = precoDe(CALDAS, mix.calda);
    return base + sabor + extras + calda;
  }

  const totalDoMix = () => precoUnitarioDoMix() * mix.quantidade;

  function resumoDoMix() {
    return [
      mix.base + " de " + mix.sabor,
      mix.tamanho,
      mix.acompanhamentos.length ? "+ " + mix.acompanhamentos.join(", ") : null,
      mix.calda !== "Nenhuma" ? "calda de " + mix.calda.toLowerCase() : null,
    ]
      .filter(Boolean)
      .join(" • ");
  }

  function mensagemDoMix() {
    return (
      "Olá! Quero montar meu Mix 🍦\n\n" +
      "Base: " +
      mix.base +
      "\nSabor: " +
      mix.sabor +
      "\nTamanho: " +
      mix.tamanho +
      "\nAcompanhamentos: " +
      (mix.acompanhamentos.length ? mix.acompanhamentos.join(", ") : "Nenhum") +
      "\nCalda: " +
      mix.calda +
      "\nQuantidade: " +
      mix.quantidade +
      "\nTotal estimado: " +
      moeda(totalDoMix())
    );
  }

  function renderizarMix() {
    /* Passo 1 — bases */
    $("#mix-bases").innerHTML = BASES.map(function (b) {
      const ativo = b.label === mix.base;
      return (
        '<button data-mix-base="' +
        esc(b.label) +
        '" class="flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ' +
        (ativo
          ? "border-[#FF008A] bg-[#FF008A]/15 text-white"
          : "border-white/15 text-white/70 hover:border-white/35") +
        '">' +
        icon(b.icon, "h-6 w-6" + (ativo ? " text-[#FFD600]" : "")) +
        '<span class="text-sm font-bold">' +
        esc(b.label) +
        "</span>" +
        "</button>"
      );
    }).join("");

    /* Passo 2 — sabores */
    $("#mix-sabores").innerHTML = SABORES.map(function (s) {
      const ativo = s.label === mix.sabor;
      return (
        '<button data-mix-sabor="' +
        esc(s.label) +
        '" class="flex items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-left transition-all ' +
        (ativo ? "border-[#FF008A] bg-[#FF008A]/15" : "border-white/15 hover:border-white/35") +
        '">' +
        "<span>" +
        '<span class="block text-sm font-bold ' +
        (ativo ? "text-white" : "text-white/80") +
        '">' +
        esc(s.label) +
        "</span>" +
        '<span class="text-[11px] text-white/55">' +
        (s.price > 0 ? "+ " + moeda(s.price) : "incluso") +
        "</span>" +
        "</span>" +
        (ativo ? icon("check", "h-4 w-4 shrink-0 text-[#FFD600]") : "") +
        "</button>"
      );
    }).join("");

    /* Passo 3 — tamanhos */
    $("#mix-tamanhos").innerHTML = TAMANHOS.map(function (t) {
      const ativo = t.label === mix.tamanho;
      return (
        '<button data-mix-tamanho="' +
        esc(t.label) +
        '" class="rounded-2xl border p-4 text-left transition-all ' +
        (ativo
          ? "border-[#FFD600] bg-[#FFD600]/15 text-white"
          : "border-white/15 text-white/70 hover:border-white/35") +
        '">' +
        '<p class="text-base font-extrabold">' +
        esc(t.label) +
        "</p>" +
        '<p class="mt-0.5 text-xs text-white/60">' +
        moeda(t.price) +
        "</p>" +
        "</button>"
      );
    }).join("");

    /* Passo 4 — acompanhamentos */
    $("#mix-acompanhamentos").innerHTML = ACOMPANHAMENTOS.map(function (a) {
      const ativo = mix.acompanhamentos.includes(a.label);
      return (
        '<button data-mix-acompanhamento="' +
        esc(a.label) +
        '" class="flex items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-left transition-all ' +
        (ativo ? "border-[#FFD600] bg-[#FFD600]/15" : "border-white/15 hover:border-white/35") +
        '">' +
        "<span>" +
        '<span class="block text-sm font-bold ' +
        (ativo ? "text-[#FFD600]" : "text-white/80") +
        '">' +
        esc(a.label) +
        "</span>" +
        '<span class="text-[11px] text-white/55">+ ' +
        moeda(a.price) +
        "</span>" +
        "</span>" +
        (ativo
          ? icon("check", "h-4 w-4 shrink-0 text-[#FFD600]")
          : icon("plus", "h-4 w-4 shrink-0 text-white/35")) +
        "</button>"
      );
    }).join("");

    /* Passo 5 — caldas */
    $("#mix-caldas").innerHTML = CALDAS.map(function (c) {
      const ativo = c.label === mix.calda;
      return (
        '<button data-mix-calda="' +
        esc(c.label) +
        '" class="rounded-2xl border px-4 py-3 text-left transition-all ' +
        (ativo
          ? "border-[#FF008A] bg-[#FF008A]/15 text-white"
          : "border-white/15 text-white/70 hover:border-white/35") +
        '">' +
        '<span class="block text-sm font-bold">' +
        esc(c.label) +
        "</span>" +
        '<span class="text-[11px] text-white/55">' +
        (c.price > 0 ? "+ " + moeda(c.price) : "incluso") +
        "</span>" +
        "</button>"
      );
    }).join("");

    /* Resumo lateral */
    const linhas = [
      ["Base", mix.base],
      ["Sabor", mix.sabor],
      ["Tamanho", mix.tamanho],
      ["Acompanhamentos", mix.acompanhamentos.length ? mix.acompanhamentos.join(", ") : "—"],
      ["Calda", mix.calda],
    ];

    $("#mix-resumo").innerHTML = linhas
      .map(function (l) {
        return (
          '<div class="flex items-start justify-between gap-4 border-b border-white/8 pb-3 last:border-0 last:pb-0">' +
          '<span class="text-[11px] font-semibold uppercase tracking-wider text-white/45">' +
          esc(l[0]) +
          "</span>" +
          '<span class="max-w-[60%] text-right text-sm font-bold text-white">' +
          esc(l[1]) +
          "</span>" +
          "</div>"
        );
      })
      .join("");

    /* Quantidade */
    $("#mix-qtd").textContent = mix.quantidade;
    $("#mix-qtd-menos").disabled = mix.quantidade <= 1;
    $("#mix-qtd-menos").classList.toggle("opacity-40", mix.quantidade <= 1);

    /* Total (com o pulinho a cada mudança de valor) */
    const elTotal = $("#mix-total");
    const novoTotal = moeda(totalDoMix());
    if (elTotal.textContent !== novoTotal) {
      elTotal.textContent = novoTotal;
      elTotal.classList.remove("total-pop");
      void elTotal.offsetWidth;
      elTotal.classList.add("total-pop");
    }

    const n = mix.acompanhamentos.length;
    $("#mix-extras").textContent = n + " " + (n === 1 ? "extra" : "extras");
    $("#mix-whatsapp").href = linkWhatsApp(mensagemDoMix());
  }

  function ligarMix() {
    renderizarMix();

    $("#montar").addEventListener("click", (ev) => {
      const base = ev.target.closest("[data-mix-base]");
      if (base) {
        mix.base = base.dataset.mixBase;
        return renderizarMix();
      }
      const sabor = ev.target.closest("[data-mix-sabor]");
      if (sabor) {
        mix.sabor = sabor.dataset.mixSabor;
        return renderizarMix();
      }
      const tamanho = ev.target.closest("[data-mix-tamanho]");
      if (tamanho) {
        mix.tamanho = tamanho.dataset.mixTamanho;
        return renderizarMix();
      }
      const acomp = ev.target.closest("[data-mix-acompanhamento]");
      if (acomp) {
        const rotulo = acomp.dataset.mixAcompanhamento;
        const i = mix.acompanhamentos.indexOf(rotulo);
        if (i >= 0) mix.acompanhamentos.splice(i, 1);
        else mix.acompanhamentos.push(rotulo);
        return renderizarMix();
      }
      const calda = ev.target.closest("[data-mix-calda]");
      if (calda) {
        mix.calda = calda.dataset.mixCalda;
        return renderizarMix();
      }
    });

    $("#mix-qtd-menos").addEventListener("click", () => {
      mix.quantidade = Math.max(1, mix.quantidade - 1);
      renderizarMix();
    });

    $("#mix-qtd-mais").addEventListener("click", () => {
      mix.quantidade = Math.min(99, mix.quantidade + 1);
      renderizarMix();
    });

    $("#mix-limpar").addEventListener("click", () => {
      mix.base = MIX_PADRAO.base;
      mix.sabor = MIX_PADRAO.sabor;
      mix.tamanho = MIX_PADRAO.tamanho;
      mix.acompanhamentos = MIX_PADRAO.acompanhamentos.slice();
      mix.calda = MIX_PADRAO.calda;
      mix.quantidade = MIX_PADRAO.quantidade;
      renderizarMix();
    });

    const botaoAdd = $("#mix-add");
    const conteudoOriginal = botaoAdd.innerHTML;
    const classeOriginal = botaoAdd.className;

    botaoAdd.addEventListener("click", () => {
      carrinho.adicionar({
        id: "mix-" + Date.now(),
        name: "Mix personalizado",
        price: precoUnitarioDoMix(),
        image: null,
        note: resumoDoMix(),
        qty: mix.quantidade,
      });
      rastrear("add_to_cart", {
        currency: "BRL",
        value: totalDoMix(),
        item_name: "Mix personalizado",
        categoria: "Monte seu Mix",
        quantity: mix.quantidade,
      });

      botaoAdd.className = classeOriginal.replace(
        "bg-[#FF008A] shadow-[#FF008A]/30",
        "bg-[#25D366] shadow-[#25D366]/30"
      );
      botaoAdd.innerHTML = icon("check", "h-5 w-5") + " Adicionado!";

      setTimeout(() => {
        botaoAdd.className = classeOriginal;
        botaoAdd.innerHTML = conteudoOriginal;
      }, 1400);
    });
  }

  /* ======================================================================
     11. Links genéricos de WhatsApp
     ====================================================================== */

  function ligarLinksWhatsApp() {
    const url = linkWhatsApp("Olá! Quero fazer um pedido na " + LOJA.nome + ".");
    $$("[data-whatsapp-pedido]").forEach((a) => {
      a.href = url;
      a.addEventListener("click", () => {
        rastrear("whatsapp_click", { origem: a.dataset.origem || "site" });
      });
    });

    /* "Pedir pelo WhatsApp" dentro do Monte seu Mix */
    const mixWhats = $("#mix-whatsapp");
    if (mixWhats) {
      mixWhats.addEventListener("click", () => {
        rastrear("whatsapp_click", { origem: "montar_mix" });
      });
    }
  }

  /* Cliques em telefone, Instagram e Google Maps */
  function ligarContatos() {
    const eventos = {
      tel: "call_click",
      instagram: "instagram_click",
      googleMaps: "maps_click",
    };
    $$("[data-loja-href]").forEach((a) => {
      const nome = eventos[a.dataset.lojaHref];
      if (nome) a.addEventListener("click", () => rastrear(nome, {}));
    });
  }

  /* ======================================================================
     12. Inicialização
     ====================================================================== */

  function iniciar() {
    aplicarDadosDaLoja();
    montarEstrelas();
    montarMarquee();
    ligarCabecalho();
    ligarMenuMobile();
    ligarRolagemSuave();
    ligarReveal();
    ligarLinksWhatsApp();
    ligarContatos();
    ligarCardapio();
    renderizarAvaliacoes();
    ligarGaleria();
    ligarMix();

    carrinho.carregar();
    ligarCarrinho();
    renderizarCarrinho();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
