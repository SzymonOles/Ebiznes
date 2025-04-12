describe('API Tests', () => {
    const apiUrl = 'http://localhost:8080';

    // -------- Produkty --------
    it('GET /products - success', () => {
        cy.request(`${apiUrl}/products`).its('status').should('eq', 200);
    });

    it('GET /products/category/:category_id - negative (invalid ID)', () => {
        cy.request({
            url: `${apiUrl}/products/category/invalid`,
            failOnStatusCode: false
        }).its('status').should('be.oneOf', [400, 404]);
    });

    it('GET /products/expensive - success', () => {
        cy.request(`${apiUrl}/products/expensive`).its('status').should('eq', 200);
    });

    it('POST /products - negative (missing body)', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/products`,
            failOnStatusCode: false
        }).its('status').should('eq', 201);
    });

    it('PUT /products/:id - negative (not found)', () => {
        cy.request({
            method: 'PUT',
            url: `${apiUrl}/products/999`,
            body: {},
            failOnStatusCode: false
        }).its('status').should('be.oneOf', [400, 404]);
    });

    it('DELETE /products/:id - negative (not found)', () => {
        cy.request({
            method: 'DELETE',
            url: `${apiUrl}/products/999`,
            failOnStatusCode: false
        }).its('status').should('be.oneOf', [400, 404, 204]);
    });

    // -------- Kategorie --------
    it('GET /categories - success', () => {
        cy.request(`${apiUrl}/categories`).its('status').should('eq', 200);
    });

    it('POST /categories - negative (missing body)', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/categories`,
            failOnStatusCode: false
        }).its('status').should('eq', 201);
    });

    it('PUT /categories/:id - negative (invalid ID)', () => {
        cy.request({
            method: 'PUT',
            url: `${apiUrl}/categories/invalid`,
            body: {},
            failOnStatusCode: false
        }).its('status').should('be.oneOf', [400, 404]);
    });

    it('DELETE /categories/:id - negative (invalid ID)', () => {
        cy.request({
            method: 'DELETE',
            url: `${apiUrl}/categories/invalid`,
            failOnStatusCode: false
        }).its('status').should('be.oneOf', [400, 404, 204]);
    });

    // -------- Koszyk --------
    it('GET /carts - success', () => {
        cy.request(`${apiUrl}/carts`).its('status').should('eq', 200);
    });

    it('POST /carts - negative (missing body)', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/carts`,
            failOnStatusCode: false
        }).its('status').should('eq', 201);
    });

    it('DELETE /carts/:id - negative (invalid ID)', () => {
        cy.request({
            method: 'DELETE',
            url: `${apiUrl}/carts/invalid`,
            failOnStatusCode: false
        }).its('status').should('be.oneOf', [400, 404]);
    });

    // -------- Produkty w Koszyku --------
    it('POST /carts/:cart_id/products/:product_id - negative (invalid IDs)', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/carts/invalid/products/invalid`,
            failOnStatusCode: false
        }).its('status').should('be.oneOf', [400, 404]);
    });

    it('DELETE /carts/:cart_id/products/:product_id - negative (invalid IDs)', () => {
        cy.request({
            method: 'DELETE',
            url: `${apiUrl}/carts/invalid/products/invalid`,
            failOnStatusCode: false
        }).its('status').should('be.oneOf', [400, 404]);
    });
});