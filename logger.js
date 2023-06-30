const { createLogger, format, transports, config } = require("winston");
const { combine, timestamp, json } = format;

const logger = createLogger({
  transports: [new transports.Console()],
});

const userLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
  transports: [
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "logs/user.log", level: "info" }),
  ],
});

module.exports = {
  userLogger,
};
