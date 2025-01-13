const fs = require("fs");

// Function to remove accents from text
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Check if file path is provided
if (process.argv.length < 3) {
  console.error("Please provide a path to the JSON file");
  console.error("Usage: node normalize-words.js <path-to-json>");
  process.exit(1);
}

const filePath = process.argv[2];

// Read and process the file
try {
  // Read the JSON file
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!data.words || !Array.isArray(data.words)) {
    throw new Error('JSON file must contain a "words" array');
  }

  // Add normalized words
  data.words = data.words.map((wordObj) => ({
    ...wordObj,
    normalizedWord: removeAccents(wordObj.word),
  }));

  // Write the result back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Successfully added normalized words to:", filePath);
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
