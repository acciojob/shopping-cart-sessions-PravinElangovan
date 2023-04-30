const products = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 },
        { id: 3, name: "Product 3", price: 30 },
        { id: 4, name: "Product 4", price: 40 },
        { id: 5, name: "Product 5", price: 50 },
      ];

      // DOM elements
      const productList = document.getElementById("product-list");
      const cartList = document.getElementById("cart-list");
      const clearCartBtn = document.getElementById("clear-cart-btn");

      // Add event listeners
      productList.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart-btn")) {
          addToCart(parseInt(event.target.dataset.id));
        }
      });

      clearCartBtn.addEventListener("click", clearCart);

      // Render product list
      function renderProducts() {
        products.forEach((product) => {
          const li = document.createElement("li");
          li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
          productList.appendChild(li);
        });
      }

      // Render cart list
      function renderCart() {
        cartList.innerHTML = "";
        const cart = getCart();
        for (const [productId, quantity] of Object.entries(cart)) {
          const product = products.find((p) => p.id === parseInt(productId));
          const li = document.createElement("li");
          li.innerHTML = `${product.name} x ${quantity} - $${product.price * quantity} <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
          cartList.appendChild(li);
        }
      }

      // Get cart data from session storage
      function getCart() {
        const cart = sessionStorage.getItem("cart");
        return cart ? JSON.parse(cart) : {};
      }

      // Update cart data in session storage
      function updateCart(cart) {
        sessionStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }

      // Add item to cart
      function addToCart(productId) {
        const cart = getCart();
        cart[productId] = (cart[productId] || 0) + 1;
        updateCart(cart);
      }

      // Remove item from cart
      // Remove item from cart
function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  updateCart(cart);
  renderCart();
}


      // Clear cart
      function clearCart() {
        sessionStorage.removeItem("cart");
        renderCart();
      }

      // Initial render
      renderProducts();
      renderCart();