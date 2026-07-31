import Storage from "./storage.js";
import Router from "./router.js";

/* ==========================================================
   AI Director V10.1
   Build001-A
   js/dashboard.js
   Dashboard
========================================================== */

const Dashboard = (() => {

    function init() {

        render();

    }

    function render() {

        const container = document.getElementById("projectGrid");

        if (!container) {
            return;
        }

        const projects = Storage.getProjects();

        if (projects.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    <h2>尚未建立製作案</h2>
                    <p>點擊下方按鈕建立第一個製作案。</p>
                    <button
                        class="primary-button"
                        id="createFirstProjectButton">
                        建立製作案
                    </button>
                </div>
            `;

            document
                .getElementById("createFirstProjectButton")
                .addEventListener("click", createProject);

            return;

        }

        container.innerHTML = "";

        projects.forEach(project => {

            const card = document.createElement("div");

            card.className = "project-card";

            card.innerHTML = `
                <div class="project-title">
                    ${escapeHtml(project.name)}
                </div>

                <div class="project-description">
                    ${project.description || "尚未填寫描述"}
                </div>

                <div class="project-meta">
                    <span>
                        ${formatDate(project.updatedAt)}
                    </span>

                    <span>
                        開啟 →
                    </span>
                </div>
            `;

            card.addEventListener("click", () => {

                Storage.setCurrentProject(project.id);

                Router.navigate("project");

            });

            container.appendChild(card);

        });

    }

    function createProject() {

        const name = window.prompt("請輸入製作案名稱");

        if (!name) {

            return;

        }

        const project = Storage.createProject(name.trim());

        Storage.addProject(project);

        render();

    }

    function refresh() {

        render();

    }

    function escapeHtml(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }

    function formatDate(dateString) {

        const date = new Date(dateString);

        return date.toLocaleDateString(
            "zh-TW",
            {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }
        );

    }

    return {

        init,

        refresh,

        createProject

    };

})();


export default Dashboard;
