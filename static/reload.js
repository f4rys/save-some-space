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
            const shortenedUrlDiv = document.createElement('div');
            shortenedUrlDiv.classList.add('mb-2', 'mt-4', 'shortened-url');
            shortenedUrlDiv.id = 'shortenedUrl';

            const link = document.createElement('a');
            link.href = data.shortUrl;
            link.textContent = `savesome.space/${data.shortUrl}`;
            shortenedUrlDiv.appendChild(link);

            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('mt-3');

            const copyButton = document.createElement('button');
            copyButton.classList.add('btn', 'btn-primary', 'shortened-url-button');
            copyButton.id = 'copyButton';
            copyButton.textContent = 'copy to clipboard';
            buttonDiv.appendChild(copyButton);

            shortenedUrlDisplay.innerHTML = ''; 
            shortenedUrlDisplay.appendChild(shortenedUrlDiv);
            shortenedUrlDisplay.appendChild(buttonDiv);

            initializeCopyButton();
        } else {
            shortenedUrlDisplay.textContent = 'Error shortening URL. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        shortenedUrlDisplay.textContent = 'An error occurred. Please try again later.'; 
    }
});

logoLink.addEventListener('click', (event) => {
    event.preventDefault();
    shortenedUrlDisplay.innerHTML = '';
    document.getElementById('fullUrl').value = '';
});