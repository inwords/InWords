const StringifyFormDataUtil = {
    stringifyFormData: function(fd) {
        const data = {};
        for (let key of fd.keys()) {
            data[key] = fd.get(key);
        }
        return JSON.stringify(data, null, 2);
    },
};

export default StringifyFormDataUtil;