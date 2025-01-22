import { Mistral } from "@mistralai/mistralai";
import knowledge from "../knowledge.json" assert { type: "json" };
import { config } from "dotenv";

config();

const mistral = new Mistral({
	apiKey: process.env.MISTRAL_API_KEY,
});

export const ISSUE_MESSAGE = "No conozco detalles, pero lo registraré como incidencia.";

export async function processQuestion(question) {
	const result = await mistral.chat.complete({
		model: "mistral-small-latest",
		stream: false,
		maxTokens: 50,
		messages: [
			{
				content: question,
				role: "user",
			},
			{
				role: "system",
				content: `Considera estas preguntas y respuestas para atender las preguntas del usuario: ${JSON.stringify(
					knowledge
				)}`,
			},
			{
				role: "system",
				content: `Actúa como un chatbot; si las preguntas no se pueden responder con base en la lista de preguntas y respuestas, debes responder: "${ISSUE_MESSAGE}"; si escriben algo que no tiene que ver con el colegio I.E. Victor Manuel Maurtua, responde: "Lo siento, no logro entender tu pregunta.".`,
			},
		],
	});
	return result.choices[0].message.content;
}
