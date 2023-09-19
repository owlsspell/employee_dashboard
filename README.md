<h1 align="center">Employee Dashboard</h1>

<div align="center">
  
[![Vue](https://img.shields.io/badge/-Vue-282C34?style=for-the-badge&logo=vuedotjs)](https://vuejs.org/)
[![tailwindcss](https://img.shields.io/badge/-tailwind-282C34?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![auth0](https://img.shields.io/badge/-auth0-282C34?style=for-the-badge&logo=auth0)](https://www.prisma.io/)
[![echarts](https://img.shields.io/badge/-echarts-282C34?style=for-the-badge&logo=apacheecharts)](https://echarts.apache.org/en/index.html)

[![Typescript](https://img.shields.io/badge/-Typescript-282C34?style=for-the-badge&logo=Typescript)](https://www.typescriptlang.org/)
[![nodejs](https://img.shields.io/badge/-node.js-282C34?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![express](https://img.shields.io/badge/-express-282C34?style=for-the-badge&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/-postgresql-282C34?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![prisma](https://img.shields.io/badge/-prisma-282C34?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

</div>

<h2 align="center"><a  href="https://employee-dashboard-neon.vercel.app/">Live Demo</a></h2>

## Description

This is an example of charts created on data from the employees table.
The project is based on the vue+vite template and styled with Tailwind CSS + daisyUI.

<img src="./frontend/public/gif/example_1.gif" width="100%"></p>

### About the project

The application has several themes that can be switched in a switcher in the header. The main page has a parallax effect and animation on the cards (try hovering over the cards).

The Reports page is secured with auth0. Authorized users have the opportunity to view and edit the employee table. The data for the table comes from postgreSQL provided by vercel.

The Dashboard page has charts based on the countries of employees and the number of registered employees depending on the date.

### Stack of technologies:

Frontend:

- Vue 3 (Composition API)
- Tailwind
- Pinia
- Auth0
- Vue-echarts

Backend:

- Express
- Typescript
- PostgreSQL
- Prisma

## How to run

Open frontend or backend folder

npm install

npm run dev
