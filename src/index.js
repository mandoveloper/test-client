const express = require('express');
const app = express();

// port
app.set('port', process.env.PORT || 4003)

// middlewares
app.use(express.json());


//routs
app.use(require('./routes/index'));

//start server
app.listen(app.set('port'), () => {
    console.log('Server on port', app.set('port'));

})
