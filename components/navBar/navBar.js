// navBar.js
class MyHeader extends HTMLElement {
  setHeaderData(logo, menuItems) {
    this.innerHTML = `
          <header>
              <a href="#">
                  ${logo}
              </a>
              <ul>
                  ${menuItems
                    .map(
                      (item) =>
                        `<li><a href="${item.slug}">${item.title.rendered}</a></li>`
                    )
                    .join("")}
              </ul>
          </header>
          `;
  }

  connectedCallback() {
    this.innerHTML = `
          <header>
              <div class="loading"></div>
          </header>
          `;
  }
}

customElements.define("my-header", MyHeader);

async function fetchData() {
  try {
    const logo = "Dummy Logo";

    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/pages?_fields=slug,title"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      const menuItems = data.map((item) => ({
        slug: item.slug,
      }));

      const headerElement = document.querySelector("my-header");
      if (headerElement) {
        headerElement.setHeaderData(logo, menuItems);
      }
    } else {
      console.error("No pages found.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchData);
