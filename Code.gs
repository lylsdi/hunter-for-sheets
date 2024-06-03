
//Ajout du add-On dans le menu extensions et ouverture 
function onOpen() {
SpreadsheetApp.getUi().createAddonMenu().addItem('Open','addSideBar').addToUi();
}

function addSideBar(){
  var sidebar=HtmlService.createHtmlOutputFromFile('sideBar').setTitle('My sidebar');
  SpreadsheetApp.getUi().showSidebar(sidebar);
}

//Récupération de la clé d'API et son stockage dans le cache
function keyHandle(key){
 var API_KEY=key;
 CacheService.getScriptCache().put("Key",API_KEY)
 Logger.log(API_KEY);
}

//Fonction FindEmail + gestion des exceptions 

function FindEmail(A,B,C){
  const url='https://api.hunter.io/v2/email-finder?company=';
  var API_KEY= CacheService.getScriptCache().get("Key");
  let req= url+C+ '&first_name='+A+'&last_name='+B+'&api_key='+API_KEY;
   try{let resp=UrlFetchApp.fetch(req);
  let content=JSON.parse(resp.getContentText());
     if (content.data.email) {
      return content.data.email;
    } else {
    
      return "No email found for the provided parameters.";
    }}
  catch(err){
   if(err.message.includes('wrong_params')){return "A required parameter is missing."}
   else if(err.message.includes('invalid_first_name')){ return "The supplied first name is invalid.";}
   
   else if(err.message.includes('invalid_last_name')){ return "The supplied last name is invalid.";}
   else if(err.message.includes('invalid_full_name')){ return "The supplied full name is invalid.";}
   else if(err.message.includes('invalid_company')){ return "The domain name is invalid, has no MX record or its owner has asked us to stop the processing of the associated data. ";}


}
}
  
