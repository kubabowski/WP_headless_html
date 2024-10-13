// Function to create the hero section
export function createHeroSection(dataArray) {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    console.error("Invalid or empty data array");
    return "";
  }

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
                    <div class="container">
                      <h2 class="header h1">${slide.header || ""}</h2>
                      <div class="description">${slide.desc || ""}</div>
                        <a href="${
                          slide.button.url
                        }" class="btn btn-blue btn-lg">${
                slide.button.title || ""
              }</a>
                    </div>
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

  window.heroTitles = titles;

  return heroContent;
}

export function heroSwiper() {
  const heroSwiper = new Swiper("#hero-swiper", {
    pagination: {
      el: "#hero-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        const title = window.heroTitles[index] || "";

        const bullet = `<span class="${className}">${title}</span>`;

        if (index === window.heroTitles.length - 1) {
          return bullet + `<div id="swiper-control"></div>`;
        }

        return bullet;
      },
    },
    autoplay: {
      delay: 4300,
      disableOnInteraction: false,
    },
    effect: "fade",
  });

  let isAutoplaying = true;

  function reset_animation() {
    var el = document.querySelector(".swiper-pagination-bullet");
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = null;
  }

  setTimeout(() => {
    const swiperControl = document.querySelector("#swiper-control");
    const pagination = document.querySelector("#hero-pagination");
    const bullet = document.querySelector(".swiper-pagination-bullet");

    if (swiperControl) {
      swiperControl.addEventListener("click", function () {
        if (isAutoplaying) {
          heroSwiper.autoplay.pause();
          pagination.classList.add("paused");
        } else {
          heroSwiper.autoplay.start();
          pagination.classList.remove("paused");
          reset_animation();
        }
        isAutoplaying = !isAutoplaying;
      });
    }
  }, 100);
}
