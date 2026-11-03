// Click-through slideshows: any element with data-slideshow gets working arrows, swipe and arrow keys.
document.querySelectorAll('[data-slideshow]').forEach(box => {
  const track = box.querySelector('.slides-track');
  const count = track.children.length;
  const buttons = box.querySelectorAll('.slides-btn');
  // Video slides play (muted, looping) only while they are on screen
  if (track.querySelector('video') && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      const v = en.target.querySelector('video');
      if (!v) return;
      if (en.isIntersecting) v.play().catch(() => {}); else v.pause();
    }), { root: track, threshold: 0.6 });
    [...track.children].forEach(s => io.observe(s));
  }
  if (count < 2) { buttons.forEach(b => { b.hidden = true; }); return; }
  const go = dir => {
    const w = track.clientWidth;
    const i = Math.round(track.scrollLeft / w) + dir;
    track.scrollTo({ left: ((i + count) % count) * w });
  };
  box.querySelector('.prev').addEventListener('click', () => go(-1));
  box.querySelector('.next').addEventListener('click', () => go(1));
  box.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
});

// Justified gallery: put data-justified on a gallery div. Pictures are placed in rows and each row is
// scaled so every picture in it is the same height and the row fills the width exactly (no gaps, no cropping).
document.querySelectorAll('[data-justified]').forEach(gal => {
  const items = [...gal.children];
  const gap = 20;
  let lastW = 0;
  const media = el => el.querySelector('img,video');
  const ratio = el => {
    if (el.classList.contains('missing')) return 4 / 3;
    const m = media(el);
    if (!m) return 0;
    const w = m.naturalWidth || m.videoWidth, h = m.naturalHeight || m.videoHeight;
    return w && h ? w / h : 0;
  };
  const reset = () => {
    gal.style.display = ''; gal.style.flexWrap = ''; gal.style.gap = ''; gal.style.alignItems = '';
    items.forEach(el => { el.style.width = ''; });
  };
  const layout = force => {
    const W = Math.floor(gal.getBoundingClientRect().width) - 1;
    if (!force && W === lastW) return;
    lastW = W;
    if (W < 700) { reset(); gal.style.opacity = 1; return; }
    const rs = items.map(ratio);
    gal.style.display = 'flex'; gal.style.flexWrap = 'wrap'; gal.style.gap = gap + 'px'; gal.style.alignItems = 'flex-start';
    const target = Math.min(520, W * 0.45);
    let row = [], sum = 0;
    const flush = last => {
      let h = (W - gap * (row.length - 1)) / sum;
      if (last && h > target * 1.3) h = target;
      row.forEach(it => { it.el.style.width = Math.floor(it.r * h * 10) / 10 + 'px'; });
      row = []; sum = 0;
    };
    items.forEach((el, i) => {
      const r = rs[i] || 1;
      row.push({ el, r }); sum += r;
      if (sum * target + gap * (row.length - 1) >= W) flush(false);
    });
    if (row.length) flush(true);
    gal.style.opacity = 1;
  };
  const ready = () => items.every(el => el.classList.contains('missing') || ratio(el) > 0);
  const tryLayout = () => { if (ready()) layout(true); };
  gal.style.opacity = 0;
  items.forEach(el => {
    const m = media(el);
    if (!m) return;
    ['load', 'error', 'loadedmetadata'].forEach(ev => m.addEventListener(ev, () => setTimeout(tryLayout, 0)));
  });
  tryLayout();
  setTimeout(() => layout(true), 4000);   // fallback if something never loads
  new ResizeObserver(() => layout(false)).observe(gal);
});
