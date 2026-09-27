(() => {
  'use strict';

  const CONFIG = {
    checkoutBasic: 'https://payfast.greenn.com.br/rd6jpt9?ch_id=143771&b_id_1=fec5sdk&b_offer_1=IMywXF',
    checkoutPro: 'https://payfast.greenn.com.br/97ne23k?ch_id=143774',
    checkoutFlash: 'https://payfast.greenn.com.br/byb9n4u?ch_id=143774',
    flashMinutes: 9
  };

  const questions = [
    {
      key: 'ready',
      title: 'Você está disposto a começar a estudar agora se isso puder te aproximar de uma vida mais estável?',
      options: ['Sim, quero começar', 'Quero, mas ainda estou perdido', 'Ainda tenho dúvidas']
    },
    {
      key: 'age',
      title: 'Qual é a sua idade?',
      options: ['18–24', '25–34', '35–44', '45–54', '55+']
    },
    {
      key: 'experience',
      title: 'Você já tentou estudar para concurso antes?',
      options: ['Nunca comecei', 'Já tentei, mas parei', 'Estou estudando atualmente', 'Já fiz algumas provas']
    },
    {
      key: 'spent',
      title: 'Você já pagou por cursinhos ou materiais para concurso?',
      options: ['Nunca', 'Até R$100', 'Entre R$100 e R$500', 'Mais de R$500']
    },
    {
      key: 'barrier',
      title: 'Qual é a sua maior dificuldade hoje?',
      options: ['Não sei o que estudar', 'Não consigo me organizar', 'Cursinhos são caros demais', 'Tenho pouco tempo', 'Não sei por onde começar']
    }
  ];

  let questionIndex = 0;
  let quizCompleted = false;
  const answers = {};

  const gate = document.getElementById('quizGate');
  const site = document.getElementById('site');
  const progress = document.getElementById('quizProgress');
  const startScreen = document.getElementById('quizStart');
  const questionScreen = document.getElementById('quizQuestion');
  const resultScreen = document.getElementById('quizResult');
  const questionTitle = document.getElementById('questionTitle');
  const questionOptions = document.getElementById('questionOptions');
  const questionCount = document.getElementById('questionCount');
  const questionMini = document.getElementById('questionMini');
  const resultText = document.getElementById('quizResultText');
  const backBtn = document.getElementById('quizBack');

  function showScreen(screen) {
    [startScreen, questionScreen, resultScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
  }

  function renderQuestion() {
    const q = questions[questionIndex];
    showScreen(questionScreen);
    const pct = Math.round(((questionIndex + 1) / questions.length) * 100);
    progress.style.width = `${pct}%`;
    questionCount.textContent = `PERGUNTA ${questionIndex + 1} DE ${questions.length}`;
    questionMini.textContent = `${pct}%`;
    questionTitle.textContent = q.title;
    questionOptions.innerHTML = '';

    q.options.forEach(option => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-button';
      btn.textContent = option;
      btn.addEventListener('click', () => {
        answers[q.key] = option;
        if (questionIndex < questions.length - 1) {
          questionIndex += 1;
          renderQuestion();
        } else {
          showQuizResult();
        }
      });
      questionOptions.appendChild(btn);
    });
  }

  function showQuizResult() {
    progress.style.width = '100%';
    const barrier = answers.barrier || '';
    const map = {
      'Não sei o que estudar': 'Pelas suas respostas, faz sentido começar com um material que já mostre o que estudar e em qual direção seguir.',
      'Não consigo me organizar': 'Pelas suas respostas, uma estrutura mais organizada pode ajudar você a manter constância sem se perder no caminho.',
      'Cursinhos são caros demais': 'Pelas suas respostas, faz sentido começar com algo mais acessível, sem precisar investir alto logo no primeiro passo.',
      'Tenho pouco tempo': 'Pelas suas respostas, o ideal é ter um material mais objetivo para aproveitar melhor cada sessão de estudo.',
      'Não sei por onde começar': 'Pelas suas respostas, o mais importante agora é ter clareza para tirar a preparação da estaca zero.'
    };
    resultText.textContent = map[barrier] || 'Pelas suas respostas, uma preparação objetiva e organizada pode ajudar você a começar sem gastar uma fortuna.';
    showScreen(resultScreen);
  }

  document.querySelector('[data-action="start-quiz"]').addEventListener('click', () => {
    questionIndex = 0;
    progress.style.width = '20%';
    renderQuestion();
  });

  backBtn.addEventListener('click', () => {
    if (questionIndex > 0) {
      questionIndex -= 1;
      renderQuestion();
    } else {
      progress.style.width = '0%';
      showScreen(startScreen);
    }
  });

  document.querySelector('[data-action="enter-site"]').addEventListener('click', () => {
    const barrier = answers.barrier;
    const personalizedLine = document.getElementById('personalizedLine');
    const map = {
      'Não sei o que estudar': 'Você disse que não sabe exatamente o que estudar. Por isso o conteúdo principal já está dividido por blocos e por tema.',
      'Não consigo me organizar': 'Você disse que sua maior dificuldade é organização. O Kit Pro inclui materiais para ajudar a dar mais ritmo e estrutura à rotina.',
      'Cursinhos são caros demais': 'Você disse que cursinhos caros são uma barreira. Aqui você pode começar por R$19,90, sem mensalidade.',
      'Tenho pouco tempo': 'Você disse que tem pouco tempo. A ideia é te ajudar com um material mais direto para aproveitar melhor as horas disponíveis.',
      'Não sei por onde começar': 'Você disse que ainda não sabe por onde começar. A proposta aqui é tornar o primeiro passo mais simples.'
    };
    if (map[barrier]) {
      personalizedLine.textContent = map[barrier];
      personalizedLine.hidden = false;
    }

    quizCompleted = true;
    gate.hidden = true;
    site.hidden = false;
    document.body.classList.remove('quiz-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    try { sessionStorage.setItem('inssQuizCompleted', '1'); } catch (_) {}
  });

  function goCheckout(kind) {
    const url = kind === 'basic' ? CONFIG.checkoutBasic : kind === 'pro' ? CONFIG.checkoutPro : CONFIG.checkoutFlash;
    if (!url) {
      alert(`Checkout ${kind.toUpperCase()} ainda não configurado. Abra script.js e preencha a URL em CONFIG.`);
      return;
    }
    window.location.href = url;
  }

  document.querySelectorAll('[data-checkout]').forEach(btn => {
    btn.addEventListener('click', () => goCheckout(btn.dataset.checkout));
  });

  const promoBar = document.getElementById('promoBar');
  const basicModal = document.getElementById('basicModal');
  const exitModal = document.getElementById('exitModal');
  const basicButton = document.getElementById('basicOfferButton');
  const countdownEls = [...document.querySelectorAll('[data-countdown]')];
  const FLASH_KEY = 'inssFlashEndsAt';
  let countdownTimer = null;
  let exitShown = false;

  function getFlashEnd() {
    try { return Number(sessionStorage.getItem(FLASH_KEY)) || 0; } catch (_) { return 0; }
  }
  function setFlashEnd(ts) {
    try { sessionStorage.setItem(FLASH_KEY, String(ts)); } catch (_) {}
  }
  function ensureFlashStarted() {
    let endsAt = getFlashEnd();
    const now = Date.now();
    if (!endsAt || endsAt <= now) {
      endsAt = now + CONFIG.flashMinutes * 60 * 1000;
      setFlashEnd(endsAt);
    }
    promoBar.hidden = false;
    startCountdown();
    return endsAt;
  }
  function startCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);
    const tick = () => {
      const endsAt = getFlashEnd();
      const remaining = Math.max(0, endsAt - Date.now());
      const totalSec = Math.ceil(remaining / 1000);
      const min = Math.floor(totalSec / 60).toString().padStart(2, '0');
      const sec = (totalSec % 60).toString().padStart(2, '0');
      countdownEls.forEach(el => el.textContent = `${min}:${sec}`);
      if (remaining <= 0) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        promoBar.hidden = true;
        if (!basicModal.hidden) closeModal(basicModal);
        if (!exitModal.hidden) closeModal(exitModal);
      }
    };
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  function openModal(modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  basicButton.addEventListener('click', () => {
    ensureFlashStarted();
    openModal(basicModal);
  });

  document.querySelectorAll('[data-close="basic"]').forEach(el => el.addEventListener('click', () => closeModal(basicModal)));
  document.querySelectorAll('[data-close="exit"]').forEach(el => el.addEventListener('click', () => closeModal(exitModal)));

  if (getFlashEnd() > Date.now()) {
    promoBar.hidden = false;
    startCountdown();
  }

  document.addEventListener('mouseout', (event) => {
    if (!quizCompleted || site.hidden || exitShown || (!event.relatedTarget && event.clientY > 0)) return;
    if (event.clientY <= 0 && window.innerWidth > 760) {
      exitShown = true;
      ensureFlashStarted();
      openModal(exitModal);
    }
  });

  setTimeout(() => {
    if (quizCompleted && !site.hidden && !exitShown && window.innerWidth <= 760 && window.scrollY > window.innerHeight * 0.6) {
      exitShown = true;
      ensureFlashStarted();
      openModal(exitModal);
    }
  }, 70000);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!basicModal.hidden) closeModal(basicModal);
    if (!exitModal.hidden) closeModal(exitModal);
  });
})();
