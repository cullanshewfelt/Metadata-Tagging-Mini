const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const independentArtistsRouter = require('./routes/independent-artists-routes');
const exportsRouter = require('./routes/exports-routes');
const uploadsRouter = require('./routes/uploads');
const linksRouter = require('./routes/linkRoutes');
const compression = require('compression');
const app = express();
const util = require('util');
const port = process.env.PORT || 4000;

util.inspect.defaultOptions.maxArrayLength = null;

// *****************************************************************************************
// use this for development builds (prod at bottom) :
// *****************************************************************************************

app.use(express.json());
app.use(express.urlencoded({extended: true})); // extended true means you can use nested objects in post requests
app.use(cors({credentials: true, origin: true}));
app.options('*', cors())
// app.use(compression());

// *****************************************************************************************

app.use('/api/independent-artists/', independentArtistsRouter);
app.use('/api/exports/', exportsRouter);
app.use('/upload/', uploadsRouter);
app.use('/move/', linksRouter);

app.use(express.static(path.join(__dirname, 'public/build')));

app.get('/*', (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

// ********************************************************************************************************************************

app.listen(port, () => {
  console.log('listening on port ', port);
})

// ********************************************************************************************************************************
