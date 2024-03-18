import { Star } from './star.js';

const starfield = document.documentElement;
const starLen = 200;
const zModifier = window.innerHeight;

const set3DPoint = ({ x, y, z }) => {
  const scale = zModifier / (zModifier + z);

  return {
    x: x * scale + window.innerWidth * 0.5,
    y: y * scale + window.innerHeight * 0.5,
    scale,
  };
};

const fragment = new DocumentFragment();
new Array(starLen).fill(null).reduce(() => {
  const el = new Star();
  fragment.appendChild(el.render());
});

Array.from(fragment.querySelectorAll('.star')).forEach((item) => {
  const x = Math.random() * window.innerWidth - window.innerWidth / 2;
  const y = Math.random() * window.innerHeight - window.innerHeight / 2;
  const z = Math.random() * zModifier;
  const scale = zModifier / (zModifier + z);

  const from = set3DPoint({ x, y, z });
  const to = set3DPoint({ x, y, z: z - zModifier });

  const keyframes = [
    { transform: `translate(${from.x}px, ${from.y}px) scale(${from.scale})` },
    { transform: `translate(${to.x}px, ${to.y}px) scale(${to.scale})` },
  ];

  const options = {
    duration: 1000 / scale,
    iterations: Infinity,
    fill: 'both',
    easing: 'linear',
  };

  const keyframeEffect = new KeyframeEffect(item, keyframes, options);

  const anim = new Animation(keyframeEffect, document.timeline);
  anim.play();
});
document.documentElement.appendChild(fragment);
