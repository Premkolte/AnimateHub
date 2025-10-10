import "dotenv/config" // load the env file
import connectToDatabase from "./src/utils/db.js"
import app from "./src/app.js"

const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`✅ SERVER running at port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database.", error);
    process.exit(1); // ensures server exits on failure
  }
}

startServer();

