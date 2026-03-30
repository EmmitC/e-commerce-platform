
    function toggleForm() {
      const modal = document.getElementById('updatesForm');
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
    }

    window.toggleForm = toggleForm;