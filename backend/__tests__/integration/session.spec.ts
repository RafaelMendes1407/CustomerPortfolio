/* eslint-disable no-undef */
import App from '../../src/App'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest')

let id = ''
let token = ''

describe('Users tests', () => {
  it('should Register a user', async () => {
    const response = await request(App)
      .post('/users')
      .send({
        name: 'test',
        email: 'teste@teste.com',
        document: '4132456789',
        password: '123456'
      })
    id = response.body._id
    expect(response.status).toBe(201)
  })

  it('should get a auth token', async () => {
    const response = await request(App)
      .post('/authenticate')
      .send({
        email: 'teste@teste.com',
        password: '123456'
      })
    token = response.body.token
    expect(response.body).toHaveProperty('token')
  })

  it('should not be able to access private routes without token', async () => {
    const response = await request(App)
      .get('/client')

    expect(response.status).toBe(401)
  })

  it('Should delete a user', async () => {
    const response = await request(App)
      .delete(`/users/${id}`)
      .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })
})
