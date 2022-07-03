Lost In The Labyrinth

Navigate a winding Labyrinth, finding keys to unlock your path to the end.


Game Logic

    Game start screen with "Start Game" button
    load game view port
    load map with labyrinth
    run function that determines location of 'keys' from a list of prechoosen locations on map
    load player icon
    set game time
    player move function uses directional arrows to navigate maze
    the first time the player moves the player icon, start timer with countdown.  if timer reaches zero, end game.
    to pick up items, player icon must be near 'container' and 'click'
    approaching door creates window alert with clue about key
    when player clicks door, while near it, game will check player inventory for required key.  if key is present, window alert accept message and remove barrier and increase amount of time on timer.  if key is not there, window alert reject message.  repeat this logic for each door.
    When player opens final door, stop timer, record total time elapsed and window alert 'congratulations!  you escaped the labyrinth in *time completed*!"
    return to game start screen with "start Game" button

Deliverables

MVP Criteria

    Track player inventory
    Only open doors with correct Key
    Proper Object collision logic
    Game ends when timer expires or timer stops when player wins

Post-MVP Plans

    Randomize key locations
    Add pop up instances with puzzles in order to retrieve key
    Add enemies, eventually add combat system
    

Play Lost In The Labyrinth here [https://kstambaugh.github.io/odu_milestone_project1/]