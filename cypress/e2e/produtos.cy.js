/// <reference types="cypress"/>

describe('Teste de API em Produtos', () => {
    let token //variavel que vai armazenar o token
    beforeEach(() => {
        cy.token("fulano@qa.com", "teste").then(tkn => {
            token = tkn //passando o token para a variavel
        })
    })

    it('Listar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
        }).then(res => {
            expect(res.status).eq(200)
            expect(res.body.produtos[1].nome).eq("Iphone XR plus")
            expect(res.body).to.have.property('produtos')//espera que dentro do body tenha a propriedade produtos
        })
    })

    it('Cadastrar protudo - Post', () => {
        //TODO: Criar token dinamicamente ✅
        let produto = 'Produto EBAC ' + Math.floor(Math.random() * 100000000)
        cy.cadastrarProduto(token, produto, '15', 'Cabo usb do tipo C', '100').then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq("Cadastro realizado com sucesso")
        })
    })

    it('Deve validar mensagem de produto cadastrado anteriormente', () => {
        cy.cadastrarProduto(token, 'Cabo usbs', '15', 'Cabo usb do tipo C', '100').then(res => {
            expect(res.status).eq(400)
            expect(res.body.message).eq("Já existe produto com esse nome")
        })
    })
})