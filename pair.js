/* JH IPTV — enviar a lista do telemóvel para a TV (cifrado com o código da TV) */
var JHPAIR=(function(){
  var A="23456789ABCDEFGHJKLMNPQRSTUVWXYZ",RELAY="https://ntfy.sh/";
  function u8(s){s=unescape(encodeURIComponent(s));var b=new Uint8Array(s.length);for(var i=0;i<s.length;i++)b[i]=s.charCodeAt(i);return b}
  function s8(b){var s="";for(var i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return decodeURIComponent(escape(s))}
  function b64(b){var s="";for(var i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return btoa(s)}
  function ub64(t){var s=atob(t),b=new Uint8Array(s.length);for(var i=0;i<s.length;i++)b[i]=s.charCodeAt(i);return b}
  function hex(b){var s="";for(var i=0;i<b.length;i++)s+=(b[i]<16?"0":"")+b[i].toString(16);return s}
  function norm(c){c=String(c||"").toUpperCase();var o="";for(var i=0;i<c.length;i++)if(A.indexOf(c.charAt(i))>=0)o+=c.charAt(i);return o}
  function valid(c){return norm(c).length===12}
  function newCode(){var r=nacl.randomBytes(12),c="";for(var i=0;i<12;i++)c+=A.charAt(r[i]&31);return c}
  function fmt(c){c=norm(c);return c.slice(0,4)+"-"+c.slice(4,8)+"-"+c.slice(8,12)}
  function derive(c){var h=nacl.hash(u8("jhiptv-pair-v1:"+norm(c)));return{key:h.subarray(0,32),topic:"jhp"+hex(h.subarray(32,44))}}
  function seal(c,o){var d=derive(c),n=nacl.randomBytes(24),bx=nacl.secretbox(u8(JSON.stringify(o)),n,d.key),all=new Uint8Array(24+bx.length);all.set(n,0);all.set(bx,24);return b64(all)}
  function open(c,t){try{var d=derive(c),b=ub64(String(t).trim());if(b.length<41)return null;var m=nacl.secretbox.open(b.subarray(24),b.subarray(0,24),d.key);return m?JSON.parse(s8(m)):null}catch(e){return null}}
  function topicUrl(c){return RELAY+derive(c).topic}
  return{norm:norm,valid:valid,newCode:newCode,fmt:fmt,derive:derive,seal:seal,open:open,topicUrl:topicUrl}
})();
