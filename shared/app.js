import Storage from "./storage.js";
import Router from "./router.js";
import Dashboard from "./dashboard.js";

document.addEventListener("DOMContentLoaded", initApplication);

function initApplication() {
    Storage.load();
    Router.init();
    Dashboard.init();
    bindGlobalEvents();
    registerServiceWorker();
}

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.error));
}


function bindGlobalEvents() {
    const ids=["newProjectButton","toolbarCreateProjectButton"];
    ids.forEach(id=>{
        const btn=document.getElementById(id);
        if(btn){
            btn.addEventListener("click",()=>Dashboard.createProject());
        }
    });
    const back=document.getElementById("backDashboardButton");
    if(back){
        back.addEventListener("click",()=>Router.navigate("dashboard"));
    }
}
