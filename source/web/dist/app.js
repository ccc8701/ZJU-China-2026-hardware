/*! Third-party notices: Three.js (MIT), Lucide (ISC)
The MIT License

Copyright © 2010-2025 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


ISC License

Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/
var sf=(n,e,t=[])=>{let i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(e).forEach(r=>{i.setAttribute(r,String(e[r]))}),t.length&&t.forEach(r=>{let s=sf(...r);i.appendChild(s)}),i},of=([n,e,t])=>sf(n,e,t);var np=n=>Array.from(n.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),ip=n=>typeof n=="string"?n:!n||!n.class?"":n.class&&typeof n.class=="string"?n.class.split(" "):n.class&&Array.isArray(n.class)?n.class:"",rp=n=>n.flatMap(ip).map(t=>t.trim()).filter(Boolean).filter((t,i,r)=>r.indexOf(t)===i).join(" "),sp=n=>n.replace(/(\w)(\w*)(_|-|\s*)/g,(e,t,i)=>t.toUpperCase()+i.toLowerCase()),Hl=(n,{nameAttr:e,icons:t,attrs:i})=>{let r=n.getAttribute(e);if(r==null)return;let s=sp(r),o=t[s];if(!o)return console.warn(`${n.outerHTML} icon name was not found in the provided icons object.`);let a=np(n),[l,c,u]=o,f={...c,"data-lucide":r,...i,...a},h=rp(["lucide",`lucide-${r}`,a,i]);h&&Object.assign(f,{class:h});let d=of([l,f,u]);return n.parentNode?.replaceChild(d,n)};var tt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Vl=["svg",tt,[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]]];var Gl=["svg",tt,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];var Wl=["svg",tt,[["path",{d:"M20 6 9 17l-5-5"}]]];var bo=["svg",tt,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]]];var Xl=["svg",tt,[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1"}],["path",{d:"M15 2v2"}],["path",{d:"M15 20v2"}],["path",{d:"M2 15h2"}],["path",{d:"M2 9h2"}],["path",{d:"M20 15h2"}],["path",{d:"M20 9h2"}],["path",{d:"M9 2v2"}],["path",{d:"M9 20v2"}]]];var ql=["svg",tt,[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]]];var Yl=["svg",tt,[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}]]];var Zl=["svg",tt,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]]];var $l=["svg",tt,[["path",{d:"M12 2v20"}],["path",{d:"m15 19-3 3-3-3"}],["path",{d:"m19 9 3 3-3 3"}],["path",{d:"M2 12h20"}],["path",{d:"m5 9-3 3 3 3"}],["path",{d:"m9 5 3-3 3 3"}]]];var wo=["svg",tt,[["path",{d:"m15 9-6 6"}],["path",{d:"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"}],["path",{d:"m9 9 6 6"}]]];var Kl=["svg",tt,[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}]]];var Jl=["svg",tt,[["polygon",{points:"6 3 20 12 6 21 6 3"}]]];var jl=["svg",tt,[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19"}]]];var Eo=["svg",tt,[["path",{d:"M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"}],["path",{d:"m15.194 13.707 3.814 1.86-1.86 3.814"}],["path",{d:"M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"}]]];var Ql=["svg",tt,[["line",{x1:"21",x2:"14",y1:"4",y2:"4"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22"}]]];var ec=["svg",tt,[["line",{x1:"2",x2:"22",y1:"12",y2:"12"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22"}],["path",{d:"m20 16-4-4 4-4"}],["path",{d:"m4 8 4 4-4 4"}],["path",{d:"m16 4-4 4-4-4"}],["path",{d:"m8 20 4-4 4 4"}]]];var tc=["svg",tt,[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]]];var nc=["svg",tt,[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]]];var ic=["svg",tt,[["path",{d:"m19 5 3-3"}],["path",{d:"m2 22 3-3"}],["path",{d:"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"}],["path",{d:"M7.5 13.5 10 11"}],["path",{d:"M10.5 16.5 13 14"}],["path",{d:"m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"}]]];var rc=["svg",tt,[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}]]];var sc=["svg",tt,[["path",{d:"M12 20h.01"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}]]];var oc=["svg",tt,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];var af=({icons:n={},nameAttr:e="data-lucide",attrs:t={}}={})=>{if(!Object.values(n).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");let i=document.querySelectorAll(`[${e}]`);if(Array.from(i).forEach(r=>Hl(r,{nameAttr:e,icons:n,attrs:t})),e==="data-lucide"){let r=document.querySelectorAll("[icon-name]");r.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(r).forEach(s=>Hl(s,{nameAttr:"icon-name",icons:n,attrs:t})))}};var Wi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Xi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},kf=0,Xc=1,zf=2;var qc=1,Ta=2,si=3,xi=0,qt=1,Ot=2,bi=0,sr=1,Yc=2,Zc=3,$c=4,Hf=5,Oi=100,Vf=101,Gf=102,Wf=103,Xf=104,qf=200,Yf=201,Zf=202,$f=203,Jo=204,jo=205,Kf=206,Jf=207,jf=208,Qf=209,eh=210,th=211,nh=212,ih=213,rh=214,Aa=0,Ca=1,Ra=2,or=3,Pa=4,Ia=5,La=6,Da=7,Ua=0,sh=1,oh=2,wi=0,ah=1,lh=2,ch=3,Fa=4,uh=5,fh=6,hh=7;var Kc=300,pr=301,mr=302,Na=303,Oa=304,no=306,Qo=1e3,Ni=1001,ea=1002,yn=1003,dh=1004;var io=1005;var An=1006,Ba=1007;var qi=1008;var $n=1009,Jc=1010,jc=1011,is=1012,ka=1013,Yi=1014,Kn=1015,rs=1016,za=1017,Ha=1018,ss=1020,Qc=35902,eu=35899,tu=1021,nu=1022,Sn=1023,Wr=1026,os=1027,Va=1028,Ga=1029,iu=1030,Wa=1031;var Xa=1033,ro=33776,so=33777,oo=33778,ao=33779,qa=35840,Ya=35841,Za=35842,$a=35843,Ka=36196,Ja=37492,ja=37496,Qa=37808,el=37809,tl=37810,nl=37811,il=37812,rl=37813,sl=37814,ol=37815,al=37816,ll=37817,cl=37818,ul=37819,fl=37820,hl=37821,dl=36492,pl=36494,ml=36495,gl=36283,xl=36284,_l=36285,yl=36286;var Rs=2300,ta=2301,Ko=2302,Uc=2400,Fc=2401,Nc=2402;var ph=3200,mh=3201;var vl=0,gh=1,Jn="",gn="srgb",ar="srgb-linear",Ps="linear",At="srgb";var ir=7680;var Oc=519,xh=512,_h=513,yh=514,ru=515,vh=516,Mh=517,Sh=518,bh=519,Bc=35044,Ei=35048;var lo="300 es",Zn=2e3,Is=2001;var Qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lf=1234567,Es=Math.PI/180,Xr=180/Math.PI;function gr(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[t&63|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function lt(n,e,t){return Math.max(e,Math.min(t,n))}function su(n,e){return(n%e+e)%e}function op(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function ap(n,e,t){return n!==e?(t-n)/(e-n):0}function Ts(n,e,t){return(1-t)*n+t*e}function lp(n,e,t,i){return Ts(n,e,1-Math.exp(-t*i))}function cp(n,e=1){return e-Math.abs(su(n,e*2)-e)}function up(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function fp(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function hp(n,e){return n+Math.floor(Math.random()*(e-n+1))}function dp(n,e){return n+Math.random()*(e-n)}function pp(n){return n*(.5-Math.random())}function mp(n){n!==void 0&&(lf=n);let e=lf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function gp(n){return n*Es}function xp(n){return n*Xr}function _p(n){return(n&n-1)===0&&n!==0}function yp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function vp(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Mp(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),f=s((e-i)/2),h=o((e-i)/2),d=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*f,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*f,a*c);break;case"ZXZ":n.set(l*f,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Vr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function mn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var co={DEG2RAD:Es,RAD2DEG:Xr,generateUUID:gr,clamp:lt,euclideanModulo:su,mapLinear:op,inverseLerp:ap,lerp:Ts,damp:lp,pingpong:cp,smoothstep:up,smootherstep:fp,randInt:hp,randFloat:dp,randFloatSpread:pp,seededRandom:mp,degToRad:gp,radToDeg:xp,isPowerOfTwo:_p,ceilPowerOfTwo:yp,floorPowerOfTwo:vp,setQuaternionFromProperEuler:Mp,normalize:mn,denormalize:Vr},Me=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},On=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a,p=l*h+c*d+u*g+f*_,A=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let E=Math.sqrt(v),T=Math.atan2(E,p*A);m=Math.sin(m*T)/E,a=Math.sin(a*T)/E}let y=a*A;if(l=l*m+h*y,c=c*m+d*y,u=u*m+g*y,f=f*m+_*y,m===1-a){let E=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=E,c*=E,u*=E,f*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*f+l*d-c*h,e[t+1]=l*g+u*h+c*f-a*d,e[t+2]=c*g+u*d+a*h-l*f,e[t+3]=u*g-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>f){let d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){let d=2*Math.sqrt(1+a-i-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+f-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ac.copy(this).projectOnVector(e),this.sub(ac)}reflect(e){return this.sub(ac.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ac=new R,cf=new On,ot=class n{constructor(e,t,i,r,s,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],_=r[0],m=r[3],p=r[6],A=r[1],v=r[4],y=r[7],E=r[2],T=r[5],P=r[8];return s[0]=o*_+a*A+l*E,s[3]=o*m+a*v+l*T,s[6]=o*p+a*y+l*P,s[1]=c*_+u*A+f*E,s[4]=c*m+u*v+f*T,s[7]=c*p+u*y+f*P,s[2]=h*_+d*A+g*E,s[5]=h*m+d*v+g*T,s[8]=h*p+d*y+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,g=t*f+i*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=f*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=d*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(lc.makeScale(e,t)),this}rotate(e){return this.premultiply(lc.makeRotation(-e)),this}translate(e,t){return this.premultiply(lc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},lc=new ot;function ou(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ls(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function wh(){let n=Ls("canvas");return n.style.display="block",n}var uf={};function qr(n){n in uf||(uf[n]=!0,console.warn(n))}function Eh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var ff=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hf=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Sp(){let n={enabled:!0,workingColorSpace:ar,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===At&&(r.r=gi(r.r),r.g=gi(r.g),r.b=gi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===At&&(r.r=Gr(r.r),r.g=Gr(r.g),r.b=Gr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Jn?Ps:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return qr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return qr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ar]:{primaries:e,whitePoint:i,transfer:Ps,toXYZ:ff,fromXYZ:hf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gn},outputColorSpaceConfig:{drawingBufferColorSpace:gn}},[gn]:{primaries:e,whitePoint:i,transfer:At,toXYZ:ff,fromXYZ:hf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gn}}}),n}var gt=Sp();function gi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Gr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Rr,na=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Rr===void 0&&(Rr=Ls("canvas")),Rr.width=e.width,Rr.height=e.height;let r=Rr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Rr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ls("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=gi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(gi(t[i]/255)*255):t[i]=gi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},bp=0,Yr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=gr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(cc(r[o].image)):s.push(cc(r[o]))}else s=cc(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function cc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?na.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var wp=0,uc=new R,vn=class n extends Qn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Ni,r=Ni,s=An,o=qi,a=Sn,l=$n,c=n.DEFAULT_ANISOTROPY,u=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=gr(),this.name="",this.source=new Yr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(uc).x}get height(){return this.source.getSize(uc).y}get depth(){return this.source.getSize(uc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qo:e.x=e.x-Math.floor(e.x);break;case Ni:e.x=e.x<0?0:1;break;case ea:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qo:e.y=e.y-Math.floor(e.y);break;case Ni:e.y=e.y<0?0:1;break;case ea:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=Kc;vn.DEFAULT_ANISOTROPY=1;var Tt=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(c+1)/2,y=(d+1)/2,E=(p+1)/2,T=(u+h)/4,P=(f+_)/4,U=(g+m)/4;return v>y&&v>E?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=T/i,s=P/i):y>E?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=T/r,s=U/r):E<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),i=P/s,r=U/s),this.set(i,r,s,t),this}let A=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(f-_)/A,this.z=(h-u)/A,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ia=class extends Qn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);let r={width:e,height:t,depth:i.depth},s=new vn(r);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:An,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Yr(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ei=class extends ia{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Ds=class extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Zr=class extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ti=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Xn):Xn.fromBufferAttribute(s,o),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),To.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),To.copy(i.boundingBox)),To.applyMatrix4(e.matrixWorld),this.union(To)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gs),Ao.subVectors(this.max,gs),Pr.subVectors(e.a,gs),Ir.subVectors(e.b,gs),Lr.subVectors(e.c,gs),Ri.subVectors(Ir,Pr),Pi.subVectors(Lr,Ir),Qi.subVectors(Pr,Lr);let t=[0,-Ri.z,Ri.y,0,-Pi.z,Pi.y,0,-Qi.z,Qi.y,Ri.z,0,-Ri.x,Pi.z,0,-Pi.x,Qi.z,0,-Qi.x,-Ri.y,Ri.x,0,-Pi.y,Pi.x,0,-Qi.y,Qi.x,0];return!fc(t,Pr,Ir,Lr,Ao)||(t=[1,0,0,0,1,0,0,0,1],!fc(t,Pr,Ir,Lr,Ao))?!1:(Co.crossVectors(Ri,Pi),t=[Co.x,Co.y,Co.z],fc(t,Pr,Ir,Lr,Ao))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fi=[new R,new R,new R,new R,new R,new R,new R,new R],Xn=new R,To=new ti,Pr=new R,Ir=new R,Lr=new R,Ri=new R,Pi=new R,Qi=new R,gs=new R,Ao=new R,Co=new R,er=new R;function fc(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){er.fromArray(n,s);let a=r.x*Math.abs(er.x)+r.y*Math.abs(er.y)+r.z*Math.abs(er.z),l=e.dot(er),c=t.dot(er),u=i.dot(er);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var Ep=new ti,xs=new R,hc=new R,_i=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Ep.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xs.subVectors(e,this.center);let t=xs.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(xs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xs.copy(e.center).add(hc)),this.expandByPoint(xs.copy(e.center).sub(hc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},hi=new R,dc=new R,Ro=new R,Ii=new R,pc=new R,Po=new R,mc=new R,lr=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){dc.copy(e).add(t).multiplyScalar(.5),Ro.copy(t).sub(e).normalize(),Ii.copy(this.origin).sub(dc);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Ro),a=Ii.dot(this.direction),l=-Ii.dot(Ro),c=Ii.lengthSq(),u=Math.abs(1-o*o),f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){let _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(dc).addScaledVector(Ro,h),d}intersectSphere(e,t){hi.subVectors(e.center,this.origin);let i=hi.dot(this.direction),r=hi.dot(hi)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,i,r,s){pc.subVectors(t,e),Po.subVectors(i,e),mc.crossVectors(pc,Po);let o=this.direction.dot(mc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ii.subVectors(this.origin,e);let l=a*this.direction.dot(Po.crossVectors(Ii,Po));if(l<0)return null;let c=a*this.direction.dot(pc.cross(Ii));if(c<0||l+c>o)return null;let u=-a*Ii.dot(mc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vt=class n{constructor(e,t,i,r,s,o,a,l,c,u,f,h,d,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,f,h,d,g,_,m)}set(e,t,i,r,s,o,a,l,c,u,f,h,d,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/Dr.setFromMatrixColumn(e,0).length(),s=1/Dr.setFromMatrixColumn(e,1).length(),o=1/Dr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){let h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){let h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h-_*a,t[4]=-o*f,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=g*c-d,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){let h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tp,e,Ap)}lookAt(e,t,i){let r=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),Li.crossVectors(i,En),Li.lengthSq()===0&&(Math.abs(i.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),Li.crossVectors(i,En)),Li.normalize(),Io.crossVectors(En,Li),r[0]=Li.x,r[4]=Io.x,r[8]=En.x,r[1]=Li.y,r[5]=Io.y,r[9]=En.y,r[2]=Li.z,r[6]=Io.z,r[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],A=i[3],v=i[7],y=i[11],E=i[15],T=r[0],P=r[4],U=r[8],b=r[12],M=r[1],I=r[5],L=r[9],G=r[13],D=r[2],H=r[6],q=r[10],W=r[14],z=r[3],Y=r[7],j=r[11],ae=r[15];return s[0]=o*T+a*M+l*D+c*z,s[4]=o*P+a*I+l*H+c*Y,s[8]=o*U+a*L+l*q+c*j,s[12]=o*b+a*G+l*W+c*ae,s[1]=u*T+f*M+h*D+d*z,s[5]=u*P+f*I+h*H+d*Y,s[9]=u*U+f*L+h*q+d*j,s[13]=u*b+f*G+h*W+d*ae,s[2]=g*T+_*M+m*D+p*z,s[6]=g*P+_*I+m*H+p*Y,s[10]=g*U+_*L+m*q+p*j,s[14]=g*b+_*G+m*W+p*ae,s[3]=A*T+v*M+y*D+E*z,s[7]=A*P+v*I+y*H+E*Y,s[11]=A*U+v*L+y*q+E*j,s[15]=A*b+v*G+y*W+E*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*d-i*l*d)+_*(+t*l*d-t*c*h+s*o*h-r*o*d+r*c*u-s*l*u)+m*(+t*c*f-t*a*d-s*o*f+i*o*d+s*a*u-i*c*u)+p*(-r*a*u-t*l*f+t*a*h+r*o*f-i*o*h+i*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],A=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,v=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,y=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,E=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,T=t*A+i*v+r*y+s*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/T;return e[0]=A*P,e[1]=(_*h*s-f*m*s-_*r*d+i*m*d+f*r*p-i*h*p)*P,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*p+i*l*p)*P,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*d-i*l*d)*P,e[4]=v*P,e[5]=(u*m*s-g*h*s+g*r*d-t*m*d-u*r*p+t*h*p)*P,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*P,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*d+t*l*d)*P,e[8]=y*P,e[9]=(g*f*s-u*_*s-g*i*d+t*_*d+u*i*p-t*f*p)*P,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*p+t*a*p)*P,e[11]=(u*a*s-o*f*s-u*i*c+t*f*c+o*i*d-t*a*d)*P,e[12]=E*P,e[13]=(u*_*r-g*f*r+g*i*h-t*_*h-u*i*m+t*f*m)*P,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*m-t*a*m)*P,e[15]=(o*f*r-u*a*r+u*i*l-t*f*l-o*i*h+t*a*h)*P,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,A=l*c,v=l*u,y=l*f,E=i.x,T=i.y,P=i.z;return r[0]=(1-(_+p))*E,r[1]=(d+y)*E,r[2]=(g-v)*E,r[3]=0,r[4]=(d-y)*T,r[5]=(1-(h+p))*T,r[6]=(m+A)*T,r[7]=0,r[8]=(g+v)*P,r[9]=(m-A)*P,r[10]=(1-(h+_))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,s=Dr.set(r[0],r[1],r[2]).length(),o=Dr.set(r[4],r[5],r[6]).length(),a=Dr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],qn.copy(this);let c=1/s,u=1/o,f=1/a;return qn.elements[0]*=c,qn.elements[1]*=c,qn.elements[2]*=c,qn.elements[4]*=u,qn.elements[5]*=u,qn.elements[6]*=u,qn.elements[8]*=f,qn.elements[9]*=f,qn.elements[10]*=f,t.setFromRotationMatrix(qn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Zn,l=!1){let c=this.elements,u=2*s/(t-e),f=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r),g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===Zn)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Is)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Zn,l=!1){let c=this.elements,u=2/(t-e),f=2/(i-r),h=-(t+e)/(t-e),d=-(i+r)/(i-r),g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===Zn)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Is)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Dr=new R,qn=new vt,Tp=new R(0,0,0),Ap=new R(1,1,1),Li=new R,Io=new R,En=new R,df=new vt,pf=new On,Bn=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-lt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return df.makeRotationFromQuaternion(e),this.setFromRotationMatrix(df,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pf.setFromEuler(this),this.setFromQuaternion(pf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Bn.DEFAULT_ORDER="XYZ";var Us=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Cp=0,mf=new R,Ur=new On,di=new vt,Lo=new R,_s=new R,Rp=new R,Pp=new On,gf=new R(1,0,0),xf=new R(0,1,0),_f=new R(0,0,1),yf={type:"added"},Ip={type:"removed"},Fr={type:"childadded",child:null},gc={type:"childremoved",child:null},Nt=class n extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cp++}),this.uuid=gr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new R,t=new Bn,i=new On,r=new R(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new ot}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Us,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ur.setFromAxisAngle(e,t),this.quaternion.multiply(Ur),this}rotateOnWorldAxis(e,t){return Ur.setFromAxisAngle(e,t),this.quaternion.premultiply(Ur),this}rotateX(e){return this.rotateOnAxis(gf,e)}rotateY(e){return this.rotateOnAxis(xf,e)}rotateZ(e){return this.rotateOnAxis(_f,e)}translateOnAxis(e,t){return mf.copy(e).applyQuaternion(this.quaternion),this.position.add(mf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gf,e)}translateY(e){return this.translateOnAxis(xf,e)}translateZ(e){return this.translateOnAxis(_f,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Lo.copy(e):Lo.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(_s,Lo,this.up):di.lookAt(Lo,_s,this.up),this.quaternion.setFromRotationMatrix(di),r&&(di.extractRotation(r.matrixWorld),Ur.setFromRotationMatrix(di),this.quaternion.premultiply(Ur.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yf),Fr.child=e,this.dispatchEvent(Fr),Fr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ip),gc.child=e,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yf),Fr.child=e,this.dispatchEvent(Fr),Fr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,e,Rp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,Pp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};Nt.DEFAULT_UP=new R(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Yn=new R,pi=new R,xc=new R,mi=new R,Nr=new R,Or=new R,vf=new R,_c=new R,yc=new R,vc=new R,Mc=new Tt,Sc=new Tt,bc=new Tt,Fi=class n{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Yn.subVectors(e,t),r.cross(Yn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Yn.subVectors(r,t),pi.subVectors(i,t),xc.subVectors(e,t);let o=Yn.dot(Yn),a=Yn.dot(pi),l=Yn.dot(xc),c=pi.dot(pi),u=pi.dot(xc),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;let h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,mi.x),l.addScaledVector(o,mi.y),l.addScaledVector(a,mi.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Mc.setScalar(0),Sc.setScalar(0),bc.setScalar(0),Mc.fromBufferAttribute(e,t),Sc.fromBufferAttribute(e,i),bc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Mc,s.x),o.addScaledVector(Sc,s.y),o.addScaledVector(bc,s.z),o}static isFrontFacing(e,t,i,r){return Yn.subVectors(i,t),pi.subVectors(e,t),Yn.cross(pi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Yn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;Nr.subVectors(r,i),Or.subVectors(s,i),_c.subVectors(e,i);let l=Nr.dot(_c),c=Or.dot(_c);if(l<=0&&c<=0)return t.copy(i);yc.subVectors(e,r);let u=Nr.dot(yc),f=Or.dot(yc);if(u>=0&&f<=u)return t.copy(r);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Nr,o);vc.subVectors(e,s);let d=Nr.dot(vc),g=Or.dot(vc);if(g>=0&&d<=g)return t.copy(s);let _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Or,a);let m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return vf.subVectors(s,r),a=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(vf,a);let p=1/(m+_+h);return o=_*p,a=h*p,t.copy(i).addScaledVector(Nr,o).addScaledVector(Or,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Th={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},Do={h:0,s:0,l:0};function wc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var nt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=gt.workingColorSpace){return this.r=e,this.g=t,this.b=i,gt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=gt.workingColorSpace){if(e=su(e,1),t=lt(t,0,1),i=lt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=wc(o,s,e+1/3),this.g=wc(o,s,e),this.b=wc(o,s,e-1/3)}return gt.colorSpaceToWorking(this,r),this}setStyle(e,t=gn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gn){let i=Th[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=Gr(e.r),this.g=Gr(e.g),this.b=Gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gn){return gt.workingToColorSpace(cn.copy(this),e),Math.round(lt(cn.r*255,0,255))*65536+Math.round(lt(cn.g*255,0,255))*256+Math.round(lt(cn.b*255,0,255))}getHexString(e=gn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.workingToColorSpace(cn.copy(this),t);let i=cn.r,r=cn.g,s=cn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=gt.workingColorSpace){return gt.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=gn){gt.workingToColorSpace(cn.copy(this),e);let t=cn.r,i=cn.g,r=cn.b;return e!==gn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Di),this.setHSL(Di.h+e,Di.s+t,Di.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Di),e.getHSL(Do);let i=Ts(Di.h,Do.h,t),r=Ts(Di.s,Do.s,t),s=Ts(Di.l,Do.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new nt;nt.NAMES=Th;var Lp=0,ni=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lp++}),this.uuid=gr(),this.name="",this.type="Material",this.blending=sr,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jo,this.blendDst=jo,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ir,this.stencilZFail=ir,this.stencilZPass=ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==sr&&(i.blending=this.blending),this.side!==xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Jo&&(i.blendSrc=this.blendSrc),this.blendDst!==jo&&(i.blendDst=this.blendDst),this.blendEquation!==Oi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==or&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ir&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ir&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ir&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ii=class extends ni{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=Ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Xt=new R,Uo=new Me,Dp=0,Ct=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Bc,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Uo.fromBufferAttribute(this,t),Uo.applyMatrix3(e),this.setXY(t,Uo.x,Uo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix3(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Vr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=mn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vr(t,this.array)),t}setX(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vr(t,this.array)),t}setY(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vr(t,this.array)),t}setW(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),i=mn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),i=mn(i,this.array),r=mn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),i=mn(i,this.array),r=mn(r,this.array),s=mn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bc&&(e.usage=this.usage),e}};var Fs=class extends Ct{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Ns=class extends Ct{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var mt=class extends Ct{constructor(e,t,i){super(new Float32Array(e),t,i)}},Up=0,Fn=new vt,Ec=new Nt,Br=new R,Tn=new ti,ys=new ti,Qt=new R,wt=class n extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=gr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ou(e)?Ns:Fs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new ot().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Fn.makeRotationFromQuaternion(e),this.applyMatrix4(Fn),this}rotateX(e){return Fn.makeRotationX(e),this.applyMatrix4(Fn),this}rotateY(e){return Fn.makeRotationY(e),this.applyMatrix4(Fn),this}rotateZ(e){return Fn.makeRotationZ(e),this.applyMatrix4(Fn),this}translate(e,t,i){return Fn.makeTranslation(e,t,i),this.applyMatrix4(Fn),this}scale(e,t,i){return Fn.makeScale(e,t,i),this.applyMatrix4(Fn),this}lookAt(e){return Ec.lookAt(e),Ec.updateMatrix(),this.applyMatrix4(Ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Br).negate(),this.translate(Br.x,Br.y,Br.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new mt(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Tn.setFromBufferAttribute(s),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _i);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let i=this.boundingSphere.center;if(Tn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];ys.setFromBufferAttribute(a),this.morphTargetsRelative?(Qt.addVectors(Tn.min,ys.min),Tn.expandByPoint(Qt),Qt.addVectors(Tn.max,ys.max),Tn.expandByPoint(Qt)):(Tn.expandByPoint(ys.min),Tn.expandByPoint(ys.max))}Tn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Qt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Qt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Qt.fromBufferAttribute(a,c),l&&(Br.fromBufferAttribute(e,c),Qt.add(Br)),r=Math.max(r,i.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<i.count;U++)a[U]=new R,l[U]=new R;let c=new R,u=new R,f=new R,h=new Me,d=new Me,g=new Me,_=new R,m=new R;function p(U,b,M){c.fromBufferAttribute(i,U),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,M),h.fromBufferAttribute(s,U),d.fromBufferAttribute(s,b),g.fromBufferAttribute(s,M),u.sub(c),f.sub(c),d.sub(h),g.sub(h);let I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(I),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(I),a[U].add(_),a[b].add(_),a[M].add(_),l[U].add(m),l[b].add(m),l[M].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let U=0,b=A.length;U<b;++U){let M=A[U],I=M.start,L=M.count;for(let G=I,D=I+L;G<D;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let v=new R,y=new R,E=new R,T=new R;function P(U){E.fromBufferAttribute(r,U),T.copy(E);let b=a[U];v.copy(b),v.sub(E.multiplyScalar(E.dot(b))).normalize(),y.crossVectors(T,b);let I=y.dot(l[U])<0?-1:1;o.setXYZW(U,v.x,v.y,v.z,I)}for(let U=0,b=A.length;U<b;++U){let M=A[U],I=M.start,L=M.count;for(let G=I,D=I+L;G<D;G+=3)P(e.getX(G+0)),P(e.getX(G+1)),P(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);let r=new R,s=new R,o=new R,a=new R,l=new R,c=new R,u=new R,f=new R;if(e)for(let h=0,d=e.count;h<d;h+=3){let g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u),d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new Ct(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,i);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){let h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mf=new vt,tr=new lr,Fo=new _i,Sf=new R,No=new R,Oo=new R,Bo=new R,Tc=new R,ko=new R,bf=new R,zo=new R,dt=class extends Nt{constructor(e=new wt,t=new ii){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){ko.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],f=s[l];u!==0&&(Tc.fromBufferAttribute(f,e),o?ko.addScaledVector(Tc,u):ko.addScaledVector(Tc.sub(t),u))}t.add(ko)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Fo.copy(i.boundingSphere),Fo.applyMatrix4(s),tr.copy(e.ray).recast(e.near),!(Fo.containsPoint(tr.origin)===!1&&(tr.intersectSphere(Fo,Sf)===null||tr.origin.distanceToSquared(Sf)>(e.far-e.near)**2))&&(Mf.copy(s).invert(),tr.copy(e.ray).applyMatrix4(Mf),!(i.boundingBox!==null&&tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,tr)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],p=o[m.materialIndex],A=Math.max(m.start,d.start),v=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=A,E=v;y<E;y+=3){let T=a.getX(y),P=a.getX(y+1),U=a.getX(y+2);r=Ho(this,p,e,i,c,u,f,T,P,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let A=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);r=Ho(this,o,e,i,c,u,f,A,v,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],p=o[m.materialIndex],A=Math.max(m.start,d.start),v=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=A,E=v;y<E;y+=3){let T=y,P=y+1,U=y+2;r=Ho(this,p,e,i,c,u,f,T,P,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let A=m,v=m+1,y=m+2;r=Ho(this,o,e,i,c,u,f,A,v,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Fp(n,e,t,i,r,s,o,a){let l;if(e.side===qt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===xi,a),l===null)return null;zo.copy(a),zo.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(zo);return c<t.near||c>t.far?null:{distance:c,point:zo.clone(),object:n}}function Ho(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,No),n.getVertexPosition(l,Oo),n.getVertexPosition(c,Bo);let u=Fp(n,e,t,i,No,Oo,Bo,bf);if(u){let f=new R;Fi.getBarycoord(bf,No,Oo,Bo,f),r&&(u.uv=Fi.getInterpolatedAttribute(r,a,l,c,f,new Me)),s&&(u.uv1=Fi.getInterpolatedAttribute(s,a,l,c,f,new Me)),o&&(u.normal=Fi.getInterpolatedAttribute(o,a,l,c,f,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new R,materialIndex:0};Fi.getNormal(No,Oo,Bo,h.normal),u.face=h,u.barycoord=f}return u}var ct=class n extends wt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],f=[],h=0,d=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(u,3)),this.setAttribute("uv",new mt(f,2));function g(_,m,p,A,v,y,E,T,P,U,b){let M=y/P,I=E/U,L=y/2,G=E/2,D=T/2,H=P+1,q=U+1,W=0,z=0,Y=new R;for(let j=0;j<q;j++){let ae=j*I-G;for(let he=0;he<H;he++){let Be=he*M-L;Y[_]=Be*A,Y[m]=ae*v,Y[p]=D,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[p]=T>0?1:-1,u.push(Y.x,Y.y,Y.z),f.push(he/P),f.push(1-j/U),W+=1}}for(let j=0;j<U;j++)for(let ae=0;ae<P;ae++){let he=h+ae+H*j,Be=h+ae+H*(j+1),we=h+(ae+1)+H*(j+1),Ae=h+(ae+1)+H*j;l.push(he,Be,Ae),l.push(Be,we,Ae),z+=6}a.addGroup(d,z,b),d+=z,h+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function xr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function hn(n){let e={};for(let t=0;t<n.length;t++){let i=xr(n[t]);for(let r in i)e[r]=i[r]}return e}function Np(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function au(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}var Ah={clone:xr,merge:hn},Op=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,un=class extends ni{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Op,this.fragmentShader=Bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xr(e.uniforms),this.uniformsGroups=Np(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Os=class extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ui=new R,wf=new Me,Ef=new Me,tn=class extends Os{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xr*2*Math.atan(Math.tan(Es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,wf,Ef),t.subVectors(Ef,wf)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Es*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},kr=-90,zr=1,ra=class extends Nt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new tn(kr,zr,e,t);r.layers=this.layers,this.add(r);let s=new tn(kr,zr,e,t);s.layers=this.layers,this.add(s);let o=new tn(kr,zr,e,t);o.layers=this.layers,this.add(o);let a=new tn(kr,zr,e,t);a.layers=this.layers,this.add(a);let l=new tn(kr,zr,e,t);l.layers=this.layers,this.add(l);let c=new tn(kr,zr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===Zn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Is)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Bs=class extends vn{constructor(e=[],t=pr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},sa=class extends ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Bs(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ct(5,5,5),s=new un({name:"CubemapFromEquirect",uniforms:xr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qt,blending:bi});s.uniforms.tEquirect.value=t;let o=new dt(r,s),a=t.minFilter;return t.minFilter===qi&&(t.minFilter=An),new ra(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}},zt=class extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}},kp={type:"move"},$r=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(kp)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new zt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var ks=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new nt(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},cr=class extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var oa=class extends vn{constructor(e=null,t=1,i=1,r,s,o,a,l,c=yn,u=yn,f,h){super(null,o,a,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Kr=class extends Ct{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Hr=new vt,Tf=new vt,Vo=[],Af=new ti,zp=new vt,vs=new dt,Ms=new _i,kn=class extends dt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Kr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,zp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ti),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Hr),Af.copy(e.boundingBox).applyMatrix4(Hr),this.boundingBox.union(Af)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _i),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Hr),Ms.copy(e.boundingSphere).applyMatrix4(Hr),this.boundingSphere.union(Ms)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(vs.geometry=this.geometry,vs.material=this.material,vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ms.copy(this.boundingSphere),Ms.applyMatrix4(i),e.ray.intersectsSphere(Ms)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Hr),Tf.multiplyMatrices(i,Hr),vs.matrixWorld=Tf,vs.raycast(e,Vo);for(let o=0,a=Vo.length;o<a;o++){let l=Vo[o];l.instanceId=s,l.object=this,t.push(l)}Vo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Kr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new oa(new Float32Array(r*this.count),r,this.count,Va,Kn));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ac=new R,Hp=new R,Vp=new ot,Nn=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Ac.subVectors(i,t).cross(Hp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Ac),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Vp.getNormalMatrix(e),r=this.coplanarPoint(Ac).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},nr=new _i,Gp=new Me(.5,.5),Go=new R,Jr=class{constructor(e=new Nn,t=new Nn,i=new Nn,r=new Nn,s=new Nn,o=new Nn){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Zn,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],g=s[8],_=s[9],m=s[10],p=s[11],A=s[12],v=s[13],y=s[14],E=s[15];if(r[0].setComponents(c-o,d-u,p-g,E-A).normalize(),r[1].setComponents(c+o,d+u,p+g,E+A).normalize(),r[2].setComponents(c+a,d+f,p+_,E+v).normalize(),r[3].setComponents(c-a,d-f,p-_,E-v).normalize(),i)r[4].setComponents(l,h,m,y).normalize(),r[5].setComponents(c-l,d-h,p-m,E-y).normalize();else if(r[4].setComponents(c-l,d-h,p-m,E-y).normalize(),t===Zn)r[5].setComponents(c+l,d+h,p+m,E+y).normalize();else if(t===Is)r[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),nr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(nr)}intersectsSprite(e){nr.center.set(0,0,0);let t=Gp.distanceTo(e.center);return nr.radius=.7071067811865476+t,nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(nr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Go.x=r.normal.x>0?e.max.x:e.min.x,Go.y=r.normal.y>0?e.max.y:e.min.y,Go.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Go)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var yi=class extends ni{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},aa=new R,la=new R,Cf=new vt,Ss=new lr,Wo=new _i,Cc=new R,Rf=new R,ca=class extends Nt{constructor(e=new wt,t=new yi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)aa.fromBufferAttribute(t,r-1),la.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=aa.distanceTo(la);e.setAttribute("lineDistance",new mt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wo.copy(i.boundingSphere),Wo.applyMatrix4(r),Wo.radius+=s,e.ray.intersectsSphere(Wo)===!1)return;Cf.copy(r).invert(),Ss.copy(e.ray).applyMatrix4(Cf);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){let p=u.getX(_),A=u.getX(_+1),v=Xo(this,e,Ss,l,p,A,_);v&&t.push(v)}if(this.isLineLoop){let _=u.getX(g-1),m=u.getX(d),p=Xo(this,e,Ss,l,_,m,g-1);p&&t.push(p)}}else{let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){let p=Xo(this,e,Ss,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=Xo(this,e,Ss,l,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Xo(n,e,t,i,r,s,o){let a=n.geometry.attributes.position;if(aa.fromBufferAttribute(a,r),la.fromBufferAttribute(a,s),t.distanceSqToSegment(aa,la,Cc,Rf)>i)return;Cc.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Cc);if(!(c<e.near||c>e.far))return{distance:c,point:Rf.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var Pf=new R,If=new R,Bi=class extends ca{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Pf.fromBufferAttribute(t,r),If.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Pf.distanceTo(If);e.setAttribute("lineDistance",new mt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var zs=class extends vn{constructor(e,t,i=Yi,r,s,o,a=yn,l=yn,c,u=Wr,f=1){if(u!==Wr&&u!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:f};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Hs=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var ki=class n extends wt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let s=[],o=[],a=[],l=[],c=new R,u=new Me;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){let d=i+f/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/e+1)/2,u.y=(o[h+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new mt(o,3)),this.setAttribute("normal",new mt(a,3)),this.setAttribute("uv",new mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Et=class n extends wt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],f=[],h=[],d=[],g=0,_=[],m=i/2,p=0;A(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new mt(f,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(d,2));function A(){let y=new R,E=new R,T=0,P=(t-e)/i;for(let U=0;U<=s;U++){let b=[],M=U/s,I=M*(t-e)+e;for(let L=0;L<=r;L++){let G=L/r,D=G*l+a,H=Math.sin(D),q=Math.cos(D);E.x=I*H,E.y=-M*i+m,E.z=I*q,f.push(E.x,E.y,E.z),y.set(H,P,q).normalize(),h.push(y.x,y.y,y.z),d.push(G,1-M),b.push(g++)}_.push(b)}for(let U=0;U<r;U++)for(let b=0;b<s;b++){let M=_[b][U],I=_[b+1][U],L=_[b+1][U+1],G=_[b][U+1];(e>0||b!==0)&&(u.push(M,I,G),T+=3),(t>0||b!==s-1)&&(u.push(I,L,G),T+=3)}c.addGroup(p,T,0),p+=T}function v(y){let E=g,T=new Me,P=new R,U=0,b=y===!0?e:t,M=y===!0?1:-1;for(let L=1;L<=r;L++)f.push(0,m*M,0),h.push(0,M,0),d.push(.5,.5),g++;let I=g;for(let L=0;L<=r;L++){let D=L/r*l+a,H=Math.cos(D),q=Math.sin(D);P.x=b*q,P.y=m*M,P.z=b*H,f.push(P.x,P.y,P.z),h.push(0,M,0),T.x=H*.5+.5,T.y=q*.5*M+.5,d.push(T.x,T.y),g++}for(let L=0;L<r;L++){let G=E+L,D=I+L;y===!0?u.push(D,D+1,G):u.push(D+1,D,G),U+=3}c.addGroup(p,U,y===!0?1:2),p+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Vs=class n extends Et{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Cn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,s=i.length,o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);let u=i[r],h=i[r+1]-u,d=(o-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new Me:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new R,r=[],s=[],o=[],a=new R,l=new vt;for(let d=0;d<=e;d++){let g=d/e;r[d]=this.getTangentAt(g,new R)}s[0]=new R,o[0]=new R;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(lt(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(lt(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},jr=class extends Cn{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Me){let i=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*u-d*f+this.aX,c=h*f+d*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ua=class extends jr{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function lu(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,f){let h=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+f)+(l-a)/f;h*=u,d*=u,r(o,a,h,d)},calc:function(s){let o=s*s,a=o*s;return n+e*s+t*o+i*a}}}var qo=new R,Rc=new lu,Pc=new lu,Ic=new lu,zi=class extends Cn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new R){let i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(qo.subVectors(r[0],r[1]).add(r[0]),c=qo);let f=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(qo.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=qo),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Rc.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,g,_,m),Pc.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,g,_,m),Ic.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Rc.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),Pc.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),Ic.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return i.set(Rc.calc(l),Pc.calc(l),Ic.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Lf(n,e,t,i,r){let s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function Wp(n,e){let t=1-n;return t*t*e}function Xp(n,e){return 2*(1-n)*n*e}function qp(n,e){return n*n*e}function As(n,e,t,i){return Wp(n,e)+Xp(n,t)+qp(n,i)}function Yp(n,e){let t=1-n;return t*t*t*e}function Zp(n,e){let t=1-n;return 3*t*t*n*e}function $p(n,e){return 3*(1-n)*n*n*e}function Kp(n,e){return n*n*n*e}function Cs(n,e,t,i,r){return Yp(n,e)+Zp(n,t)+$p(n,i)+Kp(n,r)}var Gs=class extends Cn{constructor(e=new Me,t=new Me,i=new Me,r=new Me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Me){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Cs(e,r.x,s.x,o.x,a.x),Cs(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},fa=class extends Cn{constructor(e=new R,t=new R,i=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new R){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Cs(e,r.x,s.x,o.x,a.x),Cs(e,r.y,s.y,o.y,a.y),Cs(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ws=class extends Cn{constructor(e=new Me,t=new Me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Me){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vi=class extends Cn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xs=class extends Cn{constructor(e=new Me,t=new Me,i=new Me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Me){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(As(e,r.x,s.x,o.x),As(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ur=class extends Cn{constructor(e=new R,t=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new R){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(As(e,r.x,s.x,o.x),As(e,r.y,s.y,o.y),As(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qs=class extends Cn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Me){let i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return i.set(Lf(a,l.x,c.x,u.x,f.x),Lf(a,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new Me().fromArray(r))}return this}},ha=Object.freeze({__proto__:null,ArcCurve:ua,CatmullRomCurve3:zi,CubicBezierCurve:Gs,CubicBezierCurve3:fa,EllipseCurve:jr,LineCurve:Ws,LineCurve3:vi,QuadraticBezierCurve:Xs,QuadraticBezierCurve3:ur,SplineCurve:qs}),Hi=class extends Cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ha[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=i){let o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new ha[r.type]().fromJSON(r))}return this}},Mi=class extends Hi{constructor(e){super(),this.type="Path",this.currentPoint=new Me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Ws(this.currentPoint.clone(),new Me(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let s=new Xs(this.currentPoint.clone(),new Me(e,t),new Me(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,o){let a=new Gs(this.currentPoint.clone(),new Me(e,t),new Me(i,r),new Me(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new qs(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,r,s,o),this}absarc(e,t,i,r,s,o){return this.absellipse(e,t,i,i,r,s,o),this}ellipse(e,t,i,r,s,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,o,a,l),this}absellipse(e,t,i,r,s,o,a,l){let c=new jr(e,t,i,r,s,o,a,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Rn=class extends Mi{constructor(e){super(e),this.uuid=gr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Mi().fromJSON(r))}return this}};function Jp(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,s=Ch(n,0,r,t,!0),o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(i&&(s=nm(n,e,s,t)),n.length>80*t){a=1/0,l=1/0;let u=-1/0,f=-1/0;for(let h=t;h<r;h+=t){let d=n[h],g=n[h+1];d<a&&(a=d),g<l&&(l=g),d>u&&(u=d),g>f&&(f=g)}c=Math.max(u-a,f-l),c=c!==0?32767/c:0}return Ys(s,o,t,a,l,c,0),o}function Ch(n,e,t,i,r){let s;if(r===dm(n,e,t,i)>0)for(let o=e;o<t;o+=i)s=Df(o/i|0,n[o],n[o+1],s);else for(let o=t-i;o>=e;o-=i)s=Df(o/i|0,n[o],n[o+1],s);return s&&Qr(s,s.next)&&($s(s),s=s.next),s}function fr(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Qr(t,t.next)||kt(t.prev,t,t.next)===0)){if($s(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Ys(n,e,t,i,r,s,o){if(!n)return;!o&&s&&am(n,i,r,s);let a=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(s?Qp(n,i,r,s):jp(n)){e.push(l.i,n.i,c.i),$s(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=em(fr(n),e),Ys(n,e,t,i,r,s,2)):o===2&&tm(n,e,t,i,r,s):Ys(fr(n),e,t,i,r,s,1);break}}}function jp(n){let e=n.prev,t=n,i=n.next;if(kt(e,t,i)>=0)return!1;let r=e.x,s=t.x,o=i.x,a=e.y,l=t.y,c=i.y,u=Math.min(r,s,o),f=Math.min(a,l,c),h=Math.max(r,s,o),d=Math.max(a,l,c),g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=f&&g.y<=d&&ws(r,a,s,l,o,c,g.x,g.y)&&kt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Qp(n,e,t,i){let r=n.prev,s=n,o=n.next;if(kt(r,s,o)>=0)return!1;let a=r.x,l=s.x,c=o.x,u=r.y,f=s.y,h=o.y,d=Math.min(a,l,c),g=Math.min(u,f,h),_=Math.max(a,l,c),m=Math.max(u,f,h),p=kc(d,g,e,t,i),A=kc(_,m,e,t,i),v=n.prevZ,y=n.nextZ;for(;v&&v.z>=p&&y&&y.z<=A;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&ws(a,u,l,f,c,h,v.x,v.y)&&kt(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&ws(a,u,l,f,c,h,y.x,y.y)&&kt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=p;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&ws(a,u,l,f,c,h,v.x,v.y)&&kt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=A;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&ws(a,u,l,f,c,h,y.x,y.y)&&kt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function em(n,e){let t=n;do{let i=t.prev,r=t.next.next;!Qr(i,r)&&Ph(i,t,t.next,r)&&Zs(i,r)&&Zs(r,i)&&(e.push(i.i,t.i,r.i),$s(t),$s(t.next),t=n=r),t=t.next}while(t!==n);return fr(t)}function tm(n,e,t,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&um(o,a)){let l=Ih(o,a);o=fr(o,o.next),l=fr(l,l.next),Ys(o,e,t,i,r,s,0),Ys(l,e,t,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function nm(n,e,t,i){let r=[];for(let s=0,o=e.length;s<o;s++){let a=e[s]*i,l=s<o-1?e[s+1]*i:n.length,c=Ch(n,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(cm(c))}r.sort(im);for(let s=0;s<r.length;s++)t=rm(r[s],t);return t}function im(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function rm(n,e){let t=sm(n,e);if(!t)return e;let i=Ih(t,n);return fr(i,i.next),fr(t,t.next)}function sm(n,e){let t=e,i=n.x,r=n.y,s=-1/0,o;if(Qr(n,t))return t;do{if(Qr(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>s&&(s=f,o=t.x<t.next.x?t:t.next,f===i))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,u=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Rh(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){let f=Math.abs(r-t.y)/(i-t.x);Zs(t,n)&&(f<u||f===u&&(t.x>o.x||t.x===o.x&&om(o,t)))&&(o=t,u=f)}t=t.next}while(t!==a);return o}function om(n,e){return kt(n.prev,n,e.prev)<0&&kt(e.next,n,n.next)<0}function am(n,e,t,i){let r=n;do r.z===0&&(r.z=kc(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,lm(r)}function lm(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=o}s.nextZ=null,t*=2}while(e>1);return n}function kc(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function cm(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Rh(n,e,t,i,r,s,o,a){return(r-o)*(e-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(i-a)}function ws(n,e,t,i,r,s,o,a){return!(n===o&&e===a)&&Rh(n,e,t,i,r,s,o,a)}function um(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!fm(n,e)&&(Zs(n,e)&&Zs(e,n)&&hm(n,e)&&(kt(n.prev,n,e.prev)||kt(n,e.prev,e))||Qr(n,e)&&kt(n.prev,n,n.next)>0&&kt(e.prev,e,e.next)>0)}function kt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Qr(n,e){return n.x===e.x&&n.y===e.y}function Ph(n,e,t,i){let r=Zo(kt(n,e,t)),s=Zo(kt(n,e,i)),o=Zo(kt(t,i,n)),a=Zo(kt(t,i,e));return!!(r!==s&&o!==a||r===0&&Yo(n,t,e)||s===0&&Yo(n,i,e)||o===0&&Yo(t,n,i)||a===0&&Yo(t,e,i))}function Yo(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Zo(n){return n>0?1:n<0?-1:0}function fm(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Ph(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Zs(n,e){return kt(n.prev,n,n.next)<0?kt(n,e,n.next)>=0&&kt(n,n.prev,e)>=0:kt(n,e,n.prev)<0||kt(n,n.next,e)<0}function hm(n,e){let t=n,i=!1,r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Ih(n,e){let t=zc(n.i,n.x,n.y),i=zc(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Df(n,e,t,i){let r=zc(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function $s(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function zc(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function dm(n,e,t,i){let r=0;for(let s=e,o=t-i;s<t;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}var Hc=class{static triangulate(e,t,i=2){return Jp(e,t,i)}},rr=class n{static area(e){let t=e.length,i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],s=[];Uf(e),Ff(i,e);let o=e.length;t.forEach(Uf);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,Ff(i,t[l]);let a=Hc.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}};function Uf(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Ff(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var zn=class n extends wt{constructor(e=new Rn([new Me(.5,.5),new Me(-.5,.5),new Me(-.5,-.5),new Me(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new mt(r,3)),this.setAttribute("uv",new mt(s,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,A=t.UVGenerator!==void 0?t.UVGenerator:pm,v,y=!1,E,T,P,U;p&&(v=p.getSpacedPoints(u),y=!0,h=!1,E=p.computeFrenetFrames(u,!1),T=new R,P=new R,U=new R),h||(m=0,d=0,g=0,_=0);let b=a.extractPoints(c),M=b.shape,I=b.holes;if(!rr.isClockWise(M)){M=M.reverse();for(let oe=0,V=I.length;oe<V;oe++){let B=I[oe];rr.isClockWise(B)&&(I[oe]=B.reverse())}}function G(oe){let B=10000000000000001e-36,J=oe[0];for(let ie=1;ie<=oe.length;ie++){let te=ie%oe.length,ue=oe[te],_e=ue.x-J.x,Ee=ue.y-J.y,w=_e*_e+Ee*Ee,x=Math.max(Math.abs(ue.x),Math.abs(ue.y),Math.abs(J.x),Math.abs(J.y)),O=B*x*x;if(w<=O){oe.splice(te,1),ie--;continue}J=ue}}G(M),I.forEach(G);let D=I.length,H=M;for(let oe=0;oe<D;oe++){let V=I[oe];M=M.concat(V)}function q(oe,V,B){return V||console.error("THREE.ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(V,B)}let W=M.length;function z(oe,V,B){let J,ie,te,ue=oe.x-V.x,_e=oe.y-V.y,Ee=B.x-oe.x,w=B.y-oe.y,x=ue*ue+_e*_e,O=ue*w-_e*Ee;if(Math.abs(O)>Number.EPSILON){let K=Math.sqrt(x),re=Math.sqrt(Ee*Ee+w*w),Z=V.x-_e/K,Se=V.y+ue/K,me=B.x-w/re,Ie=B.y+Ee/re,Le=((me-Z)*w-(Ie-Se)*Ee)/(ue*w-_e*Ee);J=Z+ue*Le-oe.x,ie=Se+_e*Le-oe.y;let de=J*J+ie*ie;if(de<=2)return new Me(J,ie);te=Math.sqrt(de/2)}else{let K=!1;ue>Number.EPSILON?Ee>Number.EPSILON&&(K=!0):ue<-Number.EPSILON?Ee<-Number.EPSILON&&(K=!0):Math.sign(_e)===Math.sign(w)&&(K=!0),K?(J=-_e,ie=ue,te=Math.sqrt(x)):(J=ue,ie=_e,te=Math.sqrt(x/2))}return new Me(J/te,ie/te)}let Y=[];for(let oe=0,V=H.length,B=V-1,J=oe+1;oe<V;oe++,B++,J++)B===V&&(B=0),J===V&&(J=0),Y[oe]=z(H[oe],H[B],H[J]);let j=[],ae,he=Y.concat();for(let oe=0,V=D;oe<V;oe++){let B=I[oe];ae=[];for(let J=0,ie=B.length,te=ie-1,ue=J+1;J<ie;J++,te++,ue++)te===ie&&(te=0),ue===ie&&(ue=0),ae[J]=z(B[J],B[te],B[ue]);j.push(ae),he=he.concat(ae)}let Be;if(m===0)Be=rr.triangulateShape(H,I);else{let oe=[],V=[];for(let B=0;B<m;B++){let J=B/m,ie=d*Math.cos(J*Math.PI/2),te=g*Math.sin(J*Math.PI/2)+_;for(let ue=0,_e=H.length;ue<_e;ue++){let Ee=q(H[ue],Y[ue],te);le(Ee.x,Ee.y,-ie),J===0&&oe.push(Ee)}for(let ue=0,_e=D;ue<_e;ue++){let Ee=I[ue];ae=j[ue];let w=[];for(let x=0,O=Ee.length;x<O;x++){let K=q(Ee[x],ae[x],te);le(K.x,K.y,-ie),J===0&&w.push(K)}J===0&&V.push(w)}}Be=rr.triangulateShape(oe,V)}let we=Be.length,Ae=g+_;for(let oe=0;oe<W;oe++){let V=h?q(M[oe],he[oe],Ae):M[oe];y?(P.copy(E.normals[0]).multiplyScalar(V.x),T.copy(E.binormals[0]).multiplyScalar(V.y),U.copy(v[0]).add(P).add(T),le(U.x,U.y,U.z)):le(V.x,V.y,0)}for(let oe=1;oe<=u;oe++)for(let V=0;V<W;V++){let B=h?q(M[V],he[V],Ae):M[V];y?(P.copy(E.normals[oe]).multiplyScalar(B.x),T.copy(E.binormals[oe]).multiplyScalar(B.y),U.copy(v[oe]).add(P).add(T),le(U.x,U.y,U.z)):le(B.x,B.y,f/u*oe)}for(let oe=m-1;oe>=0;oe--){let V=oe/m,B=d*Math.cos(V*Math.PI/2),J=g*Math.sin(V*Math.PI/2)+_;for(let ie=0,te=H.length;ie<te;ie++){let ue=q(H[ie],Y[ie],J);le(ue.x,ue.y,f+B)}for(let ie=0,te=I.length;ie<te;ie++){let ue=I[ie];ae=j[ie];for(let _e=0,Ee=ue.length;_e<Ee;_e++){let w=q(ue[_e],ae[_e],J);y?le(w.x,w.y+v[u-1].y,v[u-1].x+B):le(w.x,w.y,f+B)}}}Q(),ce();function Q(){let oe=r.length/3;if(h){let V=0,B=W*V;for(let J=0;J<we;J++){let ie=Be[J];ne(ie[2]+B,ie[1]+B,ie[0]+B)}V=u+m*2,B=W*V;for(let J=0;J<we;J++){let ie=Be[J];ne(ie[0]+B,ie[1]+B,ie[2]+B)}}else{for(let V=0;V<we;V++){let B=Be[V];ne(B[2],B[1],B[0])}for(let V=0;V<we;V++){let B=Be[V];ne(B[0]+W*u,B[1]+W*u,B[2]+W*u)}}i.addGroup(oe,r.length/3-oe,0)}function ce(){let oe=r.length/3,V=0;$(H,V),V+=H.length;for(let B=0,J=I.length;B<J;B++){let ie=I[B];$(ie,V),V+=ie.length}i.addGroup(oe,r.length/3-oe,1)}function $(oe,V){let B=oe.length;for(;--B>=0;){let J=B,ie=B-1;ie<0&&(ie=oe.length-1);for(let te=0,ue=u+m*2;te<ue;te++){let _e=W*te,Ee=W*(te+1),w=V+J+_e,x=V+ie+_e,O=V+ie+Ee,K=V+J+Ee;Pe(w,x,O,K)}}}function le(oe,V,B){l.push(oe),l.push(V),l.push(B)}function ne(oe,V,B){Xe(oe),Xe(V),Xe(B);let J=r.length/3,ie=A.generateTopUV(i,r,J-3,J-2,J-1);C(ie[0]),C(ie[1]),C(ie[2])}function Pe(oe,V,B,J){Xe(oe),Xe(V),Xe(J),Xe(V),Xe(B),Xe(J);let ie=r.length/3,te=A.generateSideWallUV(i,r,ie-6,ie-3,ie-2,ie-1);C(te[0]),C(te[1]),C(te[3]),C(te[1]),C(te[2]),C(te[3])}function Xe(oe){r.push(l[oe*3+0]),r.push(l[oe*3+1]),r.push(l[oe*3+2])}function C(oe){s.push(oe.x),s.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return mm(t,i,e)}static fromJSON(e,t){let i=[];for(let s=0,o=e.shapes.length;s<o;s++){let a=t[e.shapes[s]];i.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new ha[r.type]().fromJSON(r)),new n(i,e.options)}},pm={generateTopUV:function(n,e,t,i,r){let s=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new Me(s,o),new Me(a,l),new Me(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],f=e[i*3+2],h=e[r*3],d=e[r*3+1],g=e[r*3+2],_=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new Me(o,1-l),new Me(c,1-f),new Me(h,1-g),new Me(_,1-p)]:[new Me(a,1-l),new Me(u,1-f),new Me(d,1-g),new Me(m,1-p)]}};function mm(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){let s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var hr=class n extends wt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let A=p*h-o;for(let v=0;v<c;v++){let y=v*f-s;g.push(y,-A,0),_.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let A=0;A<a;A++){let v=A+c*p,y=A+c*(p+1),E=A+1+c*(p+1),T=A+1+c*p;d.push(v,y,T),d.push(y,E,T)}this.setIndex(d),this.setAttribute("position",new mt(g,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var ri=class n extends wt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,u=[],f=new R,h=new R,d=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){let A=[],v=p/i,y=0;p===0&&o===0?y=.5/t:p===i&&l===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){let T=E/t;f.x=-e*Math.cos(r+T*s)*Math.sin(o+v*a),f.y=e*Math.cos(o+v*a),f.z=e*Math.sin(r+T*s)*Math.sin(o+v*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(T+y,1-v),A.push(c++)}u.push(A)}for(let p=0;p<i;p++)for(let A=0;A<t;A++){let v=u[p][A+1],y=u[p][A],E=u[p+1][A],T=u[p+1][A+1];(p!==0||o>0)&&d.push(v,y,T),(p!==i-1||l<Math.PI)&&d.push(y,E,T)}this.setIndex(d),this.setAttribute("position",new mt(g,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var fn=class n extends wt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);let o=[],a=[],l=[],c=[],u=new R,f=new R,h=new R;for(let d=0;d<=i;d++)for(let g=0;g<=r;g++){let _=g/r*s,m=d/i*Math.PI*2;f.x=(e+t*Math.cos(m))*Math.cos(_),f.y=(e+t*Math.cos(m))*Math.sin(_),f.z=t*Math.sin(m),a.push(f.x,f.y,f.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/r),c.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=r;g++){let _=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,p=(r+1)*(d-1)+g,A=(r+1)*d+g;o.push(_,m,A),o.push(m,p,A)}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Mn=class n extends wt{constructor(e=new ur(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new R,l=new R,c=new Me,u=new R,f=[],h=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new mt(f,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(d,2));function _(){for(let v=0;v<t;v++)m(v);m(s===!1?t:0),A(),p()}function m(v){u=e.getPointAt(v/t,u);let y=o.normals[v],E=o.binormals[v];for(let T=0;T<=r;T++){let P=T/r*Math.PI*2,U=Math.sin(P),b=-Math.cos(P);l.x=b*y.x+U*E.x,l.y=b*y.y+U*E.y,l.z=b*y.z+U*E.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,f.push(a.x,a.y,a.z)}}function p(){for(let v=1;v<=t;v++)for(let y=1;y<=r;y++){let E=(r+1)*(v-1)+(y-1),T=(r+1)*v+(y-1),P=(r+1)*v+y,U=(r+1)*(v-1)+y;g.push(E,T,U),g.push(T,P,U)}}function A(){for(let v=0;v<=t;v++)for(let y=0;y<=r;y++)c.x=v/t,c.y=y/r,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new n(new ha[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Pn=class extends ni{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vl,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xn=class extends Pn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ks=class extends ni{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vl,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=Ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},da=class extends ni{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ph,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},pa=class extends ni{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function $o(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function gm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var dr=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ma=class extends dr{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Uc,endingEnd:Uc}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Fc:s=e,a=2*t-i;break;case Nc:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Fc:o=e,l=2*i-t;break;case Nc:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(i-t)/(r-t),_=g*g,m=_*g,p=-h*m+2*h*_-h*g,A=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,v=(-1-d)*m+(1.5+d)*_+.5*g,y=d*m-d*_;for(let E=0;E!==a;++E)s[E]=p*o[u+E]+A*o[c+E]+v*o[l+E]+y*o[f+E];return s}},ga=class extends dr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-t)/(r-t),f=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*f+o[l+h]*u;return s}},xa=class extends dr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},In=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$o(t,this.TimeBufferType),this.values=$o(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:$o(e.times,Array),values:$o(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new xa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ma(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Rs:t=this.InterpolantFactoryMethodDiscrete;break;case ta:t=this.InterpolantFactoryMethodLinear;break;case Ko:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rs;case this.InterpolantFactoryMethodLinear:return ta;case this.InterpolantFactoryMethodSmooth:return Ko}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&gm(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Ko,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let f=a*i,h=f-i,d=f+i;for(let g=0;g!==i;++g){let _=t[f+g];if(_!==t[h+g]||_!==t[d+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let f=a*i,h=o*i;for(let d=0;d!==i;++d)t[h+d]=t[f+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};In.prototype.ValueTypeName="";In.prototype.TimeBufferType=Float32Array;In.prototype.ValueBufferType=Float32Array;In.prototype.DefaultInterpolation=ta;var Vi=class extends In{constructor(e,t,i){super(e,t,i)}};Vi.prototype.ValueTypeName="bool";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=Rs;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var _a=class extends In{constructor(e,t,i,r){super(e,t,i,r)}};_a.prototype.ValueTypeName="color";var ya=class extends In{constructor(e,t,i,r){super(e,t,i,r)}};ya.prototype.ValueTypeName="number";var va=class extends dr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(r-t),c=e*a;for(let u=c+a;c!==u;c+=4)On.slerpFlat(s,0,o,c-a,o,c,l);return s}},Js=class extends In{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new va(this.times,this.values,this.getValueSize(),e)}};Js.prototype.ValueTypeName="quaternion";Js.prototype.InterpolantFactoryMethodSmooth=void 0;var Gi=class extends In{constructor(e,t,i){super(e,t,i)}};Gi.prototype.ValueTypeName="string";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=Rs;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ma=class extends In{constructor(e,t,i,r){super(e,t,i,r)}};Ma.prototype.ValueTypeName="vector";var Sa=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Lh=new Sa,ba=class{constructor(e){this.manager=e!==void 0?e:Lh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ba.DEFAULT_MATERIAL_NAME="__DEFAULT";var es=class extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},js=class extends es{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Lc=new vt,Nf=new R,Of=new R,wa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.mapType=$n,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jr,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;Nf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nf),Of.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Of),t.updateMatrixWorld(),Lc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Lc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Bf=new vt,bs=new R,Dc=new R,Vc=class extends wa{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Me(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),bs.setFromMatrixPosition(e.matrixWorld),i.position.copy(bs),Dc.copy(i.position),Dc.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Dc),i.updateMatrixWorld(),r.makeTranslation(-bs.x,-bs.y,-bs.z),Bf.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bf,i.coordinateSystem,i.reversedDepth)}},Si=class extends es{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Vc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Qs=class extends Os{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Gc=class extends wa{constructor(){super(new Qs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ts=class extends es{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new Gc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ea=class extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var cu="\\[\\]\\.:\\/",xm=new RegExp("["+cu+"]","g"),uu="[^"+cu+"]",_m="[^"+cu.replace("\\.","")+"]",ym=/((?:WC+[\/:])*)/.source.replace("WC",uu),vm=/(WCOD+)?/.source.replace("WCOD",_m),Mm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uu),Sm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uu),bm=new RegExp("^"+ym+vm+Mm+Sm+"$"),wm=["material","materials","bones","map"],Wc=class{constructor(e,t,i){let r=i||Ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Ft=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(xm,"")}static parseTrackName(e){let t=bm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);wm.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=i(a.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[r];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ft.Composite=Wc;Ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ft.prototype.GetterByBindingType=[Ft.prototype._getValue_direct,Ft.prototype._getValue_array,Ft.prototype._getValue_arrayElement,Ft.prototype._getValue_toArray];Ft.prototype.SetterByBindingTypeAndVersioning=[[Ft.prototype._setValue_direct,Ft.prototype._setValue_direct_setNeedsUpdate,Ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_array,Ft.prototype._setValue_array_setNeedsUpdate,Ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_arrayElement,Ft.prototype._setValue_arrayElement_setNeedsUpdate,Ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_fromArray,Ft.prototype._setValue_fromArray_setNeedsUpdate,Ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rM=new Float32Array(1);var ns=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=lt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(lt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var eo=class extends Bi{constructor(e=10,t=10,i=4473924,r=8947848){i=new nt(i),r=new nt(r);let s=t/2,o=e/t,a=e/2,l=[],c=[];for(let h=0,d=0,g=-a;h<=t;h++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);let _=h===s?i:r;_.toArray(c,d),d+=3,_.toArray(c,d),d+=3,_.toArray(c,d),d+=3,_.toArray(c,d),d+=3}let u=new wt;u.setAttribute("position",new mt(l,3)),u.setAttribute("color",new mt(c,3));let f=new yi({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var to=class extends Qn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function fu(n,e,t,i){let r=Em(i);switch(t){case tu:return n*e;case Va:return n*e/r.components*r.byteLength;case Ga:return n*e/r.components*r.byteLength;case iu:return n*e*2/r.components*r.byteLength;case Wa:return n*e*2/r.components*r.byteLength;case nu:return n*e*3/r.components*r.byteLength;case Sn:return n*e*4/r.components*r.byteLength;case Xa:return n*e*4/r.components*r.byteLength;case ro:case so:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case oo:case ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ya:case $a:return Math.max(n,16)*Math.max(e,8)/4;case qa:case Za:return Math.max(n,8)*Math.max(e,8)/2;case Ka:case Ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case el:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case tl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case nl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case il:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case rl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case sl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ol:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case al:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ll:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case cl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ul:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case fl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case hl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case dl:case pl:case ml:return Math.ceil(n/4)*Math.ceil(e/4)*16;case gl:case xl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case _l:case yl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Em(n){switch(n){case $n:case Jc:return{byteLength:1,components:1};case is:case jc:case rs:return{byteLength:2,components:1};case za:case Ha:return{byteLength:2,components:4};case Yi:case ka:case Kn:return{byteLength:4,components:1};case Qc:case eu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function nd(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Lm(n){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){let u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){let g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){let _=f[d];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Dm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Um=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Om=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,km=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Vm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ym=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,eg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ng=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ig=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,sg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,og=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ag=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ug=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,hg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,dg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_g=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Mg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Eg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Tg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ag=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ig=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Lg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ug=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ng=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Og=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,t0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,n0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,i0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,s0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,o0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,a0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,l0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,c0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,u0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,f0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,h0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,d0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,p0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,m0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,g0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,x0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,v0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,M0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,S0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,b0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,E0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,T0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,A0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,R0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,I0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,L0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,k0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,z0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,H0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,G0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,X0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,q0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Y0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,J0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Q0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ex=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ix=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ox=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ax=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ux=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ut={alphahash_fragment:Dm,alphahash_pars_fragment:Um,alphamap_fragment:Fm,alphamap_pars_fragment:Nm,alphatest_fragment:Om,alphatest_pars_fragment:Bm,aomap_fragment:km,aomap_pars_fragment:zm,batching_pars_vertex:Hm,batching_vertex:Vm,begin_vertex:Gm,beginnormal_vertex:Wm,bsdfs:Xm,iridescence_fragment:qm,bumpmap_pars_fragment:Ym,clipping_planes_fragment:Zm,clipping_planes_pars_fragment:$m,clipping_planes_pars_vertex:Km,clipping_planes_vertex:Jm,color_fragment:jm,color_pars_fragment:Qm,color_pars_vertex:eg,color_vertex:tg,common:ng,cube_uv_reflection_fragment:ig,defaultnormal_vertex:rg,displacementmap_pars_vertex:sg,displacementmap_vertex:og,emissivemap_fragment:ag,emissivemap_pars_fragment:lg,colorspace_fragment:cg,colorspace_pars_fragment:ug,envmap_fragment:fg,envmap_common_pars_fragment:hg,envmap_pars_fragment:dg,envmap_pars_vertex:pg,envmap_physical_pars_fragment:Eg,envmap_vertex:mg,fog_vertex:gg,fog_pars_vertex:xg,fog_fragment:_g,fog_pars_fragment:yg,gradientmap_pars_fragment:vg,lightmap_pars_fragment:Mg,lights_lambert_fragment:Sg,lights_lambert_pars_fragment:bg,lights_pars_begin:wg,lights_toon_fragment:Tg,lights_toon_pars_fragment:Ag,lights_phong_fragment:Cg,lights_phong_pars_fragment:Rg,lights_physical_fragment:Pg,lights_physical_pars_fragment:Ig,lights_fragment_begin:Lg,lights_fragment_maps:Dg,lights_fragment_end:Ug,logdepthbuf_fragment:Fg,logdepthbuf_pars_fragment:Ng,logdepthbuf_pars_vertex:Og,logdepthbuf_vertex:Bg,map_fragment:kg,map_pars_fragment:zg,map_particle_fragment:Hg,map_particle_pars_fragment:Vg,metalnessmap_fragment:Gg,metalnessmap_pars_fragment:Wg,morphinstance_vertex:Xg,morphcolor_vertex:qg,morphnormal_vertex:Yg,morphtarget_pars_vertex:Zg,morphtarget_vertex:$g,normal_fragment_begin:Kg,normal_fragment_maps:Jg,normal_pars_fragment:jg,normal_pars_vertex:Qg,normal_vertex:e0,normalmap_pars_fragment:t0,clearcoat_normal_fragment_begin:n0,clearcoat_normal_fragment_maps:i0,clearcoat_pars_fragment:r0,iridescence_pars_fragment:s0,opaque_fragment:o0,packing:a0,premultiplied_alpha_fragment:l0,project_vertex:c0,dithering_fragment:u0,dithering_pars_fragment:f0,roughnessmap_fragment:h0,roughnessmap_pars_fragment:d0,shadowmap_pars_fragment:p0,shadowmap_pars_vertex:m0,shadowmap_vertex:g0,shadowmask_pars_fragment:x0,skinbase_vertex:_0,skinning_pars_vertex:y0,skinning_vertex:v0,skinnormal_vertex:M0,specularmap_fragment:S0,specularmap_pars_fragment:b0,tonemapping_fragment:w0,tonemapping_pars_fragment:E0,transmission_fragment:T0,transmission_pars_fragment:A0,uv_pars_fragment:C0,uv_pars_vertex:R0,uv_vertex:P0,worldpos_vertex:I0,background_vert:L0,background_frag:D0,backgroundCube_vert:U0,backgroundCube_frag:F0,cube_vert:N0,cube_frag:O0,depth_vert:B0,depth_frag:k0,distanceRGBA_vert:z0,distanceRGBA_frag:H0,equirect_vert:V0,equirect_frag:G0,linedashed_vert:W0,linedashed_frag:X0,meshbasic_vert:q0,meshbasic_frag:Y0,meshlambert_vert:Z0,meshlambert_frag:$0,meshmatcap_vert:K0,meshmatcap_frag:J0,meshnormal_vert:j0,meshnormal_frag:Q0,meshphong_vert:ex,meshphong_frag:tx,meshphysical_vert:nx,meshphysical_frag:ix,meshtoon_vert:rx,meshtoon_frag:sx,points_vert:ox,points_frag:ax,shadow_vert:lx,shadow_frag:cx,sprite_vert:ux,sprite_frag:fx},De={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},oi={basic:{uniforms:hn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:hn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new nt(0)}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:hn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:hn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:hn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new nt(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:hn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:hn([De.points,De.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:hn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:hn([De.common,De.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:hn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:hn([De.sprite,De.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distanceRGBA:{uniforms:hn([De.common,De.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distanceRGBA_vert,fragmentShader:ut.distanceRGBA_frag},shadow:{uniforms:hn([De.lights,De.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};oi.physical={uniforms:hn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};var Ml={r:0,b:0,g:0},_r=new Bn,hx=new vt;function dx(n,e,t,i,r,s,o){let a=new nt(0),l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function _(v){let y=!1,E=g(v);E===null?p(a,l):E&&E.isColor&&(p(E,1),y=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(v,y){let E=g(y);E&&(E.isCubeTexture||E.mapping===no)?(u===void 0&&(u=new dt(new ct(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:xr(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,P,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),_r.copy(y.backgroundRotation),_r.x*=-1,_r.y*=-1,_r.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(_r.y*=-1,_r.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(hx.makeRotationFromEuler(_r)),u.material.toneMapped=gt.getTransfer(E.colorSpace)!==At,(f!==E||h!==E.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,f=E,h=E.version,d=n.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new dt(new hr(2,2),new un({name:"BackgroundMaterial",uniforms:xr(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=gt.getTransfer(E.colorSpace)!==At,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||h!==E.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=E,h=E.version,d=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,y){v.getRGB(Ml,au(n)),i.buffers.color.setClear(Ml.r,Ml.g,Ml.b,y,o)}function A(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(a,l)},render:_,addToRenderList:m,dispose:A}}function px(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null),s=r,o=!1;function a(M,I,L,G,D){let H=!1,q=f(G,L,I);s!==q&&(s=q,c(s.object)),H=d(M,G,L,D),H&&g(M,G,L,D),D!==null&&e.update(D,n.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,y(M,I,L,G),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function f(M,I,L){let G=L.wireframe===!0,D=i[M.id];D===void 0&&(D={},i[M.id]=D);let H=D[I.id];H===void 0&&(H={},D[I.id]=H);let q=H[G];return q===void 0&&(q=h(l()),H[G]=q),q}function h(M){let I=[],L=[],G=[];for(let D=0;D<t;D++)I[D]=0,L[D]=0,G[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:L,attributeDivisors:G,object:M,attributes:{},index:null}}function d(M,I,L,G){let D=s.attributes,H=I.attributes,q=0,W=L.getAttributes();for(let z in W)if(W[z].location>=0){let j=D[z],ae=H[z];if(ae===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor)),j===void 0||j.attribute!==ae||ae&&j.data!==ae.data)return!0;q++}return s.attributesNum!==q||s.index!==G}function g(M,I,L,G){let D={},H=I.attributes,q=0,W=L.getAttributes();for(let z in W)if(W[z].location>=0){let j=H[z];j===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(j=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(j=M.instanceColor));let ae={};ae.attribute=j,j&&j.data&&(ae.data=j.data),D[z]=ae,q++}s.attributes=D,s.attributesNum=q,s.index=G}function _(){let M=s.newAttributes;for(let I=0,L=M.length;I<L;I++)M[I]=0}function m(M){p(M,0)}function p(M,I){let L=s.newAttributes,G=s.enabledAttributes,D=s.attributeDivisors;L[M]=1,G[M]===0&&(n.enableVertexAttribArray(M),G[M]=1),D[M]!==I&&(n.vertexAttribDivisor(M,I),D[M]=I)}function A(){let M=s.newAttributes,I=s.enabledAttributes;for(let L=0,G=I.length;L<G;L++)I[L]!==M[L]&&(n.disableVertexAttribArray(L),I[L]=0)}function v(M,I,L,G,D,H,q){q===!0?n.vertexAttribIPointer(M,I,L,D,H):n.vertexAttribPointer(M,I,L,G,D,H)}function y(M,I,L,G){_();let D=G.attributes,H=L.getAttributes(),q=I.defaultAttributeValues;for(let W in H){let z=H[W];if(z.location>=0){let Y=D[W];if(Y===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(Y=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(Y=M.instanceColor)),Y!==void 0){let j=Y.normalized,ae=Y.itemSize,he=e.get(Y);if(he===void 0)continue;let Be=he.buffer,we=he.type,Ae=he.bytesPerElement,Q=we===n.INT||we===n.UNSIGNED_INT||Y.gpuType===ka;if(Y.isInterleavedBufferAttribute){let ce=Y.data,$=ce.stride,le=Y.offset;if(ce.isInstancedInterleavedBuffer){for(let ne=0;ne<z.locationSize;ne++)p(z.location+ne,ce.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ne=0;ne<z.locationSize;ne++)m(z.location+ne);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let ne=0;ne<z.locationSize;ne++)v(z.location+ne,ae/z.locationSize,we,j,$*Ae,(le+ae/z.locationSize*ne)*Ae,Q)}else{if(Y.isInstancedBufferAttribute){for(let ce=0;ce<z.locationSize;ce++)p(z.location+ce,Y.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ce=0;ce<z.locationSize;ce++)m(z.location+ce);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let ce=0;ce<z.locationSize;ce++)v(z.location+ce,ae/z.locationSize,we,j,ae*Ae,ae/z.locationSize*ce*Ae,Q)}}else if(q!==void 0){let j=q[W];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(z.location,j);break;case 3:n.vertexAttrib3fv(z.location,j);break;case 4:n.vertexAttrib4fv(z.location,j);break;default:n.vertexAttrib1fv(z.location,j)}}}}A()}function E(){U();for(let M in i){let I=i[M];for(let L in I){let G=I[L];for(let D in G)u(G[D].object),delete G[D];delete I[L]}delete i[M]}}function T(M){if(i[M.id]===void 0)return;let I=i[M.id];for(let L in I){let G=I[L];for(let D in G)u(G[D].object),delete G[D];delete I[L]}delete i[M.id]}function P(M){for(let I in i){let L=i[I];if(L[M.id]===void 0)continue;let G=L[M.id];for(let D in G)u(G[D].object),delete G[D];delete L[M.id]}}function U(){b(),o=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:U,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:A}}function mx(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),t.update(u,i,f))}function a(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,i,1)}function l(c,u,f,h){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function gx(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==Sn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){let U=P===rs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==$n&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Kn&&!U)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:A,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:E,maxSamples:T}}function xx(n){let e=this,t=null,i=0,r=!1,s=!1,o=new Nn,a=new ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){let g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{let A=s?0:i,v=A*4,y=p.clippingState||null;l.value=y,y=u(g,h,v,d);for(let E=0;E!==v;++E)y[E]=t[E];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,g){let _=f!==null?f.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=d+_*4,A=h.matrixWorldInverse;a.getNormalMatrix(A),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,y=d;v!==_;++v,y+=4)o.copy(f[v]).applyMatrix4(A,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function _x(n){let e=new WeakMap;function t(o,a){return a===Na?o.mapping=pr:a===Oa&&(o.mapping=mr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Na||a===Oa)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new sa(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var ls=4,Dh=[.125,.215,.35,.446,.526,.582],Mr=20,hu=new Qs,Uh=new nt,du=null,pu=0,mu=0,gu=!1,vr=(1+Math.sqrt(5))/2,as=1/vr,Fh=[new R(-vr,as,0),new R(vr,as,0),new R(-as,0,vr),new R(as,0,vr),new R(0,vr,-as),new R(0,vr,as),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],yx=new R,us=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=yx}=s;du=this._renderer.getRenderTarget(),pu=this._renderer.getActiveCubeFace(),mu=this._renderer.getActiveMipmapLevel(),gu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(du,pu,mu),this._renderer.xr.enabled=gu,e.scissorTest=!1,Sl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===pr||e.mapping===mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),du=this._renderer.getRenderTarget(),pu=this._renderer.getActiveCubeFace(),mu=this._renderer.getActiveMipmapLevel(),gu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:An,minFilter:An,generateMipmaps:!1,type:rs,format:Sn,colorSpace:ar,depthBuffer:!1},r=Nh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nh(e,t,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vx(s)),this._blurMaterial=Mx(s,e,t)}return r}_compileMaterial(e){let t=new dt(this._lodPlanes[0],e);this._renderer.compile(t,hu)}_sceneToCubeUV(e,t,i,r,s){let l=new tn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Uh),f.toneMapping=wi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null));let _=new ii({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),m=new dt(new ct,_),p=!1,A=e.background;A?A.isColor&&(_.color.copy(A),e.background=null,p=!0):(_.color.copy(Uh),p=!0);for(let v=0;v<6;v++){let y=v%3;y===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[v],s.y,s.z)):y===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[v]));let E=this._cubeSize;Sl(r,y*E,v>2?E:0,E,E),f.setRenderTarget(r),p&&f.render(m,l),f.render(e,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=d,f.autoClear=h,e.background=A}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===pr||e.mapping===mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oh());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new dt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;Sl(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,hu)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Fh[(r-s-1)%Fh.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,f=new dt(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Mr-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Mr;m>Mr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Mr}`);let p=[],A=0;for(let P=0;P<Mr;++P){let U=P/_,b=Math.exp(-U*U/2);p.push(b),P===0?A+=b:P<m&&(A+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/A;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-i;let y=this._sizeLods[r],E=3*y*(r>v-ls?r-v+ls:0),T=4*(this._cubeSize-y);Sl(t,E,T,3*y,2*y),l.setRenderTarget(t),l.render(f,hu)}};function vx(n){let e=[],t=[],i=[],r=n,s=n-ls+1+Dh.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ls?l=Dh[o-n+ls-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,A=new Float32Array(_*g*d),v=new Float32Array(m*g*d),y=new Float32Array(p*g*d);for(let T=0;T<d;T++){let P=T%3*2/3-1,U=T>2?0:-1,b=[P,U,0,P+2/3,U,0,P+2/3,U+1,0,P,U,0,P+2/3,U+1,0,P,U+1,0];A.set(b,_*g*T),v.set(h,m*g*T);let M=[T,T,T,T,T,T];y.set(M,p*g*T)}let E=new wt;E.setAttribute("position",new Ct(A,_)),E.setAttribute("uv",new Ct(v,m)),E.setAttribute("faceIndex",new Ct(y,p)),e.push(E),r>ls&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Nh(n,e,t){let i=new ei(n,e,t);return i.texture.mapping=no,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Sl(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Mx(n,e,t){let i=new Float32Array(Mr),r=new R(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:Mr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Oh(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Bh(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Tu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Sx(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Na||l===Oa,u=l===pr||l===mr;if(c||u){let f=e.get(a),h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new us(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{let d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new us(n)),f=c?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function bx(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&qr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function wx(n,e,t,i){let r={},s=new WeakMap;function o(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];let d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){let h=f.attributes;for(let d in h)e.update(h[d],n.ARRAY_BUFFER)}function c(f){let h=[],d=f.index,g=f.attributes.position,_=0;if(d!==null){let A=d.array;_=d.version;for(let v=0,y=A.length;v<y;v+=3){let E=A[v+0],T=A[v+1],P=A[v+2];h.push(E,T,T,P,P,E)}}else if(g!==void 0){let A=g.array;_=g.version;for(let v=0,y=A.length/3-1;v<y;v+=3){let E=v+0,T=v+1,P=v+2;h.push(E,T,T,P,P,E)}}else return;let m=new(ou(h)?Ns:Fs)(h,1);m.version=_;let p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){let h=s.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function Ex(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,d){n.drawElements(i,d,s,h*o),t.update(d,i,1)}function c(h,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,h*o,g),t.update(d,i,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,i,1)}function f(h,d,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,h,0,_,0,g);let p=0;for(let A=0;A<g;A++)p+=d[A]*_[A];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Tx(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Ax(n,e,t){let i=new WeakMap,r=new Tt;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,h=i.get(a);if(h===void 0||h.count!==f){let b=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],A=a.morphAttributes.color||[],v=0;d===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let y=a.attributes.position.count*v,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*E*4*f),P=new Ds(T,y,E,f);P.type=Kn,P.needsUpdate=!0;let U=v*4;for(let M=0;M<f;M++){let I=m[M],L=p[M],G=A[M],D=y*E*4*M;for(let H=0;H<I.count;H++){let q=H*U;d===!0&&(r.fromBufferAttribute(I,H),T[D+q+0]=r.x,T[D+q+1]=r.y,T[D+q+2]=r.z,T[D+q+3]=0),g===!0&&(r.fromBufferAttribute(L,H),T[D+q+4]=r.x,T[D+q+5]=r.y,T[D+q+6]=r.z,T[D+q+7]=0),_===!0&&(r.fromBufferAttribute(G,H),T[D+q+8]=r.x,T[D+q+9]=r.y,T[D+q+10]=r.z,T[D+q+11]=G.itemSize===4?r.w:1)}}h={count:f,texture:P,size:new Me(y,E)},i.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Cx(n,e,t,i){let r=new WeakMap;function s(l){let c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var id=new vn,kh=new zs(1,1),rd=new Ds,sd=new Zr,od=new Bs,zh=[],Hh=[],Vh=new Float32Array(16),Gh=new Float32Array(9),Wh=new Float32Array(4);function fs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=zh[r];if(s===void 0&&(s=new Float32Array(r),zh[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function El(n,e){let t=Hh[e];t===void 0&&(t=new Int32Array(e),Hh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Rx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Px(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Zt(t,e)}}function Ix(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Zt(t,e)}}function Lx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Zt(t,e)}}function Dx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;Wh.set(i),n.uniformMatrix2fv(this.addr,!1,Wh),Zt(t,i)}}function Ux(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;Gh.set(i),n.uniformMatrix3fv(this.addr,!1,Gh),Zt(t,i)}}function Fx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;Vh.set(i),n.uniformMatrix4fv(this.addr,!1,Vh),Zt(t,i)}}function Nx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ox(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Zt(t,e)}}function Bx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Zt(t,e)}}function kx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Zt(t,e)}}function zx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Hx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Zt(t,e)}}function Vx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Zt(t,e)}}function Gx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Zt(t,e)}}function Wx(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(kh.compareFunction=ru,s=kh):s=id,t.setTexture2D(e||s,r)}function Xx(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||sd,r)}function qx(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||od,r)}function Yx(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||rd,r)}function Zx(n){switch(n){case 5126:return Rx;case 35664:return Px;case 35665:return Ix;case 35666:return Lx;case 35674:return Dx;case 35675:return Ux;case 35676:return Fx;case 5124:case 35670:return Nx;case 35667:case 35671:return Ox;case 35668:case 35672:return Bx;case 35669:case 35673:return kx;case 5125:return zx;case 36294:return Hx;case 36295:return Vx;case 36296:return Gx;case 35678:case 36198:case 36298:case 36306:case 35682:return Wx;case 35679:case 36299:case 36307:return Xx;case 35680:case 36300:case 36308:case 36293:return qx;case 36289:case 36303:case 36311:case 36292:return Yx}}function $x(n,e){n.uniform1fv(this.addr,e)}function Kx(n,e){let t=fs(e,this.size,2);n.uniform2fv(this.addr,t)}function Jx(n,e){let t=fs(e,this.size,3);n.uniform3fv(this.addr,t)}function jx(n,e){let t=fs(e,this.size,4);n.uniform4fv(this.addr,t)}function Qx(n,e){let t=fs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function e_(n,e){let t=fs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function t_(n,e){let t=fs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function n_(n,e){n.uniform1iv(this.addr,e)}function i_(n,e){n.uniform2iv(this.addr,e)}function r_(n,e){n.uniform3iv(this.addr,e)}function s_(n,e){n.uniform4iv(this.addr,e)}function o_(n,e){n.uniform1uiv(this.addr,e)}function a_(n,e){n.uniform2uiv(this.addr,e)}function l_(n,e){n.uniform3uiv(this.addr,e)}function c_(n,e){n.uniform4uiv(this.addr,e)}function u_(n,e,t){let i=this.cache,r=e.length,s=El(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||id,s[o])}function f_(n,e,t){let i=this.cache,r=e.length,s=El(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||sd,s[o])}function h_(n,e,t){let i=this.cache,r=e.length,s=El(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||od,s[o])}function d_(n,e,t){let i=this.cache,r=e.length,s=El(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||rd,s[o])}function p_(n){switch(n){case 5126:return $x;case 35664:return Kx;case 35665:return Jx;case 35666:return jx;case 35674:return Qx;case 35675:return e_;case 35676:return t_;case 5124:case 35670:return n_;case 35667:case 35671:return i_;case 35668:case 35672:return r_;case 35669:case 35673:return s_;case 5125:return o_;case 36294:return a_;case 36295:return l_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return u_;case 35679:case 36299:case 36307:return f_;case 35680:case 36300:case 36308:case 36293:return h_;case 36289:case 36303:case 36311:case 36292:return d_}}var _u=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Zx(t.type)}},yu=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=p_(t.type)}},vu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},xu=/(\w+)(\])?(\[|\.)?/g;function Xh(n,e){n.seq.push(e),n.map[e.id]=e}function m_(n,e,t){let i=n.name,r=i.length;for(xu.lastIndex=0;;){let s=xu.exec(i),o=xu.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Xh(t,c===void 0?new _u(a,n,e):new yu(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new vu(a),Xh(t,f)),t=f}}}var cs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);m_(s,o,this)}}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function qh(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var g_=37297,x_=0;function __(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var Yh=new ot;function y_(n){gt._getMatrix(Yh,gt.workingColorSpace,n);let e=`mat3( ${Yh.elements.map(t=>t.toFixed(4))} )`;switch(gt.getTransfer(n)){case Ps:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Zh(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+__(n.getShaderSource(e),a)}else return s}function v_(n,e){let t=y_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function M_(n,e){let t;switch(e){case ah:t="Linear";break;case lh:t="Reinhard";break;case ch:t="Cineon";break;case Fa:t="ACESFilmic";break;case fh:t="AgX";break;case hh:t="Neutral";break;case uh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var bl=new R;function S_(){gt.getLuminanceCoefficients(bl);let n=bl.x.toFixed(4),e=bl.y.toFixed(4),t=bl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function b_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(uo).join(`
`)}function w_(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function E_(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function uo(n){return n!==""}function $h(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var T_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mu(n){return n.replace(T_,C_)}var A_=new Map;function C_(n,e){let t=ut[e];if(t===void 0){let i=A_.get(e);if(i!==void 0)t=ut[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Mu(t)}var R_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jh(n){return n.replace(R_,P_)}function P_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function jh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function I_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===qc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ta?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===si&&(e="SHADOWMAP_TYPE_VSM"),e}function L_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case pr:case mr:e="ENVMAP_TYPE_CUBE";break;case no:e="ENVMAP_TYPE_CUBE_UV";break}return e}function D_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case mr:e="ENVMAP_MODE_REFRACTION";break}return e}function U_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ua:e="ENVMAP_BLENDING_MULTIPLY";break;case sh:e="ENVMAP_BLENDING_MIX";break;case oh:e="ENVMAP_BLENDING_ADD";break}return e}function F_(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function N_(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=I_(t),c=L_(t),u=D_(t),f=U_(t),h=F_(t),d=b_(t),g=w_(s),_=r.createProgram(),m,p,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(uo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(uo).join(`
`),p.length>0&&(p+=`
`)):(m=[jh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(uo).join(`
`),p=[jh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wi?"#define TONE_MAPPING":"",t.toneMapping!==wi?ut.tonemapping_pars_fragment:"",t.toneMapping!==wi?M_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,v_("linearToOutputTexel",t.outputColorSpace),S_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(uo).join(`
`)),o=Mu(o),o=$h(o,t),o=Kh(o,t),a=Mu(a),a=$h(a,t),a=Kh(a,t),o=Jh(o),a=Jh(a),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===lo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===lo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=A+m+o,y=A+p+a,E=qh(r,r.VERTEX_SHADER,v),T=qh(r,r.FRAGMENT_SHADER,y);r.attachShader(_,E),r.attachShader(_,T),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function P(I){if(n.debug.checkShaderErrors){let L=r.getProgramInfoLog(_)||"",G=r.getShaderInfoLog(E)||"",D=r.getShaderInfoLog(T)||"",H=L.trim(),q=G.trim(),W=D.trim(),z=!0,Y=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,E,T);else{let j=Zh(r,E,"vertex"),ae=Zh(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+j+`
`+ae)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(q===""||W==="")&&(Y=!1);Y&&(I.diagnostics={runnable:z,programLog:H,vertexShader:{log:q,prefix:m},fragmentShader:{log:W,prefix:p}})}r.deleteShader(E),r.deleteShader(T),U=new cs(r,_),b=E_(r,_)}let U;this.getUniforms=function(){return U===void 0&&P(this),U};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,g_)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=x_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=T,this}var O_=0,Su=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new bu(e),t.set(e,i)),i}},bu=class{constructor(e){this.id=O_++,this.code=e,this.usedTimes=0}};function B_(n,e,t,i,r,s,o){let a=new Us,l=new Su,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures,d=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,I,L,G){let D=L.fog,H=G.geometry,q=b.isMeshStandardMaterial?L.environment:null,W=(b.isMeshStandardMaterial?t:e).get(b.envMap||q),z=W&&W.mapping===no?W.image.height:null,Y=g[b.type];b.precision!==null&&(d=r.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let j=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ae=j!==void 0?j.length:0,he=0;H.morphAttributes.position!==void 0&&(he=1),H.morphAttributes.normal!==void 0&&(he=2),H.morphAttributes.color!==void 0&&(he=3);let Be,we,Ae,Q;if(Y){let at=oi[Y];Be=at.vertexShader,we=at.fragmentShader}else Be=b.vertexShader,we=b.fragmentShader,l.update(b),Ae=l.getVertexShaderID(b),Q=l.getFragmentShaderID(b);let ce=n.getRenderTarget(),$=n.state.buffers.depth.getReversed(),le=G.isInstancedMesh===!0,ne=G.isBatchedMesh===!0,Pe=!!b.map,Xe=!!b.matcap,C=!!W,oe=!!b.aoMap,V=!!b.lightMap,B=!!b.bumpMap,J=!!b.normalMap,ie=!!b.displacementMap,te=!!b.emissiveMap,ue=!!b.metalnessMap,_e=!!b.roughnessMap,Ee=b.anisotropy>0,w=b.clearcoat>0,x=b.dispersion>0,O=b.iridescence>0,K=b.sheen>0,re=b.transmission>0,Z=Ee&&!!b.anisotropyMap,Se=w&&!!b.clearcoatMap,me=w&&!!b.clearcoatNormalMap,Ie=w&&!!b.clearcoatRoughnessMap,Le=O&&!!b.iridescenceMap,de=O&&!!b.iridescenceThicknessMap,ye=K&&!!b.sheenColorMap,He=K&&!!b.sheenRoughnessMap,Ue=!!b.specularMap,Te=!!b.specularColorMap,Ze=!!b.specularIntensityMap,N=re&&!!b.transmissionMap,pe=re&&!!b.thicknessMap,Ce=!!b.gradientMap,Fe=!!b.alphaMap,ge=b.alphaTest>0,fe=!!b.alphaHash,Ne=!!b.extensions,Ye=wi;b.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Ye=n.toneMapping);let ht={shaderID:Y,shaderType:b.type,shaderName:b.name,vertexShader:Be,fragmentShader:we,defines:b.defines,customVertexShaderID:Ae,customFragmentShaderID:Q,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:ne,batchingColor:ne&&G._colorsTexture!==null,instancing:le,instancingColor:le&&G.instanceColor!==null,instancingMorph:le&&G.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ce===null?n.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:ar,alphaToCoverage:!!b.alphaToCoverage,map:Pe,matcap:Xe,envMap:C,envMapMode:C&&W.mapping,envMapCubeUVHeight:z,aoMap:oe,lightMap:V,bumpMap:B,normalMap:J,displacementMap:h&&ie,emissiveMap:te,normalMapObjectSpace:J&&b.normalMapType===gh,normalMapTangentSpace:J&&b.normalMapType===vl,metalnessMap:ue,roughnessMap:_e,anisotropy:Ee,anisotropyMap:Z,clearcoat:w,clearcoatMap:Se,clearcoatNormalMap:me,clearcoatRoughnessMap:Ie,dispersion:x,iridescence:O,iridescenceMap:Le,iridescenceThicknessMap:de,sheen:K,sheenColorMap:ye,sheenRoughnessMap:He,specularMap:Ue,specularColorMap:Te,specularIntensityMap:Ze,transmission:re,transmissionMap:N,thicknessMap:pe,gradientMap:Ce,opaque:b.transparent===!1&&b.blending===sr&&b.alphaToCoverage===!1,alphaMap:Fe,alphaTest:ge,alphaHash:fe,combine:b.combine,mapUv:Pe&&_(b.map.channel),aoMapUv:oe&&_(b.aoMap.channel),lightMapUv:V&&_(b.lightMap.channel),bumpMapUv:B&&_(b.bumpMap.channel),normalMapUv:J&&_(b.normalMap.channel),displacementMapUv:ie&&_(b.displacementMap.channel),emissiveMapUv:te&&_(b.emissiveMap.channel),metalnessMapUv:ue&&_(b.metalnessMap.channel),roughnessMapUv:_e&&_(b.roughnessMap.channel),anisotropyMapUv:Z&&_(b.anisotropyMap.channel),clearcoatMapUv:Se&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:me&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:de&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:He&&_(b.sheenRoughnessMap.channel),specularMapUv:Ue&&_(b.specularMap.channel),specularColorMapUv:Te&&_(b.specularColorMap.channel),specularIntensityMapUv:Ze&&_(b.specularIntensityMap.channel),transmissionMapUv:N&&_(b.transmissionMap.channel),thicknessMapUv:pe&&_(b.thicknessMap.channel),alphaMapUv:Fe&&_(b.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(J||Ee),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!H.attributes.uv&&(Pe||Fe),fog:!!D,useFog:b.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:$,skinning:G.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:he,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ye,decodeVideoTexture:Pe&&b.map.isVideoTexture===!0&&gt.getTransfer(b.map.colorSpace)===At,decodeVideoTextureEmissive:te&&b.emissiveMap.isVideoTexture===!0&&gt.getTransfer(b.emissiveMap.colorSpace)===At,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ot,flipSided:b.side===qt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ne&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&b.extensions.multiDraw===!0||ne)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ht.vertexUv1s=c.has(1),ht.vertexUv2s=c.has(2),ht.vertexUv3s=c.has(3),c.clear(),ht}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(A(M,b),v(M,b),M.push(n.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function A(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function y(b){let M=g[b.type],I;if(M){let L=oi[M];I=Ah.clone(L.uniforms)}else I=b.uniforms;return I}function E(b,M){let I;for(let L=0,G=u.length;L<G;L++){let D=u[L];if(D.cacheKey===M){I=D,++I.usedTimes;break}}return I===void 0&&(I=new N_(n,M,b,s),u.push(I)),I}function T(b){if(--b.usedTimes===0){let M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function P(b){l.remove(b)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:E,releaseProgram:T,releaseShaderCache:P,programs:u,dispose:U}}function k_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function z_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Qh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ed(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,h,d,g,_,m){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,h,d,g,_,m){let p=o(f,h,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(f,h,d,g,_,m){let p=o(f,h,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(f,h){t.length>1&&t.sort(f||z_),i.length>1&&i.sort(h||Qh),r.length>1&&r.sort(h||Qh)}function u(){for(let f=e,h=n.length;f<h;f++){let d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function H_(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new ed,n.set(i,[o])):r>=s.length?(o=new ed,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function V_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new nt};break;case"SpotLight":t={position:new R,direction:new R,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function G_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var W_=0;function X_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function q_(n){let e=new V_,t=G_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);let r=new R,s=new vt,o=new vt;function a(c){let u=0,f=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,A=0,v=0,y=0,E=0,T=0,P=0;c.sort(X_);for(let b=0,M=c.length;b<M;b++){let I=c[b],L=I.color,G=I.intensity,D=I.distance,H=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=L.r*G,f+=L.g*G,h+=L.b*G;else if(I.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(I.sh.coefficients[q],G);P++}else if(I.isDirectionalLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let W=I.shadow,z=t.get(I);z.shadowIntensity=W.intensity,z.shadowBias=W.bias,z.shadowNormalBias=W.normalBias,z.shadowRadius=W.radius,z.shadowMapSize=W.mapSize,i.directionalShadow[d]=z,i.directionalShadowMap[d]=H,i.directionalShadowMatrix[d]=I.shadow.matrix,A++}i.directional[d]=q,d++}else if(I.isSpotLight){let q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(L).multiplyScalar(G),q.distance=D,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,i.spot[_]=q;let W=I.shadow;if(I.map&&(i.spotLightMap[E]=I.map,E++,W.updateMatrices(I),I.castShadow&&T++),i.spotLightMatrix[_]=W.matrix,I.castShadow){let z=t.get(I);z.shadowIntensity=W.intensity,z.shadowBias=W.bias,z.shadowNormalBias=W.normalBias,z.shadowRadius=W.radius,z.shadowMapSize=W.mapSize,i.spotShadow[_]=z,i.spotShadowMap[_]=H,y++}_++}else if(I.isRectAreaLight){let q=e.get(I);q.color.copy(L).multiplyScalar(G),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=q,m++}else if(I.isPointLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){let W=I.shadow,z=t.get(I);z.shadowIntensity=W.intensity,z.shadowBias=W.bias,z.shadowNormalBias=W.normalBias,z.shadowRadius=W.radius,z.shadowMapSize=W.mapSize,z.shadowCameraNear=W.camera.near,z.shadowCameraFar=W.camera.far,i.pointShadow[g]=z,i.pointShadowMap[g]=H,i.pointShadowMatrix[g]=I.shadow.matrix,v++}i.point[g]=q,g++}else if(I.isHemisphereLight){let q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(G),q.groundColor.copy(I.groundColor).multiplyScalar(G),i.hemi[p]=q,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=De.LTC_FLOAT_1,i.rectAreaLTC2=De.LTC_FLOAT_2):(i.rectAreaLTC1=De.LTC_HALF_1,i.rectAreaLTC2=De.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;let U=i.hash;(U.directionalLength!==d||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==A||U.numPointShadows!==v||U.numSpotShadows!==y||U.numSpotMaps!==E||U.numLightProbes!==P)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=y+E-T,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,U.directionalLength=d,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=A,U.numPointShadows=v,U.numSpotShadows=y,U.numSpotMaps=E,U.numLightProbes=P,i.version=W_++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0,m=u.matrixWorldInverse;for(let p=0,A=c.length;p<A;p++){let v=c[p];if(v.isDirectionalLight){let y=i.directional[f];y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),f++}else if(v.isSpotLight){let y=i.spot[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),d++}else if(v.isRectAreaLight){let y=i.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(v.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let y=i.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){let y=i.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function td(n){let e=new q_(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Y_(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new td(n),e.set(r,[a])):s>=o.length?(a=new td(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var Z_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function K_(n,e,t){let i=new Jr,r=new Me,s=new Me,o=new Tt,a=new da({depthPacking:mh}),l=new pa,c={},u=t.maxTextureSize,f={[xi]:qt,[qt]:xi,[Ot]:Ot},h=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:Z_,fragmentShader:$_}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let g=new wt;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new dt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qc;let p=this.type;this.render=function(T,P,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let b=n.getRenderTarget(),M=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),L=n.state;L.setBlending(bi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let G=p!==si&&this.type===si,D=p===si&&this.type!==si;for(let H=0,q=T.length;H<q;H++){let W=T[H],z=W.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);let Y=z.getFrameExtents();if(r.multiply(Y),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Y.x),r.x=s.x*Y.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Y.y),r.y=s.y*Y.y,z.mapSize.y=s.y)),z.map===null||G===!0||D===!0){let ae=this.type!==si?{minFilter:yn,magFilter:yn}:{};z.map!==null&&z.map.dispose(),z.map=new ei(r.x,r.y,ae),z.map.texture.name=W.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();let j=z.getViewportCount();for(let ae=0;ae<j;ae++){let he=z.getViewport(ae);o.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),L.viewport(o),z.updateMatrices(W,ae),i=z.getFrustum(),y(P,U,z.camera,W,this.type)}z.isPointLightShadow!==!0&&this.type===si&&A(z,U),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,M,I)};function A(T,P){let U=e.update(_);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ei(r.x,r.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(P,null,U,h,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(P,null,U,d,_,null)}function v(T,P,U,b){let M=null,I=U.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)M=I;else if(M=U.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let L=M.uuid,G=P.uuid,D=c[L];D===void 0&&(D={},c[L]=D);let H=D[G];H===void 0&&(H=M.clone(),D[G]=H,P.addEventListener("dispose",E)),M=H}if(M.visible=P.visible,M.wireframe=P.wireframe,b===si?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:f[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let L=n.properties.get(M);L.light=U}return M}function y(T,P,U,b,M){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===si)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,T.matrixWorld);let G=e.update(T),D=T.material;if(Array.isArray(D)){let H=G.groups;for(let q=0,W=H.length;q<W;q++){let z=H[q],Y=D[z.materialIndex];if(Y&&Y.visible){let j=v(T,Y,b,M);T.onBeforeShadow(n,T,P,U,G,j,z),n.renderBufferDirect(U,null,G,j,T,z),T.onAfterShadow(n,T,P,U,G,j,z)}}}else if(D.visible){let H=v(T,D,b,M);T.onBeforeShadow(n,T,P,U,G,H,null),n.renderBufferDirect(U,null,G,H,T,null),T.onAfterShadow(n,T,P,U,G,H,null)}}let L=T.children;for(let G=0,D=L.length;G<D;G++)y(L[G],P,U,b,M)}function E(T){T.target.removeEventListener("dispose",E);for(let U in c){let b=c[U],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var J_={[Aa]:Ca,[Ra]:La,[Pa]:Da,[or]:Ia,[Ca]:Aa,[La]:Ra,[Da]:Pa,[Ia]:or};function j_(n,e){function t(){let N=!1,pe=new Tt,Ce=null,Fe=new Tt(0,0,0,0);return{setMask:function(ge){Ce!==ge&&!N&&(n.colorMask(ge,ge,ge,ge),Ce=ge)},setLocked:function(ge){N=ge},setClear:function(ge,fe,Ne,Ye,ht){ht===!0&&(ge*=Ye,fe*=Ye,Ne*=Ye),pe.set(ge,fe,Ne,Ye),Fe.equals(pe)===!1&&(n.clearColor(ge,fe,Ne,Ye),Fe.copy(pe))},reset:function(){N=!1,Ce=null,Fe.set(-1,0,0,0)}}}function i(){let N=!1,pe=!1,Ce=null,Fe=null,ge=null;return{setReversed:function(fe){if(pe!==fe){let Ne=e.get("EXT_clip_control");fe?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),pe=fe;let Ye=ge;ge=null,this.setClear(Ye)}},getReversed:function(){return pe},setTest:function(fe){fe?ce(n.DEPTH_TEST):$(n.DEPTH_TEST)},setMask:function(fe){Ce!==fe&&!N&&(n.depthMask(fe),Ce=fe)},setFunc:function(fe){if(pe&&(fe=J_[fe]),Fe!==fe){switch(fe){case Aa:n.depthFunc(n.NEVER);break;case Ca:n.depthFunc(n.ALWAYS);break;case Ra:n.depthFunc(n.LESS);break;case or:n.depthFunc(n.LEQUAL);break;case Pa:n.depthFunc(n.EQUAL);break;case Ia:n.depthFunc(n.GEQUAL);break;case La:n.depthFunc(n.GREATER);break;case Da:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Fe=fe}},setLocked:function(fe){N=fe},setClear:function(fe){ge!==fe&&(pe&&(fe=1-fe),n.clearDepth(fe),ge=fe)},reset:function(){N=!1,Ce=null,Fe=null,ge=null,pe=!1}}}function r(){let N=!1,pe=null,Ce=null,Fe=null,ge=null,fe=null,Ne=null,Ye=null,ht=null;return{setTest:function(at){N||(at?ce(n.STENCIL_TEST):$(n.STENCIL_TEST))},setMask:function(at){pe!==at&&!N&&(n.stencilMask(at),pe=at)},setFunc:function(at,Gt,$e){(Ce!==at||Fe!==Gt||ge!==$e)&&(n.stencilFunc(at,Gt,$e),Ce=at,Fe=Gt,ge=$e)},setOp:function(at,Gt,$e){(fe!==at||Ne!==Gt||Ye!==$e)&&(n.stencilOp(at,Gt,$e),fe=at,Ne=Gt,Ye=$e)},setLocked:function(at){N=at},setClear:function(at){ht!==at&&(n.clearStencil(at),ht=at)},reset:function(){N=!1,pe=null,Ce=null,Fe=null,ge=null,fe=null,Ne=null,Ye=null,ht=null}}}let s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap,u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,A=null,v=null,y=null,E=null,T=null,P=new nt(0,0,0),U=0,b=!1,M=null,I=null,L=null,G=null,D=null,H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,W=0,z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(z)[1]),q=W>=1):z.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),q=W>=2);let Y=null,j={},ae=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),Be=new Tt().fromArray(ae),we=new Tt().fromArray(he);function Ae(N,pe,Ce,Fe){let ge=new Uint8Array(4),fe=n.createTexture();n.bindTexture(N,fe),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<Ce;Ne++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,Fe,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(pe+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return fe}let Q={};Q[n.TEXTURE_2D]=Ae(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=Ae(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=Ae(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=Ae(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(n.DEPTH_TEST),o.setFunc(or),B(!1),J(Xc),ce(n.CULL_FACE),oe(bi);function ce(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function $(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function le(N,pe){return f[N]!==pe?(n.bindFramebuffer(N,pe),f[N]=pe,N===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=pe),N===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function ne(N,pe){let Ce=d,Fe=!1;if(N){Ce=h.get(pe),Ce===void 0&&(Ce=[],h.set(pe,Ce));let ge=N.textures;if(Ce.length!==ge.length||Ce[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,Ne=ge.length;fe<Ne;fe++)Ce[fe]=n.COLOR_ATTACHMENT0+fe;Ce.length=ge.length,Fe=!0}}else Ce[0]!==n.BACK&&(Ce[0]=n.BACK,Fe=!0);Fe&&n.drawBuffers(Ce)}function Pe(N){return g!==N?(n.useProgram(N),g=N,!0):!1}let Xe={[Oi]:n.FUNC_ADD,[Vf]:n.FUNC_SUBTRACT,[Gf]:n.FUNC_REVERSE_SUBTRACT};Xe[Wf]=n.MIN,Xe[Xf]=n.MAX;let C={[qf]:n.ZERO,[Yf]:n.ONE,[Zf]:n.SRC_COLOR,[Jo]:n.SRC_ALPHA,[eh]:n.SRC_ALPHA_SATURATE,[jf]:n.DST_COLOR,[Kf]:n.DST_ALPHA,[$f]:n.ONE_MINUS_SRC_COLOR,[jo]:n.ONE_MINUS_SRC_ALPHA,[Qf]:n.ONE_MINUS_DST_COLOR,[Jf]:n.ONE_MINUS_DST_ALPHA,[th]:n.CONSTANT_COLOR,[nh]:n.ONE_MINUS_CONSTANT_COLOR,[ih]:n.CONSTANT_ALPHA,[rh]:n.ONE_MINUS_CONSTANT_ALPHA};function oe(N,pe,Ce,Fe,ge,fe,Ne,Ye,ht,at){if(N===bi){_===!0&&($(n.BLEND),_=!1);return}if(_===!1&&(ce(n.BLEND),_=!0),N!==Hf){if(N!==m||at!==b){if((p!==Oi||y!==Oi)&&(n.blendEquation(n.FUNC_ADD),p=Oi,y=Oi),at)switch(N){case sr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yc:n.blendFunc(n.ONE,n.ONE);break;case Zc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case $c:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case sr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Zc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $c:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}A=null,v=null,E=null,T=null,P.set(0,0,0),U=0,m=N,b=at}return}ge=ge||pe,fe=fe||Ce,Ne=Ne||Fe,(pe!==p||ge!==y)&&(n.blendEquationSeparate(Xe[pe],Xe[ge]),p=pe,y=ge),(Ce!==A||Fe!==v||fe!==E||Ne!==T)&&(n.blendFuncSeparate(C[Ce],C[Fe],C[fe],C[Ne]),A=Ce,v=Fe,E=fe,T=Ne),(Ye.equals(P)===!1||ht!==U)&&(n.blendColor(Ye.r,Ye.g,Ye.b,ht),P.copy(Ye),U=ht),m=N,b=!1}function V(N,pe){N.side===Ot?$(n.CULL_FACE):ce(n.CULL_FACE);let Ce=N.side===qt;pe&&(Ce=!Ce),B(Ce),N.blending===sr&&N.transparent===!1?oe(bi):oe(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);let Fe=N.stencilWrite;a.setTest(Fe),Fe&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),te(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ce(n.SAMPLE_ALPHA_TO_COVERAGE):$(n.SAMPLE_ALPHA_TO_COVERAGE)}function B(N){M!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),M=N)}function J(N){N!==kf?(ce(n.CULL_FACE),N!==I&&(N===Xc?n.cullFace(n.BACK):N===zf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):$(n.CULL_FACE),I=N}function ie(N){N!==L&&(q&&n.lineWidth(N),L=N)}function te(N,pe,Ce){N?(ce(n.POLYGON_OFFSET_FILL),(G!==pe||D!==Ce)&&(n.polygonOffset(pe,Ce),G=pe,D=Ce)):$(n.POLYGON_OFFSET_FILL)}function ue(N){N?ce(n.SCISSOR_TEST):$(n.SCISSOR_TEST)}function _e(N){N===void 0&&(N=n.TEXTURE0+H-1),Y!==N&&(n.activeTexture(N),Y=N)}function Ee(N,pe,Ce){Ce===void 0&&(Y===null?Ce=n.TEXTURE0+H-1:Ce=Y);let Fe=j[Ce];Fe===void 0&&(Fe={type:void 0,texture:void 0},j[Ce]=Fe),(Fe.type!==N||Fe.texture!==pe)&&(Y!==Ce&&(n.activeTexture(Ce),Y=Ce),n.bindTexture(N,pe||Q[N]),Fe.type=N,Fe.texture=pe)}function w(){let N=j[Y];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Se(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ie(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Le(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function de(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ye(N){Be.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Be.copy(N))}function He(N){we.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),we.copy(N))}function Ue(N,pe){let Ce=c.get(pe);Ce===void 0&&(Ce=new WeakMap,c.set(pe,Ce));let Fe=Ce.get(N);Fe===void 0&&(Fe=n.getUniformBlockIndex(pe,N.name),Ce.set(N,Fe))}function Te(N,pe){let Fe=c.get(pe).get(N);l.get(pe)!==Fe&&(n.uniformBlockBinding(pe,Fe,N.__bindingPointIndex),l.set(pe,Fe))}function Ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Y=null,j={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,A=null,v=null,y=null,E=null,T=null,P=new nt(0,0,0),U=0,b=!1,M=null,I=null,L=null,G=null,D=null,Be.set(0,0,n.canvas.width,n.canvas.height),we.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ce,disable:$,bindFramebuffer:le,drawBuffers:ne,useProgram:Pe,setBlending:oe,setMaterial:V,setFlipSided:B,setCullFace:J,setLineWidth:ie,setPolygonOffset:te,setScissorTest:ue,activeTexture:_e,bindTexture:Ee,unbindTexture:w,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:Le,texImage3D:de,updateUBOMapping:Ue,uniformBlockBinding:Te,texStorage2D:me,texStorage3D:Ie,texSubImage2D:K,texSubImage3D:re,compressedTexSubImage2D:Z,compressedTexSubImage3D:Se,scissor:ye,viewport:He,reset:Ze}}function Q_(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Me,u=new WeakMap,f,h=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return d?new OffscreenCanvas(w,x):Ls("canvas")}function _(w,x,O){let K=1,re=Ee(w);if((re.width>O||re.height>O)&&(K=O/Math.max(re.width,re.height)),K<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let Z=Math.floor(K*re.width),Se=Math.floor(K*re.height);f===void 0&&(f=g(Z,Se));let me=x?g(Z,Se):f;return me.width=Z,me.height=Se,me.getContext("2d").drawImage(w,0,0,Z,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+Z+"x"+Se+")."),me}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){n.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(w,x,O,K,re=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Z=x;if(x===n.RED&&(O===n.FLOAT&&(Z=n.R32F),O===n.HALF_FLOAT&&(Z=n.R16F),O===n.UNSIGNED_BYTE&&(Z=n.R8)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.R8UI),O===n.UNSIGNED_SHORT&&(Z=n.R16UI),O===n.UNSIGNED_INT&&(Z=n.R32UI),O===n.BYTE&&(Z=n.R8I),O===n.SHORT&&(Z=n.R16I),O===n.INT&&(Z=n.R32I)),x===n.RG&&(O===n.FLOAT&&(Z=n.RG32F),O===n.HALF_FLOAT&&(Z=n.RG16F),O===n.UNSIGNED_BYTE&&(Z=n.RG8)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RG8UI),O===n.UNSIGNED_SHORT&&(Z=n.RG16UI),O===n.UNSIGNED_INT&&(Z=n.RG32UI),O===n.BYTE&&(Z=n.RG8I),O===n.SHORT&&(Z=n.RG16I),O===n.INT&&(Z=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),O===n.UNSIGNED_INT&&(Z=n.RGB32UI),O===n.BYTE&&(Z=n.RGB8I),O===n.SHORT&&(Z=n.RGB16I),O===n.INT&&(Z=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),O===n.UNSIGNED_INT&&(Z=n.RGBA32UI),O===n.BYTE&&(Z=n.RGBA8I),O===n.SHORT&&(Z=n.RGBA16I),O===n.INT&&(Z=n.RGBA32I)),x===n.RGB&&(O===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),x===n.RGBA){let Se=re?Ps:gt.getTransfer(K);O===n.FLOAT&&(Z=n.RGBA32F),O===n.HALF_FLOAT&&(Z=n.RGBA16F),O===n.UNSIGNED_BYTE&&(Z=Se===At?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(w,x){let O;return w?x===null||x===Yi||x===ss?O=n.DEPTH24_STENCIL8:x===Kn?O=n.DEPTH32F_STENCIL8:x===is&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Yi||x===ss?O=n.DEPTH_COMPONENT24:x===Kn?O=n.DEPTH_COMPONENT32F:x===is&&(O=n.DEPTH_COMPONENT16),O}function E(w,x){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==yn&&w.minFilter!==An?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function T(w){let x=w.target;x.removeEventListener("dispose",T),U(x),x.isVideoTexture&&u.delete(x)}function P(w){let x=w.target;x.removeEventListener("dispose",P),M(x)}function U(w){let x=i.get(w);if(x.__webglInit===void 0)return;let O=w.source,K=h.get(O);if(K){let re=K[x.__cacheKey];re.usedTimes--,re.usedTimes===0&&b(w),Object.keys(K).length===0&&h.delete(O)}i.remove(w)}function b(w){let x=i.get(w);n.deleteTexture(x.__webglTexture);let O=w.source,K=h.get(O);delete K[x.__cacheKey],o.memory.textures--}function M(w){let x=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(x.__webglFramebuffer[K]))for(let re=0;re<x.__webglFramebuffer[K].length;re++)n.deleteFramebuffer(x.__webglFramebuffer[K][re]);else n.deleteFramebuffer(x.__webglFramebuffer[K]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[K])}else{if(Array.isArray(x.__webglFramebuffer))for(let K=0;K<x.__webglFramebuffer.length;K++)n.deleteFramebuffer(x.__webglFramebuffer[K]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let K=0;K<x.__webglColorRenderbuffer.length;K++)x.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=w.textures;for(let K=0,re=O.length;K<re;K++){let Z=i.get(O[K]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(O[K])}i.remove(w)}let I=0;function L(){I=0}function G(){let w=I;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),I+=1,w}function D(w){let x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function H(w,x){let O=i.get(w);if(w.isVideoTexture&&ue(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&O.__version!==w.version){let K=w.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(O,w,x);return}}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function q(w,x){let O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){Q(O,w,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function W(w,x){let O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){Q(O,w,x);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function z(w,x){let O=i.get(w);if(w.version>0&&O.__version!==w.version){ce(O,w,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}let Y={[Qo]:n.REPEAT,[Ni]:n.CLAMP_TO_EDGE,[ea]:n.MIRRORED_REPEAT},j={[yn]:n.NEAREST,[dh]:n.NEAREST_MIPMAP_NEAREST,[io]:n.NEAREST_MIPMAP_LINEAR,[An]:n.LINEAR,[Ba]:n.LINEAR_MIPMAP_NEAREST,[qi]:n.LINEAR_MIPMAP_LINEAR},ae={[xh]:n.NEVER,[bh]:n.ALWAYS,[_h]:n.LESS,[ru]:n.LEQUAL,[yh]:n.EQUAL,[Sh]:n.GEQUAL,[vh]:n.GREATER,[Mh]:n.NOTEQUAL};function he(w,x){if(x.type===Kn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===An||x.magFilter===Ba||x.magFilter===io||x.magFilter===qi||x.minFilter===An||x.minFilter===Ba||x.minFilter===io||x.minFilter===qi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,Y[x.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,Y[x.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,Y[x.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,j[x.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,j[x.minFilter]),x.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,ae[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===yn||x.minFilter!==io&&x.minFilter!==qi||x.type===Kn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Be(w,x){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",T));let K=x.source,re=h.get(K);re===void 0&&(re={},h.set(K,re));let Z=D(x);if(Z!==w.__cacheKey){re[Z]===void 0&&(re[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,O=!0),re[Z].usedTimes++;let Se=re[w.__cacheKey];Se!==void 0&&(re[w.__cacheKey].usedTimes--,Se.usedTimes===0&&b(x)),w.__cacheKey=Z,w.__webglTexture=re[Z].texture}return O}function we(w,x,O){return Math.floor(Math.floor(w/O)/x)}function Ae(w,x,O,K){let Z=w.updateRanges;if(Z.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,O,K,x.data);else{Z.sort((de,ye)=>de.start-ye.start);let Se=0;for(let de=1;de<Z.length;de++){let ye=Z[Se],He=Z[de],Ue=ye.start+ye.count,Te=we(He.start,x.width,4),Ze=we(ye.start,x.width,4);He.start<=Ue+1&&Te===Ze&&we(He.start+He.count-1,x.width,4)===Te?ye.count=Math.max(ye.count,He.start+He.count-ye.start):(++Se,Z[Se]=He)}Z.length=Se+1;let me=n.getParameter(n.UNPACK_ROW_LENGTH),Ie=n.getParameter(n.UNPACK_SKIP_PIXELS),Le=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let de=0,ye=Z.length;de<ye;de++){let He=Z[de],Ue=Math.floor(He.start/4),Te=Math.ceil(He.count/4),Ze=Ue%x.width,N=Math.floor(Ue/x.width),pe=Te,Ce=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ze),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Ze,N,pe,Ce,O,K,x.data)}w.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,me),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ie),n.pixelStorei(n.UNPACK_SKIP_ROWS,Le)}}function Q(w,x,O){let K=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(K=n.TEXTURE_3D);let re=Be(w,x),Z=x.source;t.bindTexture(K,w.__webglTexture,n.TEXTURE0+O);let Se=i.get(Z);if(Z.version!==Se.__version||re===!0){t.activeTexture(n.TEXTURE0+O);let me=gt.getPrimaries(gt.workingColorSpace),Ie=x.colorSpace===Jn?null:gt.getPrimaries(x.colorSpace),Le=x.colorSpace===Jn||me===Ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let de=_(x.image,!1,r.maxTextureSize);de=_e(x,de);let ye=s.convert(x.format,x.colorSpace),He=s.convert(x.type),Ue=v(x.internalFormat,ye,He,x.colorSpace,x.isVideoTexture);he(K,x);let Te,Ze=x.mipmaps,N=x.isVideoTexture!==!0,pe=Se.__version===void 0||re===!0,Ce=Z.dataReady,Fe=E(x,de);if(x.isDepthTexture)Ue=y(x.format===os,x.type),pe&&(N?t.texStorage2D(n.TEXTURE_2D,1,Ue,de.width,de.height):t.texImage2D(n.TEXTURE_2D,0,Ue,de.width,de.height,0,ye,He,null));else if(x.isDataTexture)if(Ze.length>0){N&&pe&&t.texStorage2D(n.TEXTURE_2D,Fe,Ue,Ze[0].width,Ze[0].height);for(let ge=0,fe=Ze.length;ge<fe;ge++)Te=Ze[ge],N?Ce&&t.texSubImage2D(n.TEXTURE_2D,ge,0,0,Te.width,Te.height,ye,He,Te.data):t.texImage2D(n.TEXTURE_2D,ge,Ue,Te.width,Te.height,0,ye,He,Te.data);x.generateMipmaps=!1}else N?(pe&&t.texStorage2D(n.TEXTURE_2D,Fe,Ue,de.width,de.height),Ce&&Ae(x,de,ye,He)):t.texImage2D(n.TEXTURE_2D,0,Ue,de.width,de.height,0,ye,He,de.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){N&&pe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Fe,Ue,Ze[0].width,Ze[0].height,de.depth);for(let ge=0,fe=Ze.length;ge<fe;ge++)if(Te=Ze[ge],x.format!==Sn)if(ye!==null)if(N){if(Ce)if(x.layerUpdates.size>0){let Ne=fu(Te.width,Te.height,x.format,x.type);for(let Ye of x.layerUpdates){let ht=Te.data.subarray(Ye*Ne/Te.data.BYTES_PER_ELEMENT,(Ye+1)*Ne/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ge,0,0,Ye,Te.width,Te.height,1,ye,ht)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ge,0,0,0,Te.width,Te.height,de.depth,ye,Te.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ge,Ue,Te.width,Te.height,de.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?Ce&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ge,0,0,0,Te.width,Te.height,de.depth,ye,He,Te.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ge,Ue,Te.width,Te.height,de.depth,0,ye,He,Te.data)}else{N&&pe&&t.texStorage2D(n.TEXTURE_2D,Fe,Ue,Ze[0].width,Ze[0].height);for(let ge=0,fe=Ze.length;ge<fe;ge++)Te=Ze[ge],x.format!==Sn?ye!==null?N?Ce&&t.compressedTexSubImage2D(n.TEXTURE_2D,ge,0,0,Te.width,Te.height,ye,Te.data):t.compressedTexImage2D(n.TEXTURE_2D,ge,Ue,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?Ce&&t.texSubImage2D(n.TEXTURE_2D,ge,0,0,Te.width,Te.height,ye,He,Te.data):t.texImage2D(n.TEXTURE_2D,ge,Ue,Te.width,Te.height,0,ye,He,Te.data)}else if(x.isDataArrayTexture)if(N){if(pe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Fe,Ue,de.width,de.height,de.depth),Ce)if(x.layerUpdates.size>0){let ge=fu(de.width,de.height,x.format,x.type);for(let fe of x.layerUpdates){let Ne=de.data.subarray(fe*ge/de.data.BYTES_PER_ELEMENT,(fe+1)*ge/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,de.width,de.height,1,ye,He,Ne)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,ye,He,de.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,de.width,de.height,de.depth,0,ye,He,de.data);else if(x.isData3DTexture)N?(pe&&t.texStorage3D(n.TEXTURE_3D,Fe,Ue,de.width,de.height,de.depth),Ce&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,ye,He,de.data)):t.texImage3D(n.TEXTURE_3D,0,Ue,de.width,de.height,de.depth,0,ye,He,de.data);else if(x.isFramebufferTexture){if(pe)if(N)t.texStorage2D(n.TEXTURE_2D,Fe,Ue,de.width,de.height);else{let ge=de.width,fe=de.height;for(let Ne=0;Ne<Fe;Ne++)t.texImage2D(n.TEXTURE_2D,Ne,Ue,ge,fe,0,ye,He,null),ge>>=1,fe>>=1}}else if(Ze.length>0){if(N&&pe){let ge=Ee(Ze[0]);t.texStorage2D(n.TEXTURE_2D,Fe,Ue,ge.width,ge.height)}for(let ge=0,fe=Ze.length;ge<fe;ge++)Te=Ze[ge],N?Ce&&t.texSubImage2D(n.TEXTURE_2D,ge,0,0,ye,He,Te):t.texImage2D(n.TEXTURE_2D,ge,Ue,ye,He,Te);x.generateMipmaps=!1}else if(N){if(pe){let ge=Ee(de);t.texStorage2D(n.TEXTURE_2D,Fe,Ue,ge.width,ge.height)}Ce&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ye,He,de)}else t.texImage2D(n.TEXTURE_2D,0,Ue,ye,He,de);m(x)&&p(K),Se.__version=Z.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function ce(w,x,O){if(x.image.length!==6)return;let K=Be(w,x),re=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+O);let Z=i.get(re);if(re.version!==Z.__version||K===!0){t.activeTexture(n.TEXTURE0+O);let Se=gt.getPrimaries(gt.workingColorSpace),me=x.colorSpace===Jn?null:gt.getPrimaries(x.colorSpace),Ie=x.colorSpace===Jn||Se===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let Le=x.isCompressedTexture||x.image[0].isCompressedTexture,de=x.image[0]&&x.image[0].isDataTexture,ye=[];for(let fe=0;fe<6;fe++)!Le&&!de?ye[fe]=_(x.image[fe],!0,r.maxCubemapSize):ye[fe]=de?x.image[fe].image:x.image[fe],ye[fe]=_e(x,ye[fe]);let He=ye[0],Ue=s.convert(x.format,x.colorSpace),Te=s.convert(x.type),Ze=v(x.internalFormat,Ue,Te,x.colorSpace),N=x.isVideoTexture!==!0,pe=Z.__version===void 0||K===!0,Ce=re.dataReady,Fe=E(x,He);he(n.TEXTURE_CUBE_MAP,x);let ge;if(Le){N&&pe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Fe,Ze,He.width,He.height);for(let fe=0;fe<6;fe++){ge=ye[fe].mipmaps;for(let Ne=0;Ne<ge.length;Ne++){let Ye=ge[Ne];x.format!==Sn?Ue!==null?N?Ce&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ne,0,0,Ye.width,Ye.height,Ue,Ye.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ne,Ze,Ye.width,Ye.height,0,Ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ne,0,0,Ye.width,Ye.height,Ue,Te,Ye.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ne,Ze,Ye.width,Ye.height,0,Ue,Te,Ye.data)}}}else{if(ge=x.mipmaps,N&&pe){ge.length>0&&Fe++;let fe=Ee(ye[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Fe,Ze,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(de){N?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,ye[fe].width,ye[fe].height,Ue,Te,ye[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,Ze,ye[fe].width,ye[fe].height,0,Ue,Te,ye[fe].data);for(let Ne=0;Ne<ge.length;Ne++){let ht=ge[Ne].image[fe].image;N?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ne+1,0,0,ht.width,ht.height,Ue,Te,ht.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ne+1,Ze,ht.width,ht.height,0,Ue,Te,ht.data)}}else{N?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ue,Te,ye[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,Ze,Ue,Te,ye[fe]);for(let Ne=0;Ne<ge.length;Ne++){let Ye=ge[Ne];N?Ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ne+1,0,0,Ue,Te,Ye.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ne+1,Ze,Ue,Te,Ye.image[fe])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),Z.__version=re.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function $(w,x,O,K,re,Z){let Se=s.convert(O.format,O.colorSpace),me=s.convert(O.type),Ie=v(O.internalFormat,Se,me,O.colorSpace),Le=i.get(x),de=i.get(O);if(de.__renderTarget=x,!Le.__hasExternalTextures){let ye=Math.max(1,x.width>>Z),He=Math.max(1,x.height>>Z);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,Z,Ie,ye,He,x.depth,0,Se,me,null):t.texImage2D(re,Z,Ie,ye,He,0,Se,me,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),te(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,re,de.__webglTexture,0,ie(x)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,re,de.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function le(w,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,w),x.depthBuffer){let K=x.depthTexture,re=K&&K.isDepthTexture?K.type:null,Z=y(x.stencilBuffer,re),Se=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=ie(x);te(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,me,Z,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,me,Z,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Z,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Se,n.RENDERBUFFER,w)}else{let K=x.textures;for(let re=0;re<K.length;re++){let Z=K[re],Se=s.convert(Z.format,Z.colorSpace),me=s.convert(Z.type),Ie=v(Z.internalFormat,Se,me,Z.colorSpace),Le=ie(x);O&&te(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,Ie,x.width,x.height):te(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Le,Ie,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Ie,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ne(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let K=i.get(x.depthTexture);K.__renderTarget=x,(!K.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),H(x.depthTexture,0);let re=K.__webglTexture,Z=ie(x);if(x.depthTexture.format===Wr)te(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0);else if(x.depthTexture.format===os)te(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Pe(w){let x=i.get(w),O=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){let K=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),K){let re=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,K.removeEventListener("dispose",re)};K.addEventListener("dispose",re),x.__depthDisposeCallback=re}x.__boundDepthTexture=K}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let K=w.texture.mipmaps;K&&K.length>0?ne(x.__webglFramebuffer[0],w):ne(x.__webglFramebuffer,w)}else if(O){x.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[K]),x.__webglDepthbuffer[K]===void 0)x.__webglDepthbuffer[K]=n.createRenderbuffer(),le(x.__webglDepthbuffer[K],w,!1);else{let re=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,Z)}}else{let K=w.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),le(x.__webglDepthbuffer,w,!1);else{let re=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,Z)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Xe(w,x,O){let K=i.get(w);x!==void 0&&$(K.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Pe(w)}function C(w){let x=w.texture,O=i.get(w),K=i.get(x);w.addEventListener("dispose",P);let re=w.textures,Z=w.isWebGLCubeRenderTarget===!0,Se=re.length>1;if(Se||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=x.version,o.memory.textures++),Z){O.__webglFramebuffer=[];for(let me=0;me<6;me++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[me]=[];for(let Ie=0;Ie<x.mipmaps.length;Ie++)O.__webglFramebuffer[me][Ie]=n.createFramebuffer()}else O.__webglFramebuffer[me]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let me=0;me<x.mipmaps.length;me++)O.__webglFramebuffer[me]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Se)for(let me=0,Ie=re.length;me<Ie;me++){let Le=i.get(re[me]);Le.__webglTexture===void 0&&(Le.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&te(w)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let me=0;me<re.length;me++){let Ie=re[me];O.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[me]);let Le=s.convert(Ie.format,Ie.colorSpace),de=s.convert(Ie.type),ye=v(Ie.internalFormat,Le,de,Ie.colorSpace,w.isXRRenderTarget===!0),He=ie(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,He,ye,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,O.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),le(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),he(n.TEXTURE_CUBE_MAP,x);for(let me=0;me<6;me++)if(x.mipmaps&&x.mipmaps.length>0)for(let Ie=0;Ie<x.mipmaps.length;Ie++)$(O.__webglFramebuffer[me][Ie],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie);else $(O.__webglFramebuffer[me],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);m(x)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let me=0,Ie=re.length;me<Ie;me++){let Le=re[me],de=i.get(Le),ye=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ye=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ye,de.__webglTexture),he(ye,Le),$(O.__webglFramebuffer,w,Le,n.COLOR_ATTACHMENT0+me,ye,0),m(Le)&&p(ye)}t.unbindTexture()}else{let me=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(me=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,K.__webglTexture),he(me,x),x.mipmaps&&x.mipmaps.length>0)for(let Ie=0;Ie<x.mipmaps.length;Ie++)$(O.__webglFramebuffer[Ie],w,x,n.COLOR_ATTACHMENT0,me,Ie);else $(O.__webglFramebuffer,w,x,n.COLOR_ATTACHMENT0,me,0);m(x)&&p(me),t.unbindTexture()}w.depthBuffer&&Pe(w)}function oe(w){let x=w.textures;for(let O=0,K=x.length;O<K;O++){let re=x[O];if(m(re)){let Z=A(w),Se=i.get(re).__webglTexture;t.bindTexture(Z,Se),p(Z),t.unbindTexture()}}}let V=[],B=[];function J(w){if(w.samples>0){if(te(w)===!1){let x=w.textures,O=w.width,K=w.height,re=n.COLOR_BUFFER_BIT,Z=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Se=i.get(w),me=x.length>1;if(me)for(let Le=0;Le<x.length;Le++)t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);let Ie=w.texture.mipmaps;Ie&&Ie.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Le=0;Le<x.length;Le++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),me){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Se.__webglColorRenderbuffer[Le]);let de=i.get(x[Le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,de,0)}n.blitFramebuffer(0,0,O,K,0,0,O,K,re,n.NEAREST),l===!0&&(V.length=0,B.length=0,V.push(n.COLOR_ATTACHMENT0+Le),w.depthBuffer&&w.resolveDepthBuffer===!1&&(V.push(Z),B.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,B)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,V))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let Le=0;Le<x.length;Le++){t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,Se.__webglColorRenderbuffer[Le]);let de=i.get(x[Le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,de,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let x=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function ie(w){return Math.min(r.maxSamples,w.samples)}function te(w){let x=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ue(w){let x=o.render.frame;u.get(w)!==x&&(u.set(w,x),w.update())}function _e(w,x){let O=w.colorSpace,K=w.format,re=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==ar&&O!==Jn&&(gt.getTransfer(O)===At?(K!==Sn||re!==$n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function Ee(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=L,this.setTexture2D=H,this.setTexture2DArray=q,this.setTexture3D=W,this.setTextureCube=z,this.rebindTextures=Xe,this.setupRenderTarget=C,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=$,this.useMultisampledRTT=te}function ey(n,e){function t(i,r=Jn){let s,o=gt.getTransfer(r);if(i===$n)return n.UNSIGNED_BYTE;if(i===za)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ha)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Qc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===eu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Jc)return n.BYTE;if(i===jc)return n.SHORT;if(i===is)return n.UNSIGNED_SHORT;if(i===ka)return n.INT;if(i===Yi)return n.UNSIGNED_INT;if(i===Kn)return n.FLOAT;if(i===rs)return n.HALF_FLOAT;if(i===tu)return n.ALPHA;if(i===nu)return n.RGB;if(i===Sn)return n.RGBA;if(i===Wr)return n.DEPTH_COMPONENT;if(i===os)return n.DEPTH_STENCIL;if(i===Va)return n.RED;if(i===Ga)return n.RED_INTEGER;if(i===iu)return n.RG;if(i===Wa)return n.RG_INTEGER;if(i===Xa)return n.RGBA_INTEGER;if(i===ro||i===so||i===oo||i===ao)if(o===At)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ro)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===so)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===oo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ao)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ro)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===so)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===oo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ao)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===qa||i===Ya||i===Za||i===$a)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===qa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ya)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Za)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$a)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ka||i===Ja||i===ja)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ka||i===Ja)return o===At?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ja)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qa||i===el||i===tl||i===nl||i===il||i===rl||i===sl||i===ol||i===al||i===ll||i===cl||i===ul||i===fl||i===hl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Qa)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===el)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===tl)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===nl)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===il)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===rl)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sl)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ol)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===al)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ll)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===cl)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ul)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===fl)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===hl)return o===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===dl||i===pl||i===ml)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===dl)return o===At?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ml)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===gl||i===xl||i===_l||i===yl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===gl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===xl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_l)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ss?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var ty=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ny=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Hs(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new un({vertexShader:ty,fragmentShader:ny,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dt(new hr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Eu=class extends Qn{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null,_=typeof XRWebGLBinding<"u",m=new wu,p={},A=t.getContextAttributes(),v=null,y=null,E=[],T=[],P=new Me,U=null,b=new tn;b.viewport=new Tt;let M=new tn;M.viewport=new Tt;let I=[b,M],L=new Ea,G=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ce=E[Q];return ce===void 0&&(ce=new $r,E[Q]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(Q){let ce=E[Q];return ce===void 0&&(ce=new $r,E[Q]=ce),ce.getGripSpace()},this.getHand=function(Q){let ce=E[Q];return ce===void 0&&(ce=new $r,E[Q]=ce),ce.getHandSpace()};function H(Q){let ce=T.indexOf(Q.inputSource);if(ce===-1)return;let $=E[ce];$!==void 0&&($.update(Q.inputSource,Q.frame,c||o),$.dispatchEvent({type:Q.type,data:Q.inputSource}))}function q(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",W);for(let Q=0;Q<E.length;Q++){let ce=T[Q];ce!==null&&(T[Q]=null,E[Q].disconnect(ce))}G=null,D=null,m.reset();for(let Q in p)delete p[Q];e.setRenderTarget(v),d=null,h=null,f=null,r=null,y=null,Ae.stop(),i.isPresenting=!1,e.setPixelRatio(U),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",q),r.addEventListener("inputsourceschange",W),A.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let $=null,le=null,ne=null;A.depth&&(ne=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=A.stencil?os:Wr,le=A.stencil?ss:Yi);let Pe={colorFormat:t.RGBA8,depthFormat:ne,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(Pe),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new ei(h.textureWidth,h.textureHeight,{format:Sn,type:$n,depthTexture:new zs(h.textureWidth,h.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let $={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,$),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new ei(d.framebufferWidth,d.framebufferHeight,{format:Sn,type:$n,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ae.setContext(r),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function W(Q){for(let ce=0;ce<Q.removed.length;ce++){let $=Q.removed[ce],le=T.indexOf($);le>=0&&(T[le]=null,E[le].disconnect($))}for(let ce=0;ce<Q.added.length;ce++){let $=Q.added[ce],le=T.indexOf($);if(le===-1){for(let Pe=0;Pe<E.length;Pe++)if(Pe>=T.length){T.push($),le=Pe;break}else if(T[Pe]===null){T[Pe]=$,le=Pe;break}if(le===-1)break}let ne=E[le];ne&&ne.connect($)}}let z=new R,Y=new R;function j(Q,ce,$){z.setFromMatrixPosition(ce.matrixWorld),Y.setFromMatrixPosition($.matrixWorld);let le=z.distanceTo(Y),ne=ce.projectionMatrix.elements,Pe=$.projectionMatrix.elements,Xe=ne[14]/(ne[10]-1),C=ne[14]/(ne[10]+1),oe=(ne[9]+1)/ne[5],V=(ne[9]-1)/ne[5],B=(ne[8]-1)/ne[0],J=(Pe[8]+1)/Pe[0],ie=Xe*B,te=Xe*J,ue=le/(-B+J),_e=ue*-B;if(ce.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(_e),Q.translateZ(ue),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),ne[10]===-1)Q.projectionMatrix.copy(ce.projectionMatrix),Q.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{let Ee=Xe+ue,w=C+ue,x=ie-_e,O=te+(le-_e),K=oe*C/w*Ee,re=V*C/w*Ee;Q.projectionMatrix.makePerspective(x,O,K,re,Ee,w),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ae(Q,ce){ce===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ce.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let ce=Q.near,$=Q.far;m.texture!==null&&(m.depthNear>0&&(ce=m.depthNear),m.depthFar>0&&($=m.depthFar)),L.near=M.near=b.near=ce,L.far=M.far=b.far=$,(G!==L.near||D!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),G=L.near,D=L.far),L.layers.mask=Q.layers.mask|6,b.layers.mask=L.layers.mask&3,M.layers.mask=L.layers.mask&5;let le=Q.parent,ne=L.cameras;ae(L,le);for(let Pe=0;Pe<ne.length;Pe++)ae(ne[Pe],le);ne.length===2?j(L,b,M):L.projectionMatrix.copy(b.projectionMatrix),he(Q,L,le)};function he(Q,ce,$){$===null?Q.matrix.copy(ce.matrixWorld):(Q.matrix.copy($.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ce.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ce.projectionMatrix),Q.projectionMatrixInverse.copy(ce.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Xr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Q){l=Q,h!==null&&(h.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(Q){return p[Q]};let Be=null;function we(Q,ce){if(u=ce.getViewerPose(c||o),g=ce,u!==null){let $=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let le=!1;$.length!==L.cameras.length&&(L.cameras.length=0,le=!0);for(let C=0;C<$.length;C++){let oe=$[C],V=null;if(d!==null)V=d.getViewport(oe);else{let J=f.getViewSubImage(h,oe);V=J.viewport,C===0&&(e.setRenderTargetTextures(y,J.colorTexture,J.depthStencilTexture),e.setRenderTarget(y))}let B=I[C];B===void 0&&(B=new tn,B.layers.enable(C),B.viewport=new Tt,I[C]=B),B.matrix.fromArray(oe.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(oe.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(V.x,V.y,V.width,V.height),C===0&&(L.matrix.copy(B.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),le===!0&&L.cameras.push(B)}let ne=r.enabledFeatures;if(ne&&ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=i.getBinding();let C=f.getDepthInformation($[0]);C&&C.isValid&&C.texture&&m.init(C,r.renderState)}if(ne&&ne.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let C=0;C<$.length;C++){let oe=$[C].camera;if(oe){let V=p[oe];V||(V=new Hs,p[oe]=V);let B=f.getCameraImage(oe);V.sourceTexture=B}}}}for(let $=0;$<E.length;$++){let le=T[$],ne=E[$];le!==null&&ne!==void 0&&ne.update(le,ce,c||o)}Be&&Be(Q,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),g=null}let Ae=new nd;Ae.setAnimationLoop(we),this.setAnimationLoop=function(Q){Be=Q},this.dispose=function(){}}},yr=new Bn,iy=new vt;function ry(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,au(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,A,v,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,A,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===qt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===qt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let A=e.get(p),v=A.envMap,y=A.envMapRotation;v&&(m.envMap.value=v,yr.copy(y),yr.x*=-1,yr.y*=-1,yr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(yr.y*=-1,yr.z*=-1),m.envMapRotation.value.setFromMatrix4(iy.makeRotationFromEuler(yr)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,A,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*A,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,A){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let A=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function sy(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,v){let y=v.program;i.uniformBlockBinding(A,y)}function c(A,v){let y=r[A.id];y===void 0&&(g(A),y=u(A),r[A.id]=y,A.addEventListener("dispose",m));let E=v.program;i.updateUBOMapping(A,E);let T=e.render.frame;s[A.id]!==T&&(h(A),s[A.id]=T)}function u(A){let v=f();A.__bindingPointIndex=v;let y=n.createBuffer(),E=A.__size,T=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,E,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,y),y}function f(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(A){let v=r[A.id],y=A.uniforms,E=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let T=0,P=y.length;T<P;T++){let U=Array.isArray(y[T])?y[T]:[y[T]];for(let b=0,M=U.length;b<M;b++){let I=U[b];if(d(I,T,b,E)===!0){let L=I.__offset,G=Array.isArray(I.value)?I.value:[I.value],D=0;for(let H=0;H<G.length;H++){let q=G[H],W=_(q);typeof q=="number"||typeof q=="boolean"?(I.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,L+D,I.__data)):q.isMatrix3?(I.__data[0]=q.elements[0],I.__data[1]=q.elements[1],I.__data[2]=q.elements[2],I.__data[3]=0,I.__data[4]=q.elements[3],I.__data[5]=q.elements[4],I.__data[6]=q.elements[5],I.__data[7]=0,I.__data[8]=q.elements[6],I.__data[9]=q.elements[7],I.__data[10]=q.elements[8],I.__data[11]=0):(q.toArray(I.__data,D),D+=W.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(A,v,y,E){let T=A.value,P=v+"_"+y;if(E[P]===void 0)return typeof T=="number"||typeof T=="boolean"?E[P]=T:E[P]=T.clone(),!0;{let U=E[P];if(typeof T=="number"||typeof T=="boolean"){if(U!==T)return E[P]=T,!0}else if(U.equals(T)===!1)return U.copy(T),!0}return!1}function g(A){let v=A.uniforms,y=0,E=16;for(let P=0,U=v.length;P<U;P++){let b=Array.isArray(v[P])?v[P]:[v[P]];for(let M=0,I=b.length;M<I;M++){let L=b[M],G=Array.isArray(L.value)?L.value:[L.value];for(let D=0,H=G.length;D<H;D++){let q=G[D],W=_(q),z=y%E,Y=z%W.boundary,j=z+Y;y+=Y,j!==0&&E-j<W.storage&&(y+=E-j),L.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=y,y+=W.storage}}}let T=y%E;return T>0&&(y+=E-T),A.__size=y,A.__cache={},this}function _(A){let v={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(v.boundary=4,v.storage=4):A.isVector2?(v.boundary=8,v.storage=8):A.isVector3||A.isColor?(v.boundary=16,v.storage=12):A.isVector4?(v.boundary=16,v.storage=16):A.isMatrix3?(v.boundary=48,v.storage=48):A.isMatrix4?(v.boundary=64,v.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),v}function m(A){let v=A.target;v.removeEventListener("dispose",m);let y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function p(){for(let A in r)n.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}var wl=class{constructor(e={}){let{canvas:t=wh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,A=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,E=!1;this._outputColorSpace=gn;let T=0,P=0,U=null,b=-1,M=null,I=new Tt,L=new Tt,G=null,D=new nt(0),H=0,q=t.width,W=t.height,z=1,Y=null,j=null,ae=new Tt(0,0,q,W),he=new Tt(0,0,q,W),Be=!1,we=new Jr,Ae=!1,Q=!1,ce=new vt,$=new R,le=new Tt,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pe=!1;function Xe(){return U===null?z:1}let C=i;function oe(S,F){return t.getContext(S,F)}try{let S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",Fe,!1),t.addEventListener("webglcontextcreationerror",ge,!1),C===null){let F="webgl2";if(C=oe(F,S),C===null)throw oe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let V,B,J,ie,te,ue,_e,Ee,w,x,O,K,re,Z,Se,me,Ie,Le,de,ye,He,Ue,Te,Ze;function N(){V=new bx(C),V.init(),Ue=new ey(C,V),B=new gx(C,V,e,Ue),J=new j_(C,V),B.reversedDepthBuffer&&h&&J.buffers.depth.setReversed(!0),ie=new Tx(C),te=new k_,ue=new Q_(C,V,J,te,B,Ue,ie),_e=new _x(y),Ee=new Sx(y),w=new Lm(C),Te=new px(C,w),x=new wx(C,w,ie,Te),O=new Cx(C,x,w,ie),de=new Ax(C,B,ue),me=new xx(te),K=new B_(y,_e,Ee,V,B,Te,me),re=new ry(y,te),Z=new H_,Se=new Y_(V),Le=new dx(y,_e,Ee,J,O,d,l),Ie=new K_(y,O,B),Ze=new sy(C,ie,B,J),ye=new mx(C,V,ie),He=new Ex(C,V,ie),ie.programs=K.programs,y.capabilities=B,y.extensions=V,y.properties=te,y.renderLists=Z,y.shadowMap=Ie,y.state=J,y.info=ie}N();let pe=new Eu(y,C);this.xr=pe,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let S=V.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=V.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(S){S!==void 0&&(z=S,this.setSize(q,W,!1))},this.getSize=function(S){return S.set(q,W)},this.setSize=function(S,F,X=!0){if(pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,W=F,t.width=Math.floor(S*z),t.height=Math.floor(F*z),X===!0&&(t.style.width=S+"px",t.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(q*z,W*z).floor()},this.setDrawingBufferSize=function(S,F,X){q=S,W=F,z=X,t.width=Math.floor(S*X),t.height=Math.floor(F*X),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy(ae)},this.setViewport=function(S,F,X,ee){S.isVector4?ae.set(S.x,S.y,S.z,S.w):ae.set(S,F,X,ee),J.viewport(I.copy(ae).multiplyScalar(z).round())},this.getScissor=function(S){return S.copy(he)},this.setScissor=function(S,F,X,ee){S.isVector4?he.set(S.x,S.y,S.z,S.w):he.set(S,F,X,ee),J.scissor(L.copy(he).multiplyScalar(z).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(S){J.setScissorTest(Be=S)},this.setOpaqueSort=function(S){Y=S},this.setTransparentSort=function(S){j=S},this.getClearColor=function(S){return S.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,X=!0){let ee=0;if(S){let k=!1;if(U!==null){let xe=U.texture.format;k=xe===Xa||xe===Wa||xe===Ga}if(k){let xe=U.texture.type,ve=xe===$n||xe===Yi||xe===is||xe===ss||xe===za||xe===Ha,Ve=Le.getClearColor(),Oe=Le.getClearAlpha(),Ke=Ve.r,Je=Ve.g,We=Ve.b;ve?(g[0]=Ke,g[1]=Je,g[2]=We,g[3]=Oe,C.clearBufferuiv(C.COLOR,0,g)):(_[0]=Ke,_[1]=Je,_[2]=We,_[3]=Oe,C.clearBufferiv(C.COLOR,0,_))}else ee|=C.COLOR_BUFFER_BIT}F&&(ee|=C.DEPTH_BUFFER_BIT),X&&(ee|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",Fe,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),Le.dispose(),Z.dispose(),Se.dispose(),te.dispose(),_e.dispose(),Ee.dispose(),O.dispose(),Te.dispose(),Ze.dispose(),K.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",$e),pe.removeEventListener("sessionend",rn),sn.stop()};function Ce(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Fe(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let S=ie.autoReset,F=Ie.enabled,X=Ie.autoUpdate,ee=Ie.needsUpdate,k=Ie.type;N(),ie.autoReset=S,Ie.enabled=F,Ie.autoUpdate=X,Ie.needsUpdate=ee,Ie.type=k}function ge(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function fe(S){let F=S.target;F.removeEventListener("dispose",fe),Ne(F)}function Ne(S){Ye(S),te.remove(S)}function Ye(S){let F=te.get(S).programs;F!==void 0&&(F.forEach(function(X){K.releaseProgram(X)}),S.isShaderMaterial&&K.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,X,ee,k,xe){F===null&&(F=ne);let ve=k.isMesh&&k.matrixWorld.determinant()<0,Ve=it(S,F,X,ee,k);J.setMaterial(ee,ve);let Oe=X.index,Ke=1;if(ee.wireframe===!0){if(Oe=x.getWireframeAttribute(X),Oe===void 0)return;Ke=2}let Je=X.drawRange,We=X.attributes.position,ft=Je.start*Ke,_t=(Je.start+Je.count)*Ke;xe!==null&&(ft=Math.max(ft,xe.start*Ke),_t=Math.min(_t,(xe.start+xe.count)*Ke)),Oe!==null?(ft=Math.max(ft,0),_t=Math.min(_t,Oe.count)):We!=null&&(ft=Math.max(ft,0),_t=Math.min(_t,We.count));let Lt=_t-ft;if(Lt<0||Lt===1/0)return;Te.setup(k,ee,Ve,X,Oe);let yt,St=ye;if(Oe!==null&&(yt=w.get(Oe),St=He,St.setIndex(yt)),k.isMesh)ee.wireframe===!0?(J.setLineWidth(ee.wireframeLinewidth*Xe()),St.setMode(C.LINES)):St.setMode(C.TRIANGLES);else if(k.isLine){let qe=ee.linewidth;qe===void 0&&(qe=1),J.setLineWidth(qe*Xe()),k.isLineSegments?St.setMode(C.LINES):k.isLineLoop?St.setMode(C.LINE_LOOP):St.setMode(C.LINE_STRIP)}else k.isPoints?St.setMode(C.POINTS):k.isSprite&&St.setMode(C.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)qr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),St.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(V.get("WEBGL_multi_draw"))St.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let qe=k._multiDrawStarts,Dt=k._multiDrawCounts,pt=k._multiDrawCount,on=Oe?w.get(Oe).bytesPerElement:1,Ti=te.get(ee).currentProgram.getUniforms();for(let Ht=0;Ht<pt;Ht++)Ti.setValue(C,"_gl_DrawID",Ht),St.render(qe[Ht]/on,Dt[Ht])}else if(k.isInstancedMesh)St.renderInstances(ft,Lt,k.count);else if(X.isInstancedBufferGeometry){let qe=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Dt=Math.min(X.instanceCount,qe);St.renderInstances(ft,Lt,Dt)}else St.render(ft,Lt)};function ht(S,F,X){S.transparent===!0&&S.side===Ot&&S.forceSinglePass===!1?(S.side=qt,S.needsUpdate=!0,en(S,F,X),S.side=xi,S.needsUpdate=!0,en(S,F,X),S.side=Ot):en(S,F,X)}this.compile=function(S,F,X=null){X===null&&(X=S),p=Se.get(X),p.init(F),v.push(p),X.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),S!==X&&S.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let ee=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let xe=k.material;if(xe)if(Array.isArray(xe))for(let ve=0;ve<xe.length;ve++){let Ve=xe[ve];ht(Ve,X,k),ee.add(Ve)}else ht(xe,X,k),ee.add(xe)}),p=v.pop(),ee},this.compileAsync=function(S,F,X=null){let ee=this.compile(S,F,X);return new Promise(k=>{function xe(){if(ee.forEach(function(ve){te.get(ve).currentProgram.isReady()&&ee.delete(ve)}),ee.size===0){k(S);return}setTimeout(xe,10)}V.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let at=null;function Gt(S){at&&at(S)}function $e(){sn.stop()}function rn(){sn.start()}let sn=new nd;sn.setAnimationLoop(Gt),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(S){at=S,pe.setAnimationLoop(S),S===null?sn.stop():sn.start()},pe.addEventListener("sessionstart",$e),pe.addEventListener("sessionend",rn),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(F),F=pe.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,F,U),p=Se.get(S,v.length),p.init(F),v.push(p),ce.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),we.setFromProjectionMatrix(ce,Zn,F.reversedDepth),Q=this.localClippingEnabled,Ae=me.init(this.clippingPlanes,Q),m=Z.get(S,A.length),m.init(),A.push(m),pe.enabled===!0&&pe.isPresenting===!0){let xe=y.xr.getDepthSensingMesh();xe!==null&&Wt(xe,F,-1/0,y.sortObjects)}Wt(S,F,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(Y,j),Pe=pe.enabled===!1||pe.isPresenting===!1||pe.hasDepthSensing()===!1,Pe&&Le.addToRenderList(m,S),this.info.render.frame++,Ae===!0&&me.beginShadows();let X=p.state.shadowsArray;Ie.render(X,S,F),Ae===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset();let ee=m.opaque,k=m.transmissive;if(p.setupLights(),F.isArrayCamera){let xe=F.cameras;if(k.length>0)for(let ve=0,Ve=xe.length;ve<Ve;ve++){let Oe=xe[ve];Kt(ee,k,S,Oe)}Pe&&Le.render(S);for(let ve=0,Ve=xe.length;ve<Ve;ve++){let Oe=xe[ve];Vn(m,S,Oe,Oe.viewport)}}else k.length>0&&Kt(ee,k,S,F),Pe&&Le.render(S),Vn(m,S,F);U!==null&&P===0&&(ue.updateMultisampleRenderTarget(U),ue.updateRenderTargetMipmap(U)),S.isScene===!0&&S.onAfterRender(y,S,F),Te.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],Ae===!0&&me.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function Wt(S,F,X,ee){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)X=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||we.intersectsSprite(S)){ee&&le.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ce);let ve=O.update(S),Ve=S.material;Ve.visible&&m.push(S,ve,Ve,X,le.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||we.intersectsObject(S))){let ve=O.update(S),Ve=S.material;if(ee&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),le.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),le.copy(ve.boundingSphere.center)),le.applyMatrix4(S.matrixWorld).applyMatrix4(ce)),Array.isArray(Ve)){let Oe=ve.groups;for(let Ke=0,Je=Oe.length;Ke<Je;Ke++){let We=Oe[Ke],ft=Ve[We.materialIndex];ft&&ft.visible&&m.push(S,ve,ft,X,le.z,We)}}else Ve.visible&&m.push(S,ve,Ve,X,le.z,null)}}let xe=S.children;for(let ve=0,Ve=xe.length;ve<Ve;ve++)Wt(xe[ve],F,X,ee)}function Vn(S,F,X,ee){let k=S.opaque,xe=S.transmissive,ve=S.transparent;p.setupLightsView(X),Ae===!0&&me.setGlobalState(y.clippingPlanes,X),ee&&J.viewport(I.copy(ee)),k.length>0&&Gn(k,F,X),xe.length>0&&Gn(xe,F,X),ve.length>0&&Gn(ve,F,X),J.buffers.depth.setTest(!0),J.buffers.depth.setMask(!0),J.buffers.color.setMask(!0),J.setPolygonOffset(!1)}function Kt(S,F,X,ee){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ee.id]===void 0&&(p.state.transmissionRenderTarget[ee.id]=new ei(1,1,{generateMipmaps:!0,type:V.has("EXT_color_buffer_half_float")||V.has("EXT_color_buffer_float")?rs:$n,minFilter:qi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:gt.workingColorSpace}));let xe=p.state.transmissionRenderTarget[ee.id],ve=ee.viewport||I;xe.setSize(ve.z*y.transmissionResolutionScale,ve.w*y.transmissionResolutionScale);let Ve=y.getRenderTarget(),Oe=y.getActiveCubeFace(),Ke=y.getActiveMipmapLevel();y.setRenderTarget(xe),y.getClearColor(D),H=y.getClearAlpha(),H<1&&y.setClearColor(16777215,.5),y.clear(),Pe&&Le.render(X);let Je=y.toneMapping;y.toneMapping=wi;let We=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),p.setupLightsView(ee),Ae===!0&&me.setGlobalState(y.clippingPlanes,ee),Gn(S,X,ee),ue.updateMultisampleRenderTarget(xe),ue.updateRenderTargetMipmap(xe),V.has("WEBGL_multisampled_render_to_texture")===!1){let ft=!1;for(let _t=0,Lt=F.length;_t<Lt;_t++){let yt=F[_t],St=yt.object,qe=yt.geometry,Dt=yt.material,pt=yt.group;if(Dt.side===Ot&&St.layers.test(ee.layers)){let on=Dt.side;Dt.side=qt,Dt.needsUpdate=!0,Ar(St,X,ee,qe,Dt,pt),Dt.side=on,Dt.needsUpdate=!0,ft=!0}}ft===!0&&(ue.updateMultisampleRenderTarget(xe),ue.updateRenderTargetMipmap(xe))}y.setRenderTarget(Ve,Oe,Ke),y.setClearColor(D,H),We!==void 0&&(ee.viewport=We),y.toneMapping=Je}function Gn(S,F,X){let ee=F.isScene===!0?F.overrideMaterial:null;for(let k=0,xe=S.length;k<xe;k++){let ve=S[k],Ve=ve.object,Oe=ve.geometry,Ke=ve.group,Je=ve.material;Je.allowOverride===!0&&ee!==null&&(Je=ee),Ve.layers.test(X.layers)&&Ar(Ve,F,X,Oe,Je,Ke)}}function Ar(S,F,X,ee,k,xe){S.onBeforeRender(y,F,X,ee,k,xe),S.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(y,F,X,ee,S,xe),k.transparent===!0&&k.side===Ot&&k.forceSinglePass===!1?(k.side=qt,k.needsUpdate=!0,y.renderBufferDirect(X,F,ee,k,S,xe),k.side=xi,k.needsUpdate=!0,y.renderBufferDirect(X,F,ee,k,S,xe),k.side=Ot):y.renderBufferDirect(X,F,ee,k,S,xe),S.onAfterRender(y,F,X,ee,k,xe)}function en(S,F,X){F.isScene!==!0&&(F=ne);let ee=te.get(S),k=p.state.lights,xe=p.state.shadowsArray,ve=k.state.version,Ve=K.getParameters(S,k.state,xe,F,X),Oe=K.getProgramCacheKey(Ve),Ke=ee.programs;ee.environment=S.isMeshStandardMaterial?F.environment:null,ee.fog=F.fog,ee.envMap=(S.isMeshStandardMaterial?Ee:_e).get(S.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Ke===void 0&&(S.addEventListener("dispose",fe),Ke=new Map,ee.programs=Ke);let Je=Ke.get(Oe);if(Je!==void 0){if(ee.currentProgram===Je&&ee.lightsStateVersion===ve)return be(S,Ve),Je}else Ve.uniforms=K.getUniforms(S),S.onBeforeCompile(Ve,y),Je=K.acquireProgram(Ve,Oe),Ke.set(Oe,Je),ee.uniforms=Ve.uniforms;let We=ee.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(We.clippingPlanes=me.uniform),be(S,Ve),ee.needsLights=rt(S),ee.lightsStateVersion=ve,ee.needsLights&&(We.ambientLightColor.value=k.state.ambient,We.lightProbe.value=k.state.probe,We.directionalLights.value=k.state.directional,We.directionalLightShadows.value=k.state.directionalShadow,We.spotLights.value=k.state.spot,We.spotLightShadows.value=k.state.spotShadow,We.rectAreaLights.value=k.state.rectArea,We.ltc_1.value=k.state.rectAreaLTC1,We.ltc_2.value=k.state.rectAreaLTC2,We.pointLights.value=k.state.point,We.pointLightShadows.value=k.state.pointShadow,We.hemisphereLights.value=k.state.hemi,We.directionalShadowMap.value=k.state.directionalShadowMap,We.directionalShadowMatrix.value=k.state.directionalShadowMatrix,We.spotShadowMap.value=k.state.spotShadowMap,We.spotLightMatrix.value=k.state.spotLightMatrix,We.spotLightMap.value=k.state.spotLightMap,We.pointShadowMap.value=k.state.pointShadowMap,We.pointShadowMatrix.value=k.state.pointShadowMatrix),ee.currentProgram=Je,ee.uniformsList=null,Je}function Ji(S){if(S.uniformsList===null){let F=S.currentProgram.getUniforms();S.uniformsList=cs.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function be(S,F){let X=te.get(S);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.batchingColor=F.batchingColor,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.instancingMorph=F.instancingMorph,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function it(S,F,X,ee,k){F.isScene!==!0&&(F=ne),ue.resetTextureUnits();let xe=F.fog,ve=ee.isMeshStandardMaterial?F.environment:null,Ve=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ar,Oe=(ee.isMeshStandardMaterial?Ee:_e).get(ee.envMap||ve),Ke=ee.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Je=!!X.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),We=!!X.morphAttributes.position,ft=!!X.morphAttributes.normal,_t=!!X.morphAttributes.color,Lt=wi;ee.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Lt=y.toneMapping);let yt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,St=yt!==void 0?yt.length:0,qe=te.get(ee),Dt=p.state.lights;if(Ae===!0&&(Q===!0||S!==M)){let an=S===M&&ee.id===b;me.setState(ee,S,an)}let pt=!1;ee.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==Dt.state.version||qe.outputColorSpace!==Ve||k.isBatchedMesh&&qe.batching===!1||!k.isBatchedMesh&&qe.batching===!0||k.isBatchedMesh&&qe.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&qe.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&qe.instancing===!1||!k.isInstancedMesh&&qe.instancing===!0||k.isSkinnedMesh&&qe.skinning===!1||!k.isSkinnedMesh&&qe.skinning===!0||k.isInstancedMesh&&qe.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&qe.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&qe.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&qe.instancingMorph===!1&&k.morphTexture!==null||qe.envMap!==Oe||ee.fog===!0&&qe.fog!==xe||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==me.numPlanes||qe.numIntersection!==me.numIntersection)||qe.vertexAlphas!==Ke||qe.vertexTangents!==Je||qe.morphTargets!==We||qe.morphNormals!==ft||qe.morphColors!==_t||qe.toneMapping!==Lt||qe.morphTargetsCount!==St)&&(pt=!0):(pt=!0,qe.__version=ee.version);let on=qe.currentProgram;pt===!0&&(on=en(ee,F,k));let Ti=!1,Ht=!1,Dn=!1,Ut=on.getUniforms(),_n=qe.uniforms;if(J.useProgram(on.program)&&(Ti=!0,Ht=!0,Dn=!0),ee.id!==b&&(b=ee.id,Ht=!0),Ti||M!==S){J.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Ut.setValue(C,"projectionMatrix",S.projectionMatrix),Ut.setValue(C,"viewMatrix",S.matrixWorldInverse);let Jt=Ut.map.cameraPosition;Jt!==void 0&&Jt.setValue(C,$.setFromMatrixPosition(S.matrixWorld)),B.logarithmicDepthBuffer&&Ut.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Ut.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,Ht=!0,Dn=!0)}if(k.isSkinnedMesh){Ut.setOptional(C,k,"bindMatrix"),Ut.setOptional(C,k,"bindMatrixInverse");let an=k.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),Ut.setValue(C,"boneTexture",an.boneTexture,ue))}k.isBatchedMesh&&(Ut.setOptional(C,k,"batchingTexture"),Ut.setValue(C,"batchingTexture",k._matricesTexture,ue),Ut.setOptional(C,k,"batchingIdTexture"),Ut.setValue(C,"batchingIdTexture",k._indirectTexture,ue),Ut.setOptional(C,k,"batchingColorTexture"),k._colorsTexture!==null&&Ut.setValue(C,"batchingColorTexture",k._colorsTexture,ue));let dn=X.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&de.update(k,X,on),(Ht||qe.receiveShadow!==k.receiveShadow)&&(qe.receiveShadow=k.receiveShadow,Ut.setValue(C,"receiveShadow",k.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(_n.envMap.value=Oe,_n.flipEnvMap.value=Oe.isCubeTexture&&Oe.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&F.environment!==null&&(_n.envMapIntensity.value=F.environmentIntensity),Ht&&(Ut.setValue(C,"toneMappingExposure",y.toneMappingExposure),qe.needsLights&&ke(_n,Dn),xe&&ee.fog===!0&&re.refreshFogUniforms(_n,xe),re.refreshMaterialUniforms(_n,ee,z,W,p.state.transmissionRenderTarget[S.id]),cs.upload(C,Ji(qe),_n,ue)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(cs.upload(C,Ji(qe),_n,ue),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Ut.setValue(C,"center",k.center),Ut.setValue(C,"modelViewMatrix",k.modelViewMatrix),Ut.setValue(C,"normalMatrix",k.normalMatrix),Ut.setValue(C,"modelMatrix",k.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){let an=ee.uniformsGroups;for(let Jt=0,ji=an.length;Jt<ji;Jt++){let Wn=an[Jt];Ze.update(Wn,on),Ze.bind(Wn,on)}}return on}function ke(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function rt(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(S,F,X){let ee=te.get(S);ee.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),te.get(S.texture).__webglTexture=F,te.get(S.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:X,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){let X=te.get(S);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0};let et=C.createFramebuffer();this.setRenderTarget=function(S,F=0,X=0){U=S,T=F,P=X;let ee=!0,k=null,xe=!1,ve=!1;if(S){let Oe=te.get(S);if(Oe.__useDefaultFramebuffer!==void 0)J.bindFramebuffer(C.FRAMEBUFFER,null),ee=!1;else if(Oe.__webglFramebuffer===void 0)ue.setupRenderTarget(S);else if(Oe.__hasExternalTextures)ue.rebindTextures(S,te.get(S.texture).__webglTexture,te.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let We=S.depthTexture;if(Oe.__boundDepthTexture!==We){if(We!==null&&te.has(We)&&(S.width!==We.image.width||S.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ue.setupDepthRenderbuffer(S)}}let Ke=S.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(ve=!0);let Je=te.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Je[F])?k=Je[F][X]:k=Je[F],xe=!0):S.samples>0&&ue.useMultisampledRTT(S)===!1?k=te.get(S).__webglMultisampledFramebuffer:Array.isArray(Je)?k=Je[X]:k=Je,I.copy(S.viewport),L.copy(S.scissor),G=S.scissorTest}else I.copy(ae).multiplyScalar(z).floor(),L.copy(he).multiplyScalar(z).floor(),G=Be;if(X!==0&&(k=et),J.bindFramebuffer(C.FRAMEBUFFER,k)&&ee&&J.drawBuffers(S,k),J.viewport(I),J.scissor(L),J.setScissorTest(G),xe){let Oe=te.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+F,Oe.__webglTexture,X)}else if(ve){let Oe=F;for(let Ke=0;Ke<S.textures.length;Ke++){let Je=te.get(S.textures[Ke]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ke,Je.__webglTexture,X,Oe)}}else if(S!==null&&X!==0){let Oe=te.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Oe.__webglTexture,X)}b=-1},this.readRenderTargetPixels=function(S,F,X,ee,k,xe,ve,Ve=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=te.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Oe=Oe[ve]),Oe){J.bindFramebuffer(C.FRAMEBUFFER,Oe);try{let Ke=S.textures[Ve],Je=Ke.format,We=Ke.type;if(!B.textureFormatReadable(Je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!B.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-ee&&X>=0&&X<=S.height-k&&(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ve),C.readPixels(F,X,ee,k,Ue.convert(Je),Ue.convert(We),xe))}finally{let Ke=U!==null?te.get(U).__webglFramebuffer:null;J.bindFramebuffer(C.FRAMEBUFFER,Ke)}}},this.readRenderTargetPixelsAsync=async function(S,F,X,ee,k,xe,ve,Ve=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=te.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Oe=Oe[ve]),Oe)if(F>=0&&F<=S.width-ee&&X>=0&&X<=S.height-k){J.bindFramebuffer(C.FRAMEBUFFER,Oe);let Ke=S.textures[Ve],Je=Ke.format,We=Ke.type;if(!B.textureFormatReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!B.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ft=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,ft),C.bufferData(C.PIXEL_PACK_BUFFER,xe.byteLength,C.STREAM_READ),S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ve),C.readPixels(F,X,ee,k,Ue.convert(Je),Ue.convert(We),0);let _t=U!==null?te.get(U).__webglFramebuffer:null;J.bindFramebuffer(C.FRAMEBUFFER,_t);let Lt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Eh(C,Lt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,ft),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,xe),C.deleteBuffer(ft),C.deleteSync(Lt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,X=0){let ee=Math.pow(2,-X),k=Math.floor(S.image.width*ee),xe=Math.floor(S.image.height*ee),ve=F!==null?F.x:0,Ve=F!==null?F.y:0;ue.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,X,0,0,ve,Ve,k,xe),J.unbindTexture()};let st=C.createFramebuffer(),It=C.createFramebuffer();this.copyTextureToTexture=function(S,F,X=null,ee=null,k=0,xe=null){xe===null&&(k!==0?(qr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xe=k,k=0):xe=0);let ve,Ve,Oe,Ke,Je,We,ft,_t,Lt,yt=S.isCompressedTexture?S.mipmaps[xe]:S.image;if(X!==null)ve=X.max.x-X.min.x,Ve=X.max.y-X.min.y,Oe=X.isBox3?X.max.z-X.min.z:1,Ke=X.min.x,Je=X.min.y,We=X.isBox3?X.min.z:0;else{let dn=Math.pow(2,-k);ve=Math.floor(yt.width*dn),Ve=Math.floor(yt.height*dn),S.isDataArrayTexture?Oe=yt.depth:S.isData3DTexture?Oe=Math.floor(yt.depth*dn):Oe=1,Ke=0,Je=0,We=0}ee!==null?(ft=ee.x,_t=ee.y,Lt=ee.z):(ft=0,_t=0,Lt=0);let St=Ue.convert(F.format),qe=Ue.convert(F.type),Dt;F.isData3DTexture?(ue.setTexture3D(F,0),Dt=C.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(ue.setTexture2DArray(F,0),Dt=C.TEXTURE_2D_ARRAY):(ue.setTexture2D(F,0),Dt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,F.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,F.unpackAlignment);let pt=C.getParameter(C.UNPACK_ROW_LENGTH),on=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ti=C.getParameter(C.UNPACK_SKIP_PIXELS),Ht=C.getParameter(C.UNPACK_SKIP_ROWS),Dn=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,yt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,yt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ke),C.pixelStorei(C.UNPACK_SKIP_ROWS,Je),C.pixelStorei(C.UNPACK_SKIP_IMAGES,We);let Ut=S.isDataArrayTexture||S.isData3DTexture,_n=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){let dn=te.get(S),an=te.get(F),Jt=te.get(dn.__renderTarget),ji=te.get(an.__renderTarget);J.bindFramebuffer(C.READ_FRAMEBUFFER,Jt.__webglFramebuffer),J.bindFramebuffer(C.DRAW_FRAMEBUFFER,ji.__webglFramebuffer);for(let Wn=0;Wn<Oe;Wn++)Ut&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,te.get(S).__webglTexture,k,We+Wn),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,te.get(F).__webglTexture,xe,Lt+Wn)),C.blitFramebuffer(Ke,Je,ve,Ve,ft,_t,ve,Ve,C.DEPTH_BUFFER_BIT,C.NEAREST);J.bindFramebuffer(C.READ_FRAMEBUFFER,null),J.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||te.has(S)){let dn=te.get(S),an=te.get(F);J.bindFramebuffer(C.READ_FRAMEBUFFER,st),J.bindFramebuffer(C.DRAW_FRAMEBUFFER,It);for(let Jt=0;Jt<Oe;Jt++)Ut?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,dn.__webglTexture,k,We+Jt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,dn.__webglTexture,k),_n?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,an.__webglTexture,xe,Lt+Jt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,an.__webglTexture,xe),k!==0?C.blitFramebuffer(Ke,Je,ve,Ve,ft,_t,ve,Ve,C.COLOR_BUFFER_BIT,C.NEAREST):_n?C.copyTexSubImage3D(Dt,xe,ft,_t,Lt+Jt,Ke,Je,ve,Ve):C.copyTexSubImage2D(Dt,xe,ft,_t,Ke,Je,ve,Ve);J.bindFramebuffer(C.READ_FRAMEBUFFER,null),J.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else _n?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(Dt,xe,ft,_t,Lt,ve,Ve,Oe,St,qe,yt.data):F.isCompressedArrayTexture?C.compressedTexSubImage3D(Dt,xe,ft,_t,Lt,ve,Ve,Oe,St,yt.data):C.texSubImage3D(Dt,xe,ft,_t,Lt,ve,Ve,Oe,St,qe,yt):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,xe,ft,_t,ve,Ve,St,qe,yt.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,xe,ft,_t,yt.width,yt.height,St,yt.data):C.texSubImage2D(C.TEXTURE_2D,xe,ft,_t,ve,Ve,St,qe,yt);C.pixelStorei(C.UNPACK_ROW_LENGTH,pt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,on),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ti),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ht),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Dn),xe===0&&F.generateMipmaps&&C.generateMipmap(Dt),J.unbindTexture()},this.initRenderTarget=function(S){te.get(S).__webglFramebuffer===void 0&&ue.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?ue.setTextureCube(S,0):S.isData3DTexture?ue.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?ue.setTexture2DArray(S,0):ue.setTexture2D(S,0),J.unbindTexture()},this.resetState=function(){T=0,P=0,U=null,J.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}};var ad={type:"change"},Cu={type:"start"},cd={type:"end"},Al=new lr,ld=new Nn,oy=Math.cos(70*co.DEG2RAD),$t=new R,bn=2*Math.PI,Pt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Au=1e-6,Cl=class extends to{constructor(e,t=null){super(e,t),this.state=Pt.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Wi.ROTATE,MIDDLE:Wi.DOLLY,RIGHT:Wi.PAN},this.touches={ONE:Xi.ROTATE,TWO:Xi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new On,this._lastTargetPosition=new R,this._quat=new On().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ns,this._sphericalDelta=new ns,this._scale=1,this._panOffset=new R,this._rotateStart=new Me,this._rotateEnd=new Me,this._rotateDelta=new Me,this._panStart=new Me,this._panEnd=new Me,this._panDelta=new Me,this._dollyStart=new Me,this._dollyEnd=new Me,this._dollyDelta=new Me,this._dollyDirection=new R,this._mouse=new Me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ly.bind(this),this._onPointerDown=ay.bind(this),this._onPointerUp=cy.bind(this),this._onContextMenu=gy.bind(this),this._onMouseWheel=hy.bind(this),this._onKeyDown=dy.bind(this),this._onTouchStart=py.bind(this),this._onTouchMove=my.bind(this),this._onMouseDown=uy.bind(this),this._onMouseMove=fy.bind(this),this._interceptControlDown=xy.bind(this),this._interceptControlUp=_y.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ad),this.update(),this.state=Pt.NONE}update(e=null){let t=this.object.position;$t.copy(t).sub(this.target),$t.applyQuaternion(this._quat),this._spherical.setFromVector3($t),this.autoRotate&&this.state===Pt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=bn:i>Math.PI&&(i-=bn),r<-Math.PI?r+=bn:r>Math.PI&&(r-=bn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if($t.setFromSpherical(this._spherical),$t.applyQuaternion(this._quatInverse),t.copy(this.target).add($t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=$t.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){let a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=$t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Al.origin.copy(this.object.position),Al.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Al.direction))<oy?this.object.lookAt(this.target):(ld.setFromNormalAndCoplanarPoint(this.object.up,this.target),Al.intersectPlane(ld,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Au||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Au||this._lastTargetPosition.distanceToSquared(this.target)>Au?(this.dispatchEvent(ad),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?bn/60*this.autoRotateSpeed*e:bn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){$t.setFromMatrixColumn(t,0),$t.multiplyScalar(-e),this._panOffset.add($t)}_panUp(e,t){this.screenSpacePanning===!0?$t.setFromMatrixColumn(t,1):($t.setFromMatrixColumn(t,0),$t.crossVectors(this.object.up,$t)),$t.multiplyScalar(e),this._panOffset.add($t)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;$t.copy(r).sub(this.target);let s=$t.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Me,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function ay(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function ly(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function cy(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(cd),this.state=Pt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function uy(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Wi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Pt.DOLLY;break;case Wi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Pt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Pt.ROTATE}break;case Wi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Pt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Pt.PAN}break;default:this.state=Pt.NONE}this.state!==Pt.NONE&&this.dispatchEvent(Cu)}function fy(n){switch(this.state){case Pt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Pt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Pt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function hy(n){this.enabled===!1||this.enableZoom===!1||this.state!==Pt.NONE||(n.preventDefault(),this.dispatchEvent(Cu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(cd))}function dy(n){this.enabled!==!1&&this._handleKeyDown(n)}function py(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Xi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Pt.TOUCH_ROTATE;break;case Xi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Pt.TOUCH_PAN;break;default:this.state=Pt.NONE}break;case 2:switch(this.touches.TWO){case Xi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Pt.TOUCH_DOLLY_PAN;break;case Xi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Pt.TOUCH_DOLLY_ROTATE;break;default:this.state=Pt.NONE}break;default:this.state=Pt.NONE}this.state!==Pt.NONE&&this.dispatchEvent(Cu)}function my(n){switch(this._trackPointer(n),this.state){case Pt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Pt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Pt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Pt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Pt.NONE}}function gy(n){this.enabled!==!1&&n.preventDefault()}function xy(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function _y(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Rl=class extends cr{constructor(){super();let e=new ct;e.deleteAttribute("uv");let t=new Pn({side:qt}),i=new Pn,r=new Si(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let s=new dt(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let o=new kn(e,i,6),a=new Nt;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new dt(e,hs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new dt(e,hs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let u=new dt(e,hs(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let f=new dt(e,hs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let h=new dt(e,hs(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let d=new dt(e,hs(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function hs(n){return new Ks({color:0,emissive:16777215,emissiveIntensity:n})}var ud=Math.PI*2,ds=1/120;function fd({radius:n=1.012,radialSegments:e=16,angularSegments:t=64,maxAmplitude:i=.045}={}){if(!(n>0)||!Number.isInteger(e)||e<2||!Number.isInteger(t)||t<8)throw new TypeError("The fluid surface needs a positive radius and a connected circular grid.");let r=1+e*t,s=new Float32Array(r*3),o=new Float32Array(r*3),a=new Float32Array(r),l=new Float32Array(r),c=new Float32Array(r),u=new Float32Array(r),f=new Float32Array(r),h=Array.from({length:r},()=>new Set),d=n/e,g=(Y,j)=>1+(Y-1)*t+(j+t)%t,_=(Y,j)=>{h[Y].add(j),h[j].add(Y)},m=[];for(let Y=1;Y<=e;Y+=1){let j=Y*d;for(let ae=0;ae<t;ae+=1){let he=g(Y,ae),Be=ae/t*ud;if(s[he*3]=Math.cos(Be)*j,s[he*3+2]=Math.sin(Be)*j,_(he,g(Y,ae+1)),Y===1)_(0,he),m.push(0,g(1,ae+1),he);else{let we=g(Y-1,ae),Ae=g(Y-1,ae+1),Q=g(Y,ae+1);_(he,we),m.push(we,Ae,he,he,Ae,Q)}}}let p=new Uint16Array(m);for(let Y=0;Y<p.length;Y+=3){let j=p[Y],ae=p[Y+1],he=p[Y+2],Be=Math.abs((s[ae*3]-s[j*3])*(s[he*3+2]-s[j*3+2])-(s[ae*3+2]-s[j*3+2])*(s[he*3]-s[j*3]))/6;f[j]+=Be,f[ae]+=Be,f[he]+=Be}let A=new Uint32Array(r+1),v=0;for(let Y=0;Y<r;Y+=1)A[Y]=v,v+=h[Y].size;A[r]=v;let y=new Uint16Array(v);for(let Y=0;Y<r;Y+=1){let j=A[Y];for(let ae of h[Y])y[j++]=ae}let E=f.reduce((Y,j)=>Y+j,0),T=18*e/16,P=T*T,U=30,b=5,M=0,I=0,L=0,G=0,D=0;function H(){o.fill(0);for(let Y=0;Y<r;Y+=1)s[Y*3+1]=a[Y];for(let Y=0;Y<p.length;Y+=3){let j=p[Y]*3,ae=p[Y+1]*3,he=p[Y+2]*3,Be=s[ae]-s[j],we=s[ae+1]-s[j+1],Ae=s[ae+2]-s[j+2],Q=s[he]-s[j],ce=s[he+1]-s[j+1],$=s[he+2]-s[j+2],le=we*$-Ae*ce,ne=Ae*Q-Be*$,Pe=Be*ce-we*Q;o[j]+=le,o[j+1]+=ne,o[j+2]+=Pe,o[ae]+=le,o[ae+1]+=ne,o[ae+2]+=Pe,o[he]+=le,o[he+1]+=ne,o[he+2]+=Pe}for(let Y=0;Y<o.length;Y+=3){let j=Math.hypot(o[Y],o[Y+1],o[Y+2])||1;o[Y]/=j,o[Y+1]/=j,o[Y+2]/=j}}function q(){a.fill(0),l.fill(0),M=0,L=G=D=0,H()}function W(Y,{pump:j=!1,strength:ae=1,sourceX:he=n*.65,sourceZ:Be=0,amplitudeLimit:we=i}={}){if(!Number.isFinite(Y)||Y<=0)return!1;M+=Math.min(Y,.05);let Ae=!1,Q=Math.max(0,Math.min(i,Number.isFinite(we)?we:i)),ce=Math.max(0,Math.min(1,Number.isFinite(ae)?ae:0)),$=.25;for(;M+1e-10>=ds;){M-=ds,I+=ds;let le=0;for(let V=0;V<r;V+=1){let B=s[V*3]-he,J=s[V*3+2]-Be,ie=Math.hypot(B,J),te=Math.exp(-(ie*ie)/($*$));u[V]=j?ce*(-.95*te+.3*Math.sin(I*7.5-ie*12)*Math.exp(-ie*1.4)):0,le+=u[V]*f[V]}let ne=le/E;for(let V=0;V<r;V+=1){let B=0;for(let ie=A[V];ie<A[V+1];ie+=1)B+=a[y[ie]];let J=B/(A[V+1]-A[V])-a[V];c[V]=P*J-U*a[V]-b*l[V]+u[V]-ne}let Pe=0,Xe=0;for(let V=0;V<r;V+=1)l[V]+=c[V]*ds,a[V]+=l[V]*ds,Pe+=a[V]*f[V],Xe+=l[V]*f[V];let C=Pe/E,oe=Xe/E;L=G=0;for(let V=0;V<r;V+=1)a[V]-=C,l[V]-=oe,L=Math.max(L,Math.abs(a[V])),G=Math.max(G,Math.abs(l[V]));if(L>Q){let V=Q/L;for(let B=0;B<r;B+=1)a[B]*=V,l[B]*=V;L=Q,G*=V}Ae=!0}if(Ae){H(),D=0;for(let le=0;le<r;le+=1)D+=a[le]*f[le];D/=E}return Ae}q();function z(Y,j){let ae=Math.min(e,Math.hypot(Y,j)/n*e),he=Math.floor(ae),Be=ae-he,we=(Math.atan2(j,Y)/ud+1)%1*t,Ae=Math.floor(we),Q=we-Ae,ce=he===0?a[0]:a[g(he,Ae)]*(1-Q)+a[g(he,Ae+1)]*Q,$=Math.min(e,he+1),le=a[g($,Ae)]*(1-Q)+a[g($,Ae+1)]*Q;return ce*(1-Be)+le*Be}return{positions:s,normals:o,indices:p,height:a,velocity:l,weights:f,count:r,radialSegments:e,angularSegments:t,step:W,clear:q,sample:z,getDiagnostics(){return{amplitude:L,maxSpeed:G,meanHeight:D,elapsed:I,coupling:T,fixedStep:ds}}}}function Ru({x:n,y:e,z:t,poolY:i,vx:r=0,vy:s=-1.15,vz:o=0,gravity:a=9.81}){if(![n,e,t,i,r,s,o,a].every(Number.isFinite)||a<=0||e<=i)throw new TypeError("A falling jet must start above its pool.");let l=e-i,c=Math.sqrt(s*s+2*a*l),u=s<=0?2*l/(c-s):(c+s)/a;return{duration:u,gravity:a,at(f,h){let d=Math.max(0,Math.min(u,f));return h.x=n+r*d,h.y=e+s*d-.5*a*d*d,h.z=t+o*d,h},tangentAt(f,h){let d=Math.max(0,Math.min(u,f));return h.x=r,h.y=s-a*d,h.z=o,h},radiusAt(f,h=.043){let d=Math.hypot(r,s,o),g=Math.max(0,Math.min(u,f)),_=Math.hypot(r,s-a*g,o);return h*Math.sqrt(Math.max(d,.1)/Math.max(_,.1))}}}var Pl=Math.PI*2,fo=(n,e,t)=>Math.max(e,Math.min(t,n));function hd({scene:n,tank:e,inletCurve:t,outletCurve:i,waterSurface:r,waterEdge:s,liquid:o,lowPower:a=!1,trackGeometry:l,trackMaterial:c}){let u=be=>(l?.(be),be),f=be=>(c?.(be),be),h=new zt;h.name="tank-fluid-effects",n.add(h);let d=new R,g=new R,_=new R,m=new R,p=new R(0,1,0),A=new Nt,v=t.getPointAt(0,new R),y=i.getPointAt(1,new R),E=i.getTangentAt(1,new R),T=Math.min(e.radius-.046,1.014),P=a?40:64,U=a?10:16,b=fd({radius:T,radialSegments:U,angularSegments:P}),M=u(new wt);M.setIndex(new Ct(b.indices,1)),M.setAttribute("position",new Ct(b.positions,3).setUsage(Ei)),M.setAttribute("normal",new Ct(b.normals,3).setUsage(Ei));let I=new Float32Array(b.count*2);for(let be=0;be<b.count;be+=1)I[be*2]=b.positions[be*3]/(T*2)+.5,I[be*2+1]=b.positions[be*3+2]/(T*2)+.5;M.setAttribute("uv",new Ct(I,2)),M.computeBoundingSphere(),r.geometry=M,r.frustumCulled=!1;let L=o?.geometry?.attributes?.position,G=[];if(L){for(let be=0;be<L.count;be+=1)L.array[be*3+1]>.499&&G.push(be);L.setUsage(Ei),o.frustumCulled=!1}let D=new Float32Array((P+1)*2*3),H=new Uint16Array(P*6);for(let be=0;be<P;be+=1){let it=be*2;H.set([it,it+2,it+1,it+2,it+3,it+1],be*6)}let q=u(new wt);q.setIndex(new Ct(H,1)),q.setAttribute("position",new Ct(D,3).setUsage(Ei)),s.geometry=q,s.rotation.set(0,0,0),s.frustumCulled=!1;function W(be,it,ke,rt=h){let et=new dt(u(be),it);return ke&&et.position.set(...ke),et.castShadow=!1,et.receiveShadow=!1,rt.add(et),et}let z=f(new xn({color:1486526,metalness:.025,roughness:.12,clearcoat:1,clearcoatRoughness:.09,transparent:!0,opacity:.66,side:Ot,depthWrite:!1})),Y=f(new xn({color:2211536,metalness:0,roughness:.08,clearcoat:1,transparent:!0,opacity:.76,side:Ot,depthWrite:!1}));function j(){return f(new un({transparent:!0,depthWrite:!1,side:Ot,uniforms:{uPhase:{value:0},uDensity:{value:8}},vertexShader:`varying vec2 vFlowUv;
        void main() { vFlowUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`varying vec2 vFlowUv;
        uniform float uPhase;
        uniform float uDensity;
        void main() {
          float band = pow(max(0.0, sin((vFlowUv.x * uDensity - uPhase) * 6.2831853)), 10.0);
          float reflection = pow(max(0.0, sin(vFlowUv.y * 6.2831853 + 0.75)), 8.0);
          float vein = pow(max(0.0, sin(vFlowUv.x * 62.0 - vFlowUv.y * 20.0 - uPhase * 5.0)), 18.0);
          float alpha = reflection * (0.15 + band * 0.55) + vein * 0.14;
          gl_FragColor = vec4(vec3(0.87, 0.99, 1.0), alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`}))}let ae=[t,i],he=ae.map(be=>{let ke=new Float32Array(387),rt=new Float32Array(387);for(let et=0;et<=128;et+=1)be.getPointAt(et/128,d),be.getTangentAt(et/128,g),ke.set([d.x,d.y,d.z],et*3),rt.set([g.x,g.y,g.z],et*3);return{samples:128,positions:ke,tangents:rt,length:be.getLength()}});function Be(be,it){let ke=he[be],rt=fo(it,0,1)*ke.samples,et=Math.min(ke.samples-1,Math.floor(rt)),st=rt-et,It=et*3,S=(et+1)*3,F=ke.positions,X=ke.tangents;d.set(F[It]+(F[S]-F[It])*st,F[It+1]+(F[S+1]-F[It+1])*st,F[It+2]+(F[S+2]-F[It+2])*st),g.set(X[It]+(X[S]-X[It])*st,X[It+1]+(X[S+1]-X[It+1])*st,X[It+2]+(X[S+2]-X[It+2])*st).normalize()}let we=[],Ae=[],Q=[];for(let be of ae){let it=W(new Mn(be,a?40:64,.05,a?6:8,!1),z);it.renderOrder=2,we.push(it);let ke=j();ke.uniforms.uDensity.value=be.getLength()*3;let rt=W(new Mn(be,a?40:64,.051,a?6:8,!1),ke);rt.renderOrder=3,Ae.push(rt),Q.push(ke)}let ce=f(new ii({color:15400959,transparent:!0,opacity:.88,depthWrite:!1})),$=a?6:10,le=new kn(u(new Vs(.024,.071,7)),ce,$);le.instanceMatrix.setUsage(Ei),le.frustumCulled=!1,le.renderOrder=5,h.add(le);let ne={x:fo(y.x,-2.15,3.19),z:fo(y.z,-.7,1.56),y:.155,radiusX:.46,radiusZ:.355,surfaceY:.295,rimY:.405},Pe=f(new Pn({color:13097698,metalness:.66,roughness:.26})),Xe=f(new xn({color:13034732,metalness:.06,roughness:.18,clearcoat:1,transparent:!0,opacity:.32,side:Ot,depthWrite:!1})),C=W(new Et(ne.radiusX,ne.radiusX-.025,.25,a?32:48,1,!0),Xe,[ne.x,ne.y+.125,ne.z]);C.scale.z=ne.radiusZ/ne.radiusX,C.renderOrder=4;let oe=W(new Et(ne.radiusX-.02,ne.radiusX-.02,.024,a?32:48),Pe,[ne.x,ne.y,ne.z]);oe.scale.z=ne.radiusZ/ne.radiusX;let V=W(new fn(ne.radiusX,.014,7,a?32:48),Pe,[ne.x,ne.rimY,ne.z]);V.rotation.x=Math.PI/2,V.scale.y=ne.radiusZ/ne.radiusX;let B=f(new xn({color:4769233,metalness:.05,roughness:.13,transparent:!0,opacity:.68,clearcoat:1,side:Ot,depthWrite:!1})),J=W(new ki(ne.radiusX-.035,a?32:48).rotateX(-Math.PI/2),B,[ne.x,ne.surfaceY,ne.z]);J.scale.z=ne.radiusZ/ne.radiusX,J.renderOrder=3;let ie=Ru({...y,poolY:ne.surfaceY,vx:E.x*1.15,vy:Math.min(-.65,E.y*1.15),vz:E.z*1.15});ie.at(ie.duration,d);let te=(d.x-ne.x)/(ne.radiusX*.72),ue=(d.z-ne.z)/(ne.radiusZ*.72),_e=Math.hypot(te,ue);if(_e>1){let be=ne.x+te/_e*ne.radiusX*.72,it=ne.z+ue/_e*ne.radiusZ*.72;ie=Ru({...y,poolY:ne.surfaceY,vx:(be-y.x)/ie.duration,vy:Math.min(-.65,E.y*1.15),vz:(it-y.z)/ie.duration})}let Ee=ie.at(ie.duration,new R),w=a?18:30,x=a?7:10,O=new Float32Array((w+1)*(x+1)*3),K=new Float32Array((w+1)*(x+1)*2),re=new Uint16Array(w*x*6);for(let be=0;be<=w;be+=1){let it=be/w;ie.at(it*ie.duration,d),ie.tangentAt(it*ie.duration,g).normalize(),_.set(-g.y,g.x,0).normalize(),m.crossVectors(g,_).normalize();let ke=ie.radiusAt(it*ie.duration);for(let rt=0;rt<=x;rt+=1){let et=rt/x*Pl,st=be*(x+1)+rt,It=_.x*Math.cos(et)+m.x*Math.sin(et),S=_.y*Math.cos(et)+m.y*Math.sin(et),F=_.z*Math.cos(et)+m.z*Math.sin(et);if(O[st*3]=d.x+It*ke,O[st*3+1]=d.y+S*ke,O[st*3+2]=d.z+F*ke,K[st*2]=it,K[st*2+1]=rt/x,be<w&&rt<x){let X=st+x+1;re.set([st,X,st+1,st+1,X,X+1],(be*x+rt)*6)}}}let Z=u(new wt);Z.setAttribute("position",new Ct(O,3)),Z.setAttribute("uv",new Ct(K,2)),Z.setIndex(new Ct(re,1)),Z.computeVertexNormals();let Se=W(Z,Y);Se.renderOrder=4;let me=j();me.uniforms.uDensity.value=5;let Ie=W(Z,me);Ie.scale.setScalar(1.0001),Ie.renderOrder=5,Q.push(me);let Le=a?12:26,de=f(new xn({color:14023679,metalness:0,roughness:.06,transparent:!0,opacity:.83,clearcoat:1,depthWrite:!1})),ye=new kn(u(new ri(1,7,5)),de,Le);ye.instanceMatrix.setUsage(Ei),ye.frustumCulled=!1,ye.renderOrder=5,h.add(ye);let He=new Float32Array(Le*4);for(let be=0;be<Le;be+=1)He[be*4]=be*2.3999632297,He[be*4+1]=.8+be%4*.16,He[be*4+2]=.32+be%3*.1,He[be*4+3]=.011+be%4*.003;let Ue=[],Te=[],Ze=u(new fn(1,.009,5,a?32:48));for(let be=0;be<4;be+=1){let it=f(new ii({color:14090239,transparent:!0,opacity:.55,depthWrite:!1})),ke=new dt(Ze,it);ke.rotation.x=Math.PI/2,ke.position.set(Ee.x,ne.surfaceY+.004,Ee.z),ke.renderOrder=5,h.add(ke),Ue.push(ke),Te.push(it)}let N=v.x-e.x,pe=v.z-e.z,Ce=Math.hypot(N,pe),Fe=Ce>T*.62?T*.62/Ce:1,ge=N*Fe,fe=pe*Fe,Ne=a?20:30,Ye=3,ht=new Float32Array(Ye*Ne*6),at=u(new wt);at.setAttribute("position",new Ct(ht,3).setUsage(Ei));let Gt=new Bi(at,f(new yi({color:15007743,transparent:!0,opacity:.65,depthWrite:!1})));Gt.frustumCulled=!1,Gt.renderOrder=3,h.add(Gt);let $e={online:!1,pump:!1,known:!1,fill:0,demo:!1,reducedMotion:!1},rn=!1,sn=!1,Wt=0,Vn=0,Kt=e.bottom;function Gn(){for(let be=0;be<=P;be+=1){let it=be%P/P*Pl,ke=b.height[1+(U-1)*P+be%P];for(let rt=0;rt<2;rt+=1){let et=(be*2+rt)*3,st=T+(rt?.007:-.007);D[et]=Math.cos(it)*st,D[et+1]=ke,D[et+2]=Math.sin(it)*st}}if(q.attributes.position.needsUpdate=!0,$e.known&&L){let be=Math.max(.001,e.height*$e.fill);for(let it of G){let ke=it*3;L.array[ke+1]=.5+(.009+b.sample(L.array[ke],L.array[ke+2]))/be}L.needsUpdate=!0}}function Ar(){for(let ke of Q)ke.uniforms.uPhase.value=Wt*2.35;for(let ke=0;ke<$;ke+=1){let rt=ke%2,et=Math.ceil($/2),st=(.12+Math.floor(ke/2)/et+Wt*.65/he[rt].length)%1;Be(rt,st),A.position.copy(d),A.quaternion.setFromUnitVectors(p,g),A.scale.set(1,1,1),A.updateMatrix(),le.setMatrixAt(ke,A.matrix)}le.instanceMatrix.needsUpdate=!0;for(let ke=0;ke<Le;ke+=1){let rt=He[ke*4],et=He[ke*4+1],st=He[ke*4+2],It=He[ke*4+3],S=2*et/9.81,F=(Wt+ke/Le*S)%S,X=Ee.x+Math.cos(rt)*st*F,ee=Ee.z+Math.sin(rt)*st*F,k=ne.surfaceY+et*F-.5*9.81*F*F,xe=((X-ne.x)/(ne.radiusX*.87))**2+((ee-ne.z)/(ne.radiusZ*.87))**2<=1;A.position.set(X,k,ee),A.quaternion.identity(),A.scale.set(xe?It:0,xe?It*(1.25+Math.abs(et-9.81*F)*.55):0,xe?It:0),A.updateMatrix(),ye.setMatrixAt(ke,A.matrix)}ye.instanceMatrix.needsUpdate=!0;for(let ke=0;ke<Ue.length;ke+=1){let rt=(Wt*1.8+ke/Ue.length)%1,et=.022+rt*.2;Ue[ke].scale.set(et,et*.7,1),Te[ke].opacity=(1-rt)*.63}let be=0,it=Math.max(.012,Kt-v.y);for(let ke=0;ke<Ye;ke+=1)for(let rt=0;rt<Ne;rt+=1)for(let et=0;et<2;et+=1){let st=(rt+et)/Ne,It=ke/Ye*Pl+st*Pl*1.3-Wt*1.9,S=.21*(1-st),F=ge*(1-st)+N*st+Math.cos(It)*S,X=fe*(1-st)+pe*st+Math.sin(It)*S;ht[be++]=e.x+F,ht[be++]=Kt-it*st+b.sample(F,X)*(1-st)-.008,ht[be++]=e.z+X}at.attributes.position.needsUpdate=!0}function en(be={}){$e.online=be.online===!0,$e.pump=be.pump===!0,$e.known=be.known===!0&&Number.isFinite(be.fill),$e.fill=$e.known?fo(be.fill,0,1):0,$e.demo=be.demo===!0,$e.reducedMotion=be.reducedMotion===!0,Kt=e.bottom+e.height*$e.fill+.009,sn=$e.known&&Kt>v.y+.02,rn=$e.online&&$e.pump&&$e.known&&sn,(!$e.online||!$e.known||$e.reducedMotion||Math.abs($e.fill-Vn)>.16)&&(b.clear(),M.attributes.position.needsUpdate=!0,M.attributes.normal.needsUpdate=!0,Gn()),Vn=$e.fill;for(let it of we)it.visible=$e.known;z.color.set($e.online?1486526:9550019),z.opacity=$e.online?.66:.3;for(let it of Ae)it.visible=rn;Se.visible=Ie.visible=le.visible=Gt.visible=rn,ye.visible=rn&&!$e.reducedMotion;for(let it of Ue)it.visible=rn;Ar()}function Ji(be,it){if(!(!$e.online||!$e.known)&&!$e.reducedMotion&&Number.isFinite(be)&&be>0){let ke=Math.min(be,.05);rn&&(Wt=(Wt+ke)%1024),b.step(ke,{pump:rn,sourceX:ge,sourceZ:fe,strength:fo((Kt-v.y)/.25,0,1),amplitudeLimit:Math.min(.045,e.height*$e.fill*.1)})&&(M.attributes.position.needsUpdate=!0,M.attributes.normal.needsUpdate=!0,Gn()),rn&&Ar()}}return Gn(),en({}),{setState:en,step:Ji,getDiagnostics(){let be=b.getDiagnostics();return{online:$e.online,pump:$e.pump,known:$e.known,fill:$e.fill,demo:$e.demo,reducedMotion:$e.reducedMotion,intakeSubmerged:sn,waterDelivery:rn,surfaceVertices:b.count,surfaceTriangles:b.indices.length/3,wave:be,flowTime:Wt,splashCount:Le,surfaceY:Kt,liquidSideFollowsSurface:!!L,surfaceRadius:T,surfaceHeightRange:[Kt-be.amplitude,Kt+be.amplitude],stream:{visible:Se.visible,frozen:$e.reducedMotion,continuousColumn:!0,highlightsVisible:Ie.visible,splashesVisible:ye.visible},intake:{x:v.x,y:v.y,z:v.z},nozzle:{x:y.x,y:y.y,z:y.z},impact:{x:Ee.x,y:Ee.y,z:Ee.z},basin:{...ne},jetFallSeconds:ie.duration,gravity:ie.gravity}}}}function Zi(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new wt,c=0;for(let u=0;u<n.length;++u){let f=n[u],h=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(f.attributes[d]),h++}if(h!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in f.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(e){let d;if(t)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(t){let u=0,f=[];for(let h=0;h<n.length;++h){let d=n[h].index;for(let g=0;g<d.count;++g)f.push(d.getX(g)+u);u+=n[h].attributes.position.count}l.setIndex(f)}for(let u in s){let f=dd(s[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,f)}for(let u in o){let f=o[u][0].length;if(f===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let h=0;h<f;++h){let d=[];for(let _=0;_<o[u].length;++_)d.push(o[u][_][h]);let g=dd(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function dd(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){let u=n[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}let o=new e(s),a=new Ct(o,t,i),l=0;for(let c=0;c<n.length;++c){let u=n[c];if(u.isInterleavedBufferAttribute){let f=l/t;for(let h=0,d=u.count;h<d;h++)for(let g=0;g<t;g++){let _=u.getComponent(h,g);a.setComponent(h+f,g,_)}}else o.set(u.array,l);l+=u.count*t}return r!==void 0&&(a.gpuType=r),a}var Sr=Object.freeze({bottomOffset:.36,height:1.2});var jn=Math.PI,ai=(n,e,t)=>Math.max(e,Math.min(t,n)),pd=(n,e)=>Math.atan2(Math.sin(n-e),Math.cos(n-e));function yy({heaterAngle:n=1.72+jn,coldAngle:e=.35}={}){let t=Math.cos(n)-Math.cos(e),i=Math.sin(n)-Math.sin(e),r=Math.hypot(t,i)||1,s=Math.atan2(i/r,t/r);return function(a,l,c,u={x:0,y:0,z:0}){let f=Math.max(0,1-a*a-c*c),h=ai(l,0,1),d=Math.sin(jn*h),g=d*d,_=jn*Math.sin(2*jn*h),m=.48*Math.sin(2*jn*h),p=.96*jn*Math.cos(2*jn*h),A=Math.cos(s+m),v=Math.sin(s+m),y=.07,E=.16;return u.x=y*f*f*(A*_-v*p*g)-E*c*f*f*g,u.y=4*y*(A*a+v*c)*f*g,u.z=y*f*f*(v*_+A*p*g)+E*a*f*f*g,u}}function md({columns:n=18,rows:e=28,depth:t=18,tankHeight:i=3.02,heaterAngle:r=1.72+jn,heaterArc:s=jn/5,heaterBottom:o=.22,heaterTop:a=2.26,coldAngle:l=.35,coldArc:c=.74,coldBottom:u=Sr.bottomOffset,coldTop:f=Sr.bottomOffset+Sr.height,diffusivity:h=.0035,sourceRadialBand:d=.22}={}){let g=Math.max(8,Math.round(n)),_=Math.max(8,Math.round(e)),m=Math.max(8,Math.round(t)),p=g*_*m,A=new Float32Array(p),v=new Float32Array(p),y=new Float32Array(p),E=new Uint8Array(p),T=new Float32Array(p),P=new Float32Array(p),U=new Float32Array(p),b=new Float32Array(p),M=new Float32Array(p),I=2/(g-1),L=1/(_-1),G=2/(m-1),D=[1/I**2,1/L**2,1/G**2],H=Math.min(.05,.45/(h*(D[0]+D[1]+D[2]))),q=yy({heaterAngle:r,coldAngle:l}),W={online:!1,known:!1,fill:0,heat:!1,cool:!1,reducedMotion:!1,demo:!1},z="idle",Y=0,j=0,ae=0,he=0,Be=0,we=0,Ae=0,Q=0,ce=[1,1],$=[1,1],le=0,ne=(te,ue,_e)=>(_e*_+ue)*g+te;for(let te=0;te<m;te+=1)for(let ue=0;ue<_;ue+=1)for(let _e=0;_e<g;_e+=1){let Ee=ne(_e,ue,te),w=-1+_e*I,x=-1+te*G;if(T[Ee]=w,P[Ee]=ue*L,U[Ee]=x,w*w+x*x>1)continue;E[Ee]=1,le+=1;let O=Math.hypot(w,x),K=Math.atan2(x,w),re=Math.exp(-(((1-O)/d)**2)),Z=Math.abs(pd(K,r))/(s/2),Se=Math.abs(pd(K,l))/(c/2);b[Ee]=Z<1?re*Math.cos(Z*jn/2)**2:0,M[Ee]=Se<1?re*Math.cos(Se*jn/2)**2:0}function Pe(te,ue,_e,Ee=A){let w=Math.hypot(te,_e);w>.999&&(te*=.999/w,_e*=.999/w);let x=ai((te+1)/2,0,1)*(g-1),O=ai(ue,0,1)*(_-1),K=ai((_e+1)/2,0,1)*(m-1),re=Math.min(g-2,Math.floor(x)),Z=Math.min(_-2,Math.floor(O)),Se=Math.min(m-2,Math.floor(K)),me=x-re,Ie=O-Z,Le=K-Se,de=0,ye=0;for(let He=0;He<2;He+=1)for(let Ue=0;Ue<2;Ue+=1)for(let Te=0;Te<2;Te+=1){let Ze=ne(re+Te,Z+Ue,Se+He),N=(Te?me:1-me)*(Ue?Ie:1-Ie)*(He?Le:1-Le)*E[Ze];de+=Ee[Ze]*N,ye+=N}return ye>1e-9?de/ye:0}function Xe(){A.fill(0),v.fill(0),Be=0,Y=0,he=0,we=0,j+=1,ae+=1}function C(te={}){let ue=te.known===!0&&Number.isFinite(te.fill),_e=ue?ai(te.fill,0,1):0;if(W.demo!==(te.demo===!0)&&Xe(),ue&&we>.001&&_e>.001&&Math.abs(_e-we)>1e-4){y.set(A);for(let w=0;w<p;w+=1)if(E[w]){let x=P[w]*_e/we;A[w]=x<=1?Pe(T[w],x,U[w],y):0}j+=1}Object.assign(W,{online:te.online===!0,known:ue,fill:_e,heat:te.heat===!0,cool:te.cool===!0,reducedMotion:te.reducedMotion===!0,demo:te.demo===!0}),ue&&_e>.001&&(we=_e);let Ee=_e*i;Ae=Math.max(0,Math.min(Ee,a)-o),Q=Math.max(0,Math.min(Ee,f)-u),ce=Ee>0?[ai(o/Ee,0,1),ai(a/Ee,0,1)]:[1,1],$=Ee>0?[ai(u/Ee,0,1),ai(f/Ee,0,1)]:[1,1],W.online&&ue&&(z=W.heat===W.cool?W.heat?"invalid":"idle":W.heat?"heat":"cool"),(!W.online||!ue||W.reducedMotion||z==="invalid")&&(Be=0)}let oe={},V={};function B(){let te=z==="heat"&&Ae>0||z==="cool"&&Q>0;for(let _e=0;_e<p;_e+=1)E[_e]&&(te?(q(T[_e],P[_e],U[_e],oe),q(T[_e]-oe.x*H/2,P[_e]-oe.y*H/2,U[_e]-oe.z*H/2,V),v[_e]=Pe(T[_e]-V.x*H,P[_e]-V.y*H,U[_e]-V.z*H)):v[_e]=A[_e]);let ue=Math.exp(-.008*H);for(let _e=0;_e<m;_e+=1)for(let Ee=0;Ee<_;Ee+=1)for(let w=0;w<g;w+=1){let x=ne(w,Ee,_e);if(!E[x])continue;let O=v[x],K=w>0&&E[x-1]?v[x-1]:O,re=w<g-1&&E[x+1]?v[x+1]:O,Z=Ee>0&&E[x-g]?v[x-g]:O,Se=Ee<_-1&&E[x+g]?v[x+g]:O,me=_e>0&&E[x-g*_]?v[x-g*_]:O,Ie=_e<m-1&&E[x+g*_]?v[x+g*_]:O,Le=(K+re-2*O)*D[0]+(Z+Se-2*O)*D[1]+(me+Ie-2*O)*D[2],de=(O+h*H*Le)*ue,ye=P[x];z==="heat"&&Ae>0&&ye>=ce[0]&&ye<=ce[1]?de+=(1-de)*(1-Math.exp(-2*b[x]*H)):z==="cool"&&Q>0&&ye>=$[0]&&ye<=$[1]&&(de+=(-1-de)*(1-Math.exp(-2*M[x]*H))),A[x]=Number.isFinite(de)?ai(de,-1,1):0}Y+=1,he+=H,j+=1}function J(te){if(!W.online||!W.known||W.fill<=.001||W.reducedMotion||z==="invalid"||!(te>0)||!Number.isFinite(te))return!1;Be+=Math.min(te,.12);let ue=0;for(;Be+1e-10>=H&&ue<4;)B(),Be-=H,ue+=1;return ue>0}function ie(){let te=0,ue=0,_e=0,Ee=!0;for(let w=0;w<p;w+=1)E[w]&&(te=Math.min(te,A[w]),ue=Math.max(ue,A[w]),_e+=A[w],Ee&&(Ee=Number.isFinite(A[w])));return{representation:"dimensionless_relative_temperature",solver:"3d_semi_lagrangian_advection_explicit_diffusion",velocityModel:"3d_vector_potential_curl_with_azimuthal_flow",dimensions:3,columns:g,rows:_,depth:m,grid:[g,_,m],cells:p,validVoxels:le,min:te,max:ue,mean:_e/le,finite:Ee,mode:z,steps:Y,revision:j,resetCount:ae,simulatedSeconds:he,fixedStep:H,diffusionStabilityNumber:h*H*(D[0]+D[1]+D[2]),diffusivity:h,sourceRadialBand:d,heaterOverlap:Ae,coldOverlap:Q,heatSource:"cylindrical_side_contact",heatSourceRange:ce,heatSourceHeight:[o,a],coldSourceHeight:[u,f],coldSourceRange:$,sourceAngles:{heater:r,heaterArc:s,cold:l,coldArc:c},fill:W.fill,online:W.online,known:W.known,reducedMotion:W.reducedMotion,frozen:!W.online||!W.known||W.fill<=.001||W.reducedMotion||z==="invalid",xyzExtents:[[-1,1],[0,1],[-1,1]]}}return{setState:C,step:J,reset:Xe,sample:Pe,velocity:q,getDiagnostics:ie,values:A,mask:E,columns:g,rows:_,depth:m,get mode(){return z},get heaterOverlap(){return Ae},get coldOverlap(){return Q}}}var vy=(n,e,t)=>Math.max(e,Math.min(t,n)),My=`
  vec3 thermalColor(float t) {
    vec3 neutral = vec3(0.20, 0.48, 0.56);
    if (t < 0.0) return mix(neutral, mix(vec3(0.015, 0.30, 0.72), vec3(0.025, 0.07, 0.63),
      smoothstep(0.40, 1.0, -t)), smoothstep(0.0, 0.70, -t));
    return mix(neutral, mix(vec3(1.0, 0.27, 0.018), vec3(0.72, 0.035, 0.012),
      smoothstep(0.40, 1.0, t)), smoothstep(0.0, 0.70, t));
  }`;function gd({scene:n,tank:e,lowPower:t=!1,heater:i,fan:r,coldNormal:s,coldTangent:o,coldPoint:a,coldCenterY:l,contactHeight:c,contactFace:u,sinkInner:f,sinkDepth:h}){let d=e.radius-.065,g=l-c/2-e.bottom,_=l+c/2-e.bottom,m=md({columns:t?12:18,rows:t?20:28,depth:t?12:18,tankHeight:e.height,heaterBottom:i.bottom-e.bottom,heaterTop:i.top-e.bottom,heaterAngle:i.angle,heaterArc:i.arcAngle,coldAngle:Math.atan2(s.z,s.x),coldBottom:g,coldTop:_}),p=new zt;p.name="relative-thermal-field",n.add(p);let A=new Set,v=new Set,y=!1,E=0,T=-1,P=-1,U="",b="idle",M=0,I=0,L=[],G=0,D={online:!1,known:!1,fill:0,heat:!1,cool:!1,reducedMotion:!1,demo:!1},H=new Uint8Array(m.columns*m.rows*m.depth*4),q=new Zr(H,m.columns,m.rows,m.depth);q.format=Sn,q.minFilter=q.magFilter=An,q.generateMipmaps=!1,q.colorSpace=Jn,q.needsUpdate=!0;function W(B){return v.add(B),B}let z=W(new un({transparent:!0,depthWrite:!1,side:qt,toneMapped:!1,glslVersion:lo,uniforms:{uField:{value:q},uOpacity:{value:.72}},vertexShader:`out vec3 vPoint; out vec3 vOrigin;
      void main() {
        vPoint = position + vec3(0.0, 0.5, 0.0);
        vOrigin = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz + vec3(0.0, 0.5, 0.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`in vec3 vPoint; in vec3 vOrigin;
      uniform highp sampler3D uField; uniform float uOpacity; out vec4 fragColor;
      ${My}
      vec3 srgb(vec3 color) {
        return mix(12.92 * color, 1.055 * pow(max(color, vec3(0.0)), vec3(0.4166667)) - 0.055,
          step(vec3(0.0031308), color));
      }
      void main() {
        vec3 ray = normalize(vPoint - vOrigin);
        float a = dot(ray.xz, ray.xz), b = dot(vOrigin.xz, ray.xz);
        float discriminant = b * b - a * (dot(vOrigin.xz, vOrigin.xz) - 1.0);
        if (discriminant < 0.0) discard;
        float root = sqrt(max(discriminant, 0.0));
        vec2 side = a > 0.000001 ? vec2((-b - root) / a, (-b + root) / a) : vec2(-1e5, 1e5);
        vec2 cap = abs(ray.y) > 0.000001 ? vec2(-vOrigin.y / ray.y, (1.0 - vOrigin.y) / ray.y) : vec2(-1e5, 1e5);
        if (cap.x > cap.y) cap = cap.yx;
        float start = max(0.0, max(side.x, cap.x)), end = min(side.y, cap.y);
        if (end <= start) discard;
        float delta = (end - start) / float(${t?42:68});
        vec4 accumulated = vec4(0.0);
        for (int i = 0; i < ${t?42:68}; i++) {
          vec3 p = vOrigin + ray * (start + (float(i) + 0.5) * delta);
          vec4 voxel = texture(uField, vec3(p.x * 0.5 + 0.5, p.y, p.z * 0.5 + 0.5));
          float theta = voxel.r * 2.0 - 1.0;
          float strength = smoothstep(0.008, 0.24, abs(theta)) * voxel.a;
          float alpha = 1.0 - exp(-strength * uOpacity * 3.0 * delta);
          float colorTheta = sign(theta) * pow(abs(theta), 0.55);
          accumulated.rgb += (1.0 - accumulated.a) * thermalColor(colorTheta) * alpha;
          accumulated.a += (1.0 - accumulated.a) * alpha;
          if (accumulated.a > 0.96) break;
        }
        if (accumulated.a < 0.004) discard;
        fragColor = vec4(srgb(accumulated.rgb / max(accumulated.a, 0.0001)), accumulated.a);
      }`}));function Y(B){return W(new un({transparent:!0,depthWrite:!1,side:Ot,toneMapped:!1,uniforms:{uTime:{value:0},uOpacity:{value:1},uKind:{value:B}},vertexShader:`attribute float pathPhase;
        varying float vProgress; varying float vPhase; varying vec3 vNormalView;
        void main() { vProgress = uv.x; vPhase = pathPhase;
          vec4 viewPoint = modelViewMatrix * vec4(position, 1.0);
          vNormalView = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * viewPoint; }`,fragmentShader:`varying float vProgress; varying float vPhase; varying vec3 vNormalView;
        uniform float uTime; uniform float uOpacity; uniform float uKind;
        void main() {
          vec3 color = mix(vec3(0.95, 0.34, 0.13), vec3(1.0, 0.77, 0.35), vProgress);
          if (uKind > 1.5 && uKind < 2.5) color = mix(vec3(0.16, 0.66, 0.88), vec3(0.95, 0.65, 0.27), vProgress);
          else if (uKind > 2.5) color = mix(vec3(0.98, 0.60, 0.22), vec3(0.94, 0.78, 0.48), vProgress);
          float phase = fract(vProgress - uTime * 0.43 + vPhase);
          float trail = smoothstep(0.48, 0.70, phase) * (1.0 - smoothstep(0.89, 0.99, phase));
          float lighting = mix(0.80, 1.14, 0.5 + 0.5 * dot(normalize(vNormalView), normalize(vec3(-0.35, 0.65, 0.85))));
          color *= 0.72 * lighting;
          float alpha = (0.72 + trail * 0.27) * uOpacity;
          gl_FragColor = vec4(mix(color, vec3(0.98, 1.0, 1.0), trail * 0.18), alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`}))}let j=Y(1),ae=Y(2),he=Y(3),Be=[j,ae,he],we=new dt(new Et(1,1,1,t?24:40),z),Ae=new dt(new wt,j),Q=new dt(new wt,ae),ce=new dt(new wt,he),$=[we,Ae,Q,ce];$.forEach((B,J)=>{B.name=["thermal-volume","thermal-conduction","thermal-absorption","thermal-rejection"][J]});for(let B of $)A.add(B.geometry),B.castShadow=B.receiveShadow=!1,B.frustumCulled=!1,B.renderOrder=B===we?3:5,B.visible=!1,p.add(B);function le(B,J){A.delete(B.geometry),B.geometry.dispose(),A.add(J),B.geometry=J}function ne(B,J){if(!B.length)return new wt;let ie=B.map((ue,_e)=>{let Ee=new zi(ue.points,!1,"catmullrom",.12),w=t?16:24,x=new Mn(Ee,w,J,t?3:4,!1),O=new Float32Array(x.attributes.position.count);return O.fill(_e*.173),x.setAttribute("pathPhase",new Ct(O,1)),x}),te=Zi(ie);return ie.forEach(ue=>ue.dispose()),te}function Pe(B){b=B,M=e.height*D.fill;let J=Math.max(.001,M-.025);we.scale.set(d,J,d),we.position.set(e.x,e.bottom+.014+J/2,e.z);let ie=[],te=Math.min(.012,M*.025),ue=Math.max(e.bottom+te,i.bottom),_e=Math.min(e.bottom+M-te,i.top);if(_e>ue)for(let re=0;re<(t?2:3);re+=1){let Z=ue+(_e-ue)*(re+.5)/(t?2:3),Se=(re-(t?.5:1))*.1;ie.push({points:[new R(...i.point(i.outerRadius+.008,Z,Se)),new R(...i.point(i.innerRadius,Z,Se)),new R(...i.point(d-.025,Z,Se))]})}le(Ae,ne(ie,.008)),L=ie.map(re=>({ceramic:re.points[0].toArray(),liquid:re.points.at(-1).toArray()}));let Ee=Math.max(e.bottom+.025,l-c/2),w=Math.min(e.bottom+M-.02,l+c/2),x=[];if(w>Ee)for(let re=0;re<2;re+=1){let Z=Ee+(w-Ee)*(re+.5)/2,Se=(re-.5)*.13;x.push({points:[new R(...a(.82,Z,Se)),new R(...a(u,Z,Se)),new R(...a(f+h*.72,Z,Se))]})}le(Q,ne(x,.007));let O=[-1,1].map(re=>{let Z=r.outerFace.clone().addScaledVector(r.axis,.045).addScaledVector(o,re*r.openingRadius*.28);Z.y+=re*r.openingRadius*.2;let Se=(me,Ie)=>Z.clone().addScaledVector(r.axis,me).add(new R(0,Ie,0));return{points:[Z,Se(.23,.025),Se(.49,.12),Se(.72,.3)]}});le(ce,ne(O,.0065)),G=1/0;let K=ce.geometry.attributes.position.array;for(let re=0;re<K.length;re+=3){let Z=(K[re]-r.outerFace.x)*r.axis.x+(K[re+1]-r.outerFace.y)*r.axis.y+(K[re+2]-r.outerFace.z)*r.axis.z;G=Math.min(G,Z)}}function Xe(B=!1){let J=m.getDiagnostics();if(!(!B&&(J.revision===P||E-T<(t?1/12:1/18)))){for(let ie=0;ie<m.values.length;ie+=1){let te=Math.round((vy(m.values[ie],-1,1)+1)*127.5);H[ie*4]=H[ie*4+1]=H[ie*4+2]=te,H[ie*4+3]=m.mask[ie]?255:0}q.needsUpdate=!0,P=J.revision,T=E}}function C(){let B=D.known&&D.fill>.001,J=D.heat&&D.cool,ie=D.online&&!J?D.heat?"heat":D.cool?"cool":"idle":"idle";we.visible=B&&!J,Ae.visible=B&&ie==="heat"&&m.heaterOverlap>0,Q.visible=B&&ie==="cool"&&m.coldOverlap>0,ce.visible=B&&ie==="cool",z.uniforms.uOpacity.value=D.online?.72:.3;for(let te of Be)te.uniforms.uOpacity.value=D.online?1:.42}function oe(B={}){if(y)return;Object.assign(D,B),m.setState(D);let J=D.heat===D.cool?"idle":D.heat?"heat":"cool",ie=D.online&&D.known&&J!=="idle"?J:D.online&&D.known&&J==="idle"?"idle":b,te=`${ie}:${Math.round(D.fill*1e4)}:${D.known}`;te!==U&&(Pe(ie),U=te),(D.demo!==B.demo||Math.abs(I-D.fill)>1e-4)&&(T=-1),I=D.fill,Xe(!0),C()}function V(B){if(!y&&D.online&&D.known&&D.fill>.001&&!D.reducedMotion&&!(D.heat&&D.cool)){E+=Math.min(Math.max(0,B),.05),m.step(B);for(let J of Be)J.uniforms.uTime.value=E;Xe()}}return oe({}),{setState:oe,step:V,getDiagnostics(){return{...m.getDiagnostics(),fieldTime:E,lowPower:t,slices:0,volumeRendering:{technique:"cylindrical_raymarch",texture:"Data3DTexture",sampler:"sampler3D",grid:[m.columns,m.rows,m.depth],raySteps:t?42:68},builtMode:b,drawCalls:$.filter(B=>B.visible).length,visible:we.visible,circulationVisible:!1,circulationCount:0,circulationObjects:0,conductionVisible:Ae.visible,absorptionVisible:Q.visible,rejectionVisible:ce.visible,pathRadius:0,externalPathRadii:{conduction:.008,absorption:.007,rejection:.0065},heatPathCrossesSideWall:!0,conductionDirection:"side_ceramic_through_tank_wall_to_liquid",heatingCirculationDirection:"heater_contact_upward_opposite_side_return",coolingCirculationDirection:"cold_contact_downward",absorptionDirection:"liquid_through_cold_contact_and_peltier_to_sink",rejectionDirection:"fan_outlet_to_ambient",spatial:{dimensions:3,coordinates:"cylindrical_normalized_xyz",representation:"scalar_volume",internalPathCount:0,worldBounds:[[e.x-d,e.x+d],[e.bottom+.014,e.bottom+.014+Math.max(.001,M-.025)],[e.z-d,e.z+d]],radius:d},conductionEndpoints:L,heaterContact:{bottom:i.bottom,top:i.top,arcAngle:i.arcAngle,innerRadius:i.innerRadius,outerRadius:i.outerRadius},fanExit:{plane:r.outerFace.toArray(),axis:r.axis.toArray(),openingRadius:r.openingRadius,startClearance:.045,minimumGeometryClearance:G},resources:{geometries:A.size,materials:v.size,textures:1},vertices:$.reduce((B,J)=>B+(J.geometry.attributes.position?.count||0),0)}},dispose(){y||(y=!0,A.forEach(B=>B.dispose()),A.clear(),v.forEach(B=>B.dispose()),v.clear(),q.dispose(),n.remove(p))}}}var Il=Math.PI*2,Sy=new R(0,1,0);function Pu({trackGeometry:n=t=>t,trackMaterial:e=t=>t}){let t=new Nt,i=new Set,r=new Set,s=c=>(i.add(c),n(c));return{geometry:s,paint:(c,u={})=>{let f=new Pn({color:c,roughness:.4,metalness:.2,...u});return r.add(f),e(f)},mesh:(c,u,f,h)=>{let d=new dt(s(c),u);return h&&d.position.fromArray(h),d.castShadow=!0,d.receiveShadow=!0,f.add(d),d},instances:(c,u,f,h)=>{let d=new kn(s(c),u,f.length);return f.forEach(({position:g=[0,0,0],rotation:_=[0,0,0],scale:m=[1,1,1]},p)=>{t.position.fromArray(g),t.rotation.set(..._),t.scale.fromArray(m),t.updateMatrix(),d.setMatrixAt(p,t.matrix)}),d.castShadow=!0,d.receiveShadow=!0,h.add(d),d},dispose(){i.forEach(c=>c.dispose()),r.forEach(c=>c.dispose())}}}function by(n){let e=1.72+Math.PI,t=Math.PI/5,i=n.radius+.002,r=i+.065,s=n.bottom+.22,o=2.04,a=new R(Math.cos(e),0,Math.sin(e)),l=new R(a.z,0,-a.x);return{angle:e,arcAngle:t,innerRadius:i,outerRadius:r,bottom:s,top:s+o,height:o,normal:a,tangent:l,point(c,u,f=0){return[n.x+a.x*c+l.x*f,u,(n.z||0)+a.z*c+l.z*f]}}}function xd(n,e,t=n.height){let{arcAngle:i,innerRadius:r,outerRadius:s,normal:o,tangent:a}=n,l=new Rn;l.absarc(0,0,s,-i/2,i/2,!1),l.lineTo(r*Math.cos(i/2),r*Math.sin(i/2)),l.absarc(0,0,r,i/2,-i/2,!0),l.closePath();let c=new zn(l,{depth:t,steps:1,curveSegments:e?10:16,bevelEnabled:!1});return c.applyMatrix4(new vt().makeBasis(o,a,Sy)),c}function _d({scene:n,tank:e,lowPower:t=!1,...i}){let r=Pu(i),s=by(e),o=new zt;n.add(o);let a=r.paint(15197400,{roughness:.48,metalness:.035,emissive:0}),l=r.mesh(xd(s,t),a,o,[e.x,s.bottom,e.z||0]);l.name="side_ceramic_heater";let c=r.paint(12174015,{roughness:.35,metalness:.55});[s.bottom,s.top-.025].forEach(d=>{r.mesh(xd(s,t,.025),c,o,[e.x,d,e.z||0])});let u=new zt;u.name="ceramic_heater_terminal",u.position.fromArray(s.point(s.outerRadius+.032,s.bottom+.105)),u.rotation.y=-s.angle,o.add(u),r.mesh(new ct(.07,.145,.205),r.paint(3426646),u),r.instances(new Et(.018,.018,.018,10),r.paint(12428150,{metalness:.7}),[-.061,.061].map(d=>({position:[.043,.027,d],rotation:[0,0,Math.PI/2]})),u);let f=s.point(s.outerRadius+.075,s.bottom+.055),h=new Si(16757857,0,2,2);return h.position.fromArray(s.point(s.outerRadius+.14,s.bottom+s.height*.5)),o.add(h),{descriptor:s,group:o,paint:a,lamp:h,leadStart:f,getDiagnostics(){return{type:"side_ceramic_plate",bottom_heater_present:!1,angle:s.angle,arc_angle:s.arcAngle,circumference_fraction:s.arcAngle/Il,arc_width:s.innerRadius*s.arcAngle,height:s.height,bottom_y:s.bottom,top_y:s.top,tank_height:e.height,inner_radius:s.innerRadius,outer_radius:s.outerRadius,thickness:s.outerRadius-s.innerRadius,contact_gap:s.innerRadius-e.radius,normal:s.normal.toArray(),tangent:s.tangent.toArray(),terminal:f,lower_clearance:s.bottom-e.bottom,upper_clearance:e.bottom+e.height-s.top}},dispose(){o.removeFromParent(),r.dispose()}}}function wy(n,e,t){let i=new Rn;i.moveTo(-n,-n),i.lineTo(n,-n),i.lineTo(n,n),i.lineTo(-n,n),i.closePath();let r=new Mi;return r.absarc(0,0,e,0,Il,!0),i.holes.push(r),new zn(i,{depth:t,steps:1,curveSegments:24,bevelEnabled:!1}).translate(0,0,-t/2).rotateY(Math.PI/2)}function yd({coolerAssembly:n,coldNormal:e,coldPoint:t,coldCenterY:i,sinkOuter:r,lowPower:s=!1,...o}){let a=Pu(o),l=new zt;n.add(l);let c=.12,u=.41,f=.315,h=r+.006,d=h+c,g=h+c/2,_=d+.009,m=a.paint(2900048,{metalness:.25,roughness:.46}),p=a.paint(5467e3,{roughness:.44,metalness:.25}),A=a.paint(10532029,{metalness:.75,roughness:.27});a.mesh(wy(u,f,c),m,l,[g,0,0]),a.instances(new Et(.023,.023,.025,6),A,[-.351,.351].flatMap(j=>[-.351,.351].map(ae=>({position:[d+.009,j,ae],rotation:[0,0,Math.PI/2]}))),l);let v=new zt;v.position.set(g,0,0),v.rotation.y=Math.PI/2,l.add(v);let y=new Rn;y.moveTo(.077,-.025),y.bezierCurveTo(.15,-.075,.25,-.057,.288,-.006),y.bezierCurveTo(.29,.012,.278,.057,.25,.075),y.bezierCurveTo(.2,.055,.15,.018,.077,.025),y.closePath();let E=new zn(y,{depth:.022,steps:1,curveSegments:s?5:9,bevelEnabled:!1}).translate(0,0,-.011),T=0,P=E.getAttribute("position");for(let j=0;j<P.count;j+=1)T=Math.max(T,Math.hypot(P.getX(j),P.getY(j)));a.instances(E,p,Array.from({length:5},(j,ae)=>({rotation:[0,0,Il*ae/5]})),v);let U=a.mesh(new Et(.09,.09,.07,24),m,v);U.rotation.x=Math.PI/2;let b=[.11,.205,.302].map(j=>new fn(j,.005,5,s?24:36).rotateY(Math.PI/2).translate(_,0,0));for(let j=0;j<6;j+=1){let ae=j*Math.PI/3,he=new R(_,Math.cos(ae)*.07,Math.sin(ae)*.07),Be=new R(_,Math.cos(ae)*.315,Math.sin(ae)*.315);b.push(new Mn(new vi(he,Be),1,.005,5,!1))}let M=Zi(b,!1);b.forEach(j=>j.dispose()),a.mesh(M,A,l);let I=e.clone(),L=new R(...t(g,i)),G=new R(...t(_+.005,i)),D={axis:I,center:L,outerFace:G,openingRadius:f,frameOuterRadius:u},H=t(h+.035,i-.3,-.39),q=a.mesh(new ct(.07,.105,.075),m,l,[h+.035,-.3,.39]);q.name="fan_power_connector";let W=0,z=!1,Y=!0;return{descriptor:D,leadStart:H,group:l,setState({online:j=!1,cool:ae=!1,reducedMotion:he=!1}={}){z=j&&ae,Y=!z||he},step(j){Y||(W=(W-Math.min(.05,Math.max(0,j))*8.5)%Il,v.rotation.z=W)},getDiagnostics(){return{axis:I.toArray(),center:L.toArray(),outer_face:G.toArray(),follows:"display_cool",physical_control_added:!1,running:z,frozen:Y,phase:W,opening_radius:f,frame_half_width:u,frame_depth:c,frame_inner_radius:h,frame_outer_radius:d,sink_outer_radius:r,sink_frame_gap:h-r,blade_count:5,blade_radial_bounds:[.077,T],blade_axial_bounds:[g-.011,g+.011],radial_clearance:f-T,blade_guard_clearance:_-.005-(g+.011),blade_fin_clearance:g-.011-r,exhaust_origin_minimum:G.clone().addScaledVector(I,.04).toArray()}},dispose(){l.removeFromParent(),a.dispose()}}}function vd(){let n=[-2.46,.82,.38],e=[.98,1.36,.72],t=n.map((o,a)=>o-e[a]/2),i=n.map((o,a)=>o+e[a]/2),r={signal:{id:"signal",type:"signal",point:[i[0]+.035,1.08,.36],axis:[1,0,0]},power:{id:"power",type:"power",point:[i[0]+.035,.43,.36],axis:[1,0,0]}},s=Object.fromEntries(["upper","middle","lower","aht","heater","peltier","fan","pump"].map((o,a)=>{let l=a<4?"signal":"power";return[o,{...r[l],portId:l}]}));return{center:n,size:e,min:t,max:i,ports:s,physicalPorts:r}}function Md(n,e=.09){let t=n.map(s=>new R(...s)),i=new Hi,r=t[0];for(let s=1;s<t.length-1;s+=1){let o=t[s],a=t[s-1],l=t[s+1],c=Math.min(e,o.distanceTo(a)*.3,o.distanceTo(l)*.3),u=o.clone().lerp(a,c/o.distanceTo(a)),f=o.clone().lerp(l,c/o.distanceTo(l));i.add(new vi(r,u)),i.add(new ur(u,o,f)),r=f}return i.add(new vi(r,t.at(-1))),i}function Ey(n,e){let t=new R(...e),i=new Hi,r=!1;for(let s of n.curves){if(!r&&s.isLineCurve3){let o=s.v2.clone().sub(s.v1),a=o.lengthSq(),l=a?t.clone().sub(s.v1).dot(o)/a:0;if(l>=-1e-8&&l<=1+1e-8&&s.v1.clone().addScaledVector(o,l).distanceTo(t)<1e-8){r=!0,t.distanceTo(s.v2)>1e-9&&i.add(new vi(t,s.v2));continue}}r&&i.add(s)}if(!r)throw new Error("Harness branch must join a straight section of its shared trunk.");return i}function Ty(...n){let e=new Hi;return n.forEach(t=>t.curves.forEach(i=>e.add(i))),e}function Ay({sensors:n,aht:e,heater:t,peltier:i,fan:r,pump:s,cabinet:o=vd()}){let a=["upper","middle","lower","aht"],l=Object.fromEntries(n.map((v,y)=>[a[y],v]));Object.assign(l,{aht:e,heater:t,peltier:i,fan:r,pump:s});let c=(v,y,E,T,P,U)=>({id:v,type:y,kind:E,start:[...T[0]],end:[...T.at(-1)],points:T,radius:P,users:U,curve:Md(T,.06)}),u=c("signal_spine","signal","main_trunk",[[-1.86,e[1],.83],[-1.86,1.08,.83],[-1.86,1.08,.36],o.physicalPorts.signal.point],.025,a),f=c("power_floor","power","main_trunk",[[2.9,.24,1.44],[-1.81,.24,1.44],[-1.81,.24,.36],[-1.81,.43,.36],o.physicalPorts.power.point],.026,["heater","peltier","fan","pump"]),h=i[1]-.47,d=[1.4,h,.2],g=[1.4,.24,1.44],_=c("cooler_riser","power","shared_riser",[d,[1.4,.24,.2],g],.024,["peltier","fan"]),m=[u,f,_],p=Object.entries(o.ports).map(([v,y],E)=>{let T=[...l[v]],P,U;if(y.type==="signal"){let M=[-1.86,v==="lower"?1.24:T[1],.83];P=v==="aht"?[T,[T[0],T[1],.65],M]:[T,[-1.7,T[1],.83],M],U=[{piece:u,at:M}]}else if(v==="heater"){let M=[-1.81,.35,.36];P=[T,[T[0],.24,T[2]],[-1.81,.24,T[2]],[-1.81,.24,.2],[-1.81,.35,.2],M],U=[{piece:f,at:M}]}else if(v==="peltier")P=[T,[T[0],h,T[2]],[1.08,h,T[2]],d],U=[{piece:_,at:d},{piece:f,at:g}];else if(v==="fan"){let M=[T[0]-Math.sin(.35)*.09,T[1],T[2]+Math.cos(.35)*.09];P=[T,M,[M[0],h,M[2]],d],U=[{piece:_,at:d},{piece:f,at:g}]}else{let M=[2.9,.24,1.44];P=[T,[T[0],1.23,T[2]],[2.9,1.23,T[2]],[2.9,.24,T[2]],M],U=[{piece:f,at:M}]}return{...c(`branch_${v}`,y.type,"device_branch",P,E<4?.0115:.014,[v]),device:v,following:U}}),A=p.map(v=>{let y=[{piece:v,curve:v.curve},...v.following.map(({piece:E,at:T})=>({piece:E,curve:Ey(E.curve,T)}))];return{id:v.device,type:v.type,start:v.start,end:[...o.ports[v.device].point],points:v.points,curve:Ty(...y.map(({curve:E})=>E)),pieces:y.map(({piece:E,curve:T})=>({id:E.id,radius:E.radius,curve:T})),shared_piece_ids:v.following.map(({piece:E})=>E.id)}});return{cabinet:o,routes:A,branches:p,trunks:[u,f],risers:[_],pieces:[...p,...m],cornerRadius:.06}}function Sd({scene:n,lowPower:e=!1,endpoints:t,...i}){let r=Pu(i),s=new zt;n.add(s);let o=vd(),a=r.paint(13030104,{metalness:.55,roughness:.36}),l=r.paint(4150885,{metalness:.5,roughness:.34}),c=r.paint(14739433,{metalness:.35,roughness:.3}),u=r.paint(3892344,{metalness:.03,roughness:.82}),f=r.paint(5464427,{metalness:.02,roughness:.82});r.mesh(new ct(...o.size),a,s,o.center),r.mesh(new ct(o.size[0]-.08,o.size[1]-.08,.03),l,s,[o.center[0],o.center[1],o.max[2]+.008]),r.mesh(new ct(o.size[0]-.105,o.size[1]-.105,.025),c,s,[o.center[0],o.center[1],o.max[2]+.028]),r.mesh(new ct(.046,.27,.048),l,s,[o.max[0]-.14,o.center[1]-.08,o.max[2]+.067]),r.instances(new ct(.052,.15,.04),l,[o.min[1]+.27,o.max[1]-.27].map($=>({position:[o.min[0]+.07,$,o.max[2]+.043]})),s),r.mesh(new ct(.57,.15,.027),l,s,[o.center[0],o.max[1]-.3,o.max[2]+.054]);let h=r.paint(7574425,{emissive:0,metalness:.1,roughness:.3}),d=r.mesh(new ri(.027,12,8),h,s,[o.center[0]-.18,o.max[1]-.3,o.max[2]+.084]);d.castShadow=!1,r.instances(new ct(.16,.055,.11),l,[-.32,.32].map($=>({position:[o.center[0]+$,o.min[1]-.0275,o.center[2]]})),s);let g=Object.values(o.physicalPorts);r.instances(new Et(.04,.04,.07,10),l,g.map(({point:$,axis:le})=>({position:$,rotation:le[0]?[0,0,Math.PI/2]:[0,0,0]})),s);let _=Ay({...t,cabinet:o}),{routes:m,pieces:p}=_,A=$=>Math.max(e?12:18,Math.min(e?76:112,Math.ceil($.curve.getLength()*(e?14:22))));["signal","power"].forEach($=>{let le=p.filter(Xe=>Xe.type===$).map(Xe=>new Mn(Xe.curve,A(Xe),Xe.radius,6,!1)),ne=Zi(le,!1);le.forEach(Xe=>Xe.dispose());let Pe=r.mesh(ne,$==="signal"?u:f,s);Pe.name=`harness_${$}`});let v=[],y=[],E=[],T=($,le,ne,Pe,Xe)=>{$.push(new ct(...Pe).translate(...ne)),v.push({id:le,kind:Xe,center:ne,size:Pe,min:ne.map((C,oe)=>C-Pe[oe]/2),max:ne.map((C,oe)=>C+Pe[oe]/2)})};T(y,"signal_service_rail",[-1.9,1.68,.83],[.03,3.08,.055],"support"),T(y,"signal_service_foot",[-1.9,.1225,.83],[.16,.035,.18],"support");let P=.14,U=_.risers[0].start[1]+.02,b=U-P;T(y,"cooler_service_rail",[1.36,(P+U)/2,.2],[.03,b,.055],"support"),T(y,"cooler_service_foot",[1.36,.1225,.2],[.16,.035,.18],"support"),T(y,"pump_branch_support",[2.935,.69,-.15],[.025,1.1,.04],"support"),T(y,"pump_branch_foot",[2.935,.1225,-.15],[.14,.035,.14],"support");let M=Zi(y,!1);y.forEach($=>$.dispose());let I=r.mesh(M,l,s);I.name="harness_service_rails";let L=[];[1.3,2.2,3.1].forEach($=>L.push(new fn(.031,.006,5,12).rotateX(Math.PI/2).translate(-1.86,$,.83))),[.25,.75].map($=>P+b*$).forEach($=>L.push(new fn(.03,.005,5,12).rotateX(Math.PI/2).translate(1.4,$,.2))),[.52,1.02].forEach($=>L.push(new fn(.02,.005,5,12).rotateX(Math.PI/2).translate(2.9,$,t.pump[2])));let G=Zi(L,!1);L.forEach($=>$.dispose());let D=r.mesh(G,l,s);D.name="harness_hollow_clips";let H=($,le,ne)=>T(E,$,le,ne,"raceway");H("front_raceway_floor",[.545,.17,1.44],[4.71,.04,.15]),H("front_raceway_outer_wall",[.545,.235,1.51],[4.55,.11,.014]),[[-1.7,1.32],[1.48,2.8]].forEach(([$,le],ne)=>H(`front_raceway_inner_wall_${ne}`,[($+le)/2,.235,1.37],[le-$,.11,.014])),H("left_raceway_floor",[-1.81,.17,.9],[.15,.04,1.08]),[-1.88,-1.74].forEach(($,le)=>H(`left_raceway_wall_${le}`,[$,.235,.9],[.014,.11,.84]));let q=t.heater[0],W=t.heater[2];H("heater_rear_raceway_floor",[(-1.81+q)/2,.17,W],[q+1.81,.04,.15]),[W-.07,W+.07].forEach(($,le)=>H(`heater_rear_raceway_wall_${le}`,[(-1.69+q-.08)/2,.235,$],[q+1.61,.11,.014])),H("heater_left_raceway_floor",[-1.81,.17,(W+.2)/2],[.15,.04,.2-W]),[-1.88,-1.74].forEach(($,le)=>H(`heater_left_raceway_wall_${le}`,[$,.235,(W+.12+.16)/2],[.014,.11,.04-W])),H("cooler_raceway_floor",[1.4,.17,.8],[.15,.04,1.2]),[1.33,1.47].forEach(($,le)=>H(`cooler_raceway_wall_${le}`,[$,.235,.8],[.014,.11,1.12])),H("pump_raceway_floor",[2.9,.17,.645],[.15,.04,1.59]),[2.83,2.97].forEach(($,le)=>H(`pump_raceway_wall_${le}`,[$,.235,.645],[.014,.11,1.39]));let z=Zi(E,!1);E.forEach($=>$.dispose());let Y=r.mesh(z,a,s);Y.name="power_raceway";let j=[o.min[0]-.035,.4,.28],ae=[-3.04,.16,.1],he=Md([j,[-3.1,.31,.28],[-3.1,.19,.1],ae],.04);r.mesh(new Mn(he,20,.024,6,!1),f,s);let Be=r.mesh(new Et(.055,.055,.07,12),l,s,j);Be.rotation.z=Math.PI/2,r.mesh(new ct(.15,.1,.12),l,s,ae);let we=p.map(({id:$,type:le,kind:ne,start:Pe,end:Xe,points:C,radius:oe,users:V,curve:B})=>({id:$,type:le,kind:ne,start:Pe,end:Xe,waypoints:C,radius:oe,users:V,usage_count:V.length,length:B.getLength(),tubular_segments:A(p.find(J=>J.id===$)),sampled_points:Array.from({length:97},(J,ie)=>B.getPoint(ie/96).toArray())})),Ae=_.branches.reduce(($,le)=>$+le.curve.getLength(),0),Q=p.reduce(($,le)=>$+le.curve.getLength(),0),ce=m.reduce(($,le)=>$+le.curve.getLength(),0);return{group:s,cabinet:o,routes:m,harness:_,pieces:p,labelAnchor:[o.center[0],o.max[1]+.08,o.max[2]],setState({online:$=!1}={}){h.color.set($?4373939:7574425),h.emissive.set($?2468511:0),h.emissiveIntensity=$?.45:0},getDiagnostics(){return{branch_count:m.length,all_to_cabinet:!0,representation:"shared_sleeves_short_branches_and_raceway",length_unit:"model_unit",main_trunk_count:2,shared_riser_count:1,physical_gland_count:g.length,rendered_physical_piece_count:p.length,logical_routes_rendered_separately:!1,branch_length:Ae,trunk_length:Q-Ae,rendered_harness_length:Q,total_logical_route_length:ce,shared_length_saved:ce-Q,corner_radius:_.cornerRadius,cabinet:{center:o.center,size:o.size,bounds:{min:o.min,max:o.max},ports:o.ports,physical_ports:o.physicalPorts,door_faces:[0,0,1]},physical_pieces:we,shared_paths:we.filter(({usage_count:$})=>$>1),branches:m.map(({id:$,type:le,start:ne,end:Pe,points:Xe,curve:C,shared_piece_ids:oe})=>({id:$,type:le,start:ne,end:Pe,waypoints:Xe,sampled_points:Array.from({length:97},(V,B)=>C.getPoint(B/96).toArray()),exposed_branch_length:_.branches.find(({device:V})=>V===$).curve.getLength(),shared_piece_ids:oe,route_length:C.getLength(),endpoint_gap:C.getPoint(1).distanceTo(new R(...Pe))})),supports:{rail_count:2,pump_branch_support_count:1,hollow_clip_count:7,raceway:"front_left_U_channel_with_rear_heater_cooler_and_pump_branch_channels",solids:v},external_supply:{start:j,end:ae},signal_color:"#3b6478",power_color:"#53616b",legacy_junction_box_present:!1,physical_control_added:!1}},dispose(){s.removeFromParent(),r.dispose()}}}var ps=Math.PI*2,Iu=new Map([[0,.08],[4,.3],[6,.65],[7,.92]]),je={x:-.62,z:0,bottom:.59,height:3.02,radius:1.06};function bd(n,e={}){if(!(n instanceof HTMLElement))throw new TypeError("3D scene requires an HTML host.");let t=e.quality==="low"||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4||navigator.deviceMemory&&navigator.deviceMemory<=4,i=t?40:64,r=t?1.25:1.8,s=t?1e3/30:1e3/60,o=window.matchMedia?.("(prefers-reduced-motion: reduce)"),a=e.reducedMotion??o?.matches??!1,l=!1,c=!document.hidden,u=!0,f=1,h=1,d=!0,g=0,_=0,m=0,p=0,A,v={},y=0,E={online:!1,pump:!1,heat:!1,cool:!1,mask:null},T={geometry:new Set,material:new Set},P=new Nt,U=new R(0,1,0),b=new R,M=[],I=[],L=new cr;L.fog=new ks(16054522,14,28);let G=new tn(38,1,.1,80),D=new wl({antialias:!t,alpha:!0,powerPreference:t?"low-power":"high-performance",preserveDrawingBuffer:!1});D.setClearColor(16777215,0),D.setPixelRatio(Math.min(window.devicePixelRatio||1,r)),D.outputColorSpace=gn,D.toneMapping=Fa,D.toneMappingExposure=1.12,D.shadowMap.enabled=!0,D.shadowMap.type=Ta,D.domElement.className="tank-canvas",D.domElement.setAttribute("aria-label","\u50A8\u7F50\u4E09\u7EF4\u53EF\u89C6\u5316\uFF0C\u53EF\u62D6\u52A8\u65CB\u8F6C\u3001\u6EDA\u8F6E\u7F29\u653E\u3002\u6DB2\u4F4D\u4E3A\u4F20\u611F\u5668\u533A\u95F4\u793A\u610F\u3002"),D.domElement.setAttribute("role","img"),D.domElement.style.cssText="display:block;width:100%;height:100%;touch-action:none;outline:none;",n.appendChild(D.domElement);let H=new Rl,q=new us(D);A=q.fromScene(H,.04),L.environment=A.texture,L.environmentIntensity=.65,H.dispose(),q.dispose();let W=new Cl(G,D.domElement);W.enableDamping=!a,W.dampingFactor=.085,W.enablePan=!1,W.minDistance=5.2,W.maxDistance=16.5,W.minPolarAngle=Math.PI*.15,W.maxPolarAngle=Math.PI*.47,W.rotateSpeed=.65,W.zoomSpeed=.8,W.target.set(.2,1.94,.18),W.addEventListener("change",ju),L.add(new js(15268607,10728640,2.4));let z=new ts(16777215,3.2);z.position.set(-3,8,6),z.castShadow=!0,z.shadow.mapSize.set(t?512:1024,t?512:1024),z.shadow.camera.left=-5,z.shadow.camera.right=5,z.shadow.camera.top=6,z.shadow.camera.bottom=-4,z.shadow.camera.near=.1,z.shadow.camera.far=22,z.shadow.bias=-6e-4,z.shadow.normalBias=.025,z.shadow.radius=4,z.target.position.set(.2,1.4,0),L.add(z,z.target);let Y=new ts(11525375,2.1);Y.position.set(5,5,-4),L.add(Y);function j(se){return T.geometry.add(se),se}function ae(se){return T.material.add(se),se}function he(se,Ge={}){return ae(new Pn({color:se,roughness:.35,metalness:.35,...Ge}))}function Be(se,Ge={}){return ae(new ii({color:se,...Ge}))}function we(se,Ge,Qe,bt=L,jt=!0){let Bt=new dt(j(se),Ge);return Qe&&Bt.position.set(...Qe),Bt.castShadow=jt,Bt.receiveShadow=jt,bt.add(Bt),Bt}function Ae(se,Ge,Qe,bt=L,jt=!0){let Bt=new kn(j(se),Ge,Qe.length);return Bt.castShadow=jt,Bt.receiveShadow=jt,Qe.forEach((pn,Un)=>{P.position.set(...pn.position||[0,0,0]),P.rotation.set(...pn.rotation||[0,0,0]),P.scale.set(...pn.scale||[1,1,1]),P.updateMatrix(),Bt.setMatrixAt(Un,P.matrix)}),bt.add(Bt),Bt}function Q(se,Ge=.35){return new zi(se.map(Qe=>new R(...Qe)),!1,"catmullrom",Ge)}function ce(se,Ge,Qe,bt=L,jt=8,Bt=!0){return we(new Mn(se,t?36:56,Ge,jt,!1),Qe,null,bt,Bt)}function $(se,Ge,Qe,bt,jt=L,Bt=!0){let pn=we(new fn(se,Ge,10,i),Qe,bt,jt,Bt);return pn.rotation.x=Math.PI/2,pn}function le(se,Ge,Qe,bt,jt,Bt=L,pn="z"){let Un=new Rn;Un.absarc(0,0,se,0,ps,!1);let So=new Mi;So.absarc(0,0,Ge,0,ps,!0),Un.holes.push(So);let Cr=new zn(Un,{depth:Qe,steps:1,curveSegments:t?20:32,bevelEnabled:!1});return Cr.translate(0,0,-Qe/2),pn==="y"&&Cr.rotateX(-Math.PI/2),we(Cr,bt,jt,Bt)}function ne(se,Ge,Qe=null,bt=0){M.push({id:se,position:new R(...Ge),stateKey:Qe,maskBit:bt})}let Pe=he(13753570,{metalness:.75,roughness:.25}),Xe=he(14805485,{metalness:.48,roughness:.3}),C=he(1913928,{metalness:.4,roughness:.32}),oe=he(4347753,{metalness:.6}),V=he(1412779,{metalness:.32,roughness:.28}),B=he(13938017,{metalness:.72}),J=we(new hr(40,40),he(16054265,{metalness:0,roughness:1}),[0,-.025,0],L,!1);J.rotation.x=-Math.PI/2,J.receiveShadow=!0;let ie=new eo(18,36,13294822,14805485);ie.position.y=-.015,ie.material.transparent=!0,ie.material.opacity=.36,ie.material.depthWrite=!1,T.geometry.add(ie.geometry),T.material.add(ie.material),L.add(ie),we(new ct(6.95,.12,3.35),Xe,[.28,.045,.38]),Ae(new ct(.08,.13,3.22),C,[{position:[-3.07,.1,.38]},{position:[3.58,.1,.38]}]);let te=[[-.82,-.82],[.82,-.82],[-.82,.82],[.82,.82]];Ae(new Et(.075,.09,.44,12),Pe,te.map(([se,Ge])=>({position:[je.x+se,.34,Ge]}))),Ae(new ct(.3,.055,.26),oe,te.map(([se,Ge])=>({position:[je.x+se,.13,Ge]})));let ue=.03,_e=je.bottom-ue;le(1.17,1.07,.12,Pe,[je.x,.62,0],L,"y"),we(new Et(1.07,1.07,ue,i),Pe,[je.x,je.bottom-ue/2,0]),$(1.09,.055,oe,[je.x,.64,0]);let Ee=ae(new xn({color:13232367,metalness:.04,roughness:.12,transparent:!0,opacity:.19,clearcoat:1,clearcoatRoughness:.12,side:Ot,depthWrite:!1})),w=we(new Et(je.radius,je.radius,je.height,i,1,!0),Ee,[je.x,je.bottom+je.height/2,0],L,!1);w.renderOrder=4,we(new Et(1.11,1.11,.14,i),Pe,[je.x,3.68,0]),$(1.07,.04,oe,[je.x,3.59,0]),Ae(new Et(.045,.045,.045,6),oe,Array.from({length:8},(se,Ge)=>{let Qe=Ge*ps/8;return{position:[je.x+.94*Math.cos(Qe),3.765,.94*Math.sin(Qe)]}})),we(new Et(.24,.24,.065,32),Xe,[je.x,3.79,0]),we(new Et(.065,.065,.27,16),Pe,[je.x,3.94,0]),$(.21,.023,V,[je.x,4.085,0]),Ae(new ct(.38,.025,.024),V,[{position:[je.x,4.085,0]},{position:[je.x,4.085,0],rotation:[0,Math.PI/2,0]}]);let x=ae(new xn({color:1223867,roughness:.23,metalness:.08,transparent:!0,opacity:.66,clearcoat:.9,clearcoatRoughness:.18,depthWrite:!1,side:Ot})),O=we(new Et(1.012,1.012,1,i,1,!0),x,[je.x,.7,0],L,!1);O.renderOrder=2;let K=we(new ki(1.012,i).rotateX(-Math.PI/2),x,[je.x,je.bottom+.003,0],L,!1);K.renderOrder=2;let re=ae(new xn({color:2344138,roughness:.19,metalness:.15,transparent:!0,opacity:.78,clearcoat:1,depthWrite:!1,side:Ot})),Z=new ki(1.014,i).rotateX(-Math.PI/2),Se=we(Z,re,[je.x,.8,0],L,!1);Se.renderOrder=3;let me=$(1.012,.012,Be(8841445,{transparent:!0,opacity:.7,depthWrite:!1}),[je.x,.8,0],L,!1);me.renderOrder=3,O.visible=K.visible=Se.visible=me.visible=!1;let Ie=[];for(let se=0;se<=12;se+=1){let Ge=.72+se*.223;Ie.push(je.x+.59,Ge,.872,je.x+(se%4===0?.75:.67),Ge,.872)}let Le=j(new wt);Le.setAttribute("position",new mt(Ie,3));let de=new Bi(Le,ae(new yi({color:7052975,transparent:!0,opacity:.6})));L.add(de);let ye=[3.16,2.2,1.24],He=["upper","middle","lower"],Ue=-.77,Te=je.x-.78,Ze=.78;Ae(new ct(.3,.23,.085),Xe,ye.map(se=>({position:[Te,se,Ze],rotation:[0,Ue,0]}))),Ae(new ct(.235,.165,.065),C,ye.map(se=>({position:[Te-.03,se,Ze+.035],rotation:[0,Ue,0]}))),Ae(new ct(.075,.08,.072),oe,ye.map(se=>({position:[Te-.099,se-.07,Ze+.039],rotation:[0,Ue,0]})));let N=j(new ri(.038,12,8));ye.forEach((se,Ge)=>{let Qe=he(8493220,{metalness:.08,roughness:.25,emissive:0}),bt=new dt(N,Qe);bt.position.set(Te-.11,se+.006,Ze+.1),L.add(bt),I.push(bt),ne(He[Ge],[Te-.14,se,Ze+.18],null,1<<Ge)});let pe=new zt;pe.position.set(-2.13,3.4,.32),pe.rotation.y=.22,L.add(pe),we(new ct(.47,.32,.05),he(556440,{metalness:.15,roughness:.55}),[0,0,0],pe),we(new ct(.18,.14,.055),Xe,[.06,.01,.044],pe),Ae(new ct(.02,.012,.009),oe,[-.042,0,.042].map(se=>({position:[.06+se,.025,.076]})),pe,!1),Ae(new ct(.032,.09,.04),B,[-.135,-.045,.045,.135].map(se=>({position:[se,-.16,0]})),pe),we(new ct(.37,.035,.055),oe,[0,-.19,0],pe);let Ce=we(new ri(.018,10,8),he(8701896,{emissive:0,metalness:0}),[-.14,.06,.045],pe,!1);ne("aht",[-2.13,3.42,.41],"online");let Fe={trackGeometry:j,trackMaterial:ae},ge=_d({scene:L,tank:je,lowPower:t,...Fe}),fe=ge.descriptor;ne("heater",fe.point(fe.outerRadius+.06,fe.bottom+.37,-.22),"heat");let Ne=.35,Ye=new R(Math.cos(Ne),0,Math.sin(Ne)),ht=new R(Ye.z,0,-Ye.x),at=Sr.height,Gt=je.bottom+Sr.bottomOffset,$e=Gt+at/2,rn=je.radius+.001,sn=.76,Wt=1.15;function Vn(se,Ge,Qe=0){return[je.x+Ye.x*se+ht.x*Qe,Ge,Ye.z*se+ht.z*Qe]}let Kt=new Rn;for(let se=0;se<=24;se+=1){let Ge=-sn/2+se/24*sn,Qe=Math.sqrt(rn**2-Ge**2);se===0?Kt.moveTo(Qe,Ge):Kt.lineTo(Qe,Ge)}Kt.lineTo(Wt,sn/2),Kt.lineTo(Wt,-sn/2),Kt.closePath();let Gn=new zn(Kt,{depth:at,steps:1,bevelEnabled:!1});Gn.applyMatrix4(new vt().makeBasis(Ye,ht,U));let Ar=we(Gn,he(12819826,{metalness:.82,roughness:.27}),[je.x,Gt,0]),en=new zt;en.position.set(je.x,$e,0),en.rotation.y=-Ne,L.add(en);let Ji=he(15790571,{metalness:.05,roughness:.27}),be=he(3361883,{metalness:.18,roughness:.42}),it=he(7184302,{metalness:.8,roughness:.24,emissive:0}),ke=he(12293492,{metalness:.8,roughness:.28,emissive:0}),rt=Wt,et=[];function st(se,Ge,Qe,bt=1.02,jt=.65){let Bt=rt,pn=we(new ct(Ge,bt,jt),Qe,[Bt+Ge/2,0,0],en);return rt+=Ge,et.push({name:se,inner:Bt,outer:rt,thickness:Ge}),pn}st("cold_conductor",.035,it),st("cold_ceramic",.02,Ji,.96,.61),st("semiconductor",.036,be,.96,.61),st("hot_ceramic",.02,Ji,.96,.61),st("hot_conductor",.045,ke);let It=he(8560046,{metalness:.72,roughness:.3,emissive:0});st("sink_base",.06,It,1.2,.79);let S=rt,F=.45;Ae(new ct(F,.022,.79),It,Array.from({length:14},(se,Ge)=>({position:[S+F/2,-.56+Ge*.086,0]})),en),Ae(new ct(.025,1.2,.025),oe,[{position:[S+F-.0125,0,-.383]},{position:[S+F-.0125,0,.383]}],en),Ae(new Et(.027,.027,.055,6),Pe,[-.49,.49].flatMap(se=>[-.3,.3].map(Ge=>({position:[S+.025,se,Ge],rotation:[0,0,Math.PI/2]}))),en);let X=new Si(5359359,0,2.8,2);X.position.fromArray(Vn(1.22,$e,-.28)),L.add(X);let ee=yd({coolerAssembly:en,coldNormal:Ye,coldPoint:Vn,coldCenterY:$e,sinkOuter:S+F,lowPower:t,...Fe});we(new ct(.12,.1,.085),oe,[Wt+.07,-.48,.325],en),ne("cooler",Vn(S+F+.15,$e+.42,-.25),"cool");let k=gd({scene:L,tank:je,lowPower:t,heater:fe,fan:ee.descriptor,coldNormal:Ye,coldTangent:ht,coldPoint:Vn,coldCenterY:$e,contactHeight:at,contactFace:Wt,sinkInner:S,sinkDepth:F}),xe=new R(2.16,.76,.57),ve=new zt;ve.position.copy(xe),L.add(ve),we(new ct(1.13,.14,1.94),C,[0,-.45,-.35],ve);let Ve=he(1728635,{metalness:.5,roughness:.27,emissive:0}),Oe=we(new Et(.275,.275,.96,32),Ve,[0,0,-.72],ve);Oe.rotation.x=Math.PI/2;let Ke=Array.from({length:9},(se,Ge)=>({position:[0,0,-1.13+Ge*.1]}));Ae(new fn(.28,.018,6,24),oe,Ke,ve);let Je=we(new Et(.282,.282,.035,24),Pe,[0,0,-1.2175],ve);Je.rotation.x=Math.PI/2,Ae(new ct(.2,.1,.47),oe,[{position:[-.19,-.325,-.72]},{position:[.19,-.325,-.72]}],ve);let We=.34,ft=.4,_t=Math.atan2(.3572,.18),Lt=.25,yt=new Rn,St=_t+Lt,qe=_t+ps-Lt;yt.absarc(0,0,ft,St,qe,!1),yt.lineTo(We*Math.cos(qe),We*Math.sin(qe)),yt.absarc(0,0,We,qe,St,!0),yt.closePath();let Dt=new zn(yt,{depth:.4,steps:1,curveSegments:t?24:40,bevelEnabled:!1}).translate(0,0,-.2);we(Dt,Pe,[0,0,0],ve),le(ft,.065,.035,oe,[0,0,-.2175],ve);let pt=ae(new xn({color:13823733,roughness:.08,metalness:.04,transparent:!0,opacity:.17,clearcoat:1,depthWrite:!1,side:Ot})),on=le(.342,.1,.02,pt,[0,0,.215],ve);on.castShadow=!1,on.renderOrder=4,le(.415,.342,.027,Pe,[0,0,.2185],ve),le(.115,.08,.24,Pe,[0,0,.345],ve),le(.113,.082,.18,Pe,[.18,.38,0],ve,"y");let Ti=we(new Et(.042,.042,1.265,16),B,[0,0,-.5275],ve);Ti.rotation.x=Math.PI/2;let Ht=new zt;Ht.position.set(0,0,.07),ve.add(Ht);let Dn=new Rn;Dn.moveTo(.09,-.013),Dn.bezierCurveTo(.17,-.007,.24,.057,.272,.104),Dn.lineTo(.258,.128),Dn.bezierCurveTo(.215,.092,.155,.027,.09,.013),Dn.closePath();let Ut=new zn(Dn,{depth:.05,steps:1,curveSegments:6,bevelEnabled:!1}).translate(0,0,-.025);Ae(Ut,Xe,Array.from({length:6},(se,Ge)=>({rotation:[0,0,Ge*ps/6]})),Ht,!1),le(.295,.045,.015,he(7970478,{metalness:.65,roughness:.25}),[0,0,-.0325],Ht);let _n=we(new Et(.064,.064,.09,16),B,[0,0,.005],Ht,!1);_n.rotation.x=Math.PI/2;let dn=he(7378078,{emissive:0,metalness:.15}),an=we(new fn(.367,.015,8,40),dn,[0,0,.237],ve,!1);Ae(new Et(.025,.025,.035,6),oe,Array.from({length:6},(se,Ge)=>{let Qe=Ge*ps/6;return{position:[.382*Math.cos(Qe),.382*Math.sin(Qe),.245],rotation:[Math.PI/2,0,0]}}),ve),ne("pump",[2.16,.98,.84],"pump"),we(new ct(.24,.105,.19),oe,[0,.3,-.72],ve);let Jt=Sd({scene:L,lowPower:t,...Fe,endpoints:{sensors:ye.map(se=>[Te-.11,se-.11,Ze+.05]),aht:[-2.13,3.21,.3],heater:ge.leadStart,peltier:Vn(Wt+.07,$e-.48,-.3675),fan:ee.leadStart,pump:[xe.x,xe.y+.3525,xe.z-.72]}});ne("cabinet",Jt.labelAnchor,"online");let ji=Q([[je.x+1.03,.8,.1],[.94,.8,.1],[1.2,.8,.38],[1.52,.76,1.15],[2.16,.76,1.19],[2.16,.76,1.035]]),Wn=Q([[2.34,1.23,.57],[2.34,1.55,.57],[2.67,1.72,.54],[3.2,1.72,.65],[3.35,1.5,.94],[3.35,1.08,.94]]),jd=ae(new xn({color:13164519,metalness:.12,roughness:.17,clearcoat:1,transparent:!0,opacity:.4,depthWrite:!1,side:Ot}));[ji,Wn].forEach(se=>{let Ge=ce(se,.081,jd,L,10,!1);Ge.renderOrder=4}),Ae(new fn(.084,.024,8,16),Pe,[{position:[.47,.8,.1],rotation:[0,Math.PI/2,0]},{position:[2.16,.76,1.035]},{position:[2.34,1.23,.57],rotation:[Math.PI/2,0,0]},{position:[3.35,1.11,.94],rotation:[Math.PI/2,0,0]}]);let Bl=hd({scene:L,tank:je,inletCurve:ji,outletCurve:Wn,liquid:O,waterSurface:Se,waterEdge:me,lowPower:t,trackGeometry:j,trackMaterial:ae}),Ai=1;function Ku(){let se=Math.max(f/h,.35);return se<1.15?Math.min(1.65,1.15/se):1}function Ju(se){return Math.hypot(6.8*se-.28,5.25*se-1.98,8.4*se-.24)}function kl(){Ai=Ku(),W.maxDistance=16.5*Ai,W.target.set(.28,1.98,.24),G.position.set(6.8*Ai,5.25*Ai,8.4*Ai),W.update(),d=!0}function ms(){if(l)return;let se=n.getBoundingClientRect(),Ge=f<=1||h<=1;if(f=Math.max(1,se.width),h=Math.max(1,se.height),G.aspect=f/h,G.updateProjectionMatrix(),D.setPixelRatio(Math.min(window.devicePixelRatio||1,r)),D.setSize(f,h,!1),Ge)kl();else{let Qe=Ku();if(Math.abs(Qe-Ai)>1e-4){let bt=Ju(Qe)/Ju(Ai);W.maxDistance=16.5*Qe,G.position.sub(W.target).multiplyScalar(bt).add(W.target),Ai=Qe,W.update()}}d=!0}function Ci(se,Ge,Qe,bt,jt=.45){se.color.set(Ge?bt:Qe),se.emissive.set(Ge?bt:0),se.emissiveIntensity=Ge?jt:0}function Mo(se={}){if(l)return;v={...se},E.online=se.online===!0&&se.stale!==!0,E.pump=E.online&&se.pump===!0,E.heat=E.online&&se.heat===!0&&se.cool!==!0,E.cool=E.online&&se.cool===!0&&se.heat!==!0,E.mask=Number.isInteger(se.wetmask)&&se.wetmask>=0&&se.wetmask<=7?se.wetmask:null;let Qe=(se.demo===!0&&Number.isFinite(se.visualFill)?co.clamp(se.visualFill,0,.96):null)??Iu.get(E.mask),bt=Qe!==void 0,jt=bt&&se.configuredMask===7&&se.level!=="LEVEL_NC"&&se.level!=="LEVEL_ERR",Bt=k.getDiagnostics(),pn=jt&&(E.heat||E.cool||Math.max(Math.abs(Bt.min),Math.abs(Bt.max))>.05);if(y=bt?Qe:0,O.visible=K.visible=Se.visible=me.visible=bt&&Qe>.003,bt){let Un=je.height*Qe;O.scale.y=Un,O.position.y=je.bottom+Un/2,Se.position.y=je.bottom+Un+.009,me.position.y=je.bottom+Un+.015}x.color.set(E.online?pn?9419200:1223867:9483711),x.opacity=E.online?pn?.16:.48:.2,re.color.set(E.online?2344138:11586514),re.opacity=E.online?pn?.43:.62:.4,Ee.opacity=E.online?pn?.1:.19:.14,I.forEach((Un,So)=>{let Cr=E.mask!==null&&(E.mask&1<<So)!==0;Ci(Un.material,E.online&&Cr,Cr?7839384:8624548,2675632,1.25)}),Ci(Ce.material,E.online,9020843,3791058,.7),Ci(ge.paint,E.heat,15197400,15777158,.18),Ci(It,E.cool,8560046,7391721,.15),Ci(it,E.cool,7184302,3784169,.42),Ci(ke,E.cool,12293492,14781274,.23),Ci(dn,E.pump,7378078,2283221,.7),Ci(Ve,E.pump,1728635,1477805,.15),ge.lamp.intensity=E.heat?.8:0,X.intensity=E.cool?1.1:0,ee.setState({online:E.online,cool:E.cool,reducedMotion:a}),Jt.setState({online:E.online}),k.setState({online:E.online,known:jt,fill:y,heat:se.heat===!0,cool:se.cool===!0,demo:se.demo===!0,reducedMotion:a}),Bl.setState({online:E.online,pump:E.pump,known:bt,fill:y,demo:se.demo===!0,reducedMotion:a}),d=!0}function Qd(se){!a&&E.online&&(m+=se),E.pump&&!a&&(Ht.rotation.z-=se*5.6),ee.step(se),k.step(se),Bl.step(se,m)}function ep(){typeof e.onLabels=="function"&&(G.updateMatrixWorld(),e.onLabels(M.map(se=>(b.copy(se.position).project(G),{id:se.id,x:(b.x*.5+.5)*f,y:(-b.y*.5+.5)*h,visible:f>1&&h>1&&b.z>=-1&&b.z<=1&&Math.abs(b.x)<=1.05&&Math.abs(b.y)<=1.05,active:se.maskBit?E.online&&E.mask!==null&&(E.mask&se.maskBit)!==0:!!E[se.stateKey]}))))}function ju(){d=!0}function Qu(se){if(l||(g=requestAnimationFrame(Qu),!c||!u||se-_<s))return;let Ge=Math.min(.05,_?(se-_)/1e3:0);_=se;let Qe=W.update(),bt=!a&&E.online&&(Se.visible||E.pump||E.heat||E.cool);!d&&!Qe&&!bt||(Qd(Ge),D.render(L,G),ep(),typeof e.onRenderInfo=="function"&&se-p>1e3&&(p=se,e.onRenderInfo({calls:D.info.render.calls,triangles:D.info.render.triangles,lowPower:t})),d=!1)}function tp(se){a=!!se,W.enableDamping=!a,Mo(v),d=!0}function ef(){c=!document.hidden,_=0,d=!0}function tf(se){se.preventDefault(),typeof e.onError=="function"&&e.onError(new Error("3D \u753B\u9762\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u6062\u590D\u3002"))}function nf(){ms(),Mo(v)}let zl=typeof ResizeObserver<"u"?new ResizeObserver(ms):null;zl?.observe(n),zl||window.addEventListener("resize",ms);let rf=typeof IntersectionObserver<"u"?new IntersectionObserver(([se])=>{u=se.isIntersecting,d=!0,_=0},{rootMargin:"100px"}):null;return rf?.observe(n),document.addEventListener("visibilitychange",ef),D.domElement.addEventListener("webglcontextlost",tf),D.domElement.addEventListener("webglcontextrestored",nf),ms(),kl(),Mo(e.state||{}),g=requestAnimationFrame(Qu),{update:Mo,resetView:kl,setReducedMotion:tp,getDiagnostics(){let se=k.getDiagnostics();return{calls:D.info.render.calls,triangles:D.info.render.triangles,lowPower:t,active:{...E},reducedMotion:a,width:f,height:h,camera:{position:G.position.toArray(),target:W.target.toArray()},motion_time:m,rotor_phase:Ht.rotation.z,thermal_visibility:{heat:se.conductionVisible,cold:se.absorptionVisible,hot:se.rejectionVisible},geometry:{heater:ge.getDiagnostics(),support:{tank_floor_top_y:je.bottom,tank_floor_underside_y:_e,tank_floor_thickness:ue,heated:!1},fan:ee.getDiagnostics(),wiring:Jt.getDiagnostics(),peltier:{tank_radius:je.radius,shoe_contact_radius:rn,radial_contact_gap:rn-je.radius,flat_face_radius:Wt,center_y:$e,height:at,layers:et,bottom_y:Gt,top_y:Gt+at,low_liquid_surface_y:je.bottom+je.height*Iu.get(4),low_submerged_height:Math.max(0,Math.min(at,je.bottom+je.height*Iu.get(4)-Gt)),sink_outer_radius:S+F,cold_arrow_direction:"liquid_to_cold_contact",hot_arrow_direction:"fins_to_ambient"},pump:{center:xe.toArray(),common_axis:[0,0,1],chamber_inner_radius:We,rotor_swept_radius:.295,blade_outer_radius_max:Math.hypot(.272,.104),radial_clearance:We-.295,rotor_z_bounds:[.03,.12],chamber_z_bounds:[-.2,.205],front_clearance:.205-.12,rear_clearance:.03- -.2,shaft_radius:.042,shaft_rear_bore_radius:.065,rear_bore_clearance:.065-.042,shaft_z_bounds:[-1.16,.105],motor_z_bounds:[-1.2,-.24],suction_neck_z_bounds:[.225,.465],outlet_neck_y_bounds:[.29,.47],suction_curve_end:ji.getPoint(1).toArray(),outlet_curve_start:Wn.getPoint(0).toArray(),axial_inlet:!0,tangential_outlet:!0,shaft_hub_contact:"intentional_driving_fit"},thermal_paths:{representation:"xyz_volume_with_contact_heat_paths",liquid_circulation_lines:!1,side_contact:!0,conduction_contact:"side_ceramic_plate",exhaust_starts_beyond_fan:!0}},fill:y,fluid:Bl.getDiagnostics(),thermal:se}},dispose(){l||(l=!0,cancelAnimationFrame(g),W.removeEventListener("change",ju),W.dispose(),zl?.disconnect(),rf?.disconnect(),window.removeEventListener("resize",ms),document.removeEventListener("visibilitychange",ef),D.domElement.removeEventListener("webglcontextlost",tf),D.domElement.removeEventListener("webglcontextrestored",nf),k.dispose(),T.geometry.forEach(se=>se.dispose()),T.material.forEach(se=>se.dispose()),A?.dispose(),D.dispose(),D.domElement.remove())}}}var br=Object.freeze({EMPTY:{name:"\u4F4E\u6DB2\u91CF",range:"\u6DB2\u4F4D\u4F4E\u4E8E\u4E0B\u4F4D\u4F20\u611F\u5668",color:"red",visual:.08},LOW:{name:"\u5C11\u91CF",range:"\u6DB2\u4F4D\u5728\u4E0B\u4F4D\u4E0E\u4E2D\u4F4D\u4E4B\u95F4",color:"yellow",visual:.3},NORMAL:{name:"\u6B63\u5E38",range:"\u6DB2\u4F4D\u5728\u4E2D\u4F4D\u4E0E\u4E0A\u4F4D\u4E4B\u95F4",color:"green",visual:.65},FULL:{name:"\u6EE1\u6DB2",range:"\u6DB2\u4F4D\u9AD8\u4E8E\u4E0A\u4F4D\u4F20\u611F\u5668",color:"red",visual:.92},LEVEL_ERR:{name:"\u6DB2\u4F4D\u5F02\u5E38",range:"\u63A2\u5934\u7EC4\u5408\u4E0D\u8FDE\u7EED\uFF0C\u6DB2\u91CF\u672A\u77E5",color:"red",visual:null},LEVEL_NC:{name:"\u672A\u914D\u7F6E",range:"\u6DB2\u4F4D\u4F20\u611F\u5668\u672A\u5B8C\u6574\u914D\u7F6E",color:null,visual:null}}),Vt=n=>n!=null&&Number.isFinite(Number(n))?Number(n):null,nn=n=>n===!0||n===1||n==="1",wd=Object.freeze({0:"EMPTY",4:"LOW",6:"NORMAL",7:"FULL"}),Lu=Object.freeze({lower:(1.24-.59)/3.02,middle:(2.2-.59)/3.02,upper:(3.16-.59)/3.02}),Cy=(.8-.59)/3.02,Ry=.02/1e3;function ho(n,e){let t=new Error(n);return t.i18nKey=e,t}function Ed(n,{demo:e=!1,localAgeMs:t=0,transportFresh:i=!0}={}){let r=n?.stm??null,s=Vt(n?.age_ms),o=r&&s!==4294967295&&s!==null&&s>=0?s:null,a=!!(r&&n?.online&&i),l=o===null?null:Math.max(0,o)+Math.max(0,t),c=!a||!!n?.stale||l===null||l>=1500,u=Vt(r?.aht_age_ms),f=!c&&nn(r?.aht_valid)&&(e||r?.aht_state==="OK")&&u!==null&&u>=0&&u+l<=5e3&&Vt(r?.hw_t_centi)!==null,h=Vt(r?.level_wetmask),d=n?.outputs,g=Vt(r?.hw_t_centi),_=Vt(r?.rh_centi),m=e?null:n?.temperature_display,p=m&&nn(m.available)?Vt(m.centi):null,A=!e&&n?.automatic_control?.owner==="esp32"?n.automatic_control:null,v=nn(A?A.enabled:r?.auto),y=A&&["off","starting","running","stopping","fault"].includes(A.phase)?A.phase:v?"running":"off",E=A?A.measurement==="temperature_display"?"temperature_display":"hw_t_centi":"t_centi",T=E==="temperature_display"?p:A?g:Vt(r?.t_centi);return{online:a,stale:c,sensorFresh:f,demo:e,mock:!!n?.mock,ageMs:l,tempC:g===null?null:g/100,displayTempC:m||E==="temperature_display"?p===null?null:p/100:g===null?null:g/100,tempEstimated:!!(m&&nn(m.estimated)),tempPhase:m?.phase??"measured",tempDelayMs:Vt(m?.delay_remaining_ms),thermalDisplaySwapped:!e&&nn(n?.thermal_display_swapped),thermalControlReady:e?!0:n?.thermal_control_ready===void 0?null:nn(n.thermal_control_ready),relayChannels:e?null:n?.relay_channels??null,humidity:_===null?null:_/100,controlTempC:T===null?null:T/100,wetmask:h===null?null:h&7,visualFill:e&&Vt(r?.demo_visual_fill)!==null?Math.min(1,Math.max(0,Number(r.demo_visual_fill))):null,configuredMask:Vt(r?.level_mask),level:br[r?.level_state]?r.level_state:"LEVEL_NC",thermal:r?.thermal??"IDLE",auto:v,automaticOwner:A?"esp32":"stm32",automaticMeasurement:E,automaticPhase:y,automaticFault:A?.fault?String(A.fault):null,automaticShutdownPending:!!(A&&nn(A.shutdown_pending)),nativeAuto:nn(r?.auto),pump:nn(d?d.pump:r?.pump),heat:d?nn(d.heat):!1,cool:d?nn(d.cool):!1,outputsKnown:!!(r&&d),lowerCenti:Vt(r?.lower_centi),upperCenti:Vt(r?.upper_centi),pumpLimitMs:Vt(r?.pump_limit_ms),pumpMs:Vt(r?.pump_ms),pumpTotalMs:Vt(r?.pump_total_ms),uptimeMs:Vt(r?.ms),fault:r?.fault&&r.fault!=="NONE"?String(r.fault):null,simulation:nn(r?.sim_t)||nn(r?.sim_l)||nn(r?.level_sim),ahtValid:nn(r?.aht_valid),firmware:r?.fw??"",pending:!!n?.pending,session:n?.session??null,bootEpoch:n?.boot_epoch??null,lastCommand:n?.last_command??null,error:n?.error??null,raw:n}}function Td(n,e){let t=Vt(n),i=Vt(e);if(n===""||e===""||t===null||i===null)throw ho("\u8BF7\u586B\u5199\u6709\u6548\u6E29\u5EA6\u3002","validation.temperature");if(t<-40||i>85||t>=i)throw ho("\u6E29\u533A\u987B\u6EE1\u8DB3 \u221240\xB0C \u2264 \u4E0B\u9650 < \u4E0A\u9650 \u2264 85\xB0C\u3002","validation.range");let r=Math.round(t*100),s=Math.round(i*100);if(r>=s)throw ho("\u4E0A\u9650\u81F3\u5C11\u5E94\u6BD4\u4E0B\u9650\u9AD8 0.01\xB0C\u3002","validation.precision");return{lower_centi:r,upper_centi:s}}function Ad(n){let e=Vt(n);if(n===""||!Number.isInteger(e)||e<1||e>300)throw ho("\u6CF5\u8FD0\u884C\u65F6\u9650\u987B\u4E3A 1\u2013300 \u79D2\u7684\u6574\u6570\u3002","validation.limit");return{seconds:e}}function po(n,e){return n.wetmask===null||n.configuredMask===null||!(n.configuredMask&e)?"\u672A\u77E5":n.wetmask&e?"\u6E7F\u6001":"\u5E72\u6001"}function Du(){return{fw:"browser-demo",session:null,online:!0,stale:!1,age_ms:0,boot_epoch:1,outputs:{pump:!1,heat:!1,cool:!1},pending:!1,last_command:null,stm:{fw:"\u7EAF\u6D4F\u89C8\u5668\u6F14\u793A",ms:0,t_centi:2740,hw_t_centi:2740,rh_centi:5870,aht_valid:1,aht_state:"OK",aht_age_ms:0,lower_centi:2500,upper_centi:3e3,auto:0,pump:0,pump_ms:0,pump_total_ms:0,pump_limit_ms:3e4,level_mask:7,level_wetmask:6,level_state:"NORMAL",demo_visual_fill:br.NORMAL.visual,thermal:"IDLE",fault:"NONE",sim_t:0,sim_l:0,level_sim:0}}}function Cd(n,e,t=null){let i=wd[e];if(!i)throw ho("\u6F14\u793A\u6DB2\u4F4D\u7EC4\u5408\u65E0\u6548\u3002","validation.demoLevel");let r=Number.isFinite(t)?Ll(n,t,0):structuredClone(n);return r.stm.demo_visual_fill=br[i].visual,r.stm.level_wetmask=Number(e),r.stm.level_state=i,r}function Py(n){let e=n.demo_visual_fill;n.level_wetmask=e>=Lu.upper?7:e>=Lu.middle?6:e>=Lu.lower?4:0,n.level_state=wd[n.level_wetmask]}function Rd(n){if(!n.stm.auto)return;let e=n.stm.t_centi;n.outputs.heat=e<n.stm.lower_centi,n.outputs.cool=e>n.stm.upper_centi,n.stm.thermal=n.outputs.heat?"HEAT":n.outputs.cool?"COOL":"HOLD"}function Pd(n,e,t,i){let r=Ll(n,i,0),s=structuredClone(r);return e==="range"?Object.assign(s.stm,t):e==="pump_limit"?(s.stm.pump_limit_ms=t.seconds*1e3,s.outputs.pump&&s.stm.pump_ms>=s.stm.pump_limit_ms&&(s.outputs.pump=!1,s.stm.pump=0,s.pumpStartedAt=null,s.stm.fault="PUMP_LIMIT")):e==="auto"?(s.stm.auto=t.enabled?1:0,t.enabled||(s.outputs.heat=!1,s.outputs.cool=!1,s.stm.thermal="IDLE")):e==="pump"?(s.stm.pump=t.enabled?1:0,s.outputs.pump=t.enabled,t.enabled&&!r.outputs.pump&&(s.pumpStartedAt=i,s.stm.pump_ms=0,s.stm.fault="NONE"),t.enabled||(s.pumpStartedAt=null)):e==="heat"||e==="cool"?(s.stm.auto=0,s.outputs.heat=e==="heat"&&t.enabled,s.outputs.cool=e==="cool"&&t.enabled,s.stm.thermal=t.enabled?e==="heat"?"HEAT":"COOL":"IDLE"):e==="stop"&&(s.outputs={pump:!1,heat:!1,cool:!1},s.stm.pump=0,s.stm.auto=0,s.stm.thermal="IDLE",s.pumpStartedAt=null),Rd(s),s}function Ll(n,e,t){let i=structuredClone(n);if(i.stm.ms+=t,i.outputs.pump&&Number.isFinite(i.pumpStartedAt)){let r=Math.max(0,e-i.pumpStartedAt),s=Math.max(i.stm.pump_ms,Math.min(r,i.stm.pump_limit_ms)),o=Math.max(0,s-i.stm.pump_ms);i.stm.pump_ms=s,i.stm.pump_total_ms+=o;let a=Vt(i.stm.demo_visual_fill)??br[i.stm.level_state]?.visual??br.NORMAL.visual;i.stm.demo_visual_fill=Math.max(Math.min(a,Cy),a-o*Ry),Py(i.stm),r>=i.stm.pump_limit_ms&&(i.outputs.pump=!1,i.stm.pump=0,i.pumpStartedAt=null,i.stm.fault="PUMP_LIMIT")}return Rd(i),i}var Iy=Object.freeze({aht:[-180,-50],upper:[-155,-6],middle:[-155,0],lower:[-155,8],heater:[-140,55],cooler:[60,-40],pump:[80,15],cabinet:[-115,35]}),Id=new Set(["aht","upper","middle","lower","heater","cabinet"]),Dl=(n,e,t)=>Math.max(e,Math.min(t,n));function Ld(n,e,t){let i=e<500,r=i?82:104,s=i?31:40,o=i?12:20,a=48,l=Math.max(a,t-s-(i?65:48)),c=n.map(u=>{let f=Iy[u.id]||[20,0],h=i?Id.has(u.id)?-95:25:f[0],d=i?f[1]*.6:f[1];return{...u,width:r,height:s,left:Dl(u.x+h,o,Math.max(o,e-o-r)),top:Dl(u.y+d-s/2,a,l)}});for(let u of[!0,!1]){let f=c.filter(h=>h.visible&&Id.has(h.id)===u).sort((h,d)=>h.top-d.top);for(let h=1;h<f.length;h++)f[h].top=Math.max(f[h].top,f[h-1].top+s+8);if(f.length&&f.at(-1).top>l){f.at(-1).top=l;for(let h=f.length-2;h>=0;h--)f[h].top=Math.min(f[h].top,f[h+1].top-s-8)}}return c.map(u=>{let f=Dl(u.x,u.left,u.left+r),h=Dl(u.y,u.top+6,u.top+s-6),d=f-u.x,g=h-u.y;return{...u,lineLength:Math.hypot(d,g),lineAngle:Math.atan2(g,d)}})}function mo(n,e){return e.thermalDisplaySwapped?n==="heat"?"cool":n==="cool"?"heat":n:n}function Dd(n,e){if(n!=="heat"&&n!=="cool")throw new Error("\u65E0\u6548\u6E29\u63A7\u64CD\u4F5C\u3002");let t=mo(n,e);return{action:t,enabled:!e[t]}}function Ud(n){let e=n.thermalDisplaySwapped,t=e?n.cool:n.heat,i=e?n.heat:n.cool,r=n.automaticOwner==="esp32"?t?"HEAT":i?"COOL":n.auto&&n.automaticPhase==="running"?"HOLD":"IDLE":e?n.thermal==="HEAT"?"COOL":n.thermal==="COOL"?"HEAT":n.thermal:n.thermal;return{...n,measuredTempC:n.tempC,tempC:n.displayTempC,heat:t,cool:i,thermal:r}}function Fd(n){let e=n.thermalDisplaySwapped?{pump:1,heat:3,cool:2}:{pump:1,heat:2,cool:3},t=n.relayChannels;return!t||!["pump","heat","cool"].every(i=>Number.isInteger(t[i])&&t[i]>=1&&t[i]<=3)||new Set(Object.values(t)).size!==3?e:{pump:t.pump,heat:t.heat,cool:t.cool}}function Uu(n){return n.sensorFresh&&Number.isFinite(n.controlTempC)&&n.thermalControlReady!==!1&&!n.automaticShutdownPending&&(n.automaticOwner!=="esp32"||!n.simulation)}function Fu(n,e){if(n!=="heat"&&n!=="cool")return!1;let t=mo(n,e);return!e.automaticShutdownPending||!!e[t]}function go(n){return n?.action==="stop"||n?.action==="auto"&&n.args?.enabled===!1}function Nu(n,e=null){return e?.action==="auto"?!e.args.enabled:!(n.auto||n.automaticPhase==="starting")}function Ou(n,e=null){let t=go(e)?"stopping":e?.action==="auto"&&e.args?.enabled?"starting":n.automaticOwner==="esp32"?n.automaticPhase:n.auto?"running":"off";return{phase:t,key:`temperature.autoPhase.${t}`,active:!n.stale&&n.auto&&t==="running",pending:t==="starting"||t==="stopping",fault:t==="fault"}}var Nd="tanklab-language",yw=Object.freeze(["zh","en"]),Ul=Object.freeze({zh:Object.freeze({"page.title":"FLOW / \u50A8\u6DB2\u7F50\u63A7\u5236\u53F0","api.uiVersion":"\u9875\u9762\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u8BBE\u5907\u7F51\u9875\u3002","brand.name":"\u50A8\u6DB2\u7F50\u63A7\u5236\u53F0","brand.home":"\u50A8\u6DB2\u7F50\u63A7\u5236\u53F0\u9996\u9875","language.switch":"\u5207\u6362\u8BED\u8A00\uFF1A\u4E2D\u6587 / English","language.current":"\u5F53\u524D\u8BED\u8A00\uFF1A\u4E2D\u6587","network.settings":"Wi-Fi \u8BBE\u7F6E","network.eyebrow":"\u672C\u5730\u7F51\u7EDC","network.title":"\u8FDE\u63A5\u8BBE\u5907\u70ED\u70B9","network.close":"\u5173\u95ED\u8FDE\u63A5\u4FE1\u606F","network.intro":"\u624B\u673A\u6216\u7535\u8111\u8FDE\u63A5\u4EE5\u4E0B\u70ED\u70B9\uFF0C\u5728\u6D4F\u89C8\u5668\u6253\u5F00\u8BBE\u5907\u5730\u5740\u3002\u7F51\u9875\u548C\u4E09\u7EF4\u6A21\u578B\u5747\u7531 ESP32 \u672C\u5730\u63D0\u4F9B\u3002","network.ssid":"Wi-Fi \u540D\u79F0","network.password":"Wi-Fi \u5BC6\u7801","network.address":"\u8BBE\u5907\u5730\u5740","network.helper":"\u8FDE\u63A5\u540E\u65E0\u9700\u8BBF\u95EE\u4E92\u8054\u7F51\u30023D \u6F14\u793A\u4EC5\u5728\u6D4F\u89C8\u5668\u4E2D\u8FD0\u884C\uFF0C\u5B9E\u65F6\u8BBE\u5907\u6A21\u5F0F\u901A\u8FC7 UART \u83B7\u53D6 STM32 \u53CD\u9988\u3002","network.done":"\u77E5\u9053\u4E86","panel.eyebrow":"\u8BBE\u5907\u63A7\u5236\u9762\u677F","panel.title":"\u8BBE\u5907\u63A7\u5236","mode.group":"\u6570\u636E\u6A21\u5F0F","mode.real":"\u5B9E\u65F6\u8BBE\u5907","mode.demo":"3D \u6F14\u793A","mode.browserDemo":"\u7EAF\u6D4F\u89C8\u5668\u6F14\u793A","mode.mockApi":"\u6A21\u62DF API","mode.demoNote":"\u4EC5\u5728\u6D4F\u89C8\u5668\u4E2D\u6F14\u793A\uFF0C\u6309\u94AE\u4E0D\u4F1A\u5411\u8BBE\u5907\u53D1\u9001\u547D\u4EE4\u3002","mode.mockNote":"\u5F00\u53D1\u670D\u52A1\u6A21\u62DF API\uFF0C\u672A\u8FDE\u63A5\u5B9E\u9645\u786C\u4EF6\u3002","mode.realNote":"\u8BFB\u53D6 STM32 \u53CD\u9988\uFF0C\u64CD\u4F5C\u7B49\u5F85\u8BBE\u5907\u786E\u8BA4\u3002","connection.demo":"\u6F14\u793A\u6A21\u5F0F","connection.mock":"\u6A21\u62DF\u8BBE\u5907","connection.online":"\u8BBE\u5907\u5728\u7EBF","connection.connecting":"\u6B63\u5728\u8FDE\u63A5","connection.offline":"\u8BBE\u5907\u79BB\u7EBF","temperature.control":"\u6E29\u5EA6\u63A7\u5236","temperature.lower":"\u6E29\u5EA6\u4E0B\u9650","temperature.upper":"\u6E29\u5EA6\u4E0A\u9650","temperature.save":"\u4FDD\u5B58\u6E29\u533A","temperature.auto":"\u81EA\u52A8\u6E29\u63A7","temperature.autoDescription":"\u6839\u636E\u8BBE\u5B9A\u6E29\u533A\u81EA\u52A8\u63A7\u5236","temperature.autoDisplayedDescription":"\u6309\u663E\u793A\u6E29\u5EA6\u548C\u8BBE\u5B9A\u6E29\u533A\u81EA\u52A8\u63A7\u5236","temperature.heat":"\u52A0\u70ED","temperature.cool":"\u51B7\u5374","temperature.appliedRange":"\u5DF2\u5E94\u7528 {lower}\u2013{upper} \xB0C","temperature.appliedRangeUnknown":"\u7B49\u5F85\u5DF2\u5E94\u7528\u6E29\u533A","temperature.controlSample":"\u81EA\u52A8\u6E29\u63A7\u4F9D\u636E","temperature.controlNote":"\u81EA\u52A8\u6E29\u63A7\u4F7F\u7528\u9875\u9762\u663E\u793A\u6E29\u5EA6\uFF0C\u5B9E\u6D4B\u6837\u672C\u7528\u4E8E\u6709\u6548\u6027\u4FDD\u62A4\u3002","temperature.control.below":"\u4F4E\u4E8E\u4E0B\u9650 \xB7 \u9700\u8981\u52A0\u70ED","temperature.control.within":"\u6E29\u533A\u5185 \xB7 \u4FDD\u6301","temperature.control.above":"\u9AD8\u4E8E\u4E0A\u9650 \xB7 \u9700\u8981\u51B7\u5374","temperature.control.unknown":"\u7B49\u5F85\u6709\u6548\u6E29\u5EA6","temperature.autoUnsupported":"\u5F53\u524D STM32 \u56FA\u4EF6\u6216\u901A\u9053\u914D\u7F6E\u4E0D\u7B26\u5408\u6B64\u7A0B\u5E8F\u7684\u901A\u4FE1\u914D\u7F6E\uFF0C\u81EA\u52A8\u6E29\u63A7\u6682\u4E0D\u53EF\u7528\u3002","temperature.ownerEsp32":"ESP32 \u81EA\u52A8\u6E29\u63A7 \xB7 STM32 \u6267\u884C\u7EE7\u7535\u5668\u6307\u4EE4","temperature.ownerStm32":"STM32 \u81EA\u52A8\u6E29\u63A7","temperature.ownerDemo":"\u6D4F\u89C8\u5668\u81EA\u52A8\u6E29\u63A7\u6F14\u793A","temperature.localHelp":"\u4F7F\u7528\u7F51\u9875\u81EA\u52A8\u6E29\u63A7\u65F6\uFF0C\u8BF7\u4FDD\u6301 STM32 \u5B9E\u4F53\u83DC\u5355 AUTO \u5173\u95ED\uFF1B\u4E24\u79CD\u81EA\u52A8\u63A7\u5236\u4E0D\u80FD\u540C\u65F6\u4F7F\u7528\u3002","temperature.autoPhase.off":"\u81EA\u52A8\u6E29\u63A7\u5DF2\u5173\u95ED","temperature.autoPhase.starting":"\u81EA\u52A8\u6E29\u63A7\u542F\u52A8\u4E2D \xB7 \u7B49\u5F85\u8F93\u51FA\u786E\u8BA4","temperature.autoPhase.running":"\u81EA\u52A8\u6E29\u63A7\u8FD0\u884C\u4E2D","temperature.autoPhase.stopping":"\u81EA\u52A8\u6E29\u63A7\u505C\u6B62\u4E2D \xB7 \u7B49\u5F85\u5173\u95ED\u786E\u8BA4","temperature.autoPhase.fault":"\u81EA\u52A8\u6E29\u63A7\u6545\u969C \xB7 \u5DF2\u505C\u6B62\u8C03\u8282","temperature.autoFaultUnknown":"\u8BF7\u6838\u5BF9\u901A\u4FE1\u3001\u4F20\u611F\u5668\u548C\u7EE7\u7535\u5668\u53CD\u9988\uFF0C\u518D\u624B\u52A8\u91CD\u65B0\u5F00\u542F\u3002","automaticFault.AHT_INVALID":"\u6E29\u5EA6\u6837\u672C\u65E0\u6548\u6216\u5DF2\u8FC7\u671F","automaticFault.UART_STALE":"\u4E24\u677F\u901A\u4FE1\u5DF2\u8FC7\u671F\uFF0C\u8F93\u51FA\u72B6\u6001\u9700\u6838\u5BF9","automaticFault.STM_RESET":"STM32 \u5DF2\u91CD\u542F\uFF0C\u9700\u8981\u624B\u52A8\u91CD\u65B0\u5F00\u542F","automaticFault.THERMAL_MAPPING":"\u51B7\u70ED\u901A\u9053\u914D\u7F6E\u4E0D\u5339\u914D","automaticFault.NATIVE_AUTO":"STM32 \u5B9E\u4F53 AUTO \u5DF2\u5F00\u542F\uFF0C\u7F51\u9875\u81EA\u52A8\u63A7\u5236\u5DF2\u9000\u51FA","automaticFault.LOCAL_OVERRIDE":"\u8F93\u51FA\u88AB\u5176\u4ED6\u64CD\u4F5C\u6539\u53D8\uFF0C\u7F51\u9875\u81EA\u52A8\u63A7\u5236\u5DF2\u9000\u51FA","automaticFault.CONTROL_FAILED":"\u8F93\u51FA\u6307\u4EE4\u672A\u5B8C\u6210\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u7EE7\u7535\u5668\u53CD\u9988","temperature.manualHelp":"\u624B\u52A8\u52A0\u70ED / \u51B7\u5374\u4F1A\u9000\u51FA\u81EA\u52A8\u6A21\u5F0F\uFF0C\u4E24\u8DEF\u4E92\u65A5\u3002","temperature.measured":"\u5B9E\u6D4B\u6E29\u5EA6","temperature.estimated":"\u4F30\u7B97\u6E29\u5EA6","temperature.estimateSource":"\u8FD0\u884C\u63A8\u7B97","temperature.delay":"\u542F\u52A8\u7B49\u5F85 {seconds} s","temperature.hold":"\u4FDD\u6301\u4F30\u7B97\u503C","temperature.frozen":"\u4F30\u7B97\u5DF2\u6682\u505C","temperature.heatingEstimate":"\u52A0\u70ED\u4F30\u7B97","temperature.coolingEstimate":"\u51B7\u5374\u4F30\u7B97","temperature.runningEstimate":"\u8FD0\u884C\u4F30\u7B97","temperature.waiting":"\u7B49\u5F85\u6837\u672C","temperature.invalid":"\u6837\u672C\u65E0\u6548","temperature.valid":"\u6709\u6548\u6837\u672C","humidity.label":"\u76F8\u5BF9\u6E7F\u5EA6","process.label":"\u8FD0\u884C\u72B6\u6001","process.connectHelp":"\u8FDE\u63A5 ESP32 \u540E\u663E\u793A\u8BBE\u5907\u53CD\u9988","process.waiting":"\u7B49\u5F85\u8FDE\u63A5","process.offline":"\u8BBE\u5907\u79BB\u7EBF","process.lastFeedback":"\u4FDD\u7559\u4E0A\u6B21\u56DE\u62A5\uFF0C\u6267\u884C\u5668\u5F53\u524D\u72B6\u6001\u672A\u77E5","process.noFeedback":"\u5C1A\u672A\u6536\u5230 STM32 \u72B6\u6001","process.heating":"\u52A0\u70ED","process.cooling":"\u51B7\u5374","process.dispensing":"\u51FA\u6DB2","process.hold":"\u6E29\u533A\u4FDD\u6301","process.idle":"\u8BBE\u5907\u5F85\u673A","process.automatic":"\u81EA\u52A8\u63A7\u5236 \xB7 \u8DDF\u968F\u8BBE\u5B9A\u6E29\u533A","process.manual":"\u624B\u52A8\u63A7\u5236 \xB7 \u7B49\u5F85\u64CD\u4F5C","pump.control":"\u6C34\u6CF5\u63A7\u5236","pump.limit":"\u8FDE\u7EED\u8FD0\u884C\u65F6\u9650","pump.limitAria":"\u6CF5\u8FDE\u7EED\u8FD0\u884C\u65F6\u9650","unit.seconds":"\u79D2","pump.save":"\u4FDD\u5B58","pump.start":"\u542F\u52A8\u6C34\u6CF5","pump.stop":"\u505C\u6B62","pump.current":"\u672C\u6B21","pump.total":"\u7D2F\u8BA1","pump.running":"\u8FD0\u884C\u4E2D","pump.limited":"\u8FBE\u5230\u65F6\u9650","pump.stopped":"\u5DF2\u505C\u6B62","level.monitor":"\u6DB2\u4F4D\u76D1\u6D4B","level.upper":"\u4E0A\u4F4D","level.middle":"\u4E2D\u4F4D","level.lower":"\u4E0B\u4F4D","level.waiting":"\u7B49\u5F85\u4E09\u70B9\u6DB2\u4F4D\u6570\u636E","level.last":"\u4E0A\u6B21\uFF1A{range}","level.EMPTY.name":"\u4F4E\u6DB2\u91CF","level.EMPTY.range":"\u6DB2\u4F4D\u4F4E\u4E8E\u4E0B\u4F4D\u4F20\u611F\u5668","level.LOW.name":"\u5C11\u91CF","level.LOW.range":"\u6DB2\u4F4D\u5728\u4E0B\u4F4D\u4E0E\u4E2D\u4F4D\u4E4B\u95F4","level.NORMAL.name":"\u6B63\u5E38","level.NORMAL.range":"\u6DB2\u4F4D\u5728\u4E2D\u4F4D\u4E0E\u4E0A\u4F4D\u4E4B\u95F4","level.FULL.name":"\u6EE1\u6DB2","level.FULL.range":"\u6DB2\u4F4D\u9AD8\u4E8E\u4E0A\u4F4D\u4F20\u611F\u5668","level.LEVEL_ERR.name":"\u6DB2\u4F4D\u5F02\u5E38","level.LEVEL_ERR.range":"\u63A2\u5934\u7EC4\u5408\u4E0D\u8FDE\u7EED\uFF0C\u6DB2\u91CF\u672A\u77E5","level.LEVEL_NC.name":"\u672A\u914D\u7F6E","level.LEVEL_NC.range":"\u6DB2\u4F4D\u4F20\u611F\u5668\u672A\u5B8C\u6574\u914D\u7F6E","level.unknownCaption":"{range}\uFF1B\u6A21\u578B\u4E0D\u63A8\u65AD\u6DB2\u91CF\u3002","level.demoCaption":"\u62BD\u6C34\u6F14\u793A\u5DF2\u52A0\u901F\uFF0C\u6DB2\u9762\u968F\u62BD\u6C34\u4E0B\u964D\uFF1B\u6C34\u6D41\u4E0E\u4F20\u70ED\u573A\u4E3A\u793A\u610F\u3002","level.realCaption":"\u6DB2\u9762\u8868\u793A\u4E09\u70B9\u6DB2\u4F4D\u533A\u95F4\uFF1B\u6C34\u6D41\u4E0E\u4F20\u70ED\u573A\u6309\u8FD0\u884C\u72B6\u6001\u793A\u610F\u3002","level.demo":"\u6F14\u793A\u6DB2\u4F4D","level.demoEmpty":"\u4F4E\u4E8E\u4E0B\u4F4D","level.demoLow":"\u4E0B\u2013\u4E2D","level.demoNormal":"\u4E2D\u2013\u4E0A","level.demoFull":"\u6EE1\u6DB2","sensor.unknown":"\u672A\u77E5","sensor.wet":"\u6E7F\u6001","sensor.dry":"\u5E72\u6001","state.waitingData":"\u7B49\u5F85\u6570\u636E","state.waiting":"\u7B49\u5F85\u72B6\u6001","state.unknown":"\u72B6\u6001\u672A\u77E5","state.previous":"\u4E0A\u6B21\u56DE\u62A5","state.on":"\u5F00\u542F","state.off":"\u5173\u95ED","state.running":"\u8FD0\u884C","state.stopped":"\u505C\u6B62","state.idle":"\u5F85\u673A","state.closed":"\u5DF2\u5173\u95ED","stop.all":"\u5168\u90E8\u505C\u6B62","stop.caption":"STOP ALL","view.aria":"\u50A8\u6DB2\u7F50\u4E09\u7EF4\u5B9E\u65F6\u53EF\u89C6\u5316","view.eyebrow":"\u5B9E\u65F6\u8FC7\u7A0B\u89C6\u56FE","view.title":"\u770B\u89C1\u6BCF\u4E00\u4E2A\u8FD0\u884C\u72B6\u6001","view.model":"3D \u900F\u89C6","view.reset":"\u590D\u4F4D\u89C6\u89D2","view.resetAria":"\u590D\u4F4D\u4E09\u7EF4\u89C6\u89D2","view.reduceMotion":"\u51CF\u5C11\u52A8\u6001\u6548\u679C","view.sceneAria":"\u53EF\u62D6\u52A8\u65CB\u8F6C\u3001\u6EDA\u8F6E\u7F29\u653E\u7684\u4E09\u7EF4\u7F50\u4F53","view.canvasAria":"\u50A8\u7F50\u4E09\u7EF4\u53EF\u89C6\u5316\uFF0C\u53EF\u62D6\u52A8\u65CB\u8F6C\u3001\u6EDA\u8F6E\u7F29\u653E\u3002\u6DB2\u4F4D\u4E3A\u4F20\u611F\u5668\u533A\u95F4\u793A\u610F\u3002","view.demoSource":"\u6D4F\u89C8\u5668\u6F14\u793A \xB7 \u4E0D\u63A7\u5236\u786C\u4EF6","view.mockSource":"\u6A21\u62DF API \xB7 \u975E\u786C\u4EF6\u72B6\u6001","view.simulatedSource":"STM32 \u6A21\u62DF\u542F\u7528","view.realSource":"STM32 \u5B9E\u65F6\u53CD\u9988","view.waiting":"\u7B49\u5F85\u8BBE\u5907\u8FDE\u63A5","view.offline":"\u8BBE\u5907\u72B6\u6001\u5DF2\u79BB\u7EBF","view.offlineKnown":"\u663E\u793A\u4E0A\u6B21\u56DE\u62A5\u3002\u6267\u884C\u5668\u5F53\u524D\u72B6\u6001\u672A\u77E5\uFF0C\u52A8\u6001\u6548\u679C\u5DF2\u6682\u505C\u3002","view.offlineUnknown":"\u72B6\u6001\u6062\u590D\u540E\uFF0C\u6A21\u578B\u5C06\u7EE7\u7EED\u8DDF\u968F\u8BBE\u5907\u53CD\u9988\u3002","view.tryDemo":"\u5148\u4F53\u9A8C 3D \u6F14\u793A","view.hint":"\u62D6\u52A8\u65CB\u8F6C \xB7 \u6EDA\u8F6E\u7F29\u653E","view.webglTitle":"\u6D4F\u89C8\u5668\u672A\u80FD\u542F\u52A8 3D","view.webglDetail":"\u8BF7\u4F7F\u7528\u652F\u6301 WebGL2 \u7684\u6D4F\u89C8\u5668\u3002\u8BBE\u5907\u63A7\u5236\u548C\u6570\u636E\u8BFB\u53D6\u4ECD\u53EF\u4F7F\u7528\u3002","legend.liquid":"\u6DB2\u4F53","legend.heat":"\u70ED\u6D41","legend.cold":"\u51B7\u7AEF\u5438\u70ED","callout.upper":"\u4E0A\u4F4D\u4F20\u611F\u5668","callout.middle":"\u4E2D\u4F4D\u4F20\u611F\u5668","callout.lower":"\u4E0B\u4F4D\u4F20\u611F\u5668","callout.aht":"\u6E29\u5EA6 / \u6E7F\u5EA6","callout.pump":"\u51FA\u6DB2\u6C34\u6CF5","callout.heater":"\u4FA7\u8D34\u9676\u74F7\u7247","callout.cooler":"\u5236\u51B7\u7EC4\u4EF6\u4E0E\u98CE\u6247","callout.cabinet":"\u63A7\u5236\u67DC","callout.cabinetInfo":"\u7535\u6E90 / \u63A7\u5236","strip.control":"\u63A7\u5236\u6A21\u5F0F","strip.heater":"\u52A0\u70ED \xB7 {channel}","strip.cooler":"\u51B7\u5374 \xB7 {channel}","strip.pump":"\u6C34\u6CF5 \xB7 CH1","strip.auto":"\u81EA\u52A8\u6E29\u63A7","strip.manual":"\u624B\u52A8\u63A7\u5236","strip.heating":"\u6B63\u5728\u52A0\u70ED","strip.cooling":"\u6B63\u5728\u51B7\u5374","strip.dispensing":"\u6B63\u5728\u51FA\u6DB2","updated.demo":"\u6D4F\u89C8\u5668\u672C\u5730\u6F14\u793A","updated.none":"\u5C1A\u672A\u6536\u5230\u72B6\u6001","updated.ago":"\u56DE\u62A5 {seconds} \u79D2\u524D","thermal.title":"\u4F20\u70ED\u573A","thermal.fieldLabel":"\u4E09\u7EF4\u793A\u610F\u6E29\u5EA6\u573A","thermal.low":"\u8F83\u4F4E\u6E29","thermal.high":"\u8F83\u9AD8\u6E29","thermal.volume":"\u4F53\u79EF\u6E29\u5EA6\u573A","thermal.flux":"\u70ED\u6D41\u65B9\u5411","thermal.dissipation":"\u6563\u70ED\u8DEF\u5F84","thermal.paused":"\u53CD\u9988\u4E2D\u65AD \xB7 \u5DF2\u6682\u505C","thermal.pausedNote":"\u7B49\u5F85\u8BBE\u5907\u5B9E\u65F6\u72B6\u6001\uFF0C\u52A8\u6001\u4F20\u70ED\u573A\u5DF2\u6682\u505C\u3002","thermal.unknown":"\u6DB2\u4F4D\u672A\u77E5 \xB7 \u6E29\u5EA6\u573A\u9690\u85CF","thermal.unknownNote":"\u6DB2\u4F4D\u7EC4\u5408\u672A\u786E\u8BA4\uFF0C\u6682\u4E0D\u63A8\u65AD\u6DB2\u4F53\u5185\u4F20\u70ED\u3002","thermal.empty":"\u4F4E\u6DB2\u91CF \xB7 \u58C1\u9762\u4F20\u5BFC","thermal.emptyNote":"\u6DB2\u4F4D\u4F4E\u4E8E\u4E0B\u4F4D\u63A2\u5934\uFF0C\u6DB2\u9762\u4EC5\u6309\u533A\u95F4\u793A\u610F\uFF1B\u5269\u4F59\u6DB2\u91CF\u672A\u6D4B\u5F97\u3002","thermal.heating":"\u52A0\u70ED \xB7 \u4FA7\u58C1\u4F20\u70ED","thermal.heatingNote":"\u70ED\u91CF\u7531\u9676\u74F7\u7247\u7ECF\u7F50\u58C1\u5411\u6DB2\u4F53\u5185\u90E8\u6269\u6563\uFF0C\u6696\u8272\u8272\u573A\u5C55\u793A\u53D7\u70ED\u8303\u56F4\u548C\u6E29\u5EA6\u68AF\u5EA6\u3002","thermal.cooling":"\u51B7\u5374 \xB7 \u5438\u70ED / \u6563\u70ED","thermal.coolingNote":"\u51B7\u7AEF\u4ECE\u6DB2\u4F53\u5438\u70ED\uFF0C\u84DD\u8272\u8272\u573A\u5C55\u793A\u51B7\u5374\u8303\u56F4\uFF1B\u70ED\u91CF\u7ECF\u9CCD\u7247\u548C\u98CE\u6247\u6392\u5165\u7A7A\u6C14\u3002","thermal.coolingLowNote":"\u4F4E\u6DB2\u4F4D\u5DF2\u8986\u76D6\u51B7\u7AEF\u4E0B\u90E8\uFF0C\u84DD\u8272\u8272\u573A\u4ECE\u63A5\u89E6\u533A\u5411\u6DB2\u4F53\u5185\u6269\u5C55\uFF1B\u70ED\u91CF\u7ECF\u9CCD\u7247\u548C\u98CE\u6247\u6392\u5165\u7A7A\u6C14\u3002","thermal.idle":"\u5F85\u673A \xB7 \u6E29\u5EA6\u5747\u5316","thermal.idleNote":"\u6E29\u5DEE\u9010\u6B65\u6269\u6563\uFF1B\u793A\u610F\u573A\u672A\u6807\u5B9A\u529F\u7387\u3001\u6D41\u901F\u6216\u5C40\u90E8\u6E29\u5EA6\u3002","action.range":"\u6E29\u533A","action.auto":"\u81EA\u52A8\u6E29\u63A7","action.pump":"\u6C34\u6CF5","action.heat":"\u52A0\u70ED","action.cool":"\u51B7\u5374","action.pump_limit":"\u6CF5\u65F6\u9650","action.stop":"\u5168\u90E8\u505C\u6B62","action.device":"\u8BBE\u5907\u64CD\u4F5C","ack.waiting":"\u7B49\u5F85\u8BBE\u5907\u72B6\u6001","ack.pending":"{action}\u7B49\u5F85 STM32 \u786E\u8BA4\u2026","ack.confirmed":"{action}\u5DF2\u7531 STM32 \u786E\u8BA4","ack.autoPending":"ESP32 \u81EA\u52A8\u6E29\u63A7\u7B49\u5F85\u7EE7\u7535\u5668\u72B6\u6001\u786E\u8BA4\u2026","ack.autoConfirmed":"ESP32 \u81EA\u52A8\u6E29\u63A7\u72B6\u6001\u5DF2\u786E\u8BA4","ack.acceptedUnknown":"\u8BBE\u5907\u5DF2\u63A5\u6536\uFF0C\u540E\u7EED\u72B6\u6001\u672A\u786E\u8BA4\u3002\u8BF7\u6838\u5BF9\u5B9E\u65F6\u72B6\u6001\u3002","ack.unconfirmed":"\u672A\u6536\u5230\u8BBE\u5907\u786E\u8BA4\u3002\u547D\u4EE4\u6CA1\u6709\u81EA\u52A8\u91CD\u53D1\u3002","ack.sessionChanged":"\u8BBE\u5907\u901A\u4FE1\u4F1A\u8BDD\u5DF2\u53D8\u5316\uFF0C\u64CD\u4F5C\u7ED3\u679C\u672A\u77E5\u3002\u8BF7\u91CD\u65B0\u6838\u5BF9\u72B6\u6001\u3002","ack.timeout":"\u7B49\u5F85\u786E\u8BA4\u8D85\u65F6\u3002\u64CD\u4F5C\u7ED3\u679C\u672A\u77E5\uFF0C\u672A\u81EA\u52A8\u91CD\u53D1\u3002","ack.mockConnected":"\u5F00\u53D1\u6A21\u62DF\u6570\u636E\u5DF2\u8FDE\u63A5","ack.connected":"STM32 \u72B6\u6001\u5DF2\u8FDE\u63A5","ack.demoUpdated":"{action} \xB7 \u6D4F\u89C8\u5668\u6F14\u793A\u5DF2\u66F4\u65B0","ack.demoToast":"{action}\u6F14\u793A\u5DF2\u66F4\u65B0\uFF08\u672A\u53D1\u9001\u786C\u4EF6\u547D\u4EE4\uFF09","ack.demoMode":"\u7EAF\u6D4F\u89C8\u5668\u6F14\u793A\uFF0C\u672A\u63A7\u5236\u786C\u4EF6","ack.reading":"\u8BFB\u53D6\u8BBE\u5907\u72B6\u6001\u2026","error.noSession":"\u5C1A\u672A\u53D6\u5F97\u8BBE\u5907\u4F1A\u8BDD\u3002","error.operation":"\u8BBE\u5907\u64CD\u4F5C\u5931\u8D25 ({status})","error.notAccepted":"\u8BBE\u5907\u672A\u63A5\u6536\u547D\u4EE4\u3002","error.interrupted":"\u8BF7\u6C42\u4E2D\u65AD\uFF0C\u6267\u884C\u7ED3\u679C\u672A\u77E5\u3002\u672A\u81EA\u52A8\u91CD\u53D1\uFF1B\u53EF\u4F7F\u7528\u5168\u90E8\u505C\u6B62\u3002","validation.temperature":"\u8BF7\u586B\u5199\u6709\u6548\u6E29\u5EA6\u3002","validation.range":"\u6E29\u533A\u987B\u6EE1\u8DB3 \u221240\xB0C \u2264 \u4E0B\u9650 < \u4E0A\u9650 \u2264 85\xB0C\u3002","validation.precision":"\u4E0A\u9650\u81F3\u5C11\u5E94\u6BD4\u4E0B\u9650\u9AD8 0.01\xB0C\u3002","validation.limit":"\u6CF5\u8FD0\u884C\u65F6\u9650\u987B\u4E3A 1\u2013300 \u79D2\u7684\u6574\u6570\u3002","validation.demoLevel":"\u6F14\u793A\u6DB2\u4F4D\u7EC4\u5408\u65E0\u6548\u3002","fault.PUMP_LIMIT":"\u6CF5\u5DF2\u8FBE\u5230\u8FDE\u7EED\u8FD0\u884C\u65F6\u9650","fault.AHT_ERR":"\u6E29\u6E7F\u5EA6\u8BFB\u53D6\u5931\u8D25","fault.AHT_STALE":"\u6E29\u6E7F\u5EA6\u6837\u672C\u8FC7\u671F","fault.SENSOR_ERROR":"\u4F20\u611F\u5668\u5F02\u5E38","api.origin":"\u8DE8\u6765\u6E90\u63A7\u5236\u8BF7\u6C42\u5DF2\u62D2\u7EDD\u3002","api.contentType":"\u63A7\u5236\u8BF7\u6C42\u5FC5\u987B\u4F7F\u7528 application/json\u3002","api.bodyTooLarge":"\u63A7\u5236\u8BF7\u6C42\u8D85\u8FC7\u5141\u8BB8\u957F\u5EA6\u3002","api.json":"\u63A7\u5236\u8BF7\u6C42\u683C\u5F0F\u65E0\u6548\u3002","api.session":"\u8BBE\u5907\u4F1A\u8BDD\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u7B49\u5F85\u5B9E\u65F6\u72B6\u6001\u5237\u65B0\u540E\u64CD\u4F5C\u3002","api.argument":"\u63A7\u5236\u53C2\u6570\u65E0\u6548\uFF0C\u8BF7\u6838\u5BF9\u6E29\u533A\u3001\u65F6\u9650\u548C\u5F00\u5173\u503C\u3002","api.busy":"\u4E0A\u4E00\u6761\u547D\u4EE4\u7B49\u5F85 STM32 \u786E\u8BA4\uFF1B\u53EF\u4F7F\u7528\u5168\u90E8\u505C\u6B62\u3002","api.offline":"\u9700\u8981\u6709\u6548\u7684 STM32 \u5B9E\u65F6\u72B6\u6001\u540E\u624D\u80FD\u542F\u52A8\u6216\u914D\u7F6E\u3002","api.tx":"UART2 \u8BF7\u6C42\u53D1\u9001\u4E0D\u5B8C\u6574\uFF1B\u547D\u4EE4\u6CA1\u6709\u81EA\u52A8\u91CD\u53D1\u3002","api.stm":"STM32 \u8FD4\u56DE\u9519\u8BEF\uFF1A{detail}","api.incompatible":"STM32 \u56FA\u4EF6\u534F\u8BAE\u4E0D\u517C\u5BB9\uFF0C\u9700\u8981 tankctrl-3.0 / protocol 1\u3002","api.thermalMapping":"\u5F53\u524D STM32 \u56FA\u4EF6\u6216\u51B7\u70ED\u901A\u9053\u914D\u7F6E\u4E0D\u5339\u914D\u3002","api.autoSensor":"\u81EA\u52A8\u6E29\u63A7\u9700\u8981\u6709\u6548\u3001\u6700\u65B0\u7684\u5B9E\u6D4B\u6570\u636E\uFF1B\u8BF7\u5173\u95ED\u6E29\u5EA6\u53CA\u6DB2\u4F4D\u6A21\u62DF\u3002","api.autoRecovery":"\u6B63\u5728\u7B49\u5F85\u7EE7\u7535\u5668\u5173\u95ED\u786E\u8BA4\uFF0C\u8BF7\u7A0D\u540E\u518D\u5F00\u542F\u81EA\u52A8\u6E29\u63A7\u3002","api.ack":"\u8BBE\u5907\u786E\u8BA4\u4E0E\u8BF7\u6C42\u53C2\u6570\u4E0D\u4E00\u81F4\u3002","api.reply":"\u672A\u6536\u5230\u5339\u914D\u7684 STM32 \u72B6\u6001\u56DE\u590D\u3002","api.status":"STM32 \u72B6\u6001\u683C\u5F0F\u65E0\u6548\u3002","api.reset":"STM32 \u5DF2\u91CD\u542F\uFF1B\u5F85\u786E\u8BA4\u547D\u4EE4\u5DF2\u53D6\u6D88\uFF0C\u6B63\u5728\u91CD\u65B0\u6821\u9A8C\u534F\u8BAE\u3002","api.frame":"UART2 \u56DE\u590D\u65E0\u6548\u6216\u8FC7\u957F\u3002","api.protocol":"UART2 \u901A\u4FE1\u534F\u8BAE\u683C\u5F0F\u65E0\u6548\u3002","api.timeout":"800 ms \u5185\u672A\u6536\u5230\u5339\u914D\u7684 STM32 \u56DE\u590D\uFF1B\u547D\u4EE4\u6CA1\u6709\u81EA\u52A8\u91CD\u53D1\u3002","api.stale":"STM32 \u72B6\u6001\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u7B49\u5F85\u901A\u4FE1\u548C\u5B9E\u65F6\u72B6\u6001\u6062\u590D\u3002","api.notFound":"\u8BBE\u5907 API \u8DEF\u5F84\u6216\u8BF7\u6C42\u65B9\u6CD5\u4E0D\u5B58\u5728\u3002","api.hotspot":"ESP32 \u70ED\u70B9\u542F\u52A8\u5931\u8D25\u3002","api.noHardware":"\u5F00\u53D1\u670D\u52A1\u5668\u672A\u8FDE\u63A5\u5B9E\u9645\u8BBE\u5907\u3002","api.development":"\u672C\u5730\u5F00\u53D1\u670D\u52A1\u5668\u672A\u8FDE\u63A5\u786C\u4EF6\uFF0C\u8BF7\u4F7F\u7528\u6D4F\u89C8\u5668\u6F14\u793A\u6A21\u5F0F\u3002","api.unknown":"\u8BBE\u5907\u8FD4\u56DE\u9519\u8BEF\uFF08{code}\uFF09\uFF0C\u8BF7\u6838\u5BF9\u5B9E\u65F6\u72B6\u6001\u3002"}),en:Object.freeze({"page.title":"FLOW / Tank console","api.uiVersion":"This page is outdated. Reopen the device webpage.","brand.name":"Tank console","brand.home":"Tank console home","language.switch":"Switch language: \u4E2D\u6587 / English","language.current":"Current language: English","network.settings":"Wi-Fi settings","network.eyebrow":"LOCAL NETWORK","network.title":"Connect to the hotspot","network.close":"Close connection information","network.intro":"Connect your phone or computer to this hotspot, then open the device address in a browser. The ESP32 hosts this page and the 3D model locally.","network.ssid":"Wi-Fi name","network.password":"Wi-Fi password","network.address":"Device address","network.helper":"Internet access is not required. The 3D demo runs in your browser; Live device mode receives STM32 feedback over UART.","network.done":"Got it","panel.eyebrow":"CONTROL PANEL","panel.title":"Device controls","mode.group":"Data source","mode.real":"Live device","mode.demo":"3D demo","mode.browserDemo":"Browser demo","mode.mockApi":"Mock API","mode.demoNote":"Browser demonstration only. Buttons do not send commands to hardware.","mode.mockNote":"Development API simulation. No physical hardware is connected.","mode.realNote":"Reading STM32 feedback. Operations wait for device confirmation.","connection.demo":"Demo mode","connection.mock":"Mock device","connection.online":"Device online","connection.connecting":"Connecting","connection.offline":"Device offline","temperature.control":"Temperature","temperature.lower":"Lower limit","temperature.upper":"Upper limit","temperature.save":"Save range","temperature.auto":"Auto control","temperature.autoDescription":"Maintain the configured temperature range","temperature.autoDisplayedDescription":"Control the displayed temperature within the set range","temperature.heat":"Heating","temperature.cool":"Cooling","temperature.appliedRange":"Applied range {lower}\u2013{upper} \xB0C","temperature.appliedRangeUnknown":"Awaiting applied range","temperature.controlSample":"Auto control input","temperature.controlNote":"Auto control uses the displayed temperature; measured samples remain required for validity checks.","temperature.control.below":"Below range \xB7 Heat needed","temperature.control.within":"In range \xB7 Hold","temperature.control.above":"Above range \xB7 Cool needed","temperature.control.unknown":"Awaiting valid temperature","temperature.autoUnsupported":"The current STM32 firmware or channel configuration does not match this program. Auto control is unavailable.","temperature.ownerEsp32":"ESP32 Auto control \xB7 STM32 executes relay commands","temperature.ownerStm32":"STM32 Auto control","temperature.ownerDemo":"Browser Auto control demo","temperature.localHelp":"Keep AUTO off in the STM32 physical menu while using web Auto control. The two controllers cannot run together.","temperature.autoPhase.off":"Auto control off","temperature.autoPhase.starting":"Starting Auto control \xB7 Awaiting output confirmation","temperature.autoPhase.running":"Auto control running","temperature.autoPhase.stopping":"Stopping Auto control \xB7 Awaiting off confirmation","temperature.autoPhase.fault":"Auto control fault \xB7 Adjustment stopped","temperature.autoFaultUnknown":"Check communication, sensors and relay feedback before enabling Auto again.","automaticFault.AHT_INVALID":"Temperature sample is invalid or expired","automaticFault.UART_STALE":"Board communication expired; verify output states","automaticFault.STM_RESET":"STM32 restarted; enable Auto again manually","automaticFault.THERMAL_MAPPING":"Heat/cool channel configuration does not match","automaticFault.NATIVE_AUTO":"STM32 physical AUTO was enabled; web Auto control exited","automaticFault.LOCAL_OVERRIDE":"Another operation changed the outputs; web Auto control exited","automaticFault.CONTROL_FAILED":"Output command was not confirmed; verify relay feedback","temperature.manualHelp":"Manual heating or cooling exits Auto mode. Only one can run at a time.","temperature.measured":"Measured temperature","temperature.estimated":"Estimated temperature","temperature.estimateSource":"Runtime model","temperature.delay":"Starting in {seconds} s","temperature.hold":"Estimate held","temperature.frozen":"Estimate paused","temperature.heatingEstimate":"Heating estimate","temperature.coolingEstimate":"Cooling estimate","temperature.runningEstimate":"Runtime estimate","temperature.waiting":"Awaiting sample","temperature.invalid":"Invalid sample","temperature.valid":"Valid sample","humidity.label":"Relative humidity","process.label":"Process state","process.connectHelp":"Connect ESP32 to see device feedback","process.waiting":"Awaiting connection","process.offline":"Device offline","process.lastFeedback":"Last report retained; current actuator state is unknown","process.noFeedback":"No STM32 status received","process.heating":"Heating","process.cooling":"Cooling","process.dispensing":"Dispensing","process.hold":"Holding range","process.idle":"Device idle","process.automatic":"Auto control \xB7 Following the set range","process.manual":"Manual control \xB7 Awaiting an operation","pump.control":"Pump","pump.limit":"Continuous run limit","pump.limitAria":"Pump continuous run limit","unit.seconds":"s","pump.save":"Save","pump.start":"Start pump","pump.stop":"Stop","pump.current":"Current","pump.total":"Total","pump.running":"Running","pump.limited":"Limit reached","pump.stopped":"Stopped","level.monitor":"Liquid level","level.upper":"Upper","level.middle":"Middle","level.lower":"Lower","level.waiting":"Awaiting three-probe level data","level.last":"Last: {range}","level.EMPTY.name":"Very low","level.EMPTY.range":"Below the lower probe","level.LOW.name":"Low","level.LOW.range":"Between the lower and middle probes","level.NORMAL.name":"Normal","level.NORMAL.range":"Between the middle and upper probes","level.FULL.name":"Full","level.FULL.range":"Above the upper probe","level.LEVEL_ERR.name":"Level fault","level.LEVEL_ERR.range":"Inconsistent probe pattern; volume unknown","level.LEVEL_NC.name":"Not configured","level.LEVEL_NC.range":"Level probes are not fully configured","level.unknownCaption":"{range}; liquid volume is not inferred.","level.demoCaption":"Demo drawdown is accelerated. The surface falls as the pump runs; water flow and thermal fields are illustrative.","level.realCaption":"The surface shows the three-probe level interval. Water flow and thermal fields illustrate the reported operating state.","level.demo":"Demo level","level.demoEmpty":"Very low","level.demoLow":"Lower\u2013mid","level.demoNormal":"Mid\u2013upper","level.demoFull":"Full","sensor.unknown":"Unknown","sensor.wet":"Wet","sensor.dry":"Dry","state.waitingData":"Awaiting data","state.waiting":"Awaiting status","state.unknown":"State unknown","state.previous":"Last report","state.on":"On","state.off":"Off","state.running":"Running","state.stopped":"Stopped","state.idle":"Idle","state.closed":"Off","stop.all":"Stop all","stop.caption":"ALL OUTPUTS","view.aria":"Live 3D tank visualization","view.eyebrow":"LIVE PROCESS VIEW","view.title":"Every operating state, visible","view.model":"3D cutaway","view.reset":"Reset view","view.resetAria":"Reset the 3D view","view.reduceMotion":"Reduce motion","view.sceneAria":"3D tank. Drag to rotate and scroll to zoom","view.canvasAria":"3D tank visualization. Drag to rotate and scroll to zoom. The liquid level illustrates a probe interval.","view.demoSource":"Browser demo \xB7 No hardware control","view.mockSource":"Mock API \xB7 No hardware state","view.simulatedSource":"STM32 simulation enabled","view.realSource":"Live STM32 feedback","view.waiting":"Awaiting device connection","view.offline":"Device feedback is offline","view.offlineKnown":"Showing the last report. Current actuator state is unknown; animations are paused.","view.offlineUnknown":"The model will follow device feedback when the connection returns.","view.tryDemo":"Explore the 3D demo","view.hint":"Drag to rotate \xB7 Scroll to zoom","view.webglTitle":"3D could not start","view.webglDetail":"Use a browser with WebGL2 support. Device controls and telemetry are still available.","legend.liquid":"Liquid","legend.heat":"Heat flow","legend.cold":"Cold-side heat uptake","callout.upper":"Upper probe","callout.middle":"Middle probe","callout.lower":"Lower probe","callout.aht":"Temp / humidity","callout.pump":"Outlet pump","callout.heater":"Ceramic heater","callout.cooler":"Peltier + fan","callout.cabinet":"Control cabinet","callout.cabinetInfo":"Power / control","strip.control":"CONTROL","strip.heater":"HEATER \xB7 {channel}","strip.cooler":"COOLER \xB7 {channel}","strip.pump":"PUMP \xB7 CH1","strip.auto":"Auto control","strip.manual":"Manual control","strip.heating":"Heating","strip.cooling":"Cooling","strip.dispensing":"Dispensing","updated.demo":"Local browser demo","updated.none":"No status received","updated.ago":"Reported {seconds} s ago","thermal.title":"Heat transfer","thermal.fieldLabel":"3D thermal field","thermal.low":"Cool","thermal.high":"Warm","thermal.volume":"Volume thermal field","thermal.flux":"Heat-flow direction","thermal.dissipation":"Heat rejection","thermal.paused":"Feedback lost \xB7 Paused","thermal.pausedNote":"Awaiting live device feedback. Thermal field animation is paused.","thermal.unknown":"Unknown level \xB7 Field hidden","thermal.unknownNote":"The probe pattern is unconfirmed; heat transfer inside the liquid is not inferred.","thermal.empty":"Very low level \xB7 Wall conduction","thermal.emptyNote":"Below the lower probe. The surface illustrates the level interval; residual liquid volume is not measured.","thermal.heating":"Heating \xB7 Sidewall transfer","thermal.heatingNote":"Heat spreads from the ceramic plate through the tank wall into the liquid. Warm volume color shows the heated region and thermal gradient.","thermal.cooling":"Cooling \xB7 Heat uptake / rejection","thermal.coolingNote":"The cold contact absorbs heat from the liquid. Blue volume color shows the cooled region; heat exits through the fins and fan.","thermal.coolingLowNote":"At low level, the liquid covers the lower cold contact. Blue volume color spreads into the liquid; heat exits through the fins and fan.","thermal.idle":"Idle \xB7 Thermal equalization","thermal.idleNote":"Temperature differences diffuse. The field is not calibrated for power, velocity, or local temperature.","action.range":"Temperature range","action.auto":"Auto control","action.pump":"Pump","action.heat":"Heating","action.cool":"Cooling","action.pump_limit":"Pump limit","action.stop":"Stop all","action.device":"Device operation","ack.waiting":"Awaiting device status","ack.pending":"{action}: awaiting STM32 confirmation\u2026","ack.confirmed":"{action} confirmed by STM32","ack.autoPending":"ESP32 Auto control: awaiting relay state confirmation\u2026","ack.autoConfirmed":"ESP32 Auto control state confirmed","ack.acceptedUnknown":"The device accepted the command, but the resulting state is unconfirmed. Check live feedback.","ack.unconfirmed":"No device confirmation received. The command was not automatically retried.","ack.sessionChanged":"The device session changed. The operation result is unknown; check live feedback again.","ack.timeout":"Confirmation timed out. The result is unknown; the command was not retried.","ack.mockConnected":"Development mock data connected","ack.connected":"STM32 feedback connected","ack.demoUpdated":"{action} \xB7 Browser demo updated","ack.demoToast":"{action} demo updated (no hardware command sent)","ack.demoMode":"Browser demo only; no hardware control","ack.reading":"Reading device status\u2026","error.noSession":"No device session is available yet.","error.operation":"Device operation failed ({status})","error.notAccepted":"The device did not accept the command.","error.interrupted":"Request interrupted; the result is unknown. It was not retried. Stop all remains available.","validation.temperature":"Enter valid temperatures.","validation.range":"The range must satisfy \u221240\xB0C \u2264 lower < upper \u2264 85\xB0C.","validation.precision":"The upper limit must be at least 0.01\xB0C above the lower limit.","validation.limit":"The pump limit must be a whole number from 1 to 300 seconds.","validation.demoLevel":"Invalid demonstration probe pattern.","fault.PUMP_LIMIT":"Pump continuous run limit reached","fault.AHT_ERR":"Temperature / humidity read failed","fault.AHT_STALE":"Temperature / humidity sample expired","fault.SENSOR_ERROR":"Sensor fault","api.origin":"Cross-origin control requests are rejected.","api.contentType":"Control requests must use application/json.","api.bodyTooLarge":"The control request exceeds the size limit.","api.json":"The control request is not valid JSON.","api.session":"The device session expired. Wait for live feedback to refresh before controlling.","api.argument":"Invalid control arguments. Check the range, time limit, and switch values.","api.busy":"A command is awaiting STM32 confirmation. Stop all can preempt it.","api.offline":"Fresh STM32 feedback is required before starting or configuring outputs.","api.tx":"UART2 could not queue the entire request. The command was not retried.","api.stm":"STM32 returned an error: {detail}","api.incompatible":"Incompatible STM32 firmware protocol; tankctrl-3.0 / protocol 1 is required.","api.thermalMapping":"The current STM32 firmware or heat/cool channel configuration does not match.","api.autoSensor":"Auto control needs valid, fresh measurements. Turn off temperature and level simulation.","api.autoRecovery":"Awaiting relay off confirmation. Enable Auto control again once this completes.","api.ack":"Device confirmation does not match the requested parameters.","api.reply":"No matching STM32 status response received.","api.status":"Invalid STM32 status format.","api.reset":"STM32 restarted. Pending controls were canceled; the protocol is being revalidated.","api.frame":"The UART2 response is invalid or oversized.","api.protocol":"Invalid UART2 protocol format.","api.timeout":"No matching STM32 reply within 800 ms. The command was not automatically retried.","api.stale":"STM32 feedback expired. Wait for communication and live status to recover.","api.notFound":"Unknown device API path or method.","api.hotspot":"The ESP32 hotspot could not start.","api.noHardware":"No physical device is connected to the development server.","api.development":"The local server is not connected to hardware. Use Browser demo mode.","api.unknown":"Device error ({code}). Check live feedback."})});function Bu(n){return typeof n=="string"&&/^en(?:[-_]|$)/i.test(n)?"en":"zh"}function Ly(){try{return Bu(globalThis.localStorage?.getItem(Nd))}catch{return"zh"}}var li=Ly(),ku=()=>li;function Od(n){li=Bu(n);try{globalThis.localStorage?.setItem(Nd,li)}catch{}return li}function ze(n,e={},t=li){return(Ul[Bu(t)][n]??Ul.zh[n]??n).replace(/\{(\w+)\}/g,(r,s)=>Object.hasOwn(e,s)?String(e[s]):r)}function Bd(n=globalThis.document){if(!n?.querySelectorAll)return;let e=[["data-i18n",null],["data-i18n-title","title"],["data-i18n-aria-label","aria-label"],["data-i18n-placeholder","placeholder"]];for(let[t,i]of e){let r=[...n.querySelectorAll(`[${t}]`)];n.matches?.(`[${t}]`)&&r.unshift(n);for(let s of r){let o=ze(s.getAttribute(t));i?s.setAttribute(i,o):s.textContent=o}}}var kd=(n,e=li)=>ze(`level.${Object.hasOwn(Ul.zh,`level.${n}.name`)?n:"LEVEL_NC"}.name`,{},e),Fl=(n,e=li)=>ze(`level.${Object.hasOwn(Ul.zh,`level.${n}.range`)?n:"LEVEL_NC"}.range`,{},e),xo=(n,e=li)=>ze(n==="\u6E7F\u6001"?"sensor.wet":n==="\u5E72\u6001"?"sensor.dry":"sensor.unknown",{},e),zd=(n,e=li)=>n==="\u7EAF\u6D4F\u89C8\u5668\u6F14\u793A"?ze("mode.browserDemo",{},e):n,Dy=Object.freeze({ORIGIN:"api.origin",CONTENT_TYPE:"api.contentType",BODY_TOO_LARGE:"api.bodyTooLarge",JSON:"api.json",SESSION:"api.session",SESSION_MISMATCH:"api.session",BAD_ARGUMENT:"api.argument",INVALID_REQUEST:"api.argument",UI_VERSION:"api.uiVersion",BUSY:"api.busy",OFFLINE:"api.offline",TX_PARTIAL:"api.tx",STM_ERR:"api.stm",UNMATCHED_ERR:"api.stm",INCOMPATIBLE:"api.incompatible",BAD_ACK:"api.ack",BAD_REPLY:"api.reply",BAD_STAT:"api.status",STM_RESET:"api.reset",UART_FRAME:"api.frame",UART_PROTOCOL:"api.protocol",TIMEOUT:"api.timeout",STALE:"api.stale",NOT_FOUND:"api.notFound",METHOD_NOT_ALLOWED:"api.notFound",AP_START:"api.hotspot",NO_HARDWARE:"api.noHardware",DEVELOPMENT_SERVER:"api.development",THERMAL_MAPPING:"api.thermalMapping",AUTO_SENSOR:"api.autoSensor",AUTO_RECOVERY:"api.autoRecovery"});function Hd(n,e="ack.unconfirmed",t={},i=li){let r=String(n?.code??"").toUpperCase();if(!r)return ze(e,t,i);let s=Dy[r];return s?ze(s,{...t,detail:n?.message||r},i):ze("api.unknown",{code:r},i)}var Vd="tank-web-ui-1.15";af({icons:{Waves:rc,Wifi:sc,Radio:jl,Check:Wl,Flame:Yl,Snowflake:ec,Play:Jl,Square:tc,OctagonX:wo,Rotate3d:Eo,Pause:Kl,Thermometer:nc,Droplets:ql,Activity:Vl,Move:$l,Info:Zl,Unplug:ic,ArrowUpRight:Gl,SlidersHorizontal:Ql,Cpu:Xl,CheckCircle2:bo,X:oc}});var Re=n=>document.getElementById(n),Rt=(n,e)=>{let t=Re(n);t.textContent!==String(e)&&(t.textContent=String(e))},Gd=n=>n===null?"\u2014":`${(n/1e3).toFixed(1)} s`,Xd=n=>ze(`action.${mo(n,ci())||"device"}`),Ln=(n,e={})=>({key:n,params:e}),Gu=(n,e)=>({key:n,action:e}),qd=(n,e="ack.unconfirmed",t={})=>({apiError:n,fallbackKey:e,params:t});function Zu(n){return n?.apiError?Hd(n.apiError,n.fallbackKey,n.params):n?.key?ze(n.key,n.action?{...n.params,action:Xd(n.action)}:n.params):String(n??"")}var xt="real",Ol=null,Wu=0,yo=!0,zu=!1,$i=!1,Mt=null,Nl=0,wr=!0,Ki=Du(),Xu=performance.now(),_o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,Wd,qu=null,wn={kind:"",message:Ln("ack.waiting")},Er,Yd=new Map([...document.querySelectorAll("[data-label]")].map(n=>[n.dataset.label,n])),Uy=new Map([...Yd.keys()].map(n=>{let e=document.createElement("span");return e.className="callout-leader",Re("modelLabels").prepend(e),[n,e]}));try{Er=bd(Re("scene"),{reducedMotion:_o,onLabels:n=>{for(let e of Ld(n,Re("scene").clientWidth,Re("scene").clientHeight)){let t=Yd.get(e.id);if(!t)continue;t.style.left=`${e.left}px`,t.style.top=`${e.top}px`,t.style.width=`${e.width}px`,t.style.height=`${e.height}px`,t.classList.toggle("visible",e.visible),t.classList.toggle("active",e.active);let i=Uy.get(e.id);i.style.left=`${e.x}px`,i.style.top=`${e.y}px`,i.style.width=`${e.lineLength}px`,i.style.transform=`rotate(${e.lineAngle}rad)`,i.classList.toggle("visible",e.visible),i.classList.toggle("active",e.active)}}})}catch(n){let e=document.createElement("div");e.className="scene-disconnected";let t=document.createElement("strong");t.dataset.i18n="view.webglTitle",t.textContent=ze("view.webglTitle");let i=document.createElement("span");i.dataset.i18n="view.webglDetail",i.textContent=ze("view.webglDetail"),e.append(t,i),Re("scene").append(e),console.error("WebGL initialization failed",n)}function ci(){return Ed(xt==="demo"?Ki:Ol,{demo:xt==="demo",localAgeMs:xt==="demo"||!Wu?0:performance.now()-Wu,transportFresh:xt==="demo"||yo})}function ui(n,e=!1){let t=Re("toast");qu=n,t.querySelector("span").textContent=Zu(n),t.classList.toggle("error",e),t.classList.add("show"),clearTimeout(Wd),Wd=setTimeout(()=>t.classList.remove("show"),e?6e3:3200)}function Fy(n,e){wn={kind:n,message:e},Hn()}function Zd(){let n=ku();document.documentElement.lang=n==="en"?"en":"zh-CN",Bd(document),Re("languageToggle").setAttribute("aria-pressed",String(n==="en")),Re("languageToggle").setAttribute("title",ze("language.current"));for(let e of Re("languageToggle").querySelectorAll("[data-language]"))e.classList.toggle("active",e.dataset.language===n);Re("scene").querySelector("canvas")?.setAttribute("aria-label",ze("view.canvasAria")),qu&&(Re("toast").querySelector("span").textContent=Zu(qu))}function Hu(n,e){e===null||n.dataset.dirty==="true"||document.activeElement===n||(n.value=e)}function Ny(n){if(n.stale)return{title:ze(wr?"process.waiting":"process.offline"),description:ze(n.raw?.stm?"process.lastFeedback":"process.noFeedback")};let e=[];n.heat&&e.push(ze("process.heating")),n.cool&&e.push(ze("process.cooling")),n.pump&&e.push(ze("process.dispensing"));let t=Ou(n),i=t.pending||t.fault?ze(t.key):e.length?e.join(" \xB7 "):ze(n.auto&&n.thermal==="HOLD"?"process.hold":"process.idle"),r=`fault.${n.fault}`,s=t.fault?Oy(n):n.fault?ze(r)===r?n.fault:ze(r):ze(n.auto?"process.automatic":"process.manual");return{title:i,description:s}}function Oy(n){let e=`automaticFault.${n.automaticFault}`;return ze(e)===e?ze("temperature.autoFaultUnknown"):ze(e)}function By(n){let e=n.configuredMask!==7||![0,4,6,7].includes(n.wetmask)||n.level==="LEVEL_ERR"||n.level==="LEVEL_NC",t=n.stale?"paused":e?"unknown":n.wetmask===0?"empty":n.heat?"heating":n.cool?"cooling":"idle";return{phase:t,title:ze(`thermal.${t}`),note:ze(t==="cooling"&&n.wetmask===4?"thermal.coolingLowNote":`thermal.${t}Note`)}}function Vu(n,e,t=""){let i=Re(n);i.textContent=e,i.className=`state-tag${t?` ${t}`:""}`}function Hn(){let n=Ud(ci()),e=Ou(n,Mt),t=!n.stale,i=!!n.raw?.stm,r=$i||!!Mt||!!n.pending,s=Ny(n);Re("realMode").classList.toggle("active",xt==="real"),Re("demoMode").classList.toggle("active",xt==="demo"),Re("realMode").disabled=r&&xt==="real",Re("demoMode").disabled=r&&xt==="real",Rt("controlMode",ze(xt==="demo"?"mode.browserDemo":n.mock?"mode.mockApi":"mode.real")),Re("modeNote").classList.toggle("demo",xt==="demo"),Re("modeNote").querySelector("span").textContent=ze(xt==="demo"?"mode.demoNote":n.mock?"mode.mockNote":"mode.realNote"),Re("connection").className=`connection ${xt==="demo"?"demo":t?"online":wr?"":"offline"}`,Rt("connectionText",ze(xt==="demo"?"connection.demo":n.mock&&t?"connection.mock":t?"connection.online":wr?"connection.connecting":"connection.offline")),Rt("tempValue",n.tempC===null?"\u2014":n.tempC.toFixed(2)),Rt("tempLabel",ze(n.tempEstimated?"temperature.estimated":"temperature.measured")),Rt("tempSource",n.tempEstimated?ze("temperature.estimateSource"):"AHT30"),Rt("humidityValue",n.humidity===null?"\u2014":n.humidity.toFixed(2));let o=ze(n.tempPhase==="delay"?"temperature.delay":n.tempPhase==="hold"?"temperature.hold":n.tempPhase==="frozen"?"temperature.frozen":n.heat?"temperature.heatingEstimate":n.cool?"temperature.coolingEstimate":"temperature.runningEstimate",{seconds:Math.ceil((n.tempDelayMs??0)/1e3)});Rt("tempStatus",!i||n.tempC===null?ze("temperature.waiting"):n.stale?ze("state.previous"):n.sensorFresh?n.tempEstimated?o:ze("temperature.valid"):ze("temperature.invalid")),Re("tempValue").closest(".metric").classList.toggle("sample-invalid",!n.sensorFresh),Rt("processValue",s.title),Rt("processDescription",s.description),Rt("sceneSource",ze(xt==="demo"?"view.demoSource":n.mock?"view.mockSource":n.simulation?"view.simulatedSource":"view.realSource")),Re("sceneLiveBadge").className=`live-badge ${xt==="demo"||n.mock?"demo":n.stale?"offline":""}`;let a=xt==="demo"||n.mock?"DEMO":n.stale?"OFFLINE":"LIVE";for(let m of Re("sceneLiveBadge").childNodes)m.nodeType===Node.TEXT_NODE&&(m.textContent=a);Re("sceneWrap").classList.toggle("offline",n.stale),Re("sceneDisconnected").hidden=t,Re("sceneDisconnected").querySelector("strong").textContent=ze(wr?"view.waiting":"view.offline"),Re("sceneDisconnected").querySelector("span").textContent=ze(i?"view.offlineKnown":"view.offlineUnknown"),Rt("lastUpdated",ze(xt==="demo"?"updated.demo":n.ageMs===null?"updated.none":"updated.ago",{seconds:Math.floor((n.ageMs??0)/1e3)})),Rt("firmwareInfo",zd(n.firmware)||"FLOW / 01");let l=Fd(n);Rt("heaterChannel",`CH${l.heat}`),Rt("coolerChannel",`CH${l.cool}`),Rt("stripHeaterChannel",ze("strip.heater",{channel:`CH${l.heat}`})),Rt("stripCoolerChannel",ze("strip.cooler",{channel:`CH${l.cool}`})),Rt("autoDescription",ze(n.automaticMeasurement==="temperature_display"?"temperature.autoDisplayedDescription":"temperature.autoDescription"));let c=By(n);Rt("thermalFlowState",c.title),Rt("thermalFlowNote",c.note),document.querySelector(".thermal-analysis").dataset.phase=c.phase,Hu(Re("lowerInput"),n.lowerCenti===null?null:(n.lowerCenti/100).toFixed(2)),Hu(Re("upperInput"),n.upperCenti===null?null:(n.upperCenti/100).toFixed(2)),Hu(Re("pumpLimit"),n.pumpLimitMs===null?null:Math.round(n.pumpLimitMs/1e3));let u=t&&(xt==="demo"||!!n.session)&&n.outputsKnown&&!r;for(let m of["lowerInput","upperInput","saveRange","pumpLimit","saveLimit","heatToggle","coolToggle","pumpStart","pumpStop"])Re(m).disabled=!u;let f=xt==="demo"||!!n.session,h=go(Mt),d=Nu(n,Mt);Re("autoToggle").disabled=h||(d?!u||!Uu(n):!f),Re("heatToggle").disabled=!u||!Fu("heat",ci()),Re("coolToggle").disabled=!u||!Fu("cool",ci()),Re("pumpStart").disabled=!u||n.pump,Re("pumpStop").disabled=!u||!n.pump,Re("stopAll").disabled=xt==="real"&&(!n.session||$i&&Mt?.action==="stop"||Mt?.action==="stop"),document.querySelector(".control-panel").classList.toggle("busy",r),Re("autoToggle").setAttribute("aria-checked",String(i&&e.active)),Re("autoToggle").setAttribute("aria-busy",String(e.pending)),Re("heatToggle").classList.toggle("active",i&&n.heat),Re("coolToggle").classList.toggle("active",i&&n.cool),Rt("heatValue",ze(n.outputsKnown?n.stale?"state.previous":n.heat?"state.on":"state.off":"sensor.unknown")),Rt("coolValue",ze(n.outputsKnown?n.stale?"state.previous":n.cool?"state.on":"state.off":"sensor.unknown")),Vu("thermalTag",i?n.stale?ze("state.unknown"):e.pending||e.fault?ze(e.key):n.thermal==="HEAT"?"HEAT":n.thermal==="COOL"?"COOL":n.thermal==="HOLD"?"HOLD":ze("state.idle"):ze("state.waitingData"),n.stale?"":e.fault?"error":e.pending?"":n.heat?"heat":n.cool?"cool":e.active?"active":""),Vu("pumpTag",ze(n.outputsKnown?n.stale?"state.unknown":n.pump?"pump.running":n.fault==="PUMP_LIMIT"?"pump.limited":"pump.stopped":"state.waitingData"),t&&n.pump?"active":n.fault==="PUMP_LIMIT"?"error":""),Rt("pumpCurrent",Gd(n.pumpMs)),Rt("pumpTotal",Gd(n.pumpTotalMs));let g=br[n.level];Vu("levelTag",i?n.stale?ze("state.previous"):kd(n.level):ze("state.waitingData"),t&&n.level==="NORMAL"?"active":t&&(n.level==="FULL"||n.level==="LEVEL_ERR")?"error":"");for(let m of document.querySelectorAll("[data-sensor]")){let p=po(n,Number(m.dataset.sensor));m.classList.toggle("wet",i&&p==="\u6E7F\u6001"),m.querySelector(".wet-label").textContent=i?xo(p):"\u2014"}for(let m of document.querySelectorAll("[data-color]"))m.classList.toggle("active",i&&g.color===m.dataset.color);Rt("liquidText",i?n.stale?ze("level.last",{range:Fl(n.level)}):Fl(n.level):ze("level.waiting")),Rt("levelCaption",ze(n.level==="LEVEL_ERR"||n.level==="LEVEL_NC"?"level.unknownCaption":xt==="demo"?"level.demoCaption":"level.realCaption",{range:Fl(n.level)})),Re("demoLevelControls").hidden=xt!=="demo";for(let m of document.querySelectorAll("[data-demo-level]"))m.classList.toggle("active",Number(m.dataset.demoLevel)===n.wetmask);let _={upper:xo(po(n,1)),middle:xo(po(n,2)),lower:xo(po(n,4)),pump:ze(n.pump?"state.running":"state.stopped"),heater:ze(n.heat?"state.on":"state.off"),cooler:ze(n.cool?"state.on":"state.off")};for(let[m,p]of Object.entries(_)){let A=document.querySelector(`[data-label-value="${m}"]`);A.textContent=i?n.stale?ze("state.previous"):p:"\u2014"}for(let[m,p,A]of[["Auto",n.auto,n.auto?"strip.auto":"strip.manual"],["Heat",n.heat,n.heat?"strip.heating":"state.closed"],["Cool",n.cool,n.cool?"strip.cooling":"state.closed"],["Pump",n.pump,n.pump?"strip.dispensing":"pump.stopped"]])Re(`strip${m}`).classList.toggle("active",i&&(m==="Auto"?e.active:p)&&t),Rt(`strip${m}Value`,ze(i?n.stale?"state.unknown":m==="Auto"&&(e.pending||e.fault)?e.key:A:"state.waiting"));Re("ackDot").className=`ack-dot ${r?"pending":wn.kind}`,Rt("ackMessage",r?ze(Mt?.action==="auto"&&n.automaticOwner==="esp32"?"ack.autoPending":"ack.pending",{action:Xd(Mt?.action)}):Zu(wn.message));for(let m of document.querySelectorAll("[data-operation]"))m.classList.toggle("busy",r&&mo(Mt?.action,ci())===m.dataset.operation);Re("motionToggle").setAttribute("aria-pressed",String(_o)),Er&&(Er.update(n),Re("scene").dataset.modelDiagnostics=JSON.stringify(Er.getDiagnostics())),Rt("apInfo",Ol?.wifi?.ap_ssid||"TankLab-ESP32"),Rt("apAddress",`http://${Ol?.wifi?.ap_ip||"192.168.4.1"}/`)}async function $d(n,e={},t=6e3){let i=new AbortController,r=setTimeout(()=>i.abort(),t);try{let s=await fetch(n,{cache:"no-store",...e,signal:i.signal}),o=await s.json();return{response:s,data:o}}finally{clearTimeout(r)}}function Kd(n){let e=Mt;if(!(!e||n?.id!==e.id))if(Mt=null,n.confirmed===!0&&n.accepted===!0&&!n.error){e.action==="range"&&(Re("lowerInput").dataset.dirty="false",Re("upperInput").dataset.dirty="false"),e.action==="pump_limit"&&(Re("pumpLimit").dataset.dirty="false");let t=e.action==="auto"&&ci().automaticOwner==="esp32"?Ln("ack.autoConfirmed"):Gu("ack.confirmed",e.action);wn={kind:"success",message:t},ui(t)}else{let t=n.error?qd(n.error):Ln(n.accepted?"ack.acceptedUnknown":"ack.unconfirmed");wn={kind:"error",message:t},ui(t,!0)}}function Yu(n){if(Ol=n,Wu=performance.now(),yo=!0,wr=!1,Mt?.id!==null&&Mt)if(n.boot_epoch!==Mt.bootEpoch){let e=Ln("ack.sessionChanged");Mt=null,wn={kind:"error",message:e},ui(e,!0)}else!n.pending&&n.last_command?.id===Mt.id?Kd(n.last_command):performance.now()-Mt.started>5500&&(Mt=null,wn={kind:"error",message:Ln("ack.timeout")},ui(wn.message,!0));!Mt&&wn.message.key==="ack.waiting"&&n.online&&!n.stale&&(wn={kind:"success",message:Ln(n.mock?"ack.mockConnected":"ack.connected")}),Hn()}async function vo(){if(xt!=="real"||zu)return;zu=!0;let n=Nl;try{let{response:e,data:t}=await $d("/api/state",{},3200);if(xt!=="real"||n!==Nl)return;if(!e.ok||!t||!Object.hasOwn(t,"online"))throw new Error("invalid_device_state");Yu(t)}catch{xt==="real"&&n===Nl&&(yo=!1,wr=!1,Hn())}finally{zu=!1}}async function Tr(n,e={}){if(xt==="demo"){Ki=Pd(Ki,n,e,performance.now()),n==="range"&&(Re("lowerInput").dataset.dirty="false",Re("upperInput").dataset.dirty="false"),n==="pump_limit"&&(Re("pumpLimit").dataset.dirty="false"),wn={kind:"success",message:Gu("ack.demoUpdated",n)},Hn(),ui(Gu("ack.demoToast",n));return}let t=ci();if(!t.session){ui(Ln("error.noSession"),!0);return}let i=go({action:n,args:e});if(!i&&($i||Mt||t.pending||t.stale)||n==="auto"&&e.enabled&&(!t.outputsKnown||!Uu(t))||Mt?.action==="stop"||n!=="stop"&&i&&go(Mt))return;let r=Mt,s={id:null,action:n,args:e,bootEpoch:t.bootEpoch,started:performance.now()};r&&i&&(r.preempted=!0),Mt=s,$i=s,Hn();try{let{response:o,data:a}=await $d("/api/command",{method:"POST",headers:{"Content-Type":"application/json","X-Tank-UI":Vd},body:JSON.stringify({session:t.session,action:n,...e})});if(Mt!==s)return;if(!o.ok||a.error||a.ok!==!0){let l=a.error?qd(a.error,"error.operation",{status:o.status}):Ln("error.operation",{status:o.status});Mt=null,wn={kind:"error",message:l},ui(l,!0),a.state&&Yu(a.state);return}s.id=a.id,s.bootEpoch=a.state?.boot_epoch??s.bootEpoch,a.state&&Yu(a.state),a.confirmed===!0?Kd(a):a.queued!==!0&&a.accepted!==!0&&(Mt=null,Fy("error",Ln("error.notAccepted"))),await vo()}catch{if(Mt===s){Mt=null,yo=!1;let o=Ln("error.interrupted");wn={kind:"error",message:o},ui(o,!0)}}finally{$i===s&&($i=!1),Hn()}}function $u(n){if(!(xt===n||xt==="real"&&($i||Mt||ci().pending))){xt=n,Nl++,wn={kind:"",message:Ln(n==="demo"?"ack.demoMode":"ack.reading")};for(let e of[Re("lowerInput"),Re("upperInput"),Re("pumpLimit")])e.dataset.dirty="false";n==="demo"?(Ki=Du(),Xu=performance.now()):(yo=!1,wr=!0,vo()),Hn()}}Re("realMode").addEventListener("click",()=>$u("real"));Re("demoMode").addEventListener("click",()=>$u("demo"));Re("tryDemo").addEventListener("click",()=>$u("demo"));Re("languageToggle").addEventListener("click",()=>{Od(ku()==="zh"?"en":"zh"),Zd(),Hn()});for(let n of[Re("lowerInput"),Re("upperInput"),Re("pumpLimit")])n.addEventListener("input",()=>{n.dataset.dirty="true"});Re("saveRange").addEventListener("click",()=>{try{Tr("range",Td(Re("lowerInput").value,Re("upperInput").value))}catch(n){ui(Ln(n.i18nKey||"api.argument",n.i18nParams),!0)}});Re("saveLimit").addEventListener("click",()=>{try{Tr("pump_limit",Ad(Re("pumpLimit").value))}catch(n){ui(Ln(n.i18nKey||"api.argument",n.i18nParams),!0)}});function ky(){return Tr("auto",{enabled:Nu(ci(),Mt)})}Re("autoToggle").addEventListener("click",ky);function Jd(n){let e=Dd(n,ci());Tr(e.action,{enabled:e.enabled})}Re("heatToggle").addEventListener("click",()=>Jd("heat"));Re("coolToggle").addEventListener("click",()=>Jd("cool"));Re("pumpStart").addEventListener("click",()=>Tr("pump",{enabled:!0}));Re("pumpStop").addEventListener("click",()=>Tr("pump",{enabled:!1}));Re("stopAll").addEventListener("click",()=>Tr("stop"));Re("resetView").addEventListener("click",()=>Er?.resetView());Re("motionToggle").addEventListener("click",()=>{_o=!_o,Er?.setReducedMotion(_o),Hn()});for(let n of document.querySelectorAll("[data-demo-level]"))n.addEventListener("click",()=>{xt==="demo"&&(Ki=Cd(Ki,Number(n.dataset.demoLevel),performance.now()),Hn())});Re("networkOpen").addEventListener("click",()=>Re("networkDialog").showModal());Re("networkClose").addEventListener("click",()=>Re("networkDialog").close());Re("networkDone").addEventListener("click",()=>Re("networkDialog").close());Re("networkDialog").addEventListener("click",n=>{if(n.target===Re("networkDialog")){let e=n.target.getBoundingClientRect();(n.clientX<e.left||n.clientX>e.right||n.clientY<e.top||n.clientY>e.bottom)&&n.target.close()}});setInterval(()=>{if(xt==="demo"){let n=performance.now();Ki=Ll(Ki,n,n-Xu),Xu=n}Hn()},250);setInterval(()=>{$i||vo()},700);document.addEventListener("visibilitychange",()=>{!document.hidden&&xt==="real"&&vo()});window.addEventListener("pagehide",n=>{n.persisted||Er?.dispose()});Zd();Hn();vo();
