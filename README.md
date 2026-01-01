# SCT_WD_3
Tic Tac Toe - Advanced This repository hosts an advanced Tic Tac Toe game featuring multiple game modes, including local multiplayer, AI challenge (with adjustable difficulty), and online multiplayer powered by Firebase Firestore. The game provides a modern, responsive interface with smooth transitions and real-time updates.

Table of Contents Features

Game Modes

Technologies Used

Project Structure

Setup and Running Locally

Usage

Customization

Features Multiple Game Modes: Play against a friend locally, challenge a smart AI, or compete with others online.

Responsive Design: Built with Tailwind CSS, ensuring a seamless experience across various devices (mobile, tablet, desktop).

Modern UI/UX: Clean, dark-themed interface with smooth animations and interactive elements.

AI Opponent:

Easy Mode: Simple random moves.

Hard Mode: Unbeatable AI using the Minimax algorithm.

Online Multiplayer (Firebase Firestore):

Create new online games and share a unique Game ID.

Join existing games using a Game ID.

Real-time synchronization of game state between players.

Automatic authentication for users (anonymous or custom token).

Public leaderboard/game history for online matches.

Game History: Tracks both local (Friend/AI) and online games, displayed in a sortable table.

Custom Notifications: Non-intrusive message box for notifications (e.g., "Game ID copied!").

Winning Animations: Highlights the winning line on the board.

Dynamic Status Display: Provides real-time game status updates (e.g., "Player X's Turn", "Waiting for opponent...").

Game Modes Play a Friend: Classic two-player mode on a single screen.

Challenge the AI:

Easy: A straightforward AI opponent.

Hard (Unbeatable): An advanced AI that plays optimally.

Play Online:

Create New Game: Generates a unique Game ID for you to share with a friend. You will be Player X.

Join Game: Enter a Game ID provided by another player to join their game. You will be Player O.

Technologies Used HTML5: Provides the semantic structure of the game interface.

Tailwind CSS: A utility-first CSS framework for rapid and responsive styling.

CSS3: Custom styles for animations, specific component looks, and responsive adjustments.

JavaScript (Vanilla JS):

Core game logic (board state, turns, win conditions, AI).

DOM manipulation for rendering the game board and updating UI elements.

Event handling for user interactions.

Minimax algorithm implementation for the "Hard" AI difficulty.

Google Fonts (Poppins): Used for a modern and clean typographic style.

Project Structure . ├── tic-tac-toe.html # The main HTML file defining the game's structure, UI elements, and Firebase initialization. ├── tic-tac-toe.css # Custom CSS rules for styling, animations, and responsive adjustments. └── tic-tac-toe.js # Contains all the JavaScript logic for game mechanics, UI updates, AI, and Firebase interactions.

Setup and Running Locally To get a local copy of this project up and running, follow these steps:

Clone the repository:

git clone

Navigate to the project directory:

cd tic-tac-toe-advanced # Or whatever your cloned directory is named

Open tic-tac-toe.html in your web browser: You can simply double-click the tic-tac-toe.html file, or right-click and choose "Open with" your preferred web browser.

Note: For the online multiplayer and game history features to work, you will need to set up a Firebase project as described in the next section. Without Firebase, only the "Play a Friend" and "Challenge the AI" modes will be fully functional, and game history will not be saved.

Firebase Setup (for Online Play) To enable online multiplayer and persistent game history, you need to set up a Firebase project:

Create a Firebase Project:

Go to the Firebase Console.

Click "Add project" and follow the steps to create a new project.

Register a Web App:

In your Firebase project, click the "Web" icon (</>) to add a web app.

Follow the instructions to register your app. You'll get a firebaseConfig object.

Enable Firebase Products:

Authentication:

In the Firebase Console, navigate to Build > Authentication.

Go to the "Sign-in method" tab.

Enable the Anonymous provider.

Click "Create database".

Choose "Start in production mode" (you'll set up security rules next). Select a location.

Replace the default rules with the following. These rules allow authenticated users to read and write to public and private collections, ensuring data security for your app.

rules_version = '2'; service cloud.firestore { match /databases/{database}/documents { // Public data for online games and history match /artifacts/{appId}/public/data/{collectionName}/{documentId} { allow read, write: if request.auth != null; }

// Private user-specific data (e.g., local game history)
match /artifacts/{appId}/users/{userId}/{collectionName}/{documentId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
} }

Click "Publish".

Update tic-tac-toe.js (if not running in a Canvas environment): If you are running this outside of a Canvas environment that automatically injects Firebase config, you will need to manually paste your firebaseConfig object into tic-tac-toe.js. Find the line:

const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : { apiKey: "YOUR_API_KEY", authDomain: "...", projectId: "..." };

And replace { apiKey: "YOUR_API_KEY", authDomain: "...", projectId: "..." } with your actual Firebase config object.

Usage Navigate to the Game Section: Use the navigation bar or the "Choose Your Challenge" button to scroll to the game area.

Select a Game Mode:

Play a Friend: Click "Play a Friend" to start a local two-player game.

Challenge the AI: Click "Challenge the AI", then select "Easy" or "Hard" difficulty.

Play Online:

Click "Create New Game" to generate a unique Game ID. Share this ID with your opponent.

Or, enter an existing "Game ID" in the input field and click "Join Game".

Playing the Game:

Click on an empty cell to place your mark (X or O).

The status display will indicate whose turn it is.

The game automatically detects wins and draws.

End Game Modal: After a game concludes, a modal will appear showing the result (Win/Loss/Draw). You can choose to "Play Again" (resets the current game mode) or "Close Game" (returns to mode selection).

Game History: Scroll down to the "Game History" section to view a log of past games, including online matches and local AI/friend games.

Copy Game ID: In online mode, click on the displayed Game ID to copy it to your clipboard.

Customization HTML (tic-tac-toe.html): Modify the layout, add new sections, or change static text content.

CSS (tic-tac-toe.css): Customize the visual appearance, including colors, fonts, spacing, and animations. Tailwind CSS classes are heavily used, but custom CSS is also applied for specific effects.

JavaScript (tic-tac-toe.js):

Game Logic: Adjust game rules, winning conditions, or add new game mechanics.

AI Logic: Modify the aiMove, findBestMove, minimax, or evaluate functions to change AI behavior.

Firebase Integration: Alter how data is stored or retrieved, or add new real-time features.

UI Updates: Change how game state changes are reflected in the UI.
