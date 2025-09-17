// Simple gallery lightbox
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const lbClose = lightbox.querySelector('.close');

gallery && gallery.addEventListener('click', (e)=>{
  const t = e.target;
  if(t.tagName === 'IMG'){
    const src = t.dataset.full || t.src;
    lbImg.src = src;
    lightbox.classList.add('visible');
  }
});
lbClose.addEventListener('click', ()=>{
  lightbox.classList.remove('visible');
  lbImg.src='';
});
lightbox.addEventListener('click', (e)=>{
  if(e.target===lightbox){
    lightbox.classList.remove('visible');
    lbImg.src='';
  }
});

// Small accessibility: close with Escape
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape'){
    lightbox.classList.remove('visible');
    lbImg.src='';
  }
});
