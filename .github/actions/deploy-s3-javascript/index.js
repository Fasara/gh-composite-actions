import * as core from '@actions/core';
import * as github from '@actions/github';
import { exec } from '@actions/exec';

async function run() {
    // Get inputs
    const bucket =core.getInput('bucket-name', { required: true });
    const region = core.getInput('region', { required: true });
    const distPath = core.getInput('dist-path', { required: true });
    const s3Uri = `s3://${bucket}`;

    // Upload files
    process.env.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
    process.env.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
    await exec.exec(`aws s3 sync ${distPath} ${s3Uri} --region ${region}`);

}

run();