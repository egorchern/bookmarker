


var addFormState = false;
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

var alarmRaised = false;
var bookmarkList = [];
populateBookmarkList();

function addClickEvent(){
    Bname = $("#name").val();
    Bcategory = $("#category").val();
    Burl = $("#urlHolder").val();
    if(Bname != "" && Bcategory != "" && Burl != ""){
        
    
        addCookieBookmark(Bname,Bcategory,Burl);
        if(alarmRaised == false){
            
        
            $(document).ready(function(){
                $("#alertMessageContainer").prepend("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark <strong>successfully</strong> saved!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>");
                alarmRaised = true;
            });
        }
        else{
            $(document).ready(function(){
                $("#bookmarkAlert").remove();
                $("#alertMessageContainer").prepend("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark <strong>successfully</strong> saved!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>");
                
            });
        }
    }
    else{
        if(alarmRaised == false){
            
        
            $(document).ready(function(){
                $("#alertMessageContainer").prepend("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark addition <strong>failed!</strong>\nMake sure all fields are filled<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>");
                alarmRaised = true;
            });
        }
        else{
            $(document).ready(function(){
                $('#bookmarkAlert').remove();
                $("#alertMessageContainer").prepend("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark addition <strong>failed!</strong>\nMake sure all fields are filled<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>");
                
            });
        }
    }
}
function addCookieBookmark(Bname, Bcategory, Burl){
    var arr = [Bname,Bcategory,Burl];
    Cookies.set("bookmark" + String(cookieCounter), arr, {expires: 10000});
    
}



function populateBookmarkList()
{
    var raw = Object.values(allCookies);
    for (var i = 0; i < raw.length; i++){
        
        var currentEntry = raw[i];
        var temp = currentEntry.split(",");
        bookmarkList.push(temp);
    }
}

function changeDisplayAddForm(){
    if(addFormState == false ){
        addFormState = true;
        $("#addFormContainer").fadeIn();
        $("#alertMessageContainer").show();
        
    }
    else{
        addFormState = false;
        $("#addFormContainer").fadeOut();
        $("#alertMessageContainer").fadeOut();
        $("#alertMessageContainer").empty();
        
        
        
    }
    
    
}


