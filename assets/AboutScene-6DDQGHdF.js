import{i as e,p as t,r as n,t as r,u as i}from"./index-CQXTjY0a.js";import{Q as a,b as o,c as s,d as c,mt as l}from"./three.module-CprsFo9L.js";import{n as u,t as d}from"./react-three-fiber.esm-DsyzdaEO.js";var f=t(i(),1),p=e(),m=`
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
`,h=`
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(uColor, vAlpha * 0.13);
  }
`;function g(e,t,n){let r=e/n,i=r*Math.sqrt(3)/2,a=Math.ceil(t/i)+1,c=n+1,l=[];for(let o=0;o<=a;o++){let a=o%2==1?r*.5:0;for(let s=0;s<=n;s++)l.push(-e*.5+s*r+a,-t*.5+o*i,0)}let u=[];for(let e=0;e<a;e++){let t=e%2==0;for(let r=0;r<n;r++){let n=e*c+r,i=n+1,a=(e+1)*c+r,o=a+1;t?u.push(n,i,a,i,o,a):u.push(n,o,a,n,i,o)}}let d=new s;return d.setAttribute(`position`,new o(new Float32Array(l),3)),d.setIndex(u),d}function _({containerRef:e}){let t=(0,f.useRef)(),i=(0,f.useRef)(),o=(0,f.useRef)(new l(0,0)),s=(0,f.useRef)(new l(0,0)),d=(0,f.useRef)(new l(0,0)),_=(0,f.useMemo)(()=>new a,[]),v=(0,f.useMemo)(()=>g(24,16,80),[]);(0,f.useEffect)(()=>{if(n)return;let t=0,r=0,i=()=>{if(!e.current)return;let n=e.current.getBoundingClientRect();o.current.set((t-n.left)/n.width*2-1,(r-n.top)/n.height*-2+1)},a=e=>{t=e.clientX,r=e.clientY,i()},s=()=>i();return window.addEventListener(`mousemove`,a,{passive:!0}),window.addEventListener(`scroll`,s,{passive:!0}),()=>{window.removeEventListener(`mousemove`,a),window.removeEventListener(`scroll`,s)}},[e]);let y=(0,f.useMemo)(()=>({uTime:{value:0},uMouse:{value:new l(0,0)},uColor:{value:new c(`#00F5FF`)}}),[]);return u((e,a)=>{if(y.uTime.value+=a*.7,n){let e=y.uTime.value;d.current.set(Math.sin(e*.28)*5,Math.sin(e*.19+1.1)*3)}else if(_.setFromCamera(o.current,e.camera),i.current){let e=_.intersectObject(i.current);if(e.length>0){let t=i.current.worldToLocal(e[0].point.clone());d.current.set(t.x,t.y)}}s.current.lerp(d.current,n?.04:.18),y.uMouse.value.copy(s.current),n&&t.current&&(t.current.rotation.y+=(r.x*.12-t.current.rotation.y)*.05,t.current.rotation.x+=(-r.y*.08-t.current.rotation.x)*.05)}),(0,p.jsx)(`group`,{ref:t,children:(0,p.jsx)(`mesh`,{ref:i,geometry:v,rotation:[-Math.PI*.2,0,0],position:[0,0,-1],children:(0,p.jsx)(`shaderMaterial`,{vertexShader:m,fragmentShader:h,uniforms:y,transparent:!0,wireframe:!0,depthWrite:!1,side:2})})})}function v(){let e=(0,f.useRef)();return(0,p.jsx)(`div`,{ref:e,style:{position:`absolute`,inset:0,zIndex:0,pointerEvents:`none`,maskImage:`linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)`,WebkitMaskImage:`linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)`,filter:`blur(1.5px)`},children:(0,p.jsx)(d,{camera:{position:[0,0,5],fov:50},gl:{antialias:!1,alpha:!0},dpr:Math.min(window.devicePixelRatio,1.5),style:{background:`transparent`},children:(0,p.jsx)(_,{containerRef:e})})})}export{v as default};