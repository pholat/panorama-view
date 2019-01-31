'use strict';

/// TODO load from list.html and make css for it nicelly
function add_container_list() {
    var container_list_view = document.createElement('div');
    container_list_view.style.cssText = 'position:fixed;width:200px;opacity:1;z-index:99999;background:#666;left:0;top:0;color:#fff;border: 1px solid #000000;border-radius: 5px;';
    container_list_view.innerHTML += "<ul><li>item 1</li></ul>";
    container_list_view.setAttribute("id","p_container_list");
    document.body.appendChild(container_list_view);
}

var is_hidden = false;

function recipient(message) {
    console.log(`message: ${message.type}`)
    if ( message.type === "notify" ) {
        var el = document.getElementById("p_container_list");
        if ( el ) {
            console.log(`change list attribute to: ${is_hidden}`);
            el.style.display= is_hidden?"none":"block";
            is_hidden = !is_hidden;
            for(var i in message.value ) {
                console.log(`value: ${message.value[i]["name"]}`);
            }
        }
    }
}

function notifyExtension(e) {
    browser.runtime.sendMessage({"value": "dupa"});
}

function on_send_error(error) {
    console.log(`send error ${error}`);
}

function on_send_success(message) {
    console.log(`send success ${message}`);
}

var id=0;

function _init() {
    console.log("-> init <-")
    browser.runtime.onMessage.addListener(recipient)
    sending.then(on_send_success, on_send_error);
    document.addEventListener("DOMContentLoaded", function(event) {
        add_container_list();
    });
}

_init();
