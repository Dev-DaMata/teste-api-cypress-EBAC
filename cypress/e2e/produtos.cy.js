/// <reference types="cypress"/>
import contrato from "../contratos/produtos.contrato"

describe('Teste de API em Produtos', () => {
    let token //variavel que vai armazenar o token
    beforeEach(() => {
        cy.token("fulano@qa.com", "teste").then(tkn => {
            token = tkn //passando o token para a variavel
        })
    })

    it.only('Deve validar contrato de produtos com sucesso', () =>{
        cy.request('produtos').then(res => {
            return contrato.validateAsync(res.body)
        })
    })

    it('Deve listar produtos com sucesso - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
        }).then(res => {
            expect(res.status).eq(200)
            expect(res.body.produtos[1].nome).eq("Produto EBAC Editado 7098505")
            expect(res.body).to.have.property('produtos')//espera que dentro do body tenha a propriedade produtos
        })
    })

    it('Deve cadastrar protudo com sucesso - POST', () => {
        //TODO: Criar token dinamicamente ✅
        let produto = 'Produto EBAC ' + Math.floor(Math.random() * 100000000)
        cy.cadastrarProduto(token, produto, '15', 'Cabo usb do tipo C', '100').then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq("Cadastro realizado com sucesso")
        })
    })

    it('Deve validar mensagem de produto cadastrado anteriormente - POST', () => {
        cy.cadastrarProduto(token, 'Cabo usbs', '15', 'Cabo usb do tipo C', '100').then(res => {
            expect(res.status).eq(400)
            expect(res.body.message).eq("Já existe produto com esse nome")
        })
    })

    it('Deve editar produto com sucesso - PUT', () => {
        let produto = 'Produto EBAC Editado ' + Math.floor(Math.random() * 100000000)

        cy.cadastrarProduto(token, produto, '15', 'Produto EBAC Editado', '100').then(res => {
            let id = res.body._id
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: { authorization: token },
                body: {
                    "nome": produto,
                    "preco": 500,
                    "descricao": "Produto editado",
                    "quantidade": 100
                }
            }).then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Registro alterado com sucesso')
            })
        })
    })

    it('Deve deletar um produto com sucesso - DELETE', () => {
        let produto = 'Produto EBAC Editado ' + Math.floor(Math.random() * 100000000)
        cy.cadastrarProduto(token, produto, '15', 'Produto EBAC que será excluido', '100').then(res =>{
            let id = res.body._id
            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: { authorization: token },
                failOnStatusCode: false,
            }).then(res => {
                expect(res.body.message).eq("Registro excluído com sucesso")
                expect(res.status).eq(200)
            })
        })
    })

})