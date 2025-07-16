const path = require('path');
const tsconfigPaths = require('tsconfig-paths-jest');

const tsconfigPath = path.resolve(__dirname, '../tsconfig.json');
console.log('Resolved tsconfig path:', tsconfigPath);

try {
    const resolver = tsconfigPaths({ tsconfigPath });
    console.log('Resolver created successfully');
    module.exports = resolver;
} catch (error) {
    console.error('Error creating resolver:', error);
    throw error;
}
