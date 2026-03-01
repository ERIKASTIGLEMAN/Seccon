document.addEventListener("DOMContentLoaded", () => {
	/* =========================
	   SERVICES ACCORDION
	========================= */
	const serviceItems = document.querySelectorAll(".service-item");
	const servicesSection = document.querySelector(".services");

	if (servicesSection && serviceItems.length) {
		// Only one open at a time
		serviceItems.forEach((item) => {
			item.addEventListener("toggle", () => {
				if (item.open) {
					serviceItems.forEach((other) => {
						if (other !== item) other.removeAttribute("open");
					});
				}
			});
		});

		// Close all when mouse leaves services area
		servicesSection.addEventListener("mouseleave", () => {
			serviceItems.forEach((item) => item.removeAttribute("open"));
		});
	}

	/* =========================
	   HAMBURGER MENU
	========================= */
	const hamburger = document.getElementById("hamburger");
	const menu = document.getElementById("menu");

	if (hamburger && menu) {
		hamburger.addEventListener("click", (e) => {
			e.stopPropagation();
			menu.classList.toggle("open");
		});

		document.addEventListener("click", (e) => {
			if (!e.target.closest(".nav")) {
				menu.classList.remove("open");
			}
		});
	}

	/* =========================
	   CONTACT FORM + MODAL
	========================= */
	const form = document.getElementById("contactForm");
	const modal = document.getElementById("thankYouModal");

	if (form && modal) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const formData = new FormData(form);

			fetch("send-contact.php", {
				method: "POST",
				body: formData,
			}).finally(() => {
				modal.style.display = "flex";

				setTimeout(() => {
					modal.style.display = "none";
					form.reset();
				}, 10000);
			});
		});
	}
});
