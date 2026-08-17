# MK Crackers Search Fix

The search problem was caused by `products.js` declaring `const PRODUCTS` while `app.js` was reading `window.PRODUCTS`. The fixed version explicitly exposes the catalogue as `window.PRODUCTS`.

The search is also normalized so terms such as `kuruvi`, `KURUVI`, and product names containing spaces/punctuation are matched reliably.

IMPORTANT: upload **all files inside `public/`**, including `products.js`, to GitHub Pages. `index.html`, `app.js`, and `products.js` must be in the same folder.

A `search-test.html` file is included. Opening it should show the number of products loaded.
