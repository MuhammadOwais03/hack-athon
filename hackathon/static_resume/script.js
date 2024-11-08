"use strict";
var _a;
// Wait for the DOM to load before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Get elements for the toggle functionality
    var toggleSkillsButton = document.getElementById("toggleSkills");
    var skillsList = document.getElementById("skillsList");
    // Toggle skills list visibility when the button is clicked
    toggleSkillsButton === null || toggleSkillsButton === void 0 ? void 0 : toggleSkillsButton.addEventListener("click", function () {
        if (skillsList) {
            skillsList.style.display = skillsList.style.display === "none" ? "block" : "none";
        }
    });
});
// Add new skill functionality
(_a = document.getElementById("addSkill")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var skillInput = document.getElementById("newSkill");
    var skill = skillInput === null || skillInput === void 0 ? void 0 : skillInput.value.trim();
    // Only add the skill if the input is not empty
    if (skill) {
        var skillList = document.getElementById("skillsList");
        var listItem = document.createElement("li");
        listItem.textContent = skill;
        skillList === null || skillList === void 0 ? void 0 : skillList.appendChild(listItem);
        if (skillInput)
            skillInput.value = ""; // Clear the input field after adding the skill
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Profile picture upload
    var uploadButton = document.getElementById("uploadButton");
    var uploadPicture = document.getElementById("uploadPicture");
    var profilePicture = document.getElementById("profilePicture");
    uploadButton.addEventListener("click", function () {
        uploadPicture.click(); // Open the file selector dialog
    });
    uploadPicture.addEventListener("change", function () {
        var _a;
        var file = (_a = uploadPicture.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                if (((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) && typeof e.target.result === "string") {
                    profilePicture.src = e.target.result; // Set the uploaded image as the profile picture
                }
            };
            reader.readAsDataURL(file); // Convert the file to a data URL
        }
    });
});
