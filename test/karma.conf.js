module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',
        urlRoot: '/',
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'node_modules/**/*.js', included: false},
            {pattern: 'node_modules/sinon/pkg/sinon*.js', included: true},
            {pattern: 'src/ApplicationFactory.js', included: false},
            {pattern: 'src/main.js', included: false},
            {pattern: 'src/cmvp/**/*.js', included: false},
            {pattern: 'src/test-helpers/**/*.js', included: false},
            {pattern: 'test/src/**/*.js', included: false},

        /** Load Tests **/
            'test/main.js'
        ],
        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots', 'progress', 'junit', 'teamcity'
        // CLI --reporters progress
        reporters: ['progress', 'junit', 'coverage'],

        junitReporter: {
            outputFile: 'reports/test-results.xml',
            suite: ''
        },

        preprocessors: {
            'src/cmvp/**/*.js': 'coverage'
        },

        coverageReporter: {
            type: 'lcovonly',
            dir: 'reports/',
            file: 'lconv.info'
        },


        port: 9876,

        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        autoWatch: true,

        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
        browsers: ['PhantomJS'],

        captureTimeout: 10000,

        singleRun: false,

        // report which specs are slower than 10ms
        // CLI --report-slower-than 500
        reportSlowerThan: 10
    })
};
