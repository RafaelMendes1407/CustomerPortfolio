/* eslint-disable no-undef */
import App from '../../src/App'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest')

let id = ''
let token = ''
let clientId = ''

describe('CRUD Client Test', () => {
  it('should create a new client', async () => {
    const response1 = await request(App)
      .post('/users')
      .send({
        name: 'test',
        email: 'teste@teste.com',
        document: '4132456789',
        password: '123456'
      })
    id = response1.body._id

    const response2 = await request(App)
      .post('/authenticate')
      .send({
        email: 'teste@teste.com',
        password: '123456'
      })
    token = response2.body.token

    const response = await request(App)
      .post('/clients')
      .send({
        client: {
          name: 'test',
          document: Math.random()
        },
        phone: {
          phone: '9999-9999',
          areaCode: 34
        },
        email: {
          email: 'email@email.com',
          domain: 'email'
        },
        adress: {
          city: 'example city',
          street: 'Street 1',
          number: 17,
          neighbourhood: 'example',
          complement: 'Ap 301',
          country: 'Brazil'
        }
      }).set('Authorization', `bearer ${token}`)

    clientId = response.body._id

    expect(response.status).toBe(201)
  })

  it('Should delete a Client', async () => {
    const response = await request(App)
      .delete(`/clients/${clientId}`)
      .set('Authorization', 'bearer ' + token)

    const resUser = await request(App)
      .delete(`/users/${id}`)
      .set('Authorization', 'bearer ' + token)

    expect(response.status).toBe(200)
    expect(resUser.status).toBe(200)
  })
})
