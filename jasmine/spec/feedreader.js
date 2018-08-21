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
    describe('RSS Feeds', function() {      //This suite is all about the RSS feeds definitions, the allFeeds variable in our application.
       
        it('are defined', function() {      // to make sure that the  allFeeds variable has been defined 
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);  // allFeeds variable not empty
        });

        it('urls are defined', function(){
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();     //feed has a URL
                expect(feed.url.length).not.toBe(0);    //feed url not empty
            };
        });

        it('names are defined', function(){
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();   //feed has name
                expect(feed.name.length).not.toBe(0);  //feeds name is not empty
            };
        });
    });

    describe('The Menu', function(){

        it('menu is hidden', function(){
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);   //menu is hidden by default
        });

        it('toggles on and off', function(){
            const body = document.querySelector('body');
            const menu = document.querySelector('a.menu-icon-link');

            menu.click(); //show menu
            expect(body.classList.contains('menu-hidden')).toBe(false); 
            menu.click(); //hide menu
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function (){
        beforeEach(function(done){           // beforeEach allows for use of asynchronous loadFeed()
            loadFeed(0, function (){
                done();
            });
        });    

         it('feed has at least 1 entry', function() {       // tests that there is at least one entry in feed.
            const entryNumber = $('.entry').length;
            expect(entryNumber).toBeGreaterThan(0);
         });   
    }); 
 
    describe('New Feed Selection', function(){
        let defaultFeed, updatedFeed;

        beforeEach(function (done) {
            loadFeed(0, function () {
                defaultFeed = $('.feed').html();  
    
            loadFeed(1, function () {
                updatedFeed = $('.feed').html(); 
                done();
                });
            });
        });
    
        it('loads a new feed, content changed', function () {
            expect(updatedFeed).not.toBe(defaultFeed);    // checks if the variables are different. if yes - the content changed
        });
    });
}());
