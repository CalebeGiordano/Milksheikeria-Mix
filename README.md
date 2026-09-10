# Milk Shake Mix — versão local

Reprodução fiel do site publicado em `https://get-teste.base44.app`, convertida de
React + Vite para **HTML, CSS e JavaScript puro**, para facilitar as alterações.

O site original é uma SPA em React. Aqui a marcação foi extraída do DOM já renderizado
e as interações (que usavam React + framer-motion) foram reescritas em JS e CSS.

## Como abrir

Basta abrir `index.html` no navegador (duplo clique).

No VS Code, a extensão **Live Server** é mais confortável: clique com o botão direito em
`index.html` → *Open with Live Server*.

## Estrutura

```
index.html              Toda a marcação das seções
.nojekyll               Desliga o Jekyll no GitHub Pages
assets/
  css/
    tailwind.css        Build do Tailwind vindo do site original — NÃO editar
    site.css            Animações e ajustes próprios — editar à vontade
  js/
    data.js             Loja, produtos, galeria, avaliações e opções do montador
    admin-bridge.js     Aplica no site o que foi editado no painel (pré-visualização)
    analytics.js        Google Analytics + contador local
    app.js              Comportamento (filtros, carrinho, montador, galeria, menu…)
  img/                  Logo e fotos dos produtos
  img/galeria/          Fotos da loja usadas na seção "Conheça nossa casa"
  video/                Vídeo do hero
```

A ordem dos scripts no `index.html` importa:
`data.js` → `admin-bridge.js` → `analytics.js` → `app.js`.

## O que editar para cada mudança

A cliente faz tudo isso pelo painel. Editando à mão:

| Quero mudar…                                   | Arquivo                              |
| ---------------------------------------------- | ------------------------------------ |
| Endereço, telefone, horário, nota, Instagram   | `assets/js/data.js` → `LOJA`         |
| Produtos, preços, fotos, categorias            | `assets/js/data.js` → `PRODUTOS`     |
| Fotos da galeria                               | `assets/js/data.js` → `GALERIA`      |
| Avaliações                                     | `assets/js/data.js` → `AVALIACOES`   |
| Opções do "Monte seu Mix" e seus preços        | `assets/js/data.js`                  |
| Sabores da faixa deslizante                    | `assets/js/data.js` → `SABORES_FAIXA`|
| Textos das seções e do rodapé                  | `index.html`                         |
| Números da seção "A marca"                     | `index.html`                         |
| Animações                                      | `assets/css/site.css`                |
| Lógica de carrinho, filtros, montador, galeria | `assets/js/app.js`                   |

### Sobre o `LOJA` e os atributos `data-loja`

Endereço, telefone e horário aparecem escritos no `index.html` (para o arquivo continuar
legível), mas os elementos têm um atributo `data-loja="endereco"`, `data-loja="telefone"`
e assim por diante. Ao carregar a página, o `app.js` sobrescreve esses textos com o que
está em `LOJA`, no `data.js`. Então **o `data.js` é a fonte da verdade**: mudou lá, mudou
no site inteiro de uma vez.

O mesmo vale para links: `data-loja-href="googleMaps"`, `data-loja-href="instagram"` e
`data-loja-href="tel"`.

## Painel administrativo

Fica em um **repositório separado**: `Milkshake Mix - Painel`.

Foi separado de propósito: este repositório é público e vai para o GitHub Pages,
então o painel não pode morar aqui dentro — o endereço ficaria exposto junto
com o site.

O painel lê o cardápio direto de `<site>/assets/js/data.js`, ou seja, sempre a
versão que está no ar. Para publicar uma alteração:

1. A cliente edita no painel e clica em **Baixar data.js**.
2. Você substitui `assets/js/data.js` deste repositório pelo arquivo recebido.
3. Se ela enviou fotos novas, coloque-as em `assets/img/`
   (galeria em `assets/img/galeria/`).
4. Commit e push — o GitHub Pages atualiza em alguns minutos.

O arquivo `assets/js/admin-bridge.js` continua aqui: é ele que aplica a
pré-visualização no site quando o painel está no mesmo domínio.

## Publicação (GitHub Pages)

- Origem: branch `main`, pasta raiz.
- `.nojekyll` na raiz desliga o processamento Jekyll, que ignoraria arquivos
  e pastas começando com `_`.
- `og:image` e o `url` do JSON-LD usam endereço absoluto — prévias de link e
  o Google não funcionam com caminho relativo. Se o domínio mudar, atualize
  os dois no `index.html`.

## Estatísticas (Google Analytics)

O `analytics.js` carrega o GA4 usando `LOJA.googleAnalyticsId` (definido em `data.js`,
editável pelo painel). Vazio = nada é enviado.

Além do `page_view` automático, o site registra:

| Evento | Quando dispara |
| --- | --- |
| `view_item_list` | Clique numa aba do cardápio |
| `add_to_cart` | Produto adicionado (com nome, categoria e valor) |
| `view_cart` | Carrinho aberto |
| `begin_checkout` | Clique em finalizar o pedido |
| `whatsapp_click` | Clique no WhatsApp, com `origem`: `botao_flutuante`, `rodape`, `cta_final`, `carrinho` ou `montar_mix` |
| `gallery_open` | Foto da galeria ampliada |
| `call_click` / `maps_click` / `instagram_click` | Cliques de contato |

O painel **não** exibe os números do Analytics: ler a API do GA exige autenticação por
servidor, o que este site não tem. A aba Estatísticas traz o passo a passo da configuração,
o link direto para os relatórios e um contador local (só deste navegador) para conferir se
o rastreamento está funcionando.

## Correção aplicada na galeria

No site original as fotos da galeria estavam **esticadas**. A causa: as imagens usam
`h-full w-full` para preencher o quadro, mas sem `object-fit`. Como as fotos são
verticais (1200×1600) e os quadros da grade são horizontais, o navegador deformava a
imagem para caber.

Aqui as fotos usam `object-cover object-center`: a imagem mantém a proporção original e
é recortada nas bordas em vez de ser espremida. O corte fica em `assets/js/app.js`, na
função `renderizarGaleria()`.

## Melhorias adicionadas em relação ao original

- **Galeria sem distorção** (acima).
- **Imagens mais leves**: quatro fotos de produto vinham como PNG de até 1,8 MB para
  serem exibidas em ~300 px. Foram reconvertidas para JPEG na mesma resolução, e o logo
  (1,2 MB, 1363 px) foi reduzido para 320 px. No total, cerca de **6,6 MB a menos**.
- **`loading="lazy"`, `decoding="async"` e `width`/`height`** em todas as imagens: o
  navegador já reserva o espaço certo, então a página não "pula" enquanto carrega.
- **Dados estruturados (JSON-LD)** no `<head>`, do tipo `IceCreamShop`, com endereço,
  telefone, horário e nota. Ajuda o Google a exibir essas informações na busca e no Maps.
- **Acessibilidade**: link "Pular para o cardápio" para navegação por teclado,
  `aria-expanded` no botão do menu, e o lightbox fecha com `Esc` e devolve o foco.
- **Respeito a `prefers-reduced-motion`**: quem configurou o sistema para menos animação
  vê a página sem os movimentos.

## Sobre o `tailwind.css`

É o CSS já compilado do site original, então ele contém **apenas** as classes usadas
naquele site. Trocar textos, imagens e preços funciona sem problema, mas se você
adicionar uma classe Tailwind nova (por exemplo `mt-24` em um lugar que não usava),
ela pode não existir no arquivo e não terá efeito.

Nesse caso há duas saídas:

1. Escrever o estilo novo em `assets/css/site.css` (mais simples); ou
2. Trocar o `tailwind.css` pelo CDN, colocando no `<head>` do `index.html`:
   `<script src="https://cdn.tailwindcss.com"></script>`
   Isso libera todas as classes, ao custo de compilar o CSS no navegador.

## Detalhes que valem saber

- **Carrinho**: fica salvo no `localStorage` do navegador, sob a chave `mix_cart_v1`
  (a mesma do site original). Finalizar o pedido abre o WhatsApp com a lista pronta.
- **Ícones**: são SVGs da biblioteca Lucide, escritos direto no HTML e no `app.js`
  (mapa `ICONS`). Não há dependência externa.
- **Fontes**: o site usa a fonte padrão do sistema, igual ao original.
- **Nenhuma dependência externa**: imagens, vídeo, CSS e JS estão todos na pasta.
  O site abre sem internet.
- **`og:image`**: está como caminho relativo. Ao publicar em um domínio, troque por
  uma URL absoluta para as prévias de link funcionarem. O mesmo vale para o campo
  `image` do JSON-LD.
