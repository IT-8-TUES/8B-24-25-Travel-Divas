
    function saveArchivedTrip() {
  if (!trip) {
    alert("Грешка: Няма избрано пътуване за архивиране.");
    return;
  }

  const comment = document.getElementById('comment').value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value || '0';
  const photos = document.getElementById('photo').files;

  const readers = [];

  for (let i = 0; i < photos.length; i++) {
    readers.push(new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(photos[i]);
    }));
  }

  Promise.all(readers).then((photoResults) => {
    const archivedTrip = {
      ...trip,
      comment,
      rating,
      photos: photoResults,
      archivedAt: new Date().toISOString()
    };

    let pastTrips = JSON.parse(localStorage.getItem('pastTrips')) || [];
    pastTrips.push(archivedTrip);
    trips.splice(tripIndex, 1);

    localStorage.setItem('pastTrips', JSON.stringify(pastTrips));
    localStorage.setItem('plannedTrips', JSON.stringify(trips));

    window.location.href = '../violeta/past-trips.html';
  }).catch((err) => {
    console.error("Грешка при четене на снимки:", err);
    alert("Възникна проблем при запазването на пътуването.");
  });
}

