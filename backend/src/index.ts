import express from 'express';
import routes from './routes';

//import db from './connection/mongodb';
require('./connection/mongodb');

const app = express();
//TODO
const port = 3333;

app.use(routes);
app.use(express.json());
app.listen(port, () => console.log(`Server Started at port ${port}`));


