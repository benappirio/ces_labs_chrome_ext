var client;
var sessionId;
var entityId;
var objectType;
var currURL;
var acct;
var conn;
var rootURL;

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    currURL = tabs[0].url;
    rootURL = getRootURL(currURL);
    setEntity(currURL);
    console.log(currURL);
    console.log(rootURL);
    console.log(entityId);
    console.log(objectType);
    getSessionID(currURL);
  });
});

function getSessionID(u) {
  chrome.cookies.get({"url":currURL,"name":"sid"}, 
  	function(cookie){
	  sessionId = cookie.value;
	  drawPage();
	}
  );
}

function drawPage() {
  if (objectType === 'Sprint' || objectType === 'Story' || objectType === 'Issue') {
    document.getElementById('ptxt').style.display = "none";
    document.getElementById("buildDocsLnk").style.display = "block";
    document.getElementById('buildDocsLnk').onclick = function () {
      _gaq.push(['_trackEvent', 'URLRedirects', 'buildDocsLnk','deployDocsVF']);
      newURL = rootURL + 'apex/deployDocs?sid=' + entityId;
      chrome.tabs.create({active: true, url: newURL});
    };
  }
  if (objectType === 'Job Result') {
    client = new forcetk.Client();
    client.setSessionToken(sessionId, 'v27.0', rootURL.slice(0,-1));
    client.query("SELECT Connection_Rel__c,Connection_Rel__r.Account_Id__c FROM CMC_Job_Result__c WHERE ID = '{0}'".replace("{0}",entityId), function(response){
      acct= response.records[0].Connection_Rel__r.Account_Id__c;
      conn = response.records[0].Connection_Rel__c;
    });
    document.getElementById("jrheader").style.display = "block";
    document.getElementById("clsandtrgrpt").style.display = "block";
    document.getElementById('clsandtrgrpt').onclick = function () {	
      _gaq.push(['_trackEvent', 'URLRedirects', 'clsandtrgrpt','deployDocsVF']);
      newURL = rootURL + '00O50000003RYOs?pv0=' + entityId;
      chrome.tabs.create({active: false, url: newURL});
    };
    document.getElementById("vfandjsrpt").style.display = "block";
    document.getElementById('vfandjsrpt').onclick = function () {	
      _gaq.push(['_trackEvent', 'URLRedirects', 'vfandjsrpt','deployDocsVF']);
      newURL = rootURL + '00O50000003RYOx?pv0=' + entityId;
      chrome.tabs.create({active: false, url: newURL});
    };
    document.getElementById("objrpt").style.display = "block";
    document.getElementById('objrpt').onclick = function () {	
      _gaq.push(['_trackEvent', 'URLRedirects', 'objrpt','deployDocsVF']);
      newURL = rootURL + '00O50000003RYP7?pv0=' + entityId;
      chrome.tabs.create({active: false, url: newURL});
    };
    document.getElementById("hltmetricrpt").style.display = "block";
    document.getElementById('hltmetricrpt').onclick = function () {	
      _gaq.push(['_trackEvent', 'URLRedirects', 'hltmetricrpt','deployDocsVF']);
      newURL = rootURL + '00O50000003SI1B?pv0=' + entityId;
      chrome.tabs.create({active: false, url: newURL});
    };
    document.getElementById("tstdandfrpt").style.display = "block";
    document.getElementById('tstdandfrpt').onclick = function () {	
      _gaq.push(['_trackEvent', 'URLRedirects', 'tstdandfrpt','deployDocsVF']);
      newURL = rootURL + '00O50000003RYOT?pv0=' + entityId;
      chrome.tabs.create({active: false, url: newURL});
    };
    document.getElementById("codecvgrpt").style.display = "block";
    document.getElementById('codecvgrpt').onclick = function () {	
      _gaq.push(['_trackEvent', 'URLRedirects', 'codecvgrpt','deployDocsVF']);
      newURL = rootURL + '00O50000003qUwa?pv0=' + entityId;
      chrome.tabs.create({active: false, url: newURL});
    };
    document.getElementById("top10codecvgtargets").style.display = "block";
    document.getElementById("top10codecvgtargets").onclick = function () {
      _gaq.push(['_trackEvent', 'URLRedirects', 'top10codecvgtargets','deployDocsVF']);
      //newURL = "https://cmc.appirio.net/cmc/home_ce.html#/ce/accounts/" + acct + "/environments/" + conn  + "/analysis";
      var cmcRootURL = rootURL.indexOf('full')==-1?'https://cmc.appirio.net/':'https://full.cmc.appirio.net/';
      newURL = cmcRootURL + 'sfdc-login?sf-session-id=' + sessionId + '&success-url=' + cmcRootURL + 'cmc/home_ce.html#/ce/accounts/' + 
                              acct + '/environments/' + conn + '/analysis';
      chrome.tabs.create({active: false, url: newURL});
    }
  }
}

function getRootURL(url){
    var a = url.split('/');
    var rurl = a[0] + '/' + a[1] + '/' + a[2] + '/';
    return a[2].indexOf('community') > -1 ? rurl + a[3] + '/' : rurl;
}

function setEntity(url){
  entityId="xxx";
  objectType="unknown";
  for (key in sfdcObjects) {
    patt = new RegExp("(" + key + "[a-z,A-Z,0-9]{12,15})");
    res = patt.exec(url);
    if (res != null) { 
      entityId=res[0];
      objectType = sfdcObjects[entityId.substring(0,3)];
    }
  }
}

var sfdcObjects = {
  'a40' : 'Sprint',
  'a41' : 'Story',
  'a2R' : 'Job Result',
  'a3v' : 'Issue'
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-51712373-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); 
  ga.type = 'text/javascript'; 
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(ga, s);
})();