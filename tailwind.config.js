/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Nepal-inspired sophisticated color palette
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Nepal-specific color system
        nepal: {
          blue: {
            50: "hsl(220, 100%, 97%)",
            100: "hsl(220, 95%, 92%)",
            200: "hsl(220, 90%, 84%)",
            300: "hsl(220, 85%, 74%)",
            400: "hsl(220, 80%, 62%)",
            500: "hsl(220, 75%, 50%)",
            600: "hsl(220, 70%, 42%)",
            700: "hsl(220, 65%, 34%)",
            800: "hsl(220, 60%, 26%)",
            900: "hsl(220, 55%, 18%)",
            950: "hsl(220, 50%, 12%)",
          },
          red: {
            50: "hsl(355, 100%, 97%)",
            100: "hsl(355, 95%, 92%)",
            200: "hsl(355, 90%, 84%)",
            300: "hsl(355, 85%, 74%)",
            400: "hsl(355, 80%, 62%)",
            500: "hsl(355, 75%, 50%)",
            600: "hsl(355, 70%, 42%)",
            700: "hsl(355, 65%, 34%)",
            800: "hsl(355, 60%, 26%)",
            900: "hsl(355, 55%, 18%)",
            950: "hsl(355, 50%, 12%)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "vote-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "vote-success": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "vote-pulse": "vote-pulse 2s ease-in-out infinite",
        "vote-success": "vote-success 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
