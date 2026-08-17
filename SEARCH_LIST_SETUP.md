# MK Crackers — Searchable Price List

This version matches the requested price-list style:
- Image
- Product Name
- Content
- Actual Price
- Price
- Quantity
- Total

The complete cracker list is grouped by category. Search filters the list immediately, so typing a cracker name shows only matching rows.

Quantity can be entered directly or changed with +/- buttons. Each row calculates its own total and the enquiry cart calculates total quantity and total amount.

The five Gift Boxes remain available from the header.

The Actual Price column is intentionally shown as `—` when no separate MRP/actual price exists in the supplied MK price list. This avoids inventing prices. If you provide actual prices later, they can be added to `products.js`.

Google Sheet:
Set `googleSheetsWebAppUrl` in `public/app.js` to your Apps Script `/exec` URL.
