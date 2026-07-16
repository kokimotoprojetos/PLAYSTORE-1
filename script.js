/* ==========================================================================
   THUNDER VPN - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- View Toggle Switcher ---
  const btnShowLanding = document.getElementById('btn-show-landing');
  const btnShowPlaystore = document.getElementById('btn-show-playstore');
  const landingView = document.getElementById('landing-view');
  const playstoreView = document.getElementById('playstore-view');
  const body = document.body;

  function setViewMode(mode) {
    if (mode === 'playstore') {
      btnShowLanding.classList.remove('active');
      btnShowPlaystore.classList.add('active');
      landingView.classList.remove('active');
      playstoreView.classList.add('active');
      body.classList.add('light-theme-gp');
    } else {
      btnShowPlaystore.classList.remove('active');
      btnShowLanding.classList.add('active');
      playstoreView.classList.remove('active');
      landingView.classList.add('active');
      body.classList.remove('light-theme-gp');
    }
    // Scroll to top of window when toggling
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnShowLanding.addEventListener('click', () => setViewMode('landing'));
  btnShowPlaystore.addEventListener('click', () => setViewMode('playstore'));

  // --- Mobile Hamburger Menu ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.background = 'var(--bg-secondary)';
    navMenu.style.padding = '1.5rem';
    navMenu.style.borderBottom = '1px solid var(--border-color)';
  });

  // --- Mock Phone Connection Simulator ---
  const vpnConnectBtn = document.getElementById('vpn-connect-btn');
  const vpnStatusText = document.getElementById('vpn-status-text');
  const metricSpeed = document.getElementById('metric-speed');
  const metricPing = document.getElementById('metric-ping');
  const batteryInfo = document.getElementById('phone-battery');
  
  let isConnected = false;
  let isConnecting = false;

  vpnConnectBtn.addEventListener('click', () => {
    if (isConnecting) return;

    if (!isConnected) {
      // Connect
      isConnecting = true;
      vpnConnectBtn.style.animation = 'pulse-connecting 1s infinite alternate';
      vpnStatusText.textContent = 'CONECTANDO...';
      vpnStatusText.className = 'vpn-status-val';
      vpnStatusText.style.color = 'var(--accent-orange)';
      
      metricSpeed.textContent = 'Calculando...';
      metricPing.textContent = 'Calculando...';

      setTimeout(() => {
        isConnected = true;
        isConnecting = false;
        vpnConnectBtn.style.animation = 'none';
        vpnConnectBtn.classList.add('active');
        vpnStatusText.textContent = 'CONECTADO';
        vpnStatusText.className = 'vpn-status-val connected';
        vpnStatusText.style.color = 'var(--accent-green)';
        
        // Generate random realistic metrics
        const speed = (Math.random() * (145.5 - 75.2) + 75.2).toFixed(1);
        const ping = Math.floor(Math.random() * (35 - 12) + 12);
        metricSpeed.textContent = `${speed} Mbps`;
        metricPing.textContent = `${ping} ms`;
      }, 1500);

    } else {
      // Disconnect
      isConnected = false;
      vpnConnectBtn.classList.remove('active');
      vpnStatusText.textContent = 'DESCONECTADO';
      vpnStatusText.className = 'vpn-status-val';
      vpnStatusText.style.color = 'var(--text-primary)';
      
      metricSpeed.textContent = '-- Mbps';
      metricPing.textContent = '-- ms';
    }
  });

  // CSS Keyframe Animation for Connecting state
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes pulse-connecting {
      0% { transform: scale(1); box-shadow: 0 0 10px rgba(255, 145, 0, 0.4); }
      100% { transform: scale(1.08); box-shadow: 0 0 25px rgba(255, 145, 0, 0.8); }
    }
  `;
  document.head.appendChild(styleSheet);

  // Update battery status dynamically to feel alive
  setInterval(() => {
    const d = new Date();
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    const hr = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    batteryInfo.innerHTML = `<i class="fa-solid fa-clock"></i> ${hr}:${min} &nbsp; <i class="fa-solid fa-battery-three-quarters"></i> 89%`;
  }, 1000);

  // --- Server Speed/Ping Simulator Widget ---
  const servers = [
    { country: 'Estados Unidos', flag: '🇺🇸', load: '42%', ping: 24 },
    { country: 'Alemanha', flag: '🇩🇪', load: '65%', ping: 18 },
    { country: 'Reino Unido', flag: '🇬🇧', load: '38%', ping: 22 },
    { country: 'Japão', flag: '🇯🇵', load: '82%', ping: 85 },
    { country: 'Brasil', flag: '🇧🇷', load: '12%', ping: 15 },
    { country: 'França', flag: '🇫🇷', load: '51%', ping: 20 },
    { country: 'Canadá', flag: '🇨🇦', load: '30%', ping: 32 }
  ];

  const serverContainer = document.getElementById('server-list-container');
  const btnPingTest = document.getElementById('btn-ping-test');

  function renderServers(animate = false) {
    serverContainer.innerHTML = '';
    servers.forEach((srv, index) => {
      const pingClass = srv.ping > 50 ? 'mid' : '';
      const activeClass = index === 4 ? 'active' : ''; // Brasil default active
      
      const item = document.createElement('div');
      item.className = `server-item ${activeClass}`;
      item.innerHTML = `
        <div class="server-flag-name">
          <span class="server-flag">${srv.flag}</span>
          <span class="server-name">${srv.country}</span>
        </div>
        <div class="server-meta">
          <span class="server-load">Carga: ${srv.load}</span>
          <span class="server-ping ${pingClass}">${animate ? '...' : srv.ping + ' ms'}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        document.querySelectorAll('.server-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        
        // If connected, update active mockup status
        if (isConnected) {
          metricPing.textContent = `${srv.ping} ms`;
          const baseSpeed = srv.country === 'Brasil' ? 140 : 90;
          metricSpeed.textContent = `${(Math.random() * 20 + baseSpeed).toFixed(1)} Mbps`;
        }
      });

      serverContainer.appendChild(item);
    });
  }

  // Initial render
  renderServers();

  btnPingTest.addEventListener('click', () => {
    btnPingTest.disabled = true;
    btnPingTest.textContent = 'Testando...';
    renderServers(true);

    setTimeout(() => {
      // Recalculate pings slightly
      servers.forEach(srv => {
        srv.ping = Math.floor(Math.random() * (srv.ping * 0.3) + (srv.ping * 0.85));
      });
      renderServers(false);
      btnPingTest.disabled = false;
      btnPingTest.textContent = 'Testar Pings';
    }, 1500);
  });

  // --- Dynamic Google Play Data Loading ---
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      // 1. Render App Description
      const descContainer = document.getElementById('gp-desc-container');
      if (descContainer && data.description) {
        descContainer.innerHTML = data.description;
      }

      // 2. Render Screenshots
      const galleryContainer = document.getElementById('gp-gallery-container');
      if (galleryContainer && data.discovered_images) {
        galleryContainer.innerHTML = '';
        data.discovered_images.forEach((imgUrl, idx) => {
          const img = document.createElement('img');
          img.className = 'gp-screenshot-img';
          img.src = imgUrl;
          img.alt = `Thunder VPN Screenshot ${idx + 1}`;
          // Make images look great
          img.onerror = () => {
            img.style.display = 'none'; // Fallback if image fails to load
          };
          galleryContainer.appendChild(img);
        });
      }
    })
    .catch(err => {
      console.error('Error fetching data.json, loading fallback static content', err);
      
      // Fallback description in case of local file loading constraints
      const descContainer = document.getElementById('gp-desc-container');
      if (descContainer) {
        descContainer.innerHTML = `
          O 'Thunder VPN' é um aplicativo ultrarrápido que fornece um serviço de VPN gratuito. Não precisa de nenhuma configuração, basta clicar em um botão e você já pode acessar a Internet de forma segura e anônima.<br><br>
          <b>Por que escolher o 'Thunder VPN'?</b><br>
          ✅ Grande número de servidores e largura de banda de alta velocidade<br>
          ✅ Funciona com Wi-Fi, 5G, LTE/4G, 3G e todos suportes de dados móveis<br>
          ✅ Política estrita de não registro<br>
          ✅ Escolha inteligente de servidor<br>
          ✅ Sem limite de uso e de tempo
        `;
      }
    });
});
