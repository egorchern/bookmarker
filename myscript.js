var addFormState = false;
let order_form_state = false;

var alarmRaised = false;
var bookmarkList = [];
let theme_switch_btn;

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
                
                push_alert("success", "Bookmark <strong>successfully</strong> saved!");
                alarmRaised = true;
            });
        } else {
            $(document).ready(function () {
                $("#bookmarkAlert").remove();
                
                push_alert("success", "Bookmark <strong>successfully</strong> saved!");
            });
        }
        $("#name").val("");
        $("#category").val("");
        $("#urlHolder").val("");
    } else {
        if (alarmRaised == false) {


            $(document).ready(function () {
               
                push_alert("danger", "Bookmark addition <strong>failed!</strong>\nMake sure all fields are filled");
                alarmRaised = true;
            });
        } else {
            $(document).ready(function () {
                $('#bookmarkAlert').remove();
                
                push_alert("danger", "Bookmark addition <strong>failed!</strong>\nMake sure all fields are filled");
            });
        }
    }
}

function push_alert(category, text, dismissable = true){
    $("#alertMessageContainer").empty();
    if(dismissable === true){

    
        $("#alertMessageContainer").prepend(`<div class=\"alert alert-${category} alert-dismissible fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">${text}<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" style=\"font-size:24px\">&times;</span></button></div>`);
    }
    else{
        $("#alertMessageContainer").prepend(`<div class=\"alert alert-${category}  fade show\" role=\"alert\" id=\"bookmarkAlert\" style=\"width:100%;margin:auto;margin-top:10px;max-width:600px;\">${text}</div>`);
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
function hide_all_menus(){
    $(".menu").fadeOut();
}
function change_display_order_form(){
    if (order_form_state == false) {
        order_form_state = true;
        hide_all_menus();
        $("#order_container").fadeIn();
        $("#alertMessageContainer").empty();
        $("#alertMessageContainer").show();

    } else {
        order_form_state = false;
        $("#order_container").fadeOut();

        $("#alertMessageContainer").empty();



    }
}

function changeDisplayAddForm() {
    if (addFormState == false) {
        addFormState = true;
        hide_all_menus();
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
function re_order_click_handle(){
    let order = $("#order").val();
    re_order_bookmark_list(order);
}
function re_order_bookmark_list(order){
    let length = bookmarkList.length;
    let jsoned = `[${order}]`;
    let order_arr;
    try{
        order_arr = JSON.parse(jsoned);

    }
    catch{
        push_alert("danger", "Only numbers are allowed between commas");
        return false;
    }
    if(order_arr.length != length){
        push_alert("danger", "The order is too short or too long");
        return false;
    }
            
    let counter = 0;
    let anomaly_found = false;
    while(counter < length){
        let counter_found = order_arr.includes(counter);
        if(counter_found === false){
            anomaly_found = true;
            break;
        }
        counter += 1;
    }
    if(anomaly_found === true){
        push_alert("danger", "The order does not contain all indexes");
        return false;
    }
    let new_bookmark_list = [];
    for(let i = 0; i < length; i += 1){
        new_bookmark_list.push("[]");
    }
    for(let i = 0; i < length; i += 1){
        let new_index;
        for(let j = 0; j < length; j += 1){
            if (order_arr[j] === i){
                new_index = j;
            }
        }
        
        new_bookmark_list[new_index] = bookmarkList[i];

    }
    bookmarkList = new_bookmark_list;
    push_bookmarkList();
    displayAllBookmarks();
    
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
        document.getElementById("order_btn").onclick = function () {
            return false
        };
        hide_all_menus();
        addFormState = false;
        $("#alertMessageContainer").empty();



        $(document).ready(function () {
            
            push_alert("danger", "Bookmark deletion mode <strong>activated!</strong> Click on the bookmarks that you want to delete. Click on the remove button again to exit deletion mode", false);
        });



    } else {
        deletionMode = false;
        document.getElementById("plusBtn").onclick = function () {
            changeDisplayAddForm()
        };
        document.getElementById("order_btn").onclick = function () {
            change_display_order_form();
        };
        $("#alertMessageContainer").empty();
        
        push_alert("success", "Bookmark deletion mode is now <strong>disabled</strong>!");
    }

}
