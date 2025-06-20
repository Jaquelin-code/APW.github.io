if("serviceWorker" in navigator){
    window.addEventListener("load", function(){
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("Service Worker Registered"))
        .catch(err => console.log("Service Worker not Registered", err));
    });
}
