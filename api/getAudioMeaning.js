const _       = require('../lib/functions');
const request = require('request');
const http    = require('http');
const mime    = require('mime');
const fs      = require('fs');

module.exports = (req, res) => {

    /* Get user parameters and prepare it */

    let r = { callback: "", contextWrites: {} };

    let { 
        accessToken,
        data,
        textId,
        threadId,
        outcomesNumber,
        to="to",
    } 
        = req.body.args;

    if(!accessToken || !data) {
        _.echoBadEnd(r, to, res, 'accessToken, data');
        return;
    }

    let dest        = data.substring(data.lastIndexOf('.') + 1);
    let name        = Math.random().toString(36).substring(7) + '_rapid.' + dest;
    let writeStream = fs.createWriteStream(`/tmp/${name}`);
    let mimetype    = mime.lookup(`.${dest}`);

    if(!/wav|mpeg3|ulaw|raw/.test(mimetype.split('/')[1])) {
        r.contextWrites[to] = 'Bad file mime type.';
        r.callback = 'error';

        res.status(200).send(r);
    }

    let query       = _.clearArgs({msg_id: textId, thread_id: threadId, n: outcomesNumber});
    // todo promise

    http.get(data, (response) => {
        response.pipe(writeStream);

        response.on('error', () => {
            r.contextWrites[to] = 'Bad file request.';
            r.callback = 'error';

            console.log('here');
            res.status(200).send(r);
            return;
        });

        response.on('end', () => {
            request({
                method: 'POST',
                uri: 'https://api.wit.ai/speech',
                qs: query,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type':  'audio/wav'
                },
                body: fs.readFileSync(`/tmp/${name}`) 
            }, (err, response, body) => {
                if(err || response.statusCode !== 200) {
                    r.contextWrites[to] = body || JSON.stringify(err);
                    r.callback = 'error';

                    res.status(200).send(r);
                    return;
                }

                r.contextWrites[to] = body;
                r.callback = 'success';

                res.status(200).send(r);
            })          
        });
    });
};