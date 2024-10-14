async function fetchFooterData() {
  const footerElement = document.getElementById("footer-data");
  try {
    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/footer?acf_format=standard&_fields=acf"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      setFooterData(data[0].acf, footerElement);
    } else {
      console.error("No pages found.");
      footerElement.innerHTML = "<p>No menu items available.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    footerElement.innerHTML = "<p>Error loading footer menu.</p>";
  }
}

function setFooterData(footerData, footerElement) {
  const {
    social,
    text,
    phone_title,
    phone_,
    mail_title,
    mail_address,
    copyright,
    author,
  } = footerData;
  footerElement.innerHTML = `
                <img
                class="logo"
                width="78"
                height="34"
                alt="logo"
                src="../../../assets/images/logo.svg"
                />
                <p>
                ${text}
                </p>
                <div class="flex contact">
                    <div class="col-contact-1">
                        <div>${phone_title}</div>
                        <div>${mail_title}</div>
                    </div>
                    <div class="col-contact-2">
                        <a href="${phone_.url}">${phone_.title}</a>
                        <a href="${mail_address.url}">${mail_address.title}</a>
                    </div>
                </div>
                <div>
                ${social
                  .map((socialEl) => {
                    return `
                        
                        <a href="${socialEl.link}">
                            <img width="50" height="50" src="${socialEl.url}"> 
                        </a>
                    `;
                  })
                  .join("")}
                </div>
        
    `;
}

document.addEventListener("DOMContentLoaded", fetchFooterData);
