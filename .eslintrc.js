module.exports = {
    "env": {
        "browser": true
    },
    "extends": ["eslint:recommended", "plugin:angular/johnpapa"],
    "rules": {
        "eqeqeq": [
            "error",
            "always"
        ],
        "no-magic-numbers": "error",
        "no-multi-spaces": "error",
        "strict": [
            "error",
            "global"
        ],
        "brace-style": [
            "error",
            "stroustrup"
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "computed-property-spacing": [
            "error",
            "never"
        ],
        "max-depth": [
            "error",
            3
        ],
        "multiline-ternary": [
            "error",
            "always"
        ],
        "no-multiple-empty-lines": [
            "error",
            {
              "max": 1,
              "maxEOF": 1,
              "maxBOF": 0
            }
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-trailing-spaces": 2
    },
    "globals": {
        "angular": false,
        "describe": false,
        "beforeEach": false,
        "afterEach": false,
        "it": false,
        "inject": false,
        "expect": false,
        "module": false,
        "jasmine": false,
        "ga": false,
        "require": false,
        "spyOn": false,
        "fail": false
    }
};