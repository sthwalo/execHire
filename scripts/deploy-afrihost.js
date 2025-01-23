const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: __dirname + "/../out",
  remoteRoot: "/public_html",
  include: ["*", "**/*"],
  exclude: [
    "node_modules/**",
    ".git/**",
    ".env*",
    "package.json",
    "README.md"
  ],
  deleteRemote: false,
  forcePasv: true
};

ftpDeploy
  .deploy(config)
  .then(res => console.log("Deploy completed:", res))
  .catch(err => console.log(err));
