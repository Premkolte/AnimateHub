const CHALLENGES = [
  {
    id: 1,
    title: "Fade In Card",
    difficulty: "Easy",
    points: 50,
    targetTip: "Make a box fade in from opacity 0 to 1 in 1s.",
    checks: ["opacity", "animation", "keyframes", "1s"],
    starter: `<style>
.box{
  width:140px;height:140px;border-radius:16px;
  background:#3b82f6;margin:30px auto;opacity:0;
  /* your animation here */
}
</style>
<div class="box"></div>
<script>
// Hint: Define @keyframes fadeIn and apply animation to .box
</script>`,
  },
  {
    id: 2,
    title: "Slide Up",
    difficulty: "Easy",
    points: 50,
    targetTip: "Slide a circle up 80px while fading in.",
    checks: ["transform", "translateY", "animation", "keyframes"],
    starter: `<style>
.ball{
  width:90px;height:90px;border-radius:50%;
  background:#10b981;margin:50px auto;opacity:0;
  /* animate to translateY(-80px) and opacity:1 */
}
</style>
<div class="ball"></div>`,
  },
  {
    id: 3,
    title: "Bouncy Scale",
    difficulty: "Easy",
    points: 60,
    targetTip: "Scale from 0.7 → 1 with a bouncy easing feel.",
    checks: ["scale", "animation", "keyframes"],
    starter: `<style>
.item{width:120px;height:120px;border-radius:20px;background:#f59e0b;margin:40px auto;transform:scale(.7)}
</style>
<div class="item"></div>`,
  },
  {
    id: 4,
    title: "Spinner",
    difficulty: "Easy",
    points: 50,
    targetTip: "Create a looping spinner (rotate 360°).",
    checks: ["rotate", "360deg", "infinite", "animation"],
    starter: `<style>
.spinner{
  width:80px;height:80px;border-radius:50%;border:8px solid #ddd;border-top-color:#6366f1;margin:40px auto;
  /* infinite rotate */
}
</style>
<div class="spinner"></div>`,
  },
  {
    id: 5,
    title: "Pulse Button",
    difficulty: "Easy",
    points: 60,
    targetTip: "Make a button pulse (grow/shrink).",
    checks: ["@keyframes", "scale", "animation"],
    starter: `<style>
.btn{display:block;margin:50px auto;padding:12px 24px;border-radius:12px;background:#8b5cf6;color:#fff;border:none;font-weight:700}
</style>
<button class="btn">Pulse Me</button>`,
  },
  {
    id: 6,
    title: "Shake Effect",
    difficulty: "Easy",
    points: 60,
    targetTip: "Shake a box left and right quickly.",
    checks: ["translateX", "keyframes", "animation"],
    starter: `<style>
.box{width:120px;height:120px;background:#ef4444;margin:40px auto}
</style>
<div class="box"></div>`,
  },
  {
    id: 7,
    title: "Flip Card",
    difficulty: "Medium",
    points: 80,
    targetTip: "Flip a card 180° on the Y axis.",
    checks: ["rotateY", "transform", "animation"],
    starter: `<style>
.card{width:120px;height:160px;background:#6366f1;margin:40px auto}
</style>
<div class="card"></div>`,
  },
  {
    id: 8,
    title: "Typewriter Text",
    difficulty: "Medium",
    points: 80,
    targetTip: "Reveal text like a typewriter effect.",
    checks: ["steps", "width", "overflow", "animation"],
    starter: `<style>
.text{font:24px monospace;white-space:nowrap;overflow:hidden;width:0;border-right:2px solid}
</style>
<div class="text">Animate This Text</div>`,
  },
  {
    id: 9,
    title: "Wobble",
    difficulty: "Medium",
    points: 80,
    targetTip: "Make a rectangle wobble (rotate small angles).",
    checks: ["rotate", "animation", "keyframes"],
    starter: `<style>
.rect{width:160px;height:80px;background:#22d3ee;margin:40px auto}
</style>
<div class="rect"></div>`,
  },
  {
    id: 10,
    title: "Loading Dots",
    difficulty: "Medium",
    points: 80,
    targetTip: "Animate 3 dots bouncing in sequence.",
    checks: ["scale", "animation-delay", "infinite"],
    starter: `<style>
.dot{width:16px;height:16px;background:#000;border-radius:50%;display:inline-block;margin:0 4px}
</style>
<div class="dot"></div><div class="dot"></div><div class="dot"></div>`,
  },
  {
    id: 11,
    title: "Slide Carousel",
    difficulty: "Medium",
    points: 80,
    targetTip: "Slide items horizontally in a loop.",
    checks: ["translateX", "infinite", "animation"],
    starter: `<style>
.track{display:flex;gap:12px;overflow:hidden;width:300px;margin:auto}
.item{width:80px;height:80px;background:#f87171}
</style>
<div class="track">
 <div class="item"></div><div class="item"></div><div class="item"></div>
</div>`,
  },
  {
    id: 12,
    title: "Heartbeat",
    difficulty: "Medium",
    points: 80,
    targetTip: "Animate a heart shape to beat (scale up/down).",
    checks: ["scale", "keyframes", "animation"],
    starter: `<style>
.heart{width:100px;height:100px;background:red;transform:rotate(45deg);margin:40px auto;position:relative}
.heart:before,.heart:after{content:"";position:absolute;width:100px;height:100px;background:red;border-radius:50%}
.heart:before{left:-50px}
.heart:after{top:-50px}
</style>
<div class="heart"></div>`,
  },
  {
    id: 13,
    title: "Orbiting Planet",
    difficulty: "Medium",
    points: 80,
    targetTip: "Make a small circle orbit around a larger one.",
    checks: ["rotate", "transform-origin", "animation"],
    starter: `<style>
.planet{width:40px;height:40px;background:#10b981;border-radius:50%;position:relative;margin:80px auto}
.moon{width:20px;height:20px;background:#fbbf24;border-radius:50%;position:absolute;top:10px;left:60px}
</style>
<div class="planet"><div class="moon"></div></div>`,
  },
  {
    id: 14,
    title: "Wave Text",
    difficulty: "Medium",
    points: 80,
    targetTip: "Animate letters to wave up and down sequentially.",
    checks: ["translateY", "animation-delay"],
    starter: `<style>
span{display:inline-block;font-size:28px;margin:0 2px}
</style>
<div>
 <span>W</span><span>A</span><span>V</span><span>E</span>
</div>`,
  },
  {
    id: 15,
    title: "Falling Snow",
    difficulty: "Medium",
    points: 80,
    targetTip: "Create multiple snowflakes falling infinitely.",
    checks: ["translateY", "infinite", "keyframes"],
    starter: `<style>
.snow{position:absolute;width:12px;height:12px;background:white;border-radius:50%}
</style>
<div class="snow"></div><div class="snow"></div><div class="snow"></div>`,
  },
  {
    id: 16,
    title: "Swinging Pendulum",
    difficulty: "Hard",
    points: 100,
    targetTip: "Animate a pendulum swinging side to side.",
    checks: ["rotate", "transform-origin", "animation"],
    starter: `<style>
.pendulum{width:6px;height:180px;background:#333;margin:20px auto;transform-origin:top}
</style>
<div class="pendulum"></div>`,
  },
  {
    id: 17,
    title: "Ripple Effect",
    difficulty: "Hard",
    points: 100,
    targetTip: "Create expanding ripple circles.",
    checks: ["scale", "opacity", "infinite"],
    starter: `<style>
.ripple{width:100px;height:100px;border-radius:50%;border:4px solid #3b82f6;margin:40px auto}
</style>
<div class="ripple"></div>`,
  },
  {
    id: 18,
    title: "Glowing Neon",
    difficulty: "Hard",
    points: 100,
    targetTip: "Make text glow with animated shadows.",
    checks: ["text-shadow", "animation", "keyframes"],
    starter: `<style>
.glow{font-size:40px;color:#fff;text-align:center;margin-top:50px}
</style>
<div class="glow">NEON</div>`,
  },
  {
    id: 19,
    title: "Morphing Shape",
    difficulty: "Hard",
    points: 100,
    targetTip: "Morph between circle and square.",
    checks: ["border-radius", "keyframes", "animation"],
    starter: `<style>
.shape{width:120px;height:120px;background:#ec4899;margin:40px auto}
</style>
<div class="shape"></div>`,
  },
  {
    id: 20,
    title: "Path Animation",
    difficulty: "Hard",
    points: 100,
    targetTip: "Move an element along a path using translate.",
    checks: ["translate", "animation", "keyframes"],
    starter: `<style>
.box{width:40px;height:40px;background:#0ea5e9;margin:60px auto}
</style>
<div class="box"></div>`,
  },
  {
    id: 21,
    title: "3D Cube Spin",
    difficulty: "Hard",
    points: 120,
    targetTip: "Animate a 3D cube rotation.",
    checks: ["rotateX", "rotateY", "perspective"],
    starter: `<style>
.scene{width:120px;height:120px;margin:60px auto;perspective:600px}
.cube{width:100%;height:100%;position:relative;transform-style:preserve-3d}
.face{position:absolute;width:120px;height:120px;background:#8b5cf6;opacity:.8}
</style>
<div class="scene"><div class="cube"><div class="face"></div></div></div>`,
  },
  {
    id: 22,
    title: "SVG Line Draw",
    difficulty: "Hard",
    points: 120,
    targetTip: "Animate SVG stroke to look like drawing.",
    checks: ["stroke-dasharray", "stroke-dashoffset"],
    starter: `<svg width="200" height="100">
  <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
    stroke="blue" fill="transparent" stroke-width="3"/>
</svg>`,
  },
  {
    id: 23,
    title: "Clipping Reveal",
    difficulty: "Hard",
    points: 120,
    targetTip: "Reveal text using clip-path animation.",
    checks: ["clip-path", "animation", "keyframes"],
    starter: `<style>
.text{font-size:48px;font-weight:700;text-align:center;background:linear-gradient(90deg,#f43f5e,#3b82f6);-webkit-background-clip:text;color:transparent}
</style>
<div class="text">Reveal</div>`,
  },
  {
    id: 24,
    title: "Fire Effect",
    difficulty: "Hard",
    points: 120,
    targetTip: "Simulate flickering fire effect with blur.",
    checks: ["filter", "animation", "keyframes"],
    starter: `<style>
.fire{width:60px;height:80px;background:orange;margin:60px auto;border-radius:50%}
</style>
<div class="fire"></div>`,
  },
  {
    id: 25,
    title: "Galaxy Background",
    difficulty: "Hard",
    points: 120,
    targetTip: "Animate stars twinkling in background.",
    checks: ["opacity", "infinite", "keyframes"],
    starter: `<style>
.star{position:absolute;width:4px;height:4px;background:white;border-radius:50%}
</style>
<div class="star"></div><div class="star"></div>`,
  },
  {
    id: 26,
    title: "Text Bounce In",
    difficulty: "Medium",
    points: 90,
    targetTip: "Bounce text in from the top.",
    checks: ["translateY", "ease-out", "keyframes"],
    starter: `<style>
h1{text-align:center;font-size:40px}
</style>
<h1>Bounce!</h1>`,
  },
  {
    id: 27,
    title: "Button Hover Glow",
    difficulty: "Medium",
    points: 90,
    targetTip: "Add glowing hover animation to a button.",
    checks: ["hover", "box-shadow", "transition"],
    starter: `<style>
button{padding:12px 24px;border-radius:12px;border:none;background:#3b82f6;color:#fff;font-size:16px;margin:50px auto;display:block}
</style>
<button>Hover Me</button>`,
  },
  {
    id: 28,
    title: "Accordion Expand",
    difficulty: "Medium",
    points: 90,
    targetTip: "Animate accordion height expand/collapse.",
    checks: ["max-height", "transition"],
    starter: `<style>
.panel{max-height:0;overflow:hidden;transition:max-height .6s ease}
</style>
<div class="panel">Content</div>`,
  },
  {
    id: 29,
    title: "Loading Bar Fill",
    difficulty: "Easy",
    points: 60,
    targetTip: "Animate a progress bar filling left to right.",
    checks: ["width", "animation", "keyframes"],
    starter: `<style>
.bar{width:0;height:20px;background:#22c55e;margin:40px auto}
</style>
<div class="bar"></div>`,
  },
  {
    id: 30,
    title: "Confetti Burst",
    difficulty: "Hard",
    points: 120,
    targetTip: "Make multiple shapes fall like confetti.",
    checks: ["rotate", "translateY", "animation"],
    starter: `<style>
.confetti{width:10px;height:10px;background:#f87171;position:absolute}
</style>
<div class="confetti"></div><div class="confetti"></div>`,
  },
];

export default CHALLENGES