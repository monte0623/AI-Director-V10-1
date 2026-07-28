/* ==========================================================
   AI Director V10.1
   Build001-A
   js/app.js
   Application Entry
========================================================== */

document.addEventListener("DOMContentLoaded", initApplication);

function initApplication() {

    initializeStorage();

    initializeRouter();

    initializeDashboard();

    registerServiceWorker();

}

function initializeStorage() {

    Storage.load();

}

function initializeRouter() {

    Router.init();

}

function initializeDashboard() {

    Dashboard.init();

}

function registerServiceWorker() {

    if (!("serviceWorker" in navigator)) {

        return;

    }

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(registration => {

                console.log(
                    "Service Worker Registered",
                    registration.scope
                );

            })
            .catch(error => {

                console.error(
                    "Service Worker Register Failed",
                    error
                );

            });

    });

}
