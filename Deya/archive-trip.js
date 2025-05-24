function saveArchivedTrip() {
    const tripIndex = parseInt(localStorage.getItem('archivingTripIndex'), 10);
    const trips = JSON.parse(localStorage.getItem('plannedTrips')) || [];
    const trip = trips[tripIndex];
  
    if (!trip) {
      alert("Грешка: няма избрано пътуване за архивиране.");
      return;
    }
  
    const comment = document.getElementById('comment').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value || '0';
    const photos = document.getElementById('photo').files;
  
    const MAX_FILE_SIZE = 1024 * 1024 * 1.5; // 1.5MB
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].size > MAX_FILE_SIZE) {
        alert(`Снимката "${photos[i].name}" е твърде голяма. Макс. размер: 1.5MB`);
        return;
      }
    }
  
    const readers = [];
  
    for (let i = 0; i < photos.length; i++) {
      readers.push(new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(`Грешка при четене на файл: ${photos[i].name}`);
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
  
      alert("✅ Успешно архивирано!");
      window.location.href = '../violeta/past-trips.html';
    }).catch(error => {
      console.error("Грешка при снимките:", error);
      alert("⚠️ Възникна грешка при четене на снимки:\n" + error);
    });
  }
  