
    const TOTAL_COUNTRIES = 195;
    const visitedCountries = new Set(JSON.parse(localStorage.getItem("visitedCountries")) || []);

    const width = 1000;
    const height = 500;
    const svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = d3.geoNaturalEarth1().scale(170).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    function updateStats() {
      const visitedCount = visitedCountries.size;
      const percent = ((visitedCount / TOTAL_COUNTRIES) * 100).toFixed(1);

      const pastTrips = JSON.parse(localStorage.getItem("pastTrips")) || [];

      document.getElementById('visitedCount').textContent = visitedCount;
      document.getElementById('visitedPercent').textContent = `${percent}%`;
      document.getElementById('tripCount').textContent = pastTrips.length;
    }

    d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then(data => {
      const countries = topojson.feature(data, data.objects.countries).features;

      svg.selectAll("path")
        .data(countries)
        .join("path")
        .attr("d", path)
        .attr("fill", d => visitedCountries.has(d.id) ? "#4caf50" : "#cfd8dc")
        .attr("stroke", "#607d8b")
        .on("click", function (event, d) {
          if (visitedCountries.has(d.id)) {
            visitedCountries.delete(d.id);
          } else {
            visitedCountries.add(d.id);
          }
          localStorage.setItem("visitedCountries", JSON.stringify([...visitedCountries]));
          d3.select(this).attr("fill", visitedCountries.has(d.id) ? "#4caf50" : "#cfd8dc");
          updateStats();
        });

      updateStats();
    });
 