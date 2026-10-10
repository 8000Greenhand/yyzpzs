document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
 const url = button.dataset.copy;
 try {
  if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
  await navigator.clipboard.writeText(url);
  const status = document.querySelector('.toast'); status.textContent = '链接已复制'; status.classList.add('visible');
  clearTimeout(window.copyTimer); window.copyTimer = setTimeout(() => status.classList.remove('visible'), 2200);
 } catch {
  const dialog = document.querySelector('#copy-dialog'); const input = dialog.querySelector('input'); input.value = url; dialog.showModal(); input.focus(); input.select();
 }
}));
document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); })));
const header = document.querySelector('header');
const updateHeaderHeight = () => document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
updateHeaderHeight();
new ResizeObserver(updateHeaderHeight).observe(header);
