export function deg2rad(d){return d*Math.PI/180}
export function rad2deg(r){return r*180/Math.PI}
export function reflectionAngle(iDeg){return iDeg}
export function snell(n1,n2,iDeg){
  const i=deg2rad(iDeg); const ratio=n1/n2; const s=ratio*Math.sin(i);
  if(Math.abs(s)>1) return {tir:true,rDeg:null};
  const r=Math.asin(s); return {tir:false,rDeg:rad2deg(r)};
}
export function lensImage(u,f){
  if(u===f) return {v:Infinity,m:Infinity}
  const v=1/(1/f-1/u); const m=v/u; return {v,m}
}