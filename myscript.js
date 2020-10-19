var addFormState = false;


var alarmRaised = false;
var bookmarkList = [];
populateBookmarkList();




var deletionMode = false;

function addClickEvent() {
    Bname = $("#name").val();
    Bcategory = $("#category").val();
    Burl = $("#urlHolder").val();
    if (Bname != "" && Bcategory != "" && Burl != "") {


        addLocalStorageBookmark(Bname, Bcategory, Burl);
        if (alarmRaised == false) {


            $(document).ready(function () {
                $("#alertMessageContainer").prepend("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark <strong>successfully</strong> saved! Refresh the page to display the bookmark<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>");
                alarmRaised = true;
            });
        } else {
            $(document).ready(function () {
                $("#bookmarkAlert").remove();
                $("#alertMessageContainer").prepend("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark <strong>successfully</strong> saved!  Refresh the page to display the bookmark<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>");

            });
        }
        $("#name").val("");
        $("#category").val("");
        $("#urlHolder").val("");
    } else {
        if (alarmRaised == false) {


            $(document).ready(function () {
                $("#alertMessageContainer").prepend("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark addition <strong>failed!</strong>\nMake sure all fields are filled<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>");
                alarmRaised = true;
            });
        } else {
            $(document).ready(function () {
                $('#bookmarkAlert').remove();
                $("#alertMessageContainer").prepend("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark addition <strong>failed!</strong>\nMake sure all fields are filled<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>");

            });
        }
    }
}

function addLocalStorageBookmark(Bname, Bcategory, Burl) {
    //TODO add
    let arr = [Bname, Bcategory, Burl];
    bookmarkList.push(arr);
    push_bookmarkList();
    populateBookmarkList();

}

function push_bookmarkList(){
    let jsoned = JSON.stringify(bookmarkList);
    localStorage.setItem("bookmarks", jsoned);
}

function populateBookmarkList() {
    let jsoned = localStorage.getItem("bookmarks");
    if(jsoned === null){
        jsoned = "[]";
    }
    let arr = JSON.parse(jsoned);
    bookmarkList = arr;
    displayAllBookmarks();
}

function changeDisplayAddForm() {
    if (addFormState == false) {
        addFormState = true;
        $("#addFormContainer").fadeIn();
        $("#alertMessageContainer").empty();
        $("#alertMessageContainer").show();

    } else {
        addFormState = false;
        $("#addFormContainer").fadeOut();

        $("#alertMessageContainer").empty();



    }


}

function openBookmark(callerId) {
    var asString = String(callerId);
    var temp = asString.replace(/bk/, "");

    var index = Number(temp);
    if (deletionMode == false) {


        var link = bookmarkList[index][2];


        window.open(link);
    } else {
        bookmarkList.splice(index, 1);
        push_bookmarkList();
        displayAllBookmarks();
        
    }
}

function re_order_bookmark_list(order){
    
}

function displayAllBookmarks() {
    $(document).ready(function () {
        $("#mainFlexible").empty();
        for (var i = 0; i < bookmarkList.length; i++) {
            currentList = bookmarkList[i];
            var tmp = `<div class="mainFlexible-item" id="bk${i}" onclick="openBookmark(this.id)">
                    <p style="font-size: calc(20px + 1vw)">${currentList[0]}</p>
                    <p style="font-size: calc(18.5px + 0.3vw)">Category: ${currentList[1]}</p>
                    <p style="margin-bottom:5px">Link: ${currentList[2]}</p>
                    </div>`;


            $('#mainFlexible').append(tmp);
        }
    })



}

function removeBookmarkBtnPress() {
    if (deletionMode == false) {


        deletionMode = true;
        document.getElementById("plusBtn").onclick = function () {
            return false
        };
        $("#addFormContainer").fadeOut();
        addFormState = false;
        $("#alertMessageContainer").empty();



        $(document).ready(function () {
            $("#alertMessageContainer").prepend("<div class=\"alert alert-danger  fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark deletion mode <strong>activated!</strong> Click on the bookmarks that you want to delete. Click on the remove button again to exit deletion mode</div>");

        });



    } else {
        deletionMode = false;
        document.getElementById("plusBtn").onclick = function () {
            changeDisplayAddForm()
        };
        $("#alertMessageContainer").empty();
        $("#alertMessageContainer").prepend("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">Bookmark deletion mode is now <strong>disabled!</strong> Refresh the page to update bookmark display<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>");
    }

}
