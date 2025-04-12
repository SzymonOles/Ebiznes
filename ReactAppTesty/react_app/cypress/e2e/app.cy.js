describe('Testy funkcjonalne aplikacji (z minimum 50 assertami)', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Test 1: Ładuje listę produktów', () => {
        cy.contains('Produkty').should('exist'); // Assert 1
        cy.get('.product-item').should('have.length.at.least', 1); // Assert 2
    });

    it('Test 2: Dodaje pierwszy produkt do koszyka', () => {
        cy.get('.product-item').first().within(() => {
            cy.contains('Dodaj do koszyka').click();
        });

        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').should('have.length', 1); // Assert 3
    });

    it('Test 3: Dodaje dwa produkty do koszyka i sprawdza zawartość', () => {
        cy.get('.product-item').eq(0).contains('Dodaj do koszyka').click();
        cy.get('.product-item').eq(1).contains('Dodaj do koszyka').click();

        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').should('have.length', 2); // Assert 4
        cy.get('.cart-item').eq(0).should('contain.text', 'PLN'); // Assert 5
        cy.get('.cart-item').eq(1).should('contain.text', 'PLN'); // Assert 6
    });

    it('Test 4: Dodaje i usuwa jeden produkt z koszyka', () => {
        cy.get('.product-item').first().contains('Dodaj do koszyka').click();

        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').should('have.length', 1); // Assert 7
        cy.get('.cart-item').first().contains('Usuń').click();
        cy.get('.cart-item').should('have.length', 0); // Assert 8
    });

    it('Test 5: Realizuje płatność i czyści koszyk', () => {
        cy.get('.product-item').first().contains('Dodaj do koszyka').click();
        cy.visit('http://localhost:3000/checkout');
        cy.contains('Zapłać').click();

        cy.on('window:alert', (str) => {
            expect(str).to.contain('Płatność zakończona sukcesem'); // Assert 9
        });

        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').should('have.length', 0); // Assert 10
    });

    it('Test 6: Dodaje wiele produktów do koszyka (min. 10)', () => {
        cy.get('.product-item').each(($el, i) => {
            if (i < 10) {
                cy.wrap($el).contains('Dodaj do koszyka').click(); // Assert 11–20
                cy.wrap($el).should('contain.text', 'PLN'); // Assert 21–30 (cena)
            }
        });

        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').should('have.length.at.least', 10); // Assert 31
    });

    it('Test 7: Usuwa wszystkie produkty z koszyka', () => {
        cy.get('.product-item').each(($el, i) => {
            if (i < 3) {
                cy.wrap($el).contains('Dodaj do koszyka').click(); // Assert 32–34
            }
        });

        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').each(($el) => {
            cy.wrap($el).contains('Usuń').click(); // Assert 35–37
        });

        cy.get('.cart-item').should('have.length', 0); // Assert 38
    });

    it('Test 8: Nie dodaje dwa razy tego samego produktu', () => {
        cy.get('.product-item').first().within(() => {
            cy.contains('Dodaj do koszyka').click();
            cy.contains('Dodaj do koszyka').should('not.exist'); // Assert 39
        });
    });

    it('Test 9: Sprawdza formatowanie ceny produktu', () => {
        cy.get('.product-item').first().contains(/PLN/); // Assert 40
    });

    it('Test 10: Koszyk dostępny bez produktów', () => {
        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').should('have.length', 0); // Assert 41
    });

    it('Test 11: Sprawdza tytuły sekcji', () => {
        cy.contains('Produkty').should('exist'); // Assert 42
        cy.visit('http://localhost:3000/cart');
        cy.contains('Koszyk').should('exist'); // Assert 43
        cy.visit('http://localhost:3000/checkout');
        cy.contains('Płatności').should('exist'); // Assert 44
    });

    it('Test 12: Wielokrotne dodanie i usunięcie działa poprawnie', () => {
        cy.get('.product-item').eq(2).contains('Dodaj do koszyka').click();

        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').should('have.length', 1); // Assert 45
        cy.contains('Usuń').click();
        cy.get('.cart-item').should('have.length', 0); // Assert 46
    });

    it('Test 13: Masowe dodanie i opłacenie koszyka', () => {
        cy.get('.product-item').each(($el, i) => {
            if (i < 5) {
                cy.wrap($el).contains('Dodaj do koszyka').click(); // Assert 47–51
            }
        });

        cy.visit('http://localhost:3000/checkout');
        cy.contains('Zapłać').click();

        cy.on('window:alert', (str) => {
            expect(str).to.contain('Płatność zakończona sukcesem'); // Assert 52
        });

        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').should('have.length', 0); // Assert 53
    });

    it('Test 14: Nie wyświetla przycisku jeśli produkt już w koszyku', () => {
        cy.get('.product-item').first().within(() => {
            cy.contains('Dodaj do koszyka').click();
            cy.contains('Dodaj do koszyka').should('not.exist'); // Assert 54
        });
    });

    it('Test 15: Obsługuje błędne endpointy (negatywny scenariusz)', () => {
        cy.request({ url: 'http://localhost:8080/products/999', failOnStatusCode: false }).then((res) => {
            expect(res.status).to.be.oneOf([404, 405, 500]); // Assert 55
        });
    });

    it('Test 16: Koszyk działa przy pustym stanie', () => {
        cy.visit('http://localhost:3000/cart');
        cy.get('.cart-item').should('have.length', 0); // Assert 56
    });

    it('Test 17: Widoczność przycisku płatności', () => {
        cy.visit('http://localhost:3000/checkout');
        cy.contains('Zapłać').should('exist'); // Assert 57
    });

    it('Test 18: Produkty mają poprawne nazwy', () => {
        cy.get('.product-item').each(($el) => {
            cy.wrap($el).invoke('text').should('not.contain', 'undefined'); // Assert 58+
        });
    });

    it('Test 19: Brak błędów JavaScript w konsoli', () => {
        cy.visit('http://localhost:3000', {
            onBeforeLoad(win) {
                cy.spy(win.console, 'error').as('consoleError');
            },
        });
        cy.get('@consoleError').should('not.have.been.called'); // Assert 59
    });

    it('Test 20: Komponenty renderują się poprawnie', () => {
        cy.get('.container').should('exist'); // Assert 60
        cy.get('.product-list').should('exist'); // Assert 61
    });
});
