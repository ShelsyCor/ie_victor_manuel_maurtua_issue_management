import express from "express";
import cors from "cors";
import { ISSUE_MESSAGE, processQuestion } from "./question-processor.js";
import { registerIssue } from "./issue-register.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
	const question = req.body.question;
	const answer = await processQuestion(question);
	if (answer === ISSUE_MESSAGE)
		registerIssue(question);
	res.json({ answer });
});

app.set("PORT", 3009);
app.listen(app.get("PORT"), () => {
	console.log(`Listen on http://localhost:${app.get("PORT")}`);
});
