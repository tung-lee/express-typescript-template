import app from "./app";
import config from "./configs";

const port = config.app.port || 3000;

const server = app.listen(port, () => {
  console.log(`[server]: Server is running with port ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("[server]: Server is closed");
  });
});
