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
