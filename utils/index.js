export function addPad(number) {
  return number.toString().padStart(3, '0');
}

export function nameStats(name) {
  let result = '';
  switch (name) {
    case 'hp':
      result = 'HP';
      break;
    case 'attack':
      result = 'Attack';
      break;
    case 'defense':
      result = 'Defense';
      break;
    case 'special-attack':
      result = 'Sp. Attack';
      break;
    case 'special-defense':
      result = 'Sp. Defense';
      break;
    case 'speed':
      result = 'Speed';
      break;
          default:
      result = '';
      break;
  }

  return result;
}

export function calcProgress(name, number) {
  let result = '';
  switch (name) {
    case 'hp':
      result = 255;
      break;
    case 'attack':
      result = 150;
      break;
    case 'defense':
      result = 230;
      break;
    case 'special-attack':
      result = 150;
      break;
    case 'special-defense':
      result = 230;
      break;
    case 'speed':
      result = 150;
      break;
    default:
      result = 0;
      break;
  }

  // round
  result = Math.round((number / result) * 100);

  return result;
}
