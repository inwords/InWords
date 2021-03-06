export const loadValue = name => {
  try {
    const serializedValue = localStorage.getItem(name);
    if (serializedValue === null) {
      return undefined;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    return undefined;
  }
};

export const loadState = () => loadValue('state');

export const saveValue = (name, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(name, serializedValue);
  } catch (error) {
    // die
  }
};

export const saveState = state => {
  saveValue('state', state);
};

const removeValue = name => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    // die
  }
};

export const removeState = () => {
  removeValue('state');
};
