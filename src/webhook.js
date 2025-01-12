const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

// Docker 배포 웹훅 라우트
router.post("/webhook", (req, res) => {
    console.log("Webhook received:", req.body);

    exec(
        `
        docker pull hknhj/todoapp:latest &&
        docker stop todoapp || true &&
        docker run -d --rm --name todoapp --env-file /home/ubuntu/TodoAPP/.env -p 3000:3000 hknhj/todoapp:latest
        `,
        (error, stdout, stderr) => {
            if (error) {
                console.error("Error during deployment:", stderr);
                return res.status(500).send("Deployment failed");
            }
            console.log("Deployment output:", stdout);
            res.status(200).send("Deployment succeeded");
        }
    );
});

module.exports = router;
