function legacyCopy(text) {
 const previousFocus = document.activeElement;
 const field = document.createElement('textarea');
 field.value = text;
 field.readOnly = true;
 field.style.cssText = 'position:fixed;left:-9999px;top:0';
 document.body.appendChild(field);
 try {
  field.focus(); field.select(); field.setSelectionRange(0, text.length);
  return typeof document.execCommand === 'function' && document.execCommand('copy') === true;
 } catch {
  return false;
 } finally {
  field.remove();
  if (previousFocus) previousFocus.focus({preventScroll: true});
 }
}

function showCopyStatus(message) {
 const status = document.querySelector('.toast');
 status.textContent = message; status.classList.add('visible');
 clearTimeout(window.copyTimer);
 window.copyTimer = setTimeout(() => status.classList.remove('visible'), 2200);
}

document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
 const text = button.dataset.copy;
 const isShare = button.dataset.copyKind === 'share';
 button.disabled = true;
 document.querySelector('.toast').classList.remove('visible');
 try {
  let copied = false;
  if (window.isSecureContext && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
   try { await navigator.clipboard.writeText(text); copied = true; } catch { /* Try the compatible copy method below. */ }
  }
  if (!copied) copied = legacyCopy(text);
  if (copied) {
   showCopyStatus(isShare ? '已复制分享文案' : '已复制链接');
  } else {
   const dialog = document.querySelector('#copy-dialog');
   const field = dialog.querySelector('textarea');
   dialog.querySelector('h2').textContent = isShare ? '手动复制分享文案' : '手动复制链接';
   field.value = text;
   if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); }
   else dialog.setAttribute('open', '');
   field.focus(); field.select();
   showCopyStatus('自动复制失败，请手动复制');
  }
 } finally {
  button.disabled = false;
 }
}));

document.querySelector('#copy-dialog form').addEventListener('submit', event => {
 event.preventDefault();
 const dialog = document.querySelector('#copy-dialog');
 if (typeof dialog.close === 'function') dialog.close();
 else dialog.removeAttribute('open');
});
document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); })));
const header = document.querySelector('header');
const updateHeaderHeight = () => document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
updateHeaderHeight();
new ResizeObserver(updateHeaderHeight).observe(header);
