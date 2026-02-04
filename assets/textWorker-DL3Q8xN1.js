(function(){"use strict";const a=n=>n.split(`
`).map(e=>`-${e}`).join(`
`),p=n=>n.split(`
`).map(e=>`-"${e}"`).join(`
`),c=n=>n.split(`
`).map(e=>`-[${e}]`).join(`
`),u=n=>n.split(`
`).map(e=>`"${e}"`).join(`
`),d=n=>n.split(`
`).map(e=>`[${e}]`).join(`
`),m=n=>n.split(`
`).map(t=>t.toLowerCase()).join(`
`),w=n=>n.split(`
`).map(t=>t.toUpperCase()).join(`
`),f=n=>n.split(`
`).map(e=>e.split(" ").map(o=>{let s="";const i=l=>new RegExp("\\p{L}","u").test(l);for(let l=0;l<o.length;l++)i(s)?s+=o[l]:(s+=o[l].toUpperCase(),console.log(s));return s}).join(" ")).join(`
`),T=(n,t)=>{const{findText:e,replaceText:r}=t;if(!e)return n;try{const o=new RegExp(e,"gm");return n.replace(o,r)}catch{return n.replaceAll(e,r)}},x=n=>n.split(`
`).map(t=>t.split(" ").map(r=>`+${r}`).join(" ")).join(`
`),j=n=>n.split(`
`).map(e=>{console.log(e);const r=e.split("-");return console.log(r),r[0]}).join(`
`),g=n=>n.split(`
`).map(e=>e.split(" ").map(o=>{let s="";console.log(o);for(let i=0;i<o.length;i++)o[0]==="+"&&i===0||(s+=o[i]);return s}).join(" ")).join(`
`),S=n=>n.split(`
`).map(e=>e.split(/\s+/).map(o=>o.trim()).join(" ")).join(`
`),L=n=>n.split(`
`).map(e=>e.split(" ").map(o=>o.replace(/[()\\~!@#$%^&*_=+[\]{}|;'":,/<>?`]/g,"")).join(" ")).join(`
`),P=n=>n.split(`
`).map(e=>e.split(" ").map(o=>{console.log(o);let s="";for(let i=0;i<o.length;i++)o[i]===" "?s+="_":s+=o[i];return s}).join("_")).join(`
`),h=n=>n.split(`
`).map(e=>e.split(" ").map(o=>o.replace(/[()\\~!@#$%^&*_=+[\]{}|;'":,/<>?`]/g," ")).join(" ")).join(`
`);self.onmessage=n=>{const{action:t,text:e}=n.data,{params:r}=n.data,o=performance.now();let s=e;t==="replaceLogic"&&r&&(s=T(e,r)),t==="allLettersToUpperCase"&&(s=w(e)),t==="allLettersToLowerCase"&&(s=m(e)),t==="firstLetterBig"&&(s=f(e)),t==="plusBeforeWord"&&(s=x(e)),t==="removePlusBeforeWord"&&(s=g(e)),t==="addQoutes"&&(s=u(e)),t==="addSquads"&&(s=d(e)),t==="addMinus"&&(s=a(e)),t==="addMinusAndSqauds"&&(s=c(e)),t==="addMinusAndQuotes"&&(s=p(e)),t==="removeSpace"&&(s=S(e)),t==="removePartPhrase"&&(s=j(e)),t==="replaceProbils"&&(s=P(e)),t==="removesSpecialSymbols"&&(s=L(e)),t==="exchangeSpecialSymbolsOnProbils"&&(s=h(e));const i=performance.now();self.postMessage({result:s,duration:i-o})}})();
