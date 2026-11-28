var e=e=>e;function t(e){let t=e-1;return t*t*t+1}function n(t,{delay:n=0,duration:r=400,easing:i=e}={}){let a=+getComputedStyle(t).opacity;return{delay:n,duration:r,easing:i,css:e=>`opacity: ${e*a}`}}function r(e,{delay:n=0,duration:r=400,easing:i=t,start:a=0,opacity:o=0}={}){let s=getComputedStyle(e),c=+s.opacity,l=s.transform===`none`?``:s.transform,u=1-a,d=c*(1-o);return{delay:n,duration:r,easing:i,css:(e,t)=>`
			transform: ${l} scale(${1-u*t});
			opacity: ${c-d*t}
		`}}function i(e,t){for(let n in t)e[n]=t[n];return e}function a({fallback:e,...n}){let r=new Map,a=new Map;function o(e,r,a){let{delay:o=0,duration:s=e=>Math.sqrt(e)*30,easing:c=t}=i(i({},n),a),l=e.getBoundingClientRect(),u=r.getBoundingClientRect(),d=l.left-u.left,f=l.top-u.top,p=l.width/u.width,m=l.height/u.height,h=Math.sqrt(d*d+f*f),g=getComputedStyle(r),_=g.transform===`none`?``:g.transform,v=+g.opacity;return{delay:o,duration:typeof s==`function`?s(h):s,easing:c,css:(e,t)=>`
			   opacity: ${e*v};
			   transform-origin: top left;
			   transform: ${_} translate(${t*d}px,${t*f}px) scale(${e+(1-e)*p}, ${e+(1-e)*m});
		   `}}function s(t,n,r){return(i,a)=>(t.set(a.key,i),()=>{if(n.has(a.key)){let e=n.get(a.key);return n.delete(a.key),o(e,i,a)}return t.delete(a.key),e&&e(i,a,r)})}return[s(a,r,!1),s(r,a,!0)]}export{n,r,a as t};