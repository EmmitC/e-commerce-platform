
    function toggleForm() {
      const modal = document.getElementById('updatesForm');
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
    }

    document.getElementById("emailUpdatesForm")?.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thanks for subscribing!");
      toggleForm();
    });