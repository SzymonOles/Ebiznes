import React from 'react';
import { mount } from '@cypress/react';
import { CartProvider, useCart } from '../../src/context/CartContext';

// Dummy component to access cart context
const CartTester = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();

    return (
        <div>
            <p data-cy="cart-length">{cart.length}</p>
            <button onClick={() => addToCart({ id: 1, name: 'Item 1' })}>Add 1</button>
            <button onClick={() => addToCart({ id: 2, name: 'Item 2' })}>Add 2</button>
            <button onClick={() => removeFromCart(1)}>Remove 1</button>
            <button onClick={clearCart}>Clear</button>
            <ul>
                {cart.map(item => (
                    <li key={item.id} data-cy={`cart-item-${item.id}`}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

describe('CartProvider context', () => {
    beforeEach(() => {
        localStorage.clear();
        mount(
            <CartProvider>
                <CartTester />
            </CartProvider>
        );
    });

    it('initial cart is empty', () => {
        cy.get('[data-cy=cart-length]').should('have.text', '0'); // 1
    });

    it('adds items to cart', () => {
        cy.contains('Add 1').click();
        cy.get('[data-cy=cart-length]').should('have.text', '1'); // 2
        cy.get('[data-cy=cart-item-1]').should('exist'); // 3

        cy.contains('Add 2').click();
        cy.get('[data-cy=cart-length]').should('have.text', '2'); // 4
        cy.get('[data-cy=cart-item-2]').should('exist'); // 5
    });

    it('removes item from cart', () => {
        cy.contains('Add 1').click();
        cy.contains('Add 2').click();
        cy.get('[data-cy=cart-length]').should('have.text', '2'); // 6

        cy.contains('Remove 1').click();
        cy.get('[data-cy=cart-length]').should('have.text', '1'); // 7
        cy.get('[data-cy=cart-item-1]').should('not.exist'); // 8
        cy.get('[data-cy=cart-item-2]').should('exist'); // 9
    });

    it('clears cart', () => {
        cy.contains('Add 1').click();
        cy.contains('Add 2').click();
        cy.get('[data-cy=cart-length]').should('have.text', '2'); // 10

        cy.contains('Clear').click();
        cy.get('[data-cy=cart-length]').should('have.text', '0'); // 11
        cy.get('[data-cy=cart-item-1]').should('not.exist'); // 12
        cy.get('[data-cy=cart-item-2]').should('not.exist'); // 13
    });

    it('persists cart to localStorage', () => {
        cy.contains('Add 1').click();
        cy.contains('Add 2').click();
        cy.window().then(win => {
            const stored = JSON.parse(win.localStorage.getItem('cart'));
            expect(stored).to.have.length(2); // 14
            expect(stored[0].id).to.eq(1); // 15
            expect(stored[0].name).to.eq('Item 1'); // 16
            expect(stored[1].id).to.eq(2); // 17
        });
    });

    it('loads cart from localStorage', () => {
        // Add to localStorage manually
        cy.window().then(win => {
            win.localStorage.setItem(
                'cart',
                JSON.stringify([
                    { id: 1, name: 'Item 1' },
                    { id: 2, name: 'Item 2' },
                ])
            );
        });

        // Remount
        mount(
            <CartProvider>
                <CartTester />
            </CartProvider>
        );

        cy.get('[data-cy=cart-length]').should('have.text', '2'); // 18
        cy.get('[data-cy=cart-item-1]').should('exist'); // 19
        cy.get('[data-cy=cart-item-2]').should('exist'); // 20
    });

    it('adding multiple times increases count correctly', () => {
        cy.contains('Add 1').click().click();
        cy.get('[data-cy=cart-length]').should('have.text', '2'); // 21
    });

    it('removing non-existent item doesn’t crash', () => {
        cy.contains('Remove 1').click();
        cy.get('[data-cy=cart-length]').should('have.text', '0'); // 22
    });

    it('clearCart works after multiple operations', () => {
        cy.contains('Add 1').click();
        cy.contains('Add 2').click();
        cy.contains('Remove 1').click();
        cy.get('[data-cy=cart-length]').should('have.text', '1'); // 23
        cy.contains('Clear').click();
        cy.get('[data-cy=cart-length]').should('have.text', '0'); // 24
    });

    it('re-adding after clear works', () => {
        cy.contains('Add 1').click();
        cy.contains('Clear').click();
        cy.contains('Add 2').click();
        cy.get('[data-cy=cart-length]').should('have.text', '1'); // 25
        cy.get('[data-cy=cart-item-2]').should('exist'); // 26
    });
});
