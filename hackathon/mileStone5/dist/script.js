"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b, _c, _d;
    // Elements for real-time updates
    const nameInput = document.getElementById("name");
    const contactInput = document.getElementById("contact");
    const degreeInput = document.getElementById("degree");
    const universityInput = document.getElementById("university");
    const workExperienceContainer = document.getElementById("workExperienceContainer");
    const skillsList = document.getElementById("skillsList");
    // Initialize an array to store job entries
    const jobEntries = [];
    // Skill addition functionality
    (_a = document.getElementById("addSkill")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        const skillInput = document.getElementById("newSkill");
        const skill = skillInput.value.trim();
        if (skill) {
            const listItem = document.createElement("li");
            listItem.textContent = skill;
            skillsList.appendChild(listItem);
            skillInput.value = "";
        }
    });
    // Toggle skills visibility
    (_b = document.getElementById("toggleSkills")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        skillsList.style.display = skillsList.style.display === "none" ? "block" : "none";
    });
    // Dynamic job entries
    let jobCount = 0;
    (_c = document.getElementById("addJob")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        jobCount++;
        const jobDiv = document.createElement("div");
        jobDiv.className = "job-entry";
        const jobLabel = document.createElement("label");
        jobLabel.textContent = `Job ${jobCount}:`;
        const jobInput = document.createElement("input");
        jobInput.type = "text";
        jobInput.placeholder = `Enter your job ${jobCount}`;
        // Add event listener to save job input to local storage
        jobInput.addEventListener("input", () => {
            // Update job entries array
            jobEntries[jobCount - 1] = jobInput.value; // Store in array (index = jobCount - 1)
            // Update local storage
            localStorage.setItem("jobs", JSON.stringify(jobEntries));
        });
        jobDiv.appendChild(jobLabel);
        jobDiv.appendChild(jobInput);
        workExperienceContainer.appendChild(jobDiv);
    });
    // Profile picture upload
    const uploadButton = document.getElementById("uploadButton");
    const uploadPicture = document.getElementById("uploadPicture");
    const profilePicture = document.getElementById("profilePicture");
    uploadButton.addEventListener("click", () => {
        uploadPicture.click();
    });
    let prof_src;
    uploadPicture.addEventListener("change", () => {
        var _a;
        const file = (_a = uploadPicture.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                if (typeof ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) === "string") {
                    prof_src = e.target.result;
                    console.log(prof_src, e.target.result);
                    profilePicture.src = e.target.result; // Display on the main form
                    profilePicture.style.display = "block"; // Make sure the picture is visible
                }
            };
            reader.readAsDataURL(file);
        }
    });
    // Navigate to preview page
    (_d = document.getElementById("generateButton")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        // Store information in localStorage or pass to preview.html
        localStorage.setItem("name", nameInput.value);
        localStorage.setItem("contact", contactInput.value);
        localStorage.setItem("degree", degreeInput.value);
        localStorage.setItem("university", universityInput.value);
        localStorage.setItem("skills", JSON.stringify(Array.from(skillsList.children).map(li => li.textContent)));
        localStorage.setItem("profilePicture", prof_src);
        localStorage.setItem("jobs", JSON.stringify(jobEntries)); // Store job entries in local storage
        // Redirect to preview page
        window.location.href = "preview.html"; // Adjust to your actual preview page
    });
});
