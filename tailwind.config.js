/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/index.jsx",    
    "./pages/auth/signin.jsx",    
    "./components/header.jsx",
    "./components/feeds/feed.jsx",
    "./components/feeds/miniPorfile.jsx",
    "./components/feeds/suggestions.jsx",
    "./components/feeds/stories.jsx",
    "./components/feeds/story.jsx",
    "./components/feeds/posts.jsx",
    "./components/feeds/post.jsx",
    "./components/modal.jsx",

    "./pages/coutertest/recoiltest.jsx",
    "./pages/coutertest/counterbtn.jsx",


    "./pages/testfirebase.jsx",
    
    
  ],
  theme: {
    extend: {
      fontFamily: {
        'Lobster': ['"Lobster Two"', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}
