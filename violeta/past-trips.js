const diaryContainer = document.getElementById('diaryContainer');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    function renderDiary() {
      const allTrips = JSON.parse(localStorage.getItem('pastTrips')) || [];
      const search = searchInput.value.toLowerCase();
      const sortBy = sortSelect.value;

      let trips = [...allTrips];

      if (search) {
        trips = trips.filter(trip => trip.destination.toLowerCase().includes(search));
      }

      trips.sort((a, b) => {
        const dateA = new Date(a.dateFrom);
        const dateB = new Date(b.dateFrom);
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
      });

      diaryContainer.innerHTML = '';
      if (trips.length === 0) {
        diaryContainer.innerHTML = '<p>Няма намерени пътувания.</p>';
        return;
      }

      trips.forEach((trip, index) => {
        const card = document.createElement('div');
        card.className = 'trip-card';

        const stars = '★'.repeat(trip.rating || 0).padEnd(5, '☆');
        const imagesHtml = (trip.photos || []).map(img =>
          `<img src="${img}" alt="Снимка от пътуването">`
        ).join('');

        const galleryHtml = trip.photos && trip.photos.length > 0
          ? `<div class="memory-photo-scroll">${imagesHtml}</div>`
          : '<p>Няма качени снимки.</p>';

        card.innerHTML = `
          <div class="trip-header">
            <h2>${trip.destination}</h2>
            <strong>Архив</strong>
          </div>
          <div class="trip-info">
            <p><strong>Дати:</strong> ${trip.dateFrom} – ${trip.dateTo}</p>
            <p><strong>Оценка:</strong> <span class="rating">${stars}</span></p>
            <div class="memory-comment">
              <strong>Коментар:</strong>
              <p>${trip.comment || 'Няма коментар.'}</p>
            </div>
            <div class="memory-photo">
              <strong>Снимки:</strong>
              ${galleryHtml}
            </div>
            <button class="btn-archive" onclick="deleteTrip(${index})">Изтрий</button>
          </div>
        `;

        diaryContainer.appendChild(card);
      });
    }

    function deleteTrip(index) {
      const trips = JSON.parse(localStorage.getItem('pastTrips')) || [];
      if (confirm("Сигурни ли сте, че искате да изтриете това пътуване?")) {
        trips.splice(index, 1);
        localStorage.setItem('pastTrips', JSON.stringify(trips));
        renderDiary();
      }
    }

    searchInput.addEventListener('input', renderDiary);
    sortSelect.addEventListener('change', renderDiary);

    renderDiary();