document.addEventListener("mousemove", (e) => {
  const aura = document.querySelector(".aura-bg");
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  aura.style.transform = `translate(${x}px, ${y}px) scale(1.2)`;
});
