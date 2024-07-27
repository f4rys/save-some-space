import { initializeCopyButton } from './copy_button.js';

const urlForm = document.getElementById('url-form');
const shortenedUrlDisplay = document.getElementById('shortenedUrlDisplay');
const logoLink = document.querySelector('.logo');

urlForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fullUrl = document.getElementById('fullUrl').value;

    try {
        const response = await fetch('/shortUrls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `fullUrl=${fullUrl}`
        });

        if (response.ok) {
            const data = await response.json();
            shortenedUrlDisplay.innerHTML = `
                <div class="mb-2 mt-4 shortened-url" id="shortenedUrl">
                    <a href="${data.shortUrl}">savesome.space/${data.shortUrl}</a>
                </div>
                <div class="mt-3">
                    <button class="btn btn-primary shortened-url-button" id="copyButton">copy to clipboard</button>
                </div>
            `;

            initializeCopyButton();
        } else {
            shortenedUrlDisplay.innerHTML = '<div class="error">Error shortening URL. Please try again.</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        shortenedUrlDisplay.innerHTML = '<div class="error">An error occurred. Please try again later.</div>';
    }
});

logoLink.addEventListener('click', (event) => {
    event.preventDefault();

    shortenedUrlDisplay.innerHTML = '';
    document.getElementById('fullUrl').value = '';

});
