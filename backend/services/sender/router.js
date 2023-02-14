module.exports = () => [
  {
    "path": "/backend/sender/(.*)",
    "proxy": {
      "instance": "sender:3500",
      "path": "/v1.0/invoke/sender/method/$1"
    }
  }
];
