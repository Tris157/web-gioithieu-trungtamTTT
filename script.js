function toggleMobileMenu(open){
  var menu=document.getElementById('mobileMenu');
  var overlay=document.getElementById('mobileOverlay');
  menu.classList.toggle('open',open);
  overlay.classList.toggle('open',open);
  menu.setAttribute('aria-hidden',open?'false':'true');
  document.body.style.overflow=open?'hidden':'';
}

function openLightbox(src,caption){
  var box=document.getElementById('lightbox');
  var img=document.getElementById('lightboxImg');
  img.src=src;
  img.alt=caption;
  document.getElementById('lightboxCaption').textContent=caption;
  box.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeLightbox(){
  var box=document.getElementById('lightbox');
  box.classList.remove('open');
  document.getElementById('lightboxImg').src='';
  if(!document.getElementById('mobileMenu').classList.contains('open')){
    document.body.style.overflow='';
  }
}

function filterCourse(tag,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.course-card').forEach(card=>{
    if(tag==='all'||card.dataset.tags.includes(tag)){
      card.style.display='';
    } else {
      card.style.display='none';
    }
  });
}

var SHEET_URL='https://script.google.com/macros/s/AKfycbw8zo93UMAbGM98iZjX3KwPJhsMA7Bv62z-BuEiDe90a_9FEhB-xePOJbrUkmAqu89Y/exec';

function submitForm(){
  var name=document.getElementById('f-name').value.trim();
  var phone=document.getElementById('f-phone').value.trim();
  if(!name||!phone){alert('Vui lòng nhập họ tên và số điện thoại.');return;}
  var btn=document.querySelector('.btn-submit');
  btn.textContent='Đang gửi...';
  btn.disabled=true;

  var iframe=document.createElement('iframe');
  iframe.name='hidden-iframe';
  iframe.style.display='none';
  document.body.appendChild(iframe);

  var form=document.createElement('form');
  form.method='POST';
  form.action=SHEET_URL;
  form.target='hidden-iframe';

  var fields={
    name:name,
    phone:phone,
    grade:document.getElementById('f-grade').value,
    subject:document.getElementById('f-subject').value,
    branch:document.getElementById('f-branch').value,
    note:document.getElementById('f-note').value.trim()
  };
  Object.keys(fields).forEach(function(k){
    var input=document.createElement('input');
    input.type='hidden';
    input.name=k;
    input.value=fields[k];
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();

  setTimeout(function(){
    document.getElementById('formContent').style.display='none';
    document.getElementById('formSuccess').style.display='block';
    document.body.removeChild(form);
    document.body.removeChild(iframe);
  },1500);
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    var target=document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      toggleMobileMenu(false);
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    toggleMobileMenu(false);
    closeLightbox();
  }
});