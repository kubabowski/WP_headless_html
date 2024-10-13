async function fetchServicesCategoriesData() {
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
      <h3 class="h3">${header}</h3>
      <div id="services-swiper" class="swiper mySwiper">
      
        <div id="services-pagination" class="swiper-pagination"></div>
        <div id="services-next" class="swiper-button-next"></div>
        <div id="services-prev" class="swiper-button-prev"></div>

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
                      <h3 style="color:white;">${category.name}</h3>

                      ${filteredServices
                        .map((service) => {
                          return `
                            <h3 class="accordion-toggle" data-target="#accordion-service-${service.id}">
                              ${service.acf.service_title}
                            </h3>
                          
                          <div class="accordion-content" id="accordion-service-${service.id}">
                            <p>${service.acf.service_desc}</p>
                          </div>
                          `;
                        })
                        .join("")}
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

  return servicesContent;
}

export function servicesSwiper() {
  new Swiper("#services-swiper", {
    effect: "fade",
    spaceBetween: 30,
    centeredSlides: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: "#services-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        const title = window.serviceTitles[index] || "";
        return `<span class="${className}">${title}</span>`;
      },
    },
    navigation: {
      nextEl: "#services-next",
      prevEl: "#services-prev",
    },
  });
}
