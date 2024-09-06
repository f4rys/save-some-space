<div align="center" style="display: flex; justify-content: center; align-items: center; margin-bottom: 50px; margin-top: 40px">
<img style="position: absolute" src="./media/logo_back.gif" width="100px" />
<img style="position: absolute" src="./media/logo_front.png" width="60px" />
</div>

<div align="center">
<h1>save some space.</h1>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-8D6E63?style=for-the-badge&logo=Jest&logoColor=white)

[![Deploy to AWS EC2](https://github.com/f4rys/Save-some-space/actions/workflows/aws-deploy.yml/badge.svg)](https://github.com/f4rys/Save-some-space/actions/workflows/aws-deploy.yml)
[![Test server](https://github.com/f4rys/Save-some-space/actions/workflows/test-server.yml/badge.svg)](https://github.com/f4rys/Save-some-space/actions/workflows/test-server.yml)
[![Test client](https://github.com/f4rys/Save-some-space/actions/workflows/test-client.yml/badge.svg)](https://github.com/f4rys/Save-some-space/actions/workflows/test-client.yml)
[![CodeQL Advanced](https://github.com/f4rys/Save-some-space/actions/workflows/codeql.yml/badge.svg)](https://github.com/f4rys/Save-some-space/actions/workflows/codeql.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ab06268cabbf4d97b5cc8fff5a096dde)](https://app.codacy.com/gh/f4rys/Save-some-space/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fsavesome.space%2F)

</div>

_save some space._ is a minimalist URL shortening service built with: Vite, React, Jest, Node.js, Express.js and MongoDB Atlas. Deployed to AWS EC2. It provides a straightforward way to shorten long URLs into concise, random strings. Features include:

- Shortening: Instantly generate short, random URLs for easier sharing.
- Redirection: Seamlessly redirect users from shortened links to their original destinations.
- Scalable Storage: Utilizes MongoDB Atlas for reliable and scalable data storage in the cloud.
- Dynamic reloading: Implemented to prevent whole front-end from being reloaded on every change.
- Privacy policy and terms of service: Implemented to ensure the privacy and user experience of the service is as intended.

</br>

![screenshot](./media/screenshot.jpg)

## Run locally

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/f4rys/Save-some-space
   ```

2. **Add MongoDB Atlas credentials:**

- Create .env file in the root directory
- Add the following variables to the .env file:
  ```bash
  MONGODB={your-secret-from-mongodb-atlas}
  SERVER_SECRET={your-random-secret}
  VITE_API_URL=http://localhost:8080
  ```

3. **Install dependencies for the server and run:**

   ```bash
   cd server
   npm install
   npm run dev
   ```

4. **Install dependencies for the client and run:**

   Open another terminal and run these commands:

   ```bash
   cd client
   npm install
   npm run dev
   ```

5. **Open in browser:**
   ```bash
   http://localhost:5173/
   ```

## Credits

<div>• Background image by <a href="https://www.pexels.com/@harrison-candlin-1279336/">Harrison Candlin</a> on <a href="https://www.pexels.com/photo/close-up-photo-of-blue-background-2441454/">Pexels</a></div>
<div>• Logo by <a href="https://www.iconfinder.com/visualpharm">Ivan Boyko</a> on <a href="https://www.iconfinder.com/icons/309055/link_chain_connection_url_hyperlink_icon">Iconfinder</a></div>
