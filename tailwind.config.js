/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        cobalt: {
          DEFAULT: '#1351A8',
          primary: '#1351A8',
          bright: '#2563EB',
          dark: '#0A1738',
          elevated: '#0F2354'
        },
        darkBg: '#050B18',
        cyanAccent: '#38BDF8',
        goldAccent: '#F59E0B',
        emeraldAccent: '#10B981'
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 30px rgba(56, 189, 248, 0.4)',
        cobalt: '0 16px 45px rgba(0, 0, 0, 0.7), 0 0 35px rgba(37, 99, 235, 0.25)'
      }
    }
  },
  plugins: []
};
