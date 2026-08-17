const CONFIG={googleSheetsWebAppUrl:"https://script.google.com/macros/s/AKfycbzSHllw1OUQbQmgQdAhQFkApA6BZWyR5_o2JTEQ3C3Rw_2DIh-9MeQMIdqzn7o4qRwU/exec"};
const PRODUCTS_LIST=Array.isArray(window.PRODUCTS)?window.PRODUCTS:[];
console.log('MK Crackers products loaded:', PRODUCTS_LIST.length);
let cart=JSON.parse(localStorage.getItem("mkCart")||"[]");
const $=s=>document.querySelector(s);
const money=n=>Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2});
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const actualPrice=p=>p.actualPrice ?? p.mrp ?? null;

function save(){localStorage.setItem("mkCart",JSON.stringify(cart))}
function qty(id){const x=cart.find(i=>String(i.id)===String(id));return x?x.qty:0}
function setQty(id,n){
 n=Math.max(0,parseInt(n,10)||0);
 const p=PRODUCTS_LIST.find(x=>String(x.id)===String(id)); if(!p)return;
 const x=cart.find(i=>String(i.id)===String(id));
 if(n===0) cart=cart.filter(i=>String(i.id)!==String(id));
 else if(x)x.qty=n;
 else cart.push({id:p.id,name:p.name,content:p.content||"",price:Number(p.price)||0,qty:n});
 save(); render();
}
function totals(){return {qty:cart.reduce((a,x)=>a+x.qty,0),amount:cart.reduce((a,x)=>a+x.qty*x.price,0)}}

const cats=[...new Set(PRODUCTS_LIST.map(p=>p.categoryLabel||"Other"))];
$("#category").insertAdjacentHTML("beforeend",cats.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join(""));

function normalize(v){return String(v||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}
function matches(p,q){
 const needle=normalize(q);
 if(!needle)return true;
 return [p.name,p.categoryLabel,p.content].some(v=>normalize(v).includes(needle));
}

function filtered(){
 const q=$("#search").value.trim(), cat=$("#category").value, sort=$("#sort").value;
 let a=PRODUCTS_LIST.filter(p=>(cat==="all"||p.categoryLabel===cat)&&matches(p,q));
 if(sort==="az")a.sort((x,y)=>x.name.localeCompare(y.name));
 if(sort==="low")a.sort((x,y)=>x.price-y.price);
 if(sort==="high")a.sort((x,y)=>y.price-x.price);
 return a;
}

function productRow(p){
 const q=qty(p.id), line=(Number(p.price)||0)*q, ap=actualPrice(p);
 return `<div class="product-row">
   <div class="prod-img">${esc(p.icon||"🎆")}</div>
   <div class="prod-name"><b>${esc(p.name)}</b><small>${esc(p.categoryLabel||"")}</small></div>
   <div class="content">${esc(p.content||"—")}</div>
   <div class="actual">${ap?`<s>₹${money(ap)}</s>`:"—"}</div>
   <div class="price">₹${money(p.price)}</div>
   <div class="qty-control">
     <button data-minus="${p.id}" type="button">−</button>
     <input data-qty="${p.id}" type="number" min="0" value="${q}" aria-label="Quantity for ${esc(p.name)}">
     <button data-plus="${p.id}" type="button">+</button>
   </div>
   <div class="line-total">₹${money(line)}</div>
 </div>`;
}

function renderList(){
 const a=filtered(), q=$("#search").value.trim();
 const err=$("#dataError");
 if(err) err.style.display=PRODUCTS_LIST.length?"none":"block";
 $("#resultCount").textContent=`Showing ${a.length} of ${PRODUCTS_LIST.length} crackers${q?` for “${q}”`:""}`;
 if(!a.length){$("#productList").innerHTML=`<div class="no-results">No crackers found. Try another name.</div>`;return}

 const selectedCat=$("#category").value;
 if(selectedCat!=="all"){
   $("#productList").innerHTML=`<div class="category-head">${esc(selectedCat)} <span>${a.length} products</span></div>${a.map(productRow).join("")}`;
 }else{
   const groups={};
   a.forEach(p=>(groups[p.categoryLabel||"Other"]??=[]).push(p));
   $("#productList").innerHTML=Object.entries(groups).map(([cat,items])=>`
     <div class="category-head">${esc(cat)} <span>${items.length} products</span></div>
     ${items.map(productRow).join("")}
   `).join("");
 }
}

function renderCart(){
 const t=totals();
 $("#navCount").textContent=t.qty;$("#floatCount").textContent=t.qty;$("#floatTotal").textContent=money(t.amount);
 $("#totalQty").textContent=t.qty;$("#grandTotal").textContent=money(t.amount);$("#cartSummary").textContent=`${t.qty} quantity • ₹${money(t.amount)}`;
 $("#emptyCart").style.display=cart.length?"none":"flex";
 $("#cartItems").innerHTML=cart.map(x=>`<div class="cart-row">
   <div><b>${esc(x.name)}</b><small>${esc(x.content)} • ₹${money(x.price)}</small></div>
   <div class="qty-control"><button data-cminus="${x.id}" type="button">−</button><input data-cqty="${x.id}" type="number" min="0" value="${x.qty}"><button data-cplus="${x.id}" type="button">+</button></div>
   <strong>₹${money(x.price*x.qty)}</strong><button data-remove="${x.id}" class="remove" type="button">×</button>
 </div>`).join("");
}

function render(){renderList();renderCart()}

$("#productList").addEventListener("click",e=>{
 const plus=e.target.dataset.plus,minus=e.target.dataset.minus;
 if(plus)setQty(plus,qty(plus)+1);
 if(minus)setQty(minus,qty(minus)-1);
});
$("#productList").addEventListener("change",e=>{if(e.target.dataset.qty)setQty(e.target.dataset.qty,e.target.value)});
$("#cartItems").addEventListener("click",e=>{
 const id=e.target.dataset.cplus??e.target.dataset.cminus??e.target.dataset.remove;if(id===undefined)return;
 if(e.target.dataset.cplus!==undefined)setQty(id,qty(id)+1);
 else if(e.target.dataset.cminus!==undefined)setQty(id,qty(id)-1);
 else setQty(id,0);
});
$("#cartItems").addEventListener("change",e=>{if(e.target.dataset.cqty)setQty(e.target.dataset.cqty,e.target.value)});
$("#search").addEventListener("input",renderList);
$("#category").addEventListener("change",renderList);
$("#sort").addEventListener("change",renderList);
$("#clearSearch").onclick=()=>{$("#search").value="";$("#category").value="all";$("#sort").value="default";renderList()};
$("#menuBtn").onclick=()=>document.querySelector("nav").classList.toggle("show");

$("#enquiryForm").onsubmit=e=>{
 e.preventDefault();
 if(!cart.length){$("#result").textContent="Please select at least one cracker.";return}
 if(CONFIG.googleSheetsWebAppUrl.includes("PASTE_GOOGLE")){$("#result").textContent="Please connect your Google Apps Script Web App URL in app.js first.";return}
 const t=totals(),d=Object.fromEntries(new FormData(e.target));
 d.enquiryId="MK-"+Date.now();d.receivedAt=new Date().toISOString();d.products=JSON.stringify(cart);d.totalQuantity=t.qty;d.totalAmount=t.amount;
 const f=document.createElement("form");f.method="POST";f.action=CONFIG.googleSheetsWebAppUrl;f.target="mkFrame";f.style.display="none";
 Object.entries(d).forEach(([k,v])=>{const i=document.createElement("input");i.name=k;i.value=v;f.appendChild(i)});
 const frame=document.createElement("iframe");frame.name="mkFrame";frame.style.display="none";document.body.appendChild(frame);document.body.appendChild(f);f.submit();
 $("#result").textContent=`Enquiry submitted successfully. ID: ${d.enquiryId}. Total: ₹${money(t.amount)}. MK Crackers will call you.`;
 cart=[];save();render();e.target.reset();
};

render();
