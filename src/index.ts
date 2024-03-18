import {
    getInput,
    setOutput,
    error as actionError,
    setFailed,
} from '@actions/core';
import { Calver } from './calver';

function run(): void {
    try {
        const currentVersion = getInput('current_version');

        const newVersion = new Calver(currentVersion).inc().toString();

        console.log(`Current version: ${currentVersion}`);
        console.log(`New version: ${newVersion}`);

        setOutput('new_version', newVersion);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);

            actionError(error);

            setFailed(error.message);
        }
    }
}

run();
