import{c as e,d as t,n,r,t as i}from"./index-HFjk8lF1.js";import{B as a,M as o,l as s}from"./three.module-lpaiS__6.js";import{n as c,t as l}from"./react-three-fiber.esm-BM-LZR_v.js";var u=t(e(),1),d=r(),f=`
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
`,p=`
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(uColor, vAlpha * 0.13);
  }
`;function m({containerRef:e}){let t=(0,u.useRef)(),r=(0,u.useRef)(),l=(0,u.useRef)(new a(0,0)),m=(0,u.useRef)(new a(0,0)),h=(0,u.useRef)(new a(0,0)),g=(0,u.useMemo)(()=>new o,[]);(0,u.useEffect)(()=>{if(n)return;let t=0,r=0,i=()=>{if(!e.current)return;let n=e.current.getBoundingClientRect();l.current.set((t-n.left)/n.width*2-1,(r-n.top)/n.height*-2+1)},a=e=>{t=e.clientX,r=e.clientY,i()},o=()=>i();return window.addEventListener(`mousemove`,a,{passive:!0}),window.addEventListener(`scroll`,o,{passive:!0}),()=>{window.removeEventListener(`mousemove`,a),window.removeEventListener(`scroll`,o)}},[e]);let _=(0,u.useMemo)(()=>({uTime:{value:0},uMouse:{value:new a(0,0)},uColor:{value:new s(`#00F5FF`)}}),[]);return c((e,a)=>{if(_.uTime.value+=a*.7,n){let e=_.uTime.value;h.current.set(Math.sin(e*.28)*5,Math.sin(e*.19+1.1)*3)}else if(g.setFromCamera(l.current,e.camera),r.current){let e=g.intersectObject(r.current);if(e.length>0){let t=r.current.worldToLocal(e[0].point.clone());h.current.set(t.x,t.y)}}m.current.lerp(h.current,n?.04:.18),_.uMouse.value.copy(m.current),n&&t.current&&(t.current.rotation.y+=(i.x*.12-t.current.rotation.y)*.05,t.current.rotation.x+=(-i.y*.08-t.current.rotation.x)*.05)}),(0,d.jsx)(`group`,{ref:t,children:(0,d.jsxs)(`mesh`,{ref:r,rotation:[-Math.PI*.2,0,0],position:[0,0,-1],children:[(0,d.jsx)(`planeGeometry`,{args:[24,16,60,40]}),(0,d.jsx)(`shaderMaterial`,{vertexShader:f,fragmentShader:p,uniforms:_,transparent:!0,wireframe:!0,depthWrite:!1,side:2})]})})}function h(){let e=(0,u.useRef)();return(0,d.jsx)(`div`,{ref:e,style:{position:`absolute`,inset:0,zIndex:0,pointerEvents:`none`,maskImage:`linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)`,WebkitMaskImage:`linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)`,filter:`blur(1.5px)`},children:(0,d.jsx)(l,{camera:{position:[0,0,5],fov:50},gl:{antialias:!1,alpha:!0},dpr:Math.min(window.devicePixelRatio,1.5),style:{background:`transparent`},children:(0,d.jsx)(m,{containerRef:e})})})}export{h as default};