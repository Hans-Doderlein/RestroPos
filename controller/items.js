const multer = require('multer');
const { Products } = require('../model/index');

const { withAuth, withAdmin } = require('../utils/helpers');

const router = require('express').Router();

// Configure Multer to specify where to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.split(' ').join('')); // Append a timestamp to the file name to make it unique
  }
});

const upload = multer({ storage });

//this will render the newItem page
router.get('/new', withAuth, withAdmin, (req, res) => {
  try {
    res.render('newItem', {});
  } catch (error) {
    console.log('error:', error);
  }
});

//this will create a new item and render the menu page on succesful creation
router.post('/new', withAuth, upload.single('img_s_r_c'), async (req, res) => {
  const { name, price, type, allergy } = req.body;
  const img_s_r_c = `/images/${req.file.filename}`;

  try {
    //create new product using info from the request body
    const newProduct = await Products.create({
      name,
      price,
      type,
      allergy,
      img_s_r_c
    });

    console.log('new product:', newProduct);
    res.status(200).json({ message: 'product created', product: newProduct });
  } catch (error) {
    //logs error if there is one
    res.status(500).json({ message: 'product not created', error: error });
  }
});

module.exports = router;
