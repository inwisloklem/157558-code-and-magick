'use strict';

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var wizardDetails = {
  'firstNames': FIRST_NAMES,
  'lastNames': LAST_NAMES,
  'coatColors': COAT_COLORS,
  'eyesColors': EYES_COLORS
};

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateName(firstNames, lastNames) {
  var name = [getRandomArrayElement(firstNames), getRandomArrayElement(lastNames)];

  return (Math.random > 0.5) ? name.join(' ') : name.reverse().join(' ');
}

function generateWizards(details, num) {
  var wizards = [];

  for (var i = 0; i < num; i++) {
    wizards.push({
      'name': generateName(details.firstNames, details.lastNames),
      'coatColor': getRandomArrayElement(details.coatColors),
      'eyesColor': getRandomArrayElement(details.eyesColors)
    });
  }

  return wizards;
}

function renderWizard(wizard, template) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
}

function makeFragment(wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0, l = wizards.length; i < l; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }

  return fragment;
}

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');

var fragmentWizards = makeFragment(generateWizards(wizardDetails, 4));

setupSimilarList.appendChild(fragmentWizards);

setupSimilar.classList.remove('hidden');

// Открытие и закрытие окна настройки персонажа

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var openSetup = function () {
  setup.classList.remove('hidden');
};

var closeSetup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onSetupEscPress);
};

var onSetupEscPress = function (evt) {
  if (evt.keyCode === 27) {
    closeSetup();
  }
};

setupOpen.addEventListener('click', function () {
  openSetup();

  document.addEventListener('keydown', onSetupEscPress);
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openSetup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closeSetup();
  }
});
