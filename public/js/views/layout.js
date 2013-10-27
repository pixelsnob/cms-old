function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),title = locals_.title,settings = locals_.settings,nav = locals_.nav,search = locals_.search;buf.push("<!DOCTYPE html><html><head><title>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</title><link rel=\"stylesheet\" href=\"/bower_components/normalize-css/normalize.css\"><link rel=\"stylesheet\" href=\"/css/main.css\">");
if ( settings.force_js_optimize || settings.env == 'production')
{
buf.push("<script type=\"text/javascript\" src=\"/js/main-build.js\" data-main=\"/js/main\"></script>");
}
else
{
buf.push("<script type=\"text/javascript\" data-main=\"/js/main\" src=\"/bower_components/requirejs/require.js\"></script>");
}
buf.push("</head><body><header><nav><ul><li><a href=\"/\">Home</a></li>");
// iterate nav
;(function(){
  var $$obj = nav;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<li class=\"product\"><a" + (jade.attrs({ terse: true, 'href':("/products/" + (val.path) + ""), "class": [("" + (val.path) + "")] }, {"href":true,"class":true})) + ">" + (jade.escape(null == (jade.interp = val.category) ? "" : jade.interp)) + "</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<li class=\"product\"><a" + (jade.attrs({ terse: true, 'href':("/products/" + (val.path) + ""), "class": [("" + (val.path) + "")] }, {"href":true,"class":true})) + ">" + (jade.escape(null == (jade.interp = val.category) ? "" : jade.interp)) + "</a></li>");
    }

  }
}).call(this);

buf.push("</ul></nav><form name=\"search_form\" action=\"/search\" method=\"post\"><input" + (jade.attrs({ terse: true, 'type':("text"), 'name':("search"), 'value':("" + (search) + ""), 'placeholder':("Product Search...") }, {"type":true,"name":true,"value":true,"placeholder":true})) + "><input type=\"submit\" value=\"Search\"></form></header><div id=\"content\"></div><footer></footer></body></html>");;return buf.join("");
}