 // Panier (stocké dans localStorage)
        // let cart = JSON.parse(localStorage.getItem('cart')) || [];
           let cart =[];
        // Sauvegarder les produits dans localStorage
        // function saveProducts() {
        //     localStorage.setItem('products', JSON.stringify(products));
        // }

        // // Fonctions utilitaires
        // function saveCart() {
        //     localStorage.setItem('cart', JSON.stringify(cart));
        //     updateCartDisplay();
        // }

            function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            }


        // function updateCartDisplay() {
        //     const cartCount = document.getElementById('cartCount');
        //     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        //     cartCount.textContent = totalItems;
        // }
         function addToCart(productId) {
              const existingItem = cart.find(item => item.id === productId);
              if (existingItem) {
                  existingItem.quantity += 1;
              } else {
                  cart.push({ id: productId, quantity: 1 });
              }
              saveCart();
              showNotification('Produit ajouté au panier !');
              // Animation du bouton
              if (event && event.target.classList.contains('add-to-cart-btn')) {
                  const button = event.target;
                  button.textContent = '✓ Ajouté !';
                  button.classList.add('added');
                  setTimeout(() => {
                      button.textContent = 'Ajouter au panier';
                      button.classList.remove('added');
                  }, 2000);
              }
              displayCart(); // Mettre à jour l'affichage du panier si besoin
          }

        // function showNotification(message) {
        //     const notification = document.getElementById('notification');
        //     notification.textContent = message;
        //     notification.classList.add('show');
            
        //     setTimeout(() => {
        //         notification.classList.remove('show');
        //     }, 3000);
        // }

        function showView(viewName) {
            // Cacher toutes les vues
            document.querySelectorAll('.view').forEach(view => {
                view.classList.remove('active');
            });
            
            // Mettre à jour les boutons de navigation
            document.querySelectorAll('.nav-links button').forEach(btn => {
                btn.classList.remove('active');
            });
            if (event && event.target.tagName === 'BUTTON') {
                event.target.classList.add('active');
            }
            
            // Afficher la vue sélectionnée
            document.getElementById(viewName).classList.add('active');
            
            // Mettre à jour l'affichage selon la vue
            if (viewName === 'products') {
                displayProducts();
            } else if (viewName === 'cart') {
                displayCart();
            } else if (viewName === 'home') {
                displayFeaturedProducts();
            }
        }

        function displayFeaturedProducts(category = 'all') {
            const featuredProducts = document.getElementById('featuredProducts');
            let filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
            const featuredItems = filteredProducts.slice(0, 6); // 6 premiers produits
            
            featuredProducts.innerHTML = featuredItems.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}GNF</div>
                    <div class="product-rating">★★★★★</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Ajouter au panier</button>
                </div>
            `).join('');
        }

        function filterFeaturedProducts(category) {
            // Mettre à jour les boutons de filtre dans l'accueil
            document.querySelectorAll('.navbar-green .category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            if (event && event.target.classList.contains('category-btn')) {
                event.target.classList.add('active');
            }
            
            displayFeaturedProducts(category);
        }

        function displayProducts(category = 'all') {
            const productsGrid = document.getElementById('productsGrid');
            const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
            
            productsGrid.innerHTML = filteredProducts.map(product => `
                <div class="product-card" draggable="true" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}GNF</div>
                    <div class="product-rating">★★★★★</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Ajouter au panier</button>
                </div>
            `).join('');

            // Ajouter les événements de drag and drop
            addDragEvents();
        }

        function filterProducts(category) {
            // Mettre à jour les boutons de filtre
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            displayProducts(category);
        }

        function displayCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Votre panier est vide</div>';
                cartTotal.textContent = '0GNF';
                return;
            }
            
            let total = 0;
            cartItems.innerHTML = cart.map(item => {
                const product = products.find(p => p.id === item.id);
                // Convertir le prix en nombre (retirer les espaces et convertir en float)
                const priceNumber = parseFloat(String(product.price).replace(/\s/g, ''));
                const itemTotal = priceNumber * item.quantity;
                total += itemTotal;
                return `
                    <div class="cart-item">
                        <div class="item-info">
                            <div class="item-name">${product.name}</div>
                            <div class="item-price">${product.price}GNF × ${item.quantity} = ${itemTotal.toLocaleString()}GNF</div>
                        </div>
                        <div class="item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Supprimer</button>
                    </div>
                `;
            }).join('');
            cartTotal.textContent = total.toLocaleString() + 'GNF';
        }

        function addToCart(productId) {
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            
            saveCart();
            showNotification('Produit ajouté au panier !');
            
            // Animation du bouton
            if (event && event.target.classList.contains('add-to-cart-btn')) {
                const button = event.target;
                button.textContent = '✓ Ajouté !';
                button.classList.add('added');
                setTimeout(() => {
                    button.textContent = 'Ajouter au panier';
                    button.classList.remove('added');
                }, 2000);
            }
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            displayCart();
            showNotification('Produit supprimé du panier !');
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                item.quantity += change;
                
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    saveCart();
                }
            }
        }

        function addNewProduct() {
            const name = document.getElementById('productName').value;
            const price = parseFloat(document.getElementById('productPrice').value);
            const category = document.getElementById('productCategory').value;
            const image = document.getElementById('productImage').value || `https://placehold.co/180x180/27ae60/white?text=${encodeURIComponent(name.substring(0, 10))}`;
            
            if (!name || !price || price <= 0) {
                showNotification('Veuillez remplir tous les champs correctement !');
                return;
            }
            
            const newProduct = {
                id: Date.now(), // ID unique basé sur le timestamp
                name: name,
                price: price,
                category: category,
                image: image
            };
            
            products.push(newProduct);
            saveProducts();
            showNotification('Produit ajouté avec succès !');
            
            // Réinitialiser le formulaire
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productImage').value = '';
        }

        // Gestion du drag and drop
        function addDragEvents() {
            const productCards = document.querySelectorAll('.product-card');
            const dropZone = document.getElementById('dropZone');
            
            productCards.forEach(card => {
                card.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', this.dataset.id);
                    this.style.opacity = '0.7';
                    this.style.transform = 'rotate(5deg) scale(1.05)';
                });
                
                card.addEventListener('dragend', function() {
                    this.style.opacity = '1';
                    this.style.transform = 'none';
                });
            });
            
            dropZone.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('dragover');
            });
            
            dropZone.addEventListener('dragleave', function() {
                this.classList.remove('dragover');
            });
            
            dropZone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('dragover');
                
                const productId = parseInt(e.dataTransfer.getData('text/plain'));
                addToCart(productId);
                
                // Animation de feedback visuel
                this.style.background = 'rgba(46, 204, 113, 0.5)';
                setTimeout(() => {
                    this.style.background = '';
                }, 1000);
            });
        }

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            updateCartDisplay();
            displayProducts();
            displayFeaturedProducts();
            addDragEvents();
            saveProducts(); // Sauvegarder les produits initiaux
        });

        // Exposer les fonctions globales nécessaires
        window.showView = showView;
        window.filterProducts = filterProducts;
        window.filterFeaturedProducts = filterFeaturedProducts;
        window.updateQuantity = updateQuantity;
        window.removeFromCart = removeFromCart;
        window.addToCart = addToCart;
        window.addNewProduct = addNewProduct;
