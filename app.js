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
                    <div class="card-body">
                        <p class="card-title">
                           ${cartBtn[i].getAttribute("data-title")}
                        </p>
                        <p class="card-text">price : 
                        <span id="org-price">
                        ${cartBtn[i].getAttribute("data-price")}
                        </span>
                        </p>
                         <p class="card-text" >semi-price : 
                          <span id="semi-price">${cartBtn[i].getAttribute(
                            "data-price"
                          )}
                          </span>
                         </p>
                         <div class="d-flex justify-content-center gap-5 align-items-center ">
                            <p id="minus" style="cursor:pointer;font-size:1.5rem"> - </p>
                            <p id="product-amount"> 1 </p>
                            <p id="plus" style="cursor:pointer;font-size:1.5rem"> + </p>
                         </div>
                    </div>
                </div>
              </div>
        `;
        carDiv.appendChild(cardHeader);
      });
    }
  }

  var cartId = document.querySelector("#cart-id");
  
  cartId.addEventListener("click", function () {
    var plus = document.querySelector("#plus");
    var minus = document.querySelector("#minus");
  
    minus.addEventListener("click", function () {
      let amount = document.querySelector("#product-amount").innerHTML;
      if (amount <= 1) {
        console.log("Stop");
      } else {
        let finalMinusPrice = "";
        let finalMinusAmount = "";
        //select and operate
        let semiMPrice = document.querySelector("#semi-price").innerHTML;
        let Mamount = document.querySelector("#product-amount").innerHTML;
        let orgMPrice = document.querySelector("#org-price").innerHTML;
        finalMinusAmount = Number(finalMinusAmount);
        finalMinusPrice = Number(finalMinusPrice);
        finalMinusAmount -= Number(1) - Number(Mamount);
        finalMinusPrice += Number(semiMPrice) - Number(orgMPrice);
        //Ui update
        document.querySelector("#product-amount").innerHTML = `${finalMinusAmount}`;
        document.querySelector("#semi-price").innerHTML = `${finalMinusPrice}`;
      }
    });
        //Minus operation
      
  
    plus.addEventListener("click", function () {
      //reset
      let finalPrice = "";
      let finalAmount = "";
      //select and operate
      let semiPrice = document.querySelector("#semi-price").innerHTML;
      let amount = document.querySelector("#product-amount").innerHTML;
      let orgPrice = document.querySelector("#org-price").innerHTML;
      finalAmount = Number(finalAmount);
      finalPrice = Number(finalPrice);
      finalAmount += Number(amount) + Number(1);
      finalPrice += Number(orgPrice) + Number(semiPrice);
      //Ui update
      document.querySelector("#product-amount").innerHTML = `${finalAmount}`;
      document.querySelector("#semi-price").innerHTML = `${finalPrice}`;
    });
  });
  

//$("#color-btn").click(function(){
//$("#main-body").toggleClass("bg-color");
//});

var bgBtn = document.querySelector("#color-btn");
bgBtn.addEventListener("click",function(){
    
  
  var mainbody = document.querySelector("#main-body");
  var hello = document.querySelector("#hello");
  mainbody.classList.toggle("bg-color");
if (mainbody.classList.contains("bg-color")){
  bgBtn.classList.remove("btn-dark");
  bgBtn.classList.add("btn-light");
  hello.classList.add("hello");
  document.querySelector("#color-btn").innerHTML =  `Light Mode`;
}
else{
  bgBtn.classList.remove("btn-light");
  bgBtn.classList.add("btn-dark");
  hello.classList.remove("hello");
  document.querySelector("#color-btn").innerHTML =  `Dark Mode`;

}

});


