const { chromium } = require("playwright");
const fs = require("fs");

// Get mode from command line argument: 'random' or 'perfect' (default: perfect)
const mode = process.argv[2] || "perfect";

(async () => {
  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync("screenshots")) {
    fs.mkdirSync("screenshots");
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log(
    `🎮 Opening Snowman Builder at http://localhost:3000... (Mode: ${mode})`,
  );
  await page.goto("http://localhost:3000");

  // Wait for images to load
  console.log("⏳ Waiting for images to preload...");
  await page.waitForSelector("text=Let's Rebuild!", { timeout: 10000 });
  console.log("✅ All images loaded!\n");

  // Remember what Billy's snowman looks like by reading the image src attributes
  console.log("🧠 Memorizing Billy's snowman...");
  const billySnowman = {};
  const parts = ["hat", "head", "body"];

  // Get all images from Billy's snowman (they're in the first div with "Billy's snowman" label)
  const snowmanImages = await page.locator('img[src*=".png"]').all();

  for (let i = 0; i < Math.min(3, snowmanImages.length); i++) {
    const imgSrc = await snowmanImages[i].getAttribute("src");
    // Extract the part and index from the filename (e.g., "/hat2.png" -> "hat", 2)
    const match = imgSrc.match(/\/(\w+)(\d+)\.png/);
    if (match) {
      const part = match[1];
      const index = parseInt(match[2]);
      billySnowman[part] = index;
      console.log(`   📝 ${part}: option ${index}`);
    }
  }

  // Take a screenshot of Billy's snowman
  console.log("\n📸 Taking a screenshot of Billy's snowman...");
  await page.screenshot({ path: "screenshots/01-billys-snowman.png" });
  console.log("   Screenshot saved to screenshots/01-billys-snowman.png\n");

  // Click "Let's Rebuild!"
  await page.click("text=Let's Rebuild!");
  console.log('🔨 Clicked "Let\'s Rebuild!" - Starting the game...\n');

  // Play the game
  let stepNumber = 2;
  for (const part of parts) {
    // Wait for the question to appear
    await page.waitForSelector(`text=Which ${part} was it?`);
    console.log(`❓ Question: "Which ${part} was it?"`);

    // Take screenshot of the question
    const questionScreenshot = `screenshots/${String(stepNumber).padStart(
      2,
      "0",
    )}-question-${part}.png`;
    await page.screenshot({ path: questionScreenshot });
    console.log(`   📸 Screenshot saved to ${questionScreenshot}`);

    // Get all clickable divs that contain images
    const options = await page.locator("div.cursor-pointer").all();
    console.log(`   Found ${options.length} ${part} options to choose from`);

    let chosenIndex;
    if (mode === "random") {
      // Pick a random option
      chosenIndex = Math.floor(Math.random() * options.length);
      console.log(`   🎲 Randomly selecting option ${chosenIndex + 1}...`);
    } else {
      // Pick the correct option based on what we memorized
      // We need to find which option has the correct image
      for (let i = 0; i < options.length; i++) {
        const imgSrc = await options[i].locator("img").getAttribute("src");
        const match = imgSrc.match(/\/(\w+)(\d+)\.png/);
        if (match && parseInt(match[2]) === billySnowman[part]) {
          chosenIndex = i;
          break;
        }
      }
      console.log(`   🧠 Selecting the correct option (${chosenIndex + 1})...`);
    }

    await options[chosenIndex].click();
    console.log(`   ✓ Clicked option ${chosenIndex + 1}\n`);
    stepNumber++;
  }

  // Wait for results
  console.log("⏳ Waiting for results...");
  await page.waitForSelector("text=Billy's snowman");

  // Get the result
  const resultElem = await page
    .locator("text=Correct!")
    .or(page.locator("text=Wrong!"));
  const result = await resultElem.textContent();

  console.log("\n" + "=".repeat(50));
  if (result === "Correct!") {
    console.log("🎉 " + result + " I won! 🎉");
  } else {
    console.log("❌ " + result + " Better luck next time!");
  }
  console.log("=".repeat(50) + "\n");

  // Take a screenshot of the comparison
  await page.screenshot({ path: "screenshots/05-result.png" });
  console.log("📸 Screenshot of result saved to screenshots/05-result.png\n");

  // Check the score
  const scoreText = await page.textContent("body");
  const winsMatch = scoreText.match(/(\d+) Win/);
  const lossesMatch = scoreText.match(/(\d+) Loss/);

  if (winsMatch || lossesMatch) {
    const wins = winsMatch ? winsMatch[1] : "0";
    const losses = lossesMatch ? lossesMatch[1] : "0";
    console.log(`📊 Current Score: ${wins} Win(s), ${losses} Loss(es)`);
  }

  await browser.close();
  console.log("\n✅ Game complete! Browser closed.\n");
})();
