'use strict';
const express = require('express');
const app = express();
const port = 3000;
const cat = require('./routes/catRoute')
const user = require('./routes/userRoute')
const cors = require('cors')
const passport = require('./utils/pass')
const authRoute = require('./routes/authRoute')

app.use(cors())
app.use('/auth', authRoute)
app.use('/cat', passport.authenticate('jwt', {session: false}), cat)
app.use('/user', passport.authenticate('jwt', {session: false}), user)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
