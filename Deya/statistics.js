
  let visitedCountries = new Set(JSON.parse(localStorage.getItem('visitedCountries')) || []); // Зареждаме посетените държави от localStorage или създаваме празен Set
  const pastTrips = JSON.parse(localStorage.getItem('pastTrips')) || []; // Зареждаме минали пътувания или празен масив
  const countryLayers = {}; // Ще пазим тук слоевете на държавите за по-късно обновяване

  const map = L.map('map').setView([20, 0], 2); // Създаваме карта центрирана на координати [20, 0] със zoom 2
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 5,
    attribution: '© OpenStreetMap'
  }).addTo(map); // Добавяме плочки от OpenStreetMap към картата

  function getCountryStyle(iso) {
    const visited = visitedCountries.has(iso); // Проверяваме дали ISO кода е в множеството
    return {
      color: '#1b5e20',
      weight: 1,
      fillColor: visited ? '#66bb6a' : '#e0e0e0', // Зелен ако е посетена, сив ако не
      fillOpacity: visited ? 0.7 : 0.1 // По-наситен цвят ако е посетена
    };
  }

  function toggleCountry(iso) {
    if (visitedCountries.has(iso)) {
      visitedCountries.delete(iso); // Премахваме ако вече е била добавена
    } else {
      visitedCountries.add(iso); // Добавяме ако не е била
    }
    localStorage.setItem('visitedCountries', JSON.stringify(Array.from(visitedCountries))); // Запазваме в localStorage
    updateLayerStyle(iso); // Обновяваме стила на конкретната държава
    updateStats(); // Обновяваме статистиката
  }

  function updateLayerStyle(iso) {
    if (countryLayers[iso]) {
      countryLayers[iso].setStyle(getCountryStyle(iso)); // Задаваме нов стил според статуса на държавата
    }
  }

  function updateAllStyles() {
    for (const iso in countryLayers) {
      updateLayerStyle(iso); // Обновяваме всички стилове
    }
  }

  function updateStats() {
    const count = visitedCountries.size; // Общ брой посетени държави
    document.getElementById('countriesCount').textContent = count; // Показваме броя
    document.getElementById('worldPercent').textContent = ((count / 195) * 100).toFixed(1) + '%'; // Изчисляваме процента от света
    const totalBudget = pastTrips.reduce((sum, t) => sum + (parseFloat(t.budget) || 0), 0); // Сумираме всички бюджети
    document.getElementById('tripCount').textContent = pastTrips.length; // Общ брой пътувания
    document.getElementById('totalBudget').textContent = totalBudget.toFixed(2) + ' лв.'; // Общо похарчени средства
  }

  fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson') // Зареждаме GeoJSON с границите на държавите
    .then(res => res.json()) // Преобразуваме отговора в JSON
    .then(data => {
      L.geoJSON(data, {
        style: feature => getCountryStyle(feature.properties.ISO_A3), // Стил на всяка държава
        onEachFeature: (feature, layer) => {
          const iso = feature.properties.ISO_A3; // Вземаме ISO кода на държавата
          countryLayers[iso] = layer; // Запазваме слоя по ISO код
          layer.on('click', () => toggleCountry(iso)); // Когато се кликне, превключваме статус
          layer.bindTooltip(feature.properties.ADMIN); // Tooltip с името на държавата
        }
      }).addTo(map); // Добавяме към картата

      setTimeout(() => {
        updateAllStyles(); // Обновяваме всички стилове
        updateStats(); // Обновяваме статистиката
      }, 100); // Изчакваме 100 милисекунди
    });
