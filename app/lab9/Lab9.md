# Lab: The Real-Time GPS

Build a React Native app that tracks the user's live GPS coordinates and leaves a "bread-crumb" trail on the map.

## Hints

You can use the :

- [`expo-location`](https://docs.expo.dev/versions/latest/sdk/location/) library to get the user's location
- [`react-native-maps`](https://www.npmjs.com/package/react-native-maps) library to display the map and the user's location
- `useEffect` hook to request the user's location permissions and start watching the user's location (DO not forget the clean up)

## Testing

- **Android Emulator:** Use the "Extended Controls" (three dots) > `Location` to play a GPX/KML route.
- **Physical Device:** Just walk to the end of the hallway and back!
- **iOS Simulator:** Use `Features > Location > City Walk`.
