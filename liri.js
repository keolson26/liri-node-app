
//general
var userReq = process.argv[2];
var searchParam = process.argv[3];

//twiter
var twitterKeys = require("./keys.js");
var Twitter = require('twitter-node-client').Twitter;
var client = new Twitter(twitterKeys);
var getUser = {user_name: "BoilerBall"};

//spotify
var Spotify = require('spotify-web-api-js');

//imdb
var request = require("request");

//random.txt
var fs = require("fs");

switch (userReq) {

	case "my-tweets":
		var err = function (err, response, body) {
	    	//console.log('ERROR [%s]', err);
		};
		var success = function (data) {
	    	//console.log('Data [%s]', data);
		};
		client.getUserTimeline({getUser, count: '20'}, err, success); 
		//Code in Twitter.JS file to show tweets
		
	break;
	
	case "spotify-this-song":
		if (searchParam = "") {
			searchParam = "the+sign";
		}
		else {

			for (var i = 3; i < process.argv.length; i++) {
	  			if (i > 3 && i < process.argv.length) {
	    			searchParam = searchParam + "+" + process.argv[i];
	  			}

	  			else {
	    			searchParam += process.argv[i];
	  			}
			}
		}
		var callSong = "https://api.spotify.com/v1/search?q=track:"+searchParam+"&type=track&limit=1";
		request(callSong, function(err, response, body) {
			if (!err && response.statusCode === 200) {
				console.log("Artist: " + JSON.parse(body).tracks.items[0].album.artists[0].name);
				console.log("Track name: " + JSON.parse(body).tracks.items[0].name);
				console.log("Featured Album: " + JSON.parse(body).tracks.items[0].album.name);
				console.log("Preview Link: " + JSON.parse(body).tracks.items[0].preview_url);
			}
			else{
				console.log(err);
			}
		});

	break;

	case "movie-this":
		if (searchParam = "") {
			searchParam = "mr+nobody";
		}
		else {
			for (var i = 3; i < process.argv.length; i++) {

	  			if (i > 3 && i < process.argv.length) {
	    			searchParam = searchParam + "+" + process.argv[i];
	  			}

	  			else {
	    			searchParam += process.argv[i];
	  			}
			}
		}
		var callMovie = "http://www.omdbapi.com/?t=" + searchParam + "&y=&plot=short&r=json";
		request(callMovie, function(err, response, body) {
			if (!err && response.statusCode === 200) {
	    		console.log("Title: " + JSON.parse(body).Title);
	    		console.log("Release Year: " + JSON.parse(body).Year);
	    		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    		console.log("Country of Production: " + JSON.parse(body).Country);
	    		console.log("Language(s): " + JSON.parse(body).Language);
	    		console.log("Movie Plot: " + JSON.parse(body).Plot);
	    		console.log("Primary Actors: " + JSON.parse(body).Actors);
	    		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    		console.log("URL: " + JSON.parse(body).Website);
	    		}
	  		else {
				console.log(err);
			}
  		});
	break;

	//Use FS to call random.tct
	case "do-what-it-says":
		fs.readFile("random.txt", "utf8", function (err, data) {
			console.log(data);
			var dataArr = data.split(",");
			console.log(dataArr);
			userReq = dataArr[0];
			searchParam = dataArr[1];
			console.log(userReq);
			console.log(searchParam);


			switch (userReq) {

				case "my-tweets":
					var err = function (err, response, body) {
			    	//console.log('ERROR [%s]', err);
					};
					var success = function (data) {
				    	//console.log('Data [%s]', data);
					};
					client.getUserTimeline({getUser, count: '20'}, err, success); 
					//Code in Twitter.JS file to show tweets
					
				break;
				
				case "spotify-this-song":
					callSong = "https://api.spotify.com/v1/search?q=track:"+searchParam+"&type=track&limit=1";
					console.log(callSong);
					request(callSong, function(err, response, body) {
						if (!err && response.statusCode === 200) {
							console.log("Artist: " + JSON.parse(body).tracks.items[0].album.artists[0].name);
							console.log("Track name: " + JSON.parse(body).tracks.items[0].name);
							console.log("Featured Album: " + JSON.parse(body).tracks.items[0].album.name);
							console.log("Preview Link: " + JSON.parse(body).tracks.items[0].preview_url);
						}
						else(console.log(err));
					});

				break;

				case "movie-this":
					if (searchParam = "") {
						searchParam = "mr+nobody";
					}
					else {
						for (var i = 2; i < process.argv.length; i++) {

				  			if (i > 2 && i < process.argv.length) {
				    			searchParam = searchParam + "+" + process.argv[i];
				  			}

				  			else {
				    			searchParam += process.argv[i];
				  			}
						}
					}

					request(callMovie, function(err, response, body) {
						if (!err && response.statusCode === 200) {
							function movies(body) {
				    		console.log("Title: " + JSON.parse(body).Title);
				    		console.log("Release Year: " + JSON.parse(body).Year);
				    		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				    		console.log("Country of Production: " + JSON.parse(body).Country);
				    		console.log("Language(s): " + JSON.parse(body).Language);
				    		console.log("Movie Plot: " + JSON.parse(body).Plot);
				    		console.log("Primary Actors: " + JSON.parse(body).Actors);
				    		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				    		console.log("URL: " + JSON.parse(body).Website);
				    		}
				  		}
			  		});
				break;
				}
			});
	break;
}
