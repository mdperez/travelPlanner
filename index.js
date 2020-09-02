document.querySelector("#open-addTrip").addEventListener("click", (e) => {
    document.querySelector("#addTrip-section").classList.add("open");
});

const clearAddTrip = () => {
  document.querySelectorAll("#addTrip-section input").forEach(elm => {
    elm.value = "";
  });
}

const clearAddDestination = (addDestinationSection) => {
  addDestinationSection.querySelectorAll("input").forEach(elm => {
    elm.value = "";
  });
}

document.querySelector("#close-addTrip").addEventListener("click", (e) => {
    document.querySelector("#addTrip-section").classList.remove("open");
    clearAddTrip();
});

const checkAddTripFields = () => {
  // TODO: add types validation and correct dates (end > start, and start > today)
  const validateTripName = document.querySelector("#tripName-input").value !== "";
  const validateDestination = document.querySelector("#destination-input").value !== "";
  const validateStartDate = document.querySelector("#startDate-input").value !== "";
  const validateEndDate = document.querySelector("#endDate-input").value !== "";
  return validateTripName && validateDestination && validateStartDate && validateEndDate;
}

const checkAddDestinationFields = addDestinationSection => {
  // TODO: add types validation and correct dates (end > start, and start > today)
  const validateDestination = addDestinationSection.querySelector(".destinationName-input").value !== "";
  const validateStartDate = addDestinationSection.querySelector(".destinationStartDate-input").value !== "";
  const validateEndDate = addDestinationSection.querySelector(".destinationEndDate-input").value !== "";
  return validateDestination && validateStartDate && validateEndDate;
}

const addDestination = trip => {
  const ts = +new Date();
  const destinationName = trip.querySelector(".destinationName-input").value;
  const startDate = trip.querySelector(".destinationStartDate-input").value;
  const endDate = trip.querySelector(".destinationEndDate-input").value;

  const destinationContent = `
    <div class="picture">
      <img src="https://via.placeholder.com/150" />
    </div>
    <div class="data">
      <h3 class="location">${destinationName}</h3>
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
  `;
  
  const destination = document.createElement("div");
  destination.classList.add("destination");
  destination.id = `destination-${ts}`;
  destination.innerHTML = destinationContent;

  trip.querySelector(".destinations").append(destination);
};

const addTrip = () => {
  const ts = +new Date();
  const tripName = document.querySelector("#tripName-input").value;
  const destination = document.querySelector("#destination-input").value;
  const startDate = document.querySelector("#startDate-input").value;
  const endDate = document.querySelector("#endDate-input").value;
  const tripContent = `
    <div class="header">
      <h2><span class="icon-map-o"></span> ${tripName}</h2>
      <div class="buttons">
        <div class="button button-success open-addDestination"><span class="icon-plus"></span> add destination</div>
        <div class="button button-warning removeTrip"><span class="icon-remove"></span> remove trip</div>
      </div>
    </div>
    <section class="addDestination-section">
      <form class="wrapper">
        <div class="destinationData">
          <label>Destination: </label>
          <input class="destinationName-input">
        </div>
        <div class="destinationDate">
          <label>start date: </label>
          <input class="destinationStartDate-input">
          <label>end date: </label>
          <input class="destinationEndDate-input">
        </div>
        <div class="buttons">
          <span class="button button-success icon-plus addDestination"></span>
          <span class="button button-warning icon-remove close-addDestination"></span>
        </div>
      </form>
    </section>
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

  trip.querySelector(".open-addDestination").addEventListener("click", (e) => {
    e.currentTarget.closest(".trip").querySelector(".addDestination-section").classList.add("open");
  });
  
  trip.querySelector(".close-addDestination").addEventListener("click", (e) => {
    const currentTrip = e.currentTarget.closest(".trip");
    const addDestinationSection = currentTrip.querySelector(".addDestination-section");
    addDestinationSection.classList.remove("open");
    clearAddDestination(addDestinationSection);
  });

  trip.querySelector(".addDestination").addEventListener("click", (e) => {
    const currentTrip = e.currentTarget.closest(".trip");
    const addDestinationSection = currentTrip.querySelector(".addDestination-section");
    if (checkAddDestinationFields(addDestinationSection)) {
      addDestination(currentTrip);
    } else {
      alert("todo: validate fields");
    }
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