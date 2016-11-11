const _       = require('../lib/functions');
const request = require('request');

module.exports = (req, res) => {

    /* Get user parameters and prepare it */

    let r = { callback: "", contextWrites: {} };

    let { 
        accessToken,
        text,
        textId,
        threadId,
        to="to",
    } 
        = req.body.args;

    if(!accessToken || !text) {
        _.echoBadEnd(r, to, res, 'accessToken');
        return;
    }

    let query = _.clearArgs({
        q: text,
        msg_id: textId,
        thread_id: threadId
    });

    request({
        url: 'https://api.wit.ai/message',
        qs: query,
        headers: {
            'Authorization': `Bearer ${accessToken}`
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