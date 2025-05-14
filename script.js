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
    console.log(shinyBlocks);
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
    if (
      !document.getElementById("comment-block").classList.contains("hidden")
    ) {
      document.getElementById("comment-block").classList.add("hidden");
    }
    const targetId = element.id.replace("_tip", "_block");
    const resumeBlock = document.getElementById(targetId);
    if (resumeBlock) {
      if (resumeBlock.classList.contains("hidden")) {
        resumeBlock.classList.remove("hidden");
      }
    }
    resumeBlock.scrollIntoView();
  });
}

tooltips.forEach((tooltip) => {
  openBlockByClick(tooltip);
});

jobs.forEach((job) => {
  openBlockByClick(job);
});

let isAllShown = false;

showAllButton = document.getElementById("showAll");

const resumeBlocks = document.querySelectorAll(".resume-block");

function showAllBlocks() {
  if (showAllButton.innerText === "Раскрыть всё") {
    resumeBlocks.forEach((block) => {
      block.classList.remove("hidden");
    });
    if (
      !document.getElementById("comment-block").classList.contains("hidden")
    ) {
      document.getElementById("comment-block").classList.add("hidden");
    }
    isAllShown = true;
    showAllButton.innerText = "Спрятать всё";
  } else {
    resumeBlocks.forEach((block) => {
      block.classList.add("hidden");
    });
    document.getElementById("comment-block").classList.remove("hidden");
    isAllShown = false;
    showAllButton.innerText = "Раскрыть всё";
  }
}
showAllButton.addEventListener("click", showAllBlocks);

resumeBlocks.forEach((block) => {
  //Add Close buttons:
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.classList.add("close-btn");
  closeBtn.addEventListener("click", () => {
    block.classList.add("hidden");
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
