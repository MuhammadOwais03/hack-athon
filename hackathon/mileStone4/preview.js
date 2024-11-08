"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const previewName = document.getElementById("previewName");
    const previewContact = document.getElementById("previewContact");
    const previewEducation = document.getElementById("previewEducation");
    const previewSkills = document.getElementById("previewSkills");
    const previewJobs = document.getElementById("previewJobs");
    const workJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    workJobs.forEach((job) => {
        if (job) {
            const li = document.createElement("li");
            li.textContent = job;
            previewJobs.appendChild(li);
        }
    });
    // Retrieve data from localStorage and populate the preview
    const loadPreview = () => {
        previewName.textContent = `Name: ${localStorage.getItem("name") || ""}`;
        previewContact.textContent = `Contact: ${localStorage.getItem("contact") || ""}`;
        previewEducation.textContent = `Education: ${localStorage.getItem("degree") || ""}, ${localStorage.getItem("university") || ""}`;
        // Populate skills
        const skillsList = JSON.parse(localStorage.getItem("skills") || "[]");
        previewSkills.innerHTML = ""; // Clear previous skills
        skillsList.forEach((skill) => {
            const li = document.createElement("li");
            li.textContent = skill;
            previewSkills.appendChild(li);
        });
        // Populate work experience
        const workJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
        previewJobs.innerHTML = ""; // Clear previous jobs
        workJobs.forEach((job) => {
            if (job) {
                const li = document.createElement("li");
                li.textContent = job;
                previewJobs.appendChild(li);
            }
        });
        // Retrieve the profile picture from localStorage
        const profilePictureSrc = localStorage.getItem("profilePicture");
        const previewProfilePicture = document.getElementById("previewProfilePicture");
        // Set the src of the preview image if it exists
        if (profilePictureSrc) {
            previewProfilePicture.src = profilePictureSrc;
        }
    };
    // Function to update localStorage
    const updateLocalStorage = (key, value) => {
        localStorage.setItem(key, value);
    };
    // Add event listeners for contenteditable elements to save changes
    previewName.addEventListener("blur", () => {
        var _a;
        const name = ((_a = previewName.textContent) === null || _a === void 0 ? void 0 : _a.replace("Name: ", "").trim()) || "";
        updateLocalStorage("name", name);
    });
    previewContact.addEventListener("blur", () => {
        var _a;
        const contact = ((_a = previewContact.textContent) === null || _a === void 0 ? void 0 : _a.replace("Contact: ", "").trim()) || "";
        updateLocalStorage("contact", contact);
    });
    previewEducation.addEventListener("blur", () => {
        var _a;
        const education = ((_a = previewEducation.textContent) === null || _a === void 0 ? void 0 : _a.replace("Education: ", "").trim()) || "";
        const [degree, university] = education.split(",").map(part => part.trim());
        updateLocalStorage("degree", degree);
        updateLocalStorage("university", university);
    });
    // Add skill functionality
    const addSkillButton = document.getElementById("addSkillButton");
    const newSkillInput = document.getElementById("newSkill");
    const addSkillContainer = document.getElementById("addSkillContainer");
    addSkillButton.addEventListener("click", () => {
        const newSkill = newSkillInput.value.trim();
        if (newSkill) {
            const skillsList = JSON.parse(localStorage.getItem("skills") || "[]");
            skillsList.push(newSkill);
            localStorage.setItem("skills", JSON.stringify(skillsList));
            loadPreview(); // Refresh the skill list
            newSkillInput.value = ""; // Clear the input
        }
    });
    // Toggle skills edit container
    const editSkillsButton = document.getElementById("editSkillsButton");
    editSkillsButton.addEventListener("click", () => {
        addSkillContainer.style.display = addSkillContainer.style.display === "none" ? "block" : "none";
    });
    // Add job functionality
    const addJobButton = document.getElementById("addJobButton");
    const newJobInput = document.getElementById("newJob");
    const addJobContainer = document.getElementById("addJobContainer");
    addJobButton.addEventListener("click", () => {
        const newJob = newJobInput.value.trim();
        if (newJob) {
            const jobsList = JSON.parse(localStorage.getItem("jobs") || "[]");
            jobsList.push(newJob);
            localStorage.setItem("jobs", JSON.stringify(jobsList));
            loadPreview(); // Refresh the job list
            newJobInput.value = ""; // Clear the input
        }
    });
    // Toggle jobs edit container
    const editJobsButton = document.getElementById("editJobsButton");
    editJobsButton.addEventListener("click", () => {
        addJobContainer.style.display = addJobContainer.style.display === "none" ? "block" : "none";
    });
    const editInfoFunctionality = () => {
        const editInfoButton = document.getElementById('editInfoButton');
        const saveInfoButton = document.getElementsByClassName('saveInfoButton')[0];
        const previewName = document.getElementById('previewName');
        const previewContact = document.getElementById('previewContact');
        const nameInput = document.getElementById('nameInput');
        const contactInput = document.getElementById('contactInput');
        editInfoButton.addEventListener('click', (e) => {
            var _a, _b;
            editInfoButton.style.display = 'none';
            saveInfoButton.style.display = 'block';
            if (previewName) {
                const contentName = (_a = previewName.textContent) === null || _a === void 0 ? void 0 : _a.split(':');
                const contentContact = (_b = previewContact.textContent) === null || _b === void 0 ? void 0 : _b.split(':');
                if (contentName && contentName.length == 2) {
                    let [name_str, name] = contentName.map(part => part.trim());
                    nameInput.style.display = 'block';
                    nameInput.value = name;
                }
                if (contentContact && contentContact.length == 2) {
                    let [contact_str, conatct] = contentContact.map(part => part.trim());
                    contactInput.style.display = 'block';
                    contactInput.value = conatct;
                }
            }
        });
        saveInfoButton.addEventListener('click', (e) => {
            editInfoButton.style.display = 'block';
            saveInfoButton.style.display = 'none';
            nameInput.style.display = 'none';
            contactInput.style.display = 'none';
            const nameNew = nameInput.value;
            const contactNew = contactInput.value;
            previewName.textContent = `Name: ${nameNew || ""}`;
            previewContact.textContent = `Name: ${contactNew || ""}`;
            updateLocalStorage("name", nameNew);
            updateLocalStorage("contact", contactNew);
        });
    };
    const editEducationFuncionality = () => {
        const editEducationButton = document.getElementById('editEducationButton');
        const saveEducationButton = document.getElementsByClassName('saveEducationButton')[0];
        const degreeInput = document.getElementById('degreeInput');
        const universityInput = document.getElementById('universityInput');
        const previewEducation = document.getElementById('previewEducation');
        editEducationButton.addEventListener('click', (e) => {
            var _a;
            console.log("EN", previewEducation);
            editEducationButton.style.display = 'none';
            saveEducationButton.style.display = 'block';
            degreeInput.style.display = 'block';
            universityInput.style.display = 'block';
            if (previewEducation) {
                const eduContent = (_a = previewEducation.textContent) === null || _a === void 0 ? void 0 : _a.split(':');
                if (eduContent && eduContent.length == 2) {
                    let [edu_str, edu_arr] = eduContent.map(part => part.trim());
                    let ed = edu_arr.split(",");
                    let [degree, uni] = ed;
                    degreeInput.value = degree;
                    universityInput.value = uni;
                }
            }
        });
        saveEducationButton.addEventListener('click', (e) => {
            editEducationButton.style.display = 'block';
            saveEducationButton.style.display = 'none';
            degreeInput.style.display = 'none';
            universityInput.style.display = 'none';
            const degreeNew = degreeInput.value;
            const uniNew = universityInput.value;
            previewEducation.textContent = `Education: ${degreeNew || ""}, ${uniNew || ""}`;
            updateLocalStorage("degree", degreeNew);
            updateLocalStorage("university", uniNew);
        });
    };
    // Load initial data
    loadPreview();
    editInfoFunctionality();
    editEducationFuncionality();
});
