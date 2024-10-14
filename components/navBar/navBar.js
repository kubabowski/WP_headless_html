async function fetchHeaderData() {
  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer-nav");
  try {
    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/pages?_fields=slug,title,menu_order,template&orderby=menu_order&order=asc"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      setHeaderData(data, headerElement);
      setFooterData(data, footerElement);
    } else {
      console.error("No pages found.");
      headerElement.innerHTML = "<p>No menu items available.</p>";
      footerElement.innerHTML = "<p>No menu items available.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    headerElement.innerHTML = "<p>Error loading menu.</p>";
    footerElement.innerHTML = "<p>Error loading footer menu.</p>";
  }
}

export function generateNav(menuItems) {
  return menuItems

    .map(
      (item) =>
        `<li class="${item.template == "page-with-sidebar" ? "dropdown" : ""}">
            <a href="${item.slug}">
              ${item.title.rendered}
            </a>
          </li>
          `
    )
    .join("");
}

function setHeaderData(menuItems, headerElement) {
  const lastMenuItem = menuItems[menuItems.length - 1];
  headerElement.innerHTML = `
    <div class="container">
      <a href="#">
                <img
              class="logo"
              width="78"
              height="34"
              alt="logo"
              src="../../../assets/images/logo.svg"
            />
            </a>
      <nav>
        <ul>
          ${generateNav(menuItems)}
        </ul>
        <a class="btn btn-blue" href="${lastMenuItem.slug}">${
    lastMenuItem.title.rendered
  }</a>
      </nav>
    </div>
  `;
}

function setFooterData(menuItems, footerElement) {
  footerElement.innerHTML = `
    <nav>
      <ul>
        ${generateNav(menuItems)}
      </ul>
    </nav>
  `;
}

document.addEventListener("DOMContentLoaded", fetchHeaderData);
