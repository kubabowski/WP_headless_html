async function fetchProductsData() {
  try {
    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/product?_fields=acf&acf_format=standard"
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

export async function createProductsSection() {
  const productsData = await fetchProductsData();

  if (!productsData) {
    return "<p>Error loading products section.</p>";
  }

  const productsContent = `
    <div class="products-home" style="margin-top:100px; margin-bottom:100px;">
      <div class="container">
        <div id="services-swiper" class="swiper mySwiper">
          <div id="services-pagination" class="swiper-pagination"></div>
          <div class="swiper-wrapper">
            ${productsData
              .map((product) => {
                const { pro_name, pro_desc, pro_logo, image_1 } = product.acf;
                return `
                <div class="product">
                    <img src="${pro_logo.url}" alt="${pro_logo.alt}" class="product-logo" />
                    <h3 class="product-name">${pro_name}</h3>
                    <p class="product-desc">${pro_desc}</p>
                    <img src="${image_1.url}" alt="${image_1.alt}" class="product-image" />
                  </div>`;
              })
              .join("")}
          </div>
        </div>
              
      </div>
    </div>
  `;

  return productsContent;
}
