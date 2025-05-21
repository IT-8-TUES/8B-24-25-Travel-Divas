const params = new URLSearchParams(window.location.search);
const index = parseInt(params.get("tripIndex")) || 0;

const allTrips = JSON.parse(localStorage.getItem("plannedTrips")) || [];
const trip = allTrips[index];

function renderPhotos(photos) {
    if (!photos || photos.length === 0) return "";
    return `
        <div><strong>Снимки:</strong><br>
            ${photos.map(src => `<img src="${src}" class="trip-photo" alt="trip photo">`).join("")}
        </div>
    `;
}

if (trip) {
    const periodText = (trip.dateFrom && trip.dateTo)
    ? `${trip.dateFrom} - ${trip.dateTo}`
    : "Няма въведени дати";


    let html = `
        <h2>${trip.destination}</h2>
        <p><strong>Период:</strong> ${periodText}</p>
        <p><strong>Бюджет:</strong> ${trip.budget} лв.</p>
        <p><strong>Дейности:</strong> ${trip.activities}</p>
    `;

    if (trip.plan) {
        html += `<p><strong>Дневен план:</strong><br>${trip.plan}</p>`;
    }

    if (trip.notes) {
        html += `<p><strong>Бележки:</strong><br>${trip.notes}</p>`;
    }

    if (trip.photos) {
        html += renderPhotos(trip.photos);
    }

    document.getElementById("trip-details").innerHTML = html;
} else {
    document.getElementById("trip-details").innerHTML = `<p>Пътуването не беше намерено.</p>`;
}
