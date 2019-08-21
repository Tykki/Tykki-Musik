# Tykki-Musik

This is a static and free version of Tykki's Musik web app. The full scope of this app is to enable web playback of songs from users spotify accounts, while also linking to their fb accounts to chat with other users of the app. Also other users in  your area from the geo-location in the map section. A simple profile is generated and the ability to follow others and include status updates. Due to this being the free version, the scope is reduced to the following requirement for the IT 202 big project rubric.

## PWA Confirmed
App is fully downloadable and works after being offline. Be care of losing service while logged into fb on app, you may not be able to log out of app with fb profile until service is returned. Also Install button  while it can be found in mobile view menu, it can be downloaded from chrome browser menu in laptop views.

### Chat Functionality 
Chat functions are only availible in full version of Musik app, Chat with others locally close by or with other friends on the app via your fb list.

### Profile
Access to account and profile creation and edits are restricted in free version. Profiles of different users can be viewed by using the different username and password combinations on login screen. Also users can login via fb and have there profile displayed as well.

### Map
A more inclusive and functional map is available outside of the scope of this free app. The app can handle and display user current location as well as the location of users in friends list or people near by. (Static app uses dumby data, locations do not alway match address used. But GPS is always correct)

### Login/Logout
Due to this being free and account creation being disabled, random users are generated in the database and info is displayed for use to login and explore app. In app navagation is not possible without login authentication. Facebook login and logout is active and will authenticate app. Always remember, you can  log out of app, but also must your facebook connection. 

#### Issues
Due to stripping down  app from a server based node application somethings where affected. But the main thing that is a bother is that the material-design animations do not work consistently if they do work at all.