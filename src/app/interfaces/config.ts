export interface IConfig {
    value: string;
}

export class HostConfig implements IConfig {
    value: string;

    constructor() { this.value = 'host'; }
}

export class SharedConfig implements IConfig {
    value: string;

    constructor() { this.value = 'Shared'; }
}
