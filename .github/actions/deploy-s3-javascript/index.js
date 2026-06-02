import * as core from '@actions/core';
import * as github from '@actions/github';
import * as exec from '@actions/exec';

async function run() {
    // Get inputs
    const bucket =core.getInput('bucket-name', { required: true });
    const region = core.getInput('region', { required: true });
    const distPath = core.getInput('dist-path', { required: true });
    const s3Uri = `s3://${bucket}`;

    // Upload files
    await exec.exec(`aws s3 sync ${distPath} ${s3Uri} --region ${region}`);

    const websiteUrl = `http://${bucket}.s3-website-${region}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl);

}

run();