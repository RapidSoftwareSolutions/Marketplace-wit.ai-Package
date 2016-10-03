const _       = require('../lib/functions');
const request = require('request');

module.exports = (req, res) => {

    /* Get user parameters and prepare it */

    let r = { callback: "", contextWrites: {} };

    let { 
        accessToken,
        entityId,
        id,
        description,
        values,
        to="to"
    } 
        = req.body.args;

    if(!accessToken || !entityId) {
        _.echoBadEnd(r, to, res);
        return;
    }

    if(values)  
    try {
        values = JSON.parse(values);
    } catch(e) {
        r.contextWrites[to] = 'Invaid JSON data';
        r.callback = 'error';

        res.status(200).send(r);
        return;
    }

    let query = _.clearArgs({
        id,
        values,
        doc: description
    });

    request({
        method: 'PUT',
        url: `https://api.wit.ai/entities/${entityId}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
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