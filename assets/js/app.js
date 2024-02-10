const slider = document.getElementById("slider");
const price = document.getElementById("price");
const toggle = document.getElementById("toggle");

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
        const discount = Math.round(slider.value * 0.25);
        const newValue = toggle.checked ? slider.value - discount : slider.value;
        price.innerHTML = newValue;
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
