const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d"); //build canvas drawing obj
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;

window.addEventListener("resize", () => {
  //根據螢幕變化重畫鎖定寬高
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //   ctx.fillStyle = "white";
  //   ctx.fillRect(10, 10, 40, 150);
});
ctx.fillStyle = "white";
ctx.strokeStyle = "red";
ctx.lineWidth = "5";
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.stroke();
ctx.fill();
console.log(ctx);

const mouse = {
  x: undefined,
  y: undefined,
};

//function decoration
const drawCricle = () => {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  ctx.fill();
};

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;

    this.size = Math.random() * 10 + 1;
    //移動方向
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue},100%,50%)`;
  }
  update() {
    //改變位置
    this.x += this.speedX * 2;
    this.y += this.speedY * 2;
    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];

//第一次注入所有的particle
// const makeParticles = () => {
//   for (let i = 0; i < 100; i++) {
//     particles.push(new Particle());
//   }
// };
// makeParticles();

canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }
  //   drawCricle();
});
const handleParticles = () => {
  //每一輪Particle就被重新定位和畫
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particles[i].color;
        // ctx.lineWidth = particles[i].size / 10;
        ctx.lineWidth = 0.2;

        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    if (particles[i].size <= 0.3) {
      particles.splice(i, 1);
      i--;
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   ctx.fillStyle = `rgba(0,0,0,0.02)`;
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  //   drawCricle();
  hue++;
  requestAnimationFrame(animate);
};
animate();
