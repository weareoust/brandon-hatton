module.exports = {
  theme: {
    fontFamily: {
      body: ['titling-gothic-fb-narrow','sans-serif'],
      heading: ['titling-gothic-fb','sans-serif'],
      display: ['monotype-modern-display','sans-serif']
    },
    extend: {
      colors: {
        'black': '#231420',
        'black-transparent': 'rgba(35, 20, 32, 0.7)',
        'white': '#FFFFFF',
        'orange': '#F04720',
        'purple': '#E93391',
        'bg-gray': '#E5E6E3',
        'sidebar-gray': '#F4F5F4',
        'dark-gray': '#2F2F2F'
      }
    }
  },
  variants: {
    borderWidth: ['responsive', 'first', 'hover', 'focus'],
  },
  plugins: []
}