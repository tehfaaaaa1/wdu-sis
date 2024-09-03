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
                "ijo-terang": "#6FD358",
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
              }
        },
    },

    plugins: [forms, typography],
};
