const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(__dirname + '/angular-build'));
app.get('/*', function(req,res){
res.sendFile(path.join(__dirname, 'angular-build', 'index.html'))
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);





const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const main = express();

app.post('/endpoint', (req, res) => {
    // code here
})

app.use(cors({ origin: true }));
main.use(cors({ origin: true }));
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

module.exports.functionName = functions.https.onRequest(main);