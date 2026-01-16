describe('Formulário de Consultoria', () => {
    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

        cy.get('input[placeholder="Digite seu nome completo"]').type('Vinicius dos Santos')
        cy.get('input[placeholder="Digite seu email"]').type('vinicius@webdojo.com')
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('11999999999')
            .should('have.value', '(11) 99999-9999')

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('not.be.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('85529992005')
            .should('have.value', '855.299.920-05')

        const checkboxItens = [
            'Instagram',
            'Udemy',
            'YouTube',
            'LinkedIn',
            'Indicação de Amigo'
        ]

        checkboxItens.forEach((item) => {
            cy.contains('label', item)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/document.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')

        const tecnologias = [
            'React',
            'Node.js',
            'Python',
            'Java',
            'C#'
        ]

        tecnologias.forEach((tecnologia) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tecnologia)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains(tecnologia)
                .should('be.visible')
        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked')


        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible')

    })



})

