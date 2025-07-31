"use strict";

        // Données des produits (stockés dans localStorage)  
        let products = JSON.parse(localStorage.getItem('products')) || [
            { id: 1, name: "Smartphone Écologique", price: "30 000 000", category: "electronics", image: "phone.jpg"},
            { id: 2, name: "Casque Audio Verte", price: "15 000 000", category: "electronics", image: "casque.jpg" },
            { id: 3, name: "Montre Connectée", price: "10 000 000", category: "electronics", image: "montre.jpg" },
            { id: 4, name: "T-Shirt Bio", price: "25 000 000", category: "clothing", image: "T-Sh.jpg" },
            { id: 5, name: "Jeans Durable", price: "19 000 000", category: "clothing", image: "jean.jpg" },
            { id: 6, name: "Lampe LED", price: "5 000 000", category: "home", image: "lampe.jpg" },
            { id: 7, name: "Coussin Naturel", price: "14 000 000", category: "home", image: "coussin.jpeg" },
            { id: 8, name: "Enceinte Solaire", price: "5 000 000", category: "electronics", image: "anceinte.jpg" }
        ]; // Fonction utilitaire pour tester la disponibilité de localStorage
            function isLocalStorageAvailable() {
            try {
                const testKey = '__test__';
                window.localStorage.setItem(testKey, '1');
                window.localStorage.removeItem(testKey);
                return true;
            } catch (e) {
                return false;
            }
        }

        let products = defaultProducts;
        if (isLocalStorageAvailable()) {
            try {
                const stored = localStorage.getItem('products');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        products = parsed;
                    } else {
                        products = defaultProducts;
                        localStorage.setItem('products', JSON.stringify(defaultProducts));
                    }
                } else {
                    localStorage.setItem('products', JSON.stringify(defaultProducts));
                }
            } catch (e) {
                products = defaultProducts;
                localStorage.setItem('products', JSON.stringify(defaultProducts));
            }
        }
