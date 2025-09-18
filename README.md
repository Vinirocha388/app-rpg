# 🎮 App-RPG - Gerenciador de Personagens

Um aplicativo móvel para gerenciar personagens de RPG, desenvolvido com React Native, Expo e SQLite.

## 📱 Sobre o Projeto

Este aplicativo permite aos usuários criar, gerenciar e recrutar personagens para suas aventuras de RPG. Com uma interface moderna e intuitiva, oferece uma experiência completa de gerenciamento de heróis.

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas
```
app-rpg/
├── components/
│   ├── Header.js              # Cabeçalho com filtros
│   ├── CharacterCard.js       # Card de personagem
│   └── AddCharacterForm.js    # Formulário de adição
├── services/
│   └── database.js            # Serviços do SQLite
├── App.js                     # Componente principal
└── README.md                  # Documentação
```

### Componentização Implementada

#### 1. **Header Component**
- **Localização**: `components/Header.js`
- **Responsabilidade**: Exibir título, subtítulo e filtros de personagens
- **Funcionalidades**:
  - Filtro por status (Todos, Recrutados, Disponíveis)
  - Design responsivo com ícones
  - Menu dropdown para seleção de filtros

#### 2. **CharacterCard Component**
- **Localização**: `components/CharacterCard.js`
- **Responsabilidade**: Representar cada personagem da lista
- **Funcionalidades**:
  - Exibição de informações do personagem
  - Botões de ação (Recrutar/Desertar, Remover)
  - Indicadores visuais de status
  - Ícones específicos por classe

#### 3. **AddCharacterForm Component**
- **Localização**: `components/AddCharacterForm.js`
- **Responsabilidade**: Formulário para adicionar novos personagens
- **Funcionalidades**:
  - Validação completa de campos
  - Seleção de classes com ícones
  - Campos numéricos para atributos
  - Feedback de erros em tempo real

## 🎨 Biblioteca de UI - React Native Paper

### Componentes Substituídos

| Componente Nativo | Componente Paper | Benefícios |
|-------------------|------------------|------------|
| `TouchableOpacity` | `Button` | Design Material, animações |
| `TextInput` | `TextInput` | Validação visual, temas |
| `View` (containers) | `Card` | Elevação, sombras |
| Modais básicos | `Dialog` | Animações suaves |
| Alertas básicos | `Snackbar` | Feedback não-intrusivo |

### Tema e Design
- **Paleta de cores**: Material Design 3
- **Tipografia**: Roboto (padrão Material)
- **Ícones**: MaterialIcons do Expo
- **Elevação**: Sombras e cards consistentes

## ✨ Melhorias Implementadas

### 1. 🔔 Modal de Confirmação
**O que foi feito:**
- Implementação de modais de confirmação para todas as ações críticas
- Diálogos específicos para adicionar, remover e recrutar personagens

**Por que foi feito:**
- Previne ações acidentais do usuário
- Melhora a experiência e confiança na interface
- Reduz erros operacionais

**Valor agregado:**
- Maior segurança nas operações
- Interface mais profissional
- Redução de frustrações do usuário

### 2. 🎯 Ícones Visuais (MaterialIcons)
**O que foi feito:**
- Ícones específicos para cada classe de personagem
- Ícones para ações (adicionar, remover, recrutar)
- Ícones para atributos (vida, mana, nível)

**Por que foi feito:**
- Facilita identificação rápida de elementos
- Melhora a usabilidade e acessibilidade
- Torna a interface mais atrativa e moderna

**Valor agregado:**
- Interface mais intuitiva
- Redução da curva de aprendizado
- Experiência visual mais rica

### 3. 📱 Feedback Visual (Snackbar/Toast)
**O que foi feito:**
- Mensagens de feedback para todas as ações
- Snackbars com duração automática
- Feedback específico para cada operação

**Por que foi feito:**
- Confirma ao usuário que a ação foi executada
- Melhora a comunicação sistema-usuário
- Reduz incertezas sobre o estado da aplicação

**Valor agregado:**
- Maior confiança na utilização
- Feedback imediato e claro
- Experiência mais responsiva

### 4. 🔍 Filtro de Personagens
**O que foi feito:**
- Sistema de filtros no cabeçalho
- Filtros por status: Todos, Recrutados, Disponíveis
- Atualização dinâmica da lista

**Por que foi feito:**
- Facilita navegação em listas grandes
- Permite visualização focada
- Melhora organização do conteúdo

**Valor agregado:**
- Melhor organização visual
- Eficiência na busca
- Experiência mais personalizada

### 5. 🎨 Design System Consistente
**O que foi feito:**
- Cores específicas por classe de personagem
- Esquema de cores unificado
- Tipografia e espaçamentos consistentes

**Por que foi feito:**
- Cria identidade visual forte
- Melhora reconhecimento de padrões
- Profissionaliza a interface

**Valor agregado:**
- Interface mais polida
- Melhor experiência do usuário
- Aparência profissional

## 🗄️ Banco de Dados SQLite

### Estrutura da Tabela `characters`
```sql
CREATE TABLE characters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  health INTEGER DEFAULT 100,
  mana INTEGER DEFAULT 50,
  isRecruited INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Operações Implementadas
- ✅ Create: Adicionar novos personagens
- ✅ Read: Listar personagens com filtros
- ✅ Update: Recrutar/desertar personagens
- ✅ Delete: Remover personagens

## 🚀 Funcionalidades

### Principais
- [x] Listar personagens com informações detalhadas
- [x] Adicionar novos personagens com validação
- [x] Remover personagens com confirmação
- [x] Recrutar/desertar personagens
- [x] Filtrar personagens por status
- [x] Persistência de dados com SQLite

### Interface
- [x] Cards visuais para personagens
- [x] Formulário modal para adição
- [x] Feedback visual para ações
- [x] Ícones temáticos por classe
- [x] Design responsivo e moderno

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework base
- **Expo**: Plataforma de desenvolvimento
- **React Native Paper**: Biblioteca de UI
- **Expo SQLite**: Banco de dados local
- **MaterialIcons**: Ícones vetoriais
- **JavaScript ES6+**: Linguagem de programação

## 📦 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar no desenvolvimento
npm start

# Para Android
npm run android

# Para iOS
npm run ios
```

## 🏗️ Build para Produção

Para gerar o APK para Android:

```bash
# Instalar EAS CLI (se necessário)
npm install -g @expo/eas-cli

# Login no Expo
eas login

# Build para Android
eas build --platform android
```

## 👥 Equipe de Desenvolvimento

- **Desenvolvedor**: [Seu Nome]
- **Dupla**: [Nome do Colega]

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte da disciplina de desenvolvimento mobile.

---

*Desenvolvido com ❤️ usando React Native e Expo*

Este projeto é um aplicativo de RPG desenvolvido em React Native.


## Descrição
O app-rpg é um aplicativo mobile para gerenciamento de personagens, campanhas e recursos de RPG. Ele foi criado para facilitar a organização e o acompanhamento de sessões de RPG diretamente do seu dispositivo móvel.

## Análise dos Arquivos

- `App.js`: Arquivo principal do aplicativo. Geralmente contém o componente raiz do React Native, responsável por renderizar a interface inicial do app.
- `index.js`: Ponto de entrada da aplicação. Normalmente importa o `App.js` e registra o aplicativo para execução.
- `app.json`: Arquivo de configuração do Expo, define nome, ícone, versão e outras propriedades do app.
- `eas.json`: Configurações para o EAS (Expo Application Services), usado para builds e deploys automatizados.
- `package.json`: Lista as dependências do projeto, scripts de execução, nome, versão e outras informações do Node.js.
- Pasta `assets/`: Contém imagens usadas no app, como ícones e splash screens.

## Instalação
1. Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Expo CLI](https://docs.expo.dev/get-started/installation/) instalados.
2. Clone este repositório:
   ```sh
   git clone https://github.com/Vinirocha388/app-rpg.git
   ```
3. Instale as dependências:
   ```sh
   cd app-rpg-1
   npm install
   ```

## Passo a Passo para Acessar

1. **Pré-requisitos**  
   - Instale o [Node.js](https://nodejs.org/)  
   - Instale o [Expo CLI](https://docs.expo.dev/get-started/installation/)

2. **Clonar o Repositório**  
   ```sh
   git clone https://github.com/Vinirocha388/app-rpg.git
   ```

3. **Instalar Dependências**  
   ```sh
   cd app-rpg-1
   npm install
   ```

4. **Iniciar o Projeto**  
   ```sh
   npx expo start
   ```

5. **Acessar o App**  
   - Após iniciar, será exibido um QR code no terminal ou navegador.
   - Baixe o aplicativo Expo Go no seu celular.
   - Escaneie o QR code com o Expo Go para abrir o app no dispositivo.

## Uso
- Execute `npx expo start` para iniciar o servidor de desenvolvimento.
- Use o aplicativo Expo Go no seu celular para escanear o QR code e testar o app.

## Estrutura de Pastas
```
app-rpg-1/
├── App.js
├── app.json
├── eas.json
├── index.js
├── package.json
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
```

## Dependências
Consulte o arquivo `package.json` para a lista completa de dependências. Principais:
- React Native
- Expo

## Contribuição
Contribuições são bem-vindas! Para contribuir:
1. Fork este repositório.
2. Crie uma branch com sua feature ou correção.
3. Envie um pull request.

## Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
