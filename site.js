/* JH IPTV — idiomas do site (pt, en, es, fr, de, it) */
var JH_LANGS=["pt","en","es","fr","de","it"];
var JH_COMMON={
pt:{nav_feat:"Funcionalidades",nav_dl:"Descarregar",nav_qr:"Telemóvel → TV",nav_ct:"Contacto",foot_priv:"Política de privacidade",foot_terms:"Termos de utilização",foot_ct:"Contacto",foot_home:"Início",skip:"Saltar para o conteúdo"},
en:{nav_feat:"Features",nav_dl:"Download",nav_qr:"Phone → TV",nav_ct:"Contact",foot_priv:"Privacy policy",foot_terms:"Terms of use",foot_ct:"Contact",foot_home:"Home",skip:"Skip to content"},
es:{nav_feat:"Funciones",nav_dl:"Descargar",nav_qr:"Móvil → TV",nav_ct:"Contacto",foot_priv:"Política de privacidad",foot_terms:"Términos de uso",foot_ct:"Contacto",foot_home:"Inicio",skip:"Saltar al contenido"},
fr:{nav_feat:"Fonctions",nav_dl:"Télécharger",nav_qr:"Téléphone → TV",nav_ct:"Contact",foot_priv:"Politique de confidentialité",foot_terms:"Conditions d'utilisation",foot_ct:"Contact",foot_home:"Accueil",skip:"Aller au contenu"},
de:{nav_feat:"Funktionen",nav_dl:"Download",nav_qr:"Handy → TV",nav_ct:"Kontakt",foot_priv:"Datenschutz",foot_terms:"Nutzungsbedingungen",foot_ct:"Kontakt",foot_home:"Startseite",skip:"Zum Inhalt springen"},
it:{nav_feat:"Funzioni",nav_dl:"Scarica",nav_qr:"Telefono → TV",nav_ct:"Contatti",foot_priv:"Informativa sulla privacy",foot_terms:"Termini di utilizzo",foot_ct:"Contatti",foot_home:"Home",skip:"Vai al contenuto"}
};
function jhLang(){
  try{var q=(location.search.match(/[?&]lang=([a-z]{2})/)||[])[1];if(q&&JH_LANGS.indexOf(q)>=0)return q}catch(e){}
  try{var s=localStorage.getItem("jhiptv.site.lang");if(JH_LANGS.indexOf(s)>=0)return s}catch(e){}
  var l=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||"en"];
  for(var i=0;i<l.length;i++){var c=String(l[i]).slice(0,2).toLowerCase();if(JH_LANGS.indexOf(c)>=0)return c}
  return"en";
}
var JHL="en",JHD={};
function jt(k){var d=JHD[JHL]||{},c=JH_COMMON[JHL]||{};return d[k]!=null?d[k]:c[k]!=null?c[k]:(JHD.pt&&JHD.pt[k]!=null?JHD.pt[k]:(JH_COMMON.pt[k]||k))}
function jhApply(l){
  JHL=l;try{localStorage.setItem("jhiptv.site.lang",l)}catch(e){}
  document.documentElement.lang=l;
  var q=function(s){return document.querySelectorAll(s)};
  [].forEach.call(q("[data-i]"),function(e){e.textContent=jt(e.getAttribute("data-i"))});
  [].forEach.call(q("[data-ih]"),function(e){e.innerHTML=jt(e.getAttribute("data-ih"))});
  [].forEach.call(q("[data-ip]"),function(e){e.setAttribute("placeholder",jt(e.getAttribute("data-ip")))});
  [].forEach.call(q("[data-ia]"),function(e){e.setAttribute("aria-label",jt(e.getAttribute("data-ia")))});
  [].forEach.call(q("[data-ialt]"),function(e){e.setAttribute("alt",jt(e.getAttribute("data-ialt")))});
  [].forEach.call(q("img[data-src]"),function(e){e.src=e.getAttribute("data-src").replace("{l}",l)});
  [].forEach.call(q("[data-host]"),function(e){e.textContent=location.host+e.getAttribute("data-host")});
  if(jt("title")!=="title")document.title=jt("title");
  var m=document.querySelector('meta[name="description"]');if(m&&jt("desc")!=="desc")m.setAttribute("content",jt("desc"));
  var s=document.getElementById("langSel");if(s)s.value=l;
  if(window.jhOnLang)window.jhOnLang(l);
}
function jhInit(dict){
  JHD=dict||{};
  var s=document.getElementById("langSel");if(s)s.addEventListener("change",function(){jhApply(s.value)});
  jhApply(jhLang());
}

/* ===== bandeiras e seletor de idioma com bandeira ===== */
var JH_FLAGS={
pt:'<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#DA291C"/><rect width="12" height="20" fill="#046A38"/><circle cx="12" cy="10" r="4.4" fill="#FFE900"/><rect x="10" y="7.6" width="4" height="4.8" rx="1.2" fill="#DA291C"/><rect x="11" y="8.6" width="2" height="2.6" rx=".6" fill="#fff"/></svg>',
en:'<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#012169"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.5"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#C8102E" stroke-width="3.4"/></svg>',
es:'<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/></svg>',
fr:'<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#EF4135"/><rect width="20" height="20" fill="#fff"/><rect width="10" height="20" fill="#0055A4"/></svg>',
de:'<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#FFCE00"/><rect width="30" height="13.4" fill="#DD0000"/><rect width="30" height="6.7" fill="#000"/></svg>',
it:'<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#CE2B37"/><rect width="20" height="20" fill="#fff"/><rect width="10" height="20" fill="#009246"/></svg>'};
function jhFlag(l){return'<span class="flag">'+(JH_FLAGS[l]||"")+'</span>'}
function jhFlagPicker(){
  var s=document.getElementById("langSel");if(!s||s.getAttribute("data-fp"))return;s.setAttribute("data-fp","1");
  var box=s.parentNode;box.classList.add("lp-on");
  var b=document.createElement("button");b.type="button";b.className="lp-btn";b.setAttribute("aria-haspopup","listbox");b.setAttribute("aria-expanded","false");b.setAttribute("aria-label",s.getAttribute("aria-label")||"Language");
  var m=document.createElement("ul");m.className="lp-menu";m.setAttribute("role","listbox");m.hidden=true;
  [].forEach.call(s.options,function(o){var li=document.createElement("li");li.setAttribute("role","option");li.tabIndex=-1;li.setAttribute("data-v",o.value);li.innerHTML=jhFlag(o.value)+"<span>"+o.textContent+"</span>";m.appendChild(li)});
  box.appendChild(b);box.appendChild(m);
  function paint(){var o=s.options[s.selectedIndex];b.innerHTML=jhFlag(s.value)+'<span class="lp-n">'+(o?o.textContent:"")+'</span><i class="lp-c"></i>';[].forEach.call(m.children,function(li){li.setAttribute("aria-selected",String(li.getAttribute("data-v")===s.value))})}
  function open(v){m.hidden=!v;b.setAttribute("aria-expanded",String(v));box.classList.toggle("open",v);if(v){var c=m.querySelector('[aria-selected="true"]')||m.firstChild;c.focus()}}
  b.addEventListener("click",function(e){e.stopPropagation();open(m.hidden)});
  m.addEventListener("click",function(e){var li=e.target.closest("li");if(!li)return;s.value=li.getAttribute("data-v");s.dispatchEvent(new Event("change"));open(false);b.focus()});
  m.addEventListener("keydown",function(e){var a=document.activeElement,k=e.key;if(k==="ArrowDown"&&a.nextSibling){e.preventDefault();a.nextSibling.focus()}else if(k==="ArrowUp"&&a.previousSibling){e.preventDefault();a.previousSibling.focus()}else if(k==="Enter"||k===" "){e.preventDefault();a.click()}else if(k==="Escape"){open(false);b.focus()}});
  document.addEventListener("click",function(e){if(!box.contains(e.target))open(false)});
  s.addEventListener("change",paint);paint();
  var prev=window.jhOnLang;window.jhOnLang=function(l){paint();if(prev)prev(l)};
}
/* ===== animações ao aparecer no ecrã ===== */
function jhReveal(sel){
  var els=[].slice.call(document.querySelectorAll(sel));
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  els.forEach(function(e){var p=e.parentNode,i=[].indexOf.call(p.children,e);e.classList.add("rv");e.style.setProperty("--d",Math.min(i,8)*70+"ms")});
  if(reduce||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in")});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:.12});
  els.forEach(function(e){io.observe(e)});
}
(function(){var go=function(){jhFlagPicker()};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();

/* ===== v3: efeitos modernos (barra de progresso, cabeçalho, inclinação 3D, luz que segue o rato, contadores) ===== */
function jhModern(){
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,fine=window.matchMedia&&matchMedia("(pointer:fine)").matches;
  var top=document.querySelector(".top"),bar=document.getElementById("sprog"),tick=false;
  function onS(){tick=false;var y=window.scrollY||0,h=document.documentElement.scrollHeight-innerHeight;if(bar)bar.style.transform="scaleX("+(h>0?Math.min(1,y/h):0)+")";if(top)top.classList.toggle("scrolled",y>40)}
  addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(onS)}},{passive:true});onS();
  /* contadores */
  var cs=[].slice.call(document.querySelectorAll("[data-cnt]"));
  function run(e){var n=+e.getAttribute("data-cnt"),txt=e.getAttribute("data-txt");if(reduce||!n){e.textContent=txt||n;return}var t0=null;function st(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1200),v=Math.round(n*(1-Math.pow(1-k,3)));e.textContent=v;if(k<1)requestAnimationFrame(st);else e.textContent=txt||n}requestAnimationFrame(st)}
  if("IntersectionObserver" in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){run(x.target);io.unobserve(x.target)}})},{threshold:.6});cs.forEach(function(e){io.observe(e)})}else cs.forEach(run);
  if(reduce||!fine)return;
  /* inclinação 3D do palco do herói */
  var st=document.querySelector(".stage");
  if(st){st.addEventListener("mousemove",function(e){var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;st.style.setProperty("--rx",(-y*6).toFixed(2)+"deg");st.style.setProperty("--ry",(x*8).toFixed(2)+"deg")});st.addEventListener("mouseleave",function(){st.style.setProperty("--rx","0deg");st.style.setProperty("--ry","0deg")})}
  /* luz que segue o rato nos cartões */
  [].forEach.call(document.querySelectorAll(".feat .f,.store,.qa,.plat li,.stat"),function(c){c.classList.add("glowc");c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})});
  /* botões "magnéticos" */
  [].forEach.call(document.querySelectorAll(".hero2 .btn"),function(b){b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+((e.clientX-r.left-r.width/2)*.12).toFixed(1)+"px,"+((e.clientY-r.top-r.height/2)*.2).toFixed(1)+"px)"});b.addEventListener("mouseleave",function(){b.style.transform=""})});
}

/* ===== v4: partículas, título palavra a palavra, frases a rodar, parallax, cursor de luz ===== */
var JH_RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function jhSplitH1(){var h=document.querySelector(".hero2 h1");if(!h||JH_RM)return;var n=0;
  (function walk(el){[].slice.call(el.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return}var s=document.createElement("span");s.className="w";s.style.setProperty("--i",n++);s.textContent=w;f.appendChild(s)});el.replaceChild(f,c)}else if(c.nodeType===1)walk(c)})})(h);
  [].forEach.call(h.querySelectorAll("em"),function(em){var nx=em.nextSibling,last=em.querySelector(".w:last-of-type");if(!last)return;var ws=em.querySelectorAll(".w");last=ws[ws.length-1];
    if(nx&&nx.nodeType===1&&nx.classList.contains("w")&&/^[,.;:!?»)]+$/.test(nx.textContent)){last.textContent+=nx.textContent;nx.parentNode.removeChild(nx)}});
  h.classList.remove("sp");void h.offsetWidth;h.classList.add("sp")}
var JH_ROT=null;
function jhRot(list){var el=document.getElementById("rotW");if(!el)return;var a=String(list||"").split("|").filter(Boolean),i=0;clearInterval(JH_ROT);if(!a.length)return;
  function show(){el.classList.remove("in");void el.offsetWidth;el.textContent=a[i%a.length];el.classList.add("in");i++}show();if(!JH_RM)JH_ROT=setInterval(show,2200)}
function jhFx(){
  if(JH_RM)return;var fine=window.matchMedia&&matchMedia("(pointer:fine)").matches;
  /* cursor de luz */
  var cur=document.getElementById("cur");if(cur&&fine){addEventListener("mousemove",function(e){cur.style.transform="translate("+e.clientX+"px,"+e.clientY+"px)";cur.classList.add("on")},{passive:true});document.addEventListener("mouseleave",function(){cur.classList.remove("on")})}
  /* parallax */
  var ph=document.querySelector(".phf"),tv=document.querySelector(".tvf"),fr=[].slice.call(document.querySelectorAll(".alt .media")),tk=false;
  function par(){tk=false;var y=scrollY;if(ph&&y<1200)ph.style.translate="0 "+(-y*.12).toFixed(1)+"px";if(tv&&y<1200)tv.style.scale=String(1-Math.min(y,600)/600*.04);
    fr.forEach(function(m){var r=m.getBoundingClientRect(),c=(r.top+r.height/2-innerHeight/2)/innerHeight;if(Math.abs(c)<1.2)m.style.translate="0 "+(c*-28).toFixed(1)+"px"})}
  addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(par)}},{passive:true});par();
  /* partículas ligadas no herói */
  var cv=document.getElementById("fx");if(!cv||!cv.getContext)return;var cx=cv.getContext("2d"),W,H,P=[],mx=-999,my=-999,dpr=Math.min(2,window.devicePixelRatio||1),vis=true;
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);var n=Math.round(Math.min(90,W*H/16000));P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.6+.6,h:Math.random()<.5})}
  size();addEventListener("resize",size);
  cv.parentNode.addEventListener("mousemove",function(e){var r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});cv.parentNode.addEventListener("mouseleave",function(){mx=my=-999});
  if("IntersectionObserver" in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(cv);
  (function loop(){requestAnimationFrame(loop);if(!vis||document.hidden)return;cx.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){var p=P[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      var dx=p.x-mx,dy=p.y-my,d=dx*dx+dy*dy;if(d<14000){p.x+=dx*.012;p.y+=dy*.012}
      cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fillStyle=p.h?"rgba(255,181,71,.85)":"rgba(255,122,69,.7)";cx.fill();
      for(var j=i+1;j<P.length;j++){var q=P[j],ex=p.x-q.x,ey=p.y-q.y,e2=ex*ex+ey*ey;if(e2<13000){cx.strokeStyle="rgba(255,170,90,"+(0.16*(1-e2/13000)).toFixed(3)+")";cx.lineWidth=1;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
      if(d<22000){cx.strokeStyle="rgba(255,200,120,"+(0.35*(1-d/22000)).toFixed(3)+")";cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(mx,my);cx.stroke()}}
  })();
}
