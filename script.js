
// url variables





// variables to be set by the API

var UrlTeamID;
var teamName;
var teamNameQuery;
var teamID;
var videoURL;
var futureGameTitle;
var futureGameTitleAPI;


// variables for HTML elements

var videoContainer = $("#video-container");
var mainGameCard = $("#mainCard .uk-card-body");
var asidePastGameCard = $("#aside #lastGame");
var asideUpcomingGameCard = $("#aside #upcomingGame");
// var socials = ["strFacebook", "strTwitter", "strInstagram"];


// on click of the search button, pull the value typed by the user from the search field. take the value and replace any spaces within it with underlines,
  // then feed it to the first api's team name query and pull the team id from the result

$("#searchBtn").click(function(event) {

    event.preventDefault();

    teamName = $("#searchField").val();
    teamNameQuery = teamName.replace(' ', '_');

    // url that will use the team name typed in the search box to find the associated team info, and pull the team id for use in other data

    var UrlTeamName = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + teamNameQuery;

    $.ajax({
        url: UrlTeamName,
        method: "GET"
      }).then(function(response) {
        teamID = response.teams[0].idTeam;

        teamLeagueAPI = response.teams[0].strLeague;
        teamLeague = $("<h4>").text(teamLeagueAPI);
        mainGameCard.prepend(teamLeague);

        teamTitleAPI = response.teams[0].strTeam;
        teamTitle = $("<h1>").text(teamTitleAPI);
        mainGameCard.prepend(teamTitle);

        console.log(response.teams[0].strFacebook);

        if (response.teams[0].strFacebook == "") {
          $("#social-0").css("display", "none");
        }
        
        else {
          var facebookUrl = response.teams[0].strFacebook;
          $("#social-0").attr("href", "https://" + facebookUrl);
        }

        if (response.teams[0].strTwitter == "") {
          console.log(response.teams[0].strTwitter);
          $("#social-1").css("display", "none");
        }
        
        else {
          var twitterUrl = response.teams[0].strTwitter;
          console.log(twitterUrl);
          $("#social-1").attr("href", "https://" + twitterUrl);
        }
        
        if (response.teams[0].strInstagram == "") {
          $("#social-2").css("display", "none");
        }
        
        else {
          var instagramUrl = response.teams[0].strInstagram;
          console.log(instagramUrl);
          $("#social-2").attr("href", "https://" + instagramUrl);
        }



        pullTeamData();
      });
});

// using the team id pulled from the search button onclick function, pull from second link to get the other team stats/information 
  //needed to display on the page

function pullTeamData() {

  // url utilizing team id that will pull info for the team's next five games
  var UrlTeamIDnext5 = "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + teamID;

    $.ajax({
        url: UrlTeamIDnext5,
        method: "GET"
      }).then(function(response) {
          // pulling the first response in the array, the next upcoming game. can convert to a for loop later if we want more future
          // games than just the next one -- 

          futureGameTitle = $("<h4>");
          futureGameTitleAPI = response.events[0].strEvent;
          futureGameTitle.text(futureGameTitleAPI);
          asideUpcomingGameCard.append(futureGameTitle);

      });

    // url utilizing team id that will pull info for the team's last five games
    var UrlTeamIDlast5 = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + teamID;


      $.ajax({
        url: UrlTeamIDlast5,
        method: "GET"
      }).then(function(response) {
          // pulling the first response in the array, the most recent past game. can convert to a for loop later if we want more
              // game history than just the most recently completed

          var pastGameTitle = $("<h4>");
          var pastGameTitleAPI = response.results[0].strEvent;
          pastGameTitle.text(pastGameTitleAPI);
          asidePastGameCard.append(pastGameTitle);

          // display team + score from last game -- set up to append to the outer div but could convert to targeting
            // a specific id in the dom and changing the text later, if need be

          var pastHScore = $("<p>");
          var pastHTeamAPI = response.results[0].strHomeTeam;
          var pastHScoreAPI = response.results[0].intHomeScore;

          pastHScore.text(pastHTeamAPI + ": " + pastHScoreAPI);

          var pastAScore = $("<p>");
          var pastATeamAPI = response.results[0].strAwayTeam;
          var pastAScoreAPI = response.results[0].intAwayScore;

          pastAScore.text(pastATeamAPI + ": " + pastAScoreAPI);

          asidePastGameCard.append(pastHScore);
          asidePastGameCard.append(pastAScore);
          
      });
      getVideos();

      
}


// search the video api for the correct league, and pull the embed content attached to that object and append it to the page
  // find a way to break out of this function after appending a set number of videos

function getVideos() {
  $.ajax({
    url: "https://www.scorebat.com/video-api/v1/",
    method: "GET"
  }).then(function(response) {

    for (i=0; i < response.length; i++) {

      // if (response[i].competition.name == "ENGLAND: Premier League") {
      //   video = response[i].videos[0].embed;
      //   $("#video-container").append(video);
      //   // for (currentVid=0; i < response[i].videos.length; currentVid++) {
      //   //   video = response[i].videos[currentVid];
      //   //   videoContainer.append(video);
      //   // }
      // }

      if (response[i].competition.name == "ENGLAND: Premier League") {
          video = response[i].embed;
          $("#video-container").append(video);
          // for (currentVid=0; i < response[i].videos.length; currentVid++) {
          //   video = response[i].videos[currentVid];
          //   videoContainer.append(video);
          // }
        }
    }

    $("#video-container").css({"width": "40%", "margin": "0px auto"});
  });

  
  console.log("did you make it to the end of the code?");
}


// if the page is set up to hide search bar / display team info using display/display none, will need an open team page function (psuedo page change)
  // if we are physically linking to a second html document for the other page, will likely not need this function

// function openTeamPage() {

// }




