
// Freeze viewport at category slider until scrolled to end
    const section = document.getElementById('categorySliderSection');
    const slider = document.getElementById('parallaxCategorySlider');
    
    

 

    window.addEventListener('scroll', freezeScroll);

    continueBtn.addEventListener('click', function() {
      section.style.position = '';
      section.style.top = '';
      section.style.left = '';
      section.style.width = '';
      section.style.zIndex = '';
      document.body.style.overflow = '';
      frozen = false;
      continueBtn.classList.add('hidden');
      window.scrollTo({ top: section.offsetTop + section.offsetHeight, behavior: 'smooth' });
    });

    // Enable smooth horizontal scroll with mouse wheel
slider.addEventListener('wheel', (e) => {
  // Only act if frozen is true & vertical intent detected
  if (!frozen || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;

  e.preventDefault();

  // Apply smooth scrolling (adjust multiplier if needed)
  slider.scrollBy({
    left: e.deltaY,
    behavior: 'smooth'
  });
}, { passive: false });

const sensitivity = 3; // adjust speed
slider.scrollBy({ left: e.deltaY * sensitivity, behavior: 'smooth' });


