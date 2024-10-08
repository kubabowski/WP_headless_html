import "../../components/navBar/navBar.js";
import { createHeroSection, heroSwiper } from "./hero/hero.js";

async function fetchData() {
  try {
    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/pages?search=home&acf_format=standard"
    );
    const data = await response.json();

    if (data.length > 0) {
      const pageData = data[0];
      return pageData.acf;
    } else {
      console.error("No page found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function showLoadingIndicator(section) {
  const hero = document.getElementById(section);
  hero.innerHTML = `
    <div class="loading">
      <p>Loading...</p>
    </div>
  `;
}

function hideLoadingIndicator() {
  const loadingElement = document.querySelector(".loading");
  if (loadingElement) {
    loadingElement.remove();
  }
}

(async () => {
  const hero = document.getElementById("hero");

  showLoadingIndicator("hero");

  const WPData = await fetchData();

  try {
    if (WPData && Array.isArray(WPData.hero)) {
      const heroContent = createHeroSection(WPData.hero);
      hero.innerHTML = heroContent;
      heroSwiper();
    } else {
      console.error("No hero data found.");
      hero.innerHTML = "<p>No hero data available.</p>";
    }
  } catch (error) {
    console.error("Error fetching WordPress data:", error);
    hero.innerHTML = "<p>Error loading hero section.</p>";
  } finally {
    hideLoadingIndicator();
  }
})();
