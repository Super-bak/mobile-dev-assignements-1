# Lab Test 2

Create a React Native app that has the following features :

- A map that displays the user's current location and the user can move the map to see other locations.
- The user can search for a location using a search bar and the map will move to the location.
- The user can see the current weather for his location and the next 7 days weather forecast in a card below the map or a modal.

- implement dark and light theme using the theme switcher from the previous Lab inclded in a drawer.

## Weater APIs

You can use the following APIs to get the weather data:

### Open Meteo

- [Open Meteo](https://open-meteo.com/) - Free API for weather data
- [Open Meteo Documentation](https://open-meteo.com/en/docs)

Forecast API: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m


### Local Weather API

If you are having issues with the you can mock a simple   server that returns a json data.

create a folder called `mock-server` and inside create a `db.json` file and add the needed data.

Here is an example of a mock server:

db.json
```json
{
  "posts": [
    {
      "id": 1,
      "studentName": "daustian 7",
      "department": "computer science"
    }
  ]
}

```

then run the server:

```bash
npx json-server --watch db.json
```

## Deliverable

A github repository containing the codebase sent vial email.
