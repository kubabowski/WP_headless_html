export function createTalkSection(talkData) {
  if (!talkData || typeof talkData !== "object") {
    console.error("Invalid or empty talk data");
    return "";
  }

  const {
    header_1 = "",
    header_2 = "",
    text = "",
    button = { url: "", target: "", title: "" },
    image = { url: "" },
  } = talkData;

  const talkContent = `
      <div class="container">
        <div class="talk-section">
        <img src="${image.url}">
          <div class="text-container">
            <div class="text">
              <h4 class="h3">${header_1}</h4>
              <h3>${header_2}</h3>
              <p>${text}</p>
              <a class="btn btn-blue" href="${button.url}" target="${button.target}">
                ${button.title}
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

  return talkContent;
}
