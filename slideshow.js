// Click-through slideshows: any element with data-slideshow gets working arrows, swipe and arrow keys.
document.querySelectorAll('[data-slideshow]').forEach(box => {
  const track = box.querySelector('.slides-track');
  const count = track.children.length;
  const buttons = box.querySelectorAll('.slides-btn');
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
