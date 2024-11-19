import gsap from "gsap";

document.querySelector("#app").innerHTML = `
<div class="container">
</div>
`;

const container = document.querySelector(".container");

let rolling = false;
const rollDuration = 3;

function getRandomNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

container.addEventListener("click", () => {
  if (rolling) return;
  rolling = true;
  const num = getRandomNumber();
  const preloadImage = new Image();
  preloadImage.src = `/${num}.png`;

  // Animate sprite sheet
  gsap.set(container, { backgroundImage: `url(/roll.png)` });
  gsap.to(container, {
    backgroundPositionX: `-15104px`,
    duration: rollDuration,
    ease: "steps(59)",
    onComplete: () => {
      gsap.set(container, {
        backgroundImage: `url(/${num}.png)`,
        backgroundPositionX: `0px`,
      });
      rolling = false;
    },
  });

  // Animate roll X, Y movement
  const tl = gsap.timeline();
  const points = [
    {
      x: "-50%",
      y: "50%",
      durationFactor: 0.1,
    },
    {
      x: "70%",
      y: "-50%",
      durationFactor: 1,
    },
    {
      x: "-10%",
      y: "-100%",
      durationFactor: 0.6,
    },
    {
      x: "-50%",
      y: "-50%",
      durationFactor: 0.6,
    },
    {
      x: 0,
      y: 0,
      durationFactor: 1,
    },
  ];
  const totalFactor = points.reduce(
    (sum, point) => sum + point.durationFactor,
    0
  );

  points.forEach((point, i) => {
    tl.to(container, {
      x: point.x,
      y: point.y,
      duration: (point.durationFactor / totalFactor) * rollDuration,
      ease: "linear",
    });
  });
});
