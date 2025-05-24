
    const tripsList = document.getElementById('tripsList'); // Вземаме елемента, в който ще се показват картите
    function parseBGDate(dateStr) {
        const [day, month, year] = dateStr.split('.');
        return new Date(`${year}-${month}-${day}`);
      }
      
    function loadTrips() {
      const trips = JSON.parse(localStorage.getItem('plannedTrips')) || []; // Вземаме планираните пътувания от localStorage или празен масив
      tripsList.innerHTML = ''; // Изчистваме текущото съдържание

      if (trips.length === 0) {
        tripsList.innerHTML = '<p>Няма планирани пътувания.</p>'; // Показваме съобщение, ако няма пътувания
        return;
      }

      trips.forEach((trip, index) => {
        const now = new Date(); // Текуща дата
        const dateTo = parseBGDate(trip.dateTo); // Дата на приключване на пътуването
        const diffTime = dateTo - now; // Разлика в милисекунди
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Преобразуваме в дни
        const expired = diffDays < 0; // Проверяваме дали датата е минала

        const card = document.createElement('div'); // Създаваме нов HTML елемент за пътуването
        card.className = 'trip-card' + (expired ? ' expired' : ''); // Добавяме CSS клас за стил

        card.innerHTML = `
          <div class="trip-header">
            <h2>${trip.destination}</h2>
            <strong>${expired ? 'Изтекло' : 'Предстоящо'}</strong>
          </div>
          <div class="trip-info">
            <p>От: ${trip.dateFrom} до ${trip.dateTo}</p>
            <p>Бюджет: ${trip.budget} лв.</p>
            <p>Остават: ${expired ? '0' : diffDays} дни</p>
          </div>
          <div class="buttons">
             <button class="btn-archive" onclick="archiveTrip(${index})">Архивирай</button>
             <button class="btn-details" onclick="goToDetails(${index})">Детайли</button>
        </div>
        `;

        tripsList.appendChild(card); // Добавяме картата към екрана
      });
    }

    function archiveTrip(index) {
        localStorage.setItem('archivingTripIndex', index);
        window.location.href = 'archive-trip.html';
      }

    loadTrips(); // Стартираме зареждането на пътуванията при отваряне на страницата
    function goToDetails(index) {
        const trips = JSON.parse(localStorage.getItem('plannedTrips')) || [];
        localStorage.setItem('selectedTrip', JSON.stringify(trips[index]));
        window.location.href = '../Airis/trip_details.html';
      }
      