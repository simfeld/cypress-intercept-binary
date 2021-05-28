/// <reference types="cypress" />

context('intercept binary test', () => {

    it('no intercept', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Data fetching successful').should('be.visible');
        cy.contains('content type: application/octet-stream').should('be.visible');
        cy.get('ul > li').should('have.length', 10);
    })

    it('intercept without stub', () => {
        cy.intercept('http://localhost:4000/binary', (req) => {
            req.on('response', (res) => {
                console.log(res.body);
                console.log('intercept happened');
            })
        })
        cy.visit('http://localhost:3000');
        cy.contains('Data fetching successful').should('be.visible');
        cy.contains('content type: application/octet-stream').should('be.visible');
        cy.get('ul > li').should('have.length', 10);
    })

    it('intercept with stub', () => {
        const buffer = new ArrayBuffer(10);
        const uint8 = new Uint8Array(buffer);

        // generate some data
        for (let i = 0; i< 10; i++) {
            uint8[i] = (Math.random() * 1000) % 256;
        }
        console.log(buffer);
        cy.intercept('http://localhost:4000/binary', {
            body: buffer,
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            statusCode: 200,
        })
        cy.visit('http://localhost:3000');
        cy.contains('Data fetching successful').should('be.visible');
        cy.contains('content type: application/octet-stream').should('be.visible');
        cy.get('ul > li').should('have.length', 10);
    })
})
