module.exports = {
    apps: [
        {
            name: 'mixel-dashboard',
            script: 'websitestart.sh',
            cwd: '.',
            instances: 1,
            exec_mode: 'fork',
            watch: true,
            autorestart: true,
        },
    ],
};
