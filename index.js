const express = require("express");
const app = express();
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: `./shared-volume/logs/app.log` }),
  ],
});

// Allow all origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, traceparent, tracestate"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.get("/", (_, res) => {
  logger.info("Welcome!");
  const shouldFail = Math.random() < 0.5; // 50% chance of error

  if (shouldFail) {
    logger.info("❌ Simulated error");
    const errMsg = "Simulated server error 💥";
    return res.status(500).json({
      error: errMsg,
    });
  }

  logger.info("✅ Success response");
  res
    .status(200)
    .json({ message: "Success! 🎉", timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 8080;
app.listen(port);
