<script setup>
import { computed, onMounted, reactive, ref } from "vue";

const hoverEasing = "cubic-bezier(0.23, 1, 0.32, 1)";
const returnEasing = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";

const { dataImage } = defineProps({
  dataImage: String,
});

const card = ref(null);
const data = reactive({
  width: 0,
  height: 0,
  mouseX: 0,
  mouseY: 0,
  mouseLeaveDelay: null,
});
console.log("data", data);
console.log("data", data.width);
onMounted(() => {
  data.width = card.value.offsetWidth;
  data.height = card.value.offsetHeight;
});
const mousePX = computed(() => data.mouseX / data.width);
const mousePY = computed(() => data.mouseY / data.height);
const cardStyle = computed(() => {
  const rX = mousePX.value * 30;
  const rY = mousePY.value * -30;
  return {
    transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
  };
});
const cardBgTransform = computed(() => {
  const tX = mousePX.value * -40;
  const tY = mousePY.value * -40;
  return {
    transform: `translateX(${tX}px) translateY(${tY}px)`,
  };
});
const cardBgImage = computed(() => {
  return {
    backgroundImage: `url(${dataImage})`,
  };
});

function handleMouseMove(e) {
  data.mouseX = e.pageX - card.value.offsetLeft - data.width / 2;
  data.mouseY = e.pageY - card.value.offsetTop - data.height / 2;
}
function handleMouseEnter() {
  clearTimeout(data.mouseLeaveDelay);
}
function handleMouseLeave() {
  data.mouseLeaveDelay = setTimeout(() => {
    data.mouseX = 0;
    data.mouseY = 0;
  }, 1000);
}
</script>

<template>
  <div
    class="card-wrap"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="card"
  >
    <div class="card" :style="cardStyle">
      <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
      <div class="card-info">
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style>
.title {
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5d4037;
  text-align: center;
}

.card-wrap {
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  width: min-content;
}

.card-wrap:hover .card-info {
  transform: translateY(0);
}
.card-wrap:hover .card-info p {
  opacity: 1;
}
.card-wrap:hover .card-info,
.card-wrap:hover .card-info p {
  transition: 0.6s v-bind("hoverEasing");
}
.card-wrap:hover .card-info:after {
  transition: 5s v-bind("hoverEasing");
  opacity: 1;
  transform: translateY(0);
}
.card-wrap:hover .card-bg {
  transition: 0.6s v-bind("hoverEasing"), opacity 5s v-bind("hoverEasing");
  opacity: 0.8;
}
.card-wrap:hover .card {
  transition: 0.6s v-bind("hoverEasing"), box-shadow 2s v-bind("hoverEasing");
  box-shadow: rgba(white, 0.2) 0 0 40px 5px, rgba(white, 1) 0 0 0 1px,
    rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset white 0 0 0 6px;
}

.card {
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: #0000006b 0 30px 60px 0, inset #333 0 0 0 5px,
    inset #ffffff8c 0 0 0 6px;
  transition: 1s v-bind("returnEasing");
}
.card:hover {
  border: 1px solid #ffffff85;
}

.card-bg {
  opacity: 0.5;
  position: absolute;
  /* top: -20px;
  left: -20px; */
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 1s v-bind("returnEasing"), opacity 5s 1s v-bind("returnEasing");
  pointer-events: none;
  scale: 1.2;
}

.card:hover .card-bg {
  border: 1px solid #ffffff85;
}
.card-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.card-info p {
  opacity: 0;
  text-shadow: #000 0 2px 3px;
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  font-size: 14px;
}

.card-info:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(#000, 0.6) 100%
  );
  background-blend-mode: overlay;
  opacity: 0;
  transform: translateY(100%);
  transition: 5s 1s v-bind("returnEasing");
}

.card-info h1 {
  font-family: "Playfair Display";
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
}
</style>
