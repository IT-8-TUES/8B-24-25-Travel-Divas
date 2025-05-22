const params = new URLSearchParams(window.location.search);
const index = parseInt(params.get("tripIndex")) || 0;

const allTrips = JSON.parse(localStorage.getItem("plannedTrips")) || [];
const trip = allTrips[index];

const tripContainer = document.getElementById("trip-details");

if (trip) {
  const period = (trip.dateFrom && trip.dateTo)
    ? `${trip.dateFrom} - ${trip.dateTo}`
    : (trip.dates || "Няма въведени дати");

  tripContainer.innerHTML = `
    <h2>${trip.destination}</h2>
    <p><strong>Период:</strong> ${period}</p>
    <p><strong>Бюджет:</strong> ${trip.budget} лв.</p>
    <p><strong>Дейности:</strong> ${trip.activities}</p>

    <label for="plan">Дневен план:</label>
    <textarea id="plan" rows="4" placeholder="Добави дневен план...">${trip.plan || ""}</textarea>

    <label for="notes">Бележки:</label>
    <textarea id="notes" rows="4" placeholder="Добави бележки...">${trip.notes || ""}</textarea>

    <button id="save-button">💾 Запази</button>
  `;

  const planInput = document.getElementById("plan");
  const notesInput = document.getElementById("notes");
  const saveButton = document.getElementById("save-button");

  let originalPlan = planInput.value.trim();
  let originalNotes = notesInput.value.trim();

  function checkForChanges() {
    const currentPlan = planInput.value.trim();
    const currentNotes = notesInput.value.trim();

    if (currentPlan !== originalPlan || currentNotes !== originalNotes) {
      saveButton.classList.add("show");
    } else {
      saveButton.classList.remove("show");
    }
  }

  planInput.addEventListener("input", checkForChanges);
  notesInput.addEventListener("input", checkForChanges);

  saveButton.addEventListener("click", () => {
    trip.plan = planInput.value.trim();
    trip.notes = notesInput.value.trim();

    allTrips[index] = trip;
    localStorage.setItem("plannedTrips", JSON.stringify(allTrips));

    originalPlan = trip.plan;
    originalNotes = trip.notes;

    saveButton.classList.remove("show");
    alert("✅ Записано успешно!");
  });

} else {
  tripContainer.innerHTML = `<p>Пътуването не беше намерено.</p>`;
}
