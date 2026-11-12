import{_ as e,a as t,i as n,m as r,o as i,r as a,t as o}from"./index-Yuo5gZEv.js";import{Q as s,b as c,c as l,d as u,mt as d}from"./three.module-D7cGGTLk.js";import{n as f,t as p}from"./react-three-fiber.esm-Bvin3ivR.js";var m=e(r(),1),h=n(),g=`
  uniform float uTime;
  uniform vec2  uMouse;
  varying float vAlpha;

  void main() {
    // onda base ambientale molto sottile
    float base =
      sin(position.x * 0.5 + uTime * 0.2) *
      sin(position.y * 0.4 + uTime * 0.15) * 0.06;

    // bending gravitazionale: pozzo gaussiano centrato sul cursore
    vec2  toMouse = uMouse - position.xy;
    float distSq  = dot(toMouse, toMouse);
    float well    = exp(-distSq * 0.18) * 0.22;

    // convergenza XY verso il cursore (lensing delle linee)
    vec2 lensXY = normalize(toMouse + vec2(0.0001)) * exp(-distSq * 0.25) * 0.04;

    float elevation = base - well;

    // alpha basata sulla distanza
    float dist  = sqrt(distSq);
    float alpha = 1.0 - smoothstep(0.0, 3.8, dist);
    alpha = max(alpha, (1.0 - smoothstep(3.8, 5.5, dist)) * 0.05);
    vAlpha = alpha;

    gl_Position = projectionMatrix * modelViewMatrix *
                  vec4(position.x + lensXY.x, position.y + lensXY.y, position.z + elevation, 1.0);
  }
`,_=`
  uniform vec3 uColor;
  uniform float uAlpha;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(uColor, vAlpha * uAlpha);
  }
`;function v(e,t,n){let r=e/n,i=r*Math.sqrt(3)/2,a=Math.ceil(t/i)+1,o=n+1,s=[];for(let o=0;o<=a;o++){let a=o%2==1?r*.5:0;for(let c=0;c<=n;c++)s.push(-e*.5+c*r+a,-t*.5+o*i,0)}let u=[];for(let e=0;e<a;e++){let t=e%2==0;for(let r=0;r<n;r++){let n=e*o+r,i=n+1,a=(e+1)*o+r,s=a+1;t?u.push(n,i,a,i,s,a):u.push(n,s,a,n,i,s)}}let d=new l;return d.setAttribute(`position`,new c(new Float32Array(s),3)),d.setIndex(u),d}function y({containerRef:e}){let n=(0,m.useRef)(),r=(0,m.useRef)(),c=(0,m.useRef)(new d(0,0)),l=(0,m.useRef)(new d(0,0)),p=(0,m.useRef)(new d(0,0)),y=(0,m.useMemo)(()=>new s,[]),b=(0,m.useMemo)(()=>v(24,16,80),[]);(0,m.useEffect)(()=>{if(a)return;let t=0,n=0,r=()=>{if(!e.current)return;let r=e.current.getBoundingClientRect();c.current.set((t-r.left)/r.width*2-1,(n-r.top)/r.height*-2+1)},i=e=>{t=e.clientX,n=e.clientY,r()},o=()=>r();return window.addEventListener(`mousemove`,i,{passive:!0}),window.addEventListener(`scroll`,o,{passive:!0}),()=>{window.removeEventListener(`mousemove`,i),window.removeEventListener(`scroll`,o)}},[e]);let x=(0,m.useMemo)(()=>({uTime:{value:0},uMouse:{value:new d(0,0)},uColor:{value:new u(i.dark.accent)},uAlpha:{value:i.dark.waveAlpha}}),[]),[S]=t();return(0,m.useEffect)(()=>{let e=i[S];x.uColor.value.set(e.accent),x.uAlpha.value=e.waveAlpha},[S,x]),f((e,t)=>{if(x.uTime.value+=t*.7,a){let e=x.uTime.value;p.current.set(Math.sin(e*.28)*5,Math.sin(e*.19+1.1)*3)}else if(y.setFromCamera(c.current,e.camera),r.current){let e=y.intersectObject(r.current);if(e.length>0){let t=r.current.worldToLocal(e[0].point.clone());p.current.set(t.x,t.y)}}l.current.lerp(p.current,a?.04:.18),x.uMouse.value.copy(l.current),a&&n.current&&(n.current.rotation.y+=(o.x*.12-n.current.rotation.y)*.05,n.current.rotation.x+=(-o.y*.08-n.current.rotation.x)*.05)}),(0,h.jsx)(`group`,{ref:n,children:(0,h.jsx)(`mesh`,{ref:r,geometry:b,rotation:[-Math.PI*.2,0,0],position:[0,0,-1],children:(0,h.jsx)(`shaderMaterial`,{vertexShader:g,fragmentShader:_,uniforms:x,transparent:!0,wireframe:!0,depthWrite:!1,side:2})})})}function b(){let e=(0,m.useRef)();return(0,h.jsx)(`div`,{ref:e,style:{position:`absolute`,inset:0,zIndex:0,pointerEvents:`none`,maskImage:`linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)`,WebkitMaskImage:`linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)`,filter:`blur(1.5px)`},children:(0,h.jsx)(p,{camera:{position:[0,0,5],fov:50},gl:{antialias:!1,alpha:!0},dpr:Math.min(window.devicePixelRatio,1.5),style:{background:`transparent`},children:(0,h.jsx)(y,{containerRef:e})})})}export{b as default};