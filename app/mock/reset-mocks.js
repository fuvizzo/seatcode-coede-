const fs = require('fs');

console.log('reset mocks');

fs.copyFile('./mock/default-db.json', './mock/db.json', (err) => {
  if (err) {
    console.log('Error Found:', err);
  }
});
module.exports = {};
