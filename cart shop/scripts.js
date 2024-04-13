let selectedProducts = []
let totalPrice = 0
let cartNumber = 0
let cartEl = document.querySelector('.cart-wrap')
let numberEl = document.querySelector('.number')
let checkout = document.querySelector('.checkout')

function addToCart(name, price){
  let indeNum = selectedProducts.findIndex(item => item.Name === name)
  totalPrice += price
  cartNumber += 1

  if(indeNum !== -1){
     selectedProducts[indeNum].incart += 1
     selectedProducts[indeNum].totalPrice += price
  }else{
    let item = {
        Name: name,
        totalPrice: price,
        incart: 1
      }
    selectedProducts.push(item)
  }

  localStorage.setItem('cartItems', JSON.stringify(selectedProducts))
  localStorage.setItem('cartNum', cartNumber)
  localStorage.setItem('cartTotal', totalPrice)

  onload()
}

function onload(){
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    const cartNum = JSON.parse(localStorage.getItem('cartNum'))
    const cartTotal = JSON.parse(localStorage.getItem('cartTotal'))

    if(localStorage){
        if(cartItems != null){
            selectedProducts = cartItems
            cartNumber = cartNum
            totalPrice = cartTotal
        }
    }else{
        selectedProducts = []
    }

    if(cartNum === 0){
        checkout.innerHTML = `<h3>Your cart is Empty</h3>`
        }else{
            checkout.innerHTML = `
            <h3>Total: <span>R ${totalPrice}</span></h3>
            <button>Checkout</button>
            `
        }

    const displayItems = selectedProducts.map((product)=>{
       return(
        `<div class="cart-item">
        <img src='image/${product.Name}.jpeg'/>
         <h3>X ${product.incart}</h3>
         <h3>R ${product.totalPrice}</h3>
        <button onclick="deleteItem('${product.Name}')">X</button>
        </div>`
        )
    })
    
    cartEl.innerHTML = displayItems.join('')
    numberEl.textContent = cartNumber

}


function deleteItem(name){
 const selectedItemIndex = selectedProducts.findIndex(product => product.Name === name )

 const selectedItem = selectedProducts[selectedItemIndex]
 cartNumber -= selectedItem.incart
 totalPrice -= selectedItem.totalPrice

 selectedProducts.splice(selectedItemIndex,1)

 localStorage.setItem('cartItems', JSON.stringify(selectedProducts))
 localStorage.setItem('cartNum', cartNumber)
 localStorage.setItem('cartTotal', totalPrice)
 onload()
}

onload()