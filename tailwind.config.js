const theme = require("./config/theme.json");
const { nextui } = require("@nextui-org/react");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	screens: {
  		sm: '540px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	container: {
  		center: true,
  		padding: '2rem'
  	},
  	extend: {
  		fontFamily: {
  			sans: ["var(--font-instrument-sans)", "Instrument Sans", "system-ui", "sans-serif"],
  			serif: ["var(--font-instrument-serif)", "Instrument Serif", "Georgia", "serif"],
  			body: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
  			"instrument-serif": ["var(--font-instrument-serif)", "Instrument Serif", "Georgia", "serif"],
  			manrope: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
  			"instrument-sans": ["var(--font-instrument-sans)", "Instrument Sans", "system-ui", "sans-serif"],
  			primary: ["var(--font-instrument-sans)", fontPrimary, fontPrimaryType].filter(Boolean),
  			secondary: [fontSecondary, fontSecondaryType].filter(Boolean),
  			mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
  		},
  		colors: {
  			text: theme.colors.default.text_color.default,
  			light: theme.colors.default.text_color.light,
  			dark: theme.colors.default.text_color.dark,
  			primary: {
  				DEFAULT: theme.colors.default.theme_color.primary,
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			body: theme.colors.default.theme_color.body,
  			border: theme.colors.default.theme_color.border,
  			'theme-light': theme.colors.default.theme_color.theme_light,
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			base: font_base + "px",
  			h1: h1 + "rem",
  			'h1-sm': h1 * 0.8 + "rem",
  			h2: h2 + "rem",
  			'h2-sm': h2 * 0.8 + "rem",
  			h3: h3 + "rem",
  			'h3-sm': h3 * 0.8 + "rem",
  			h4: h4 + "rem",
  			h5: h5 + "rem",
  			h6: h6 + "rem"
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			aurora: "aurora 60s linear infinite",
  		},
  		keyframes: {
  			aurora: {
  				from: {
  					backgroundPosition: "50% 50%, 50% 50%",
  				},
  				to: {
  					backgroundPosition: "350% 50%, 350% 50%",
  				},
  			},
  		},
  	}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({ generateContainer: false }),
    nextui(),
    require("tailwindcss-animate"),
    addVariablesForColors,
],
  // important: true,
};
