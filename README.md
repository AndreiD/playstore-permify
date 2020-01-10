# Google Play History - Arweave

Storing the top apps details from Google Play, once per day, PERMANENTLY & FREE TO QUERY

### Something similar offers is made by this guys -> https://42matters.com/pricing

Example app details:

```
{
      "title": "Glitter dress coloring and drawing book for Kids",
      "appId": "com.redberry.glitterdressa2",
      "url": "https://play.google.com/store/apps/details?id=com.redberry.glitterdressa2",
      "icon": "https://lh3.googleusercontent.com/HdyuQI-MCnY_TegAFIV-0wsWC3yzewVbf7KMzNkO4TaikEUU3DYC5wukChh2GtKyl9Y",
      "developer": "BaramGames",
      "developerId": "6938298709975174416",
      "priceText": "FREE",
      "free": true,
      "summary": "BASE64_ENCODED!",
      "scoreText": "3.6",
      "score": 3.6320755
    }
```

or check the latest transaction here

https://viewblock.io/arweave/address/ZGt8zl7EJyMMEQ_j4kLaAYlEFOhrgYSEOw6eFPhIV0Y

## How it works

The app loads the top apps, both FREE and PAID from each category and uploads them to arweave as a permafeed.

## How to query it ?

Best way to do it, is by using the wonderful library https://www.npmjs.com/package/arql-ops

```
const { or, equals, and } = require("arql-ops");
const Arweave = require("arweave/node");

var arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false
});

const myQuery = and(
  equals("from", "ZGt8zl7EJyMMEQ_j4kLaAYlEFOhrgYSEOw6eFPhIV0Y"),
  equals("Feed-Name", "googleplay-history"),
  or(
    equals("Date", "2020-01-10"),
    equals("Category", "PARENTING"),
    equals("Type", "topselling_free")
  )
);

(async () => {
  const results = await arweave.arql(myQuery);
  console.log("results :", results);
})();
```

where the date is in YYYY-MM-DD format

Categories tracked

```

APPLICATION
ANDROID_WEAR
ART_AND_DESIGN
AUTO_AND_VEHICLES
BEAUTY
BOOKS_AND_REFERENCE
BUSINESS
COMICS
COMMUNICATION
DATING
EDUCATION
ENTERTAINMENT
EVENTS
FINANCE
FOOD_AND_DRINK
HEALTH_AND_FITNESS
HOUSE_AND_HOME
LIBRARIES_AND_DEMO
LIFESTYLE
MAPS_AND_NAVIGATION
MEDICAL
MUSIC_AND_AUDIO
NEWS_AND_MAGAZINES
PARENTING
PERSONALIZATION
PHOTOGRAPHY
PRODUCTIVITY
SHOPPING
SOCIAL
SPORTS
TOOLS
TRAVEL_AND_LOCAL
VIDEO_PLAYERS
WEATHER
GAME
GAME_ACTION
GAME_ADVENTURE
GAME_ARCADE
GAME_BOARD
GAME_CARD
GAME_CASINO
GAME_CASUAL
GAME_EDUCATIONAL
GAME_MUSIC
GAME_PUZZLE
GAME_RACING
GAME_ROLE_PLAYING
GAME_SIMULATION
GAME_SPORTS
GAME_STRATEGY
GAME_TRIVIA
GAME_WORD
FAMILY
FAMILY_ACTION
FAMILY_BRAINGAMES
FAMILY_CREATE
FAMILY_EDUCATION
FAMILY_MUSICVIDEO
FAMILY_PRETEND

```

# Build & Run

```
cp config-sample.js config.js
nano config.js
.... edit it

crontab -e
30 17 * * * /usr/bin/node /home/path_to_your_app/app.js

```

# License MIT
