document.addEventListener("DOMContentLoaded", () => {
    // Elements for real-time updates
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const contactInput = document.getElementById("contact") as HTMLInputElement;
    const degreeInput = document.getElementById("degree") as HTMLInputElement;
    const universityInput = document.getElementById("university") as HTMLInputElement;
    const workExperienceContainer = document.getElementById("workExperienceContainer") as HTMLDivElement;
    const skillsList = document.getElementById("skillsList") as HTMLUListElement;

    // Skill addition functionality
    document.getElementById("addSkill")?.addEventListener("click", () => {
        const skillInput = document.getElementById("newSkill") as HTMLInputElement;
        const skill = skillInput.value.trim();
        if (skill) {
            const listItem = document.createElement("li");
            listItem.textContent = skill;
            skillsList.appendChild(listItem);
            skillInput.value = "";
        }
    });

    // Toggle skills visibility
    document.getElementById("toggleSkills")?.addEventListener("click", () => {
        skillsList.style.display = skillsList.style.display === "none" ? "block" : "none";
    });

    // Dynamic job entries
    let jobCount = 0;

    document.getElementById("addJob")?.addEventListener("click", () => {
        jobCount++;
        const jobDiv = document.createElement("div");
        jobDiv.className = "job-entry";

        const jobLabel = document.createElement("label");
        jobLabel.textContent = `Job ${jobCount}:`;
        const jobInput = document.createElement("input");
        jobInput.type = "text";
        jobInput.placeholder = `Enter your job ${jobCount}`;
        jobInput.addEventListener("input", () => {
            const jobListItem = document.createElement("li");
            jobListItem.textContent = jobInput.value;
            jobDiv.appendChild(jobListItem);
        });

        jobDiv.appendChild(jobLabel);
        jobDiv.appendChild(jobInput);
        workExperienceContainer.appendChild(jobDiv);
    });

    // Profile picture upload
    const uploadButton = document.getElementById("uploadButton") as HTMLButtonElement;
    const uploadPicture = document.getElementById("uploadPicture") as HTMLInputElement;
    const profilePicture = document.getElementById("profilePicture") as HTMLImageElement;

    uploadButton.addEventListener("click", () => {
        uploadPicture.click();
    });

    let prof_src:any;
    
    uploadPicture.addEventListener("change", () => {
        const file = uploadPicture.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === "string") {
                    prof_src = e.target.result
                    console.log(prof_src, e.target.result)
                    profilePicture.src = e.target.result; // Display on the main form
                    profilePicture.style.display = "block"; // Make sure the picture is visible
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Navigate to preview page
    document.getElementById("generateButton")?.addEventListener("click", () => {
        // Store information in localStorage or pass to preview.html
        localStorage.setItem("name", nameInput.value);
        localStorage.setItem("contact", contactInput.value);
        localStorage.setItem("degree", degreeInput.value);
        localStorage.setItem("university", universityInput.value);
        localStorage.setItem("skills", JSON.stringify(Array.from(skillsList.children).map(li => li.textContent)));
        localStorage.setItem("profilePicture", prof_src);

        // Redirect to preview page
        window.location.href = "preview.html"; // Adjust to your actual preview page
    });
});
