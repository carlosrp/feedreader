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

       /* Ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
      function menuClick(done) {
        $('.menu-icon-link').trigger('click');
        setTimeout(function() {
          done();
        }, 1000);
      }

      /**
       * Ensure tht when clicking menu once it becomes visible;
       * one second click, menu becomes unvisible.
       */
      it('visible when clicked once, not visible when clicked again', function(done) {
        menuClick(done);
        expect($('body').hasClass('menu-hidden')).toBe(false);
        menuClick(done);
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

       it('at least one entry in feed', function(done) {
         expect($('.feed .entry')).toBeDefined();
         done();
       });

    });

    /**
     * Test suite to validate that loading feeds change contents
     */
    describe('New Feed Selection', function() {
      var prevEntry;
      var idFeed = 0;

      /*
       * Only first time, load first feed (asyncronous)
       */
      beforeAll(function(done) {
        loadFeed(idFeed, done);
        idFeed += 1;
      });

      /*
       * For each feed (starting from second), charge feed and cehck contents
       */
      beforeEach(function(done) {
        prevEntry = $('.feed .entry-link:first-child h2').text();
        console.log('Before:', prevEntry);
        loadFeed(idFeed, done);
        idFeed += 1;
      });

      /**
       * Loop over all feeds, starting from second and validate that contents
       * change it time
       */
      for(id=1; id<allFeeds.length; id++) {
        it('New feed data is loaded - ' + allFeeds[id].name, function(done) {
          console.log('After:', $('.feed .entry-link:first-child h2').text());
          expect($('.feed .entry-link:first-child h2').text()).not.toBe(prevEntry);
          done();
        });
      }
    });

}());
