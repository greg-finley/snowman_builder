# Snowman Builder Mobile App Migration

## Current Web Implementation

- Next.js/React app with TypeScript
- Simple snowman building game where players click parts in correct order
- Core game logic in React components with hooks
- Images preloaded to prevent cheating via browser cache
- Google Analytics tracking for wins/losses (not needed in mobile version)
- Responsive CSS already somewhat mobile-friendly

## Key Files to Reference

- `../src/app/page.tsx` - Main game component with React state management
- `../src/app/types.ts` - TypeScript types for game state
- `../src/app/utils.ts` - Utility functions for asset handling
- `../src/app/components/` - React components:
  - `SnowmanPartOptions.tsx` - Part selection UI
  - `CompletedSnowman.tsx` - Final snowman display
  - `Button.tsx` - Reusable button component
- `../public/` - All snowman part images (body0-3.png, head0-3.png, hat0-3.png, midsection0-3.png)
- `../scripts/play_game.js` - Automated testing script for game functionality
- `../screenshots/` - Captured game states from automated testing

## Features to Preserve

1. Click parts to build snowman (must match correct order)
2. Win detection when correct order achieved
3. Victory celebration (check if uses confetti library or custom)
4. Win/loss tracking (skip analytics - no tracking needed)
5. Reset button
6. "Snowman complete!" message
7. Visual feedback showing selected parts

## New Features for Mobile

- Haptic feedback on touches
- Local storage for win/loss stats
- App icons and splash screen
- Maybe: difficulty levels, sound effects, animations

## Technical Notes

- Will use React Native for cross-platform
- Already React components, should port relatively easily
- PNG images should work fine in React Native
- No analytics or tracking needed

## App Store Requirements

- App icons: 1024x1024 for store, various sizes for device
- Screenshots: iPhone and iPad if universal
- Privacy policy (even if collecting no data)
- App description and keywords
- TestFlight beta testing before submission

## Development Steps

1. Initialize React Native project
2. Set up basic navigation/screens
3. Port game logic to React Native components
4. Convert/import SVG assets
5. Implement touch handlers and game state
6. Add victory animations and feedback
7. Test on iOS simulator and device
8. Prepare App Store assets
9. Submit to TestFlight
10. Submit to App Store

## Don't Forget

- The game is intentionally simple - avoid feature creep
- Maintain the clean, minimal aesthetic
- Test on various screen sizes
