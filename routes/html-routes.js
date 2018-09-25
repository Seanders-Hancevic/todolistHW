
const path = require('path');


module.exports = function(app) {

  app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

};
