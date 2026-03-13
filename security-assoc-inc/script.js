document.addEventListener("DOMContentLoaded", () => {
	/* =========================
	   SERVICES ACCORDION
	========================= */
	const serviceItems = document.querySelectorAll(".service-item");
	const servicesSection = document.querySelector(".services");

	if (servicesSection && serviceItems.length) {
		serviceItems.forEach((item) => {
			item.addEventListener("toggle", () => {
				if (item.open) {
					serviceItems.forEach((other) => {
						if (other !== item) other.removeAttribute("open");
					});
				}
			});
		});

		servicesSection.addEventListener("mouseleave", () => {
			serviceItems.forEach((item) => item.removeAttribute("open"));
		});
	}

	/* =========================
	   HAMBURGER MENU
	========================= */
	const hamburger = document.getElementById("hamburger");
	const menu = document.getElementById("menu");
	const nav = document.querySelector(".nav");

	if (hamburger && menu && nav) {
		let closeTimer;

		hamburger.addEventListener("click", (e) => {
			e.stopPropagation();
			menu.classList.toggle("open");
		});

		menu.addEventListener("click", (e) => {
			e.stopPropagation();
		});

		nav.addEventListener("mouseenter", () => {
			clearTimeout(closeTimer);
		});

		nav.addEventListener("mouseleave", () => {
			closeTimer = setTimeout(() => {
				menu.classList.remove("open");
			}, 300);
		});

		document.addEventListener("click", (e) => {
			if (!e.target.closest(".nav")) {
				menu.classList.remove("open");
			}
		});
	}

	/* =========================
	   CONTACT BUTTON (HOME)
	========================= */
	const contactBtn = document.getElementById("contactBtn");
	if (contactBtn) {
		contactBtn.addEventListener("click", () => {
			window.location.href = "mailto:seccon@aol.com";
		});
	}

	/* =========================
   CONTACT FORM + MODAL
   (Netlify Forms)
========================= */

	/* =========================
   CONTACT FORM + MODAL
   (Netlify Forms)
========================= */
	const form = document.getElementById("contactForm");
	const modal = document.getElementById("thankYouModal");

	if (form && modal) {
		form.addEventListener("submit", async (e) => {
			e.preventDefault();

			const formData = new FormData(form);

			try {
				await fetch("/", {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams(formData).toString(),
				});

				modal.style.display = "flex";

				setTimeout(() => {
					modal.style.display = "none";
					form.reset();
				}, 10000);
			} catch (error) {
				alert("There was a problem sending your message. Please try again.");
			}
		});
	}
});
