**<h1>Overview</h1>**
This responsive application allows users to search for News information based on the value selected from toggle(Guardian or New york Time). Detail description is provided using an interactive UI using React Bootstrap cards. On clicking individual card, user is redirected to detail article, where user can bookmark, share and comment on the article. Also, user can search for any news from the top search bar and the result will be in form of cards again. In the bookmarks tab all the favourites can be seen and deleted if needed.
Link: http://shashankreact1.s3-website-us-east-1.amazonaws.com/

**<h1>Technolgies Used</h1>**
Node.js, Express, React, AJAX, JSON, APIs, HTML5, CSS, Amazon Web Services.

**<h1>APIs Used</h1>**
Bing AutoSuggest API, Guardian API, New york Time Api, Twitter API, Comment Box API

**<h1>Features</h1>**
1) Autocomplete is implemented using Bing Auto Suggest API.
2) In case the user want to share the Card he can use share button present on every card which calls Twitter, Facebook, Email API with a custom message, which users can write before sharing.
3) There are sections like World,Politics,Business,Technology,Sports for Guardian and New york Times.
4) Toggle at top right screen to choose between New york Times and Guardian.
4) React Bootstrap is used to make the website responsive and mobile friendly.
5) Every article can be bookmarked when it's viewed from detail article page. Also comments can be made at the bottom of each article.
6) There are lot of animations like loading, adding and removing from favorites which were taken care of.
7) Error Handling for edge cases has been implemented
8) Users can store favorite articles which are accessible at all times even after the website is closed. This is done using Local Storage. They can append, delete from Favorites.
