# Quiz App — React Project

A simple and clean Web-Based Quiz Application built using React.
This project was created as a practice project to learn component structure, custom hooks, state management, and UI layout with CSS.

# Features

- Multiple-choice quiz

- Automatic score calculation

- Custom hook for quiz logic (useQuiz)

- Restart quiz functionality

- Responsive and clean UI

- Modern UI with CSS only (no UI library)

- Code structured for readability and reusability

# Tech Stack
- React
- JavaScript
- Custom Hooks
- CSS
- Vite

# How It Works
1. Custom Hook (useQuiz)

- All quiz logic is placed inside a custom hook:

- Handles quiz step (start → quiz → result)

- Tracks current question

- Tracks score

- Calculates % score

- Handles restart

- This keeps components clean and focused.

2. UI Screens

- The app is split into 3 screens:

- StartScreen — intro page with "Start" button

- QuizScreen — displays question, options, and handles answers

- ResultScreen — shows final percentage score inside a card

- Each screen is isolated and easy to maintain.

3. CSS Styling

- All CSS is inside index.css to keep the project simple:

- Flexbox layout

- Card-style UI

- Buttons with hover effects

- Score card design

# What I Learned

✔ React Fundamentals
- Components
- Props
- Component structure

✔ State Management (useState)
- Tracking quiz state
- Moving through questions
- Updating score

✔ Custom Hooks
- Encapsulation of quiz logic
- Returning computed values
- Cleaning UI components

✔ Conditional Rendering
- Showing different screens
- Showing “Perfect Score” message

✔ CSS Basics
- Layout using flexbox
- Styling buttons & cards
- Responsive design basics

✔ Debugging React
- Fixing typos in props
- Understanding state flow
- Handling undefined errors

# How to run
- npm install
- npm run dev

# Future Improvement
- Adding Node.js and Express.js As Full Stack Development
