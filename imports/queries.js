module.exports = {
    login: {
        read: 'SELECT * FROM `users` WHERE `username`=? AND `password`=?'
    },
    allottees: {
        getall: "SELECT * FROM `files`",
        getallunallotted: "SELECT * FROM `files` WHERE allotted=0  AND name IS NULL AND cnic IS NULL AND sowodo IS NULL AND phone IS NULL AND address IS NULL",
        updateFileBalance: "UPDATE files SET ??=?, ??=?,??=?,??=?,??=?,??=?,??=?,??=? WHERE aid=?",
        getfiledata: "SELECT * FROM files WHERE aid=?",
        getFileDataByMsno: "SELECT * FROM files WHERE msno=?",
        allotFile: "UPDATE files SET allotted=1 WHERE aid=?",
        saveAllotmentDate: "INSERT INTO allotments (msno, data, dt) VALUES (?, ?, CURRENT_TIMESTAMP)",
        changePlotOnFile: "UPDATE files SET plot_no=? WHERE aid=?",
        removePlotFromPrevFile: "UPDATE files SET plot_no=NULL WHERE aid=?",
        updateFileNew: "UPDATE files SET ??=?, ??=?, ??=?, ??=?, ??=? WHERE msno=?",
        transferQuery: "UPDATE files SET ??=?, ??=?, ??=?, ??=?, ??=?, ??=?, ??=?, ??=? WHERE aid=?",
        getPendingPayments: "SELECT `paid` FROM files WHERE msno=?",
        recievePayment: "UPDATE files SET paid=? WHERE msno=?",
        shiftOwner: "UPDATE owners SET o8=o7, o7=o6, o6=o5, o5=o4, o4=o3, o3=o2, o2=o1  WHERE aid=?",
        insertPrevFirst: "UPDATE owners SET o1=? WHERE aid=?",
        insertAdjustment: "INSERT INTO adjustments (??,??,??,??,??,??, ??) VALUES (?,?,?,?,?,?,?)",
        updateTimeByMsno: "UPDATE files SET doe=CURRENT_TIMESTAMP WHERE msno=?",
        updateTimeByAid: "UPDATE files SET doe=CURRENT_TIMESTAMP WHERE aid=?",
        insertPayments: "INSERT INTO PAYMENTS (??,??,??,??) VALUES (?,?,?,?)",
        LastDOP: "SELECT * FROM `payments` WHERE msno=? ORDER BY dt DESC LIMIT 1",
        dateOfAllotment: "SELECT * FROM allotments WHERE msno=?",
        saveATransfer: "INSERT INTO TRANSFERS (aid, transferfrom, transferto, dt) VALUES (?, NULL, ?, CURRENT_TIMESTAMP)",
        getOwnersAid: "SELECT o1, aid FROM owners WHERE owners.aid=?",
        selectTransfersDESC: "SELECT * FROM transfers WHERE aid=? ORDER BY dt LIMIT 1",
        setTransferFrom: "UPDATE transfers SET transferfrom=? WHERE tid=?",
        getAllTransfers: "SELECT * FROM transfers JOIN (SELECT msno, aid AS faid FROM files) AS files ON transfers.aid=files.faid",
        insertRefund: "INSERT INTO refunds (??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)",
        updateRefundedFile: "UPDATE files SET name=NULL, cnic=NULL, sowodo=NULL, phone=NULL, address=NULL, allotted=0, paid=? WHERE msno=?",
        getAllRefunds: "SELECT * FROM refunds",
        getAllAdjustments: "SELECT * FROM adjustments",
        getAdjustmentsProper: "SELECT adjustments.*, files2.name, files2.sowodo, files3.name2, files3.sowodo2 FROM `adjustments` JOIN (SELECT files.name, files.sowodo, files.msno AS fmsno FROM files) AS files2 ON adjustments.msno=files2.fmsno JOIN (SELECT name AS name2, sowodo AS sowodo2, msno AS fmsno2 FROM files) AS files3 ON adjustments.adjust_to=files3.fmsno2"
    },
    owners: {
        get: "SELECT * FROM owners WHERE aid=?"
    }
}