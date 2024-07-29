

## save some space.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

[![Node.js CI](https://github.com/f4rys/Save-some-space/actions/workflows/node.js.yml/badge.svg)](https://github.com/f4rys/Save-some-space/actions/workflows/node.js.yml) [![CodeQL](https://github.com/f4rys/Save-some-space/actions/workflows/codeql.yml/badge.svg)](https://github.com/f4rys/Save-some-space/actions/workflows/codeql.yml) ![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/f4rys/Save-some-space) ![Website](https://img.shields.io/website?url=https%3A%2F%2Fsavesome.space%2F)

*save some space.* is a minimalist URL shortening service built with Express.js and MongoDB Atlas. Deployed via Firebase Web App Hosting. It provides a straightforward way to shorten long URLs into concise, random strings. Features include:

- Shortening: Instantly generate short, random URLs for easier sharing.
- Redirection: Seamlessly redirect users from shortened links to their original destinations.
- Scalable Storage: Utilizes MongoDB Atlas for reliable and scalable data storage in the cloud.
- Dynamic reloading: Implemented to prevent whole front-end from being reloaded on every change.

</br>

![screenshot](screenshot.jpg)

## Run locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/f4rys/Save-some-space

2. **Add MongoDB Atlas credentials:**
  - Create .env file in the root directory
  - Add the following variables to the .env file:
    ```bash
    MONGODB={your-secret-from-mongodb-atlas}
    SERVER_SECRET={your-random-secret}
3. **Install dependencies and run:**
   ```bash
   npm install
   npm run start
4. **Open in browser:**
   ```bash
   http://localhost:5000/
   ```

## Credits
<div>• Background image by <a href="https://www.pexels.com/@harrison-candlin-1279336/">Harrison Candlin</a> on <a href="https://www.pexels.com/photo/close-up-photo-of-blue-background-2441454/">Pexels</a></div>
<div>• Logo by <a href="https://www.iconfinder.com/visualpharm">Ivan Boyko</a> on <a href="https://www.iconfinder.com/icons/309055/link_chain_connection_url_hyperlink_icon">Iconfinder</a></div>
