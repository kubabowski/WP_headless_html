import "../../components/navBar/navBar.js";
import { createHeroSection, heroSwiper } from "./hero/hero.js";
import { createTrustSection } from "./trust_quality_innovation/trust.js";
import { createServicesSection } from "./services/services.js";

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

function showLoadingIndicator(sections) {
  sections.forEach((section) => {
    const element = document.getElementById(section);
    if (element) {
      element.innerHTML = `
        <div class="loading">
          <p>Loading...</p>
        </div>
      `;
    } else {
      console.warn(`Element with id '${section}' not found.`);
    }
  });
}

function hideLoadingIndicator() {
  const loadingElement = document.querySelector(".loading");
  if (loadingElement) {
    loadingElement.remove();
  }
}
(async () => {
  const sectionIds = ["hero", "trust_quality_innovation", "services"];

  const sections = sectionIds.map((id) => document.getElementById(id));

  const WPData = await fetchData();
  showLoadingIndicator(sectionIds);

  try {
    for (const section of sections) {
      switch (section.id) {
        case "hero":
          if (WPData && Array.isArray(WPData.hero)) {
            const heroContent = createHeroSection(WPData.hero);
            section.innerHTML = heroContent;
            heroSwiper();
          } else {
            console.error("Hero data not found or in wrong format.");
          }
          break;

        case "trust_quality_innovation":
          if (WPData && Array.isArray(WPData.trust_quality_innovation)) {
            const trustContent = createTrustSection(
              WPData.trust_quality_innovation
            );
            section.innerHTML = trustContent;
          } else {
            console.error("Trust data not found or in wrong format.");
          }
          break;

        case "services":
          if (WPData && Array.isArray(WPData.services)) {
            const servicesContent = createServicesSection(WPData.services);
            section.innerHTML = servicesContent;
          } else {
            console.error("Services data not found or in wrong format.");
          }
          break;

        default:
          console.error("Unknown section.");
      }
    }
  } catch (error) {
    console.error("Error fetching WordPress data:", error);

    sections.forEach((section) => {
      section.innerHTML = `<p>Error loading ${section.id} section.</p>`;
    });
  } finally {
    hideLoadingIndicator();
  }
})();
