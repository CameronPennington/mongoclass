const assert = require('assert')
const User = require('../src/user');

describe('Validating records', ()=>{
  it('requires a user name', done=>{
    const user = new User({name: undefined})
    //can also user validate() to test asynchronously
    const validationResult = user.validateSync()
    const {message} = validationResult.errors.name
    assert(message==='Name is required')
    done()
  })

  it('requires a user name longer than 2 characters', done=>{
    const user = new User({name: 'Al'})
    const validationResult = user.validateSync()
    const {message} = validationResult.errors.name
    assert(message==='Name must be longer than 2 characters')
    done()
  })

  it('disallows invalid records from being saved', done=>{
    const user = new User({name: 'Al'})
    user.save()
      .catch(validationResult=>{
        const {message} = validationResult.errors.name;
        assert(message==='Name must be longer than 2 characters')
        done()
      })
  })
})