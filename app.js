var data = fetch("https://fakestoreapi.com/products");

fetch("https://fakestoreapi.com/products") //step 1 fetch data api calling
  .then((response) => response.json()) // convert json
  .then((data) => productInsert(data)) // call function
  .catch((error) => {
    console.error("Error loading the products:", error);
    document.getElementById("product-list").innerHTML =
      "<p>Failed to load products.</p>";
  });

  function productInsert(data){
    const productListContainer = document.querySelector("#product-list");
    for (let i = 0; i < data.length; i++){
      const productCard = document.createElement("div");
      productCard.classList.add("card");
      
      productCard.innerHTML =  `

      <h5>${data[i].id}</h5>
      <img class="img-size"  src="${data[i].image}">
      <h3 class="text-break text-overflow">${data[i].title}</h3>
      <p>price : ${data[i].price} yen</p>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal${data[i].id}" style="cursor: pointer; " class="btn btn-warning"> See Detail</button>
      <button style="cursor: pointer; " class="btn btn-warning mt-3 cart-btn" 
      data-id="${data[i].id}"
      data-title="${data[i].title}" 
      data-price="${data[i].price}" 
      data-img="${data[i].image}">
      Add to Cart
      </button>

        
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

    var cartBtn = document.querySelectorAll(".cart-btn");
    var noti = document.querySelector("#noti");
    for (let i = 0; i < cartBtn.length; i++) {
      cartBtn[i].addEventListener("click", function () {
        noti.classList.add("show");
        setTimeout(() => {
          noti.classList.remove("show");
        }, 3000);
        var carDiv = document.querySelector("#cart-div");
        var cardHeader = document.createElement("div");
        cardHeader.classList.add("card");
        cardHeader.classList.add("mb-3");
        cardHeader.innerHTML = `
          <div class="row g-0">
                <div class="col-md-12">
                    <img
                        src="${cartBtn[i].getAttribute("data-img")}"
                        class=" rounded-start"
                        alt="...">
                </div>
                <div class="col-md-12">
                    <div class="card-body ">
                        <p class="card-title">
                           ${cartBtn[i].getAttribute("data-title")}
                        </p>
                         <div class="root-price">
                        <p class="card-text">price : 
                        <span class="org-price">
                        ${cartBtn[i].getAttribute("data-price")}
                        </span>
                        </p>
                         <p class="card-text" >semi-price : 
                        
                          <span class="semi-price">${cartBtn[i].getAttribute(
                            "data-price"
                          )}
                          </span>
                         
                         </p>
                         <div class="d-flex justify-content-center gap-5 align-items-center root-plus-minus">
                            <p class="minus" style="cursor:pointer;font-size:1.5rem"> - </p>
                            <p class="product-amount"> 1 </p>
                            <p class="plus" style="cursor:pointer;font-size:1.5rem"> + </p>
                         </div>
                          </div>
                    </div>
                </div>
              </div>
        `;
        carDiv.appendChild(cardHeader);
      });
    }
  }


  $("#cart-id").click(function(){
    let finalPrice = "";
      let finalAmount = "";

     $(".plus").click(function() {
        let count = $(this)
        .closest(".root-plus-minus")
        .find(".product-amount")
        .text();
        let price = $(this)
        .closest(".root-price")
        .find(".semi-price")
        .text();
      
      let originalPrice = $(this)
      .closest(".root-price")
      .find(".org-price")
      .text();
      finalPrice = Number(price)+Number(originalPrice);
      finalAmount= Number(count)+Number(1);
      $(this)
      .closest(".root-plus-minus")
        .find(".product-amount")
        .text(finalAmount);

        $(this)
        .closest(".root-price")
        .find(".semi-price")
        .text(finalPrice);
      });
      
      
//Minus operation
    $(".minus").click(function() {
      if(finalAmount <=1){
        alert("The Product Amount is Zero;")
        
      }else
      { let count = $(this)
        .closest(".root-plus-minus")
        .find(".product-amount")
        .text();
        let price = $(this)
        .closest(".root-price")
        .find(".semi-price")
        .text();
      
        let originalPrice = $(this)
        .closest(".root-price")
        .find(".org-price")
        .text();

        finalPrice = Number(price)-Number(originalPrice);
        finalAmount= Number(count)-Number(1);
        $(this)
        .closest(".root-plus-minus")
        .find(".product-amount")
        .text(finalAmount);};


        $(this)
        .closest(".root-price")
        .find(".semi-price")
        .text(finalPrice);


     });
    
  });
  
  //price//
 
      

$("#color-btn").click(function(){
$("#main-body").toggleClass("bg-color");
if ($("#main-body").contains("bg-color")){
  $("mainbody").text("Dark Mode")
}else{
  $("mainbody").text("Light Mode")
};
});

// var bgBtn = document.querySelector("#color-btn");
// bgBtn.addEventListener("click",function(){
    
  
//   var mainbody = document.querySelector("#main-body");
//   var hello = document.querySelector("#hello");
//   mainbody.classList.toggle("bg-color");
// if (mainbody.classList.contains("bg-color")){
//   bgBtn.classList.remove("btn-dark");
//   bgBtn.classList.add("btn-light");
//   hello.classList.add("hello");
//   document.querySelector("#color-btn").innerHTML =  `Light Mode`;
// }
// else{
//   bgBtn.classList.remove("btn-light");
//   bgBtn.classList.add("btn-dark");
//   hello.classList.remove("hello");
//   document.querySelector("#color-btn").innerHTML =  `Dark Mode`;

// }

// });

var searchBar = document.querySelector(".search-bar");
searchBar.addEventListener("keyup", function () {
  var searchvalue = searchBar.value.toLowerCase();
  var cards = document.querySelectorAll(".card");
  ``;
  for (let i = 0; i < cards.length; i++) {
    var cardTitle = cards[i].querySelector("h3").innerHTML;
    var h3Title = cardTitle.toLowerCase();
    if (h3Title.includes(searchvalue)) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
});


