'use strict';
const express = require('express');
const app = express();
const port = 3000;
const cat = require('./routes/catRoute')
const user = require('./routes/userRoute')
const cors = require('cors')
const passport = require('./utils/pass')
const authRoute = require('./routes/authRoute')
require('dotenv').config();

app.enable('trust proxy');

app.use ((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // if express app run under proxy with sub path URL
    // e.g. http://www.myserver.com/app/
    // then, in your .env, set PROXY_PASS=/app
    // Adapt to your proxy settings!
    const proxypath = process.env.PROXY_PASS || ''
    // request was via http, so redirect to https
    res.redirect(301, `https://${req.headers.host}${proxypath}${req.url}`);
  }
});

app.use(cors())
app.use('/thumbnails', express.static('thumbnails'));
app.use('/uploads', express.static('uploads'));
app.use('/auth', authRoute)
app.use('/cat', passport.authenticate('jwt', {session: false}), cat)
app.use('/user', passport.authenticate('jwt', {session: false}), user)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
