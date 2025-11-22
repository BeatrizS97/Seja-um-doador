# 🫀 Site de Doação de Sangue - Em Memória de Rodrigo e Natalha

## 📋 Sobre o Projeto

Site criado em homenagem ao Rodrigo e Natalha, com o objetivo de promover a doação de sangue e conscientizar sobre a importância deste ato que salva vidas.

### ✨ Funcionalidades

- 🏠 **Página Inicial**: Apresentação emocional do projeto com estatísticas impactantes
- 💉 **Cuidados**: Orientações completas antes e depois da doação + requisitos para doar
- 📖 **Histórias**: Depoimentos reais de pessoas que receberam transfusões + dados sobre estados com menos doação
- 🗺️ **Hemocentros**: Busca por cidade + lista completa de hemocentros do Brasil
- ❤️ **Coração Pulsante**: Animação especial com a mensagem "Rodrigo e Natalha ainda vivem em nós"

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone ou crie o projeto:**
```bash
npx create-react-app blood-donation-memorial
cd blood-donation-memorial
```

2. **Instale as dependências:**
```bash
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Copie todos os arquivos fornecidos para as pastas corretas:**

```
blood-donation-memorial/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── HeartBeat.jsx
│   │   └── Button.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Care.jsx
│   │   ├── Stories.jsx
│   │   └── Map.jsx
│   ├── data/
│   │   ├── hemocentros.js
│   │   ├── testimonials.js
│   │   └── statistics.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

4. **Execute o projeto:**
```bash
npm start
```

O site será aberto automaticamente em `http://localhost:3000`

## 🎨 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **React Router DOM** - Navegação entre páginas
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **CSS3** - Animações e gradientes

## 📱 Páginas do Site

### 1. Início (`/`)
- Hero emocional com coração pulsante
- Estatísticas sobre doação de sangue
- Missão do projeto
- Links rápidos para outras seções

### 2. Cuidados (`/cuidados`)
- Orientações antes da doação
- Cuidados após a doação
- Requisitos para ser doador
- Impedimentos temporários e permanentes
- Fatos importantes sobre doação

### 3. Histórias (`/historias`)
- Depoimentos reais de pessoas que receberam sangue
- Visualização do impacto de uma doação
- Componentes do sangue e seus usos
- Estados com menor índice de doação (gráficos)

### 4. Hemocentros (`/hemocentros`)
- Busca por cidade
- Filtro por estado
- Lista completa de hemocentros do Brasil
- Informações de contato e endereço

## 🎯 Próximos Passos

Para colocar online:

### Opção 1: Vercel (Recomendado - Grátis)
```bash
npm install -g vercel
npm run build
vercel
```

### Opção 2: Netlify (Grátis)
```bash
npm run build
# Arraste a pasta 'build' para netlify.com
```

### Opção 3: GitHub Pages
```bash
npm install gh-pages --save-dev
# Adicione no package.json:
# "homepage": "https://seuusuario.github.io/blood-donation"
# "predeploy": "npm run build"
# "deploy": "gh-pages -d build"
npm run deploy
```

## 💡 Personalizações Possíveis

- Adicionar mais hemocentros no arquivo `src/data/hemocentros.js`
- Incluir novos depoimentos em `src/data/testimonials.js`
- Alterar cores no arquivo `tailwind.config.js`
- Adicionar Google Analytics
- Integrar com API de geolocalização
- Adicionar formulário de contato
- Criar seção de blog com notícias

## 🤝 Contribuindo

Este é um projeto de homenagem. Sugestões são bem-vindas!

## 📄 Licença

Este projeto foi criado com amor em memória de Rodrigo e Natalha.

---

**"Rodrigo e Natalha ainda vivem em nós. Faça parte dessa corrente."** ❤️

## 📞 Suporte

Em caso de dúvidas sobre o projeto, consulte a documentação do React em [reactjs.org](https://reactjs.org/)

## 🙏 Agradecimentos

A todos que doam sangue e salvam vidas diariamente.