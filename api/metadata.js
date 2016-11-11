module.exports.do = function(req, res){
    /* When sending GET request to api/Twitter, return the metadata of the package */
    res.status(200).send({
        'package': 'WitAI',
        "tagline": "Wit.ai API Package",
        "description": "Wit.ai makes it easy for developers to build applications and devices that you can talk or text to.",
        'image': 'https://img.stackshare.io/service/767/Qe0MWT5x.png',
        'repo': 'https://github.com/RapidSoftwareSolutions/marketplace-wit.ai-package',
        'accounts': {
            'domain': 'wit.ai',
            'credentials': [
                'accessToken',
            ]
        },
        'blocks': [{
            "name":"getSentenceMeaning",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "text",
                    type: "String",
                    info: "Required: User’s query. Length must be > 0 and < 256",
                },
                {
                    name: "textId",
                    type: "String",
                    info: "Optional: A specific Id you want to assign to the message that will be processed. If not set, Wit.ai will auto generate one for you"
                },
                {
                    name: "threadId",
                    type: "String",
                    info: "Optional: A specific Id that will let you group requests per conversation"
                },
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"getAudioMeaning",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "data",
                    type: "String",
                    info: "Required: Link to `wav` or `mpeg3` or `ulaw` or `raw` audio file.",
                },
                {
                    name: "textId",
                    type: "String",
                    info: "Optional: A specific Id you want to assign to the message that will be processed. If not set, Wit.ai will auto generate one for you"
                },
                {
                    name: "threadId",
                    type: "String",
                    info: "Optional: A specific Id that will let you group requests per conversation"
                },
                {
                    name: "outcomesNumber",
                    type: "String",
                    info: "Optional: The number of n-best outcomes you want to get back. default is 1"
                }
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"getBotNextStep",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "sessionId",
                    type: "String",
                    info: "Required: The session_id is a unique ID you generate on your side to group messages from the same user request/conversation. When you start a new conversation, you should generate a new one. You should generate a new one, even when the user is the same.",
                },
                {
                    name: "text",
                    type: "String",
                    info: "Optional: A message from the user. Length must be > 0 and < 256. This should only be set at the first call until you get type=”stop”"
                },
                {
                    name: "context",
                    type: "JSON",
                    info: "Optional: The object representing the session state. You can pass the context either as a URL param or in the body of your POST."
                }
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"getEntities",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                }
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"createEntity",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "id",
                    type: "String",
                    info: "Required: ID or name of the requested entity",
                },
                {
                    name: "description",
                    type: "String",
                    info: "Optional: Short sentence describing this entity",
                },
                {
                    name: "values",
                    type: "JSON",
                    info: "Optional: Array of JSON objects. Possible values for this entity",
                },
                {
                    name: "lookups",
                    type: "JSON",
                    info: "Optional: JSON array of strings. Currently only supporting “trait” or “keywords” Search Strategy. If not provided, it will default to “keywords”.Traits are only available for new Bot Engine apps",
                },
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"getEntityValues",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "Required: ID or name of the entity."
                },
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"updateEntityValues",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "Required: ID or name of the entity."
                },
                {
                    name: "id",
                    type: "String",
                    info: "Optional: New ID or name of the entity"
                },
                {
                    name: "description",
                    type: "String",
                    info: "Optional: Short sentence describing this entity"
                },
                {
                    name: "values",
                    type: "JSON",
                    info: "Optional: Array of JSON objects. Possible values for this entity"
                },
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"deleteEntity",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "Required: ID or name of the entity."
                },
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"addEntityValues",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "Required: ID or name of the entity."
                },
                {
                    name: "value",
                    type: "String",
                    info: "Required: Canonical value of the entity"
                },
                {
                    name: "expressions",
                    type: "JSON",
                    info: "Optional: Ways of expressing this canonical value (JSON array)"
                },
                {
                    name: "metadata",
                    type: "String",
                    info: "Optional: Metadata you want to attach to this value, will be sent back in runtime."
                },
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"removeEntityValue",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "Required: ID or name of the entity."
                },
                {
                    name: "entityValue",
                    type: "String",
                    info: "Required: Canonical value of the entity"
                },
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"createEntityExpression",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "Required: ID or name of the entity."
                },
                {
                    name: "entityValue",
                    type: "String",
                    info: "Required: Canonical value of the entity"
                },
                {
                    name: "expression",
                    type: "String",
                    info: "Required: New expression for the canonical value of the entity. Must be shorter than 256 characters."
                },
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
        {
            "name":"removeExpression",
            "args":[
                {
                    name: "accessToken",
                    type: "credentials",
                    info: "Required: The api key obtained from wit.ai.",
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "Required: ID or name of the entity."
                },
                {
                    name: "entityValue",
                    type: "String",
                    info: "Required: Canonical value of the entity"
                },
                {
                    name: "expressionValue",
                    type: "String",
                    info: "Required: Expression value to delete."
                },
            ],
            'callbacks':[
                {
                    'name':'error',
                    'info': 'Error'
                },
                {
                    'name':'success',
                    'info': 'Success'
                }
            ]
        },
    ]})
};
