import TinyPicker from 'tiny-picker';

const openAddDestination = (e) => {
  let section = e.currentTarget.closest(".trip").querySelector(".addDestination-section");
  section.classList.add("open")
  new TinyPicker({
    firstBox: section.querySelector('.destinationStartDate-input'),
    lastBox: section.querySelector('.destinationEndDate-input'),
  }).init();
};

const clearAddDestination = (addDestinationSection) => {
  addDestinationSection.querySelectorAll("input").forEach(elm => {
    elm.value = "";
  });
};

const closeAddDestination = (e) => {
  const currentTrip = e.currentTarget.closest(".trip");
  const addDestinationSection = currentTrip.querySelector(".addDestination-section");
  addDestinationSection.classList.remove("open");
  clearAddDestination(addDestinationSection);
};

const checkAddDestinationFields = addDestinationSection => {
  // TODO: add types validation and correct dates (end > start, and start > today)
  const validateDestination = addDestinationSection.querySelector(".destinationName-input").value !== "";
  const validateStartDate = addDestinationSection.querySelector(".destinationStartDate-input").value !== "";
  const validateEndDate = addDestinationSection.querySelector(".destinationEndDate-input").value !== "";
  return validateDestination && validateStartDate && validateEndDate;
};

const checkAddDestination = (e) => {
  const currentTrip = e.currentTarget.closest(".trip");
  const addDestinationSection = currentTrip.querySelector(".addDestination-section");
  if (checkAddDestinationFields(addDestinationSection)) {
    addDestination(currentTrip);
  } else {
    alert("todo: validate fields");
  }
};

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

  destination.querySelector(".removeDestination").addEventListener("click", removeDestination);

  const addDestinationSection = trip.querySelector(".addDestination-section");
  addDestinationSection.classList.remove("open");
  clearAddDestination(addDestinationSection);
};

const removeDestination = (e) => {
  e.currentTarget.closest(".destination").remove();
  //TODO: remove from localStorage
};

export {
  openAddDestination,
  clearAddDestination,
  closeAddDestination,
  checkAddDestinationFields,
  checkAddDestination,
  addDestination,
  removeDestination
}