import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdGenerator } from './Helpers';

export class Runner<T> {
    private old: Running<T>[] = [];
    private running: Running<T>;
    private queue: Running<T>[] = [];

    constructor(private runnable: Runnable<T>, private autostart: boolean = true, private max: number = 100) {

    }

    hasItems(): boolean {
        return this.running != undefined || this.queue.length > 0;
    }

    getQueue(): Running<T>[] {
        return this.queue;
    }

    getOld(): Running<T>[] {
        return this.old;
    }

    getCurrent(): Running<T> {
        return this.running;
    }

    addToQueue(value: T): Promise<QueueResponse> {
        return this.add(value, this.autostart);
    }

    setAutostart(autostart: boolean) {
        this.autostart = autostart;
        if (autostart) {
            this.verifyQueue();
        }
    }

    start() {
        this.autostart = true;
        this.verifyQueue();
    }

    stop() {
        this.autostart = false;
        this.cancelCurrent();
    }

    private isCurrent(value: Running<T>): boolean {
        return this.running != undefined && this.running.id == value.id;
    }

    private add(value: T, b: boolean): Promise<QueueResponse> {
        return new Promise<QueueResponse>((resolve, reject) => {
            if (this.max == this.queue.length) {
                reject({
                    message: 'Não é possível adicionar mais itens a fila!'
                });
            } else {
                const nRun: Running<T> = {
                    id: IdGenerator.getUniqueId(),
                    value: value,
                    status: RunnableStatus.WAITING,
                    remove: () => {
                        if (this.isCurrent(nRun)) {
                            this.cancelCurrent();
                        } else {
                            this.queue = this.queue.filter((v) => v.id != nRun.id);
                        }
                    }
                };
                this.queue.push(nRun);
                if (b) {
                    this.verifyQueue();
                }
                resolve({
                    message: 'Item adicionado a lista com sucesso!'
                });
            }
        });
    }

    private verifyQueue() {
        if (this.autostart && this.shouldExecuteNext()) {
            if (this.running != undefined) {
                this.old.unshift(this.running);
            }

            this.running = this.queue.shift();
            this.running.subscription = this.runnable
                .run(this.running.value)
                .subscribe((run: RunningStatus<T>) => {
                    this.running.status = run.status;
                    this.running.value = run.value;
                    if (run.status == RunnableStatus.FINISHED) {
                        this.finish();
                    }
                });
        }
    }

    public cancelCurrent() {
        const value = this.running.value;
        this.runnable.cancel(value);
        this.running.subscription.unsubscribe();
        this.running.status = RunnableStatus.CANCELED;
        this.add(value, this.queue.length > 0);
    }

    private finish() {
        this.running.status = RunnableStatus.FINISHED;
        this.verifyQueue();
    }

    private shouldExecuteNext() {
        return (
            this.running == undefined ||
            this.running.status == undefined ||
            this.running.status == RunnableStatus.FINISHED ||
            this.running.status == RunnableStatus.CANCELED
        ) && this.queue.length > 0;
    }

}

export interface QueueResponse {
    message: string;
}

export interface Running<T> extends Indexed {
    value: T;
    status: RunnableStatus;
    subscription?: Subscription;
    remove: () => void;
}

export interface Indexed {
    id: any;
}

export interface Runnable<T> {
    run(value: T): EventEmitter<RunningStatus<T>>;
    cancel(value: T);
    remove(value: T);
}

export enum RunnableStatus {
    WAITING,
    RUNNING,
    FINISHED,
    CANCELED
}

export interface RunningStatus<T> {
    value: T;
    status: RunnableStatus;
}
