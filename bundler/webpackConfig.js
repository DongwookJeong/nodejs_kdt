const path = require("path")

module.exports = {
  mode:"none",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    // path.join(__dirname, "경로/파일") : 상대경로 처리
    // path.resolve(__dirname, "경로/파일") : 절대경로 처리
    filename:"./src/index.bundle.js",
  }
}