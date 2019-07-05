-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2019 at 05:35 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `haserp`
--

-- --------------------------------------------------------

--
-- Table structure for table `adjustments`
--

CREATE TABLE `adjustments` (
  `aid` int(11) NOT NULL,
  `msno` varchar(11) NOT NULL,
  `adjust_to` varchar(11) NOT NULL,
  `cl` int(11) NOT NULL DEFAULT '0',
  `misc` int(11) NOT NULL DEFAULT '0',
  `int_dev` int(11) NOT NULL DEFAULT '0',
  `date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adjustments`
--

INSERT INTO `adjustments` (`aid`, `msno`, `adjust_to`, `cl`, `misc`, `int_dev`, `date`) VALUES
(4, '1', '5', 11111, 8769, 302, '2019-07-01T21:13:29.356Z');

-- --------------------------------------------------------

--
-- Table structure for table `allotments`
--

CREATE TABLE `allotments` (
  `aid` int(11) NOT NULL,
  `msno` varchar(11) NOT NULL,
  `data` text NOT NULL,
  `dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `allotments`
--

INSERT INTO `allotments` (`aid`, `msno`, `data`, `dt`) VALUES
(6, '1', '{\"aid\":1,\"msno\":\"1\",\"name\":\"Test\",\"cnic\":\"4210127961243\",\"sowodo\":\"Test3\",\"phone\":\"20322222222\",\"address\":\"sdn,sdjsldkfjdkf\",\"plot_no\":996,\"category\":\"200\",\"phase\":null,\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0,\"paid\":\"{\\\"cl\\\":22200,\\\"misc\\\":0,\\\"mc\\\":0,\\\"surcharge\\\":0,\\\"int_dev\\\":0,\\\"out_dev\\\":0,\\\"lease_doc\\\":0,\\\"wcpr\\\":0}\",\"allotted\":0,\"doe\":\"2019-06-27T22:16:00.000Z\"}', '2019-06-28 03:20:38'),
(7, '2', '{\"aid\":2,\"msno\":\"2\",\"name\":\"test2\",\"cnic\":\"5454454\",\"sowodo\":\"fsdf\",\"phone\":\"844\",\"address\":\"sdfsdfsdf\",\"plot_no\":null,\"category\":null,\"phase\":null,\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0,\"paid\":\"{\\\"cl\\\":22200,\\\"misc\\\":0,\\\"mc\\\":0,\\\"surcharge\\\":0,\\\"int_dev\\\":0,\\\"out_dev\\\":0,\\\"lease_doc\\\":0,\\\"wcpr\\\":0}\",\"allotted\":0,\"doe\":\"2019-06-27T22:23:09.000Z\"}', '2019-06-28 03:23:18'),
(8, '3', '{\"aid\":3,\"msno\":\"3\",\"name\":\"jdaljs\",\"cnic\":\"32809238\",\"sowodo\":\"pdjsdf493-249-3\",\"phone\":\"4546546\",\"address\":\"dsfjdj;f\",\"plot_no\":null,\"category\":null,\"phase\":null,\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0,\"paid\":\"{\\\"cl\\\":22200,\\\"misc\\\":0,\\\"mc\\\":0,\\\"surcharge\\\":0,\\\"int_dev\\\":0,\\\"out_dev\\\":0,\\\"lease_doc\\\":0,\\\"wcpr\\\":0}\",\"allotted\":0,\"doe\":\"2019-06-27T22:25:33.000Z\"}', '2019-06-28 03:25:41'),
(9, '4', '{\"aid\":4,\"msno\":\"4\",\"name\":\"jadjl\",\"cnic\":\"324\",\"sowodo\":\"jfsldjfs\",\"phone\":\"4234923\",\"address\":\"fdsjflsf\",\"plot_no\":null,\"category\":null,\"phase\":null,\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0,\"paid\":\"{\\\"cl\\\":22200,\\\"misc\\\":0,\\\"mc\\\":0,\\\"surcharge\\\":0,\\\"int_dev\\\":0,\\\"out_dev\\\":0,\\\"lease_doc\\\":0,\\\"wcpr\\\":0}\",\"allotted\":0,\"doe\":\"2019-06-27T22:26:53.000Z\"}', '2019-06-28 03:27:00');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `aid` int(11) NOT NULL,
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
  `doe` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`aid`, `msno`, `name`, `cnic`, `sowodo`, `phone`, `address`, `plot_no`, `category`, `phase`, `cl`, `misc`, `mc`, `surcharge`, `int_dev`, `out_dev`, `lease_doc`, `wcpr`, `paid`, `allotted`, `doe`) VALUES
(1, '1', 'Test', '4210127961243', 'Test3', '20322222222', 'sdn,sdjsldkfjdkf', 996, '200', NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":9854,\"misc\":-9743,\"mc\":0,\"surcharge\":0,\"int_dev\":-336,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 1, '2019-06-28 03:16:00'),
(2, '2', 'test2', '5454454', 'fsdf', '844', 'sdfsdfsdf', NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 1, '2019-06-28 03:23:09'),
(3, '3', 'jdaljs', '32809238', 'pdjsdf493-249-3', '4546546', 'dsfjdj;f', NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 1, '2019-06-28 03:25:33'),
(4, '4', 'jadjl', '324', 'jfsldjfs', '4234923', 'fdsjflsf', NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":22200,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 1, '2019-06-28 03:26:53'),
(5, '5', 'Test', '444444444444', '44eds', '5555555555', 'dsa5 sa555555', NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":12350,\"misc\":9743,\"mc\":0,\"surcharge\":0,\"int_dev\":336,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-07-02 01:50:32'),
(6, '6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(7, '7', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(8, '8', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(9, '9', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(10, '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(11, '11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(12, '12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(13, '13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(14, '14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(15, '15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(16, '16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(17, '17', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(18, '18', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(19, '19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19'),
(20, '20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22200, 0, 0, 0, 0, 0, 0, 0, '{\"cl\":0,\"misc\":0,\"mc\":0,\"surcharge\":0,\"int_dev\":0,\"out_dev\":0,\"lease_doc\":0,\"wcpr\":0}', 0, '2019-06-15 12:17:19');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `oid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `o1` text,
  `o2` text,
  `o3` text,
  `o4` text,
  `o5` text,
  `o6` date DEFAULT NULL,
  `o7` text,
  `o8` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`oid`, `aid`, `o1`, `o2`, `o3`, `o4`, `o5`, `o6`, `o7`, `o8`) VALUES
(1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `pid` int(11) NOT NULL,
  `type` varchar(11) NOT NULL,
  `pending` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `msno` varchar(11) NOT NULL,
  `dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`pid`, `type`, `pending`, `value`, `msno`, `dt`) VALUES
(5, 'cl', 22200, 22200, '1', '2019-06-28 03:16:12'),
(6, 'cl', 22200, 22200, '2', '2019-06-28 03:23:16'),
(7, 'cl', 22200, 22200, '3', '2019-06-28 03:25:39'),
(8, 'cl', 22200, 22200, '4', '2019-06-28 03:26:58'),
(9, 'cl', 22200, 1, '5', '2019-07-02 02:10:13'),
(10, 'cl', 22199, 2, '5', '2019-07-02 02:10:31'),
(11, 'cl', 22197, 1, '5', '2019-07-02 02:11:40');

-- --------------------------------------------------------

--
-- Table structure for table `refunds`
--

CREATE TABLE `refunds` (
  `rid` int(11) NOT NULL,
  `msno` varchar(11) NOT NULL,
  `name` varchar(48) NOT NULL,
  `sowodo` varchar(48) DEFAULT NULL,
  `cnic` varchar(14) DEFAULT NULL,
  `deduction` int(11) DEFAULT NULL,
  `file` text,
  `deduc_max` int(11) DEFAULT NULL,
  `payable_max` int(11) DEFAULT NULL,
  `payments` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transfers`
--

CREATE TABLE `transfers` (
  `tid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `transferfrom` text,
  `transferto` text NOT NULL,
  `dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adjustments`
--
ALTER TABLE `adjustments`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `allotments`
--
ALTER TABLE `allotments`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`oid`),
  ADD KEY `fk_aid` (`aid`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `refunds`
--
ALTER TABLE `refunds`
  ADD PRIMARY KEY (`rid`);

--
-- Indexes for table `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`tid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adjustments`
--
ALTER TABLE `adjustments`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `allotments`
--
ALTER TABLE `allotments`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `refunds`
--
ALTER TABLE `refunds`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transfers`
--
ALTER TABLE `transfers`
  MODIFY `tid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `owners`
--
ALTER TABLE `owners`
  ADD CONSTRAINT `fk_aid` FOREIGN KEY (`aid`) REFERENCES `files` (`aid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
