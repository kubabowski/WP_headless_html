export async function fetchServicesCategoriesData() {
  try {
    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/service-category?_fields=link,name,id,slug,acf&acf_format=standard"
    );
    const data = await response.json();

    if (data.length > 0) {
      return data;
    } else {
      console.error("No categories found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

async function fetchServicesData() {
  try {
    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/service?acf_format=standard&_fields=acf,id"
    );
    const data = await response.json();

    if (data.length > 0) {
      return data;
    } else {
      console.error("No service items found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
}

export async function createServicesSection(servicesContentData) {
  if (!servicesContentData || typeof servicesContentData !== "object") {
    console.error("Invalid or empty servicesContentData data");
    return "";
  }

  const { title = "", header = "" } = servicesContentData;

  const servicesCategoriesData = await fetchServicesCategoriesData();
  const servicesData = await fetchServicesData();

  if (!servicesCategoriesData || !servicesData) {
    return "<p>Error loading services section.</p>";
  }

  const titles = servicesCategoriesData.map((category) => category.name || "");

  const servicesContent = `
  <div class="services" style="margin-top:100px; margin-bottom:100px;">
    <div class="container">
      <h3 class="h5">${title}</h3>
      <h3 class="h2 header">${header}</h3>

      <div class="nav-row"> 
          <div class="col-1">
            <div thumbsSlider="" id="services-swiper-thumbs" class="swiper mySwiper">
            <div class="swiper-wrapper">
              ${servicesCategoriesData
                .map((category) => {
                  return `
                  <div class="swiper-slide cat-tab" >
                      <h4 class="cat-name" >${category.name}</h4>
                  </div>`;
                })
                .join("")}
            </div>
          </div>
          </div>

          <div class="col-2 flex">
            <div id="services-prev" class="swiper-button-prev"></div>
            <div id="services-next" class="swiper-button-next"></div>
          </div>
      </div>


      <div id="services-swiper" class="swiper mySwiper">
        <div class="swiper-wrapper">
          ${servicesCategoriesData
            .map((category) => {
              const filteredServices = servicesData.filter(
                (service) =>
                  service.acf.service_category &&
                  service.acf.service_category.term_id === category.id
              );

              return `
              <div class="swiper-slide" >
                  <div class="slide-content">
                    <div class="col-1">

                      <div id="accordion-services-${
                        category.id
                      }" class="accordion-container accordion-services">
                        ${filteredServices
                          .map((service) => {
                            return `

                          <div class="ac">
                            <h2 class="ac-header">
                              <button type="button" class="ac-trigger">${service.acf.service_title}</button>
                            </h2>
                            <div class="ac-panel">
                              <p class="ac-text">${service.acf.service_desc}</p>
                            </div>
                          </div>
                            `;
                          })
                          .join("")}
                        </div>
                    </div>
                    <div class="col-2">
                      <img width=500 height=500 src="${
                        category.acf.service_cat_image.url
                      }">
                    </div>
                  </div>
              </div>`;
            })
            .join("")}
        </div>
      </div>
    </div>
  </div>
`;

  window.serviceTitles = titles;

  const servicesFooter = `
  ${servicesCategoriesData
    .map((category) => {
      return `
          <ul>
              <li>
                <a href="${category.link}">
                  ${category.name}
                </a>
              </li>
          </ul>`;
    })
    .join("")}`;

  const footerServices = document.getElementById("footer-services");
  footerServices.innerHTML = servicesFooter;

  return servicesContent;
}

export function servicesSwiper() {
  var thumbsSwiper = new Swiper("#services-swiper-thumbs", {
    loop: true,
    spaceBetween: 2,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var mainSwiper = new Swiper("#services-swiper", {
    loop: true,
    effect: "fade",
    centeredSlides: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: "#services-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: "#services-next",
      prevEl: "#services-prev",
    },

    thumbs: {
      swiper: thumbsSwiper,
    },
  });

  document
    .querySelectorAll(".accordion-services")
    .forEach((accordionElement) => {
      new Accordion(`#${accordionElement.id}`);
      console.log("accordionElement ", accordionElement.id, " initialized");
    });
}
