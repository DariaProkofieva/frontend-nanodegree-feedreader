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
        /* This test checks that the allFeeds variable has been
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test checks that each feed in the allFeeds
         * object has a URL defined and that URL is not empty.
         */
         it('have URLs that are defined', function() {
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });
         /* This test checks that each feed in the allFeeds
          * object has a name defined and that name is not empty.
          */
         it('have names that are defined', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });

    describe('The menu', function() {
         /* This test checks that the menu element is
          *  hidden by default.
          */
          it('is hidden by default', function() {
           let hiddenMenu=document.body.classList.contains('menu-hidden');
           expect(hiddenMenu).toBe(true);
         });
         /* This test checks that the menu changes
          * visibility when the menu icon is clicked.
          */
          it('displays when clicked and hide when clicked again', function() {
            //First click
            $('.menu-icon-link').trigger('click');
              expect(document.body.classList.contains('menu-hidden')).toBe(false);
            //Second click
            $('.menu-icon-link').trigger('click');
              expect(document.body.classList.contains('menu-hidden')).toBe(true);
          });
    });

    describe('Initial Entries', function() {
        /* This test checks that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
           loadFeed(0, function(){
             done();
           });
         });
         it('are loading', function() {
           const entryFeed = $('.feed .entry').length;
           expect(entryFeed).toBeGreaterThan(0);
         });
    });

     describe('New Feed Selection', function() {
        /* This test checks that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let initialFeed,
             finalFeed;
         beforeEach(function(done) {
           loadFeed(0, function(){
             initialFeed = $('.feed').text();
               loadFeed(1, function(){
                 finalFeed = $('.feed').text();
                 done();
               });
           });
         });
         it('content changes when a new feed is loaded', function(done) {
           expect(initialFeed).not.toEqual(finalFeed);
           done();
         });
    });
}());
