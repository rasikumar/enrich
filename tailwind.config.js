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
            },
            backgroundImage:{
                'Hero' : "url('/src/assets/hero/4.png')"
            },
            fontFamily:{
                reggae:['Reggae One','system-ui'],
            },
        },
    },
    variants: {
        extend: {
            scale: ['hover'],
        },
    },
    plugins: [],
}