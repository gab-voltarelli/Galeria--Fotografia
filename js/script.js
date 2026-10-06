const photos = [
  { src: "./img/angulo1.JPG", w: 1024, h: 683, name: "Ângulo alto", meta: "interior" },
  { src: "./img/angulo2.JPG", w: 1024, h: 683, name: "Ângulo normal", meta: "interior" },
  { src: "./img/angulo3.JPG", w: 1024, h: 683, name: "Ângulo baixo", meta: "interior" },
  { src: "./img/enquadramento1.JPG", w: 683, h: 1024, name: "Plano geral", meta: "interior" },
  { src: "./img/enquadramento2.JPG", w: 683, h: 1024, name: "Plano médio", meta: "interior" },
  { src: "./img/enquadramento3.JPG", w: 683, h: 1024, name: "Plano fechado", meta: "interior" },
  { src: "./img/horizontal.JPG", w: 1024, h: 683, name: "Regra dos Terços", meta: "horizontal" },
  { src: "./img/verticais.JPG", w: 1024, h: 683, name: "Regra dos Terços", meta: "vertical" },
  { src: "./img/quadrante.JPG", w: 1024, h: 683, name: "Regra dos Terços", meta: "quadrante" },
  { src: "./img/foco.JPG", w: 1024, h: 683, name: "Regra dos Terços", meta: "pontos de foco" },
  { src: "./img/DuplaExposição.png", w: 1024, h: 683, name: "Dupla Exposição", meta: "Photoshop" },
  { src: "./img/motion blur-folheado.jpg", w: 1024, h: 683, name: "Motion Blur", meta: "Tratada no Lightroom" },
  { src: "./img/motion blur-livro.jpg", w: 1024, h: 683, name: "Motion Blur", meta: "Tratada no Lightroom" },
  { src: "./img/espelhos-céu.jpg", w: 1024, h: 683, name: "Espelhos e Paisagem", meta: "Tratada no Lightroom" },
  { src: "./img/espelhos-árvore.jpg", w: 1024, h: 683, name: "Espelhos e Paisagem", meta: "Tratada no Lightroom" },
  { src: "./img/LightPaint-arco.jpg", w: 1024, h: 683, name: "Light Paint", meta: "Tratada no Lightroom" },
  { src: "./img/LightPaint-rosto.jpg", w: 1024, h: 683, name: "Light Paint", meta: "Tratada no Lightroom" },
  { src: "./img/LightPaint-varinhas.jpg", w: 1024, h: 683, name: "Light Paint", meta: "Tratada no Lightroom" },
  { src: "./img/goteira2.jpg", w: 1024, h: 683, name: "Texturas Macro", meta: "Tratada no Lightroom" },
  { src: "./img/rede-perspectiva.jpg", w: 1024, h: 683, name: "Texturas Macro", meta: "Tratada no Lightroom" },
  { src: "./img/rede.jpg", w: 1024, h: 683, name: "Texturas Macro", meta: "Tratada no Lightroom" },
  { src: "./img/reflexo.jpg", w: 1024, h: 683, name: "Texturas Macro", meta: "Tratada no Lightroom" },
  { src: "./img/recortes.jpg", w: 1024, h: 683, name: "Texturas Macro", meta: "Tratada no Lightroom" },
  { src: "./img/Fotocolagem.png", w: 1024, h: 683, name: "Fotocolagem", meta: "Photoshop" },
  { src: "./img/fotoproduto.png", w: 1024, h: 683, name: "Foto de Produto", meta: "Illustrator" },
  { src: "./img/AnuncioRevista.png", w: 1024, h: 683, name: "Foto de Produto: Anúncio Revista", meta: "Figma" },
];

const gallery = document.getElementById('gallery');
photos.forEach((p, i) => {
  const fig = document.createElement('figure');
  fig.className = 'tile';
  fig.tabIndex = 0;
  fig.dataset.index = i;
  const num = String(i + 1).padStart(2, '0');
  
  fig.innerHTML = `
    <span class="tile-index">${num} / ${photos.length}</span>
    <img loading="lazy" src="${p.src}" alt="${p.name}">
    <figcaption>
      <div class="name">${p.name}</div>
      <div class="meta">${p.meta}</div>
    </figcaption>
  `;
  gallery.appendChild(fig);
});
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
let currentIndex = 0;

function openLightbox(index){
  currentIndex = index;
  const p = photos[index];
  const num = String(index + 1).padStart(2, '0');
  lbImg.src = p.src;
  lbImg.alt = p.name;
  lbCaption.textContent = `${num} / ${photos.length} — ${p.name}, ${p.meta}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showNext(delta){
  currentIndex = (currentIndex + delta + photos.length) % photos.length;
  openLightbox(currentIndex);
}

gallery.addEventListener('click', (e) => {
  const tile = e.target.closest('.tile');
  if (tile) openLightbox(Number(tile.dataset.index));
});

gallery.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const tile = e.target.closest('.tile');
    if (tile) { e.preventDefault(); openLightbox(Number(tile.dataset.index)); }
  }
});

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => showNext(-1));
document.getElementById('lbNext').addEventListener('click', () => showNext(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext(1);
  if (e.key === 'ArrowLeft') showNext(-1);
});