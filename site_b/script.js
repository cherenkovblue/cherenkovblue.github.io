// ID of the Google Spreadsheet
 var spreadsheetID = "12l8wTqhBz8nI2DBccqWw0MGCRi61bw0XJZIVclkULmY";
 
 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

 var twitterHandle = "NewTwitterHandle";

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

  if ($.urlParam('id') != null) {
    // indented just to allow for clarity
    if (Number($.urlParam('id')) > entry.length){
      html += '<div class="row">';
      html += '  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 content-box col-centered col-warning">';
      html += '    <div class="content-middle text-center">';
      html += '      <h2> I\'m sorry, invalid entry! </h2>';
      html += '      <p>&nbsp</p>';
      html += '    </div>';
      html += '  </div>';
      html += '</div>';
      $('.next-btn').prop('disabled', true);
      $('.prev-btn').prop('disabled', true);
    }
    else {
      html += '<div class="row">';
      html += '  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 content-box col-centered col-'+($.urlParam('id')%3)+'">';
      html += '    <div class="content-top">';
      html += '      <h3>#' + entry[$.urlParam('id') - 1]['gsx$id']['$t'] + ': ' + entry[$.urlParam('id') - 1]['gsx$context']['$t'] + '</h3>';
      html += '    </div>';
      html += '    <div class="content-middle text-center">';
      html += '      <h2><i class="fa fa-quote-left fa-2x" aria-hidden="true"></i> ' + entry[$.urlParam('id') - 1]['gsx$entry']['$t'] + ' <i class="fa fa-quote-right fa-2x" aria-hidden="true"></i></h2>';
      html += '      <p>&nbsp</p>';
      html += '    </div>';
      html += '    <div class="content-bottom">';
      html += '      <h3>-' + entry[$.urlParam('id') - 1]['gsx$source']['$t'] + '</h3>';
      html += '    </div>';
      html += '    <div class="content-footer text-center">';
      html += '      <a href="https://twitter.com/intent/tweet?text='+entry[$.urlParam('id') - 1]['gsx$entry']['$t']+'&via='+twitterHandle+'"><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a>&nbsp;&nbsp;';
      html += '      <a href="test.html"><i class="fa fa-home fa-2x" aria-hidden="true"></i></a>'
      html += '      <p>&nbsp</p>';
      html += '    </div>';
      html += '  </div>';
      html += '</div>';
    }
    if(Number($.urlParam('id')) == entry.length) {
      $('.next-btn').prop('disabled', true);
    }
    if(Number($.urlParam('id')) == 1) {
      $('.prev-btn').prop('disabled', true);
    }

    $('.btn-group').css('visibility', 'visible');
    $('.btn-group-2').css('visibility', 'hidden');

  }
  else {
    $('.btn-group').css('visibility', 'hidden');
    $('.btn-group-2').css('visibility', 'visible');

    /**
    ** descending order:
    ** for (var i = entry.length - 1; i >= 0; i -= 1) {
    ** ascending order:
    ** for (var i = 0; i < entry.length; i++) {
    */
    var page_number;
    var cont_per_page = 5;

    if($.urlParam('page') == null || Number($.urlParam('page')) == 1) {
      $('.prev-page-btn').prop('disabled', true);
      page_number = 1;
    }
    else {
      page_number = $.urlParam('page');
    }

    for (var i = (entry.length-1)-(cont_per_page*(page_number-1)); i>=(entry.length-cont_per_page)-(cont_per_page*(page_number-1)) && i>=0; i-=1) {
      // indented just to allow for clarity
      var j = i % 3;

      html += '<div class="row">';
      html += '  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 content-box col-centered col-'+j+'">';
      html += '    <div class="content-top">';
      html += '      <h3>#' + (i+1) + ': ' + entry[i]['gsx$context']['$t'] + '</h3>';
      html += '    </div>';
      html += '    <div class="content-middle text-center">';
      html += '      <h2><i class="fa fa-quote-left fa-2x" aria-hidden="true"></i> ' + entry[i]['gsx$entry']['$t'] + ' <i class="fa fa-quote-right fa-2x" aria-hidden="true"></i></h2>';
      html += '      <p>&nbsp</p>';
      html += '    </div>';
      html += '    <div class="content-bottom">';
      html += '      <h3>-' + entry[i]['gsx$source']['$t'] + '</h3>';
      html += '    </div>';
      html += '    <div class="content-footer text-center">';
      html += '      <a href="https://twitter.com/intent/tweet?text='+entry[i]['gsx$entry']['$t']+'&via='+twitterHandle+'"><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a>&nbsp;&nbsp;';
      html += '      <a href="test.html?id='+(i+1)+'"><i class="fa fa-ellipsis-h fa-2x" aria-hidden="true"></i></a>&nbsp;&nbsp;';
      html += '      <p>&nbsp</p>';
      html += '    </div>';
      html += '  </div>';
      html += '</div>';
      if (i == 0) {
        $('.next-page-btn').prop('disabled', true);
      }
    }
  }

  // output html
  $('.content').html(html);
});

$('.next-btn').on('click', function (e) {
  if ($.urlParam('id') != null) {
    window.location.href = "test.html?id=" + (Number($.urlParam('id')) + 1);
  }
});

$('.prev-btn').on('click', function (e) {
  if ($.urlParam('id') != null) {
    window.location.href = "test.html?id=" + (Number($.urlParam('id')) - 1);
  }
});

$('.next-page-btn').on('click', function (e) {
  if ($.urlParam('page') != null) {
    window.location.href = "test.html?page=" + (Number($.urlParam('page')) + 1);
  }
  else {
    window.location.href = "test.html?page=2";
  }
});

$('.prev-page-btn').on('click', function (e) {
  if ($.urlParam('page') != null) {
    window.location.href = "test.html?page=" + (Number($.urlParam('page')) - 1);
  }
});