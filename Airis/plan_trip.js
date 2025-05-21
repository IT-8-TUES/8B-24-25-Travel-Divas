document.getElementById('trip-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const destination = document.getElementById('destination').value.trim();
    const dates = document.getElementById('dates').value.trim(); 
    const budget = document.getElementById('budget').value.trim();
    const activities = document.getElementById('activities').value.trim();

    if (!destination || !dates || !budget || !activities) {
        alert('Моля, попълнете всички полета.');
        return;
    }

    let dateFrom = "";
    let dateTo = "";
    const dateParts = dates.split("-");
    if (dateParts.length === 2) {
        dateFrom = dateParts[0].trim();
        dateTo = dateParts[1].trim();
    }

    const tripData = {
        destination,
        dateFrom,
        dateTo,
        budget,
        activities
    };

    // Използваме ключа, който `planned-trips.html` очаква: 'plannedTrips'
    const allTrips = JSON.parse(localStorage.getItem("plannedTrips")) || [];
    allTrips.push(tripData);
    localStorage.setItem("plannedTrips", JSON.stringify(allTrips));

    window.location.href = "../planned-trips.html";
});
