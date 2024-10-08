export function createHeroSection(dataArray) {
  // Check if the dataArray exists and is an array
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    console.error("Invalid or empty data array");
    return "";
  }

  const heroContent = `
      <div id="hero-swiper" class="swiper mySwiper">
          <div class="swiper-wrapper">
              ${dataArray
                .map((slide) => {
                  return `
                  <div class="swiper-slide">
                      <div class="text">
                          <h1 class="header">${slide.header || ""}</h1>
                          <div class="description">${slide.desc || ""}</div>
                      </div>
                      <img src="${slide.image?.url || ""}" alt="">
                  </div>
                `;
                })
                .join("")}
          </div>
      </div>
    `;

  console.log(dataArray); // Check the hero data
  return heroContent;
}

export function heroSwiper() {
  new Swiper("#hero-swiper", {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}
