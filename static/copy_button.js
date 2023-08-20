document.addEventListener("DOMContentLoaded", () => {
    const copyButton = document.getElementById("copyButton");
    const shortenedUrl = document.getElementById("shortenedUrl").innerText;

    copyButton.addEventListener("click", () => {
        const textArea = document.createElement("textarea");
        textArea.value = shortenedUrl;

        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        
        copyButton.textContent = "Copied!";
    });
});