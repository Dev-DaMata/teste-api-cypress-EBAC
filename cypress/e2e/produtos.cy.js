/// <reference types="cypress"/>

describe('Teste de API em Produtos', () => {
    it('Listar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
        }).then(res => {
            expect(res.status).eq(200)
            expect(res.body.produtos[4].nome).eq("Samsung 60 polegadas")
            expect(res.body).to.have.property('produtos')//espera que dentro do body tenha a propriedade produtos
        })
    })

    it.only('Cadastrar protudo - Post', () => {
        //TODO: Criar token dinamicamente
        let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzUzODk4NTM4LCJleHAiOjE3NTM4OTkxMzh9.HKfnoKeefuyErH5giAFa0wvn-UNmeGt7RDLrqc15-y8"
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: { authorization: token },
            body: {
                //TODO: criar produto dinamicamente
                "nome": "Cabo usb",
                "preco": 15,
                "descricao": "Cabo usb do tipo C",
                "quantidade": 100
            },
            failOnStatusCode: false,
        }).then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq("Cadastro realizado com sucesso")
        })
    })
})