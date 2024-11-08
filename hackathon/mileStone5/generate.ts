// Declare the global variables
declare const uuid: {
    v4: () => string;
};

// declare const html2pdf: (element: HTMLElement, options?: any) => void;

function generateUniqueResumeUrl(username: string): string {
    const uniqueId = uuid.v4(); // Use the global uuid object
    return `${window.location.origin}/resume/${username}/${uniqueId}`;
}

const username = "johnDoe"; // Replace with dynamic username if available

document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;
    const shareBtn = document.getElementById('shareBtn') as HTMLButtonElement;

    // downloadBtn.addEventListener('click', downloadResume);
    shareBtn.addEventListener('click', () => { 
        copyToClipboard(username); 
        console.log("HELLOW"); 
    });
});

// function downloadResume() {
//     const resumeElement = document.getElementById('preview') as HTMLElement; // Ensure this ID matches your HTML
//     html2pdf(resumeElement, {
//         filename: 'resume.pdf',
//         margin: 1,
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     });
// }

function copyToClipboard(username: string) {
    const resumeUrl = generateUniqueResumeUrl(username);
    const inputElement = document.createElement('input'); // Create an input element dynamically
    inputElement.value = resumeUrl;
    document.body.appendChild(inputElement); // Append to body for selection
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement); // Remove it after copying

    alert("URL copied to clipboard!");
}
