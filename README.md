# Vitrine Mobile

Trabalho de Mobile Development da UniFECAF: catálogo de produtos com React Native e Expo, usando a API DummyJSON.

## Funcionalidades
- Login demonstrativo com validação de campos vazios.
- E-mail e estado de login guardados temporariamente no Redux. A senha não é armazenada.
- Abas Masculino e Feminino com produtos das categorias solicitadas.
- Cards em duas colunas com imagem, título, descrição resumida, preço e desconto.
- Detalhes pela rota de ID, com imagem, descrição, preço e desconto.
- Carregamento, mensagem de erro, nova tentativa e lista vazia.
- Logout que limpa a sessão e retorna ao login.

## Tecnologias
React Native, Expo SDK 57, TypeScript, Axios, Redux Toolkit, React Redux e Expo Router.
As demais dependências de navegação e web foram instaladas pelo Expo.

## Instalação
Use Node.js 22.13 ou superior e npm. Dentro da pasta do projeto:

```bash
npm install
```

## Execução
```bash
npx expo start
```

Abra o projeto no Expo Go pelo QR Code. O projeto usa o SDK 57, igual à versão atual do Expo Go no iPhone. Celular e computador devem estar na mesma rede. Para testar no navegador, pressione `w` no terminal ou execute `npm run web`.
O catálogo precisa de internet. No login, basta preencher e-mail e senha; não há autenticação real. A sessão se perde quando o aplicativo é reiniciado.

## Estrutura
```text
app/
  _layout.tsx
  index.tsx
  (catalog)/
    _layout.tsx
    products.tsx
    product/[id].tsx
src/
  components/ProductCard.tsx
  screens/
    LoginScreen.tsx
    ProductsScreen.tsx
    ProductDetailsScreen.tsx
  services/api.ts
  store/
    index.ts
    slices/authSlice.ts
  types/product.ts
```

## API e categorias
Masculino: `mens-shirts`, `mens-shoes`, `mens-watches`.
Feminino: `womens-bags`, `womens-dresses`, `womens-jewellery`, `womens-shoes`, `womens-watches`.
Listagem: `/products/category/{categoria}?limit=0`. Detalhes: `/products/{id}`.
As imagens, os valores e os descontos vêm da API. Os nomes e as descrições são apresentados em português de forma simples. Para acompanhar o layout do trabalho, os valores recebidos são mostrados com `R$` e vírgula decimal. Não há consulta de câmbio.

## Verificação
```bash
npm run typecheck
npx expo install --check
```
Confira no aparelho: login vazio, login preenchido, troca de abas, detalhes, voltar e sair. Teste também sem internet e tente carregar novamente.

## Referência visual
[Figma da disciplina](https://www.figma.com/design/Nbrwqt89RN9cvPYHDF08pu/Portfolio-Mobile-development?node-id=0-1).
O projeto segue a composição das telas obrigatórias: login azul com formulário branco, grade de duas colunas, abas com indicador azul e detalhes com imagem grande.
O campo foi mantido como e-mail conforme o prompt. O logout fica no cabeçalho; não há ações de cadastro, edição ou exclusão nem telas de configurações fora do escopo.

## Referências
- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router](https://docs.expo.dev/versions/v57.0.0/sdk/router/)
- [DummyJSON](https://dummyjson.com/docs/products)
- [Axios](https://axios-http.com/docs/intro)
- [Redux Toolkit](https://redux-toolkit.js.org/)
