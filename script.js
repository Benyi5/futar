// ize 
const backendurl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("get").addEventListener("click",async function(){
        fetch(backendurl)
        .then(response => response.json())
        .then(data => Datafutar(data));
    });
    document.getElementById("update").addEventListener("click", async function(){
        
        let id = document.getElementById("fazon").value;
        let nev = document.getElementById("fnev").value;
        let tel = document.getElementById("ftel").value;
        
        let futar = {id:id, nev:nev, tel:tel,};
        
        let modositurl = backendurl + "/" + id;
        
        let myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        
        let response = await fetch(modositurl, {
            method : "PUT",
            headers: myHeader,
            body: JSON.stringify(futar)
        })
       
        console.log(response);
         if(response.ok){
            alert("Sikeres volt");
        }
        else{
            alert("Sikertelen volt");
        }
    })
});

function Datafutar(data){
    let szoveg = "";
    for(let i=0; i<data.length; i++){
        szoveg += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${data[i].id}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${data[i].nev}</h6>
    <p class="card-text">${data[i].tel}</p>
    <a class="btn btn-primary" onclick="Modositas(${data[i].id})">Update</a>
    <a class="btn btn-primary">Delete</a>
  </div>
</div>`
    }
    document.getElementById("card").innerHTML = szoveg;
};

function Modositas(id){
    fetch(backendurl + "/" + id)
    .then(response => response.json())
    .then(data =>{
        document.getElementById("id").value = data.id;
        document.getElementById("nev").value = data.nev;
        document.getElementById("tel").value = data.tel;
    })
}