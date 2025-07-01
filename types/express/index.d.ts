import { TokenPayload } from "../../src/utils/jwt";

declare namespace Express {
  export interface Request {
    user?: TokenPayload;
  }
}
