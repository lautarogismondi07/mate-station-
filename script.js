const colorMap = {
  rojo: '#df342a',
  negro: '#242522',
  azul: '#2868c7',
  verde: '#48845a',
  violeta: '#8d5bc2',
  multicolor: 'linear-gradient(135deg,#ed3b32 0%,#ffce36 23%,#41a86b 48%,#3983e6 72%,#a44cc2 100%)'
};
const colorNames = {rojo:'Rojo',negro:'Negro',azul:'Azul',verde:'Verde',violeta:'Violeta',multicolor:'Multicolor'};
let chosenColor = 'rojo';
const band = document.getElementById('bandOverlay');
const previewBand = document.getElementById('previewBand');
const miniBand = document.getElementById('miniBand');
function selectColor(key) {
  chosenColor = key;
  const value = colorMap[key] || colorMap.rojo;
  [band, previewBand, miniBand].forEach(el => {
    if (!el) return;
    el.style.background = value;
    if (key === 'multicolor') el.style.mixBlendMode = 'normal';
    else el.style.mixBlendMode = 'multiply';
  });
  document.getElementById('selectedColorLabel').textContent = colorNames[key].toUpperCase();
  document.getElementById('previewColor').textContent = colorNames[key].toUpperCase();
  document.getElementById('colorSelect').value = colorNames[key];
  document.querySelectorAll('.color-option').forEach(btn => {
    const active = btn.dataset.color === key;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}
document.querySelectorAll('.color-option').forEach(btn => btn.addEventListener('click', () => selectColor(btn.dataset.color)));
document.getElementById('colorSelect').addEventListener('change', e => {
  const key = Object.keys(colorNames).find(k => colorNames[k] === e.target.value);
  if (key) selectColor(key);
});
function updateClock() {
  const now = new Date();
  document.getElementById('liveClock').textContent = now.toLocaleTimeString('es-AR', {hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  document.getElementById('liveDate').textContent = now.toLocaleDateString('es-AR', {weekday:'long',day:'2-digit',month:'long',year:'numeric'});
}
updateClock();
setInterval(updateClock, 1000);
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('menuToggle').addEventListener('click', () => document.getElementById('nav').classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => document.getElementById('nav').classList.remove('open')));

document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = new FormData(this);
  const details = [
    'SOLICITUD DE PEDIDO — MATE STATION',
    'Nombre: ' + data.get('name'),
    'Email: ' + data.get('email'),
    'WhatsApp: ' + data.get('phone'),
    'Color de franja: ' + data.get('color'),
    'Comentarios: ' + (data.get('message') || 'Sin comentarios'),
    '',
    'Solicitud informativa; precio y disponibilidad a confirmar.'
  ].join('\n');
  const result = document.getElementById('orderResult');
  result.hidden = false;
  result.textContent = details;
  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.textContent = 'Copiar resumen del pedido';
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(details);
      copyButton.textContent = '¡Resumen copiado!';
    } catch {
      const area = document.createElement('textarea');
      area.value = details;
      result.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      copyButton.textContent = '¡Resumen copiado!';
    }
  });
  result.appendChild(document.createElement('br'));
  result.appendChild(copyButton);
  result.scrollIntoView({behavior:'smooth', block:'nearest'});
});
selectColor('rojo');
