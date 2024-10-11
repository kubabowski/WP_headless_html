async function fetchCaseStudyData() {
  try {
    const response = await fetch(
      "http://localhost/jcc_solutions/wordpress/wp-json/wp/v2/case-study?acf_format=standard&_fields=acf"
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

export async function createCaseStudySection() {
  const caseStudyData = await fetchCaseStudyData();

  if (!caseStudyData) {
    return "<p>Error loading Case Study section.</p>";
  }

  const insightIds = [161, 160];
  const insights = await fetchInsightsByIds(insightIds);

  const caseStudyContent = `
      <div class="casestudy" style="margin-top: 100px; margin-bottom: 100px;">
        <div class="container">
            <div class="col-1">
                <div id="casestudy-swiper" class="swiper mySwiper">
                    <div id="casestudy-pagination" class="swiper-pagination"></div>
                    <div class="swiper-wrapper">
                    ${caseStudyData
                      .map((caseStudy) => {
                        return `
                        <div class="swiper-slide" style="background-color: purple;">
                            <div class="slide-content">
                            <h3 style="color: white;">${caseStudy.acf.title}</h3>
                            <p style="color: white;">${caseStudy.acf.desc}</p>
                            </div>
                        </div>`;
                      })
                      .join("")}
                    </div>
                </div>
            </div>
            <div class="col-2">
            ${insights
              .map((insight) => {
                return `
                <div class="swiper-slide" style="background-color: purple;">
                    <div class="slide-content">
                    <h3 style="color: white;">${insight.acf.title}</h3>
                    </div>
                </div>`;
              })
              .join("")}
            </div>
        </div>
    </div>

    `;

  // Initialize the Swiper after the HTML is set
  casestudySwiper();

  return caseStudyContent;
}

export function casestudySwiper() {
  new Swiper("#casestudy-swiper", {
    effect: "fade",
    spaceBetween: 30,
    centeredSlides: true,
    slidesPerView: 2,
    slidesPerGroup: 2,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
  });
}
