import * as core from '@actions/core';
import { Calver } from './calver';

async function run(): Promise<void> {
  try {
    let currentVersion: string = core.getInput('current_version');
    const newVersion = new Calver(currentVersion).inc().toString();
    core.setOutput('new_version', newVersion);
  } catch (e: any) {
    console.log(e);
    core.error(e);
    core.setFailed(e.message);
  }
}

run();
