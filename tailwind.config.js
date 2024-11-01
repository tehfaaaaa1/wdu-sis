import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            colors: {
                primary: "#5EB54D",
                secondary: "#027DC0",
                'biru-gelap': "#006da8",
                "ijo-terang": "#6FD358",
                "ijo-gelap": "#54a145",
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            spacing: {
                330: "21.875rem",
            },
            listStyleType: {
                none: 'none',
                disc: 'disc',
                decimal: 'decimal',
                square: 'square',
            },
            gridTemplateRows: {
                // Simple 13 row grid
                '13': 'repeat(13, minmax(0, 1fr))',
            },
            borderWidth: {
                '6': '6px',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-bullets': theme('colors.black'),
                        li: {
                            p: {
                                margin: 0
                            }
                        },
                        p: {
                            margin: 0,
                            color: theme('colors.black')
                        },
                        h1: {
                            margin: 0
                        },
                        h2: {
                            margin: 0
                        },
                        h3: {
                            margin: 0
                        },
                    }
                }
            }),
        },
    },

    plugins: [forms, typography],
};
