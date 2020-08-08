// https://brew.sh/#install
// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

const express = require('express');
const app = express();
app.use(express.json());

const routes = require('./routes');
const monk = require('./monk');
const mongoose = require('./mongoose');

app.use("/api", routes);
app.use("/monk", monk);
app.use("/mongoose", mongoose);

const port = 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});