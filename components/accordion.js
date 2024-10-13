let resizeTimeout;
let lastWindowWidth = window.innerWidth;

export function handleAccordionClick(event) {
  const clickedElement = event.target;

  if (!clickedElement.hasAttribute("data-target")) {
    return;
  } else {
    const dataTargetValue = clickedElement.getAttribute("data-target");
    const accordionBodies = document.querySelectorAll(".accordion-content");

    // Function to measure heights and store them
    const storeAccordionHeights = () => {
      const heightsArray = [];
      accordionBodies.forEach((accordionBody) => {
        accordionBody.style.height = "auto"; // Temporarily set to auto to measure
        const height = accordionBody.scrollHeight; // Measure the full height
        const id = accordionBody.getAttribute("id");
        heightsArray.push({ id, height });
        accordionBody.style.height = "0px"; // Set back to 0px for collapsed state
      });
      return heightsArray;
    };

    // Store all heights in an array
    let accordionHeights = storeAccordionHeights();

    // Function to handle window resize and recalculate heights if necessary
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const resizeDiff = Math.abs(currentWidth - lastWindowWidth);

      if (resizeDiff > 100) {
        // Recalculate the heights only if the window size changes by more than 100px
        accordionHeights = storeAccordionHeights();
        lastWindowWidth = currentWidth; // Update the last window width after recalculating
      }
    };

    // Add window resize event listener with debounce
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 3000); // Only recalculate if 3 seconds pass since the last resize
    });

    // Reset active classes and heights
    accordionBodies.forEach((accordionBody) => {
      accordionBody.classList.remove("active");
      accordionBody.classList.remove("hidden"); // Remove hidden class immediately
      accordionBody.style.height = "0px"; // Collapse all accordion contents
      accordionBody.style.opacity = "0"; // Ensure opacity is reset
    });

    const accordionToggles = document.querySelectorAll(".accordion-toggle");
    accordionToggles.forEach((accordionToggle) => {
      accordionToggle.classList.remove("active");
    });

    // Find the matching content element
    const matchingContent = document.querySelector(dataTargetValue);

    if (matchingContent) {
      if (clickedElement.classList.contains("active")) {
        clickedElement.classList.remove("active");
        matchingContent.classList.remove("active");

        // Remove closed class only if it exists
        if (matchingContent.classList.contains("closed")) {
          matchingContent.classList.remove("closed");
        }

        // Add hidden class to trigger fade out
        matchingContent.classList.add("hidden"); // Start fade out

        // Set height to 0 after a slight delay to allow fade out animation to complete
        setTimeout(() => {
          matchingContent.style.height = "0px"; // Collapse this element after delay
        }, 300); // Matches the transition duration for height
      } else {
        clickedElement.classList.add("active");
        matchingContent.classList.add("active");

        // Add closed class to the currently active element
        matchingContent.classList.add("closed");

        // Retrieve the height for the clicked accordion content
        const matchingHeight = accordionHeights.find(
          (entry) => `#${entry.id}` === dataTargetValue
        ).height;

        // Set the height based on the stored value (expand)
        matchingContent.style.height = `${matchingHeight}px`;
        matchingContent.style.opacity = "1"; // Ensure fully visible when expanding

        // Remove the closed class after 0.5 seconds
        setTimeout(() => {
          matchingContent.classList.remove("closed");
        }, 500); // Delay for 0.5 seconds
      }
    }
  }

  event.preventDefault();
}
