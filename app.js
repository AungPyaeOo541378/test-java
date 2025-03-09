var data = fetch("https://fakestoreapi.com/products");

fetch("https://fakestoreapi.com/products") //step 1 fetch data api calling
  .then((response) => response.json()) // convert json
  .then((data) => productInsert(data)) // call function
  .catch((error) => {
    console.error("Error loading the products:", error);
    document.getElementById("product-list").innerHTML =
      "<p>Failed to load products.</p>";
  });

function productInsert(data) {
  const productListContainer = document.querySelector("#product-list"); // step 1 select from html with id
  for (let i = 0; i < data.length; i++) {
    const productCard = document.createElement("div"); // inject div to html
    productCard.classList.add("card"); // add class to div
  
    productCard.innerHTML = `
    <img class="img-size"  src="${data[i].image}">
    <h3 class="text-break text-overflow">${data[i].title}</h3>
    <p>price : ${data[i].price} yen</p>
    <button data-bs-toggle="modal" data-bs-target="#exampleModal${data[i].id}" style="cursor: pointer; " class="btn btn-warning"> See Detail</button>


<!-- Modal -->
<div class="modal fade" id="exampleModal${data[i].id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${data[i].title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img class="img-size"  src="${data[i].image}"><br>
        ${data[i].description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    `;
    productListContainer.appendChild(productCard);
  }
}
var btn = document.querySelector("#button");
 btn.addEventListener("click",function(){
  var body = document.querySelector("#main-body");
  var hello = document.querySelector("#hello");
  body.classList.toggle("dark-mode");
  hello.classList.toggle("hello");
  
 if (body.classList.contains("dark-mode")){
  console.log("if stage ")
  btn.classList.remove("btn-success");
  btn.classList.add("btn-light");
 }else{
  console.log("else stage ")
  btn.classList.add("btn-success");
  btn.classList.remove("btn-light");
 }
 })

 //var searchbar =document.querySelector(".search-bar");
 ///searchbar.addEventListener("keyup",function(){
 // var servalue = searchbar.value.toLowerCase();
 // var cards = document.querySelectorAll(".card");
 // for(let i=0; i<cards.length; i++){
   // var cardTitle = cards[i].querySelector("h3").innerHTML;
   // var h3Title = cardTitle.toLowerCase();
  //  if (h3Title.includes(servalue)){
   //   cards[i].style.display="block";    
   // }else{
   //     cards[i].style.display="none";
 //     }
//
//  }
 //})


 var searchBar = document.querySelector(".search-bar");
 searchBar.addEventListener("keyup",function(){
    var searchvalue = searchBar.value.toLowerCase();
    var cards = document.querySelectorAll(".card");
    for (let i=0; i<cards.length; i++){
      var cardTitle = cards[i].querySelector("h3").innerHTML;
      var h3Title = cardTitle.toLowerCase();
      if ( h3Title.includes(searchvalue)){
        cards[i].style.display="block";
      }else{ cards[i].style.display="none";}
    }
    
 })