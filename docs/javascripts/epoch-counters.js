// Manual refresh version - no auto-update interval
const initEpochCounters = () => {
  const nowEl = document.getElementById("epoch-now-ms");
  const minusEl = document.getElementById("epoch-minus-24h-ms");
  const btn = document.getElementById("epoch-toggle-btn");

  // If the elements aren't on this page, bail out
  if (!nowEl || !minusEl || !btn) return;

  function updateEpochCounters() {
    const nowMs = Date.now();
    const minus24hMs = nowMs - 86400000; // 24h in ms
    nowEl.textContent = nowMs.toString();
    minusEl.textContent = minus24hMs.toString();
  }

  // Set initial values on page load
  updateEpochCounters();

  // Remove any old listener before adding a new one
  btn.replaceWith(btn.cloneNode(true));
  const newBtn = document.getElementById("epoch-toggle-btn");
  
  newBtn.addEventListener("click", function () {
    updateEpochCounters();
  });
};

// Subscribe to MkDocs Material's page load event
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    initEpochCounters();
  });
} else {
  // Fallback for non-Material themes or first load
  document.addEventListener("DOMContentLoaded", initEpochCounters);
}