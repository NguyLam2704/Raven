/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    './resources/**/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      keyframes: {
        fly: {
          '0%': { transform: 'translateX(calc(100vw - 240px)) translateY(0)', visibility: 'visible' },
          '25%': { transform: 'translateX(calc(75vw - 240px)) translateY(-20px)', visibility: 'visible' },
          '50%': { transform: 'translateX(calc(50vw - 240px)) translateY(10px)', visibility: 'visible' },
          '75%': { transform: 'translateX(calc(25vw - 240px)) translateY(-15px)', visibility: 'visible' },
          '85%': { transform: 'translateX(calc(15vw - 240px)) translateY(5px)', visibility: 'hidden' }, // Khi con chim tiếp cận sidebar
          '100%': { transform: 'translateX(-200px) translateY(0)', visibility: 'hidden' }, // Con chim biến mất
        },
      },
      animation: {
        fly: 'fly 12s linear infinite',
      },
      screens: {
        'mobile': '0px',
  
        'ipad': '768px',
  
        'desktop': '1280px',
      },
    },
  },
  plugins: [
  ],
}