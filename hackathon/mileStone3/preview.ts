document.addEventListener("DOMContentLoaded", () => {
    const previewName = document.getElementById("previewName") as HTMLHeadingElement;
    const previewContact = document.getElementById("previewContact") as HTMLParagraphElement;
    const previewEducation = document.getElementById("previewEducation") as HTMLParagraphElement;
    const previewSkills = document.getElementById("previewSkills") as HTMLUListElement;
    const previewJobs = document.getElementById("previewJobs") as HTMLUListElement;

    // Retrieve data from localStorage and populate the preview
    previewName.textContent = `Name: ${localStorage.getItem("name") || ""}`;
    previewContact.textContent = `Contact: ${localStorage.getItem("contact") || ""}`;
    previewEducation.textContent = `Education: ${localStorage.getItem("degree") || ""}, ${localStorage.getItem("university") || ""}`;

    // Populate skills
    const skillsList = JSON.parse(localStorage.getItem("skills") || "[]");
    skillsList.forEach((skill: string) => {
        const li = document.createElement("li");
        li.textContent = skill;
        previewSkills.appendChild(li);
    });

    // Populate work experience
    const workJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    workJobs.forEach((job: string, index: number) => {
        if (job) {
            const li = document.createElement("li");
            li.textContent = job;
            previewJobs.appendChild(li);
        }
    });

    // Retrieve the profile picture from localStorage
    const profilePictureSrc = localStorage.getItem("profilePicture");
    console.log(profilePictureSrc)
    const previewProfilePicture = document.getElementById("previewProfilePicture") as HTMLImageElement;

    // Set the src of the preview image if it exists
    if (profilePictureSrc) {
        previewProfilePicture.src = profilePictureSrc;
    }
});
