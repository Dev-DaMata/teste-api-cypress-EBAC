/// <reference types="cypress"/>

describe('Teste de API - Login', () => {
  it('Deve realizar login com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        "email": "fulano@qa.com",
        "password": "teste"
      }
    })/*.should((response) =>{ //Esse é o jeito do curso 
      expect(response.body.message).eq("Login realizado com sucesso"),
      expect(response.status).eq(200)
    })*/
    .then(res => { //Meu jeito
      cy.log(res.body.authorization)
      expect(res.body.message).eq("Login realizado com sucesso"),
      expect(res.status).eq(200)
    })
  })
})