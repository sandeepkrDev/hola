const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "./.env") });

module.exports = () => [
  {
    "path": "/backend/storage/upload",
    "size_in_mb": process.env.MAX_UPLOAD_SIZE || 100,
    "proxy": {
      "instance": "storage:9090",
      "path": "/upload",
    },
  },
  {
    "path": "/backend/storage/file/(.*)",
    "host_scheme": process.env.MINIO_PORT === "443" ? "https" : "http",
    "host": `${process.env.MINIO_ADMIN_END_POINT}:${process.env.MINIO_PORT}`,
    "proxy": {
      "instance": `${process.env.MINIO_ADMIN_END_POINT}:${process.env.MINIO_PORT}`,
      "path": "/$1",
    },
  },
];
