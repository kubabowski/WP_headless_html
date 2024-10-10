export function createTrustSection(trustData) {
  if (!trustData || typeof trustData !== "object") {
    console.error("Invalid or empty trust data");
    return "";
  }
  console.log(trustData[0]);
  const trustContent = `
        <div class="trust-section">
          <h1>${trustData[0].header || "Trust Section"}</h1>
          <p>trust</p>
        </div>
      `;

  return trustContent;
}
