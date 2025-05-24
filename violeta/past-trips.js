 document.addEventListener("DOMContentLoaded", function () {
  const countryFilter = document.getElementById("filter-country");
  const yearFilter = document.getElementById("filter-year");
  const trips = document.querySelectorAll(".past-trip-entry");

  function applyFilters() {
    const selectedCountry = countryFilter.value;
    const selectedYear = yearFilter.value;

    trips.forEach(trip => {
      const tripCountry = trip.getAttribute("data-country");
      const tripYear = trip.getAttribute("data-year");

      const matchCountry = (selectedCountry === "all" || tripCountry === selectedCountry);
      const matchYear = (selectedYear === "all" || tripYear === selectedYear);

      if (matchCountry && matchYear) {
        trip.style.display = "block";
      } else {
        trip.style.display = "none";
      }
    });
  }

  countryFilter.addEventListener("change", applyFilters);
  yearFilter.addEventListener("change", applyFilters);
});