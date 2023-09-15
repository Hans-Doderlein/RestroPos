
const newProduct = async(event) =>{
    event.preventDefault()
    const newItemId = document.querySelector('#identity').value
    const newItemName = document.querySelector('#itemName').value.trim()
    const newItemPrice = document.querySelector('#itemPrice').value
    const newItemAllergy = document.querySelector('#allergyInfo')
    const newItemType = document.querySelector('#item-type').value
    const newItemIMG = document.querySelector('#imgsrc').value.trim()

    const response = await fetch('/new', {
        method: 'POST',
        body: JSON.stringify({ newItemId, newItemName, newItemPrice, newItemAllergy, newItemType, newItemIMG }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        document.location.replace('/');
      } 

}   

document.querySelector('#add-item').addEventListener('submit', newProduct);
