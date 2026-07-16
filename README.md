# Thunder VPN - Landing Page & Google Play Replica

Este projeto é uma recriação moderna da página do **Thunder VPN** da Google Play Store adaptada para a web. O site contém uma visualização dupla inovadora: uma **Landing Page Premium** de alta conversão e uma **Réplica da Google Play Store** fiel e interativa.

Totalmente pronto para hospedagem estática no **Vercel** e repositórios do **GitHub**.

---

## ⚡ Recursos Principais

### 1. Landing Page Premium
- **Estética Futurista**: Tema escuro com efeitos *glassmorphism*, gradientes vibrantes em neon cyan e roxo.
- **Simulador de Conexão**: Um smartphone virtual interativo que simula conexão VPN ativa/inativa com alteração de status, cálculo de velocidade de download e pings realistas.
- **Lista de Servidores**: Exibição em tempo real de latência simulada (pings) com botão interativo para retestar a rede.

### 2. Réplica da Google Play Store
- **Design Fiel**: Layout responsivo mimetizando o visual oficial da Google Play Store para computadores e celulares.
- **Carregamento Dinâmico**: Consome dados estruturados direto de `data.json` para carregar capturas de tela e descrição oficiais.
- **Modo Claro Adaptativo**: O tema do site alterna automaticamente para modo claro quando a visualização Google Play está ativa para manter a fidelidade visual da loja.

---

## 🚀 Como Executar Localmente

Como o projeto foi desenvolvido em HTML puro, CSS moderno e Vanilla JavaScript, não há etapas de compilação! 

Você pode rodar localmente usando qualquer servidor de arquivos estáticos. Exemplo com Node.js:

```bash
# Com npx
npx serve .
```

Ou simplesmente abrindo o arquivo `index.html` diretamente em seu navegador.

---

## ☁️ Como Subir para o Vercel

### Método 1: Integração com GitHub (Recomendado)
1. Crie um novo repositório no seu GitHub.
2. Faça o push dos arquivos deste diretório.
3. Acesse a dashboard do [Vercel](https://vercel.com).
4. Clique em **Import Project** e selecione o repositório criado.
5. Clique em **Deploy**. O Vercel detectará as configurações no `vercel.json` automaticamente.

### Método 2: Vercel CLI (Direto pelo terminal)
1. Instale o Vercel CLI globalmente:
   ```bash
   npm install -g vercel
   ```
2. No diretório do projeto, execute o comando:
   ```bash
   vercel
   ```
3. Siga as instruções do terminal e o deploy estará online em segundos!
