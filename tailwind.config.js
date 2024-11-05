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
        'login': "url('https://cdn.discordapp.com/attachments/1301740215270113283/1301740499593330759/ang_nhap.png?ex=67298850&is=672836d0&hm=0fc1f723d8f7a3cc53f9a1373d887a69846d6953b45012c64c57cde0b1a29748&')"
      },
    },
  },
  plugins: [],
}