<script setup>
import Card from "./Card.vue";
import image1 from "/images/technologies/1.jpg";
import image2 from "/images/technologies/2.png";
import image3 from "/images/technologies/3.jpg";
import image4 from "/images/technologies/4.jpg";
import image5 from "/images/technologies/5.jpg";
import image6 from "/images/technologies/6.jpg";

const cards = [
  { id: 1, name: "HTML & CSS", src: image1, text: "Bootstrap, mui, tailwind" },
  {
    id: 2,
    name: "Responsive web design",
    src: image2,
    text: "Adaptive design for all screens",
  },
  {
    id: 3,
    name: "RESTful API",
    src: image3,
    text: "",
  },
  {
    id: 4,
    name: "Frontend",
    src: image4,
    text: "JavaScript: React framework, Next.js, Vue.js",
  },
  {
    id: 5,
    name: "Backend",
    src: image5,
    text: "Node.js, Express.js framework",
  },
  {
    id: 6,
    name: "Databases",
    src: image6,
    text: "PostgreSQL, MongoDB",
  },
];
</script>

<template>
  <div class="max-w-screen-lg mx-auto">
    <h1 class="flex justify-center mt-6 text-2xl font-semibold">
      Technologies
    </h1>
    <div class="flex justify-center flex-wrap my-4">
      <Card v-for="card in cards" :dataImage="card.src">
        <template #header>
          <h3>{{ card.name }}</h3>
        </template>
        <template #content>
          <p>
            {{ card.text }}
          </p></template
        >
      </Card>
    </div>
  </div>
</template>
