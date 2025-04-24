async function checkAll() {
  const input   = document.getElementById('input').value.trim();
  const liveBox = document.getElementById('liveBox');
  const deadBox = document.getElementById('deadBox');

  if (!input) {
    deadBox.insertAdjacentHTML('afterbegin', createBlock('No card data inserted.', 'dead'));
    return;
  }

  const lines = input.split('\n').filter(l => l.trim());
  for (const card of lines) {
    await delay(5000);
    const status = Math.random() < 0.2 ? 'live' : 'dead';
    const msg = status === 'live'
      ? `${card} => LIVE - Paid USD 0.60`
      : `${card} => Die`;
    const block = createBlock(msg, status);

    if (status === 'live') {
      liveBox.insertAdjacentHTML('afterbegin', block);
      liveBox.scrollTop = 0;
    } else {
      deadBox.insertAdjacentHTML('afterbegin', block);
      deadBox.scrollTop = 0;
    }
  }
}

function createBlock(text, type) {
  const color = type === 'live' ? '#4caf50' : '#e57373';
  return `<div class="result-block" style="color:${color}">${text}</div>`;
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function clearInput() {
  document.getElementById('input').value = '';
}
