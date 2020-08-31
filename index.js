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

const checkAddTripFields = () => {
  const validateTripName = document.querySelector("#tripName-input").value !== "";
  const validateDestination = document.querySelector("#destination-input").value !== "";
  const validateStartDate = document.querySelector("#startDate-input").value !== "";
  const validateEndDate = document.querySelector("#endDate-input").value !== "";
  return validateTripName && validateDestination && validateStartDate && validateEndDate;
}

const addTrip = () => {
  const ts = +new Date();
  const tripName = document.querySelector("#tripName-input").value;
  const destination = document.querySelector("#destination-input").value;
  const startDate = document.querySelector("#startDate-input").value;
  const endDate = document.querySelector("#endDate-input").value;
  const tripContent = `
    <div class="header">
      <h2><span class="icon-map-o"></span> ${tripName}</h2>
      <div class="button button-warning removeTrip"><span class="icon-remove"></span> remove trip</div>
    </div>
    <div class="destinations">
      <div class="destination" id="destination-${ts}">
        <div class="picture">
          <img src="https://via.placeholder.com/150" />
        </div>
        <div class="data">
          <h3 class="location">${destination}</h3>
          <div class="dates">
            <span class="date">${startDate}</span>
            -
            <span class="date">${endDate}</span>
          </div>
        </div>
        <div class="buttons">
          <div class="button button-warning removeDestination"><span class="icon-remove"></span> remove destination</div>
          <div class="button button-success"><span class="icon-plus"></span> add transport</div>
          <div class="button button-success"><span class="icon-plus"></span> add lodging</div>
          <div class="button button-success"><span class="icon-plus"></span> add packing list</div>
          <div class="button button-success"><span class="icon-plus"></span> add notes</div>
        </div>
      </div>
    </div>
  `;

  const trip = document.createElement("div");
  trip.classList.add("trip");
  trip.id = `trip-${ts}`;
  trip.innerHTML = tripContent;

  document.querySelector("#tripList-section").append(trip);
  // TODO: add to localStorage

  trip.querySelector(".removeTrip").addEventListener("click", (e) => {
    e.currentTarget.closest(".trip").remove();
    //TODO: remove from localStorage
  });

  trip.querySelector(".removeDestination").addEventListener("click", (e) => {
    e.currentTarget.closest(".destination").remove();
    //TODO: remove from localStorage
  });

  document.querySelector("#addTrip-section").classList.remove("open");
  clearAddTrip();
}

document.querySelector("#addTrip").addEventListener("click", (e) => {
  if (checkAddTripFields()) {
    addTrip();
  } else {
    alert("todo: validate fields");
  }
});