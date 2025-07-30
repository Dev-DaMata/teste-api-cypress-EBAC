// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('token', (email, senha) => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        "email": email,
        "password": senha
      }
    }).then(res =>{
        return res.body.authorization
    })//para enviar o token atualizado
})

Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => {
    cy.request({
            method: 'POST',
            url: 'produtos',
            headers: { authorization: token },
            body: {
                //TODO: criar produto dinamicamente ✅
                "nome": produto,
                "preco": preco,
                "descricao": descricao,
                "quantidade": quantidade
            },
            failOnStatusCode: false,
        })
})