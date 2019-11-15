const URLs = {
    "loginApi": "http://localhost:8080/securitystarter",
}

function Settings() {
    const getURL = (key) => { return URLs[key] }

    return {
        getURL
    }
}
export default Settings();