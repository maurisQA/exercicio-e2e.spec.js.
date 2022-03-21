/// <reference types="cypress" />

const perfil = require('../fixtures/perfil.json')

context("Funcionalidade login", () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    })

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should("contain", "Minha conta")
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should("contain", "Olá")
    })

    it('Deve fazer login com sucesso - usando arquivo de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should("contain", "Minha conta")
    });

    it.only('DEve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.page-title').should("contain", "Minha conta")
        })
    });


    it('Deve exibir uma mensagem de erro ao inserir usuario invalido', () => {
        cy.get('#username').type("alu_ebac@teste.com ")
        cy.get('#password').type("teste@teste.com")
        cy.get('.woocommerce-form > .button').click()

    })

    it('Deve exibir uma mensagem de erro ao inserir senha invalida', () => {
        cy.get('#username').type("aluno_ebac@teste.com ")
        cy.get('#password').type("teste@testes.com")
        cy.get('.woocommerce-form > .button').click()
    })
})