const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");

const s3_client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
});

const PROJECT_ID = process.env.PROJECT_ID;

async function init() {
  console.log("executing script file");
  const output_dir = path.join(__dirname, "output");

  const p = exec(`cd ${output_dir} && npm install && npm run build`);

  p.stdout.on("data", function (data) {
    console.log(data.toString());
  });

  p.stdout.on("error", function (error) {
    console.log("Error : ", error.toString());
  });

  p.on("close", async function () {
    console.log("Build Completed");
    const build_dir = path.join(__dirname, "output", "dist");
    const build_dir_contents = fs.readdirSync(build_dir, { recursive: true });

    console.log("Started uploading files in s3");
    for (const file of build_dir_contents) {
      const file_path = path.join(build_dir, file)
      if (fs.lstatSync(file_path).isDirectory()) continue;
      
      console.log(`Uploading ${file_path}`)

      const command = new PutObjectCommand({
        Bucket: "versel-clone-sss-bucket",
        Key: `outputs/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(file_path),
        ContentType: mime.lookup(file_path),
      });

      await s3_client.send(command);

      console.log(`Uploaded ${file_path}`)
    }
    console.log("Files are uploaded");
  });
}

init()