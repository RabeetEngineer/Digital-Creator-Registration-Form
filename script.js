/* =============================
   1. Element Selectors
============================= */
const themeToggle = document.getElementById("themeToggle");
const successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");
const stepText = document.getElementById("stepText");
const progressFill = document.getElementById("progressFill");
const steps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
const firstStepBtn = document.getElementById("firstStepBtn");
const form = document.querySelector("form");
/* =============================
   2. App State
============================= */
let currentStep = 0;
/* =============================
   3. Show Current Step
============================= */
function showStep(step) {
  steps.forEach((stepItem) => {
    stepItem.classList.remove("active");
  });
  steps[step].classList.add("active");
  prevBtn.style.display = step === 0 ? "none" : "block";
  if (step === steps.length - 1) {
    nextBtn.style.display = "none";
    firstStepBtn.style.display = "block";
    submitBtn.style.display = "block";
  } else {
    nextBtn.style.display = "block";
    firstStepBtn.style.display = "none";
    submitBtn.style.display = "none";
  }
  stepText.textContent = `Step ${step + 1} of ${steps.length}`;
  const progressWidth = ((step + 1) / steps.length) * 100;
  progressFill.style.width = progressWidth + "%";
}
/* =============================
   4. Validate Current Step
============================= */
function validateStep() {
  const currentInputs = steps[currentStep].querySelectorAll("input, textarea, select");
  let isValid = true;
  currentInputs.forEach((input) => {
    if (input.hasAttribute("required") && input.value.trim() === "") {
      isValid = false;
      input.style.border = "2px solid red";
    } else {
      input.style.border = "1px solid rgba(56, 189, 248, 0.3)";
    }
  });
  return isValid;
}
/* =============================
   5. Step Navigation Events
============================= */
nextBtn.addEventListener("click", () => {
  if (validateStep()) {
    currentStep++;
    showStep(currentStep);
  } else {
    alert("Please fill all required fields");
  }
});
prevBtn.addEventListener("click", () => {
  currentStep--;
  showStep(currentStep);
});
firstStepBtn.addEventListener("click", () => {
  currentStep = 0;
  showStep(currentStep);
});
/* =============================
   6. Form Submit Event
============================= */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateStep()) {
    successPopup.style.display = "flex";
  } else {
    alert("Please fill all required fields");
  }
});
/* =============================
   7. Popup Event
============================= */
closePopup.addEventListener("click", () => {
  successPopup.style.display = "none";
});
/* =============================
   8. Theme Toggle Event
============================= */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});
/* =============================
   9. Initial Setup
============================= */
showStep(currentStep);
