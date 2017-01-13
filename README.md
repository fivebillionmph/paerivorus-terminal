# paerivorus-terminal
Another react terminal component

## How to use
### Props
* maxLines - (default: 50) number of output lines saved to the terminal
* maxSavedCommands - (default: 50) number of commands saved to the history
* clearString - (default: undefined) a string that when entered, clears the terminal output lines
* ps1 - (default: undefined) the prompt string
* onCommand - (default: undefined) a function that runs when ever the users submits a line.  It is passed a single argument: the string that the user entered
* tabComplete - (default: undefined) an array of strings that will the terminal will tab complete to
