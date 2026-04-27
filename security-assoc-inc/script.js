document.addEventListener("DOMContentLoaded", async () => {
	/* =========================
	   SHARED HEADER / FOOTER
	========================= */
	async function loadSharedSection(targetId, filePath) {
		const target = document.getElementById(targetId);
		if (!target) return;

		try {
			const response = await fetch(filePath);
			if (!response.ok) throw new Error(`Failed to load ${filePath}`);
			target.innerHTML = await response.text();
		} catch (error) {
			console.error(error);
		}
	}

	await Promise.all([
		loadSharedSection("header", "components/header.html"),
		loadSharedSection("footer", "components/footer.html"),
	]);

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
	========================= */
	const form = document.getElementById("contactForm");
	const modal = document.getElementById("thankYouModal");

	if (form && modal) {
		form.addEventListener("submit", async (e) => {
			e.preventDefault();

			const formData = new FormData(form);

			try {
				const response = await fetch("/", {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams(formData).toString(),
				});

				if (!response.ok) {
					throw new Error("Form submission failed");
				}

				form.reset();
				modal.style.display = "flex";
			} catch (error) {
				alert("There was a problem sending your message. Please try again.");
			}
		});

		modal.addEventListener("click", () => {
			modal.style.display = "none";
		});
	}
	/* =========================
	   SERVICE HOVER MODAL
	========================= */
	const serviceContent = {
		legal: {
			title: "Legal Consulting & Expert Witness Services",
			text: "Mr. Foster provides expert witness and consulting services...",
		},
		risk: {
			title: "Risk Assessment",
			text: "Comprehensive risk assessments identify vulnerabilities...",
		},
		surveys: {
			title: "Security Surveys",
			text: "Security surveys assess existing measures...",
		},
		program: {
			title: "Program Analysis",
			text: "Analysis of how security resources were designed...",
		},
	};

	const serviceModal = document.getElementById("serviceModal");
	const serviceModalText = document.getElementById("serviceModalText");
	const serviceModalTitle = document.getElementById("serviceModalTitle");
	const serviceGrid = document.querySelector(".service-card-grid");
	const serviceCards = document.querySelectorAll(".service-card");

	if (
		serviceModal &&
		serviceModalText &&
		serviceModalTitle &&
		serviceGrid &&
		serviceCards.length
	) {
		serviceCards.forEach((card) => {
			card.addEventListener("mouseenter", () => {
				const service = serviceContent[card.dataset.service];

				serviceModalTitle.textContent = service.title;
				serviceModalText.textContent = service.text;

				serviceModal.classList.add("open");
			});
		});

		serviceGrid.addEventListener("mouseleave", () => {
			serviceModal.classList.remove("open");
		});
	}
});
