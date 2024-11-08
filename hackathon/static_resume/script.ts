// Wait for the DOM to load before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Get elements for the toggle functionality
    const toggleSkillsButton = document.getElementById("toggleSkills") as HTMLButtonElement | null;
    const skillsList = document.getElementById("skillsList") as HTMLUListElement | null;
  
    // Toggle skills list visibility when the button is clicked
    toggleSkillsButton?.addEventListener("click", () => {
      if (skillsList) {
        skillsList.style.display = skillsList.style.display === "none" ? "block" : "none";
      }
    });
  });
  
  // Add new skill functionality
  document.getElementById("addSkill")?.addEventListener("click", function() {
    const skillInput = document.getElementById("newSkill") as HTMLInputElement | null;
    const skill = skillInput?.value.trim();
  
    // Only add the skill if the input is not empty
    if (skill) {
      const skillList = document.getElementById("skillsList") as HTMLUListElement | null;
      const listItem = document.createElement("li");
      listItem.textContent = skill;
      skillList?.appendChild(listItem);
      if (skillInput) skillInput.value = ""; // Clear the input field after adding the skill
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Profile picture upload
    const uploadButton = document.getElementById("uploadButton") as HTMLButtonElement;
    const uploadPicture = document.getElementById("uploadPicture") as HTMLInputElement;
    const profilePicture = document.getElementById("profilePicture") as HTMLImageElement;
  
    uploadButton.addEventListener("click", () => {
      uploadPicture.click(); // Open the file selector dialog
    });
  
    uploadPicture.addEventListener("change", () => {
      const file = uploadPicture.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result && typeof e.target.result === "string") {
            profilePicture.src = e.target.result; // Set the uploaded image as the profile picture
          }
        };
        reader.readAsDataURL(file); // Convert the file to a data URL
      }
    });
  });
  