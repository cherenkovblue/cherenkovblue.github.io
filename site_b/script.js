// ID of the Google Spreadsheet
 var spreadsheetID = "12l8wTqhBz8nI2DBccqWw0MGCRi61bw0XJZIVclkULmY";
 
 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

// parse url parameters
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}


// make JSON call to Google Data API
$.getJSON(url, function(data) {

  // set global html variable
  var html = '';
  
  // loop to build html output for each row
  var entry = data.feed.entry;
  /**
  ** descending order:
  ** for (var i = entry.length - 1; i >= 0; i -= 1) {
  ** ascending order:
  ** for (var i = 0; i < entry.length; i++) {
   */

  if ($.urlParam('id') != null) {
    // indented just to allow for clarity
    html += '<div class="row">';
    html += '  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 content-box col-centered col-'+($.urlParam('id')%3)+'">';
    html += '    <div class="content-top">';
    html += '      <h3>#' + entry[$.urlParam('id') - 1]['gsx$id']['$t'] + ': ' + entry[$.urlParam('id') - 1]['gsx$context']['$t'] + '</h3>';
    html += '    </div>';
    html += '    <div class="content-middle text-center">';
    html += '      <h2>' + entry[$.urlParam('id') - 1]['gsx$entry']['$t'] + '</h2>';
    html += '      <p>&nbsp</p>';
    html += '    </div>';
    html += '    <div class="content-footer">';
    html += '      <a href="https://twitter.com/intent/tweet?text='+entry[$.urlParam('id') - 1]['gsx$entry']['$t']+'&via=ThingsKidsSay"><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a>&nbsp;&nbsp;';
    html += '      <p>&nbsp</p>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
  }
  else {
    for (var i = entry.length - 1; i >= 0; i -= 1) {
      // indented just to allow for clarity
      var j = i % 3;

      html += '<div class="row">';
      html += '  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 content-box col-centered col-'+j+'">';
      html += '    <div class="content-top">';
      html += '      <h3>#' + (i+1) + ': ' + entry[i]['gsx$context']['$t'] + '</h3>';
      html += '    </div>';
      html += '    <div class="content-middle text-center">';
      html += '      <h2>' + entry[i]['gsx$entry']['$t'] + '</h2>';
      html += '      <p>&nbsp</p>';
      html += '    </div>';
      html += '    <div class="content-footer text-center">';
      html += '      <a href="https://twitter.com/intent/tweet?text='+entry[i]['gsx$entry']['$t']+'&via=TwitterHandle"><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a>&nbsp;&nbsp;';
      html += '      <p>&nbsp</p>';
      html += '    </div>';
      html += '  </div>';
      html += '</div>';
    }
  }

  // output html
  $('.content').html(html);
});