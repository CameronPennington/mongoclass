const mongoose = require('mongoose')
const db = require('../config/dbKey').mongoURI;

mongoose.Promise = global.Promise;

before((done)=>{
  mongoose.connect(db)
  mongoose.connection
    .once('open', ()=>{done()})
    .on('error', (error)=>{
      console.warn('Warning', error)
    })
    
})

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
})