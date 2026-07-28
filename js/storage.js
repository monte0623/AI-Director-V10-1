/* ==========================================================
   AI Director V10.1
   Build001-A
   js/storage.js
   Storage Core
========================================================== */

const Storage = (() => {

    const KEY = "AI_DIRECTOR_V10_1";

    function createDefaultData() {

        return {

            version: "10.1.0",

            lastOpenedProjectId: null,

            projects: []

        };

    }

    function load() {

        const raw = localStorage.getItem(KEY);

        if (!raw) {

            const data = createDefaultData();

            save(data);

            return data;

        }

        try {

            return JSON.parse(raw);

        } catch (error) {

            console.error("Storage Load Error", error);

            const data = createDefaultData();

            save(data);

            return data;

        }

    }

    function save(data) {

        localStorage.setItem(
            KEY,
            JSON.stringify(data)
        );

    }

    function reset() {

        const data = createDefaultData();

        save(data);

        return data;

    }

    function getProjects() {

        return load().projects;

    }

    function getProject(projectId) {

        return load().projects.find(project => project.id === projectId);

    }

    function addProject(project) {

        const data = load();

        data.projects.push(project);

        save(data);

        return project;

    }

    function updateProject(projectId, updates) {

        const data = load();

        const project = data.projects.find(item => item.id === projectId);

        if (!project) {

            return false;

        }

        Object.assign(project, updates);

        save(data);

        return true;

    }

    function deleteProject(projectId) {

        const data = load();

        data.projects = data.projects.filter(item => item.id !== projectId);

        if (data.lastOpenedProjectId === projectId) {

            data.lastOpenedProjectId = null;

        }

        save(data);

    }

    function setCurrentProject(projectId) {

        const data = load();

        data.lastOpenedProjectId = projectId;

        save(data);

    }

    function getCurrentProject() {

        const data = load();

        return data.lastOpenedProjectId;

    }

    function createProject(name) {

        const now = new Date().toISOString();

        return {

            id: crypto.randomUUID(),

            name: name,

            description: "",

            createdAt: now,

            updatedAt: now,

            script: "",

            scenes: [],

            shots: []

        };

    }

    return {

        load,

        save,

        reset,

        getProjects,

        getProject,

        addProject,

        updateProject,

        deleteProject,

        setCurrentProject,

        getCurrentProject,

        createProject

    };

})();
