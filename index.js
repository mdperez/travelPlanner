document.querySelector("#open-addTrip").addEventListener("click", (e) => {
    document.querySelector("#addTrip-section").classList.add("open");
});

const clearAddTrip = () => {
  document.querySelectorAll("#addTrip-section input").forEach(elm => {
    elm.value = "";
  });
}

document.querySelector("#close-addTrip").addEventListener("click", (e) => {
    document.querySelector("#addTrip-section").classList.remove("open");
    clearAddTrip();
});