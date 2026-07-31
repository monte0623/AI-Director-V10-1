import Storage from "./storage.js";
import Router from "./router.js";
import Dashboard from "./dashboard.js";

document.addEventListener("DOMContentLoaded", initApplication);

function initApplication() {
    Storage.load();
    Router.init();
    Dashboard.init();
    registerServiceWorker();
}

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.error));
}
