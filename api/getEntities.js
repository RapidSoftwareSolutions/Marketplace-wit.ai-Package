const _       = require('../lib/functions');
const request = require('request');

module.exports = (req, res) => {

    /* Get user parameters and prepare it */

    let r = { callback: "", contextWrites: {} };

    let { 
        accessToken,
        to="to",
    } 
        = req.body.args;

    if(!accessToken) {
        _.echoBadEnd(r, to, res, 'accessToken');
        return;
    }

    request({
        url: 'https://api.wit.ai/entities',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
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