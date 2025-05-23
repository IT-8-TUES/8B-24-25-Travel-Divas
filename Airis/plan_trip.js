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

    
    const [dateFrom, dateTo] = dates.split(' - ').map(date => date.trim());

    if (!dateFrom || !dateTo) {
        alert('Моля, изберете валиден период с начална и крайна дата.');
        return;
    }

    const tripData = {
        destination,
        dateFrom,
        dateTo,
        budget,
        activities
    };

    const allTrips = JSON.parse(localStorage.getItem("plannedTrips")) || [];
    allTrips.push(tripData);
    localStorage.setItem("plannedTrips", JSON.stringify(allTrips));

    window.location.href = "../Deya/planned-trips.html";
});
