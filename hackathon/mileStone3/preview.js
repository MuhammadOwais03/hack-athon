"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const previewName = document.getElementById("previewName");
    const previewContact = document.getElementById("previewContact");
    const previewEducation = document.getElementById("previewEducation");
    const previewSkills = document.getElementById("previewSkills");
    const previewJobs = document.getElementById("previewJobs");
    // Retrieve data from localStorage and populate the preview
    previewName.textContent = `Name: ${localStorage.getItem("name") || ""}`;
    previewContact.textContent = `Contact: ${localStorage.getItem("contact") || ""}`;
    previewEducation.textContent = `Education: ${localStorage.getItem("degree") || ""}, ${localStorage.getItem("university") || ""}`;
    // Populate skills
    const skillsList = JSON.parse(localStorage.getItem("skills") || "[]");
    skillsList.forEach((skill) => {
        const li = document.createElement("li");
        li.textContent = skill;
        previewSkills.appendChild(li);
    });
    // Populate work experience
    const workJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    workJobs.forEach((job, index) => {
        if (job) {
            const li = document.createElement("li");
            li.textContent = job;
            previewJobs.appendChild(li);
        }
    });
    // Retrieve the profile picture from localStorage
    const profilePictureSrc = localStorage.getItem("profilePicture");
    console.log(profilePictureSrc);
    const previewProfilePicture = document.getElementById("previewProfilePicture");
    // Set the src of the preview image if it exists
    if (profilePictureSrc) {
        previewProfilePicture.src = profilePictureSrc;
    }
});
