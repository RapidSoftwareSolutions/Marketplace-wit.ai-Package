const _       = require('../lib/functions');
const request = require('request');

module.exports = (req, res) => {

    /* Get user parameters and prepare it */

    let r = { callback: "", contextWrites: {} };

    let { 
        accessToken,
        entityId,
        entityValue,
        expressionValue,
        to="to",
    } 
        = req.body.args;

    if(!accessToken || !entityId || !entityValue || !expressionValue) {
        _.echoBadEnd(r, to, res);
        return;
    } 
    request({
        method: 'DELETE',
        url: `https://api.wit.ai/entities/${entityId}/values/${entityValue}/expressions/${expressionValue}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
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