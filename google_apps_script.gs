const SHEET_NAME = "Orders";

function doGet(){
  return ContentService.createTextOutput(JSON.stringify({ok:true,service:"MK Crackers"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  try{
    const p=e.parameter||{};
    const ss=SpreadsheetApp.getActiveSpreadsheet();
    let sh=ss.getSheetByName(SHEET_NAME);
    if(!sh) sh=ss.insertSheet(SHEET_NAME);

    if(sh.getLastRow()===0){
      sh.appendRow([
        "Enquiry ID","Received At","Customer Name","Mobile","WhatsApp",
        "Location","Pincode","Preferred Contact","Products",
        "Total Quantity","Total Amount","Notes","Status"
      ]);
    }

    let products=[];
    try{products=JSON.parse(p.products||"[]")}catch(err){products=[]}

    let details=[];
    products.forEach(x=>{
      const qty=Number(x.qty)||0;
      const price=Number(x.price)||0;
      details.push(`${x.name} × ${qty} @ ₹${price} = ₹${qty*price}`);
    });

    sh.appendRow([
      p.enquiryId||"",
      p.receivedAt||new Date(),
      p.name||"",
      p.mobile||"",
      p.whatsapp||p.mobile||"",
      p.location||"",
      p.pincode||"",
      p.contactPreference||"",
      details.join("\n"),
      Number(p.totalQuantity)||0,
      Number(p.totalAmount)||0,
      p.notes||"",
      "NEW"
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      ok:true,
      enquiryId:p.enquiryId,
      totalQuantity:Number(p.totalQuantity)||0,
      totalAmount:Number(p.totalAmount)||0
    })).setMimeType(ContentService.MimeType.JSON);

  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}