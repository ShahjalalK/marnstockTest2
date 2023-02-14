/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/index.jsx",
    "./pages/accounts/loginComponents.jsx",
    "./pages/accounts/login.jsx",
    "./pages/accounts/signup.jsx",
    "./pages/profile/[id].jsx",
    "./pages/editprofile/[id].jsx",
    "./pages/test.jsx",
    "./pages/navbar.jsx",
    "./pages/navbar2.jsx",
    "./pages/layout.jsx",
    "./pages/components/create.jsx",
    
    
  ],
  theme: {
    extend: {
      fontFamily: {
        'Lobster': ['"Lobster Two"', 'cursive'],
      },
    },
  },
  plugins: [],
}
