// Freeze viewport at category slider until scrolled to end
    const section = document.getElementById('categorySliderSection');
    const slider = document.getElementById('parallaxCategorySlider');
    const continueBtn = document.getElementById('continueBtn');
    let frozen = false;

    function freezeScroll(e) {
      if (!frozen) {
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top <= 0 && sectionRect.bottom > window.innerHeight) {
          document.body.style.overflow = 'hidden';
          section.style.position = 'fixed';
          section.style.top = '0';
          section.style.left = '0';
          section.style.width = '100vw';
          section.style.zIndex = '100';
          frozen = true;
        }
      }
      // Show continue button if scrolled to end
      if (frozen) {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScroll - 10) {
          continueBtn.classList.remove('hidden');
        } else {
          continueBtn.classList.add('hidden');
        }
      }
    }

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

    // Allow horizontal scroll with mouse wheel
    slider.addEventListener('wheel', function(e) {
      if (frozen && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    }, { passive: false });