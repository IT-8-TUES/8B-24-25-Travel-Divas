const params = new URLSearchParams(window.location.search);
const index = parseInt(params.get("tripIndex")) || 0;

const allTrips = JSON.parse(localStorage.getItem("trips")) || [];
const trip = allTrips[index];

if (trip) {
    document.getElementById("trip-details").innerHTML = `
        <h2>${trip.destination}</h2>
        <p><strong>Период:</strong> ${trip.dates}</p>
        <p><strong>Бюджет:</strong> ${trip.budget} лв.</p>
        <p><strong>Дейности:</strong> ${trip.activities}</p>
        <p><strong>Дневен план:</strong><br> ${trip.plan || "Няма въведен."}</p>
        <p><strong>Бележки:</strong><br> ${trip.notes || "Няма добавени."}</p>
        <div><strong>Снимки:</strong><br>${renderPhotos(trip.photos || [])}</div>
    `;
} else {
    document.getElementById("trip-details").innerHTML = `<p>Пътуването не беше намерено.</p>`;
}

function renderPhotos(photos) {
    if (!photos.length) return "<em>Няма снимки</em>";
    return photos.map(src => `<img src="${src}" class="trip-photo" alt="trip photo">`).join("");
}
