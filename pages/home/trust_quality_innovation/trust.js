export function createTrustSection(trustData) {
  if (!trustData || typeof trustData !== "object") {
    console.error("Invalid or empty trust data");
    return "";
  }

  const {
    column_1: [
      { header_1 = "", text_1 = "", text_2 = "", text_3 = "" } = {},
    ] = [],
    column_2: [
      {
        header_2 = "",
        text_4 = "",
        button: { title = "", url = "#", target = "_self" } = {},
      } = {},
    ] = [],
  } = trustData;

  const trustContent = `
  <div class="container">
    <div class="trust-section">
      <div class="col-1">
        <h3>${header_1}</h3>
        <div class="line"></div>
        <p>${text_1}</p>
        <p>${text_2}</p>
        <p>${text_3}</p>
      </div>
      <div class="col-2">
        <h3>${header_2}</h3>
        <p>${text_4}</p>
        <a class="btn btn-blue" href="${url}" target="${target}">
          ${title}
        </a>
      </div>
    </div>
  </div>
  `;

  return trustContent;
}
