document.addEventListener('DOMContentLoaded', () => {
  const filter = document.getElementById('destination-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filter.addEventListener('change', () => {
    const selected = filter.value;

    galleryItems.forEach(item => {
      const destination = item.dataset.destination;

      if (selected === 'all' || destination === selected) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
