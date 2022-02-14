export class Calver {
  private year: string;
  private month: string;
  private index: number;
  private hasVPrefix: boolean;

  constructor(currentVersion: string) {
    const arr: string[] = currentVersion.split('.');
    const year = arr[0].replace(/^v/, '');
    const month = arr[1];
    const index = arr[2];
    if (
      !/[0-9]{2}/.test(year) ||
      !/(0[1-9]|1[1-2])/.test(month) ||
      isNaN(Number(index))
    ) {
      throw new Error(`${currentVersion} is not a valid calver`);
    }
    this.year = year;
    this.month = month;
    this.index = Number(index);
    this.hasVPrefix = currentVersion.startsWith('v') ? true : false;
  }

  toString(): string {
    let output = `${this.year}.${this.month}.${this.index}`;
    if (this.hasVPrefix) {
      output = 'v' + output;
    }
    return output;
  }

  inc(): Calver {
    const now = new Date();
    if (
      String(now.getFullYear()).endsWith(this.year) &&
      now.getMonth() + 1 == Number(this.month)
    ) {
      this.index += 1;
    } else {
      this.year = String(now.getFullYear()).slice(-2);
      this.month = String('0' + (Number(now.getMonth()) + 1)).slice(-2);
      this.index = 0;
    }
    return this;
  }
}
