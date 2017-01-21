// 1. creating and executing function
function MyFunction(){
  Logger.log("Hello Ivan");
}
// To trigger the function: select MyFunction from the ["Select Function"] drop down menu and press play
// To see what Logger.log() did: press ctrl+enter (windows) / cmd+enter (mac) 
// ::Explanation::
// function >> creates a function
// MyFunction() >> Gives the function a name
// { ... } >> Is all the code MyFunction will run
// Logger.log("message") is Google's function to print the message in the window

// CRAFTING A MESSAGE--------------------------------------------------

// 2. creating, assigning and using a variable
function SayMessage(){
  var message;
  message = "Hello";
  Logger.log(message); // prints: "Hello"
}
// var message; >> creates a variable called message
   // ; is a full stop to indicate the end of a task
// message = "Hello"; >> the value of message is "Hello"
// now message will actually mean "Hello"


// 3. adding up variables
function SayHelloTo(){
  var message = "Thanks for getting in touch ";
  var name = "Ivan";
  message = message + name;
  Logger.log(message); // prints: "Thanks for getting in touch Ivan"
}

// SENDING EMAIL--------------------------------------------------

// 4. sending an email
function EasySendEmail() {
  var name = "Ivan";
  var recipient = "mr.ivan.tan@gmail.com";
  var subject = "Sent from Google Apps!";
  var message = "Thanks for getting in touch " + name;
  
  // https://developers.google.com/apps-script/reference/mail/mail-app#sendEmail(String,String,String)
  MailApp.sendEmail(recipient, subject, message);
}
// final message:"Thanks for getting in touch Ivan"


// 5. crafting a message object
function LogObjectMessage(){
  var name = "Ivan";
  var messageObject = {
    to: "mr.ivan.tan@gmail.com",
    subject: "Open Me",
    htmlBody: "Thanks for getting in touch " + name
  }
  Logger.log("Sending: " + messageObject.htmlBody + " to: " + messageObject.to + " with title: " + messageObject.subject);
  // LOGGER: Sending: "hanks for getting in touch Ivan to: mr.ivan.tan@gmail.com with title: Open Me
  MailApp.sendEmail(messageObject);
}
// creating javascript object: object = {key1:value1, key2.value2}
// using javascript object: object.key1 == value1
// think of object as a variable with its own variables in it.


// EMAIL CUSTOM MESSAGE USING SPREADSHEET DATA--------------------------------------------------

// 6. referencing spreadsheet
function SendEmailToFirstEntry(){
  // https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getactivesheet
  var sheet = SpreadsheetApp.getActiveSheet();
  // https://developers.google.com/apps-script/reference/spreadsheet/sheet#getRange(Integer,Integer)
  // https://developers.google.com/apps-script/reference/spreadsheet/range#getvalue
  var name = sheet.getRange(2, 2).getValue(); // (row, column)
  var email = sheet.getRange(2, 3).getValue(); // (row, column)
  
  var html = "<h1>Thanks for getting in touch " + name + "</h1>";
  
  // https://developers.google.com/apps-script/reference/mail/mail-app#sendemailmessage
  var messageObject = {
    to: email,
    subject: "Sent from Google Apps!",
    htmlBody: html
  };
  MailApp.sendEmail(messageObject);
}



// 7. Looping through names
function LogNames(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var nameCol = 2;
  
  var currentRow = 2;
  var lastRow = sheet.getLastRow();
  
  while(currentRow <= lastRow){
    var name = sheet.getRange(currentRow, nameCol).getValue();
    Logger.log(name);
    currentRow = currentRow + 1;
  }
  
}
// while(condition==true){ do code }
// repeat {codes} until (condition) is false


// 7.e exercise! Looping through names backwards
function LogNamesReverse(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var nameCol = 2;
  
  var currentRow = sheet.getLastRow();
  var firstRow = 2;
  
  while(currentRow >= firstRow){
    var name = sheet.getRange(currentRow, nameCol).getValue();
    Logger.log(name);
    currentRow = currentRow - 1;
  }
}


// 8. Sending personalised message to each email
function SendEmails(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var nameCol = 2;
  var emailCol = 3;
  
  var currentRow = 2;
  var lastRow = sheet.getLastRow();
  
  while(currentRow <= lastRow){
    var name = sheet.getRange(currentRow, nameCol).getValue();
    var email = sheet.getRange(currentRow, emailCol).getValue();
    var html = "<h1>Thanks for getting in touch " + name + "</h1>";
    
    var messageObject = {
      to: email,
      subject: "Sent from Google Apps!",
      htmlBody: html
    };
    Logger.log("\n to:" + messageObject.to + "\n subject:" + messageObject.subject + "\n message:" + messageObject.htmlBody);
    MailApp.sendEmail(messageObject);
    
    currentRow = currentRow + 1;
  }
}


// 9. Sending emails conditionally
function SendToTester(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var nameCol = 2;
  var emailCol = 3;
  var testerEmail = "mr.ivan.tan@gmail.com";
  
  var currentRow = 2;
  var lastRow = sheet.getLastRow();
  
  while(currentRow <= lastRow){
    var name = sheet.getRange(currentRow, nameCol).getValue();
    var email = sheet.getRange(currentRow, emailCol).getValue();
    var html = "<h1>Hello " + name + "</h1>";
    
    var messageObject = {
      to: email,
      subject: "Sent from Google Apps!",
      htmlBody: html
    };
    
    if(email == testerEmail){
      MailApp.sendEmail(messageObject);
    } else {
      Logger.log("skipped email:" + email);
    }
    currentRow = currentRow + 1;
  }
}
// if(condition == true){ do code A } else { do code B }
// if the (brackets) is (true) do code A
// if the (brackets) is (false) do code B


// 10. Create custom menu button
// https://developers.google.com/apps-script/guides/menus
function LoadUi() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Send Emails')
      .addItem('Send To All', 'SendEmails')
      .addItem('Send To Tester', 'SendToTester')
      .addToUi();
}
// Resources > Current project's triggers
   // run > LoadUi / from spreadsheet / on open

// Publish > deploy as web app > project version new > create/update



