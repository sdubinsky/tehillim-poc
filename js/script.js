/* Author: yonkeltron

*/

var app = {};

app.make_map_from_content_string = function make_map_from_content_string(content_string) {
  var obj = {};
  console.log(content_string);
  _(content_string.split(', ')).each(function (pair) {
    var split_pair = pair.split(': ');
    obj[split_pair[0]] = split_pair[1];
  });
  console.log(obj);
  return obj;
};

app.process_entries = function process_entries(json) {
  var list = _(json.feed.entry).map(function (entry) {
    var processed_entry = app.make_map_from_content_string(entry.content.$t);

    return app.entry_template({
      name: processed_entry.name,
      duration: processed_entry.lengthoftimeindays
    });
  });

  $('ul#entry_list').html($(list.join('')));
};

$(function () {

  app.entry_template = _.template($('script#entry_template').html());

  $.ajax({
    url: 'https://spreadsheets.google.com/feeds/list/0AvniHWRb_RIwdHpoVjUxNVRldjZlUDNtQ1VjYXR5bUE/od6/public/basic?alt=json',
    dataType: 'jsonp',
    jsonpCallback: 'app.process_entries'
  });
});



