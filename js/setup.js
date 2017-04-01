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

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateName(firstNames, lastNames) {
  if (Math.random() > 0.5) {
    return getRandomArrayElement(firstNames) + ' ' + getRandomArrayElement(lastNames);
  } else {
    return getRandomArrayElement(lastNames) + ' ' + getRandomArrayElement(firstNames);
  }
}

function generateWizardsArray(firstNames, lastNames, coatColors, eyesColors, num) {
  var wizards = [];

  for (var i = 0; i < num; i++) {
    wizards.push({
      'name': generateName(firstNames, lastNames),
      'coatColor': getRandomArrayElement(coatColors),
      'eyesColor': getRandomArrayElement(eyesColors)
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

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }

  return fragment;
}

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');

setupSimilarList.appendChild(
    makeFragment(
        generateWizardsArray(FIRST_NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS, 4)
    )
);

setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
