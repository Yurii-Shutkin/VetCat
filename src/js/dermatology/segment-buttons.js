document.querySelectorAll('[data-tabs]').forEach(tabs => {
  const buttons = tabs.querySelectorAll('[data-tab]');
  const contents = document.querySelectorAll('[data-content]');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      buttons.forEach(b => b.classList.remove('segment-item--active'));
      contents.forEach(c => c.classList.remove('active'));

      btn.classList.add('segment-item--active');
      document
        .querySelector(`[data-content="${tab}"]`)
        ?.classList.add('is-active');
    });
  });
});
