document.addEventListener("DOMContentLoaded", function () {
    var shareableLink = document.getElementById('share');
    var downloadBtn = document.getElementById('downloadBtn');
    var editInfoButton = document.getElementById('editInfoButton');
    var saveInfoButton = document.getElementsByClassName('saveInfoButton')[0];
    var editEducationButton = document.getElementById('editEducationButton');
    var saveEducationButton = document.getElementsByClassName('saveEducationButton')[0];
    var editSkillsButton = document.getElementById("editSkillsButton");
    var editJobsButton = document.getElementById("editJobsButton");
    var share_url = "".concat(window.location.origin, "/mileStone5/preview.html?username=").concat(encodeURIComponent(localStorage.getItem("name") || ""));
    shareableLink.href = share_url;
    downloadBtn.addEventListener('click', function (e) {
        editInfoButton.style.display = 'none';
        saveInfoButton.style.display = 'none';
        editEducationButton.style.display = 'none';
        saveEducationButton.style.display = 'none';
        editSkillsButton.style.display = 'none';
        editJobsButton.style.display = 'none';
        shareableLink.style.display = 'none';
        downloadBtn.style.display = 'none';
        window.print();
    });
    window.addEventListener('afterprint', function () {
        // Show buttons again after printing
        editInfoButton.style.display = 'block';
        // saveInfoButton.style.display = 'block';
        editEducationButton.style.display = 'block';
        // saveEducationButton.style.display = 'block';
        editSkillsButton.style.display = 'block';
        editJobsButton.style.display = 'block';
        shareableLink.style.display = 'block';
        downloadBtn.style.display = 'block';
    });
    var previewName = document.getElementById("previewName");
    var previewContact = document.getElementById("previewContact");
    var previewEducation = document.getElementById("previewEducation");
    var previewSkills = document.getElementById("previewSkills");
    var previewJobs = document.getElementById("previewJobs");
    var workJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    workJobs.forEach(function (job) {
        if (job) {
            var li = document.createElement("li");
            li.textContent = job;
            previewJobs.appendChild(li);
        }
    });
    // Retrieve data from localStorage and populate the preview
    var loadPreview = function () {
        previewName.textContent = "Name: ".concat(localStorage.getItem("name") || "");
        previewContact.textContent = "Contact: ".concat(localStorage.getItem("contact") || "");
        previewEducation.textContent = "Education: ".concat(localStorage.getItem("degree") || "", ", ").concat(localStorage.getItem("university") || "");
        // Populate skills
        var skillsList = JSON.parse(localStorage.getItem("skills") || "[]");
        previewSkills.innerHTML = ""; // Clear previous skills
        skillsList.forEach(function (skill) {
            var li = document.createElement("li");
            li.textContent = skill;
            previewSkills.appendChild(li);
        });
        // Populate work experience
        var workJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
        previewJobs.innerHTML = ""; // Clear previous jobs
        workJobs.forEach(function (job) {
            if (job) {
                var li = document.createElement("li");
                li.textContent = job;
                previewJobs.appendChild(li);
            }
        });
        // Retrieve the profile picture from localStorage
        var profilePictureSrc = localStorage.getItem("profilePicture");
        var previewProfilePicture = document.getElementById("previewProfilePicture");
        // Set the src of the preview image if it exists
        if (profilePictureSrc) {
            previewProfilePicture.src = profilePictureSrc;
        }
    };
    // Function to update localStorage
    var updateLocalStorage = function (key, value) {
        localStorage.setItem(key, value);
    };
    // Add event listeners for contenteditable elements to save changes
    previewName.addEventListener("blur", function () {
        var _a;
        var name = ((_a = previewName.textContent) === null || _a === void 0 ? void 0 : _a.replace("Name: ", "").trim()) || "";
        updateLocalStorage("name", name);
    });
    previewContact.addEventListener("blur", function () {
        var _a;
        var contact = ((_a = previewContact.textContent) === null || _a === void 0 ? void 0 : _a.replace("Contact: ", "").trim()) || "";
        updateLocalStorage("contact", contact);
    });
    previewEducation.addEventListener("blur", function () {
        var _a;
        var education = ((_a = previewEducation.textContent) === null || _a === void 0 ? void 0 : _a.replace("Education: ", "").trim()) || "";
        var _b = education.split(",").map(function (part) { return part.trim(); }), degree = _b[0], university = _b[1];
        updateLocalStorage("degree", degree);
        updateLocalStorage("university", university);
    });
    // Add skill functionality
    var addSkillButton = document.getElementById("addSkillButton");
    var newSkillInput = document.getElementById("newSkill");
    var addSkillContainer = document.getElementById("addSkillContainer");
    addSkillButton.addEventListener("click", function () {
        var newSkill = newSkillInput.value.trim();
        if (newSkill) {
            var skillsList = JSON.parse(localStorage.getItem("skills") || "[]");
            skillsList.push(newSkill);
            localStorage.setItem("skills", JSON.stringify(skillsList));
            loadPreview(); // Refresh the skill list
            newSkillInput.value = ""; // Clear the input
        }
    });
    // Toggle skills edit container
    // const editSkillsButton = document.getElementById("editSkillsButton") as HTMLButtonElement;
    editSkillsButton.addEventListener("click", function () {
        addSkillContainer.style.display = addSkillContainer.style.display === "none" ? "block" : "none";
    });
    // Add job functionality
    var addJobButton = document.getElementById("addJobButton");
    var newJobInput = document.getElementById("newJob");
    var addJobContainer = document.getElementById("addJobContainer");
    addJobButton.addEventListener("click", function () {
        var newJob = newJobInput.value.trim();
        if (newJob) {
            var jobsList = JSON.parse(localStorage.getItem("jobs") || "[]");
            jobsList.push(newJob);
            localStorage.setItem("jobs", JSON.stringify(jobsList));
            loadPreview(); // Refresh the job list
            newJobInput.value = ""; // Clear the input
        }
    });
    // Toggle jobs edit container
    // const editJobsButton = document.getElementById("editJobsButton") as HTMLButtonElement;
    editJobsButton.addEventListener("click", function () {
        addJobContainer.style.display = addJobContainer.style.display === "none" ? "block" : "none";
    });
    var editInfoFunctionality = function () {
        // const editInfoButton = document.getElementById('editInfoButton') as HTMLButtonElement
        // const saveInfoButton = document.getElementsByClassName('saveInfoButton')[0] as HTMLButtonElement
        var previewName = document.getElementById('previewName');
        var previewContact = document.getElementById('previewContact');
        var nameInput = document.getElementById('nameInput');
        var contactInput = document.getElementById('contactInput');
        editInfoButton.addEventListener('click', function (e) {
            var _a, _b;
            editInfoButton.style.display = 'none';
            saveInfoButton.style.display = 'block';
            if (previewName) {
                var contentName = (_a = previewName.textContent) === null || _a === void 0 ? void 0 : _a.split(':');
                var contentContact = (_b = previewContact.textContent) === null || _b === void 0 ? void 0 : _b.split(':');
                if (contentName && contentName.length == 2) {
                    var _c = contentName.map(function (part) { return part.trim(); }), name_str = _c[0], name_1 = _c[1];
                    nameInput.style.display = 'block';
                    nameInput.value = name_1;
                }
                if (contentContact && contentContact.length == 2) {
                    var _d = contentContact.map(function (part) { return part.trim(); }), contact_str = _d[0], conatct = _d[1];
                    contactInput.style.display = 'block';
                    contactInput.value = conatct;
                }
            }
        });
        saveInfoButton.addEventListener('click', function (e) {
            editInfoButton.style.display = 'block';
            saveInfoButton.style.display = 'none';
            nameInput.style.display = 'none';
            contactInput.style.display = 'none';
            var nameNew = nameInput.value;
            var contactNew = contactInput.value;
            previewName.textContent = "Name: ".concat(nameNew || "");
            previewContact.textContent = "Name: ".concat(contactNew || "");
            updateLocalStorage("name", nameNew);
            updateLocalStorage("contact", contactNew);
        });
    };
    var editEducationFuncionality = function () {
        // const editEducationButton = document.getElementById('editEducationButton') as HTMLButtonElement
        // const saveEducationButton = document.getElementsByClassName('saveEducationButton')[0] as HTMLButtonElement
        var degreeInput = document.getElementById('degreeInput');
        var universityInput = document.getElementById('universityInput');
        var previewEducation = document.getElementById('previewEducation');
        editEducationButton.addEventListener('click', function (e) {
            var _a;
            console.log("EN", previewEducation);
            editEducationButton.style.display = 'none';
            saveEducationButton.style.display = 'block';
            degreeInput.style.display = 'block';
            universityInput.style.display = 'block';
            if (previewEducation) {
                var eduContent = (_a = previewEducation.textContent) === null || _a === void 0 ? void 0 : _a.split(':');
                if (eduContent && eduContent.length == 2) {
                    var _b = eduContent.map(function (part) { return part.trim(); }), edu_str = _b[0], edu_arr = _b[1];
                    var ed = edu_arr.split(",");
                    var degree = ed[0], uni = ed[1];
                    degreeInput.value = degree;
                    universityInput.value = uni;
                }
            }
        });
        saveEducationButton.addEventListener('click', function (e) {
            editEducationButton.style.display = 'block';
            saveEducationButton.style.display = 'none';
            degreeInput.style.display = 'none';
            universityInput.style.display = 'none';
            var degreeNew = degreeInput.value;
            var uniNew = universityInput.value;
            previewEducation.textContent = "Education: ".concat(degreeNew || "", ", ").concat(uniNew || "");
            updateLocalStorage("degree", degreeNew);
            updateLocalStorage("university", uniNew);
        });
    };
    // Load initial data
    loadPreview();
    editInfoFunctionality();
    editEducationFuncionality();
});
