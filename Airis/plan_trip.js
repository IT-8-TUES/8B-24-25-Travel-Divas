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

    const tripData = {
        destination,
        dates,
        budget,
        activities
    };

    localStorage.setItem('trip', JSON.stringify(tripData));

    window.location.href = "../planned-trips.html";
});
