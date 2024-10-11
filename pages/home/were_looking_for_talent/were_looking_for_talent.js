export function createTalentSection(talentData) {
  if (!talentData || typeof talentData !== "object") {
    console.error("Invalid or empty talk data");
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
          <div class="talk-section">
            <h3>${header_1}</h3>
            <h3>${header_2}</h3>
            <p>${text}</p>
             <img width=500 height=500 src="${image.url}">
            <a class="btn btn-blue" href="${button.url}" target="${button.target}">
              ${button.title}
            </a>
          </div>
        </div>
      `;

  return talentContent;
}
