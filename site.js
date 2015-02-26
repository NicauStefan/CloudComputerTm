
//  https://www.flickr.com/services/api/explore/flickr.photos.search
// AIzaSyCiFZ22YTEgbrTVoavlUxRK_xSvFKzzx70
var url2 = "https://maps.googleapis.com/maps/api/geocode/json?address=Paris&key=AIzaSyCiFZ22YTEgbrTVoavlUxRK_xSvFKzzx70";
//https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyCiFZ22YTEgbrTVoavlUxRK_xSvFKzzx70";
var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=62fc814714605e5f5041d1362e78f690&tags=tree&format=json&nojsoncallback=1";
var xmlhttp;
var xmlhttp2;
var xmlhttp3;


if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  xmlhttp2=new XMLHttpRequest();
  xmlhttp3=new XMLHttpRequest();
}
else
{// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
  xmlhttp3=new ActiveXObject("Microsoft.XMLHTTP");
}
 
//1420070400 == 1.1.2015 
//1422662400 == 1.2.2015
//1424908800 == 26.2.2015

xmlhttp.onreadystatechange=function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      var resp = JSON.parse(xmlhttp.responseText);
      console.log("resou",resp);
      //document.writeln(s);
      var placee = resp.results[0].geometry.location;
      console.log("place",placee);
      
      // get first day from start of the month with percipitations grater than 80
      var urlDate = "http://api.openweathermap.org/data/2.5/history/city?id=2885679&type=days&start=1422662400&end=1424908800";
      //declare 1
      xmlhttp2.onreadystatechange=function()
      {
        if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
        {
          console.log("don3");
          var resp = JSON.parse(xmlhttp2.responseText);
          var day;
          console.log("RASP OBJL:",resp);
          for(var i =0 ; i < resp.list.length ;i++)
          {
            if( resp.list[i].main.humidity > 80  )
              day = resp.list[i].dt;
          }
          console.log("day:",day);
         
          var urlAlt = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5715ab69fe9c013d3baad2ccfc1328c3&tags="+"tree"+"&min_upload_date="+day+"&lat="+placee.lat+"&lon="+placee.lng+"&format=json&nojsoncallback=1";

          xmlhttp3.onreadystatechange=function()
          {
            if (xmlhttp3.readyState==4 && xmlhttp3.status==200)
            {
              console.log("don4");
              // get location :langitudine/longitudine pt Paris
              
              var s ="";
              var resp = JSON.parse(xmlhttp3.responseText);
              console.log("good",resp);
              for (var i=0; i < resp.photos.photo.length; i++) //modded
              {
                var photo = resp.photos.photo[i];
                var t_url = "http://farm" + photo.farm + ".static.flickr.com/" + 
                photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
                var p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
                s +=  '<a href="' + p_url + '">' + '<img alt="'+ photo.title + 
                  '"src="' + t_url + '"/>' + '</a>';
              }             
              ///
              document.writeln(s);
            }
          }
          
          //console.log("aa22:",resp);
          xmlhttp3.open("GET",urlAlt,true);
          xmlhttp3.send();
        }
        
        
      }
      //end~~~ 1
      xmlhttp2.open("GET",urlDate,true);
      xmlhttp2.send();
    }
    console.log("XML:",xmlhttp.status);
}
xmlhttp.open("GET",url2,true);
xmlhttp.send();
