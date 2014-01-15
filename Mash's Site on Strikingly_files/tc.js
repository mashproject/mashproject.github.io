// v1.8.0,  2013-12-30, copyright Gert-Jan Strik
var iTS=new Date();var iBASE;var iP;function io(v,t){return v.indexOf(t)}
function wc(n,v,t){document.cookie=n+'='+v+'; path=/; expires='+t.toGMTString()+';'};function y(n){return(n>200?n:1900+n)}
function cv(s){var i,e,c,t='';c=document.cookie;i=io(c,s);if(i>-1){s=c.indexOf('=',i)+1;e=c.indexOf(';',i);if(e<0)e=c.length
t=ss(c,s,e)};return t};function ss(s,i,j){return s.substring(i,j)};function d(n){var s=''+n;return(s.length<2?'0'+s:s)}
function iOL(){var s,t=new Date();s=t.valueOf()-iTS.valueOf();t.setTime(t.getTime()+36E5);wc('iSPEED',s,t);wc('iPAGE',iP,t)}
function iTN(e){if(document.getElementsByTagName)return document.getElementsByTagName(e)};function iMA(){var i,b,a=iTN('a');if(a)
for(i=a.length-1;i>=0;i--){b=a[i];if(b.name&&b.href&&!b.I){b.I=b.onclick;if(!b.I){b.I=1;b.onclick=iTC}else b.onclick=function(e){
iTC(e);return(this.I(e))}}};a=iTN('form');if(a)for(i=a.length-1;i>=0;i--){b=a[i];if(b.name&&!b.I){b.I=b.onsubmit;if(!b.I){b.I=1
b.onsubmit=iTC}else b.onsubmit=function(e){if(this.I(e))iTC(e);else return false}}}};function iTC(e){var b,i,r,t=e;r=iBASE;if(!e)
var e=window.event;if(e.target){t=e.target}else if(e.srcElement)t=e.srcElement;for(i=0;i<10;i++){b=t.nodeName.toLowerCase()
if(b!='a'&&b!='form')t=t.parentNode};i=r.indexOf('&pp=');i=r.indexOf('&',i+1);b=new Image();b.src=r.substring(0,i)+'+%3E+'
+escape(t.name)+r.substring(i)+'&d2='+parseInt(2E9*Math.random())};function iTP(t){var b,i,j,r=iBASE;i=r.indexOf('&pp=')+4
j=r.indexOf('&',i+1);b=new Image();b.src=r.substring(0,i)+escape(t)+r.substring(j)+'&d2='+parseInt(2E9 * Math.random())}
function iT(pn,usr,to){var x,a,b,cu,h,o,l,ls,g,z,p,u,t,r=iHOST+'t.asp?pn='+pn+'&user='+escape(usr)+'&to='+to;u='undefined'
a=(typeof iMODE==u?0:iMODE);z=window.location.href;if(io(z,'http://')==0)z=ss(z,7,z.length);if(io(z,'https://')==0)
z=ss(z,8,z.length);var q=io(z,'/');h='';if(q>0){h=ss(z,0,q);z=ss(z,q+1,z.length)};ls=iTN('link');if(ls)for(i=0;i<ls.length;i++){
l=ls[i];if(l.getAttribute('rel')=='canonical'){cu=l.getAttribute('href');if(cu&&cu!='')z=cu.replace(/^https?:\/\/[^\/]*\//i,'')
if(io(z,'http:')!=io(z,'https'))z='';if(z.charAt(0)=='/')z=z.substring(1,z.length)}};q=io(z,'?');if(q>0){p='&'+ss(z,q+1,z.length)
+'&';z=ss(z,0,q);q=io(p,'&iCI=');if(q>=0){p=ss(p,q+5,p.length);r+='&ci='+escape(ss(p,0,io(p,'&')))}};q=io(z,'#');if(q>0)
z=ss(z,0,q);x=document.title;if(typeof iPAGE!=u&&iPAGE!='')z=iPAGE;else if(io(x,'Not Found')>0||io(x,'cannot be found')>0
||io(x,'ot_found')>0)z='404 Page Not Found < '+z;iP=z;r+='&e='+h+'&pp='+escape(z)+'&d='+parseInt(2E9*Math.random());if(a>0)
r+='&m='+a;else{x='MSIE ';a=navigator;b=a.appVersion.charAt(0);a=a.userAgent;p='iPAGE';g=document.referrer;w=io(a,x);x=io(a,x+4)
o=g;r+='&l='+a.length;z=0;if(b>3){t=new Date();r+='&tt='+d(t.getMonth()+1)+'%2F'+d(t.getDate())+'%2F'+y(t.getYear())+'+'
+d(t.getHours())+'%3A'+d(t.getMinutes())+'&j='+(navigator.javaEnabled()?1:0);q=cv(p);t.setTime(t.getTime()+36E5);wc(p,'-',t)
r+='&m=0&spd='+cv('iSPEED')+'&c='+(screen.pixelDepth?screen.pixelDepth:screen.colorDepth)+'&p3='+q+'&w='+screen.width+'&h='
+screen.height+'&ck='+(cv(p)!=''?1:0)+(typeof window.devicePixelRatio==u?'':'&r='+window.devicePixelRatio);if((w>0&&x<0&&b>3
&&io(a,'Mac_P')<0)||b>4){l='';while(o!=u){l+='parent.';o=u;o=eval('try{'+l+'document\.referrer}catch(e){}');if(o==g)o=u;if(o!=u)
g=o};if(eval('try{new ActiveXObject("AgControl.AgControl")}catch(e){}'))z=1;o=0;p=navigator.plugins;if(p)if(p['WPFe Plug-In']
||p["Silverlight Plug-In"])z=1;l='Shockwave Flash';if(p)if(p[l+' 2.0']||p[l])o=1;for(a=19;a>1;a--){l=(a<3)?'':'.'+a
if(eval('try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash'+l+'")}catch(e){}'))o=1}};if(!window.I){window.I=window.onload
if(!window.I){window.I=1;window.onload=iOL}else window.onload=function(e){iOL();return(window.I(e))}}}r+='&ref='+escape(g)+'&f='
+o+'&sl='+z};iBASE=r;if(typeof iVL!=u&&iVL!='')r+='&vl='+escape(iVL);document.write('<img src="'+r
+'" width="5" height="5" style="position:absolute;bottom:0;right:0" />');iMA();setTimeout('iMA()',1000)}