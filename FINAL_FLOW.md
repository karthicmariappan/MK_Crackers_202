# MK Crackers final requested flow

## Gift boxes
Exactly five gift boxes are highlighted:
1. Yuvi 21 items — ₹350
2. Rohit 30 items — ₹550
3. Sachin 35 items — ₹600
4. Kohli 40 items — ₹730
5. Dhoni 51 items — ₹1,100

Clicking a gift box (or Add to Cart) adds that complete gift box as one cart item.

## Celebration collections
- Family Celebration → View Crackers → shows a product list from the price list → Add to Enquiry
- Budget Celebration → View Crackers → shows a product list from the price list → Add to Enquiry
- Premium Celebration → View Crackers → shows a product list from the price list → Add to Enquiry

The collection category rules are editable in `public/collections.js`.

## Cart
Cart stores:
- Product name
- Price
- Quantity
- Pack/content/category where available

The customer sees:
- Total quantity
- Total amount

On submit, the website sends the cart, total quantity and total amount to Google Apps Script.
