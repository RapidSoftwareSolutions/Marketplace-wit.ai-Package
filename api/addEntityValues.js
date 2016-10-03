const _       = require('../lib/functions');
const request = require('request');

module.exports = (req, res) => {

    /* Get user parameters and prepare it */

    let r = { callback: "", contextWrites: {} };

    let { 
        accessToken,
        entityId,
        value,
        expressions,
        metadata,
        to="to",
    } 
        = req.body.args;

    if(!accessToken || !entityId) {
        _.echoBadEnd(r, to, res);
        return;
    }

    if(expressions) 
    try {
        expressions = JSON.parse(expressions);
    } catch(e) {
        r.contextWrites[to] = 'Invaid JSON data';
        r.callback = 'error';

        res.status(200).send(r);
        return;
    }

    let query = _.clearArgs({
        value,
        expressions,
        metadata
    });
 
    request({
        method: 'POST',
        url: `https://api.wit.ai/entities/${entityId}/values`,
        qs: query,
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