const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");
const Redis = require("ioredis");

const publisher = new Redis(
  `rediss://default:${process.env.REDIS_PASSWORD}@caching-1529a761-sandipan-050b.g.aivencloud.com:24119`
);

const s3_client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

const PROJECT_ID = process.env.PROJECT_ID;

function publishLog(log) {
  publisher.publish(`logs:${PROJECT_ID}`, JSON.stringify({ log }));
}

async function init() {
  console.log("executing script file");
  const output_dir = path.join(__dirname, "output");

  publishLog("Build Started");
  const p = exec(`cd ${output_dir} && npm install && npm run build`);

  p.stdout.on("data", function (data) {
    console.log(data.toString());
    publishLog(data.toString());
  });

  p.stdout.on("error", function (error) {
    console.log("Error : ", error.toString());
    publishLog(error.toString());
  });

  p.on("close", async function () {
    console.log("Build Completed");
    publishLog("Build Completed");
    const build_dir = path.join(__dirname, "output", "dist");
    const build_dir_contents = fs.readdirSync(build_dir, { recursive: true });

    console.log("Started uploading files in s3");
    publishLog("Deployment Started");
    for (const file of build_dir_contents) {
      const file_path = path.join(build_dir, file);
      if (fs.lstatSync(file_path).isDirectory()) continue;

      console.log(`Uploading ${file_path}`);
      publishLog(`Uploading ${file_path}`);

      const command = new PutObjectCommand({
        Bucket: "versel-clone-sss-bucket",
        Key: `outputs/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(file_path),
        ContentType: mime.lookup(file_path),
      });

      await s3_client.send(command);

      console.log(`Uploaded ${file_path}`);
      publishLog(`Uploaded ${file_path}`);
    }
    console.log("Files are uploaded");
    publishLog("Done...");
  });
}

init();
