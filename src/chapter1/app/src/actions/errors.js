export const setError = (error) => {
    const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
    return {
        type: 'SET_MESSAGE',
        payload: message
    }
}