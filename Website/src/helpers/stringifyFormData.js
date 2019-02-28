export function stringifyFormData(formData) {
    const data = {};
    for (let key of formData.keys()) {
        data[key] = formData.get(key);
    }
    return JSON.stringify(data, null, 2);
};
