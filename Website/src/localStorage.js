export function loadState() {
  return loadValue('state');
}

export function loadValue(name) {
  try {
    const serializedValue = localStorage.getItem(name);
    if (serializedValue === null) {
      return undefined;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    return undefined;
  }
}

export function saveState(state) {
  saveValue('state', state);
}

export function saveValue(name, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(name, serializedValue);
  } catch (error) {
    // die
  }
}
