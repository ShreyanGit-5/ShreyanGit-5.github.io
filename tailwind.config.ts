import type { Config } from "tailwindcss";

export default {
  // Removed darkMode: ["class"]
  content: [
    "./client/index.html", 
    "./client/src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      // Set Inter as the primary font for both sans-serif and headings
      sans: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Inter', 'system-ui', 'sans-serif'], // Use Inter for headings too
      mono: ['Fira Code', 'ui-monospace', 'monospace'], // Keep mono font
    },
    screens: { // Keep screen sizes
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      borderRadius: { // Keep extended border radius but base components will use the CSS var --radius
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': 'var(--radius)', // Default to CSS variable
        'md': '0.5rem',
        'lg': '0.75rem', // Matches the new --radius default
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      boxShadow: { // Define shadows suitable for a dark theme
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.15)', // Slightly darker shadows
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.35), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        'none': 'none',
        // Remove specific dark-* shadows
      },
      spacing: { // Keep existing spacing scale
        '0': '0', '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem', '5': '1.25rem', '6': '1.5rem', '8': '2rem', '10': '2.5rem', '12': '3rem', '16': '4rem', '20': '5rem', '24': '6rem', '32': '8rem', '40': '10rem', '48': '12rem', '56': '14rem', '64': '16rem', '72': '18rem', '80': '20rem', '96': '24rem',
      },
      fontSize: { // Keep existing font size scale
        'xs': ['0.75rem', { lineHeight: '1rem' }], 'sm': ['0.875rem', { lineHeight: '1.25rem' }], 'base': ['1rem', { lineHeight: '1.5rem' }], 'lg': ['1.125rem', { lineHeight: '1.75rem' }], 'xl': ['1.25rem', { lineHeight: '1.75rem' }], '2xl': ['1.5rem', { lineHeight: '2rem' }], '3xl': ['1.875rem', { lineHeight: '2.25rem' }], '4xl': ['2.25rem', { lineHeight: '2.5rem' }], '5xl': ['3rem', { lineHeight: '1' }], '6xl': ['3.75rem', { lineHeight: '1' }], '7xl': ['4.5rem', { lineHeight: '1' }], '8xl': ['6rem', { lineHeight: '1' }], '9xl': ['8rem', { lineHeight: '1' }],
      },
      colors: {
        // Map theme colors directly to CSS variables
        background: "rgb(var(--background))", // Use rgb() for Tailwind JIT
        foreground: "rgb(var(--foreground))",
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        // Include the specific colors from the palette
        'electric-blue': 'rgb(var(--color-electric-blue))',
        'dark-bg': 'rgb(var(--color-dark-bg))',
        'light-text': 'rgb(var(--color-light-text))',
        'secondary-text': 'rgb(var(--color-secondary-text))',
        'ui-grey': 'rgb(var(--color-ui-grey))',
        // Keep the cream color utility
        cream: {
          DEFAULT: "rgb(var(--color-cream))",
          5: "rgba(var(--color-cream) / 0.05)", // Use rgba for opacity
          10: "rgba(var(--color-cream) / 0.1)",
          20: "rgba(var(--color-cream) / 0.2)",
          // ... keep other cream shades if needed
          100: "rgb(var(--color-cream))"
        },
        // Keep other color definitions if necessary (gray, status colors etc.)
        // but remove palettes that are no longer needed (e.g., primary/secondary/accent scales)
        gray: { /* ... keep gray scale ... */
          50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827", 950: "#030712",
        },
        success: { 
          50: "#ecfdf5", 100: "#d1fae5", 500: "#10b981", 700: "#047857", 
        },
         warning: {
          50: "#fffbeb", 100: "#fef3c7", 500: "#f59e0b", 700: "#b45309",
         },
         error: { 
          50: "#fef2f2", 100: "#fee2e2", 500: "#ef4444", 700: "#b91c1c", 
         },
         info: { 
          50: "#eff6ff", 100: "#dbeafe", 500: "#3b82f6", 700: "#1d4ed8",
         }
      },
      keyframes: { // Keep keyframes
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        // Add other custom keyframes if needed for scroll animations later
        "fade-in-up": { /* Defined in index.css example */ },
        "ripple": { /* Define ripple animation keyframes */ },
        "slide-in-left": { /* Define slide-in keyframes */ },
        "glow-pulse": { /* Define glow pulse keyframes */ },
      },
      animation: { // Keep animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Add other custom animations
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "ripple": "ripple 1.5s linear infinite",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "glow-pulse": "glow-pulse 2s infinite ease-in-out",
      },
      maxWidth: { // Keep max width utils
        '1/4': '25%', '1/3': '33.333333%', '1/2': '50%', '2/3': '66.666667%', '3/4': '75%', 'prose': '65ch',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
