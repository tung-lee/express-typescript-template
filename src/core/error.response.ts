import { StatusCodes, ReasonPhrases } from "http-status-codes";

class ErrorResponse extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.FORBIDDEN) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

class TooManyRequestsError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.TOO_MANY_REQUESTS) {
    super(message, StatusCodes.TOO_MANY_REQUESTS);
  }
}

export {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  ErrorResponse,
  TooManyRequestsError,
};
