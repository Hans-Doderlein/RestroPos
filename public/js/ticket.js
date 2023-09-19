const plusButton = document.querySelectorAll('#addToCart');
plusButton.forEach((index) => {
  index.addEventListener('click', addToCart);
});

//targets display area
const ticketPrice = document.getElementById('ticketTotal');

const itemDisplay = document.getElementById('currentItems');

let total = 0;
let items = [];

async function addToCart(event) {
  event.preventDefault();

  //create and text fills p element
  const itemname = document.createElement('p');
  itemname.innerText = this.name;
  itemDisplay.append(itemname);

  //adds taxes to total price
  total += Number(this.value * 1.07);

  items.push(this.dataset.id);

  ticketPrice.textContent = total.toFixed(2);

  // display price and name in the aside
}

const checkout = document.getElementById('checkout-button');
checkout.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    //fetch post for new order
    await fetch('/orders/new', {
      method: 'post',
      body: JSON.stringify({ total, items }),
      headers: { 'content-type': 'application/json' }
    });
  } catch (error) {
    console.log('error:', error);
  }

  //reset the values
  items = [];
  total = 0;
  document.location.replace('/menu');
});
