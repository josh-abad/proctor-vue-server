import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import bcrypt from 'bcrypt'
import User from '../models/user'
import helper from './test_helper'

const api = supertest(app)

test('courses are returned as json', async () => {
  await api
    .get('/api/courses')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('exam items are returned as json', async () => {
  await api
    .get('/api/exam-items')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({
      name: {
        first: 'John',
        last: 'Smith'
      },
      username: 'user',
      passwordHash
    })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb() 

    const newUser = {
      name: {
        first: 'Frasier',
        last: 'Crane'
      },
      username: 'frasier',
      password: 'seattle'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(done => {
  mongoose.connection.close()
  done()
})
