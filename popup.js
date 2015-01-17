document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log(tabs[0]);
    currURL = tabs[0].url;
    var entityId = getEntityId(currURL);
    var objectType = sfdcObjects[getPrefix(entityId)];
    //if we are on a sprint record ok but not a sprint list view, tab, search results or the page itself...
    if (objectType === 'Sprint' || objectType === 'Story' || objectType === 'Issue') {
      document.getElementById('ptxt').style.display = "none";
      document.getElementById("buildDocsLnk").style.display = "block";
      document.getElementById('buildDocsLnk').onclick = function () {
        _gaq.push(['_trackEvent', 'URLRedirects', 'buildDocsLnk','deployDocsVF']);
        var res = currURL.split(getPrefix(entityId));
        newURL = res[0] + 'apex/deployDocs?sid=' + entityId;
        chrome.tabs.create({active: true, url: newURL});
      };
    }
    if (objectType === 'Job Result') {
      document.getElementById("jrheader").style.display = "block";
      document.getElementById("clsandtrgrpt").style.display = "block";
      document.getElementById('clsandtrgrpt').onclick = function () {	
      	_gaq.push(['_trackEvent', 'URLRedirects', 'clsandtrgrpt','deployDocsVF']);
      	var res = currURL.split(getPrefix(entityId));
        newURL = res[0] + '00O50000003RYOs?pv0=' + entityId.slice(0,15);
        chrome.tabs.create({active: false, url: newURL});
      };
      document.getElementById("vfandjsrpt").style.display = "block";
      document.getElementById('vfandjsrpt').onclick = function () {	
      	_gaq.push(['_trackEvent', 'URLRedirects', 'vfandjsrpt','deployDocsVF']);
      	var res = currURL.split(getPrefix(entityId));
        newURL = res[0] + '00O50000003RYOx?pv0=' + entityId.slice(0,15);
        chrome.tabs.create({active: false, url: newURL});
      };
      document.getElementById("objrpt").style.display = "block";
      document.getElementById('objrpt').onclick = function () {	
      	_gaq.push(['_trackEvent', 'URLRedirects', 'objrpt','deployDocsVF']);
      	var res = currURL.split(getPrefix(entityId));
        newURL = res[0] + '00O50000003RYP7?pv0=' + entityId.slice(0,15);
        chrome.tabs.create({active: false, url: newURL});
      };
      document.getElementById("hltmetricrpt").style.display = "block";
      document.getElementById('hltmetricrpt').onclick = function () {	
      	_gaq.push(['_trackEvent', 'URLRedirects', 'hltmetricrpt','deployDocsVF']);
      	var res = currURL.split(getPrefix(entityId));
        newURL = res[0] + '00O50000003SI1B?pv0=' + entityId.slice(0,15);
        chrome.tabs.create({active: false, url: newURL});
      };
      document.getElementById("tstdandfrpt").style.display = "block";
      document.getElementById('tstdandfrpt').onclick = function () {	
      	_gaq.push(['_trackEvent', 'URLRedirects', 'tstdandfrpt','deployDocsVF']);
      	var res = currURL.split(getPrefix(entityId));
        newURL = res[0] + '00O50000003RYOT?pv0=' + entityId.slice(0,15);
        chrome.tabs.create({active: false, url: newURL});
      };
      document.getElementById("codecvgrpt").style.display = "block";
      document.getElementById('codecvgrpt').onclick = function () {	
      	_gaq.push(['_trackEvent', 'URLRedirects', 'codecvgrpt','deployDocsVF']);
      	var res = currURL.split(getPrefix(entityId));
        newURL = res[0] + '00O50000003qUwa?pv0=' + entityId.slice(0,15);
        chrome.tabs.create({active: false, url: newURL});
      };
    }
  });
});

function getPrefix(entityId){
  return entityId=entityId.length<4?"xxx":entityId.substring(0,3);
}

/* this is the same function salesforce uses in sfdcPage.getEntityId() */
function getEntityId(url){
  var a = url.split("?")[0].split("/");
  return this.entityId=6==a.length&&"x"==a[3]?a.slice(3,6).join("/"):a[a.length-1]
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