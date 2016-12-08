module.exports.do = function(req, res){
    /* When sending GET request to api/Twitter, return the metadata of the package */
    res.status(200).send({
        'package': 'WitAI',
        "tagline": "Wit.ai API Package",
        "keywords": ["AI", "API", "artificial", "bot", "bots", "chatbot", "cognitive", "intelligence", "language", "neuro", "nlp", "processing"],
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "text",
                    type: "String",
                    info: "User’s query. Length must be > 0 and < 256",
                    required: true
                },
                {
                    name: "textId",
                    type: "String",
                    info: "Optional: A specific Id you want to assign to the message that will be processed. If not set, Wit.ai will auto generate one for you",
                    required: false
                },
                {
                    name: "threadId",
                    type: "String",
                    info: "Optional: A specific Id that will let you group requests per conversation",
                    required: false
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "data",
                    type: "String",
                    info: "Link to `wav` or `mpeg3` or `ulaw` or `raw` audio file.",
                    required: true
                },
                {
                    name: "textId",
                    type: "String",
                    info: "Optional: A specific Id you want to assign to the message that will be processed. If not set, Wit.ai will auto generate one for you",
                    required: false
                },
                {
                    name: "threadId",
                    type: "String",
                    info: "Optional: A specific Id that will let you group requests per conversation",
                    required: false
                },
                {
                    name: "outcomesNumber",
                    type: "String",
                    info: "Optional: The number of n-best outcomes you want to get back. default is 1",
                    required: false
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "sessionId",
                    type: "String",
                    info: "The session_id is a unique ID you generate on your side to group messages from the same user request/conversation. When you start a new conversation, you should generate a new one. You should generate a new one, even when the user is the same.",
                    required: true
                },
                {
                    name: "text",
                    type: "String",
                    info: "Optional: A message from the user. Length must be > 0 and < 256. This should only be set at the first call until you get type=”stop”",
                    required: false
                },
                {
                    name: "context",
                    type: "JSON",
                    info: "Optional: The object representing the session state. You can pass the context either as a URL param or in the body of your POST.",
                    required: false
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
                    info: "The api key obtained from wit.ai.",
                    required: true
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "id",
                    type: "String",
                    info: "ID or name of the requested entity",
                    required: true
                },
                {
                    name: "description",
                    type: "String",
                    info: "Optional: Short sentence describing this entity",
                    required: false
                },
                {
                    name: "values",
                    type: "JSON",
                    info: "Optional: Array of JSON objects. Possible values for this entity",
                    required: false
                },
                {
                    name: "lookups",
                    type: "JSON",
                    info: "Optional: JSON array of strings. Currently only supporting “trait” or “keywords” Search Strategy. If not provided, it will default to “keywords”.Traits are only available for new Bot Engine apps",
                    required: false
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "ID or name of the entity.",
                    required: true
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "ID or name of the entity.",
                    required: true
                },
                {
                    name: "id",
                    type: "String",
                    info: "Optional: New ID or name of the entity",
                    required: false
                },
                {
                    name: "description",
                    type: "String",
                    info: "Optional: Short sentence describing this entity",
                    required: false
                },
                {
                    name: "values",
                    type: "JSON",
                    info: "Optional: Array of JSON objects. Possible values for this entity",
                    required: false
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "ID or name of the entity.",
                    required: true
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "ID or name of the entity.",
                    required: true
                },
                {
                    name: "value",
                    type: "String",
                    info: "Canonical value of the entity",
                    required: true
                },
                {
                    name: "expressions",
                    type: "JSON",
                    info: "Optional: Ways of expressing this canonical value (JSON array)",
                    required: false
                },
                {
                    name: "metadata",
                    type: "String",
                    info: "Optional: Metadata you want to attach to this value, will be sent back in runtime.",
                    required: false
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "ID or name of the entity.",
                    required: true
                },
                {
                    name: "entityValue",
                    type: "String",
                    info: "Canonical value of the entity",
                    required: true
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "ID or name of the entity.",
                    required: true
                },
                {
                    name: "entityValue",
                    type: "String",
                    info: "Canonical value of the entity",
                    required: true
                },
                {
                    name: "expression",
                    type: "String",
                    info: "New expression for the canonical value of the entity. Must be shorter than 256 characters.",
                    required: true
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
                    info: "The api key obtained from wit.ai.",
                    required: true
                },
                {
                    name: "entityId",
                    type: "String",
                    info: "ID or name of the entity.",
                    required: true
                },
                {
                    name: "entityValue",
                    type: "String",
                    info: "Canonical value of the entity",
                    required: true
                },
                {
                    name: "expressionValue",
                    type: "String",
                    info: "Expression value to delete.",
                    required: true
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
