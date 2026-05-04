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
				console.error(error);
				window.location.href =
					"mailto:seccon@aol.com?subject=Website Inquiry - Security Associates";
			}
		});

		modal.addEventListener("click", () => {
			modal.style.display = "none";
		});
	}
	const serviceContent = {
		legal: {
			title: "Legal Consulting & Expert Witness Services",
			text: "Mr. Foster provides security consulting and expert witness services to law firms representing both plaintiffs and defendants in premises liability and negligent security litigation. His work focuses on foreseeability, standard of care, and the defensibility of security programs central to case evaluation, expert disclosure, and trial strategy..",
		},
		risk: {
			title: "Risk Assessment",
			text: `Comprehensive risk assessments identify vulnerabilities central to negligent security claims, including environmental factors, crime patterns, operational practices, and the reasonableness of security measures at the time of the incident.`,
		},
		surveys: {
			title: "Security Surveys",
			text: `Security surveys assess existing measures, policies, procedures,
							staffing, and physical safeguards against industry standards and
							accepted practices, with a focus on whether the applicable
							standard of care was met.`,
		},
		program: {
			title: "Program Analysis",
			text: `Analysis of how security resources were designed, implemented, and
							managed, including whether measures were reasonably integrated to
							address foreseeable risks and whether those decisions are
							defensible in litigation.`,
		},
	};

	/* =========================
   SERVICE CLICK MODAL
========================= */
	const serviceModal = document.getElementById("serviceModal");
	const serviceModalText = document.getElementById("serviceModalText");
	const serviceModalTitle = document.getElementById("serviceModalTitle");

	function fitTextToContainer(element, maxSize = 30, minSize = 14) {
		let size = maxSize;
		element.style.fontSize = size + "px";

		while (element.scrollHeight > element.clientHeight && size > minSize) {
			size -= 1;
			element.style.fontSize = size + "px";
		}
	}

	if (serviceModal && serviceModalText && serviceModalTitle) {
		document.addEventListener("click", (e) => {
			const clickedCard = e.target.closest(".service-card");
			const clickedInsideModal = e.target.closest(".service-modal-content");

			if (clickedCard) {
				const service = serviceContent[clickedCard.dataset.service];

				if (!service) return;

				serviceModalTitle.textContent = service.title;
				serviceModalText.textContent = service.text;

				serviceModal.classList.add("open");

				return;
			}

			if (!clickedInsideModal) {
				serviceModal.classList.remove("open");
			}
		});
	}
});
