
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screen: {
            'ra': { 'max': '639px' },
        },
        theme:{
            'auto':'auto',
            'cover':'cover',
            'contain':'contain',
            '50%':'50%',
            '16' : '4rem',
            
        },
        extend: {
            dropShadow:{
                '4xl':'7px 6px 28px #b3b3b3',
            },
            boxShadow: {
                '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
                'custom': '4px 4px 30px rgba(0, 0, 0, 0.1)',
            },
            backdropBlur: {
                'custom': '2px',
              },
              borderRadius: {
                'custom': '16px',
              },
              colors: {
                'custom-white': 'rgba(255, 255, 255, 1)',
                'custom-border': 'rgba(255, 255, 255, 0.3)',
              },
            backgroundImage:{
                'Hero' : "url('/src/assets/hero/heroBg.png')"
            },
            fontFamily:{
                reggae:['Reggae One','system-ui'],
            },
            keyframes:{
              marquee:{
                '0%':{transform:'translateX(100%)'},
                '100%':{transform : 'translateX(-100%)'},
              },
            },
            animation:{
              marquee:'marquee 15s linear infinite'
            }
        },
    },
    variants: {
        extend: {
            scale: ['hover'],
        },
    },
    plugins: [
        function({ addUtilities }) {
          const newUtilities = {
            '.backdrop-filter': {
              'backdrop-filter': 'blur(5px)',
              '-webkit-backdrop-filter': 'blur(5px)',
            },
          }
          addUtilities(newUtilities)
        }
      ],
}