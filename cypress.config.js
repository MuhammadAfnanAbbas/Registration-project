const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 12000,
  chromeWebSecurity: false, // Add this line to disable chromeWebSecurity
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    testIsolation: false,
    experimentalOriginDependencies: true,
    
  },
});