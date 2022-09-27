# es/js lint config

> maybe this shouldn't be versioned and tracked, but it's a learning exercise

1. create file in root `jsconfig.json` - no more warnings

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "Node16",
        "explainFiles": true
    },
    "exclude": ["node_modules"],
    "typingOptions": {
        "enableAutoDiscovery": true
    }
}
```

2. regex patterns helper [here](https://regexr.com/), docs [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
