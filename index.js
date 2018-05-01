'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const mongoose = require('mongoose');
const passport = require('passport');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const localStrategy = require('./passport/local');


// const {dbConnect} = require('./db-knex');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

passport.use(localStrategy);

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(express.json());


app.use('/api', usersRouter);
app.use('/api', authRouter);

app.get('/api/golfers', (req, res) => {
  return res.json(
    [
      {
        'id': 1,
        'name' : 'Dustin Johnson',
        'rank': 1
       
      },
      {
        'id': 2,
        'name' : 'Jordan Spieth',
        'rank': 2
          
      },
      {
        'id': 3,
        'name' : 'Rickie Fowler',
        'rank': 3
          
      },
      {
        'id': 4,
        'name' : 'Justin Thomas',
        'rank': 4
          
      }
    ]
  );
});

app.get('/api/teams', (req, res) => {
  return res.json({
  
    'teamA': {
      'id': 1, 
      'players': []
    },

    'teamB': {
      'id': 2, 
      'players': []
    }
  }
  
  );
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
