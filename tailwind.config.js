tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#5e17eb',
                secondary: '#8c52ff',
                accent: '#ff66c4',
            },
            fontFamily: {
                heading: ['"Oswald"', 'sans-serif'],
                body: ['"Poppins"', 'sans-serif'],
                script: ['"Rouge Script"', 'cursive'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-reverse': 'float-reverse 8s ease-in-out infinite',
                'float-slow': 'float-slow 10s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'float-reverse': {
                    '0%, 100%': { transform: 'translateY(-10px)' },
                    '50%': { transform: 'translateY(10px)' },
                },
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
            }
        }
    }
}