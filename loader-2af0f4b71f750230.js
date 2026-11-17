// Trunk's initializer hooks (see the rust link in index.html): moves the
// loading screen's film strip along as the game downloads.
export default function loader() {
  const fill = document.getElementById('fill');
  const status = document.getElementById('status');
  // The deploy workflow writes the real size in. Without it, use Trunk's
  // figure, which is the size before wasm-opt (too big, for release builds).
  const known = Number(document.querySelector('meta[name="wasm-size"]')?.content) || 0;
  const mb = (bytes) => (bytes / 1e6).toFixed(1) + ' MB';
  return {
    onStart() {
      status.textContent = 'Loading the reels…';
    },
    onProgress({ current, total }) {
      const size = known || total;
      if (size > 0 && current <= size) {
        const share = current / size;
        fill.style.width = (share * 100).toFixed(1) + '%';
        status.textContent = 'Loading the reels… ' + Math.floor(share * 100) + '%';
      } else {
        status.textContent = 'Loading the reels… ' + mb(current);
      }
    },
    onComplete() {
      fill.style.width = '100%';
      status.textContent = 'Warming up the projector…';
    },
    onSuccess() {},
    onFailure(error) {
      status.textContent = 'The film snapped! Reload the page to try again.';
      console.error(error);
    },
  };
}
