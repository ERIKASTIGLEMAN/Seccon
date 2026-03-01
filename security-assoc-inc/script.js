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
