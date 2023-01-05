const quantity = document.querySelectorAll(".quantity");
const totalElement = document.querySelector(".total");
const subtotalElements = document.querySelectorAll(".subtotal");
const checkout = document.querySelector("#checkout")
const prodname = document.querySelectorAll("#prodname")
const productsDetails = {}
let tagPrice = 0;
let subtotal = 0;

quantity.forEach((element) => {
  element.addEventListener("input", async(e) => {
    const response = await fetch("http://localhost:3000/update" , {headers:{
      'Content-Type':'application/json'
    } , method:'POST' , body:JSON.stringify({ id:e.target.dataset.id , quantity:e.target.value})})
    
  
    const priceElement =
      e.target.parentElement.parentElement.querySelectorAll(".price");
    const _subtotal =
      e.target.parentElement.parentElement.querySelectorAll(".subtotal");
    const productId = document.querySelectorAll("#prodid")


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

checkout.addEventListener('click' , async(e)=>{
    const userId = document.getElementById("userid")
    const response = await fetch("http://localhost:3000/cart")
    const data = await response.json()
    console.log(data);
    let orderDetails = {}
    const orderArr = []

    data.map((cart)=>{
      orderDetails.productId = cart.productId,
      orderDetails.quantity = cart.quantity,
      orderDetails.userId = +userId.textContent
      orderArr.push(orderDetails)
      orderDetails = {}

    })
    const res = await fetch("http://localhost:3000/order" , {headers:{'Content-Type':'application/json'} , method:'POST' , body:JSON.stringify(orderArr)})
    // console.log(res);
    
})

