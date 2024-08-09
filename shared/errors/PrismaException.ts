import { ErrorMessage } from './Error';

export class PrismaException {
  private _error: ErrorMessage = {
    message: "",
    type: "PrismaException",
    timestamp: new Date().toISOString(),
  };

    constructor(message: string) {
        this._error.message = message;
    }

    public get data() {
        return this._error;
    }
}