export function createTalentSection(talentData) {
  if (!talentData || typeof talentData !== "object") {
    console.error("Invalid or empty talent data");
    return "";
  }

  const {
    header_1 = "",
    header_2 = "",
    text = "",
    button = { url: "", target: "", title: "" },
    image = { url: "" },
  } = talentData;

  const talentContent = `
        <div class="container">
          <div class="talent-section">
            <div class="col-1">
              <img width=500 height=500 src="${image.url}">
            </div>
            <div class="col-2">
              <h3>${header_1}</h3>
              <h3>${header_2}</h3>
              <p>${text}</p>
              
              <a class="btn btn-blue" href="${button.url}" target="${button.target}">
                ${button.title}
              </a>
            </div>
          </div>
        </div>
      `;

  return talentContent;
}
