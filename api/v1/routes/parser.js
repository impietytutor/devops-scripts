Here's the refactored and improved code:

```javascript
const fs = require('fs');
const path = require('path');

function parseFile(file) {
    const config = {};
    
    if (!fs.existsSync(file)) {
        return config;
    }

    try {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('#') || trimmedLine === '') {
                continue;
            }

            const [key, ...valueParts] = trimmedLine.split('=');
            const value = valueParts.join('=').trim();

            if (key && value) {
                config[key.trim()] = value;
            }
        }
    } catch (error) {
        console.error(`Error parsing file ${file}:`, error);
    }

    return config;
}

function parseConfig(file) {
    return parseFile(file);
}

function parseDeployConfig(file) {
    return parseFile(file);
}

function getDependencies(deployConfig) {
    const dependencies = {};

    for (const [key, value] of Object.entries(deployConfig)) {
        const depMatch = value.match(/<(.*?)>/);
        if (depMatch) {
            dependencies[key] = depMatch[1];
        }
    }

    return dependencies;
}

function getDependencyVersions(dependencies) {
    const versions = {};

    for (const [key, dep] of Object.entries(dependencies)) {
        const versionMatch = dep.match(/(.*?)@([0-9.]+)/);
        if (versionMatch) {
            versions[key] = versionMatch[2];
        }
    }

    return versions;
}

module.exports = {
    parseConfig,
    parseDeployConfig,
    getDependencies,
    getDependencyVersions,
};
```