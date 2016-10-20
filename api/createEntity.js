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
        _.echoBadEnd(r, to, res);
        return;
    }

    try {
        if(values)  values = JSON.parse(values);
        if(lookups) lookups = JSON.parse(lookups);
    } catch(e) {
        r.contextWrites[to] = 'Invaid JSON data';
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
        //qs: query,
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
