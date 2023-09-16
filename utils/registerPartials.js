const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// Read partial files and register them
const readAndRegisterPartial = (partialName) => {
  const filePath = path.join(__dirname, '..', 'views', 'partials', `${partialName}.handlebars`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  Handlebars.registerPartial(partialName, fileContent);
};

// Manually specify partial names to register
readAndRegisterPartial('product-details');
readAndRegisterPartial('ticket-details');
