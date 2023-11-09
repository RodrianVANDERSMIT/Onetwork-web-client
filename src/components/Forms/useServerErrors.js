// eslint-disable-next-line no-unused-vars
import { AxiosError } from "axios" // Imported here only for the IDE autocompletion

/**
 * This hook is meant to handle server errors in a generic way. There is only
 * one method for the moment, but new ones are welcome!
 */
export default function useServerErrors() {
    return {
        /**
         * Associate server errors with their corresponding React hook form
         * fields. If the form is properly coded, with
         * "errors.{fieldName}.message" as the helperText of MUI Components, the
         * errors should be displayed under them.
         * This function must be launched in a catch block after an Axios
         * request.
         *
         * @param {import("react-hook-form").UseFormSetError<import("react-hook-form").FieldValues>} setError setError() method of the corresponding form's useForm() hook
         * @param {AxiosError} error Axios error from the catch block
         *
         * @example
         * const { setError } = useForm()
         * try {
         *  // axios.post(...)
         * }
         * catch (error) {
         *  setFieldsServerErrors(setError, error)
         * }
         */
        setFieldsServerErrors: (setError, error = {}) => {
            // If the server doesn't respond, Axios still throws an error but
            // there is no response to work with; we need to check that first
            // and also if there are fields errors
            if (!error?.response?.data?.errors) return

            // Errors are sent like an object, but we need an array to iterate:
            // Object.entries does the transformation
            const errors = Object.entries(error.response.data.errors)

            // With Laravel, multiple messages can be sent for a single field,
            // so "messages" is always an array. If needed, we separate those
            // messages with an hyphen.
            for (const [fieldName, messages] of errors) {
                setError(fieldName, {
                    type: 'server',
                    message: messages.join(' - ')
                })
            }
        }
    }
}
