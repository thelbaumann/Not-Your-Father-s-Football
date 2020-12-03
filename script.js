// variables to be set by the API

var UrlTeamName = "";
var UrlTeamID = "";
var teamName = "";
var teamNameQuery = "";
var teamID = "";
var videoURL = "";
var futureGameTitle = "";
var futureGameTitleAPI = "";


// variables for HTML elements

var videoContainer = $("#video-container .appended-data");
var mainGameCard = $("#mainCard .uk-card-body .appended-data");
var asidePastGameCard = $("#aside #lastGame .appended-data");
var asideUpcomingGameCard = $("#aside #upcomingGame .appended-data");
var teamList = $("#teamList");


// on click of the search button, pull the value typed by the user from the search field. take the value and replace any spaces within it with underlines,
  // then feed it to the first api's team name query and pull the team id from the result

  $( document ).ready(function() {

    prepareSoccerLeagues();
    
  });

function prepareSoccerLeagues() {

  teamList.html("");

  $.ajax({
    url: "https://www.thesportsdb.com/api/v1/json/1/all_leagues.php",
    method: "GET",
    success: function(response) {

      $("#leagueTeamHeader").text("Search for a team above or browse the teams in a league!");

      for (i=0; i < 7; i++) {
        var leagueLink = $("<div class=\"leagueSelectWrapper\"><a class=\"selectNewLeague\"" + "league_id=\"" + response.leagues[i].idLeague + "\"><p>" + response.leagues[i].strLeague + "</p></a></div>")
        teamList.append(leagueLink);

        leagueLink.css("width", "auto");
        // leagueLink.find("img").css({"width": "65px", "height": "65px", "display": "block", "margin": "0px auto"});
        leagueLink.find("p").css("text-align", "center");
        $(".leagueSelectWrapper").css({"width": "200px", "height": "200px", "display": "flex", "flex-direction": "column", "justify-content": "center", "padding": "5px"});
      }
    },
    complete: function(data) {
      getLeagueBadges();
    }
  });

}

function getLeagueBadges() {

  $("#teamList .leagueSelectWrapper a").each(function() {

    var leagueWrapper = $(this);

    var leagueID = $(this).attr('league_id');
   

    $.ajax({
      url: "https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=" + leagueID,
      method: "GET"
    }).then(function(response) {

      var leagueBadge = $("<img src=\"" + response.leagues[0].strBadge + "\" alt=\"" + response.leagues[0].strLeague + "\">");
      leagueWrapper.prepend(leagueBadge);
      leagueBadge.css({"width": "50%", "height": "auto", "display": "block", "margin": "0px auto", "padding-bottom": "1em"});
    });

  });

}



$("#searchBtn").click(function(event) {

    $(".appended-data").empty();

    event.preventDefault();

    if ($("#searchField").val() == "") {
      if (teamNameQuery == "") {
        alert("Please enter a team into the search bar or select one from the leagues to continue!");
      }
      else{
        teamNameQuery = teamName.replace(' ', '_');
      }
    }

    else {
      teamName = $("#searchField").val();
      teamNameQuery = teamName.replace(' ', '_');
      $("#searchField").val("");
    }

    $("#team-searched").css("display", "block");
    $("#social-0").css("display", "block");
    $("#social-1").css("display", "block");
    $("#social-2").css("display", "block");

    // url that will use the team name typed in the search box to find the associated team info, and pull the team id for use in other data

    UrlTeamName = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + teamNameQuery;

    $.ajax({
        url: UrlTeamName,
        method: "GET"
      }).then(function(response) {
        teamID = response.teams[0].idTeam;

        teamDescripAPI = $("<p>").text(response.teams[0].strDescriptionEN).addClass("teamDescription");

       if (teamDescripAPI.text().length > 300) {
            teamDescripAPI.text(teamDescripAPI.text().substr(0, 300));
            teamDescripAPI.append("...\"");
            teamDescripAPI.prepend("\"");
            teamDescripAPI.append(" <a id=\"seeMore\">Read More</a>");
            teamDescripAPI.css({"width": "75%", "margin": "0px auto"});
            mainGameCard.prepend(teamDescripAPI);
        }

        else {
            mainGameCard.prepend(teamDescripAPI);
        }


        teamStadiumNameAPI = response.teams[0].strStadium;
        teamStadiumLocationAPI = response.teams[0].strStadiumLocation;
        teamImageCaption = $("<p>").text(teamStadiumNameAPI + " — " + teamStadiumLocationAPI).css("font-style", "italic");
        mainGameCard.prepend(teamImageCaption);

        teamStadiumImageAPI = response.teams[0].strStadiumThumb;
        teamStadiumImage = $("<img>").attr({src: teamStadiumImageAPI, alt: teamStadiumNameAPI}).css("width", "50%");
        mainGameCard.prepend(teamStadiumImage);


        teamLeagueAPI = response.teams[0].strLeague;
        teamLeague = $("<h4>").text(teamLeagueAPI).css("font-style", "italic");
        mainGameCard.prepend(teamLeague);

        if (response.teams[0].strWebsite == "") {
          teamTitleAPI = response.teams[0].strTeam;
          teamTitle = $("<h1>").text(teamTitleAPI);
          mainGameCard.prepend(teamTitle);
        }

        else {
          teamTitleAPI = response.teams[0].strTeam;
          teamLinkAPI = response.teams[0].strWebsite;
          teamTitle = $("<h1>").text(teamTitleAPI);
          teamLink = $("<a>").attr("href", "https://" + teamLinkAPI);
          mainGameCard.prepend(teamLink);
          teamLink.prepend(teamTitle);
        }


        if (response.teams[0].strFacebook == "") {
          $("#social-0").css("display", "none");
        }
        
        else {
          var facebookUrl = response.teams[0].strFacebook;
          $("#social-0").attr("href", "https://" + facebookUrl);
        }

        if (response.teams[0].strTwitter == "") {
          $("#social-1").css("display", "none");
        }
        
        else {
          var twitterUrl = response.teams[0].strTwitter;
          $("#social-1").attr("href", "https://" + twitterUrl);
        }
        
        if (response.teams[0].strInstagram == "") {
          $("#social-2").css("display", "none");
        }
        
        else {
          var instagramUrl = response.teams[0].strInstagram;
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

          var futureGameTitle = $("<h4>");
          var futureGameTitleAPI = response.events[0].strEvent;
          futureGameTitle.text(futureGameTitleAPI);
          asideUpcomingGameCard.append(futureGameTitle);

          var futureGameTime = $("<p>");
          var futureGameTimeAPI = response.events[0].strTimestamp;
          futureGameTimeAPI = moment(futureGameTimeAPI).format('MMMM Do, h:mma z');
          futureGameTime.text(futureGameTimeAPI);
          asideUpcomingGameCard.append(futureGameTime);

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
          pastHScoreAPI = parseInt(pastHScoreAPI);

          var pastAScore = $("<p>");
          var pastATeamAPI = response.results[0].strAwayTeam;
          var pastAScoreAPI = response.results[0].intAwayScore;
          pastAScoreAPI = parseInt(pastAScoreAPI);

          if (pastHScoreAPI > pastAScoreAPI) {
            pastHScore.css({"cssText": "color: white !important; background-color:green;"});
          }

          else {
            pastAScore.css({"cssText": "color: white !important; background-color:green;"});
          }

          pastAScore.text(pastATeamAPI + ": " + pastAScoreAPI);
          pastHScore.text(pastHTeamAPI + ": " + pastHScoreAPI);

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

      for (i=0; i < 8; i++) {
            video = response[i].embed;
            videoContainer.append(video);
      }

    $("._scorebatEmbeddedPlayerW_").css({"width": "40%", "padding-bottom": "calc(56.25% + 15px)"});
  });

}

// jquery appended button / link click events

  $(document).on("click", "#seeMore", function() { 
    $.ajax({
      url: UrlTeamName,
      method: "GET"
    }).then(function(response) {
      $(".teamDescription").text("");
      var expandDescrip = response.teams[0].strDescriptionEN;
      $(".teamDescription").text(expandDescrip);
      $(".teamDescription").append(" <a id=\"seeLess\">See Less</a>");

    });
  });

  $(document).on("click", "#seeLess", function() { 
    $.ajax({
      url: UrlTeamName,
      method: "GET"
    }).then(function(response) {


      $(".teamDescription").text($(".teamDescription").text().substr(0, 300));
        $(".teamDescription").append("...\"");
        $(".teamDescription").prepend("\"");
        $(".teamDescription").append(" <a id=\"seeMore\">Read More</a>");
        $(".teamDescription").css({"width": "75%", "margin": "0px auto"});

    });
  });

  $(document).on("click", ".selectNewTeam", function(event) {

    teamName = $(this).attr("team_name");

    // keeps this variable from being empty before the ajax call so it is easier to determine a search error from the user
    teamNameQuery = "placeholder";

    UrlTeamName = "";
    UrlTeamID = "";
    teamID = "";
    videoURL = "";
    futureGameTitle = "";
    futureGameTitleAPI = "";

    $( "#searchBtn" ).trigger( "click" );

  });

$(document).on("click", ".selectNewLeague", function(event) {

    teamList.html("");

    var leagueID = $(this).attr("league_id");
    var leagueName = $(this).text();


    $.ajax({
      url: "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" + leagueID, // english premiere league only
      method: "GET"
    }).then(function(response) {
    
      var responseArrayLength = Object.keys(response.teams).length;

      for (i=0; i < responseArrayLength; i++) {
        var teamLink = $("<div class=\"teamSelectWrapper\"><a class=\"selectNewTeam\"" + "team_name=\"" + response.teams[i].strTeam + "\"><img src=\"" + response.teams[i].strTeamBadge + "\" alt=\"" + response.teams[i].strTeam + "\"><p>" + response.teams[i].strTeam + "</p></a></div>")
        teamList.append(teamLink);

        teamLink.css("width", "auto");
        teamLink.find("img").css({"width": "65px", "height": "65px", "display": "block", "margin": "0px auto"});
        teamLink.find("p").css("text-align", "center");
        $(".teamSelectWrapper").css({"width": "100px", "padding": "5px"});

        $("#leagueTeamHeader").text(leagueName);

        $("#backToLeagues").css("display", "block");
      }
    });

});

$(document).on("click", "#backToLeagues", function(event) {

  prepareSoccerLeagues();

  $("#backToLeagues").css("display", "none");

});