Router design:

- / -> Home (tabs + buttons)
- /how-to-play -> How to Play page
- /new-game -> Starts game (query param length optional: /new-game?length=6)
  Route /new-game triggers Modal open + Game start, then redirects to / (handled in component).
