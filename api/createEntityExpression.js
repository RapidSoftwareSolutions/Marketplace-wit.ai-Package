const _       = require('../lib/functions');
const request = require('request');

module.exports = (req, res) => {

    /* Get user parameters and prepare it */

    let r = { callback: "", contextWrites: {} };

    let { 
        accessToken,
        entityId,
        entityValue,
        expression,
        to="to",
    } 
        = req.body.args;

    if(!accessToken || !entityId || !entityValue || !expression) {
        _.echoBadEnd(r, to, res, 'accessToken, entityId, entityValue, expression');
        return;
    }

    let query = {
        expression
    };
 
    request({
        method: 'POST',
        url: `https://api.wit.ai/entities/${entityId}/values/${entityValue}/expressions`,
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