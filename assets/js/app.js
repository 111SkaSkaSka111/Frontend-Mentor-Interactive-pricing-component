// ======================DarkMode=================== \\
let darkMode = localStorage.getItem("darkMode");
const toggleDarkMode = document.getElementById("toggle-dark-mode");
console.log(darkMode);

const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode", "enabled");
    toggleDarkMode.classList.add("active");
};

const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkMode", null);
    toggleDarkMode.classList.remove("active");
};

if (darkMode === "enabled") {
    enableDarkMode();
}

toggleDarkMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        enableDarkMode();
        console.log(darkMode);
    } else {
        disableDarkMode();
        console.log(darkMode);
    }
});

// ======================utility==================== \\
const slider = document.getElementById("slider");
const price = document.getElementById("price");
const toggle = document.getElementById("toggle");

function getPriceByPageViews(value) {
    switch (value) {
        case "1":
            return "10K";
        case "2":
            return "50K";
        case "3":
            return "100K";
        case "4":
            return "500K";
        case "5":
            return "1M";
        default:
            return "";
    }
}

function updatePrice() {
    let sliderValue = parseInt(slider.value);
    let priceValue;

    switch (sliderValue) {
        case 1:
            priceValue = 8;
            break;
        case 2:
            priceValue = 12;
            break;
        case 3:
            priceValue = 16;
            break;
        case 4:
            priceValue = 24;
            break;
        case 5:
            priceValue = 36;
            break;
        default:
            priceValue = 8;
    }

    return priceValue;
}

let isDragging = false;

slider.addEventListener("mousedown", function () {
    isDragging = true;
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", stopDrag);
});

toggle.addEventListener("change", function () {
    handleDrag();
});

slider.addEventListener("click", function () {
    document.addEventListener("mouseup", handleDrag);
});

function handleDrag() {
    if (isDragging) {
        const discount = toggle.checked ? Math.round(updatePrice() * 0.25) : 0;
        const newValue = updatePrice() - discount;
        price.innerHTML = newValue;

        const pageView = document.querySelector(".total");
        const pageViewText = getPriceByPageViews(slider.value);
        pageView.innerHTML = pageViewText;
    }
}

stopDrag = () => {
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", stopDrag);
};

slider.oninput = () => {
    const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, aqua 0%, aqua ${value}%, #ccc ${value}%, #ccc 100%)`;
};
