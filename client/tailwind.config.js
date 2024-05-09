/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  daisyui: {
    themes: [
      'light',
      'forest',
      {
        mytheme: {
          primary: '#006200',
          secondary: '#fcfcfc',
          accent: '',
          neutral: '#19362D',
          'base-100': '#dae2df',
          'base-300': '#b5cbbb',
          info: '#008ddf',
          success: '#7ed946',
          warning: '#ff9b00',
          error: '#fe4f6f',
        },
      },
    ],
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
      spacing: {
        128: '32rem',
        144: '36rem',

        //generate more
      },
      screens: {
        xs: '400px',
        xm: '850px',
      },
      colors: {
        darkGray: '#121212',
        mainGreen: '#003e29',
        secondaryGreen: '#016346',
        lightGreen: '#467061',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {},
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            visible: 'hidden',
          },
        },
        fadeInBottom: {
          '0%': {
            opacity: '0',
            transform: 'translateY(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scroll: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '90%': {
            transform: 'translateY(300%)',
          },
          '100%': { opacity: '0' },
        },
        pingPong: {
          '0%': {
            transform: 'translateX(-400%)',
          },
          '50%': {
            transform: 'translateX(400%)',
          },
          '100%': {
            transform: 'translateX(-400%)',
          },
        },
        shake: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(-5deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
          '75%': {
            transform: 'rotate(5deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
        wave: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(-20deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
        fadeInTop: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        fadeInBottom: 'fadeInBottom 1s ease-in',
        fadeIn: 'fadeIn 0.2s ease-in',
        fadeOut: 'fadeOut 0.5s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        text: 'text 5s ease infinite',
        scroll: 'scroll 1.5s ease-in infinite',
        pingPong: 'pingPong 5s ease-in-out infinite',
        shake: 'shake 1s ease-in infinite',
        wave: 'wave 1s ease-in-out infinite',
        fadeInTop: 'fadeInTop 1s ease-in',
      },
    },
  },
  plugins: [daisyui],
};
export const plugins = [tailwindcssAnimate];
