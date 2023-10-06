import { validateBody } from "./validateBody.middleware";
import { checkEmail } from "./checkEmail.middleware";
import { handleError } from "./handleError.middleware";
import { checkId } from "./checkId.middleware";
import { isOwner } from "./isOwner.middleware";
import { checkToken } from "./checkToken.middleware";

export default {
  validateBody,
  checkEmail,
  handleError,
  checkId,
  isOwner,
  checkToken,
};
