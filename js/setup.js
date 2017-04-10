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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
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

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');

var isKeyPressed = function (evt, code) {
  return evt.keyCode === code;
};

var onBodyClick = function (evt) {
  if (!setup.contains(evt.target)) {
    closeSetup();
  }
};

var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
  document.addEventListener('mouseup', onBodyClick);
};

var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
  document.removeEventListener('mouseup', onBodyClick);
};

var onSetupEscPress = function (evt) {
  if (isKeyPressed(evt, ESC_KEY_CODE)) {
    closeSetup();
  }
};

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (isKeyPressed(evt, ENTER_KEY_CODE)) {
    openSetup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (isKeyPressed(evt, ENTER_KEY_CODE)) {
    closeSetup();
  }
});

setupSubmit.addEventListener('keydown', function (evt) {
  if (isKeyPressed(evt, ENTER_KEY_CODE)) {
    evt.preventDefault();
    closeSetup();
  }
});

// Отключение срабатывания ESC в поле ввода имени персонажа

var setupUserName = setup.querySelector('.setup-user-name');

setupUserName.addEventListener('keydown', function (evt) {
  if (isKeyPressed(evt, ESC_KEY_CODE)) {
    evt.stopPropagation();
  }
});

// Изменение персонажа

var wizard = setup.querySelector('.wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball');

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomArrayElement(COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomArrayElement(EYES_COLORS);
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.backgroundColor = getRandomArrayElement(FIREBALL_COLORS);
});
