import{r,f as j,b as v,g as E,y as i,j as e}from"./index-Bz-0BNJm.js";import{u as S,c as y,a as u}from"./index.esm-BZTI_HgX.js";import{h as f}from"./handleClasses-CCufdhkX.js";const F=()=>{const[a,t]=r.useState(!1),[p,{isSuccess:o,isError:l,error:n,isLoading:h}]=j(),x=v(),[g,{isSuccess:c,isError:d,error:N,isLoading:b}]=E(),s=S({initialValues:{userName:"",otp:""},validationSchema:y({userName:u().required(),otp:u()}),onSubmit:(m,{resetForm:L})=>{a?p(m):g(m)}});return r.useEffect(()=>{c&&(s.setFieldValue("otp",""),t(!0),i.success("please verify otp"))},[c]),r.useEffect(()=>{d&&i.error(N.message)},[d]),r.useEffect(()=>{o&&x("/user-dashboard")},[o]),r.useEffect(()=>{l&&(t(!1),i.error(n.data?n.data.message:"sosmething went wrong"))},[l]),b||h?e.jsx("p",{children:"Please Wait ...."}):e.jsx(e.Fragment,{children:e.jsx("form",{onSubmit:s.handleSubmit,children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-sm-6 offset-sm-3",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:"User Login"}),e.jsxs("div",{className:"card-body",children:[a?e.jsxs("div",{children:[e.jsx("label",{for:"otp",className:"form-label",children:"Enter Otp"}),e.jsx("input",{type:"text",...s.getFieldProps("otp"),className:f(s,"otp"),id:"otp",placeholder:"Enter Your otp"}),e.jsx("div",{className:"valid-feedback",children:"Looks good!"}),e.jsx("div",{className:"invalid-feedback",children:s.errors.otp})]}):e.jsxs("div",{children:[e.jsx("label",{for:"email",className:"form-label",children:"Enter Email Or Mobile Number"}),e.jsx("input",{type:"text",...s.getFieldProps("userName"),className:f(s,"userName"),id:"email",placeholder:"Enter Your Email Or Mobile Number"}),e.jsx("div",{className:"valid-feedback",children:"Looks good!"}),e.jsx("div",{className:"invalid-feedback",children:s.errors.userName})]}),e.jsx("button",{type:"submit",className:"btn btn-primary w-100 mt-3",children:a?"Verify OTP":"Login"})]})]})})})})})})};export{F as default};
