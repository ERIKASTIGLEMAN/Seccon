const serviceItems = document.querySelectorAll(".service-item");
const servicesSection = document.querySelector(".services");

serviceItems.forEach((item) => {
	// Open one at a time
	item.addEventListener("toggle", () => {
		if (item.open) {
			serviceItems.forEach((other) => {
				if (other !== item) {
					other.removeAttribute("open");
				}
			});
		}
	});
});

// Close all when mouse leaves services section
servicesSection.addEventListener("mouseleave", () => {
	serviceItems.forEach((item) => item.removeAttribute("open"));
});

// Contact form submission

document.getElementById("contactForm").addEventListener("submit", function (e) {
	e.preventDefault();

	const formData = new FormData(this);

	fetch("send-contact.php", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.text())
		.then(() => {
			const modal = document.getElementById("thankYouModal");
			modal.style.display = "flex";

			setTimeout(() => {
				modal.style.display = "none";
				this.reset();
			}, 10000);
		})
		.catch(() => {
			alert("There was an error sending your message. Please try again.");
		});
});
