



var cookieCounter = 0;
var allCookies = Cookies.get();
var CookieNames = Object.keys(allCookies);
var cookieName = CookieNames[CookieNames.length - 1];
if (cookieName == undefined){
    cookieCounter = 1;
}
else{
    var lastCounter = Number(cookieName[cookieName.length - 1]);
    cookieCounter = lastCounter + 1;
}





function addClickEvent(){
    Bname = $("#name").val();
    Bcategory = $("#category").val();
    Burl = $("#urlHolder").val();
    addCookieBookmark(Bname,Bcategory,Burl);
}
function addCookieBookmark(Bname, Bcategory, Burl){
    var arr = [Bname,Bcategory,Burl];
    Cookies.set("bookmark" + String(cookieCounter), arr, {expires: 10000});
    
}

console.log(Cookies.get());