# app-rpg

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
