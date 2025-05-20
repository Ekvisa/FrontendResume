//Set translation:
function setLanguage(lang) {
  document.querySelectorAll("[data-i18n], [data-i18n-href]").forEach((el) => {
    updateTranslation(el, lang);
  });
  // document.querySelectorAll("[data-i18n]").forEach((el) => {
  //   const key = el.dataset.i18n;
  //   const langData = translations[lang];
  //   if (!langData) {
  //     console.warn(`No translations found for language: ${lang}`);
  //     return;
  //   }
  //   const translated = translations[lang][key];
  //   if (translated) el.textContent = translated;
  // });

  //Update buttons states:
  document.querySelectorAll(".lang-buttons > button").forEach((b) => {
    if (b.innerText === lang) {
      b.setAttribute("disabled", "");
    } else {
      b.removeAttribute("disabled");
    }
  });
}

//Receive language from URL:
function getLangFromURL() {
  return new URLSearchParams(location.search).get("lang") || "ru";
}
//const langFromURL = new URLSearchParams(location.search).get("lang") || "ru";
setLanguage(getLangFromURL());

//Set language:
document.querySelectorAll(".lang-buttons > button").forEach((b) => {
  b.addEventListener("click", () => {
    const lang = b.innerText;
    const url = new URL(window.location);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
    setLanguage(lang);
  });
});

//Set translation for the selected element
// function updateTranslation(el, lang) {
//   const key = el.dataset.i18n;
//   const translated = translations[lang][key];
//   if (translated) el.textContent = translated;
// }
function updateTranslation(el, lang) {
  const textKey = el.dataset.i18n;
  const hrefKey = el.dataset.i18nHref;

  if (textKey) {
    const translatedText = translations[lang][textKey];
    if (translatedText) el.textContent = translatedText;
  }

  if (hrefKey) {
    const translatedHref = translations[lang][hrefKey];
    if (translatedHref) el.href = translatedHref;
  }
}

const paths = document.querySelectorAll("svg path");
const tooltips = document.querySelectorAll(".tooltip");
const jobs = document.querySelectorAll("#experience_block b");

paths.forEach((path) => {
  let isTooltipVisible = false;
  const tooltip = document.getElementById(path.id + "_tip");

  //Show the tooltip if cursor is on the path...:
  path.addEventListener("mouseenter", () => {
    if (tooltip) {
      tooltip.classList.remove("hidden");
      isTooltipVisible = true;
    }
  });
  //...and don't hide the tooltip if cursor went to it from the path:
  path.addEventListener("mouseleave", () => {
    if (tooltip && !tooltip.matches(":hover") && isTooltipVisible) {
      tooltip.classList.add("hidden");
      isTooltipVisible = false;
    }
  });
});

tooltips.forEach((tooltip) => {
  //Hide the tooltip only if cursor is not on the path:
  tooltip.addEventListener("mouseleave", () => {
    const path = document.getElementById(tooltip.id.replace("_tip", ""));
    if (!path.matches(":hover")) {
      tooltip.classList.add("hidden");
      isTooltipVisible = false;
    }
  });
  //Highlight according opened blocks:
  tooltip.addEventListener("mouseenter", () => {
    const blockClass = tooltip.id.replace("_tip", "-block");
    const shinyBlocks = document.getElementsByClassName(blockClass);
    Array.from(shinyBlocks).forEach((block) => {
      block.classList.add("shine");
    });
  });
  tooltip.addEventListener("mouseleave", () => {
    const blockClass = tooltip.id.replace("_tip", "-block");
    const shinyBlocks = document.getElementsByClassName(blockClass);
    Array.from(shinyBlocks).forEach((block) => {
      block.classList.remove("shine");
    });
  });
});

//Show the resume block when click on the tooltip:
function openBlockByClick(element) {
  element.addEventListener("click", () => {
    if (document.getElementById("explain-block").classList.contains("hidden")) {
      document.getElementById("explain-block").classList.remove("hidden");
    }

    const targetId = element.id.replace("_tip", "_block");
    const resumeBlock = document.getElementById(targetId);
    if (resumeBlock) {
      if (resumeBlock.classList.contains("hidden")) {
        resumeBlock.classList.remove("hidden");
      }
    }
    resumeBlock.scrollIntoView();
    isAllShown = Array.from(resumeBlocks).every(
      (block) => !block.classList.contains("hidden")
    );
    if (isAllShown) {
      //showAllButton.innerText = "Спрятать всё";
      showAllButton.setAttribute("data-i18n", "hide_all");
      updateTranslation(showAllButton, getLangFromURL());
    }
  });
}

tooltips.forEach((tooltip) => {
  openBlockByClick(tooltip);
});

jobs.forEach((job) => {
  openBlockByClick(job);
});

//[Show all] button:
let isAllShown = false;
showAllButton = document.getElementById("showAll");
const resumeBlocks = document.querySelectorAll(".resume-block");
function showAllBlocks() {
  let buttonData = showAllButton.getAttribute("data-i18n");
  if (buttonData === "open_all") {
    resumeBlocks.forEach((block) => {
      block.classList.remove("hidden");
    });

    if (document.getElementById("explain-block").classList.contains("hidden")) {
      document.getElementById("explain-block").classList.remove("hidden");
    }
    isAllShown = true;
    showAllButton.setAttribute("data-i18n", "close_all");
  } else {
    resumeBlocks.forEach((block) => {
      block.classList.add("hidden");
    });
    document.getElementById("comment-block").classList.remove("hidden");
    isAllShown = false;
    showAllButton.setAttribute("data-i18n", "open_all");
  }
  //update button text:
  updateTranslation(showAllButton, getLangFromURL());
}
showAllButton.addEventListener("click", showAllBlocks);

resumeBlocks.forEach((block) => {
  //Add Close buttons:
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.classList.add("close-btn");
  closeBtn.addEventListener("click", () => {
    block.classList.add("hidden");
    const isAllHidden = Array.from(resumeBlocks).every((b) =>
      b.classList.contains("hidden")
    );
    if (isAllHidden === true) {
      showAllButton.setAttribute("data-i18n", "open_all");
      updateTranslation(showAllButton, getLangFromURL());
    }
  });
  closeBtn.addEventListener("mouseenter", () => {
    const tipToShow = findTipId(block);
    tipToShow.classList.add("hidden");
  });
  closeBtn.addEventListener("mouseleave", () => {
    const tipToShow = findTipId(block);
    tipToShow.classList.remove("hidden");
  });
  block.appendChild(closeBtn);

  //Highlight according tip:
  function findTipId(el) {
    const blockClasses = el.className.split(" ");
    for (let blockClass of blockClasses) {
      const tipId = blockClass.replace("-block", "_tip");
      const tip = document.getElementById(tipId);
      if (tip) {
        return tip;
      }
    }
  }
  block.addEventListener("mouseenter", () => {
    block.classList.add("shine");
    const tipToShow = findTipId(block);
    tipToShow.classList.remove("hidden");
  });
  block.addEventListener("mouseleave", () => {
    block.classList.remove("shine");
    const tipToShow = findTipId(block);
    tipToShow.classList.add("hidden");
  });
});

//Scroll to top:
const scrollTopBtn = document.getElementById("scrollTopBtn");
const girl = document.querySelector(".img-wrapper");
window.addEventListener("scroll", () => {
  const girlRect = girl.getBoundingClientRect(); //rectangle with girl in it
  if (girlRect.top < 0) {
    scrollTopBtn.classList.remove("hidden");
  } else {
    scrollTopBtn.classList.add("hidden");
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0 });
});
