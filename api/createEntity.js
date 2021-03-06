const _       = require('../lib/functions');
const request = require('request');

module.exports = (req, res) => {

    /* Get user parameters and prepare it */

    let r = { callback: "", contextWrites: {} };

    let { 
        accessToken,
        id,
        description,
        values,
        lookups,
        to="to",
    } 
        = req.body.args;

    if(!accessToken || !id) {
        _.echoBadEnd(r, to, res, 'accessToken, id');
        return;
    }

    try {
        if(values && typeof values == 'string')  values = JSON.parse(values);
        if(lookups && typeof lookups == 'string') lookups = JSON.parse(lookups);
    } catch(e) {
        r.contextWrites[to] = {
            'status_code': 'JSON_VALIDATION',
            'status_msg': 'Syntax error. Incorrect input JSON. Please, check fields with JSON input.'
        };
        r.callback = 'error';

        res.status(200).send(r);
        return;
    }

    let query = _.clearArgs({
        id,
        values,
        lookups,
        doc: description
    });
 
    request({
        method: 'POST',
        url: 'https://api.wit.ai/entities',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    },
    (err, response, body) => {
        if(err || response.statusCode !== 200) {
            r.contextWrites[to] = body || JSON.stringify(err);
            r.callback = 'error';

            res.status(200).send(r);
            return;
        }

        r.contextWrites[to] = body;
        r.callback = 'success';

        res.status(200).send(r);
    });
};
