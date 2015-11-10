var HOST = "http://52.74.102.84:8000";
var mediaHOST = "http://mashglobal.org.s3.amazonaws.com/media/";
var eventsData = [];
var eventsIds = [];
var eventsTypeDefaultImages = {1: "images/mixer.jpg", 3: "images/od.jpg", 4: "images/mashup.jpg"}
var supportersData = [];
var supportersIds = [];
var globalSupportersIds = [2,3,4,5]
var facebookURL = "https://www.facebook.com/MashProject";
var twitterURL = "https://twitter.com/mash_project";
var googleplusURL = "https://plus.google.com/u/0/118420471642649699506";
var instagramURL = "https://instagram.com/mash_project";
var blogURL = "https://officialmashproject.wordpress.com/about/";
var dateFormatter = function(date){
	y = +date.substr(0, 4),     // get the year
    m = +date.substr(5, 2) - 1, // get the month
    d = +date.substr(8, 2),     // get the date of the month
    date = new Date(y, m, d);
    var s = date.toDateString()
    return s.substring(0,s.length-4)
}