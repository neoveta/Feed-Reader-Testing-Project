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
            }
        });

        it('names are defined', function(){
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();   //feed has name
                expect(feed.name.length).not.toBe(0);  //feeds name is not empty
            }
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
        beforeEach(function(done){
            loadFeed(0, done);
        });    
        it('work completes', function(){
            const feed = document.querySelector('.feed');
            expect(feed.children.length > 0).toBe(true);
        });
    });
 
    describe('New Feed Selection', function(){
        const feed = document.querySelector('.feed');
        const feedFirst = [];       //storing the first feed content into array

        beforeEach(function(done){
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry){  //loop throught each feed's children element
                feedFirst.push(entry.innerText);  
            });
            loadFeed(1,done);
        }); 
        it('content changes', function(){
            Array.from(feed.children).forEach(function(entry, index){ 
                expect(entry.innerText === feedFirst[index]).toBe(false);

            });   
        }); 
    });

}());
