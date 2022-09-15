# es lint config

1. create file in root `jsconfig.json` - no more warnings

```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "node16",
        "explainFiles": true
    },
    "exclude": ["node_modules"]
}
```

2. regex patterns helper [here](https://regexr.com/), docs [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
