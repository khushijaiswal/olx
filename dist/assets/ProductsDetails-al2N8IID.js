import{l,m as d,r as t,n as o,b as h,j as s}from"./index-Bz-0BNJm.js";import{c as x}from"./createLucideIcon-h1ra5nYP.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],j=x("ArrowLeft",m);function g(){const{pid:r}=l(),{data:e}=d(r),[n,c]=t.useState();o();const i=h();return t.useEffect(()=>{e&&c(e.productImg[0])},[e]),s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"min-h-screen bg-gray-50 ",children:s.jsx("nav",{className:"bg-white shadow-sm",children:s.jsxs("div",{className:"max-w-7xl mx-auto px-4 py-4 flex items-center",children:[s.jsx("button",{className:"text-gray-600 hover:text-gray-900",children:s.jsx(j,{className:"w-6 h-6"})}),s.jsx("h1",{className:"ml-4 text-lg font-semibold",children:"Product Details"})]})})}),e&&s.jsxs("div",{className:"d-flex justify-content-between container-fluid",children:[s.jsxs("div",{className:"p-5",children:[s.jsx("p",{children:"Traval / Bag"}),s.jsx("h3",{children:e.name}),s.jsxs("div",{className:"d-flex justify ",children:[s.jsxs("p",{className:"me-3",children:[e.price," | "]}),s.jsx("p",{children:"1640 reviews "})]}),s.jsx("p",{children:e.description}),s.jsx("h5",{children:"Size"}),s.jsxs("div",{className:"d-flex",children:[s.jsxs("div",{className:"border rounded-2 me-4 p-2",children:[s.jsx("h5",{children:"18L"}),s.jsxs("p",{children:["Perfect for a reasonable amount ",s.jsx("br",{})," of snack"]})]}),s.jsxs("div",{className:"border rounded-2 p-2",children:[s.jsx("h5",{children:"20 L"}),s.jsxs("p",{children:["Enough room for a serious  amount of ",s.jsx("br",{})," snacks"]})]})]}),s.jsx("button",{className:"btn btn-secondary w-100 mt-3",onClick:()=>{i(`/user-ChatWithOwner/${r}`)},children:"Chat with Owner"})]}),s.jsxs("div",{children:[s.jsx("div",{className:"container p-5",children:s.jsx("img",{src:n,height:500,alt:""})}),s.jsx("div",{className:"container p-5 d-flex gap-3",children:e.productImg.map(a=>s.jsx("img",{onClick:u=>c(a),src:a,height:100},a))})]})]})]})}export{g as default};
