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
