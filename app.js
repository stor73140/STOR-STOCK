const API_URL="https://script.google.com/macros/s/AKfycbzsaPD-DCytkzBtx2WYlwMMEYbmWoWR6qKJRPNBQTqVxQQuOLVudmfMbdEFKE-jX2nY/exec"

let currentUser=""
let currentStock=""

async function login(){

let login=document.getElementById("loginUser").value
let password=document.getElementById("loginPass").value

let r=await fetch(API_URL,{
method:"POST",
body:JSON.stringify({
action:"login",
login:login,
password:password
})
})

let data=await r.json()

if(data.status=="success"){

currentUser=login

loginPage.classList.add("hidden")
menuPage.classList.remove("hidden")

loadEmplacements()

}else{

alert("Login incorrect")

}

}

async function loadEmplacements(){

let r=await fetch(API_URL,{
method:"POST",
body:JSON.stringify({action:"getEmplacements"})
})

let data=await r.json()

let select=document.getElementById("emplacement")

select.innerHTML=""

data.forEach(e=>{

select.innerHTML+=`<option>${e[0]}</option>`

})

}

function openStock(stock){

currentStock=stock

menuPage.classList.add("hidden")
stockPage.classList.remove("hidden")

stockTitle.innerText=stock

loadStock()

}

function backMenu(){

stockPage.classList.add("hidden")
menuPage.classList.remove("hidden")

}

async function loadStock(){

let r=await fetch(API_URL,{
method:"POST",
body:JSON.stringify({
action:"getStock",
stock:currentStock
})
})

let data=await r.json()

let table=document.getElementById("tableStock")

table.innerHTML=""

data.forEach(p=>{

table.innerHTML+=`

<tr>

<td>${p[1]}</td>

<td>

<button onclick="update('${p[1]}',1)">+</button>

${p[2]}

<button onclick="update('${p[1]}',-1)">-</button>

</td>

<td>${p[3]}</td>

<td>

<button onclick="deletePiece('${p[1]}')">🗑</button>

</td>

</tr>

`

})

}

async function update(designation,qte){

let emplacement=document.getElementById("emplacement").value

await fetch(API_URL,{
method:"POST",
body:JSON.stringify({
action:"updateStock",
stock:currentStock,
designation:designation,
quantite:qte,
emplacement:emplacement,
user:currentUser
})
})

loadStock()

}

async function deletePiece(designation){

let emplacement=document.getElementById("emplacement").value

await fetch(API_URL,{
method:"POST",
body:JSON.stringify({
action:"deletePiece",
stock:currentStock,
designation:designation,
emplacement:emplacement
})
})

loadStock()

}
