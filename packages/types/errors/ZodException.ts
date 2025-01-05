import { ErrorMessage } from './Error';

export class ZodException {
  private _error: ErrorMessage = {
    message: "",
    type: "ZodException",
    timestamp: new Date().toISOString(),
  };

  constructor(message: string) {
    this._error.message = message;
  }

  public get data() {
    return this._error;
  }
}