
  // Help Panel Toggle
  const helpToggle = document.getElementById('helpToggle');
  const helpPanel = document.getElementById('helpPanel');
  const closeHelp = document.getElementById('closeHelp');

  helpToggle.addEventListener('click', () => {
    helpPanel.classList.toggle('translate-y-full');
  });

  closeHelp.addEventListener('click', () => {
    helpPanel.classList.add('translate-y-full');
  });