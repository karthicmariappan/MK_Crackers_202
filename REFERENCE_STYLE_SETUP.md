# MK Crackers — Reference-style catalogue setup

This version is inspired by the public Jeyanarpavi Crackers price-list structure: category sections, product code, product name, content, price, quantity and amount. It does not copy their source code or branding.

## Included
- All 161 products from the current MK Crackers price-list data
- Category-wise price-list tables
- Product code
- Product name
- Content/pack
- Your supplied price
- Quantity +/-
- Per-product amount
- Search
- Category filter
- Price sorting
- Five Gift Boxes
- Running total quantity and total amount
- Customer enquiry form
- Google Apps Script / Google Sheet integration

## Important
The public reference price list uses a rate/discount/final-rate presentation. This MK version uses the prices already supplied for MK Crackers as the customer price, rather than inventing an MRP or discount.

## To connect your Google Sheet
Open `public/app.js` and replace:
`PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`
with your current Google Apps Script `/exec` URL.

Then deploy/update the Apps Script using `google_apps_script.gs`.

## GitHub Pages
Upload everything inside `public/` to the repository root (or configure Pages to use that folder). Do not upload private API credentials.

## WhatsApp
The Google Sheet enquiry flow is included. Automatic WhatsApp delivery to +91 96296 05422 requires an official WhatsApp Business/Meta API integration; do not place API secrets in the static GitHub files.
