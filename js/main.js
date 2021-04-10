import { createDisplayer } from "/js/displayer.js";

function readSingleFile(e) {
  const file = e.target.files[0];
  if (!file) {
    return;
  }

  const display = createDisplayer();
  
  const reader = new FileReader();
  reader.onload = display.initByEvent;
  reader.readAsText(file);
}

(function () {

  document.getElementById("file-input").addEventListener("change", readSingleFile, false);
})();
