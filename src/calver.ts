export class Calver {
    private year: string;

    private month: string;

    private index: number;

    private hasVPrefix: boolean;

    constructor(currentVersion: string) {
        const array = currentVersion.split('.');
        const year = array[0].replace(/^v/, '');
        const month = array[1];
        const index = array[2];

        if (
            !/\d{2}/.test(year)
            || !/(0[1-9]|1[0-2])/.test(month)
            || Number.isNaN(Number(index))
        ) {
            throw new Error(`${currentVersion} is not a valid calver`);
        }
        this.year = year;
        this.month = month;
        this.index = Number(index);
        this.hasVPrefix = !!currentVersion.startsWith('v');
    }

    toString(): string {
        const output = `${this.year}.${this.month}.${this.index}`;

        return this.hasVPrefix ? `v${output}` : output;
    }

    inc(): Calver {
        const now = new Date();

        if (
            String(now.getFullYear()).endsWith(this.year)
            && now.getMonth() + 1 === Number(this.month)
        ) {
            this.index += 1;
        } else {
            this.year = String(now.getFullYear()).slice(-2);
            this.month = String(`0${Number(now.getMonth()) + 1}`).slice(-2);
            this.index = 0;
        }

        return this;
    }
}
