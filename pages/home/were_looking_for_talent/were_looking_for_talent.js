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
    image,
  } = talentData;
  const imageUrl = image ? image.url : "";

  const talentContent = `
        <div class="container">
          <div class="talent-section">
            <div class="col-1" >
              <div class="talent-img" style="background-image: url('${imageUrl}')"></div>
            </div>
            <div class="col-2">
              <div class="talent-text">
                <h3 class="h4">${header_1}</h3>
                <h4 class="h2">${header_2}</h4>
                <p class="h5">${text}</p>
                
                <a class="btn btn-blue" href="${button.url}" target="${button.target}">
                  ${button.title}
                </a>
              </div>
            </div>
          </div>
        </div>
      `;

  return talentContent;
}
