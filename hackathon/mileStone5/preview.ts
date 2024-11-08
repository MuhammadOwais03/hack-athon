document.addEventListener("DOMContentLoaded", () => {


    let shareableLink = document.getElementById('share') as HTMLAnchorElement
    let downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement

    const editInfoButton = document.getElementById('editInfoButton') as HTMLButtonElement
    const saveInfoButton = document.getElementsByClassName('saveInfoButton')[0] as HTMLButtonElement
    const editEducationButton = document.getElementById('editEducationButton') as HTMLButtonElement
    const saveEducationButton = document.getElementsByClassName('saveEducationButton')[0] as HTMLButtonElement
    const editSkillsButton = document.getElementById("editSkillsButton") as HTMLButtonElement;
    const editJobsButton = document.getElementById("editJobsButton") as HTMLButtonElement;


    let share_url = `${window.location.origin}/mileStone5/preview.html?username=${encodeURIComponent(localStorage.getItem("name") || "")}`;
    shareableLink.href = share_url;

    downloadBtn.addEventListener('click', (e) => {
        editInfoButton.style.display = 'none'
        saveInfoButton.style.display = 'none'
        editEducationButton.style.display = 'none'
        saveEducationButton.style.display = 'none'
        editSkillsButton.style.display = 'none'
        editJobsButton.style.display = 'none'
        shareableLink.style.display = 'none'
        downloadBtn.style.display = 'none'
        window.print()
    })

    window.addEventListener('afterprint', () => {
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





    const previewName = document.getElementById("previewName") as HTMLHeadingElement;
    const previewContact = document.getElementById("previewContact") as HTMLParagraphElement;
    const previewEducation = document.getElementById("previewEducation") as HTMLParagraphElement;
    const previewSkills = document.getElementById("previewSkills") as HTMLUListElement;
    const previewJobs = document.getElementById("previewJobs") as HTMLUListElement;


    const workJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    workJobs.forEach((job: any) => {
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
        skillsList.forEach((skill: string) => {
            const li = document.createElement("li");
            li.textContent = skill;
            previewSkills.appendChild(li);
        });

        // Populate work experience
        const workJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
        previewJobs.innerHTML = ""; // Clear previous jobs
        workJobs.forEach((job: string) => {
            if (job) {
                const li = document.createElement("li");
                li.textContent = job;
                previewJobs.appendChild(li);
            }
        });

        // Retrieve the profile picture from localStorage
        const profilePictureSrc = localStorage.getItem("profilePicture");
        const previewProfilePicture = document.getElementById("previewProfilePicture") as HTMLImageElement;

        // Set the src of the preview image if it exists
        if (profilePictureSrc) {
            previewProfilePicture.src = profilePictureSrc;
        }
    };

    // Function to update localStorage
    const updateLocalStorage = (key: string, value: string) => {
        localStorage.setItem(key, value);
    };

    // Add event listeners for contenteditable elements to save changes
    previewName.addEventListener("blur", () => {
        const name = previewName.textContent?.replace("Name: ", "").trim() || "";
        updateLocalStorage("name", name);
    });

    previewContact.addEventListener("blur", () => {
        const contact = previewContact.textContent?.replace("Contact: ", "").trim() || "";
        updateLocalStorage("contact", contact);
    });

    previewEducation.addEventListener("blur", () => {
        const education = previewEducation.textContent?.replace("Education: ", "").trim() || "";
        const [degree, university] = education.split(",").map(part => part.trim());
        updateLocalStorage("degree", degree);
        updateLocalStorage("university", university);
    });

    // Add skill functionality
    const addSkillButton = document.getElementById("addSkillButton") as HTMLButtonElement;
    const newSkillInput = document.getElementById("newSkill") as HTMLInputElement;
    const addSkillContainer = document.getElementById("addSkillContainer") as HTMLDivElement;

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
    // const editSkillsButton = document.getElementById("editSkillsButton") as HTMLButtonElement;
    editSkillsButton.addEventListener("click", () => {
        addSkillContainer.style.display = addSkillContainer.style.display === "none" ? "block" : "none";
    });

    // Add job functionality
    const addJobButton = document.getElementById("addJobButton") as HTMLButtonElement;
    const newJobInput = document.getElementById("newJob") as HTMLInputElement;
    const addJobContainer = document.getElementById("addJobContainer") as HTMLDivElement;

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
    // const editJobsButton = document.getElementById("editJobsButton") as HTMLButtonElement;
    editJobsButton.addEventListener("click", () => {
        addJobContainer.style.display = addJobContainer.style.display === "none" ? "block" : "none";
    });

    const editInfoFunctionality = () => {
        // const editInfoButton = document.getElementById('editInfoButton') as HTMLButtonElement
        // const saveInfoButton = document.getElementsByClassName('saveInfoButton')[0] as HTMLButtonElement
        const previewName = document.getElementById('previewName') as HTMLHeadElement
        const previewContact = document.getElementById('previewContact') as HTMLHeadElement
        const nameInput = document.getElementById('nameInput') as HTMLInputElement
        const contactInput = document.getElementById('contactInput') as HTMLInputElement
        editInfoButton.addEventListener('click', (e) => {
            editInfoButton.style.display = 'none'
            saveInfoButton.style.display = 'block'
            if (previewName) {
                const contentName = previewName.textContent?.split(':')
                const contentContact = previewContact.textContent?.split(':')
                if (contentName && contentName.length == 2) {
                    let [name_str, name] = contentName.map(part => part.trim());
                    nameInput.style.display = 'block'
                    nameInput.value = name
                }

                if (contentContact && contentContact.length == 2) {
                    let [contact_str, conatct] = contentContact.map(part => part.trim());
                    contactInput.style.display = 'block'
                    contactInput.value = conatct

                }

            }
        })

        saveInfoButton.addEventListener('click', (e) => {
            editInfoButton.style.display = 'block'
            saveInfoButton.style.display = 'none'
            nameInput.style.display = 'none'
            contactInput.style.display = 'none'
            const nameNew = nameInput.value
            const contactNew = contactInput.value
            previewName.textContent = `Name: ${nameNew || ""}`;
            previewContact.textContent = `Name: ${contactNew || ""}`;
            updateLocalStorage("name", nameNew);
            updateLocalStorage("contact", contactNew);

        })
    }

    const editEducationFuncionality = () => {
        // const editEducationButton = document.getElementById('editEducationButton') as HTMLButtonElement
        // const saveEducationButton = document.getElementsByClassName('saveEducationButton')[0] as HTMLButtonElement
        const degreeInput = document.getElementById('degreeInput') as HTMLInputElement
        const universityInput = document.getElementById('universityInput') as HTMLInputElement
        const previewEducation = document.getElementById('previewEducation') as HTMLHeadElement


        editEducationButton.addEventListener('click', (e) => {
            console.log("EN", previewEducation)
            editEducationButton.style.display = 'none'
            saveEducationButton.style.display = 'block'
            degreeInput.style.display = 'block'
            universityInput.style.display = 'block'
            if (previewEducation) {
                const eduContent = previewEducation.textContent?.split(':')


                if (eduContent && eduContent.length == 2) {
                    let [edu_str, edu_arr] = eduContent.map(part => part.trim());
                    let ed = edu_arr.split(",")
                    let [degree, uni] = ed
                    degreeInput.value = degree
                    universityInput.value = uni

                }
            }
        })

        saveEducationButton.addEventListener('click', (e) => {
            editEducationButton.style.display = 'block'
            saveEducationButton.style.display = 'none'
            degreeInput.style.display = 'none'
            universityInput.style.display = 'none'
            const degreeNew = degreeInput.value
            const uniNew = universityInput.value
            previewEducation.textContent = `Education: ${degreeNew || ""}, ${uniNew || ""}`;
            updateLocalStorage("degree", degreeNew);
            updateLocalStorage("university", uniNew);

        })

    }

    // Load initial data
    loadPreview();
    editInfoFunctionality()
    editEducationFuncionality()
});




