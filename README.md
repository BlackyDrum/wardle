<img align="left" src="https://github.com/BlackyDrum/wardle/assets/111639941/1aba0e32-4f95-4f99-b7c0-cdd7f98ec0f3" />


<img src="https://github.com/BlackyDrum/wardle/assets/111639941/b07e9ceb-31bb-4930-85c4-5273e89e804e"></a><br /><br />

**Wordle clone built with Next.js**


<br>

[![Generic badge](https://img.shields.io/badge/Status-Finished-green.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/License-MIT-<COLOR>.svg)](https://shields.io/) 
 
<br />

<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAF">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">

---
<p>
<b>Wardle</b> is a clone of the classic word-guessing game Wordle, where players try to guess a hidden word within a limited number of attempts.
<b>Wardle</b> is built using <b>Next.js</b>. This project served as my introduction to <b>Next.js</b>, representing my first hands-on experience with the framework.
</p>

## Demo
https://wardle-zeta.vercel.app/

## Local installation
1. **Clone the Repository:**
```bash
$ git clone git@github.com:BlackyDrum/wardle.git
```
2. **Install Dependencies:**
```bash
$ npm install
```
3. **Copy the ``.env.example`` file to ``.env`` and provide your PostgreSQL database credentials**
4. **Run Prisma migrations to create database tables:**
```
$ npx prisma migrate
```
5. **Generate the Prisma Client:**
```
$ npx prisma generate
```
6. **Start the development server**
```bash
$ npm run dev
```
7. **Open your browser and visit ``http://localhost:3000`` to play Wardle**


## License
This project is licensed under the **MIT License**.

## Acknowledgments
- **Next.js**: https://nextjs.org/
- **Original game by Josh Wardle**: https://www.nytimes.com/games/wordle/index.html
