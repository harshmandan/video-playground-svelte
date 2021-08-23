import fs from "fs";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import windicss from "vite-plugin-windicss";
import path from "path";
const { dependencies } = JSON.parse(fs.readFileSync("./package.json"));

export default {
	extensions: [".svelte"],
	preprocess: [
		preprocess({
			preserve: ["ld+json"],
		}),
	],

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$src: path.resolve("src"),
					$assets: path.resolve("src/assets"),
					$components: path.resolve("src/components"),
					$utils: path.resolve("src/utils"),
				},
			},
			ssr: {
				noExternal: Object.keys(dependencies || {}),
			},
			plugins: [windicss.default({ transformCSS: "pre" })],
		},
	},
};
