/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: adjustments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `adjustments` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `msno` varchar(11) NOT NULL,
  `adjust_to` varchar(11) NOT NULL,
  `cl` int(11) NOT NULL DEFAULT '0',
  `misc` int(11) NOT NULL DEFAULT '0',
  `int_dev` int(11) NOT NULL DEFAULT '0',
  `date` text NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: allotments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `allotments` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `msno` varchar(11) NOT NULL,
  `data` text NOT NULL,
  `dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`aid`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: files
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `files` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `msno` varchar(11) NOT NULL DEFAULT '1',
  `name` varchar(48) DEFAULT NULL,
  `cnic` varchar(13) DEFAULT NULL,
  `sowodo` varchar(48) DEFAULT NULL,
  `phone` varchar(14) DEFAULT NULL,
  `address` text,
  `plot_no` int(5) DEFAULT NULL,
  `category` varchar(4) DEFAULT NULL,
  `phase` varchar(7) DEFAULT NULL,
  `cl` int(9) NOT NULL DEFAULT '0',
  `misc` int(9) NOT NULL DEFAULT '0',
  `mc` int(9) NOT NULL DEFAULT '0',
  `surcharge` int(9) NOT NULL DEFAULT '0',
  `int_dev` int(9) NOT NULL DEFAULT '0',
  `out_dev` int(9) NOT NULL DEFAULT '0',
  `lease_doc` int(9) NOT NULL DEFAULT '0',
  `wcpr` int(9) NOT NULL DEFAULT '0',
  `paid` text,
  `allotted` tinyint(4) NOT NULL DEFAULT '0',
  `doe` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`aid`)
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: owners
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `owners` (
  `oid` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NOT NULL,
  `o1` text,
  `o2` text,
  `o3` text,
  `o4` text,
  `o5` text,
  `o6` date DEFAULT NULL,
  `o7` text,
  `o8` text,
  PRIMARY KEY (`oid`),
  KEY `fk_aid` (`aid`),
  CONSTRAINT `fk_aid` FOREIGN KEY (`aid`) REFERENCES `files` (`aid`)
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: payments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `payments` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(11) NOT NULL,
  `pending` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `msno` varchar(11) NOT NULL,
  `dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pid`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: refunds
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `refunds` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `msno` varchar(11) NOT NULL,
  `name` varchar(48) NOT NULL,
  `sowodo` varchar(48) DEFAULT NULL,
  `cnic` varchar(14) DEFAULT NULL,
  `deduction` int(11) DEFAULT NULL,
  `file` text,
  `deduc_max` int(11) DEFAULT NULL,
  `payable_max` int(11) DEFAULT NULL,
  `payments` text,
  PRIMARY KEY (`rid`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: transfers
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `transfers` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NOT NULL,
  `transferfrom` text,
  `transferto` text NOT NULL,
  `dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tid`)
) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: adjustments
# ------------------------------------------------------------

INSERT INTO
  `adjustments` (
    `aid`,
    `msno`,
    `adjust_to`,
    `cl`,
    `misc`,
    `int_dev`,
    `date`
  )
VALUES
  (
    4,
    '1',
    '5',
    11111,
    8769,
    302,
    '2019-07-01T21:13:29.356Z'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: allotments
# ------------------------------------------------------------

INSERT INTO
  `allotments` (`aid`, `msno`, `data`, `dt`)
VALUES
  (
    6,
    '1',
    '{\"aid\":1,\"msno\":\"1\",\"name\":\"Test\",\"cnic\":\"4210127961243\",\"sowodo\":\"Test3\",\"phone\":\"20322222222\",\"address\":\"sdn,sdjsldkfjdkf\",\"plot_no\":996,\"category\":\"200\",\"phase\":null,\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0,\"paid\":\"{\\\"cl\\\":22200,\\\"misc\\\":0,\\\"mc\\\":0,\\\"surcharge\\\":0,\\\"int_dev\\\":0,\\\"out_dev\\\":0,\\\"lease_doc\\\":0,\\\"wcpr\\\":0}\",\"allotted\":0,\"doe\":\"2019-06-27T22:16:00.000Z\"}',
    '2019-06-28 03:20:38'
  );
INSERT INTO
  `allotments` (`aid`, `msno`, `data`, `dt`)
VALUES
  (
    7,
    '2',
    '{\"aid\":2,\"msno\":\"2\",\"name\":\"test2\",\"cnic\":\"5454454\",\"sowodo\":\"fsdf\",\"phone\":\"844\",\"address\":\"sdfsdfsdf\",\"plot_no\":null,\"category\":null,\"phase\":null,\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0,\"paid\":\"{\\\"cl\\\":22200,\\\"misc\\\":0,\\\"mc\\\":0,\\\"surcharge\\\":0,\\\"int_dev\\\":0,\\\"out_dev\\\":0,\\\"lease_doc\\\":0,\\\"wcpr\\\":0}\",\"allotted\":0,\"doe\":\"2019-06-27T22:23:09.000Z\"}',
    '2019-06-28 03:23:18'
  );
INSERT INTO
  `allotments` (`aid`, `msno`, `data`, `dt`)
VALUES
  (
    8,
    '3',
    '{\"aid\":3,\"msno\":\"3\",\"name\":\"jdaljs\",\"cnic\":\"32809238\",\"sowodo\":\"pdjsdf493-249-3\",\"phone\":\"4546546\",\"address\":\"dsfjdj;f\",\"plot_no\":null,\"category\":null,\"phase\":null,\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0,\"paid\":\"{\\\"cl\\\":22200,\\\"misc\\\":0,\\\"mc\\\":0,\\\"surcharge\\\":0,\\\"int_dev\\\":0,\\\"out_dev\\\":0,\\\"lease_doc\\\":0,\\\"wcpr\\\":0}\",\"allotted\":0,\"doe\":\"2019-06-27T22:25:33.000Z\"}',
    '2019-06-28 03:25:41'
  );
INSERT INTO
  `allotments` (`aid`, `msno`, `data`, `dt`)
VALUES
  (
    9,
    '4',
    '{\"aid\":4,\"msno\":\"4\",\"name\":\"jadjl\",\"cnic\":\"324\",\"sowodo\":\"jfsldjfs\",\"phone\":\"4234923\",\"address\":\"fdsjflsf\",\"plot_no\":null,\"category\":null,\"phase\":null,\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0,\"paid\":\"{\\\"cl\\\":22200,\\\"misc\\\":0,\\\"mc\\\":0,\\\"surcharge\\\":0,\\\"int_dev\\\":0,\\\"out_dev\\\":0,\\\"lease_doc\\\":0,\\\"wcpr\\\":0}\",\"allotted\":0,\"doe\":\"2019-06-27T22:26:53.000Z\"}',
    '2019-06-28 03:27:00'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: files
# ------------------------------------------------------------

INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    1,
    '1',
    'Test',
    '4210127961243',
    'Test3',
    '20322222222',
    'sdn,sdjsldkfjdkf',
    996,
    '200',
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":9854,\"misc\":-9743,\"mc\":0,\"surcharge\":0,\"int_dev\":-336,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    1,
    '2019-06-28 03:16:00'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    2,
    '2',
    'test2',
    '5454454',
    'fsdf',
    '844',
    'sdfsdfsdf',
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    1,
    '2019-06-28 03:23:09'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    3,
    '3',
    'jdaljs',
    '32809238',
    'pdjsdf493-249-3',
    '4546546',
    'dsfjdj;f',
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    1,
    '2019-06-28 03:25:33'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    4,
    '4',
    'jadjl',
    '324',
    'jfsldjfs',
    '4234923',
    'fdsjflsf',
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    1,
    '2019-06-28 03:26:53'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    5,
    '5',
    'Test',
    '444444444444',
    '44eds',
    '5555555555',
    'dsa5 sa555555',
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":12350,\"misc\":9743,\"mc\":0,\"surcharge\":0,\"int_dev\":336,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-07-02 01:50:32'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    6,
    '6',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    7,
    '7',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    8,
    '8',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    9,
    '9',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    10,
    '10',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    11,
    '11',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    12,
    '12',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    13,
    '13',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    14,
    '14',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    15,
    '15',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    16,
    '16',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    17,
    '17',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    18,
    '18',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    19,
    '19',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );
INSERT INTO
  `files` (
    `aid`,
    `msno`,
    `name`,
    `cnic`,
    `sowodo`,
    `phone`,
    `address`,
    `plot_no`,
    `category`,
    `phase`,
    `cl`,
    `misc`,
    `mc`,
    `surcharge`,
    `int_dev`,
    `out_dev`,
    `lease_doc`,
    `wcpr`,
    `paid`,
    `allotted`,
    `doe`
  )
VALUES
  (
    20,
    '20',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    22200,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}',
    0,
    '2019-06-15 12:17:19'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: owners
# ------------------------------------------------------------

INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (2, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (3, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (4, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (5, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (6, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (7, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (8, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (9, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (10, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (11, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (12, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (13, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (14, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (15, 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (16, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (17, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (18, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (19, 19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO
  `owners` (
    `oid`,
    `aid`,
    `o1`,
    `o2`,
    `o3`,
    `o4`,
    `o5`,
    `o6`,
    `o7`,
    `o8`
  )
VALUES
  (20, 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: payments
# ------------------------------------------------------------

INSERT INTO
  `payments` (`pid`, `type`, `pending`, `value`, `msno`, `dt`)
VALUES
  (5, 'cl', 22200, 22200, '1', '2019-06-28 03:16:12');
INSERT INTO
  `payments` (`pid`, `type`, `pending`, `value`, `msno`, `dt`)
VALUES
  (6, 'cl', 22200, 22200, '2', '2019-06-28 03:23:16');
INSERT INTO
  `payments` (`pid`, `type`, `pending`, `value`, `msno`, `dt`)
VALUES
  (7, 'cl', 22200, 22200, '3', '2019-06-28 03:25:39');
INSERT INTO
  `payments` (`pid`, `type`, `pending`, `value`, `msno`, `dt`)
VALUES
  (8, 'cl', 22200, 22200, '4', '2019-06-28 03:26:58');
INSERT INTO
  `payments` (`pid`, `type`, `pending`, `value`, `msno`, `dt`)
VALUES
  (9, 'cl', 22200, 1, '5', '2019-07-02 02:10:13');
INSERT INTO
  `payments` (`pid`, `type`, `pending`, `value`, `msno`, `dt`)
VALUES
  (10, 'cl', 22199, 2, '5', '2019-07-02 02:10:31');
INSERT INTO
  `payments` (`pid`, `type`, `pending`, `value`, `msno`, `dt`)
VALUES
  (11, 'cl', 22197, 1, '5', '2019-07-02 02:11:40');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: refunds
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: transfers
# ------------------------------------------------------------


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
