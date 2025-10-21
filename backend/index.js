// 🌿 AnimateHub Backend Entry Point (Level 3 Optimized)
// ----------------------------------------------------
// ✅ Clean, lightweight, and deployment-safe.
// ✅ No unnecessary plugins or heavy dependencies.
// ✅ Includes graceful shutdown handling.
// ✅ Environment-safe and async-stable.

import "dotenv/config"; // Load environment variables
import connectToDatabase from "./src/utils/db.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

// Graceful shutdown handler
function shutdown(server) {
  console.log("\n🛑 Shutting down server...");
  server.close(() => {
    console.log("🔒 Server closed safely.");
    process.exit(0);
  });
}

async function startServer() {
  try {
    await connectToDatabase();
    console.log("📦 Database connected successfully!");

    const server = app.listen(PORT, () => {
      console.log(`🚀 AnimateHub backend live at port: ${PORT}`);
    });

    // Handle graceful shutdowns
    process.on("SIGTERM", () => shutdown(server));
    process.on("SIGINT", () => shutdown(server));

    // Catch unhandled promise rejections
    process.on("unhandledRejection", (reason) => {
      console.error("⚠️ Unhandled Promise Rejection:", reason);
      shutdown(server);
    });

    // Catch uncaught exceptions
    process.on("uncaughtException", (error) => {
      console.error("💥 Uncaught Exception:", error);
      shutdown(server);
    });

  } catch (error) {
    console.error("❌ Failed to initialize AnimateHub backend:", error);
    process.exit(1);
  }
}

startServer();
