const _       = require('../lib/functions');
const request = require('request');

module.exports = (req, res) => {

    /* Get user parameters and prepare it */

    let r = { callback: "", contextWrites: {} };

    let { 
        accessToken,
        text,
        sessionId,
        context,
        to="to",
    } 
        = req.body.args;

    if(!accessToken || !sessionId) {
        _.echoBadEnd(r, to, res, 'accessToken, sessionId');
        return;
    }

    if(context) {
        try {
            context = JSON.parse(context);
        } catch(e) {
            r.contextWrites[to] = {
                'status_code': 'JSON_VALIDATION',
                'status_msg': 'Syntax error. Incorrect input JSON. Please, check fields with JSON input.'
            };
            r.callback = 'error';

            res.status(200).send(r);
            return;
        }
    }

    let query = _.clearArgs({
        session_id: sessionId,
        q: text,
        context: context 
    });
 
    request({
        method: 'POST',
        url: 'https://api.wit.ai/converse',
        qs: query,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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