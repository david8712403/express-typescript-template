export interface ResponseBase {
  status: Status;
}

interface Status {
  code: StatusCode;
  error: string | null;
}

enum StatusCode {
  success,
  error,
}

export const errorResponse = (message: string): ResponseBase => {
  return { status: errorStatus(message) };
};

// Success, Error Status
export const successStatus: Status = {
  error: null,
  code: StatusCode.success,
};

const errorStatus = (message: string): Status => {
  return {
    error: message,
    code: StatusCode.error,
  };
};
