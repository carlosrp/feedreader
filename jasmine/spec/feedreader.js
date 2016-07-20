/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all feeds have a valid URL', function() {
          allFeeds.forEach( function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all feeds have a valid name', function() {
           allFeeds.forEach( function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });

    /*
     * Test suite for application menu
     */
    describe('The menu', function() {
      /* Ensure the menu element is hidden by default.
       */
      it('hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

      /**
       * Ensure tht when clicking menu once it becomes visible;
       * one second click, menu becomes unvisible.
       */
      it('visible when clicked once, not visible when clicked again', function(done) {
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(true);
        done();
      });

    });

    /**
     * Test suite to check that feeds load
     */
    describe('Initial Entries', function() {
      /* Ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
       beforeEach(function(done) {
         loadFeed(0, done);
       });

       it('at least one entry in feed', function() {
         expect($('.feed .entry').length).toBeGreaterThan(0);
       });

    });

    /**
     * Test suite to validate that loading feeds change contents
     */
    describe('New Feed Selection', function() {
      var prevEntry;

      /*
       * Only first time, load first feed (asyncronous)
       */
      beforeAll(function(done) {
        loadFeed(0, done);
      });

      /*
       * For each feed (starting from second), charge feed and cehck contents
       */
      beforeEach(function(done) {
        prevEntry = $('.feed').html();
        loadFeed(1, done);
      });

      /**
       * Validate that when loading a feed, contents change
       */
      it('New feed data is loaded', function() {
        expect($('.feed').html()).not.toBe(prevEntry);
      });

    });

}());
