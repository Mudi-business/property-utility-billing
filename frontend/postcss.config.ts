const tailwindcss = require('tailwindcss');

module.exports = {
    plugins:[
        tailwindcss('./tailwind.config.ts'),require('autoprefixer')
    ]
}