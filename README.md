# Google Play History - Arweave

Storing the top apps details from Google Play, once per day, PERMANENTLY & FREE TO QUERY

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
      "summary": "Glitter dress coloring and drawing for Kids and girls",
      "scoreText": "3.6",
      "score": 3.6320755
    }
```

## How it works

The app loads the top apps, both FREE and PAID from each category and uploads them to arweave as a permafeed.

## ArQL Examples

Since the json is pretty big, you should get the dump, day by day.

```
{
op: 'and',
  expr1: {
  op: 'equals',
  expr1: 'from',
  expr2: 'xxxxxxxxxxxxxx'
  },
  expr2: {
  op: 'equals',
  expr1: 'Feed-Name',
  expr2: 'googleplay-history'
  },
  expr3: {
  op: 'equals',
  expr1: 'date',
  expr2: '2020-01-03'
  }
}
```

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
```

# License MIT
