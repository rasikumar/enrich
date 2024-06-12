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
        extend: {
            boxShadow: {
                '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            },
            backgroundImage:{
                'Hero' : "url('/src/assets/hero.png')"
            }
        },
    },
    variants: {
        extend: {
            scale: ['hover'],
        },
    },
    plugins: [],
}