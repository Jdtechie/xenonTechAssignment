interface Responses {
  response: {
    status: number;
    message: string;
    error: boolean;
    data: object;
    totalResults?: number;
  };
}

interface GenericSuccess {
  status?: number;
  error?: boolean;
  message: string;
  data: object;
  totalResults?: number;
}
interface GenericError {
  message?: string;
  error?: any;
  field?: string;
  errorMessage?: string;
}

interface GenericRequestPusher {
  jwtData?: string;
  userId?: string;
  adminRole?: string;
}

export { Responses, GenericSuccess, GenericError, GenericRequestPusher };
