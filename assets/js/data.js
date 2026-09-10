/* ==========================================================================
   Milk Shake Mix — Dados do site
   Edite este arquivo para mudar produtos, preços, opções, fotos e contatos.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Dados da loja — usados no rodapé, na seção de localização e nos links.
   -------------------------------------------------------------------------- */
const LOJA = {
  nome: "Milk Shake Mix",
  endereco: "Del Lago Q 15 Lote 03 - Itapoã, Brasília - DF, 71581-115",
  telefone: "(61) 99116-9687",
  telefoneIntl: "+5561991169687",
  /* Só números, com DDI + DDD — usado nos links do WhatsApp */
  whatsapp: "5561991169687",
  horario: "Ter a Dom, 10h às 18h",
  horarioObs: "(segunda fechado)",
  nota: 4.4,
  totalAvaliacoes: 148,
  instagram: "https://www.instagram.com/milkshakemixitapoa_df",
  instagramUser: "@milkshakemixitapoa_df",
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=Milk+Shake+Mix+Itapo%C3%A3+Bras%C3%ADlia",
  pagamentos: ["Pix", "Dinheiro", "Cartão de Crédito", "Cartão de Débito"],
  /* ID do Google Analytics (formato G-XXXXXXXXXX). Deixe vazio para desligar
     a coleta de estatísticas. Configure pelo painel: admin/index.html */
  googleAnalyticsId: "",
};

/* Categorias dos filtros do cardápio (a primeira é a padrão) */
const CATEGORIAS = ["Todos", "Milkshakes", "Açaí", "Salgados", "Sorvetes", "Kids"];

/* --------------------------------------------------------------------------
   Cardápio
   -------------------------------------------------------------------------- */
const PRODUTOS = [
  {
    id: 1,
    name: "Milkshake Tradicional Ninho",
    desc: "Sabor Ninho, e mais de 30 opções de sabores tradicionais. De 300ml (R$13) a Mega (R$20).",
    price: 13,
    category: "Milkshakes",
    badge: "QUERIDINHO",
    image: "assets/img/p01-milkshake-ninho.jpg",
    alt: "Milkshake tradicional de Ninho",
  },
  {
    id: 2,
    name: "Milkshake Tradicional Chocolate",
    desc: "Chocolate cremoso, receita tradicional da casa. De 300ml (R$13) a Mega (R$20).",
    price: 13,
    category: "Milkshakes",
    badge: "BEST SELLER",
    image: "assets/img/p02-milkshake-chocolate.jpg",
    alt: "Milkshake tradicional de chocolate",
  },
  {
    id: 3,
    name: "Milkshake Tradicional Morango",
    desc: "Morango cremoso, receita tradicional da casa. De 300ml (R$13) a Mega (R$20).",
    price: 13,
    category: "Milkshakes",
    image: "assets/img/p03-milkshake-morango.jpg",
    alt: "Milkshake tradicional de morango",
  },
  {
    id: 4,
    name: "Milkshake Especial Proibido c/ Nutella",
    desc: "Cremoso, com Nutella de verdade. Sabor especial da casa. De 300ml (R$14) a Mega (R$22).",
    price: 14,
    category: "Milkshakes",
    badge: "ESPECIAL",
    image: "assets/img/p04-proibido-nutella.png",
    alt: "Milkshake especial Proibido com Nutella",
  },
  {
    id: 5,
    name: "Milkshake Especial Leite Ninho",
    desc: "Sabor especial com leite Ninho generoso. De 300ml (R$14) a Mega (R$22).",
    price: 14,
    category: "Milkshakes",
    image: "assets/img/p05-especial-ninho.jpg",
    alt: "Milkshake especial de Leite Ninho",
  },
  {
    id: 6,
    name: "Açaí Tradicional",
    desc: "Açaí cremoso com complementos: leite condensado, paçoca, banana ou granola. De 300ml (R$13) a 1 Litro (R$35).",
    price: 13,
    category: "Açaí",
    image: "assets/img/p06-acai-tradicional.jpg",
    alt: "Copo de açaí tradicional com complementos",
  },
  {
    id: 7,
    name: "Açaí com Cupuaçu",
    desc: "Açaí cremoso misturado com cupuaçu puro. De 300ml (R$16) a 1 Litro (R$35).",
    price: 16,
    category: "Açaí",
    image: "assets/img/p07-acai-cupuacu.jpg",
    alt: "Açaí com cupuaçu",
  },
  {
    id: 8,
    name: "Pastel",
    desc: "Queijo, presunto e queijo, calabresa, carne com azeitona, frango com catupiri, italiano ou banana com canela.",
    price: 8,
    category: "Salgados",
    image: "assets/img/p08-pastel.jpg",
    alt: "Pastel frito recheado",
  },
  {
    id: 9,
    name: "Mini Coxinhas",
    desc: "10 unidades (R$9,00) ou 20 unidades (R$18,00).",
    price: 9,
    category: "Salgados",
    image: "assets/img/p09-mini-coxinhas.jpg",
    alt: "Mini coxinhas fritas",
  },
  {
    id: 10,
    name: "Batata Frita",
    desc: "Média (R$15), Grande (R$20) ou Especial (R$25).",
    price: 15,
    category: "Salgados",
    image: "assets/img/p10-batata-frita.jpg",
    alt: "Porção de batata frita",
  },
  {
    id: 11,
    name: "Sundae Kids",
    desc: "Fini, Merengue, Confete com Algodão Doce ou Brigadeiro.",
    price: 16.9,
    category: "Kids",
    badge: "KIDS",
    image: "assets/img/p11-sundae-kids.png",
    alt: "Sundae infantil colorido",
  },
  {
    id: 12,
    name: "Casquinha",
    desc: "Sorvete soft na casquinha crocante.",
    price: 4,
    category: "Sorvetes",
    image: "assets/img/p12-casquinha.jpg",
    alt: "Casquinha com sorvete soft",
  },
  {
    id: 13,
    name: "Cascão",
    desc: "Casquete generoso com cobertura e granulado.",
    price: 6,
    category: "Sorvetes",
    image: "assets/img/p13-cascao.png",
    alt: "Cascão com cobertura e granulado",
  },
  {
    id: 14,
    name: "Sundae 200ml",
    desc: "15 sabores: Farofa, Sensação, Brigadeiro, Negresco, Crocante, Maracujá, Festa, Caramelo, Chocolate, Morango, Choco Boll, Ovomaltine, Confetti, Framboesa e Sundae Boll.",
    price: 8,
    category: "Sorvetes",
    image: "assets/img/p14-sundae-200ml.png",
    alt: "Sundae 200ml com cobertura",
  },
  {
    id: 15,
    name: "Big Sundae 250ml",
    desc: "Sundae generoso de 250ml com cobertura especial.",
    price: 13,
    category: "Sorvetes",
    badge: "GRANDE",
    image: "assets/img/p15-big-sundae.png",
    alt: "Big Sundae 250ml com cobertura especial",
  },
  {
    id: 16,
    name: "Mix Twist Sonho de Valsa",
    desc: "Milkshake com Sonho de Valsa, chantilly e calda de chocolate. Novidade da casa.",
    price: 16.9,
    category: "Milkshakes",
    badge: "NOVO",
    image: "assets/img/p16-twist-sonho-de-valsa.png",
    alt: "Mix Twist de Sonho de Valsa",
  },
  {
    id: 17,
    name: "Mix Twist Ouro Branco",
    desc: "Milkshake com Ouro Branco, chantilly e calda de caramelo. Novidade da casa.",
    price: 16.9,
    category: "Milkshakes",
    badge: "NOVO",
    image: "assets/img/p17-twist-ouro-branco.png",
    alt: "Mix Twist de Ouro Branco",
  },
  {
    id: 18,
    name: "Mix Twist Laka Oreo",
    desc: "Milkshake com Laka e Oreo, chantilly e calda. Novidade da casa.",
    price: 16.9,
    category: "Milkshakes",
    badge: "NOVO",
    image: "assets/img/p18-twist-laka-oreo.png",
    alt: "Mix Twist de Laka com Oreo",
  },
  {
    id: 19,
    name: "Mix Ovomaltine",
    desc: "Milkshake cremoso com Ovomaltine crocante por cima.",
    price: 16.9,
    category: "Milkshakes",
    image: "assets/img/p19-mix-ovomaltine.png",
    alt: "Mix de Ovomaltine",
  },
  {
    id: 20,
    name: "Mix Kit Kat",
    desc: "Milkshake cremoso com Kit Kat crocante por cima.",
    price: 16.9,
    category: "Milkshakes",
    image: "assets/img/p20-mix-kit-kat.png",
    alt: "Mix de Kit Kat",
  },
  {
    id: 21,
    name: "Mix Suflair",
    desc: "Milkshake cremoso com Suflair crocante por cima.",
    price: 16.9,
    category: "Milkshakes",
    image: "assets/img/p21-mix-suflair.png",
    alt: "Mix de Suflair",
  },
  {
    id: 22,
    name: "Mix Merengue Kids",
    desc: "Sundae infantil com Merengue e chantilly. Feito pra criançada.",
    price: 16.99,
    category: "Kids",
    badge: "KIDS",
    image: "assets/img/p11-sundae-kids.png",
    alt: "Sundae kids com Merengue",
  },
  {
    id: 23,
    name: "Mix Fini Kids",
    desc: "Sundae infantil com Fini e chantilly. Feito pra criançada.",
    price: 16.99,
    category: "Kids",
    badge: "KIDS",
    image: "assets/img/p23-mix-fini-kids.png",
    alt: "Sundae kids com Fini",
  },
];

/* --------------------------------------------------------------------------
   Galeria — "Conheça nossa casa"
   `span` recebe classes de grid para a foto ocupar duas linhas no desktop.
   -------------------------------------------------------------------------- */
const GALERIA = [
  {
    src: "assets/img/galeria/g1-interior.jpeg",
    alt: "Interior da loja Milk Shake Mix",
    span: "lg:row-span-2",
  },
  { src: "assets/img/galeria/g2-vitrine.jpeg", alt: "Vitrine de sorvetes da Milk Shake Mix", span: "" },
  { src: "assets/img/galeria/g3-balcao.jpeg", alt: "Balcão de atendimento da Milk Shake Mix", span: "" },
  {
    src: "assets/img/galeria/g4-decoracao.jpeg",
    alt: "Decoração e ambiente da loja",
    span: "lg:row-span-2",
  },
  { src: "assets/img/galeria/g5-produtos.jpeg", alt: "Exposição de produtos da Milk Shake Mix", span: "" },
  { src: "assets/img/galeria/g6-cardapio.jpeg", alt: "Detalhe do cardápio da loja", span: "" },
  { src: "assets/img/galeria/g7-fachada.jpeg", alt: "Fachada da loja Milk Shake Mix", span: "" },
  { src: "assets/img/galeria/g8-ambiente.jpeg", alt: "Ambiente acolhedor da Milk Shake Mix", span: "" },
];

/* --------------------------------------------------------------------------
   Monte seu Mix
   -------------------------------------------------------------------------- */

/* Passo 1 — bases (o ícone é o nome de um ícone em ICONS, no app.js) */
const BASES = [
  { label: "Milkshake", icon: "cup-soda" },
  { label: "Açaí", icon: "glass-water" },
  { label: "Sorvete", icon: "ice-cream-cone" },
];

/* Passo 2 — sabores do sorvete */
const SABORES = [
  { label: "Creme", price: 0 },
  { label: "Ninho", price: 0 },
  { label: "Chocolate", price: 0 },
  { label: "Morango", price: 0 },
  { label: "Açaí", price: 0 },
  { label: "Manga", price: 0 },
  { label: "Chiclete", price: 0 },
  { label: "Uva", price: 0 },
  { label: "Cupuaçu", price: 0 },
  { label: "Ovomaltine", price: 2 },
  { label: "Nutella", price: 4 },
  { label: "Paçoca", price: 2.5 },
];

/* Passo 3 — tamanhos (define o preço base) */
const TAMANHOS = [
  { label: "300ml", price: 16 },
  { label: "500ml", price: 20 },
  { label: "700ml", price: 25 },
];

/* Passo 4 — acompanhamentos (seleção múltipla) */
const ACOMPANHAMENTOS = [
  { label: "Granulado", price: 1.5 },
  { label: "Oreo", price: 3 },
  { label: "Morango", price: 3.5 },
  { label: "Ovomaltine", price: 3 },
  { label: "Leite condensado", price: 2 },
  { label: "Nutella", price: 5 },
  { label: "Banana", price: 3 },
  { label: "Chantilly", price: 2 },
  { label: "Granola", price: 2 },
  { label: "Paçoca", price: 2.5 },
  { label: "Bis", price: 3 },
  { label: "Leite em pó", price: 1.5 },
];

/* Passo 5 — caldas */
const CALDAS = [
  { label: "Nenhuma", price: 0 },
  { label: "Chocolate", price: 1.5 },
  { label: "Morango", price: 1.5 },
  { label: "Caramelo", price: 2 },
  { label: "Leite condensado", price: 2 },
  { label: "Dutch", price: 2.5 },
];

/* Seleção inicial do montador */
const MIX_PADRAO = {
  base: "Milkshake",
  sabor: "Ninho",
  tamanho: "500ml",
  acompanhamentos: [],
  calda: "Nenhuma",
  quantidade: 1,
};

/* --------------------------------------------------------------------------
   Sabores da faixa deslizante do topo
   -------------------------------------------------------------------------- */
const SABORES_FAIXA = [
  "Ninho",
  "Chocolate",
  "Morango",
  "Açaí",
  "Ovomaltine",
  "Nutella",
  "Leite Condensado",
  "Manga",
  "Banana",
  "Chantilly",
  "Granulado",
  "Oreo",
];

/* --------------------------------------------------------------------------
   Avaliações (vindas do Google)
   -------------------------------------------------------------------------- */
const AVALIACOES = [
  {
    text: "Os salgados e pastéis também são muito bons, com certeza vou voltar mais vezes 😊",
    name: "Cliente Google",
    role: "Avaliação no Google",
    featured: false,
  },
  {
    text: "Loja bem organizada, funcionários atenciosos, sorvetes de qualidade!",
    name: "Cliente Google",
    role: "Avaliação no Google",
    featured: true,
  },
  {
    text: "Sorveteria bem arrumada, com brinquedos para crianças e um açaí maravilhoso.",
    name: "Cliente Google",
    role: "Avaliação no Google",
    featured: false,
  },
];

/* ==========================================================================
   NÃO EDITE DAQUI PARA BAIXO.
   Reúne tudo acima em um único lugar para o site e o painel administrativo
   (admin/index.html) lerem os mesmos dados.
   ========================================================================== */
window.DADOS = {
  LOJA: LOJA,
  CATEGORIAS: CATEGORIAS,
  PRODUTOS: PRODUTOS,
  GALERIA: GALERIA,
  BASES: BASES,
  SABORES: SABORES,
  TAMANHOS: TAMANHOS,
  ACOMPANHAMENTOS: ACOMPANHAMENTOS,
  CALDAS: CALDAS,
  MIX_PADRAO: MIX_PADRAO,
  SABORES_FAIXA: SABORES_FAIXA,
  AVALIACOES: AVALIACOES,
};
