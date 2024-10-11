import "../../components/navBar/navBar.js";
import { createHeroSection, heroSwiper } from "./hero/hero.js";
import { createTrustSection } from "./trust_quality_innovation/trust.js";
import { createServicesSection, servicesSwiper } from "./services/services.js";
import { handleAccordionClick } from "../../components/accordion.js";
import { createTalkSection } from "./talk_to_our_specialist/talk_to_our_specialist.js";
import { createTalentSection } from "./were_looking_for_talent/were_looking_for_talent.js";
import {
  casestudySwiper,
  createCaseStudySection,
} from "./case_study_and_insights/case_study_and_insights.js";
import { createProductsSection } from "./products/products.js";

async function fetchPagesData() {
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
  const sectionIds = [
    "hero",
    "trust_quality_innovation",
    "services",
    "talk_to_our_specialist",
    "were_looking_for_talent",
    "case_study_and_insights",
    "products",
  ];

  const sections = sectionIds.map((id) => document.getElementById(id));

  const WPData = await fetchPagesData();
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
              WPData.trust_quality_innovation[0]
            );
            section.innerHTML = trustContent;
          } else {
            console.error("Trust data not found or in wrong format.");
          }
          break;

        case "services":
          if (WPData && Array.isArray(WPData.services)) {
            const servicesContent = await createServicesSection();
            section.innerHTML = servicesContent;
            servicesSwiper();
            document.addEventListener("click", handleAccordionClick);
          } else {
            console.error("Services data not found or in wrong format.");
          }
          break;

        case "talk_to_our_specialist":
          if (WPData && Array.isArray(WPData.talk_to_our_specialist)) {
            const talkContent = createTalkSection(
              WPData.talk_to_our_specialist[0]
            );
            section.innerHTML = talkContent;
          } else {
            console.error("Talk data not found or in wrong format.");
          }
          break;

        case "case_study_and_insights":
          if (WPData && Array.isArray(WPData.case_study_and_insights)) {
            const caseStudyContent = await createCaseStudySection();
            section.innerHTML = caseStudyContent;
            casestudySwiper();
          } else {
            console.error("Services data not found or in wrong format.");
          }
          break;

        case "products":
          try {
            const productsContent = await createProductsSection();
            section.innerHTML = productsContent;
          } catch (error) {
            console.error("Error loading products section:", error);
            section.innerHTML = `<p>Error loading products section.</p>`;
          }
          break;

        case "were_looking_for_talent":
          if (WPData && Array.isArray(WPData.were_looking_for_talent)) {
            const talentContent = createTalentSection(
              WPData.were_looking_for_talent[0]
            );
            section.innerHTML = talentContent;
          } else {
            console.error("Talk data not found or in wrong format.");
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
