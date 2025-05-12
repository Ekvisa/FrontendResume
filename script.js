const paths = document.querySelectorAll("svg path");
const tooltips = document.querySelectorAll(".tooltip");
const jobs = document.querySelectorAll("#experience_block b");
console.log(tooltips);
console.log(jobs);

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

//Hide the tooltip only if cursor is not on the path:
tooltips.forEach((tooltip) => {
  tooltip.addEventListener("mouseleave", () => {
    const path = document.getElementById(tooltip.id.replace("_tip", ""));
    if (!path.matches(":hover")) {
      tooltip.classList.add("hidden");
      isTooltipVisible = false;
    }
  });
});

//Show the resume block when click on the tooltip:
function openBlockByClick(element) {
  element.addEventListener("click", () => {
    const targetId = element.id.replace("_tip", "_block");
    console.log(targetId);
    const resumeBlock = document.getElementById(targetId);
    if (resumeBlock) {
      if (resumeBlock.classList.contains("hidden")) {
        resumeBlock.classList.remove("hidden");
      } else resumeBlock.classList.add("hidden");
    }
  });
}

tooltips.forEach((tooltip) => {
  openBlockByClick(tooltip);
  if (!document.getElementById("comment-block").classList.contains("hidden")) {
    document.getElementById("comment-block").classList.add("hidden");
  }
});

jobs.forEach((job) => {
  console.log(job);
  openBlockByClick(job);
});

// tooltips.forEach((tooltip) => {
//   tooltip.addEventListener("click", () => {
//     const targetId = tooltip.id.replace("_tip", "_block");
//     const resumeBlock = document.getElementById(targetId);
//     if (resumeBlock) {
//       resumeBlock.classList.remove("hidden");
//     }
//     if (!greeting.classList.contains("hidden")) {
//       greeting.classList.add("hidden");
//     }
//   });
// });

let isAllShown = false;

showAllButton = document.getElementById("showAll");

const resumeBlocks = document.querySelectorAll(".resume-block");

function showAllBlocks() {
  if (showAllButton.innerText === "Раскрыть всё") {
    resumeBlocks.forEach((block) => {
      console.log(block);
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
      console.log("-");
      block.classList.add("hidden");
    });
    document.getElementById("comment-block").classList.remove("hidden");
    isAllShown = false;
    showAllButton.innerText = "Раскрыть всё";
  }
}
showAllButton.addEventListener("click", showAllBlocks);

resumeBlocks.forEach((block) => {
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.classList.add("close-btn");
  closeBtn.addEventListener("click", () => {
    block.classList.add("hidden");
  });
  block.appendChild(closeBtn);
});

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
