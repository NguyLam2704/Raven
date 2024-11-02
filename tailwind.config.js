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
      backgroundImage:{
        'login': "url('https://cdn.discordapp.com/attachments/1301740215270113283/1301740499593330759/ang_nhap.png?ex=672593d0&is=67244250&hm=399c19adf54a34a125a47965f359c5042925ad31b0a00dd256a65d6ecfd6593e&')"
      },
    },
  },
  plugins: [],
}