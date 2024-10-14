async function fetchCaseStudyData() {
  try {
    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/case-study?acf_format=standard&_fields=acf, link"
    );
    const data = await response.json();

    if (data.length > 0) {
      return data;
    } else {
      console.error("No Case Study items found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Case Study:", error);
    return null;
  }
}

async function fetchInsightsByIds(ids) {
  const promises = ids.map((id) =>
    fetch(
      `http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/insight/${id}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error fetching post with ID ${id}: ${response.statusText}`
        );
      }
      return response.json();
    })
  );

  try {
    const postsData = await Promise.all(promises);
    return postsData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}

export async function createCaseStudySection(caseStudyContentData) {
  if (!caseStudyContentData || typeof caseStudyContentData !== "object") {
    console.error("Invalid or empty caseStudyData");
    return "";
  }

  const caseStudyData = await fetchCaseStudyData();

  if (!caseStudyData) {
    return "<p>Error loading Case Study section.</p>";
  }

  const insightIds = [161, 160];
  const insights = await fetchInsightsByIds(insightIds);

  const caseStudyContent = `
      <div class="casestudy">
        <div class="container">
        <h2 class="h2">${caseStudyContentData.title}</h2>
          <div class="inner">
            <div class="col-1">
                <div id="casestudy-swiper" class="swiper mySwiper">
                    <div id="casestudy-pagination" class="swiper-pagination"></div>
                    <div class="swiper-wrapper">
                    ${caseStudyData
                      .map((caseStudy) => {
                        const { title, desc, date, image } = caseStudy.acf;
                        const imageUrl = image ? image.url : "";
                        return `
                        <div class="swiper-slide"">
                            <div class="slide-content">
                              <div class="case-image" style="background-image: url('${imageUrl}')"></div>
                              <div class="case-card">
                                  <div class="case-badge">CASE STUDY</div>
                                  <h3 class="case-title">${title}</h3>
                                  <h4 class="h5 case-desc">${desc}</h4>
                                  <div class"case-info">
                                    <p class="case-date">${date} -</p>
                                    <p class="case-read">9 MIN READ</p>
                                  </div>
                                  <a class="link" href="${caseStudy.link}">Read more</a>
                                </div>
                            </div>
                        </div>`;
                      })
                      .join("")}
                    </div>
                </div>
            </div>
            <div class="col-2 insight-col">
            ${insights
              .map((insight) => {
                const { title, desc, date, link } = insight.acf;
                return `
                <div class="insight-card">
                    <div class="case-badge">INSIGHTS</div>
                    <h3 class="case-title">${title}</h3>
                    <h4 class="h5 case-desc">${desc}</h4>
                    <div class"case-info">
                      <p class="case-date">${date} -</p>
                      <p class="case-read">9 MIN READ</p>
                    </div>
                    <a class="link" href="${insight.link}">Read more</a>
                </div>`;
              })
              .join("")}
            </div>
          </div>
          <div class="inner">
            <div class="col-1 nav-col">
              <div class="swiper-nav">
                <div id="study-prev" class="swiper-button-prev"></div>
                <div id="study-next" class="swiper-button-next"></div>
              </div>
              <a href="#" class="link">Read more</a>
            </div>
            <div class="col-2 nav-col">
              <a href="#" class="link">Read more</a>
            </div>
          </div>
        </div>

        
    </div>

    `;

  casestudySwiper();

  return caseStudyContent;
}

export function casestudySwiper() {
  new Swiper("#casestudy-swiper", {
    // effect: "fade",
    slidesPerView: 2,
    spaceBetween: 30,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    navigation: {
      nextEl: "#study-next",
      prevEl: "#study-prev",
    },
  });
}
