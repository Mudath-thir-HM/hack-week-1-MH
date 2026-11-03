/* =========================================================================
   DIRECTORATE OF PROCUREMENT — kiosk app
   Plain JS + bundled GSAP. No imports, no fetch, no network.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- stage */
  var stage = document.getElementById('stage');
  function fitStage() {
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
  }
  window.addEventListener('resize', fitStage);
  fitStage();

  /* ------------------------------------------------------------ pin layout */
  var PIN = {
    coas:       [756, 28],
    dproc:      [796, 150],
    officers:   [1146, 150],
    hard:       [446, 310],
    soft:       [796, 310],
    atb:        [1146, 310],
    ppc:        [616, 490],
    support:    [1146, 490],
    foundation: [446, 648],
    portal:     [796, 648],
    registry:   [1146, 648]
  };

  var NODES = DIRECTORATE.nodes;
  var SVGNS = 'http://www.w3.org/2000/svg';
  var pinGroup = document.getElementById('nodes');
  var pinEls = {};

  NODES.forEach(function (n) {
    var p = PIN[n.id];
    var g = document.createElementNS(SVGNS, 'g');
    g.setAttribute('class', 'node');
    g.setAttribute('data-id', n.id);
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', n.title);

    var hit = document.createElementNS(SVGNS, 'circle');
    hit.setAttribute('class', 'hit');
    hit.setAttribute('cx', p[0]); hit.setAttribute('cy', p[1]); hit.setAttribute('r', 46);

    var halo = document.createElementNS(SVGNS, 'circle');
    halo.setAttribute('class', 'halo');
    halo.setAttribute('cx', p[0]); halo.setAttribute('cy', p[1]); halo.setAttribute('r', 30);

    var ring = document.createElementNS(SVGNS, 'circle');
    ring.setAttribute('class', 'ring');
    ring.setAttribute('cx', p[0]); ring.setAttribute('cy', p[1]); ring.setAttribute('r', 19);

    var num = document.createElementNS(SVGNS, 'text');
    num.setAttribute('class', 'num');
    num.setAttribute('x', p[0]); num.setAttribute('y', p[1] + 5);
    num.textContent = n.no;

    g.appendChild(hit); g.appendChild(halo); g.appendChild(ring); g.appendChild(num);
    g.addEventListener('click', function () { openNode(n.id); });
    pinGroup.appendChild(g);
    pinEls[n.id] = g;

    gsap.set(g, { transformOrigin: p[0] + 'px ' + p[1] + 'px' });
  });

  /* ------------------------------------------- whole rooms act as one button */
  var mapEl = document.getElementById('map');
  Array.prototype.forEach.call(document.querySelectorAll('.zone'), function (zone) {
    var id = zone.getAttribute('data-node');
    var pin = pinEls[id];
    if (!pin) return;

    zone.addEventListener('click', function () { openNode(id); });

    zone.addEventListener('pointerenter', function () {
      if (openId) return;
      pin.classList.add('is-hover');
      zone.classList.add('is-hover');
    });
    zone.addEventListener('pointerleave', function () {
      pin.classList.remove('is-hover');
      zone.classList.remove('is-hover');
    });
    /* touch: flash the room, then open it */
    zone.addEventListener('pointerdown', function () {
      if (openId) return;
      pin.classList.add('is-hover');
      zone.classList.add('is-hover');
      setTimeout(function () {
        pin.classList.remove('is-hover');
        zone.classList.remove('is-hover');
      }, 260);
    });
  });

  /* --------------------------------------------------------------- dossier */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function indexHTML(current) {
    var rows = NODES.map(function (n) {
      return '<button class="ix' + (n.id === current ? ' is-on' : '') + '" data-goto="' + n.id + '">' +
             '<i>' + n.no + '</i><span>' + esc(n.short || n.pin) + '</span></button>';
    }).join('');
    return '<aside class="d-index"><h4>On this plate</h4><nav>' + rows + '</nav></aside>';
  }

  function renderNode(n) {
    var total = NODES.length;
    var mandate = (n.mandate || []).map(function (m) {
      return '<div class="man"><i>' + esc(m.k) + '</i><span>' + esc(m.t) + '</span></div>';
    }).join('');

    var portrait = '';
    if (n.portrait) {
      portrait =
        '<div class="d-portrait">' +
          '<div class="frame"><img src="' + n.portrait + '" alt="' + esc(n.portraitName || '') + '"></div>' +
          '<div class="cap"><b>' + esc(n.portraitName) + '</b>' +
            (n.signature ? '<span class="sig">' + esc(n.signature) + '</span>' : '') +
            '<span>' + esc(n.portraitTitle) + '</span></div>' +
        '</div>';
    }

    var gallery = '';
    if (n.gallery) {
      gallery = '<div class="d-gallery">' + DIRECTORATE.roster.map(function (p) {
        return '<figure><img src="' + p.img + '" alt="' + esc(p.name) + '">' +
               '<figcaption>' + esc(p.name) + '</figcaption></figure>';
      }).join('') + '</div>';
    }

    var lower = '';
    if (n.columns) {
      lower = n.columns.map(function (c) {
        var items = c.items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
        return '<div class="d-col"><h4>' + esc(c.h) + '</h4><ul class="d-list">' + items + '</ul></div>';
      }).join('');
    } else if (mandate) {
      lower = '<div class="d-col d-col--wide"><h4>The duty, as written</h4>' + mandate + '</div>';
    }

    var facts = (n.facts || []).map(function (f) {
      return '<div><small>' + esc(f.k) + '</small><b>' + esc(f.v) + '</b></div>';
    }).join('');

    return '' +
      '<div class="d-head">' +
        '<span class="d-no">' + n.no + '</span>' +
        '<span class="d-kind">' + esc(n.kind) + '</span>' +
        '<span class="spacer"></span>' +
        '<span class="d-count">Room ' + n.no + ' of ' + total + '</span>' +
      '</div>' +

      '<div class="d-main' + (n.portrait ? '' : ' no-portrait') + '">' +
        '<div class="d-copy">' +
          '<h2 class="d-title' + (n.title.length > 27 ? ' long' : '') + '">' + esc(n.title) + '</h2>' +
          '<div class="d-sub">' + esc(n.sub) + '</div>' +
          '<p class="d-lede">' + esc(n.lede) + '</p>' +
          '<div class="d-body">' + (n.body || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
        '</div>' +
        portrait +
        indexHTML(n.id) +
      '</div>' +

      gallery +
      (lower ? '<div class="d-lower">' + lower + '</div>' : '') +
      '<div class="d-facts">' + facts + '</div>';
  }

  /* ------------------------------------------------------------ transitions */
  var plate = document.getElementById('plate');
  var headline = document.getElementById('headline');
  var detail = document.getElementById('detail');
  var dossier = document.getElementById('dossier');
  var scrollBox = document.getElementById('dossier-scroll');
  var backBtn = document.getElementById('back');
  var nextBtn = document.getElementById('next');
  var nextLabel = document.getElementById('next-label');
  var idleNote = document.getElementById('idle');

  var PLATE_X = 520, PLATE_Y = 236, BASE = 0.88, ZOOM = 2.15;
  var STATIC = location.search.indexOf('static') > -1;
  var openId = null, busy = false;

  gsap.set(plate, { scale: BASE, transformOrigin: '0px 0px', x: 0, y: 0 });

  function nodeIndex(id) {
    for (var i = 0; i < NODES.length; i++) if (NODES[i].id === id) return i;
    return -1;
  }

  function openNode(id) {
    if (busy || id === openId) return;
    var n = NODES[nodeIndex(id)];
    if (!n) return;
    busy = true;
    openId = id;
    resetIdle();

    var p = PIN[id];
    var dx = 300 - PLATE_X - p[0] * ZOOM;
    var dy = 560 - PLATE_Y - p[1] * ZOOM;

    /* dossier content, reset to its hidden state */
    scrollBox.innerHTML = renderNode(n);
    gsap.set(dossier, { clipPath: 'inset(0% 0% 0% 100%)' });
    gsap.set([backBtn, nextBtn], { opacity: 0, y: 10 });
    gsap.set(scrollBox.children, { opacity: 0, y: 26 });

    Object.keys(pinEls).forEach(function (k) {
      pinEls[k].classList.toggle('is-dim', k !== id);
      pinEls[k].classList.toggle('is-active', k === id);
    });

    var nextNode = NODES[(nodeIndex(id) + 1) % NODES.length];
    nextLabel.textContent = 'Next · ' + nextNode.pin;

    detail.classList.remove('is-hidden');
    mapEl.classList.add('is-inert');

    var tl = gsap.timeline({ onComplete: function () { busy = false; } });

    tl.to(headline, { opacity: 0, y: -16, duration: 0.45, ease: 'power2.in' }, 0)
      .to('.title-block, .scale-bar, .masthead, #close-app', { opacity: 0, duration: 0.3 }, 0)
      .to(plate, { filter: 'blur(3px)', duration: 0.9, ease: 'power2.inOut' }, 0)
      .to(plate, { x: dx, y: dy, scale: ZOOM, duration: 1.05, ease: 'power3.inOut' }, 0)
      .to(dossier, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'power3.inOut' }, 0.42)
      .to(scrollBox.children, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.055
      }, 0.62)
      .to([backBtn, nextBtn], { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.85)

    if (STATIC) tl.progress(1);
  }

  function closeNode() {
    if (busy || !openId) return;
    busy = true;
    resetIdle();

    var tl = gsap.timeline({
      onComplete: function () {
        busy = false; openId = null;
        mapEl.classList.remove('is-inert');
        detail.classList.add('is-hidden');
        Object.keys(pinEls).forEach(function (k) {
          pinEls[k].classList.remove('is-dim', 'is-active');
        });
      }
    });

    tl.to(scrollBox.children, { opacity: 0, y: 16, duration: 0.3, ease: 'power2.in', stagger: 0.02 }, 0)
      .to([backBtn, nextBtn], { opacity: 0, duration: 0.25 }, 0)
      .to(dossier, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.6, ease: 'power3.inOut' }, 0.12)
      .to(plate, { x: 0, y: 0, scale: BASE, filter: 'blur(0px)', duration: 1.0, ease: 'power3.inOut' }, 0.3)
      .to(headline, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.65)
      .to('.title-block, .scale-bar, .masthead', { opacity: 1, duration: 0.5 }, 0.7)
      .to('#close-app', { opacity: 0.5, duration: 0.5 }, 0.7);
  }

  backBtn.addEventListener('click', closeNode);
  nextBtn.addEventListener('click', function () {
    if (!openId) return;
    var n = NODES[(nodeIndex(openId) + 1) % NODES.length];
    if (busy) return;
    var cur = openId;
    openId = null;              // allow re-open of a different node
    /* quick swap: fade content out, re-render, zoom to the new room */
    busy = true;
    gsap.to(scrollBox.children, {
      opacity: 0, y: -14, duration: 0.22, ease: 'power2.in', stagger: 0.01,
      onComplete: function () { busy = false; openNode(n.id); }
    });
    pinEls[cur].classList.remove('is-dim');
  });

  /* index links inside the dossier */
  scrollBox.addEventListener('click', function (e) {
    var b = e.target.closest('.ix');
    if (!b) return;
    var id = b.getAttribute('data-goto');
    if (id === openId) return;
    var cur = openId;
    openId = null;
    busy = true;
    gsap.to(scrollBox.children, {
      opacity: 0, y: -14, duration: 0.2, ease: 'power2.in', stagger: 0.01,
      onComplete: function () { busy = false; openNode(id); }
    });
    pinEls[cur].classList.remove('is-dim');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Backspace') closeNode();
    if (e.ctrlKey && e.shiftKey && (e.key === 'Q' || e.key === 'q')) closeApp();
  });

  /* ------------------------------------------------ kiosk exit */
  function closeApp() {
    /* Edge will only honour this for app-like windows; if it is ignored we
       tell the operator the one shortcut that always works. */
    try {
      window.open('', '_self');
      window.close();
    } catch (err) { /* ignored */ }

    setTimeout(function () {
      if (!document.hidden && window.closed !== true) {
        var hint = document.getElementById('close-hint');
        gsap.fromTo(hint, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        gsap.to(hint, { opacity: 0, duration: 0.4, delay: 5, ease: 'power2.in' });
      }
    }, 420);
  }
  var closeBtn = document.getElementById('close-app');
  if (closeBtn) closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closeApp(); });

  /* -------------------------------------------------------------- idle loop */
  var idleTimer = null, idlePhase = 0;
  function resetIdle() {
    clearTimeout(idleTimer);
    gsap.to(idleNote, { opacity: 0, duration: 0.3 });
    idleTimer = setTimeout(function () {
      if (openId) {
        gsap.to(idleNote, { opacity: 1, duration: 0.5 });
        setTimeout(closeNode, 1400);
      }
    }, 75000);
  }
  window.addEventListener('pointerdown', resetIdle);
  resetIdle();

  /* breathing halos on the plate, for the unattended screen */
  function attract() {
    gsap.to('.node .halo', {
      opacity: 0.35, scale: 1.12, transformOrigin: '50% 50%',
      duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.22, from: 'start' }
    });
  }

  /* ------------------------------------------------------------------- boot */
  function boot() {
    if (location.search.indexOf('bootonly') > -1) {
      document.getElementById('boot-bar').style.width = '68%';
      document.getElementById('boot-pct').textContent = '68';
      return;
    }
    if (STATIC || location.search.indexOf('skip') > -1) {
      document.getElementById('boot').style.display = 'none';
      introMap();
      return;
    }
    var bar = document.getElementById('boot-bar');
    var pctEl = document.getElementById('boot-pct');
    var statusEl = document.getElementById('boot-status');
    var labels = ['Loading records', 'Setting the plate', 'Drawing the rooms', 'Ready'];
    var prog = { v: 0 };

    var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();

    gsap.to(prog, {
      v: 100, duration: 1.9, ease: 'power2.inOut',
      onUpdate: function () {
        var v = Math.round(prog.v);
        bar.style.width = v + '%';
        pctEl.textContent = (v < 10 ? '0' : '') + v;
        statusEl.textContent = labels[Math.min(3, Math.floor(v / 30))];
      }
    });

    var floor = new Promise(function (r) { setTimeout(r, 2000); });
    var ceiling = new Promise(function (r) { setTimeout(r, 5000); });
    Promise.race([Promise.all([fontsReady, floor]), ceiling]).then(function () {
      var tl = gsap.timeline();
      tl.to('.boot-inner', { opacity: 0, y: -22, duration: 0.55, ease: 'power2.in' }, 0)
        .add(introMap, 0.25)
        .to('#boot', { yPercent: -100, duration: 1.15, ease: 'power4.inOut' }, 0.3)
        .set('#boot', { display: 'none' });
    });
  }

  function introMap() {
    var rooms = ['#g-coas', '#g-dproc', '#g-hard', '#g-soft', '#g-atb', '#g-ppc', '#g-support',
                 '#g-foundation', '#g-portal', '#g-registry'];
    var tl = gsap.timeline();
    gsap.set(rooms, { opacity: 0, y: 14 });
    gsap.set('.node', { opacity: 0, scale: 0.4 });
    gsap.set(['.masthead', '.headline', '.title-block', '.scale-bar'], { opacity: 0, y: 12 });

    tl.to('.masthead', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)
      .to('.headline', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.12)
      .to(rooms, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.055 }, 0.25)
      .to('.node', { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2.2)', stagger: 0.045 }, 0.6)
      .to(['.title-block', '.scale-bar'], { opacity: 1, y: 0, duration: 0.6 }, 0.9)
      .add(attract, 1.4);

    if (STATIC) { tl.progress(1); gsap.killTweensOf('.node .halo'); gsap.set('.node .halo', { opacity: 0 }); }
  }

  /* keep the halos from fighting the hover styles once they have run */
  document.addEventListener('pointerdown', function once() {
    gsap.killTweensOf('.node .halo');
    gsap.set('.node .halo', { opacity: 0, scale: 1 });
    document.removeEventListener('pointerdown', once);
  });

  if (document.fonts && document.fonts.load) {
    document.fonts.load('600 50px Cinzel').catch(function () {});
    document.fonts.load('400 18px Lora').catch(function () {});
    document.fonts.load('500 11px Inter').catch(function () {});
  }

  boot();

  /* deep-link for testing: index.html#n=atb opens that room once the plate is drawn */
  window.addEventListener('error', function (e) {
    if (location.search.indexOf('debug') > -1) document.title = 'ERR · ' + e.message;
  });
  /* layout self-test: index.html?selftest writes the result into the title */
  if (location.search.indexOf('selftest') > -1) {
    setTimeout(function () {
      var bad = [];
      NODES.forEach(function (n) {
        busy = false; openId = null;
        openNode(n.id);
        var lower = document.querySelector('.d-lower');
        var box = document.getElementById('dossier-scroll');
        if (lower && lower.scrollHeight - lower.clientHeight > 2) bad.push(n.id + ':lower');
        if (box && box.scrollHeight - box.clientHeight > 2) bad.push(n.id + ':panel');
      });
      /* room click must open the matching file */
      var zone = document.querySelector('.zone[data-node="soft"]');
      if (zone) {
        zone.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        var t = document.querySelector('.d-title');
        if (!t || t.textContent.indexOf('Soft') === -1) bad.push('zone-click');
      }
      document.title = bad.length ? 'ISSUE ' + bad.join(' ') : 'OK-ALL-FIT';
    }, 700);
  }

  var hv = /[?&]hover=([a-z]+)/.exec(location.search);
  if (hv && pinEls[hv[1]]) {
    setTimeout(function () {
      pinEls[hv[1]].classList.add('is-hover');
      var z = document.querySelector('.zone[data-node="' + hv[1] + '"]');
      if (z) z.classList.add('is-hover');
    }, 1500);
  }

  var m = /^#n=([a-z]+)$/.exec(location.hash || '');
  if (m) setTimeout(function () { openNode(m[1]); }, location.search.indexOf('skip') > -1 ? 1500 : 3400);
})();
