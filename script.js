
/* Pense Lógico - Revamped script.js
   - Carousel of courses
   - Interactivity: view course, enroll, dashboard (localStorage)
*/

const coursesSeed = [
  {id:1, title:'Lógica de Programação (Python)', desc:'Fundamentos, algoritmos e resolução de problemas.', img:'images/python.webp', lessons:['Introdução','Variáveis','Estruturas','Funções','Projetos']},
  {id:2, title:'Desenvolvimento Web Moderno', desc:'HTML5, CSS3, JS e práticas modernas.', img:'images/web.webp', lessons:['HTML','CSS','JS','APIs','Projeto Final']},
  {id:3, title:'Inteligência Artificial', desc:'Conceitos e aplicações práticas em IA.', img:'images/ai.webp', lessons:['Matemática Básica','ML','Redes Neurais','Projeto IA']},
  {id:4, title:'Cibersegurança Básica', desc:'Princípios de segurança na web e redes.', img:'images/cyber.webp', lessons:['Fundamentos','Criptografia','Mitigações']},
  {id:5, title:'Marketing Digital', desc:'Estratégias práticas para presença online.', img:'images/marketing.webp', lessons:['SEO','Redes Sociais','Campanhas']},
  {id:6, title:'Finanças Pessoais', desc:'Gestão financeira para jovens profissionais.', img:'images/finance.webp', lessons:['Orçamento','Poupança','Investimentos']}
];

// state
let courses = JSON.parse(localStorage.getItem('pense:courses')) || coursesSeed;
let users = JSON.parse(localStorage.getItem('pense:users')) || [{id:1,name:'aluno1',email:'aluno1@pense',password:'1234'}];
let enrolls = JSON.parse(localStorage.getItem('pense:enrolls')) || [];
let progress = JSON.parse(localStorage.getItem('pense:progress')) || {};
let currentUser = JSON.parse(localStorage.getItem('pense:currentUser')) || null;
// Navegação dinâmica
function updateNav() {
  const btnCourses = document.getElementById('btn-courses');
  const btnDashboard = document.getElementById('btn-dashboard');
  const btnLogin = document.getElementById('btn-login');
  const btnRegister = document.getElementById('btn-register');
  const btnAbout = document.getElementById('btn-about');
  const btnHomeLogo = document.getElementById('btn-home-logo');
  const userInfo = document.getElementById('user-info');
  const btnLogout = document.getElementById('btn-logout');
  if (!currentUser) {
    if(btnCourses) btnCourses.style.display = 'none';
    if(btnDashboard) btnDashboard.style.display = 'none';
    if(btnLogin) btnLogin.style.display = '';
    if(btnRegister) btnRegister.style.display = '';
    if(btnAbout) btnAbout.style.display = '';
    if(btnHomeLogo) btnHomeLogo.style.display = '';
    if(userInfo) { userInfo.style.display = 'none'; userInfo.textContent = ''; }
    if(btnLogout) btnLogout.style.display = 'none';
  } else {
    if(btnCourses) btnCourses.style.display = '';
    if(btnDashboard) btnDashboard.style.display = '';
    if(btnLogin) btnLogin.style.display = 'none';
    if(btnRegister) btnRegister.style.display = 'none';
    if(btnAbout) btnAbout.style.display = '';
    if(btnHomeLogo) btnHomeLogo.style.display = '';
    if(userInfo) { userInfo.style.display = ''; userInfo.textContent = currentUser.name; }
    if(btnLogout) btnLogout.style.display = ''; }
}
window.addEventListener('DOMContentLoaded', updateNav);
document.getElementById('btn-home-logo')?.addEventListener('click', ()=>{
  document.querySelectorAll('.page').forEach(s=>s.style.display='none');
  document.getElementById('courses-section').style.display='block';
});
document.getElementById('btn-logout')?.addEventListener('click', ()=>{
  currentUser = null; save(); updateNav(); document.getElementById('courses-section').style.display='block';
});
// Navegação para Home, Sobre Nós, Cadastro
document.getElementById('btn-home')?.addEventListener('click', ()=>{
  document.querySelectorAll('.page').forEach(s=>s.style.display='none');
  document.getElementById('courses-section').style.display='block';
});
document.getElementById('btn-about')?.addEventListener('click', ()=>{
  document.querySelectorAll('.page').forEach(s=>s.style.display='none');
  document.getElementById('about').style.display='block';
});
document.getElementById('btn-register')?.addEventListener('click', ()=>{
  document.querySelectorAll('.page').forEach(s=>s.style.display='none');
  document.getElementById('register').style.display='block';
  document.getElementById('register-msg').textContent = '';
});
// Chamar updateNav após login/cadastro

// Cadastro
const registerSection = document.getElementById('register');
const registerForm = document.getElementById('register-form');
const registerMsg = document.getElementById('register-msg');
const btnRegister = document.getElementById('btn-register');
btnRegister.addEventListener('click', ()=>{
  document.querySelectorAll('.page').forEach(s=>s.style.display='none');
  registerSection.style.display='block';
  registerMsg.textContent = '';
});

registerForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  if(users.find(u=>u.email===email)){
    registerMsg.textContent = 'Email já cadastrado.';
    return;
  }
  const newUser = {id:Date.now(), name, email, password};
  users.push(newUser);
  save();
  registerMsg.textContent = 'Cadastro realizado com sucesso!';
  registerForm.reset();
});

// save util
function save(){ localStorage.setItem('pense:courses', JSON.stringify(courses)); localStorage.setItem('pense:enrolls', JSON.stringify(enrolls)); localStorage.setItem('pense:progress', JSON.stringify(progress)); localStorage.setItem('pense:users', JSON.stringify(users)); localStorage.setItem('pense:currentUser', JSON.stringify(currentUser)); }

// render carousel
const slidesEl = document.getElementById('slides');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const carouselInterval = 5000;
let slideIndex = 0;
function renderSlides(){
  slidesEl.innerHTML = '';
  courses.forEach((c,i)=>{
    const div = document.createElement('div'); div.className='slide';
    div.style.transition = 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.4s';
    div.style.boxShadow = '0 8px 32px rgba(11,99,212,0.18)';
    div.innerHTML = `<img src="${c.img}" alt="${c.title}" style="border-radius:14px;box-shadow:0 2px 12px var(--accent-2);"><div style="position:absolute;bottom:18px;left:18px;background:rgba(0,0,0,0.45);color:#fff;padding:8px 16px;border-radius:8px;font-size:18px;font-weight:600;box-shadow:0 2px 8px #0002;">${c.title}</div>`;
    div.addEventListener('click', ()=> openCourse(c.id));
    slidesEl.appendChild(div);
  });
}
function startCarousel(){
  renderSlides();
  slidesEl.style.transition = 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)';
  setInterval(()=>{
    slideIndex = (slideIndex+1) % courses.length;
    slidesEl.style.transform = 'translateX('+ (- (420 + 12) * slideIndex) +'px)';
  }, carouselInterval);
}
prevBtn.addEventListener('click', ()=>{
  slideIndex = Math.max(0, slideIndex-1);
  slidesEl.style.transform = 'translateX('+ (- (420 + 12) * slideIndex) +'px)';
});
nextBtn.addEventListener('click', ()=>{
  slideIndex = Math.min(slideIndex+1, courses.length-1);
  slidesEl.style.transform = 'translateX('+ (- (420 + 12) * slideIndex) +'px)';
});

// render courses grid
const grid = document.getElementById('courses-grid');
function renderCoursesGrid(){
  grid.innerHTML = '';
  courses.forEach((c,i)=>{
    const card = document.createElement('div'); card.className='card course-card';
    card.style.animation = `slideZoomColor 0.7s cubic-bezier(.68,-0.55,.27,1.55) ${(i*0.1)}s both`;
    card.innerHTML = `<img src="${c.img}" alt="${c.title}"><h4>${c.title}</h4><p>${c.desc}</p><div style="display:flex;gap:8px;margin-top:8px"><button class="primary" data-id="${c.id}">Ver Curso</button><button class="ghost" data-id="${c.id}">Inscrever</button></div>`;
    grid.appendChild(card);
  });
  // attach actions
  grid.querySelectorAll('.primary').forEach(b=> b.addEventListener('click', e => openCourse(+e.target.dataset.id)));
  grid.querySelectorAll('.ghost').forEach(b=> b.addEventListener('click', e => enrollCourse(+e.target.dataset.id)));
}

// open course detail
const courseView = document.getElementById('course-view');
const backBtn = document.getElementById('back');
backBtn.addEventListener('click', ()=> { courseView.style.display='none'; document.getElementById('courses-section').scrollIntoView({behavior:'smooth'}); });
function openCourse(id){
  const c = courses.find(x=>x.id===id); if(!c) return;
  document.getElementById('course-img').src = c.img;
  document.getElementById('course-title').textContent = c.title;
  document.getElementById('course-desc').textContent = c.desc;
  const ll = document.getElementById('lessons-list'); ll.innerHTML = '';
  c.lessons.forEach((l,i)=>{ const d = document.createElement('div'); d.className='lesson card'; d.textContent = (i+1)+'. '+l; ll.appendChild(d); });
  courseView.style.display = 'block';
  window.scrollTo({top:0, behavior:'smooth'});
}

// enroll action
function enrollCourse(id){
  if(!currentUser){ promptLogin(); return; }
  if(enrolls.find(e=>e.userId===currentUser.id && e.courseId===id)){ alert('Já inscrito'); return; }
  enrolls.push({userId:currentUser.id, courseId:id, enrolledAt:new Date().toISOString()});
  progress[currentUser.id] = progress[currentUser.id] || {}; progress[currentUser.id][id] = {completed:0,total: courses.find(c=>c.id===id).lessons.length};
  save(); alert('Inscrito com sucesso!'); renderDashboard();
}

// Dashboard
const dashboardEl = document.getElementById('dashboard-content');
function renderDashboard(){
  document.getElementById('dashboard').style.display='block';
  document.getElementById('courses-section').style.display='none';
  dashboardEl.innerHTML = '';
  if(!currentUser){ dashboardEl.innerHTML = '<p>Faz login para ver os teus cursos.</p>'; return; }
  const myEnrolls = enrolls.filter(e=>e.userId===currentUser.id);
  if(myEnrolls.length===0) { dashboardEl.innerHTML='<p>Sem inscrições. Explora os cursos disponíveis.</p>'; return; }
  myEnrolls.forEach(en=>{
    const c = courses.find(x=>x.id===en.courseId);
    const p = (progress[currentUser.id] && progress[currentUser.id][c.id])? progress[currentUser.id][c.id] : {completed:0,total:c.lessons.length};
    const percent = Math.round(100 * (p.completed / p.total));
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<h4>${c.title}</h4><p>${c.desc}</p><div>Progresso: ${p.completed}/${p.total} (${percent}%)</div>`;
    // action buttons
    const btns = document.createElement('div'); btns.style.marginTop='8px';
    const btnComplete = document.createElement('button'); btnComplete.textContent='Concluir Aula'; btnComplete.className='primary';
    btnComplete.onclick = ()=>{ if(p.completed < p.total){ p.completed++; progress[currentUser.id][c.id] = p; save(); renderDashboard(); } else alert('Curso já concluído!'); };
    btns.appendChild(btnComplete);
    if(percent===100){ const cert = document.createElement('button'); cert.textContent='Gerar Certificado'; cert.className='ghost'; cert.style.marginLeft='8px'; cert.onclick=()=> alert('Certificado (simulado) gerado!'); btns.appendChild(cert); }
    card.appendChild(btns);
    dashboardEl.appendChild(card);
  });
}

// login prompt simple
function promptLogin(){
  const email = prompt('Email (ex: aluno1@pense)');
  const pass = prompt('Senha (ex: 1234)');
  const user = users.find(u=>u.email===email && u.password===pass);
  if(user){ currentUser = user; save(); alert('Bem-vindo '+user.name); renderDashboard(); updateNav(); } else { if(confirm('Utilizador não encontrado. Criar conta?')){ const name = prompt('Nome'); const id = Date.now(); const nu = {id,name,email, password:pass}; users.push(nu); currentUser = nu; save(); alert('Conta criada e logado'); renderDashboard(); updateNav(); } }
}

// init
document.getElementById('btn-courses').addEventListener('click', ()=>{ document.getElementById('courses-section').style.display='block'; document.getElementById('dashboard').style.display='none';});
document.getElementById('btn-dashboard').addEventListener('click', ()=>{ renderDashboard(); });
document.getElementById('btn-login').addEventListener('click', ()=>{ promptLogin(); });
document.getElementById('cta-join').addEventListener('click', ()=>{ document.getElementById('btn-login').click(); });
document.getElementById('cta-demo').addEventListener('click', ()=>{ alert('Modo Demo: tudo salvo localmente no teu navegador (localStorage).'); });

renderCoursesGrid(); startCarousel();
