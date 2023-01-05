const quantity = document.querySelectorAll(".quantity");
const totalElement = document.querySelector(".total");
const subtotalElements = document.querySelectorAll(".subtotal");
const checkout = document.querySelector("#checkout")
const prodname = document.querySelectorAll("#prodname")
const productsDetails = {}
let tagPrice = 0;
let subtotal = 0;

quantity.forEach((element) => {
  element.addEventListener("input", (e) => {
    const priceElement =
      e.target.parentElement.parentElement.querySelectorAll(".price");
    const _subtotal =
      e.target.parentElement.parentElement.querySelectorAll(".subtotal");

    priceElement.forEach((price) => {
      tagPrice = +price.innerText.replace("Price:Ksh", "");
    });
    _subtotal.forEach((t) => {
      subtotal = +t.textContent.replace("Ksh", "");
      const ansSubtotal = "Ksh" + tagPrice * e.target.value;
      t.textContent = ansSubtotal;
    });
    let total = 0;

    subtotalElements.forEach((subtotal) => {
      total = total + +subtotal.textContent.replace("Ksh", "");
      totalElement.textContent = total;
    });
  });
});

checkout.addEventListener('click' , (e)=>{

    const quantity = document.querySelectorAll('.quantity');
    const subtotal = document.querySelectorAll(".subtotal");
    
    const allProducts = [] 

    for(var i = 0; i<prodname.length; i++){
        
      
        allProducts.push(prodname[i].textContent)
    }

    for(var i = 0; i<subtotal.length; i++){
        
      
        allProducts.push(subtotal[i].textContent)
    }
    console.log(allProducts);

    

})

