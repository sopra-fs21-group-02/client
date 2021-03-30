# Routes

## Route Protectors

```
SignedInGuard   # Ensures the user is signed in
SignedOutGuard  # Ensures the user is *not* signed in
```

## Authentication

```
/sign-in    # Shows the sign-in page, redirects to map if already signed in
/sign-out   # Signs the user out and redirects to the sign-in page
```

## Users

```
/users      # Shows a list of all users
⮑ /:id     # Shows a single user's full profile
```

## Chat

```
/chat           # Shows all chat conversations of the signed-in user
⮑ /new         # Shows a list of users to start a new chat conversation with
⮑ /:userId     # Shows the chat conversation between the signed-in and the given user
```

## Map

```
/map            # Shows the map at the user's current location
⮑ /filters     # Shows the map filtering options
⮑ /user/:id    # Shows the given user on the map
⮑ /park/:id    # Shows the given park on the map
   ⮑ /review   # Shows the screen to create a new review for the given park
⮑ /route/:id   # Shows the given route on the map
   ⮑ /review   # Shows the screen to create a new review for the given route
```
