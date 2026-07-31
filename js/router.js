/* ==========================================================
   AI Director V10.1
   Build001-A
   js/router.js
   Router
========================================================== */

const Router = (() => {

    let currentPage = "dashboard";

    function init() {

        window.addEventListener("hashchange", handleRoute);

        handleRoute();

    }

    function handleRoute() {

        const hash = window.location.hash.replace("#", "");

        if (!hash) {

            navigate("dashboard");

            return;

        }

        switch (hash) {

            case "dashboard":
                showDashboard();
                break;

            case "project":
                showProject();
                break;

            case "workspace":
                showWorkspace();
                break;

            default:
                navigate("dashboard");
                break;

        }

    }

    function navigate(page) {

        currentPage = page;

        window.location.hash = page;

    }

    function showDashboard() {

        currentPage = "dashboard";

        const dashboard = document.getElementById("dashboardPage");
        const workspace = document.getElementById("workspacePage");
        const project=document.getElementById("projectPage");

        if (dashboard) {
            dashboard.classList.remove("hidden");
        }

        if (workspace) workspace.classList.add("hidden");
        if(project) project.classList.add("hidden");

    }

    
    function showProject() {
        currentPage="project";
        ["dashboardPage","workspacePage"].forEach(id=>{const e=document.getElementById(id); if(e)e.classList.add("hidden");});
        const p=document.getElementById("projectPage"); if(p)p.classList.remove("hidden");
    }

    function showWorkspace() {

        currentPage = "workspace";

        const dashboard = document.getElementById("dashboardPage");
        const workspace = document.getElementById("workspacePage");
        const project=document.getElementById("projectPage");

        if (dashboard) {
            dashboard.classList.add("hidden");
        }

        if (workspace) {
            workspace.classList.remove("hidden");
        }

    }

    function getCurrentPage() {

        return currentPage;

    }

    return {

        init,

        navigate,

        showDashboard,

        showProject,
        showWorkspace,

        getCurrentPage

    };

})();


export default Router;
