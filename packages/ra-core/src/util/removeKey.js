const removeKey = (target, path) => {
    if (!target) {
        return target
    }

    return Object.keys(target).reduce((acc, key) => {
        if (!key.startsWith(path)) {
            return Object.assign({}, acc, { [key]: target[key] });
        }

        return acc;
    }, {});
}

const deepRemoveKey = (target, path) => {
    const paths = path.split('.');

    if (paths.length === 1) {
        return removeKey(target, path);
    }

    const deepKey = paths[0];
    const deep = deepRemoveKey(target[deepKey], paths.slice(1).join('.'));

    if (!deep) {
        return target
    }

    if (Object.keys(deep).length === 0) {
        return removeKey(target, deepKey);
    }

    return Object.assign({}, target, { [deepKey]: deep });
};

export default deepRemoveKey;
