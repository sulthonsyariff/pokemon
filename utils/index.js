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