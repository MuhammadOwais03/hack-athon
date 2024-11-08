// declare const html2pdf: (element: HTMLElement, options?: any) => void;
function generateUniqueResumeUrl(username) {
    var uniqueId = uuid.v4(); // Use the global uuid object
    return "".concat(window.location.origin, "/resume/").concat(username, "/").concat(uniqueId);
}
var username = "johnDoe"; // Replace with dynamic username if available
document.addEventListener("DOMContentLoaded", function () {
    var downloadBtn = document.getElementById('downloadBtn');
    var shareBtn = document.getElementById('shareBtn');
    // downloadBtn.addEventListener('click', downloadResume);
    shareBtn.addEventListener('click', function () {
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
function copyToClipboard(username) {
    var resumeUrl = generateUniqueResumeUrl(username);
    var inputElement = document.createElement('input'); // Create an input element dynamically
    inputElement.value = resumeUrl;
    document.body.appendChild(inputElement); // Append to body for selection
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement); // Remove it after copying
    alert("URL copied to clipboard!");
}
