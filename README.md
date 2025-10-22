# Snowman Builder

https://snowmanbuilder.com/

A memory game where you help Billy rebuild his melted snowman!

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint and format code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to play the game locally.

## Play from Terminal (Headless Browser)

You can automate playing the game using a headless browser:

```bash
# Install playwright browsers (first time only)
npx playwright install chromium

# Play in perfect mode (always wins)
node scripts/play_game.js

# Play in random mode (guesses randomly)
node scripts/play_game.js random
```

The script will:

- Open the game in a headless browser
- Memorize Billy's snowman
- Answer all questions
- Show the result and score
- Save screenshots to `screenshots/` folder:
  - `01-billys-snowman.png` - Initial view of Billy's snowman
  - `02-question-hat.png` - Hat selection screen
  - `03-question-head.png` - Head selection screen
  - `04-question-body.png` - Body selection screen
  - `05-result.png` - Final comparison and result

## Credits

Thanks to my kids for the app idea and artwork.
