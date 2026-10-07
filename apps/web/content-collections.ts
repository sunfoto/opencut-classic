import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const changelog = defineCollection({
	name: "changelog",
	directory: "src/lib/changelog/entries",
	include: "*.md",
	schema: z.object({
		content: z.string(),
		version: z.string(),
		date: z.string(),
		published: z.boolean().default(true),
		title: z.string(),
		description: z.string().optional(),
		summary: z.string().optional(),
		changes: z.array(
			z.object({
				type: z.string(),
				text: z.string(),
			}),
		),
	}),
	transform: async (doc) => {
		// Removed deadlock-inducing collection.documents() call
		const isLatest = false; // or handle this logic elsewhere
		return { ...doc, isLatest };
	},
});

export default defineConfig({
	content: [changelog],
});
