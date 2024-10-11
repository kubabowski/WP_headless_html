export function handleAccordionClick(event) {
  const clickedElement = event.target;

  // Ensure clicked element has the data-target attribute
  if (!clickedElement.hasAttribute("data-target")) {
    return;
  } else {
    const dataTargetValue = clickedElement.getAttribute("data-target");

    const accordionBodies = document.querySelectorAll(".accordion-content");

    console.log(dataTargetValue);
    console.log(accordionBodies);

    accordionBodies.forEach((accordionBody) => {
      accordionBody.classList.remove("active");
    });

    const accordionToggles = document.querySelectorAll(".accordion-toggle");
    accordionToggles.forEach((accordionToggle) => {
      accordionToggle.classList.remove("active");
    });

    const matchingContent = document.querySelector(dataTargetValue);
    if (matchingContent) {
      if (clickedElement.classList.contains("active")) {
        clickedElement.classList.remove("active");
        matchingContent.classList.remove("active");
      } else {
        clickedElement.classList.add("active");
        matchingContent.classList.add("active");
      }
    }
  }

  event.preventDefault();
}
