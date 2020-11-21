
// url variables

  // url that will use the team name typed in the search box to find the associated team info, and pull the team id for use in other data
var UrlTeamName = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + teamNameQuery;
  // url utilizing team id that will pull info for the team's next five games
var UrlTeamIDnext5 = "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + teamID;
  // url utilizing team id that will pull info for the team's last five games
var UrlTeamIDlast5 = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + teamID;

// variables to be set by the API

var UrlTeamID;
var teamName;
var teamNameQuery;
var teamID;
var videoURL;


// variables for HTML elements

var videoContainer = $("#videoContainer");
var mainGameCard = $("#mainCard");
var asidePastGameCard = $("#aside");



// on click of the search button, pull the value typed by the user from the search field. take the value and replace any spaces within it with underlines,
  // then feed it to the first api's team name query and pull the team id from the result

$(".searchBtn").click(function() {
    teamName = $(".searchField").val();
    teamNameQuery = teamName.replace(' ', '_');
    // function call not necessary if we are physically linking to another html file for the second page
    openTeamPage();

    console.log(teamNameQuery);

    $.ajax({
        url: UrlTeamName,
        method: "GET"
      }).then(function(response) {
        teamID = response.teams.idTeam;
        console.log(teamID);
        pullTeamData();
      });
});

// using the team id pulled from the search button onclick function, pull from second link to get the other team stats/information 
  //needed to display on the page

function pullTeamData() {
    $.ajax({
        url: UrlTeamIDnext5,
        method: "GET"
      }).then(function(response) {
          // pulling the first response in the array, the next upcoming game. can convert to a for loop later if we want more future
            // games than just the next one -- 

          var futureGameTitle = $("<h2>");
          var futureGameTitleAPI = response[0].strEvent;
          futureGameTitle.text(futureGameTitleAPI);
          mainGameCard.append(futureGameTitle);

      });

      $.ajax({
        url: UrlTeamIDlast5,
        method: "GET"
      }).then(function(response) {
          // pulling the first response in the array, the most recent past game. can convert to a for loop later if we want more
              // game history than just the most recently completed

          var pastGameTitle = $("<h2>");
          var pastGameTitleAPI = response[0].strEvent;
          pastGameTitle.text(pastGameTitleAPI);
          asidePastGameCard.append(pastGameTitle);

          // display team + score from last game -- set up to append to the outer div but could convert to targeting
            // a specific id in the dom and changing the text later, if need be

          var pastHScore = $("<p>");
          var pastHTeamAPI = response[0].strHomeTeam;
          var pastHScoreAPI = response[0].intHomeScore;

          pastHScore.text(pastHTeamAPI + ": " + pastHScoreAPI);

          var pastAScore = $("<p>");
          var pastATeamAPI = response[0].strAwayTeam;
          var pastAScoreAPI = response[0].intAwayScore;

          pastAScore.text(pastATeamAPI + ": " + pastAScoreAPI);

          asidePastGameCard.append(pastHScore);
          asidePastGameCard.append(pastAScore);

          
      });
}


// search the video api for the correct league, and pull the embed content attached to that object and append it to the page
  // find a way to break out of this function after appending a set number of videos

function getVideos() {
  $.ajax({
    url: "https://www.scorebat.com/video-api/v1/",
    method: "GET"
  }).then(function(response) {
    for (i=0; i < response.length; i++) {
      if (response.competition.name == "ENGLAND: Premier League") {
        for (currentVid=0; i < response[i].videos.length; currentVid++) {
          video = response[i].videos[currentVid];
          videoContainer.append(video);
        }
      }
    }
  });
}


// if the page is set up to hide search bar / display team info using display/display none, will need an open team page function (psuedo page change)
  // if we are physically linking to a second html document for the other page, will likely not need this function

// function openTeamPage() {

// }




