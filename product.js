"use strict";

        // Données des produits (stockés dans localStorage)  
        let products = JSON.parse(localStorage.getItem('products')) || [
            { id: 1, name: "Smartphone Écologique", price: "30 000 000", category: "electronics", image: "image/phone.jpg"},
            { id: 2, name: "Casque Audio Verte", price: "15 000 000", category: "electronics", image: "image/casque.jpg" },
            { id: 3, name: "Montre Connectée", price: "10 000 000", category: "electronics", image: "image/montre.jpg" },
            { id: 4, name: "T-Shirt Bio", price: "25 000 000", category: "clothing", image: "image/T-Sh.jpg" },
            { id: 5, name: "Jeans Durable", price: "19 000 000", category: "clothing", image: "image/jean.jpg" },
            { id: 6, name: "Lampe LED", price: "5 000 000", category: "home", image: "image/lampe.jpg" },
            { id: 7, name: "Coussin Naturel", price: "14 000 000", category: "home", image: "image/coussin.jpg" },
            { id: 8, name: "Enceinte Solaire", price: "5 000 000", category: "electronics", image: "image/anceinte.jpg" }
        ];
