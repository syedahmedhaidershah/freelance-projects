-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 01, 2020 at 04:15 AM
-- Server version: 10.2.30-MariaDB-log
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kingstonantiques_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `Authentication`
--

CREATE TABLE `Authentication` (
  `userName` varchar(15) NOT NULL,
  `password` varchar(20) NOT NULL,
  `commission` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Authentication`
--

INSERT INTO `Authentication` (`userName`, `password`, `commission`) VALUES
('admin', 'admin123', 20);

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `address` varchar(50) NOT NULL,
  `number` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `id` int(11) NOT NULL,
  `stallId` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `description` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `finalPrice` int(11) NOT NULL,
  `salesPersonId` int(11) NOT NULL,
  `stallHolderId` int(11) NOT NULL,
  `dateTime` datetime NOT NULL,
  `paymentMethod` varchar(10) NOT NULL,
  `total` int(11) NOT NULL,
  `customerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  `photo` blob NOT NULL,
  `price` int(11) NOT NULL,
  `barcode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Refund`
--

CREATE TABLE `Refund` (
  `invoiceId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `dateTime` datetime NOT NULL,
  `reason` varchar(30) NOT NULL,
  `cash` int(11) NOT NULL,
  `card` int(11) NOT NULL,
  `salesPersonId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `SalesPerson`
--

CREATE TABLE `SalesPerson` (
  `id` int(11) NOT NULL,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `address` varchar(50) NOT NULL,
  `number` varchar(15) NOT NULL,
  `dallasKeyCode` int(11) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Stall`
--

CREATE TABLE `Stall` (
  `id` int(11) NOT NULL,
  `stallHolderId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `StallHolder`
--

CREATE TABLE `StallHolder` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `number` varchar(15) NOT NULL,
  `rent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Authentication`
--
ALTER TABLE `Authentication`
  ADD PRIMARY KEY (`userName`);

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SalesPerson`
--
ALTER TABLE `SalesPerson`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Stall`
--
ALTER TABLE `Stall`
  ADD PRIMARY KEY (`id`,`stallHolderId`),
  ADD KEY `fk1` (`stallHolderId`);

--
-- Indexes for table `StallHolder`
--
ALTER TABLE `StallHolder`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Stall`
--
ALTER TABLE `Stall`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`stallHolderId`) REFERENCES `StallHolder` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
