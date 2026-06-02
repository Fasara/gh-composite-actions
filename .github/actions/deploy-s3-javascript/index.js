import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    try {
    core.info('Deploying to AWS S3 bucket...');
    } catch (error) {
        core.setFailed(error instanceof Error ? error.message : String(error));
    }
}

run();