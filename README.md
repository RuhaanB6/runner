# Momentive

## Inspiration
We created Momentive to help users stay motivated through gamification and personalization. Inspired by productivity apps and habit trackers, we wanted to build a system that rewards progress while allowing users to express themselves through customizable themes. The dual focus on motivation and personalization drives our vision for an engaging user experience. The majority of our group comprises of past and present competitive and leisure runners. While they understand the joys and turmoils of running from the perspective of people who have been involved in the field, the other minority of the group understands the trek that the journey to a healthy running schedule looks like. Combining these insights, we wanted to develop something to make it easier for both parties.

## What it does
Momentive is a motivation-boosting app that:
- Creates quality running routes based on user distance preferences
- Ensures randomness and excitement in the route-selection proccess
- Holds and maintains location data to track user against route
- Tracks user progress through a points system
- Allows users to earn points and unlock premium themes
- Provides a customizable profile with username and personal details
- Features a shop where users can spend points to purchase themes
- Maintains persistent storage of user data and purchases

Key Features:
- **Route Planning:** Creates routes based on user distance preference and proximity
- **Profile Management:** Edit username, first/last name, and track points
- **Points System:** Earn points through app engagement
- **Theme Shop:** Purchase and apply new themes using earned points
- **Persistent Storage:** All data is saved locally and persists between sessions

## How we built it
Momentive was built using:
- **Frontend:** React Native Expo with TypeScript
- **State Management:** React hooks (useState, useEffect)
- **Navigation:** React Navigation
- **Persistence:** AsyncStorage for local data storage
- **Theming:** Custom themes with css stylesheets
- **UI Components:** Custom-designed components with responsive layouts

Technical Highlights:
- Effectively parsed through Google API data to procure routes
- Implemented bi-directional data synchronization between Profile and Shop
- Developed atomic storage operations for reliable data persistence
- Created a dynamic purchase system that supports future expansion
- Built a theme engine supporting multiple color schemes

## Challenges we ran into
1. **Data Synchronization:** Ensuring real-time updates between Profile and Shop screens
2. **State Management:** Handling complex state interactions between points and purchases
3. **Persistence:** Maintaining data consistency across app restarts
4. **Location and Route Interaction:** Implementing new routes and combining it with user location to maintain a game-loop
5. **UI Consistency:** Maintaining visual coherence across different themes

## Accomplishments that we're proud of
- Implemented maps and location into a (if we say so ourselves) beautiful UI
- Successfully implemented a reliable points system with bi-directional sync
- Created an expandable theme shop with persistent purchase tracking
- Developed a smooth user experience with instant feedback
- Built a robust storage system that handles edge cases
- Designed an intuitive UI that works across different themes

## What we learned
- Effective state management techniques in React Native
- Best practices for local data persistence
- Importance of atomic operations in data storage
- How to create maintainable, expandable systems
- Techniques for handling complex screen interactions
- Value of proper error handling and user feedback

## What's next for Momentive
1. **Cloud Sync:** Implement cloud storage for cross-device synchronization
2. **Achievement System:** Add badges and milestones for user accomplishments
3. **Social Features:** Enable sharing progress with friends
4. **More Customization:** Expand theme options and add profile pictures
5. **Daily Challenges:** Implement daily tasks for bonus points
6. **Analytics:** Add usage tracking to improve user experience
7. **Accessibility:** Enhance accessibility features for wider user base

## Getting Started
To run Momentive locally:
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Run on your preferred platform: `npm run android` or `npm run ios`

** NOTE: Need Node.JS installed to use `npm` **
