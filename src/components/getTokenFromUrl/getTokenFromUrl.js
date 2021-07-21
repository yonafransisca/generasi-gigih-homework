const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((acc, currentValue) => {
            let [key, value] = currentValue.split('=')
            acc[key] = value

            return acc
        }, {}) 
}

export default getTokenFromUrl