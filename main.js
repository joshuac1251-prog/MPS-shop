window.addToCart = function(productName, price) {
  // 1. Save product to cart
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push({name: productName, price: price});
  localStorage.setItem('cart', JSON.stringify(cart));

  // 2. Fire Meta Pixel AddToCart event with proper parameters
  if (typeof fbq === 'function') {
    fbq('track', 'AddToCart', {
      content_ids: [productName],
      content_type: 'product',
      contents: [{id: productName, quantity: 1, item_price: price}],
      value: price,
      currency: 'MYR'
    });
  } else {
    console.warn('Pixel not loaded yet.');
  }

  // 3. Show confirmation
  alert(productName + ' added to cart!');

  // 4. Redirect to checkout after short delay so Pixel fires
  setTimeout(() => {
    window.location.href = 'checkout.html';
  }, 200);
};
