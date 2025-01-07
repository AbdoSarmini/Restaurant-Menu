function switchTheme() {
  const storedTheme = localStorage.getItem("darkmode");
  var darkModeEnabled = storedTheme ? storedTheme : 0;

  if (darkModeEnabled == 0) {
    localStorage.setItem("darkmode", 1);
    document.body.classList.add("darkmode");
  }
  if (darkModeEnabled == 1) {
    localStorage.setItem("darkmode", 0);
    document.body.classList.remove("darkmode");
  }
}

function loadCurrentTheme() {
  const storedTheme = localStorage.getItem("darkmode");
  var darkModeEnabled = storedTheme ? storedTheme : 0;
  if (darkModeEnabled == 0) {
    document.body.classList.remove("darkmode");
  }
  if (darkModeEnabled == 1) {
    document.body.classList.add("darkmode");
  }
}

loadCurrentTheme();
