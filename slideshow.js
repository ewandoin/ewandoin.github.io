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
