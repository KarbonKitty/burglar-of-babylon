class Time {
    time = 0x7fffffff * 1000;

    tick(deltaT: number) {
        this.time += deltaT;
    }
}

export const time = new Time();
