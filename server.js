if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


import express, { static } from 'express';
const app = express();
import expressLayouts from 'express-ejs-layouts';

import indexRouter from './routes/index';
import authorRouter from './routes/authors';
import { urlencoded } from 'body-parser';


app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(static('public'));
app.use(urlencoded({ limit: '10mb', extended: false }))




import { connect, connection } from 'mongoose';
connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = connection
db.on('error', error =>console.error(error))
db.once('open', () => console.log('connected to mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000);
