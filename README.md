# Not Your Father's Football

This is web application is a group project built by [Laura Baumann](https://github.com/thelbaumann), [Jose Caldron III](https://github.com/CalderonJG), and [Darryl Subal](https://github.com/Dale2k). This application is not only meant to demonstrate our use of GitHub as a group, with features such as branching, pull requests, code mergining, and kanban boards, but also demonstrate our ability to pull from. multiple API sources in a single applications. The visualization of our page is set through standard HTML5, utilization of UIKit, standard CSS3, as well as Google Fonts. The functionality of this page is powered by jQuery, Moment.js, and a lot of ajax calls. We were given the task of creating an application that solves a real-world problem. Our applications solves providing information to people who follow European Soccer and its leagues. This project is currently deployed and can be viewed at [loremIpsum](https://thelbaumann.github.io/weatherDashboard/).

## About The Project

This project allows you to search for or select a Europen soccer team. Upon selection of a team, information is provided for that team provided by several links 
from the [TheSportsDB.com API](www.thesportsdb.com). We pulled the teams, leagues, and their badges for the visual nav from these API's search url's. In addition, we pulled all general team data including name, league, location, stadium data, description, badge, last game, and the next game. The following part of the page is a feed of the most recent soccer highlights, which we pulled from a second API on [Scorebat.com](www.scorebat.com/video-api/).

### Project Concept

Our original concept had the following description, user story, elevator pitch, and wireframes:

Description

```
A web application that uses the UIKit CSS framework, with data from the www.thesportsdb.com API, to allow you to search for or click on teams from top soccer leagues to view their general data, social medias, history of the last game, and information about next upcoming game (opponent, date/time). When generating a team page, it also delivers soccer highlight videos from www.scorebat.com/video-api/ API below that data. 
```

User Story

```
As someone who follows European soccer, I want a web application that gives me match statistics and highlights from the league, so that I can keep up with my favorite teams and their games. 
```

Elevator Pitch

```
Soccer is a worldwide sport with a large following and highlight videos are a great vehicle to pull in more fans.  Using 2 different API’s, from both Scorebat.com and TheSportsDB.com, we search European soccer leagues to provide general team information, videos, recent and upcoming games.
```

Wireframes

![Wireframe #1](https://github.com/CalderonJG/Not-Your-Father-s-Football/blob/Dev/images/wireframe_1.png)

![Wireframe #2](https://github.com/CalderonJG/Not-Your-Father-s-Football/blob/Dev/images/wireframe_2.png)

Our full original proposal can be viewed [here](https://docs.google.com/document/d/1UEDNM471lJhHJ9VUO9PGjbSn64e6zJEVCpQrEecVWjE/edit?usp=sharing)

## Walkthrough

### First Look - Searching and League Selection
![opening page of web application](https://github.com/CalderonJG/Not-Your-Father-s-Football/blob/Dev/images/screen_1.png)

When you first open the webpage, you are presented with the site logo, which will refresh the page upon clicking, a search bar, and names/badges of the top 6 leagues. The user has the opportunity to search for a specific team in the search bar, or search through the teams in a certain league by selecting a league. The search bar can be used by typing a team and either pressing enter or clicking on the magnifying glass icon. On page load, a function is called to pull the first six leagues from a source of top leagues in the SportsDB API. It appends these six leagues to divs containing links, and styles them based on appended classes. The team league id is pulled from this first call and appeneded as an attribute on the links. Then, on completion of this ajax call, a second call is used, which loops through each league, pulls it's id that was appened to the link during the first call, and puts that id into a new ajax call. This new call pulls the badge image of each league and appends it to the associated div/label. 


### Using the Visual League Navigation

![using visual nav of web application](https://github.com/CalderonJG/Not-Your-Father-s-Football/blob/Dev/images/screen_2.png)

If the user chooses to use the visual navigation, upon selection of a league, an ajax call runs that is very similar to the one used to originally append the leagues to the page. This call pulls the teams within that league/their associated badges, append them with their team id's to use in future ajax calls, and appending them to the list at the top. Upon selecting a specific league, a button is also appeneded allowing the user to navigate out of a league back to the league choices at any time.  Whether or not the team is selected or searched, these actions both trigger the same on-click event that begins by determining whether or not the input is coming from the search bar or the selection of a team from a league in the visual navigation. Based on this, the input is formatted in a way that can be inserted into the url of the first ajax call to pull team information. 


### Selecting a Team

![team displayed on web application](https://github.com/CalderonJG/Not-Your-Father-s-Football/blob/Dev/images/screen_3.png)

As mentioned above, the same function is called by both selecting or searching a team. Once this function is triggered, it determines the source of the input and formats it accordingly to be inserted into the url of the first ajax call. Then, the cards and html wrappers used to display the team information are displayed onto the page (originally hidden by the css until this function is called), and the first ajax call begins to run. This first call appends the team name to the end of the url, and pulls generael information such as team name, league name, description, stadium name, stadium/badge photos, etc. One of these things it pulls for the page is social links: website, facebook, twitter, and instagram. It runs a series of if/else statements to determine if the team selected has these social networks. If so, it will link the website to the team name of the main card, or leave it as a regular H1 if the team does not have a website. In the same way, social networking icons are hidden/linked based on whether or not it found that information for the selected team in the API. This call also formats the description to only display the first 300 characters, with the users ability to expand it it they choose to. All of this data pulled is displayed on page, with the exception of the team id. The team id is then passed into the url of the next ajax call. This next call pulls future/past game information to insert into the sidebar. It displays the last played game and the scores, and styles this information based on who won. It also displays the next upcoming game, opponents, and the time at which it will begin.


### Selecting a Team -- Extended (Second API integration)
![user history for city selection](https://github.com/CalderonJG/Not-Your-Father-s-Football/blob/Dev/images/screen_3.5.png)

Underneath the team information listed previously, is where the integration of the second API begins. This begins a feed of embed video highlights from [Scorebat.com](www.scorebat.com/video-api/) which pulls highlights from the most recent worldwide soccer higlights. These embed video highlights are interactive with scores, teams, and more, though our implementation of this api only pulled (not created) the embed code from the API's object. Using a ajax call, we called the scorebat API url and called a set number of videos to append to the page with our preferred styling. Originally, we intended to append highlights that aligned with the league of the team the user selected. However, becuase the two API's are set up so differently, there is no way to directly correlate the way a league is named in one API versus another, and also the leagues within these API's differ greatly. Still, the videos are relevant and we believe add a lot of visual value to the page.


### Error Messages for the User
![web application errors](https://github.com/CalderonJG/Not-Your-Father-s-Football/blob/Dev/images/error.png)

There is only one user-facing error message set for the page, which is triggered if the user attempts to search a blank search bar value. This is only relevant on the first load of the page. If a team has already been selected and the user attemps a submit of a blank search bar then, it will only reload the current team page. This error-checking works on a series of if/else statements that checks for a blank search field, and if is blank, checks for a blank "teamQuery" variable. This variable is given a placeholder (until it is reassigned with the actual url query of the team later in the ajax call) immediately upon clicking a team's bags/name in the visual navigation. In this way, we are able to differentiate between an error or the search bar being blank due to a visual navigation selection.

## Installing/Dependencies
No prerequisites or browser modifications are needed to run the page online here.
If you wish to clone the project,

git@github.com:CalderonJG/Not-Your-Father-s-Football.git

## Credits

We used several resources to complete this project. 

We used this [StackOverflow Thread](https://stackoverflow.com/questions/12055462/handle-click-event-for-appended-elements-in-jquery) to help us in setting a click event for an element that only existed after appending it to the page in an earlier function.

Next, we used [another StackOverflow Thread](https://stackoverflow.com/questions/10089447/jquery-ajax-request-inside-ajax-request) to help with setting ajax calls to run in a very specific synchronous order (by adding success and complete methods to the call).

After that, we consoluted [jQuery.each() documentation](https://api.jquery.com/jquery.each/) to help us with looping through html elements and applying a function to each of them along the way.

Lastly, we used the documentation on [UIkit's website](https://getuikit.com/) to help us with impleting this framework to style the elements on our page.


## Authors
[Laura Baumann](https://github.com/thelbaumann)
[Jose Caldron III](https://github.com/CalderonJG)
[Darryl Subal](https://github.com/Dale2k)

## License
This project is licensed under [MIT](LICENSE) - 2020 Laura Baumann, Jose Caldron III, Darryl Subal
