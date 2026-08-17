# MK Crackers Gift Box Flow

1. Customer opens MK Crackers website.
2. Customer clicks **Gift Boxes**.
3. A dedicated Gift Box page shows exactly five:
   - Yuvi 21 Items — ₹350
   - Rohit 30 Items — ₹550
   - Sachin 35 Items — ₹600
   - Kohli 40 Items — ₹730
   - Dhoni 51 Items — ₹1,100
4. Customer clicks any one box.
5. That opens a dedicated cracker-selection list for that box.
6. Customer searches the list and clicks **Add to Cart** for any cracker they want.
7. The same cart is shared with the main MK Crackers website using localStorage.
8. Customer clicks **Go to Enquiry Cart**.
9. Cart shows selected products, quantities and total amount.
10. Customer enters details and submits; the existing Google Sheet enquiry flow handles the order.

Note: the five box prices/items come from the supplied price list. The individual cracker list inside each box is currently the full MK Crackers catalogue because the exact contents of each branded gift box were not supplied. Once exact contents for Yuvi/Rohit/Sachin/Kohli/Dhoni are provided, each list can be restricted to those exact crackers.
