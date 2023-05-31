export const AUTH_QUEUE_NAME = 'auth';

const AUTH_QUEUE_SUFFIX = '_AUTH_QUEUE';

const SIGN_IN = 'SIGN_IN' + AUTH_QUEUE_SUFFIX;
const SIGN_UP = 'SIGN_UP' + AUTH_QUEUE_SUFFIX;
export default { SIGN_IN, SIGN_UP };
