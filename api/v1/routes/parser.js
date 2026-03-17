const fs = require('fs');
const path = require('path');

function parseConfig(file) {
    const config = {};

    if (!fs.existsSync(file)) {
        return config;
    }

    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    for (const line of lines) {
        if (line.startsWith('#') || line.trim() === '') {
            continue;
        }

        const [key, value] = line.split('=');

        if (key && value) {
            config[key.trim()] = value.trim();
        }
    }

    return config;
}

function parseDeployConfig(file) {
    const config = {};

    if (!fs.existsSync(file)) {
        return config;
    }

    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    for (const line of lines) {
        if (line.startsWith('#') || line.trim() === '') {
            continue;
        }

        const [key, value] = line.split('=');

        if (key && value) {
            config[key.trim()] = value.trim();
        }
    }

    return config;
}

function getDependencies(deployConfig) {
    const dependencies = {};

    for (const key in deployConfig) {
        const value = deployConfig[key];

        const depMatch = value.match(/<(.*)>/);

        if (depMatch) {
            dependencies[key] = depMatch[1];
        }
    }

    return dependencies;
}

function getDependencyVersions(dependencies) {
    const versions = {};

    for (const key in dependencies) {
        const dep = dependencies[key];

        const versionMatch = dep.match(/(.*)@([0-9.]+)/);

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