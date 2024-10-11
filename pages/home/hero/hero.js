// Function to create the hero section
export function createHeroSection(dataArray) {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    console.error("Invalid or empty data array");
    return "";
  }

  // Store titles in a separate array for easy access in heroSwiper
  const titles = dataArray.map((slide) => slide.title || "");

  const heroContent = `
    <div class="hero">
      <div id="hero-swiper" class="swiper mySwiper">
        <div class="swiper-wrapper">
          ${dataArray
            .map((slide) => {
              return `
              <div class="swiper-slide">
                <div class="inner" style="background-image: url('${
                  slide.image ? slide.image.url : ""
                }')">
                  <div class="text">
                    <h2 class="header">${slide.header || ""}</h2>
                    <div class="description">${slide.desc || ""}</div>
                    <a href="${slide.button.url}" class="description">${
                slide.button.title || ""
              }</a>
                  </div>
                </div>
              </div>`;
            })
            .join("")}
        </div>
      </div>
      <div id="hero-pagination" class="swiper-pagination"></div>
    </div>
  `;

  // Store titles globally for use in heroSwiper
  window.heroTitles = titles; // Or store in a closure if you prefer

  return heroContent;
}

// Function to initialize the Swiper
export function heroSwiper() {
  new Swiper("#hero-swiper", {
    pagination: {
      el: "#hero-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        // Access the title based on the index
        const title = window.heroTitles[index] || ""; // Use global title array
        return `<span class="${className}">${title}</span>`;
      },
    },
    effect: "fade",
  });
}
