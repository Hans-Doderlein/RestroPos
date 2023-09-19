const plusButton = document.querySelectorAll('#addToCart');
plusButton.forEach((index)=>{
index.addEventListener("click",addToCart)
})

const ticketPrice = document.getElementById('ticketTotal')

const itemDisplay = document.getElementById('currentItems')

let total=0;
let items=[];
async function addToCart (event) {
    event.preventDefault();
    console.log(this.dataset.id)
    //this.name returns name of dish
    //this.price returns price of dish
    const itemname = document.createElement('p');
    itemname.innerText =this.name;
    itemDisplay.append(itemname)

    total+= Number(this.value)
   
    items.push(this.dataset.id)

    ticketPrice.textContent =(total*1.07).toFixed(2)

    // display price and name in the aside
}

const checkout = document.getElementById("checkout-button")
checkout.addEventListener('click',async (e)=>{
    e.preventDefault();

    await fetch('/orders/new', {
        method:'post',
        body:JSON.stringify({total,items}),
        headers:{"content-type":"application/json"}
    })

    items=[];
    total=0;
    document.location.replace('/menu')
})