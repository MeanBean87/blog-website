// Purpose: return to home page
const returnHomeHander = () => {
    window.location.href = "/";
};

document.querySelector("#return-home").addEventListener("click", returnHomeHander);