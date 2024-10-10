export function createServicesSection(servicesData) {
  if (!servicesData || typeof servicesData !== "object") {
    console.error("Invalid or empty services data");
    return "";
  }
  console.log(servicesData[0]);
  const servicesContent = `
        <div class="trust-section">
          <h1>${servicesData[0].header || "asdsddddddd Section"}</h1>
          <p>${servicesData[0].header_2 || "asasdasd"}</p>
        </div>
      `;

  return servicesContent;
}
