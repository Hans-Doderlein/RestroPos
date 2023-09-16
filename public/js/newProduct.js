document
  .querySelector('#addItemForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    console.log('new item button clicked');

    const name = document.querySelector('#itemName').value.trim();
    const price = document.querySelector('#itemPrice').value;
    const allergy = document.querySelector('#allergyInfo').value.trim();
    const type = document.querySelector('#item-type').value;
    const img_s_r_c = event.srcElement[4].files[0];
    console.log(img_s_r_c);
    const imgName = img_s_r_c.name;
    const validfiletype = ['jpg', 'jpeg', 'png'];
    const filetype = imgName.split('.');

    if (!validfiletype.includes(filetype[filetype.length - 1])) {
      document.getElementById('errorType').textContent =
        'File must be of type jpg, jpeg, or png';
      return;
    }

    const formData = new FormData();
    formData.append('img_s_r_c', img_s_r_c);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('price', price);
    formData.append('allergy', allergy);

    const response = await fetch('/items/new', {
      method: 'POST',
      body: formData
    });
  });
