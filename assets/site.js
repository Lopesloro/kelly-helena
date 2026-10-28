(function () {
  // Header: transparente sobre o hero, sólido depois de 80px.
  var header = document.getElementById('header');
  if (header && !header.classList.contains('plain')) {
    var onScroll = function () {
      header.classList.toggle('solid', window.scrollY > 80);
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Menu mobile.
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Reveal das seções. O fallback existe porque dentro do webview do Instagram
  // o IntersectionObserver às vezes não dispara e a página fica em branco.
  var targets = document.querySelectorAll('.reveal');
  var showAll = function () {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('in');
  };
  if (!('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18 });
    for (var j = 0; j < targets.length; j++) io.observe(targets[j]);
    setTimeout(showAll, 2500);
  }

  // Carrossel com peek.
  var track = document.getElementById('track');
  if (track) {
    var slides = Array.prototype.slice.call(track.children);
    var idx = 0;
    var render = function () {
      var w = slides[0].getBoundingClientRect().width;
      var offset = (track.parentElement.clientWidth - w) / 2;
      track.style.transform = 'translateX(' + (offset - idx * w) + 'px)';
      slides.forEach(function (s, n) { s.classList.toggle('is-active', n === idx); });
    };
    var prev = document.querySelector('.car-btn.prev');
    var next = document.querySelector('.car-btn.next');
    if (next) next.addEventListener('click', function () { idx = Math.min(idx + 1, slides.length - 1); render(); });
    if (prev) prev.addEventListener('click', function () { idx = Math.max(idx - 1, 0); render(); });
    addEventListener('resize', render);
    render();
  }
})();
