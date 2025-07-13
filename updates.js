document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("emailUpdatesForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const country = document.getElementById("country").value;

    if (!email || !zip || !country) {
      alert("Please fill in all fields.");
      return;
    }

    // Optional: Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // EmailJS integration (replace with your actual IDs)
    const serviceID = "your_service_id";
    const templateID = "your_template_id";
    const publicKey = "your_public_key";

    const templateParams = {
      user_email: email,
      user_zip: zip,
      user_country: country,
    };

    try {
      const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log("SUCCESS!", result.status, result.text);
      alert("Thank you for subscribing! 🎉");
      form.reset();
      toggleForm(); // Close the modal
    } catch (error) {
      console.error("FAILED...", error);
      alert("Something went wrong. Please try again later.");
    }
  });
});
