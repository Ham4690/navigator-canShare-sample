let shareData = {
  title: "MDN",
  text: "Learn web development on MDN!",
  url: "https://developer.mozilla.org",
};

const resultPara = document.querySelector(".result");

if (!navigator.canShare) {
  resultPara.textContent = "navigator.canShare() not supported.";
} else if (navigator.canShare(shareData)) {
  resultPara.textContent =
    "navigator.canShare() supported. We can use navigator.share() to send the data.";
} else {
  resultPara.textContent = "Specified data cannot be shared.";
}

const input = document.getElementById("files");
const output = document.getElementById("output");

document.getElementById("share").addEventListener("click", async () => {
  const files = input.files;

  if (files.length === 0) {
    output.textContent = "No files selected.";
    return;
  }

  // feature detecting navigator.canShare() also implies
  // the same for the navigator.share()
  console.log(navigator);
  if (!navigator.canShare) {
    output.textContent = `Your browser doesn't support the Web Share API.`;
    return;
  }

  if (navigator.canShare({ files })) {
    try {
      await navigator.share({
        files,
        title: "Images",
        text: "Beautiful images",
      });
      output.textContent = "Shared!";
    } catch (error) {
      output.textContent = `Error: ${error.message}`;
    }
  } else {
    output.textContent = `Your system doesn't support sharing these files.`;
  }
});
