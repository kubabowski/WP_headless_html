async function fetchProductsData() {
  try {
    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/product?_fields=acf,link&acf_format=standard"
    );
    const data = await response.json();

    if (data.length > 0) {
      return data;
    } else {
      console.error("No Products found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Products:", error);
    return null;
  }
}

export async function createProductsSection(productsContentData) {
  if (!productsContentData || typeof productsContentData !== "object") {
    console.error("Invalid or empty caseStudyData");
    return "";
  }

  const productsData = await fetchProductsData();

  if (!productsData) {
    return "<p>Error loading products section.</p>";
  }

  const productsContent = `
    <div class="products-home">
      <div class="container">
      <h2 class="h2">${productsContentData.title}</h2>
      <h2 class="products-section-desc">${productsContentData.desc}</h2>
        <div id="products-swiper" class="swiper mySwiper">
          <div class="swiper-wrapper">
            ${productsData
              .map((product) => {
                const { pro_name, pro_desc, pro_logo, text_1, image_1 } =
                  product.acf;
                const imageUrl = image_1 ? image_1.url : "";
                return `

                  <div class="swiper-slide"">
                    <div class="slide-content">
                      <div class="product">
                        <div class="product-image" style="background-image: url('${imageUrl}')">
                          <img src="${pro_logo.url}" alt="${pro_logo.alt}" class="product-logo" />
                        </div>
                        <div class="product-desc-container">
                          <h3 class="product-name">OUR PRODUCT - ${pro_name}</h3>
                          <p class="product-desc">${pro_desc}</p>
                          <p class="h5">${text_1}</p>
                          <a class="link" href="${product.link}">
                            Read more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  `;
              })
              .join("")}
          </div>
        </div>
              
      </div>
    </div>
  `;

  return productsContent;
}

export function productsSwiper() {
  new Swiper("#products-swiper", {
    // effect: "fade",
    slidesPerView: 2,
    spaceBetween: 30,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    navigation: {
      nextEl: "#study-next",
      prevEl: "#study-prev",
    },
  });
}
