(function () {
  var TOTAL = RULES.length;
  var currentIndex = 0;

  var elTitle = document.getElementById('slide-title');
  var elShortName = document.getElementById('slide-short-name');
  var elDescription = document.getElementById('slide-description');
  var elExample = document.getElementById('slide-example');
  var elImageContainer = document.getElementById('slide-image-container');
  var elCounter = document.getElementById('slide-counter');
  var btnPrev = document.getElementById('btn-prev');
  var btnNext = document.getElementById('btn-next');

  function renderSlide(index) {
    var rule = RULES[index];
    if (!rule) return;

    elTitle.textContent = rule.titleLabel || ('Rule ' + rule.id);
    elShortName.textContent = rule.shortName;
    elDescription.textContent = rule.description;
    elExample.textContent = rule.example;

    var imageSrc = rule.imageUrl || rule.id + '.jpg';
    elImageContainer.innerHTML = '';
    var img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Illustration for Rule ' + rule.id;
    img.onerror = function () { this.style.display = 'none'; this.parentNode.innerHTML = '<span class="image-placeholder">Image for Rule ' + rule.id + '</span>'; };
    if (rule.linkUrl) {
      var a = document.createElement('a');
      a.href = rule.linkUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.appendChild(img);
      elImageContainer.appendChild(a);
    } else {
      elImageContainer.appendChild(img);
    }

    var isLastSlide = index === TOTAL - 1;
    if (isLastSlide) {
      elCounter.style.display = 'none';
    } else {
      elCounter.style.display = '';
      elCounter.textContent = (index + 1) + ' / 48';
    }

    btnPrev.disabled = index === 0;
    btnNext.disabled = index === TOTAL - 1;
  }

  function goPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      renderSlide(currentIndex);
    }
  }

  function goNext() {
    if (currentIndex < TOTAL - 1) {
      currentIndex++;
      renderSlide(currentIndex);
    }
  }

  btnPrev.addEventListener('click', goPrev);
  btnNext.addEventListener('click', goNext);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });

  renderSlide(0);
})();
