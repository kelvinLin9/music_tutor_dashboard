/* empty css                                                */import{_ as f,x as v,z as h,a as g,c as u,b as s,n as m,F as k,k as b,t as _}from"./index-Cz0Ne3-w.js";const x={class:"pagination"},C=["onClick"],B={__name:"Pagination",props:{totalPages:Number,initialPage:Number},emits:["page-changed"],setup(o,{emit:p}){const n=o,t=v(n.initialPage||1),d=h(()=>{const a=[];let e=Math.max(t.value-2,1),l=Math.min(t.value+2,n.totalPages);e>1&&(a.push(1),e>2&&a.push("..."));for(let c=e;c<=l;c++)a.push(c);return l<n.totalPages&&(l<n.totalPages-1&&a.push("..."),a.push(n.totalPages)),a}),P=p,r=i=>{i!=="..."&&(t.value=i,P("page-changed",i))};return(i,a)=>(g(),u("nav",null,[s("ul",x,[s("li",{class:m(["page-item",{disabled:t.value===1}])},[s("a",{class:"page-link",href:"#",onClick:a[0]||(a[0]=e=>r(1))},"«")],2),(g(!0),u(k,null,b(d.value,e=>(g(),u("li",{class:m(["page-item",{active:t.value===e}]),key:e},[s("a",{class:"page-link",href:"#",onClick:l=>r(e)},_(e),9,C)],2))),128)),s("li",{class:m(["page-item",{disabled:t.value===o.totalPages}])},[s("a",{class:"page-link",href:"#",onClick:a[1]||(a[1]=e=>r(o.totalPages))},"»")],2)])]))}},y=f(B,[["__scopeId","data-v-04b49b40"]]);export{y as P};
