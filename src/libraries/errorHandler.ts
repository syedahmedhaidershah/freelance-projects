import { ErrorHandler, isDevMode } from '@angular/core';

export class globalErrorHandler implements ErrorHandler {
    worker: Worker;

    constructor() {
    }

    handleError = (e) => {
        if (!isDevMode()) {
        }
        console.warn(e);
    }
}