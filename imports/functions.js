const dbConf = require('./config/db').mysqlconn;
const asyncMysql = require('async-mysql');

module.exports = {
    matchReqInt: (reqbody, interface) => {
        if (!(module.exports.isJson(reqbody))) {
            return false;
        }

        if (Object.keys(reqbody).sort().toString().toLowerCase() != Object.keys(interface).sort().toString().toLowerCase()) {
            return false;
        } else {
            return true;
        }
    },
    isJson: (obj) => {
        if ((typeof obj).toLowerCase() == 'object') {
            return true;
        } else {
            return false;
        }
    },
    isJsonStr: (str) => {
        let ret = false;
        try {
            JSON.parse(str);
            ret = true;
        } catch (exc) { }
        return ret;
    },
    generateSimpleQuery: (query, obj) => {

        const params = [];
        let queryStr = '';
        for (p in obj) {
            params.push(obj[p]);
        }
        if (query.length != (params.length + 1)) {
            return false;
        } else {
            let i = 0, len = params.length;
            for (; i < len; i++) {
                queryStr += query[i].concat(params[i]);
            }
            queryStr += query[i];
            return queryStr;
        }
    },
    mysqlQuery: (mysql, obj, query) => {
        // MOVING  CODE TO 'sandbox/inventory'

        const queryData = Object.keys(obj).concat(Object.values(obj));

        return mysql.format(query, queryData);
    },
    mysqlQueryAlt: (mysql, obj, query) => {
        const queryData = [];

        Object.keys(obj).forEach((k) => {
            queryData.push(k, obj[k]);
        });

        return mysql.format(query, queryData);
    },
    sortJson: (jsonObj) => {
        if (!(module.exports.isJson(jsonObj))) {
            return null;
        } else {
            const toRet = {};
            const keys = Object.keys(jsonObj).sort().map(k => {
                return k.toLowerCase();
            });
            keys.forEach(k => {
                toRet[k] = jsonObj[k];
            });
            return toRet;
        }
    },
    reinit: async (mysql) => {
        const asmysql = await asyncMysql.connect(dbConf);
        await asmysql.query('DELETE FROM adjustments');
        await asmysql.query('DELETE FROM allotments');
        await asmysql.query('DELETE FROM payments');
        await asmysql.query('DELETE FROM refunds');
        await asmysql.query('DELETE FROM transfers');
        const paidStr = JSON.stringify({ "cl": 0, "misc": 0, "mc": 0, "surcharge": 0, "int_dev": 0, "out_dev": 0, "lease_doc": 0, "wcpr": 0 });
        // UPDATE files SET name = NULL, cnic = NULL, phone = NULL, address = NULL, sowodo = NULL, plot_no = NULL, category = NULL, phase = NULL, paid = '{"cl":0,"misc":0,"mc":0,"surcharge":0,"int_dev":0,"out_dev":0,"lease_doc":0,"wcpr":0}', allotted = 0, doe = CURRENT_TIMESTAMP
        // console.log('UPDATE files SET name=NULL, cnic=NULL, phone=NULL, address=NULL, sowodo=NULL, plot_no=NULL, category=NULL, phase= NULL, paid=\'' + paidStr + '\', allotted=0, doe=CURRENT_TIMESTAMP');
        const filesQuery = mysql.format('UPDATE files SET name=NULL, cnic=NULL, phone=NULL, address=NULL, sowodo=NULL, plot_no=NULL, category=NULL, phase= NULL, paid=?, allotted=0, doe=CURRENT_TIMESTAMP', [paidStr])
        await asmysql.query(filesQuery);
        await asmysql.query('UPDATE owners SET o1=null, o2=null, o3=null, o4=null, o5=null, o6=null, o7=null, o8=null')
    }
}