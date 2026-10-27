// ---- Edit your details here. They appear in the right-hand panel on every page. ----
const NAME = 'me : EWAN M~C';
const EMAIL = 'ewan.mackaycruise@gmail.com';
const INTRO = 'hi!<br>im an industrial designer focusing on the world of footwear, accessories and tactile products. i love to prototype and explore materials and colour.';
const CV_HTML = `
<h2>Experience</h2>
<article class="job">
  <h3>Freelance / Studio Practice</h3>
  <p class="role"><span>Footwear + Soft Goods Developer</span><span>June 2026 – Present</span></p>
  <p class="note">Key clients &amp; projects: Post Sole Studio, ASGA (TreadLightly), Phix Hospitality</p>
</article>
<article class="job">
  <h3>RMIT University</h3>
  <p class="role"><span>Technical Support Officer, Footwear Design Studio</span><span>May 2026 – Present</span></p>
</article>
<article class="job">
  <h3>Florsheim Shoes</h3>
  <p class="role"><span>Buying Team, Product Development Assistant</span><span>Feb 2025 – Aug 2025</span></p>
</article>
<article class="job">
  <h3>Crave Coffee</h3>
  <p class="role"><span>Operations</span><span>Feb 2024 – Jan 2025</span></p>
</article>

<h2>Education</h2>
<ul class="edu">
  <li><strong>Bachelor’s Degree in Industrial Design</strong><br><span>University of New South Wales, Graduated 2022</span></li>
  <li><strong>Certificate IV in Custom-Made Footwear Design</strong><br><span>RMIT University, Graduated 2025</span></li>
  <li><strong>Certificate III in Applied Fashion Design and Technology</strong><br><span>Ultimo TAFE NSW, Graduated 2023</span></li>
  <li><strong>International Baccalaureate (IB) Diploma</strong><br><span>Marlborough College Malaysia, Graduated 2018</span></li>
</ul>

<h2>Skills</h2>
<p class="sub">Technical</p>
<ul class="cols"><li>Pattern Drafting</li><li>Last Engineering</li><li>Footwear Upper Construction</li><li>Prototyping / Sample Creation</li><li>Tech Packs</li><li>Material Sourcing</li></ul>
<p class="sub">Software &amp; CAD</p>
<ul class="cols"><li>Adobe Illustrator</li><li>Adobe Photoshop</li><li>Fusion 360</li><li>Blender</li><li>Rhino</li><li>Keyshot</li><li>ATOM FlashCut</li></ul>

<h2>Languages</h2>
<ul class="cols"><li>English (Native)</li><li>German (Basic)</li><li>Mandarin (Basic)</li></ul>

<p style="margin-top:28px"><a href="cv.pdf" download="Ewan_Resume.pdf" style="text-decoration:underline">Download PDF</a>
`;
// -----------------------------------------------------------------------------------

(() => {
  const panel = document.getElementById('panel');
  panel.innerHTML = `
  <header><span>${NAME}</span><span id="clock"></span></header>
  <div class="info">
    <p><a href="mailto:${EMAIL}">contact me</a></p>
    <p class="intro">${INTRO}</p>
    <p style="margin-top:44px"><button type="button" id="cv-open">CV →</button></p>
  </div>
  <div class="cvview" id="cvview" hidden>
    <button type="button" class="back" id="cv-close">← Back</button>
    ${CV_HTML}
  </div>`;

  const info = panel.querySelector('.info'), cv = document.getElementById('cvview');
  const openBtn = document.getElementById('cv-open'), closeBtn = document.getElementById('cv-close');
  const show = open => {
    info.hidden = open; cv.hidden = !open;
    panel.classList.toggle('cv-mode', open);
    document.body.classList.toggle('cv-open', open);
    (open ? closeBtn : openBtn).focus();
    panel.scrollTop = 0;
  };
  openBtn.addEventListener('click', () => show(true));
  closeBtn.addEventListener('click', () => show(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !cv.hidden) show(false); });

  const clock = document.getElementById('clock');
  const tick = () => { clock.textContent = new Date().toLocaleTimeString('en-GB'); };
  tick(); setInterval(tick, 1000);
})();
