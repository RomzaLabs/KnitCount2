# Deployment

Below are the point-by-point set of instructions on how to deploy a new version to the Apple App Store and Google Play 
Store.

1. Update `app.json`.
1.1. Update `expo.version`.  
1.2. Update `expo.ios.buildNumber`.
1.3. Update `expo.android.versionCode`.  
1.4. Update `expo.hooks.postPublish.config.authToken` with the Expo token. Don't commit this change.
2. Update version and date in `README.md`.
3. Start the expo server: `expo start`.
4. Start the android build: `expo build:android -t app-bundle`. Wait for it to finish building.
5. Start the ios build: `expo build:ios`. Wait for it to finish building.
6. Upload the android build: `expo upload:android`.   
6.1. When asked for the JSON path: `/Users/rommel/Documents/certificates/KnitCount2/Android/api-9116547925403505588-17439-8337c87354de.json`.  
7. Upload the ios build: `expo upload:ios`.  
7.1. If asked for the App-specific password, retrieve it from: `/Users/rommel/Documents/certificates/KnitCount2/iOS/AppleStuff.rtf`.
8. Continue the process in the respective App Stores.
