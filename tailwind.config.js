// function withOpacityValue(variableName) {
//   return ({ opacityValue }) => {
//     if (opacityValue) {
//       return `hsla(var(${variableName}), ${opacityValue})`;
//     }
//     return `hsl(var(${variableName}))`;
//   };
// }

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/animations/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        20: 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
