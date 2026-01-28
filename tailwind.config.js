/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        elegant: {
          bg: '#0f0f1e',
          surface: '#1a1a2e',
          card: 'rgba(26, 26, 46, 0.6)',
          border: 'rgba(139, 92, 246, 0.2)',
          purple: {
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
          },
          blue: {
            500: '#3b82f6',
            600: '#2563eb',
          },
          pink: {
            500: '#ec4899',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-elegant': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-mesh': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #667eea 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
