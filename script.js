// ============================================
// Prototipo funcional - Sistema APA 7
// Archivo principal de interacciones del frontend
// ============================================

const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view');
const goButtons = document.querySelectorAll('[data-go]');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const validationForm = document.getElementById('validationForm');
const resultsPlaceholder = document.getElementById('resultsPlaceholder');
const resultsContent = document.getElementById('resultsContent');
const resultTitle = document.getElementById('resultTitle');
const complianceValue = document.getElementById('complianceValue');
const complianceBar = document.getElementById('complianceBar');
const complianceBadge = document.getElementById('complianceBadge');

// Cambia de sección dentro del sistema.
function showView(targetId) {
  views.forEach((view) => {
    view.classList.toggle('active', view.id === targetId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.target === targetId);
  });

  // Cierra el menú lateral en móviles al navegar.
  sidebar.classList.remove('open');
}

// Navegación desde el menú lateral.
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    showView(link.dataset.target);
  });
});

// Navegación desde botones rápidos de la portada.
goButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showView(button.dataset.go);
  });
});

// Menú móvil.
menuToggle?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Animación simple para los contadores del dashboard.
function animateCounters() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const increment = Math.max(1, Math.floor(target / 45));
    let current = 0;

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        counter.textContent = target + (target === 87 ? '%' : '');
        return;
      }

      counter.textContent = current + (target === 87 ? '%' : '');
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
}

// Ejecuta la animación una sola vez al cargar.
animateCounters();

// Simulación del análisis del documento.
validationForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const autor = document.getElementById('autor').value.trim();
  const tipoDocumento = document.getElementById('tipoDocumento').value;
  const area = document.getElementById('area').value;

  // Generación de porcentaje simulado con pequeña variación.
  const percentages = [82, 85, 88, 90, 93];
  const compliance = percentages[Math.floor(Math.random() * percentages.length)];

  resultTitle.textContent = `${titulo} · ${autor}`;
  complianceValue.textContent = `${compliance}%`;
  complianceBadge.textContent = `${compliance}% cumplimiento`;
  complianceBar.style.width = `${compliance}%`;

  resultsPlaceholder.classList.add('hidden');
  resultsContent.classList.remove('hidden');

  // Actualiza algunos textos para hacer la simulación más real.
  const recommendations = document.querySelector('.observations ul');
  recommendations.innerHTML = `
    <li>Tipo de documento analizado: <strong>${tipoDocumento}</strong>.</li>
    <li>Área académica asociada: <strong>${area}</strong>.</li>
    <li>Se recomienda revisar la consistencia entre citaciones del texto y referencias finales.</li>
  `;
});

// Vista inicial.
showView('inicio');
