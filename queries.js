module.exports = {
    user: {
        login: 'SELECT * FROM user WHERE username=? AND password=?',
        alert: "INSERT INTO alerts (uid, message) VALUES (?, ?)",
        changePass: "UPdaTE user SET password=? WHERE uid=?"
    },
    controls: {
        changeGatePass: 'UPDATE prefernces SET value=? WHERE prefkey="passphrase"',
    	passphrase: 'SELECT * FROM prefernces WHERE prefkey="passphrase" AND "value"=?'
    }
}