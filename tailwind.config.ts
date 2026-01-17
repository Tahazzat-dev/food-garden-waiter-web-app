// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/sharedComponents/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                "primary-500": "var(--primary-500)",
                secondary: "var(--secondary)",
                "secondary-500": "var(--secondary-500)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                "clr-bg-body": "var(--clr-bg-body)",
                "clr-text-body": "var(--clr-text-body)",
                'clr-card': "var(--card-bg)",
            },
        },
    },
    plugins: [],
};

export default config;
