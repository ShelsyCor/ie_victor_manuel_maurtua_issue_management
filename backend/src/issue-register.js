import axios from "axios";

const { JIRA_API_WORKSPACE_URL, JIRA_EMAIL, JIRA_TOKEN, JIRA_PROJECT_ID } = process.env;
let identity = 1;
export async function registerIssue(issue) {
	const basicAuthKey = btoa(`${JIRA_EMAIL}:${JIRA_TOKEN}`);
	try {
		await axios.post(
			JIRA_API_WORKSPACE_URL,
			{
				fields: {
					project: { key: JIRA_PROJECT_ID },
					summary: `Incidencia ${identity}: ${issue}`,
					description: {
						type: "doc",
						version: 1,
						content: [
							{
								type: "paragraph",
								content: [
									{
										type: "text",
										text: issue,
									},
								],
							},
						],
					},
					issuetype: { name: "Task" },
				},
			},
			{
				headers: {
					Authorization: `Basic ${basicAuthKey}`,
					"Content-Type": "application/json",
				},
			}
		);
		identity++;
	} catch (err) {
		console.error("Register issue error:", err?.response?.data);
	}
}
