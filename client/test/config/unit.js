module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../..',

        // frameworks to use
        frameworks: ['jasmine'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-jasmine'
        ],

        // list of files / patterns to load in the browser
        files: [
            'vendor/jquery/jquery.js',
            'vendor/angular/angular.js',
            'vendor/angular/angular-sanitize.js',
            'vendor/angular/angular-resource.js',
            'vendor/angular/angular-animate.js',
            'vendor/angular-growl-2/angular-growl.js',
            'test/vendor/angular/angular-mocks.js',
            'vendor/angular-ui/**/*.js',
            'src/**/*.js',
            'test/unit/**/*.spec.js',
            'dist/templates/**/*.js'
        ],

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots' || 'progress'
        reporters: 'progress',

        // these are default values, just to show available options

        // web server port
        port: 8089,

        // cli runner port
        runnerPort: 9109,

        urlRoot: '/__test/',

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // polling interval in ms (ignored on OS that support inotify)
        autoWatchInterval: 0,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari
        // - PhantomJS
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,
    });
};
