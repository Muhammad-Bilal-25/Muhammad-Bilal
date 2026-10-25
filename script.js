/* =====================================================
   Muhammad Bilal — Portfolio
   Vanilla JavaScript, no dependencies.
   ===================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------
     CONFIGURATION — edit this section
     --------------------------------------------------- */
  var CONTACT_EMAIL = 'muhammadbilal.25july@gmail.com';

  // Add real URLs (e.g. your GitHub repository) between the quotes.
  // While a URL is empty, the "View Code" button shows as "Code link coming soon".
  var PROJECT_LINKS = {
    banking: { code: '' },   // e.g. 'https://github.com/your-username/banking-management-system'
    hr:      { code: '' },   // e.g. 'https://github.com/your-username/hr-management-system'
    math:    { code: '' }    // e.g. 'https://github.com/your-username/mini-math-book'
  };

  // Project details shown in the "View Details" dialog (content from After.txt)
  var PROJECTS = {
    banking: {
      title: 'Python Banking Management System',
      category: 'Banking Software / Automation',
      tech: 'Python · Excel Integration · Email Automation · WhatsApp Messaging Integration',
      overview: [
        'The Banking Management System is designed to simplify basic banking operations through a Python application. It allows users to manage customer accounts, record deposits and withdrawals, check account balances, and generate balance reports. The application is designed to store and update records in Excel files through Python code.',
        'It also aims to support email and WhatsApp notifications to help communicate account-related updates to customers.'
      ],
      features: [
        'Create new customer accounts.',
        'Deposit money into customer accounts.',
        'Withdraw cash while checking available balances.',
        'Display account balances and transaction histories.',
        'Generate balance sheets or account summary reports.',
        'Store and update customer and transaction records in Excel.',
        'Send email notifications to customers.',
        'Send WhatsApp messages through a suitable messaging integration.',
        'Maintain organized transaction records for easier review.'
      ],
      concepts: ['Python programming', 'Functions and conditional statements', 'File handling and Excel integration', 'Data validation', 'Email automation', 'WhatsApp messaging integration'],
      goal: 'To develop a practical banking application that demonstrates how Python can automate routine financial record-management tasks.',
      note: ''
    },
    hr: {
      title: 'Python HR Management and Employee Analysis System',
      category: 'Human Resource Management / Data Analysis',
      tech: 'Python · Excel Integration · Data Analysis · Email Automation · WhatsApp Messaging Integration',
      overview: [
        'The HR Management System is designed to help organize candidate and employee records, support recruitment, and review employee performance. It uses Python to create and update Excel files containing candidate information, employee details, and monthly performance reports.',
        'The system is also designed to analyze recorded performance data and provide suggestions to HR staff regarding employee recognition, promotion consideration, warnings, or satisfactory performance.'
      ],
      features: [
        'Add new candidate records to Excel files.',
        'Search and organize candidate information for recruitment.',
        'Maintain employee records and update existing details.',
        'Create and update monthly employee progress reports.',
        'Analyze recorded performance indicators.',
        'Generate suggestions for HR review, including promotion consideration, performance warnings, or satisfactory performance.',
        'Send email notifications to candidates or employees when appropriate.',
        'Send WhatsApp messages through a suitable messaging integration.',
        'Generate organized reports to support HR decision-making.'
      ],
      concepts: ['Python programming', 'Excel file creation and updating', 'Data organization and analysis', 'Conditional statements and functions', 'Report generation', 'Email and messaging automation'],
      goal: 'To demonstrate how Python and data analysis can support recruitment, employee record management, and HR reporting.',
      note: 'Note: HR recommendations should support human decision-making, not automatically determine promotions or disciplinary action. They should use relevant, validated data and fair criteria.'
    },
    math: {
      title: 'Mini Math Book — A Python Mathematics Application',
      category: 'Educational Software / Mathematics',
      tech: 'Python',
      overview: [
        'Mini Math Book is a beginner-friendly Python application designed to help students perform basic mathematical calculations and practice multiplication tables. It allows users to add, subtract, multiply, and divide numbers. It also generates multiplication tables in forward or backward order and supports user-defined ranges.',
        'The project combines programming fundamentals with simple educational features to make mathematical practice more convenient.'
      ],
      features: [
        'Addition of two numbers.',
        'Subtraction of numbers.',
        'Multiplication of numbers.',
        'Division with zero-division error handling.',
        'Generate multiplication tables in forward order.',
        'Generate multiplication tables in backward order.',
        'Generate tables for a user-selected range.',
        'Accept user input and display clear results.',
        'Validate input to handle common errors.'
      ],
      concepts: ['Python programming', 'Arithmetic operators', 'Functions and loops', 'Conditional statements', 'User input and output', 'Input validation and error handling'],
      goal: 'To strengthen programming fundamentals and logical thinking by building a simple educational application for everyday mathematical practice.',
      note: ''
    }
  };

  /* ---------------------------------------------------
     Helpers
     --------------------------------------------------- */
  var root = document.documentElement;
  root.classList.add('js');

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function isValidUrl(value) {
    if (!value) return false;
    try {
      var u = new URL(value);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch (e) { return false; }
  }

  /* ---------------------------------------------------
     Mobile navigation
     --------------------------------------------------- */
  var header = $('.site-header');
  var nav = $('#primary-nav');
  var toggle = $('.nav-toggle');
  var navLinks = $$('.nav-link');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close when a link is chosen
  navLinks.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  // Close with Escape (return focus to the button) or when clicking outside
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
  });

  // Reset if the viewport grows to desktop width
  var desktopMq = window.matchMedia('(min-width: 1024px)');
  function onDesktopChange(e) { if (e.matches) setMenu(false); }
  if (desktopMq.addEventListener) desktopMq.addEventListener('change', onDesktopChange);
  else if (desktopMq.addListener) desktopMq.addListener(onDesktopChange);

  /* ---------------------------------------------------
     Header shadow + back-to-top button
     --------------------------------------------------- */
  var toTop = $('.to-top');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', y > 10);
    toTop.hidden = y < 600;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // Move focus to the top of the page for keyboard users
    var brand = $('.brand');
    if (brand) brand.focus({ preventScroll: true });
  });

  /* ---------------------------------------------------
     Active nav link (scroll spy)
     --------------------------------------------------- */
  var spySections = navLinks
    .map(function (a) { return $(a.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (a) {
      var active = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', active);
      if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    spySections.forEach(function (s) { spy.observe(s); });
  }
  setActive('home');

  /* ---------------------------------------------------
     Scroll reveal
     --------------------------------------------------- */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el, i) {
      // gentle stagger for sibling cards
      if (el.classList.contains('project-card')) el.style.transitionDelay = (i % 3) * 80 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------
     Projects: link buttons + details dialog
     --------------------------------------------------- */
  $$('.project-card').forEach(function (card) {
    var key = card.getAttribute('data-project');
    var link = $('.project-code-link', card);
    var url = PROJECT_LINKS[key] && PROJECT_LINKS[key].code;
    if (!link) return;

    if (isValidUrl(url)) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'View code for ' + (PROJECTS[key] ? PROJECTS[key].title : 'project') + ' (opens in a new tab)');
    } else {
      // No valid URL provided: keep the button visible but clearly inactive
      link.removeAttribute('href');
      link.setAttribute('role', 'link');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('title', 'Code link coming soon');
      $('span', link).textContent = 'Link coming soon';
      link.addEventListener('click', function (e) { e.preventDefault(); });
    }
  });

  var dialog = $('#project-dialog');
  var dialogClose = $('.dialog-close', dialog);
  var lastTrigger = null;

  function fillList(listEl, items) {
    listEl.textContent = '';
    items.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      listEl.appendChild(li);
    });
  }

  function openProject(key, trigger) {
    var p = PROJECTS[key];
    if (!p) return;
    lastTrigger = trigger;

    $('#dialog-category').textContent = p.category;
    $('#dialog-title').textContent = p.title;
    $('#dialog-tech').textContent = p.tech;

    var overview = $('#dialog-overview');
    overview.textContent = '';
    p.overview.forEach(function (para) {
      var el = document.createElement('p');
      el.textContent = para;
      overview.appendChild(el);
    });

    fillList($('#dialog-features'), p.features);
    fillList($('#dialog-concepts'), p.concepts);
    $('#dialog-goal').textContent = p.goal;

    var note = $('#dialog-note');
    note.hidden = !p.note;
    note.textContent = p.note;

    $('.dialog-inner', dialog).scrollTop = 0;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');   // very old browsers: show non-modally
    }
    document.body.classList.add('dialog-open');
  }

  function closeProject() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  dialog.addEventListener('close', function () {
    document.body.classList.remove('dialog-open');
    if (lastTrigger) lastTrigger.focus();
  });

  $$('[data-details]').forEach(function (btn) {
    btn.addEventListener('click', function () { openProject(btn.getAttribute('data-details'), btn); });
  });
  dialogClose.addEventListener('click', closeProject);
  // Click on the backdrop (outside the dialog box) closes it
  dialog.addEventListener('click', function (e) {
    var r = dialog.getBoundingClientRect();
    var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) closeProject();
  });

  /* ---------------------------------------------------
     Contact form
     No backend is configured, so the form never claims to have
     "sent" anything to a server. After validation it opens the
     visitor's email app with the message pre-filled (mailto:).
     --------------------------------------------------- */
  var form = $('#contact-form');
  var statusBox = $('#form-status');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    name: function (v) {
      if (!v) return 'Please enter your full name.';
      if (v.length < 2) return 'Your name must be at least 2 characters.';
      return '';
    },
    email: function (v) {
      if (!v) return 'Please enter your email address.';
      if (!EMAIL_RE.test(v)) return 'Please enter a valid email address, like name@example.com.';
      return '';
    },
    subject: function (v) {
      if (!v) return 'Please enter a subject.';
      if (v.length < 3) return 'The subject must be at least 3 characters.';
      return '';
    },
    message: function (v) {
      if (!v) return 'Please write a message.';
      if (v.length < 10) return 'Your message must be at least 10 characters (currently ' + v.length + ').';
      return '';
    }
  };

  function validateField(field) {
    var msg = rules[field.name](field.value.trim());
    var err = $('#' + field.id + '-error');
    err.textContent = msg;
    if (msg) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    return !msg;
  }

  var fields = $$('input, textarea', form);

  fields.forEach(function (field) {
    field.addEventListener('blur', function () { if (field.value || field.hasAttribute('aria-invalid')) validateField(field); });
    field.addEventListener('input', function () { if (field.hasAttribute('aria-invalid')) validateField(field); });
  });

  function showStatus(type, html) {
    statusBox.hidden = false;
    statusBox.className = 'form-status ' + (type === 'success' ? 'is-success' : 'is-error');
    statusBox.setAttribute('role', type === 'success' ? 'status' : 'alert');
    statusBox.innerHTML = html;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusBox.hidden = true;

    var firstInvalid = null;
    fields.forEach(function (f) {
      if (!validateField(f) && !firstInvalid) firstInvalid = f;
    });

    if (firstInvalid) {
      showStatus('error', 'Please fix the highlighted fields and try again.');
      firstInvalid.focus();
      return;
    }

    var data = {};
    fields.forEach(function (f) { data[f.name] = f.value.trim(); });

    var body =
      'Name: ' + data.name + '\r\n' +
      'Email: ' + data.email + '\r\n\r\n' +
      data.message;
    var mailto = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(data.subject) +
      '&body=' + encodeURIComponent(body);

    // Hand over to the visitor's email app; nothing is sent from this page.
    window.location.href = mailto;

    showStatus('success',
      'Thank you, ' + escapeHtml(data.name) + '! Your email app should now open with your message ready. ' +
      'Please press <strong>Send</strong> there to deliver it. Nothing has been sent from this website yet. ' +
      'If nothing opened, write to <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a> directly.');
    statusBox.focus();
    form.reset();
  });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
