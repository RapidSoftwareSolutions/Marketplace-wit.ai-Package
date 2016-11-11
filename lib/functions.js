module.exports.echoBadEnd = (r, to, res, req) => {
    r.contextWrites[to] = {
        text: 'Please, check and fill in required fields',
        fields: req.split(', ')
    };
    r.callback = 'error';

    res.status(200).send(r);
};

module.exports.clearArgs = function fn(obj, recurse) {
    for (var i in obj) {
        if (obj[i] == undefined || obj[i] == '') {
            delete obj[i];
        } else if (recurse && typeof obj[i] === 'object') {
            if(JSON.stringify(obj[i]) == '{}') {
                delete obj[i];
            }

            fn(obj[i], true);
        }
    }

    return obj;
}
