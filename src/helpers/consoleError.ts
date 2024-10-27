/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

const consoleError = (fnName: string, message: string, arg?: any) => {
    console.error(`${fnName} => Error message: ${message}. `, arg)
}
export default consoleError
