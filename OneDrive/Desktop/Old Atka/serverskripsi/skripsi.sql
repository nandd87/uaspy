-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2023 at 09:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skripsi`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `debit` int(11) DEFAULT NULL,
  `kredit` int(11) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `name`, `createdAt`, `updatedAt`, `debit`, `kredit`, `deskripsi`) VALUES
(223, 'Pembayaran Piutang', '2023-12-27 14:01:03', '2023-12-27 14:01:03', 10000, NULL, 'tes1'),
(224, 'Pembelian Stok', '2023-12-27 14:56:34', '2023-12-27 14:56:34', NULL, 1500000, 'Beli di indomaret'),
(225, 'Project Ayam mentah', '2023-12-27 16:23:19', '2023-12-27 16:23:19', 30000, NULL, 'Pembayaran Projek'),
(227, 'Pembayaran Beban', '2023-12-27 19:31:06', '2023-12-27 19:31:06', NULL, 444444444, 'anjay'),
(228, 'Pembayaran Utang', '2023-12-27 19:31:20', '2023-12-27 19:31:20', NULL, 2222222, 'anjay'),
(229, 'Pembuatan Utang', '2023-12-27 19:31:25', '2023-12-27 19:31:25', 2222222, NULL, 'anjay'),
(230, 'Pembayaran Piutang', '2023-12-27 19:31:28', '2023-12-27 19:31:28', 2222222, NULL, 'anjay'),
(231, 'Pembuatan Piutang', '2023-12-27 19:31:30', '2023-12-27 19:31:30', NULL, NULL, 'anjay'),
(232, 'Pendapatan Lain Lain', '2023-12-27 19:31:36', '2023-12-27 19:31:36', 2222222, NULL, 'anjay'),
(233, 'Pembelian Stok', '2023-12-27 19:51:22', '2023-12-27 19:51:22', NULL, 100000000, 'bejir'),
(234, 'Penyesuaian Stok', '2023-12-27 19:52:34', '2023-12-27 19:52:34', 20000000, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `accountdetail`
--

CREATE TABLE `accountdetail` (
  `id` int(11) NOT NULL,
  `transactionId` int(11) NOT NULL,
  `coaId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userInputedId` int(11) NOT NULL,
  `userInputed` varchar(255) NOT NULL,
  `nominal` varchar(255) DEFAULT NULL,
  `tipe` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accountdetail`
--

INSERT INTO `accountdetail` (`id`, `transactionId`, `coaId`, `createdAt`, `updatedAt`, `userInputedId`, `userInputed`, `nominal`, `tipe`) VALUES
(181, 223, 304, '2023-12-27 14:01:03', '2023-12-27 14:01:03', 1, 'super', '10000', 'Kredit'),
(182, 223, 101, '2023-12-27 14:01:03', '2023-12-27 14:01:03', 1, 'super', '10000', 'Debit'),
(183, 224, 102, '2023-12-27 14:56:34', '2023-12-27 14:56:34', 1, 'super', '1500000', 'Debit'),
(184, 224, 101, '2023-12-27 14:56:34', '2023-12-27 14:56:34', 1, 'super', '1500000', 'Kredit'),
(185, 225, 101, '2023-12-27 16:23:19', '2023-12-27 16:23:19', 1, 'super', '30000', 'Debit'),
(186, 225, 304, '2023-12-27 16:23:19', '2023-12-27 16:23:19', 1, 'super', '30000', 'Kredit'),
(188, 227, 101, '2023-12-27 19:31:06', '2023-12-27 19:31:06', 1, 'super', '444444444', 'Kredit'),
(189, 227, 405, '2023-12-27 19:31:06', '2023-12-27 19:31:06', 1, 'super', '444444444', 'Beban'),
(190, 228, 101, '2023-12-27 19:31:20', '2023-12-27 19:31:20', 1, 'super', '2222222', 'Kredit'),
(191, 228, 202, '2023-12-27 19:31:20', '2023-12-27 19:31:20', 1, 'super', '2222222', 'Debit'),
(192, 229, 202, '2023-12-27 19:31:25', '2023-12-27 19:31:25', 1, 'super', '2222222', 'Kredit'),
(193, 229, 101, '2023-12-27 19:31:25', '2023-12-27 19:31:25', 1, 'super', '2222222', 'Debit'),
(194, 230, 304, '2023-12-27 19:31:28', '2023-12-27 19:31:28', 1, 'super', '2222222', 'Kredit'),
(195, 230, 101, '2023-12-27 19:31:28', '2023-12-27 19:31:28', 1, 'super', '2222222', 'Debit'),
(196, 231, 101, '2023-12-27 19:31:30', '2023-12-27 19:31:30', 1, 'super', '2222222', 'Kredit'),
(197, 231, 304, '2023-12-27 19:31:30', '2023-12-27 19:31:30', 1, 'super', '2222222', 'Debit'),
(198, 232, 302, '2023-12-27 19:31:36', '2023-12-27 19:31:36', 1, 'super', '2222222', 'Kredit'),
(199, 232, 101, '2023-12-27 19:31:36', '2023-12-27 19:31:36', 1, 'super', '2222222', 'Debit'),
(200, 233, 102, '2023-12-27 19:51:22', '2023-12-27 19:51:22', 1, 'super', '100000000', 'Debit'),
(201, 233, 101, '2023-12-27 19:51:22', '2023-12-27 19:51:22', 1, 'super', '100000000', 'Kredit'),
(202, 234, 102, '2023-12-27 19:52:34', '2023-12-27 19:52:34', 1, 'super', '20000000', 'Kredit'),
(203, 234, 101, '2023-12-27 19:52:34', '2023-12-27 19:52:34', 1, 'super', '20000000', 'Debit');

-- --------------------------------------------------------

--
-- Table structure for table `coa`
--

CREATE TABLE `coa` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `typeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coa`
--

INSERT INTO `coa` (`id`, `name`, `typeId`, `createdAt`, `updatedAt`) VALUES
(101, 'Kas', 1, '2023-12-24 21:00:43', '2023-12-24 21:00:43'),
(102, 'Inventori', 1, '2023-12-24 21:00:56', '2023-12-24 21:00:56'),
(201, 'Gaji', 4, '2023-12-24 21:01:12', '2023-12-24 21:01:12'),
(202, 'Utang', 4, '2023-12-24 21:01:26', '2023-12-24 21:01:26'),
(302, 'Retur Penjualan', 3, '2023-12-25 11:22:43', '2023-12-25 11:22:43'),
(303, 'Pendapatan', 3, '2023-12-25 11:22:24', '2023-12-25 11:22:24'),
(304, 'Piutang', 3, '2023-12-26 22:19:58', '2023-12-26 22:19:58'),
(401, 'Utilitas', 4, '2023-12-25 11:22:58', '2023-12-25 11:22:58'),
(402, 'Lain Lain', 4, '2023-12-25 11:23:17', '2023-12-25 11:23:17'),
(403, 'Biaya Penjualan Barang', 4, '2023-12-25 11:23:28', '2023-12-25 11:23:28'),
(404, 'Pengeluaran Proyek', 4, '2023-12-25 11:23:42', '2023-12-25 11:23:42'),
(405, 'Beban Transaksi', 4, '2023-12-27 20:36:39', '2023-12-27 20:36:39');

-- --------------------------------------------------------

--
-- Table structure for table `coadetail`
--

CREATE TABLE `coadetail` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coadetail`
--

INSERT INTO `coadetail` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'asset', '2023-12-24 20:59:56', '2023-12-24 20:59:56'),
(2, 'liability', '2023-12-24 21:00:07', '2023-12-24 21:00:07'),
(3, 'revenue', '2023-12-24 21:00:24', '2023-12-24 21:00:24'),
(4, 'expenses', '2023-12-24 21:00:34', '2023-12-24 21:00:34');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `name`, `date`, `createdAt`, `updatedAt`) VALUES
(1, 'besi', '2023-12-23 16:09:36', '2023-12-23 16:09:36', '2023-12-23 16:09:36'),
(28, 'seng', '2023-12-25 15:03:17', '2023-12-25 15:03:17', '2023-12-25 15:03:17'),
(29, 'tembaga', '2023-12-27 19:50:46', '2023-12-27 19:50:46', '2023-12-27 19:50:46');

-- --------------------------------------------------------

--
-- Table structure for table `inventorydetail`
--

CREATE TABLE `inventorydetail` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `typeId` int(11) DEFAULT NULL,
  `stockId` int(11) NOT NULL,
  `userInputed` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `transactionId` int(11) DEFAULT NULL,
  `userInputedId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventorydetail`
--

INSERT INTO `inventorydetail` (`id`, `name`, `amount`, `price`, `typeId`, `stockId`, `userInputed`, `createdAt`, `updatedAt`, `transactionId`, `userInputedId`) VALUES
(28, 'besi', 999920, 51, NULL, 1, 'userValue', '2023-12-24 20:46:13', '2023-12-26 21:36:35', 34, 1),
(29, 'besi 20 cm', 0, 1000, NULL, 1, 'userValue', '2023-12-25 08:52:22', '2023-12-26 21:34:19', 36, 1),
(30, 'besi 20 cm', 0, 1000, NULL, 1, 'userValue', '2023-12-25 08:53:55', '2023-12-26 21:34:19', 39, 1),
(31, 'seng 20 cm', 10, 1000, NULL, 28, 'userValue', '2023-12-25 14:03:45', '2023-12-25 14:03:45', 59, 1),
(32, 'seng 20 cm', 10, 1000, NULL, 28, 'userValue', '2023-12-25 14:03:46', '2023-12-25 14:03:46', 62, 1),
(33, 'pricelist', 0, 5, NULL, 1, 'userValue', '2023-12-26 10:27:57', '2023-12-26 21:34:19', 138, 1),
(34, 'seng 10cm', 3, 500000, NULL, 28, 'super', '2023-12-27 14:56:34', '2023-12-27 14:56:34', 224, 1),
(35, 'Tembaga 1km', 8, 10000000, NULL, 29, 'super', '2023-12-27 19:51:22', '2023-12-27 19:52:34', 233, 1);

-- --------------------------------------------------------

--
-- Table structure for table `produkkategori`
--

CREATE TABLE `produkkategori` (
  `id` int(11) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produkkategori`
--

INSERT INTO `produkkategori` (`id`, `jenis`, `createdAt`, `updatedAt`) VALUES
(1, 'besi', '2023-12-23 17:14:18', '2023-12-23 17:14:18');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `recipient` int(11) NOT NULL,
  `userInputed` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`stock`)),
  `date_ongoing` datetime NOT NULL,
  `date_finished` datetime DEFAULT NULL,
  `date_paid` datetime DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userInputedId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `nama`, `recipient`, `userInputed`, `status`, `price`, `stock`, `date_ongoing`, `date_finished`, `date_paid`, `description`, `createdAt`, `updatedAt`, `userInputedId`) VALUES
(180, 's', 0, 'super', 'Paid', 5, '[{\"projectStock\":\"besi\",\"total\":\"3\"}]', '2023-12-26 09:55:10', '2023-12-27 13:06:11', NULL, 's', '2023-12-26 09:55:10', '2023-12-27 13:06:11', 1),
(181, 'd', 0, 'super', 'Dimulai', 2, '[{\"projectStock\":\"besi\",\"total\":\"1\"}]', '2023-12-26 09:58:05', NULL, NULL, 'd', '2023-12-26 09:58:05', '2023-12-26 09:58:05', 1),
(182, 'Project Ayam mentah', 0, 'super', 'Dimulai', 1000, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 20:45:50', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 20:45:50', '2023-12-26 20:45:50', 1),
(183, 'Project Ayam mentah', 0, 'super', 'Dimulai', 1000, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 20:46:09', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 20:46:09', '2023-12-26 20:46:09', 1),
(184, 'Project Ayam mentah', 0, 'super', 'Dimulai', 1000, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 20:46:45', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 20:46:45', '2023-12-26 20:46:45', 1),
(185, 'Project Ayam mentah', 0, 'super', 'Dimulai', 1000, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 20:50:47', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 20:50:47', '2023-12-26 20:50:47', 1),
(186, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 20:57:15', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 20:57:15', '2023-12-26 20:57:15', 1),
(187, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 20:57:28', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 20:57:28', '2023-12-26 20:57:28', 1),
(188, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 20:57:44', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 20:57:44', '2023-12-26 20:57:44', 1),
(189, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 20:58:22', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 20:58:22', '2023-12-26 20:58:22', 1),
(190, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 20:58:34', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 20:58:34', '2023-12-26 20:58:34', 1),
(191, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:03:25', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:03:25', '2023-12-26 21:03:25', 1),
(192, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:03:39', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:03:39', '2023-12-26 21:03:39', 1),
(193, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:06:39', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:06:39', '2023-12-26 21:06:39', 1),
(194, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:06:57', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:06:57', '2023-12-26 21:06:57', 1),
(195, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:07:27', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:07:27', '2023-12-26 21:07:27', 1),
(196, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:07:48', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:07:48', '2023-12-26 21:07:48', 1),
(197, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:08:17', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:08:17', '2023-12-26 21:08:17', 1),
(198, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:08:35', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:08:35', '2023-12-26 21:08:35', 1),
(199, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:08:41', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:08:41', '2023-12-26 21:08:41', 1),
(200, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:09:05', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:09:05', '2023-12-26 21:09:05', 1),
(201, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:09:20', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:09:20', '2023-12-26 21:09:20', 1),
(202, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:09:39', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:09:39', '2023-12-26 21:09:39', 1),
(203, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:09:47', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:09:47', '2023-12-26 21:09:47', 1),
(204, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:10:07', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:10:07', '2023-12-26 21:10:07', 1),
(205, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:10:13', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:10:13', '2023-12-26 21:10:13', 1),
(206, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:11:20', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:11:20', '2023-12-26 21:11:20', 1),
(207, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:11:32', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:11:32', '2023-12-26 21:11:32', 1),
(208, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:27:08', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:27:08', '2023-12-26 21:27:08', 1),
(209, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:27:24', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:27:24', '2023-12-26 21:27:24', 1),
(210, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:27:56', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:27:56', '2023-12-26 21:27:56', 1),
(211, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:29:08', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:29:08', '2023-12-26 21:29:08', 1),
(212, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:30:17', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:30:17', '2023-12-26 21:30:17', 1),
(213, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:31:02', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:31:02', '2023-12-26 21:31:02', 1),
(214, 'Project Ayam mentah', 0, 'super', 'Dimulai', 2147483647, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:31:46', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:31:46', '2023-12-26 21:31:46', 1),
(215, 'Project Ayam mentah', 0, 'super', 'Dimulai', 30000, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:33:00', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:33:00', '2023-12-26 21:33:00', 1),
(216, 'Project Ayam mentah', 0, 'super', 'Dimulai', 30000, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:33:26', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:33:26', '2023-12-26 21:33:26', 1),
(217, 'Project Ayam mentah', 0, 'super', 'Dimulai', 30000, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:34:19', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:34:19', '2023-12-26 21:34:19', 1),
(218, 'Project Ayam mentah', 0, 'super', 'Dimulai', 30000, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:34:48', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:34:48', '2023-12-26 21:34:48', 1),
(219, 'Project Ayam mentah', 0, 'super', 'Dimulai', 30000, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:35:38', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:35:38', '2023-12-26 21:35:38', 1),
(220, 'Project Ayam mentah', 0, 'super', 'Dimulai', 30000, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:35:46', NULL, NULL, 'Project buat bikin ayam goreng', '2023-12-26 21:35:46', '2023-12-26 21:35:46', 1),
(221, 'Project Ayam mentah', 0, 'super', 'Paid', 30000, '[{\"name\":\"besi\",\"total\":10},{\"name\":\"besi\",\"total\":10}]', '2023-12-26 21:36:35', '2023-12-27 16:23:15', '2023-12-27 16:23:19', 'Project buat bikin ayam goreng', '2023-12-26 21:36:35', '2023-12-27 16:23:19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `retur`
--

CREATE TABLE `retur` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `stockId` int(11) NOT NULL,
  `userInputedId` int(11) NOT NULL,
  `userInputed` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `jwt` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `jwt`, `createdAt`, `updatedAt`, `status`) VALUES
(1, 'super', '$2b$10$B2ZLqMctKTjTea7etWMYl.yo2OIfkja/eGPpv4EotzMGf3TKGIyti', 'superadmin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InN1cGVyIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MDM2OTg3ODgsImV4cCI6MTcwMzc4NTE4OH0.bmZee_nHEAM_VhdgYZMU5NbK_DT3piD6keiNxpDSBNo', '2023-12-23 16:10:53', '2023-12-27 17:39:48', 1),
(3, 'tes', '$2b$10$ZfAKzAQ5zGUo8HbXfT0sbeQljJqUw8nWDJmtXGwVdRorvqOUrtd5m', 'admin', NULL, '2023-12-27 11:09:24', '2023-12-27 11:09:24', 1),
(4, 'tes1', '$2b$10$4goyl3CU8/aQitWJx2R/gOgQxF0YSoFb8wFB7zRSYRZQMUZPwhYxK', 'admin', NULL, '2023-12-27 11:09:27', '2023-12-27 11:09:44', 0),
(5, 'dummy', '$2b$10$hQ3bf2fIBA6PiqKADi7g0eKTsqm2T4hPJXxFSb6bq6Q3T6rFcragS', 'admin', NULL, '2023-12-27 16:26:39', '2023-12-27 16:26:39', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `accountdetail`
--
ALTER TABLE `accountdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `3` (`transactionId`),
  ADD KEY `4` (`coaId`),
  ADD KEY `5` (`userInputedId`);

--
-- Indexes for table `coa`
--
ALTER TABLE `coa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk1` (`typeId`);

--
-- Indexes for table `coadetail`
--
ALTER TABLE `coadetail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventorydetail`
--
ALTER TABLE `inventorydetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkprod1` (`typeId`),
  ADD KEY `fkprod2` (`stockId`),
  ADD KEY `transactionprod1` (`transactionId`);

--
-- Indexes for table `produkkategori`
--
ALTER TABLE `produkkategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `retur`
--
ALTER TABLE `retur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `accountdetail`
--
ALTER TABLE `accountdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=204;

--
-- AUTO_INCREMENT for table `coa`
--
ALTER TABLE `coa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=406;

--
-- AUTO_INCREMENT for table `coadetail`
--
ALTER TABLE `coadetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `inventorydetail`
--
ALTER TABLE `inventorydetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `produkkategori`
--
ALTER TABLE `produkkategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT for table `retur`
--
ALTER TABLE `retur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accountdetail`
--
ALTER TABLE `accountdetail`
  ADD CONSTRAINT `3` FOREIGN KEY (`transactionId`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `5` FOREIGN KEY (`userInputedId`) REFERENCES `user` (`id`);

--
-- Constraints for table `coa`
--
ALTER TABLE `coa`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`typeId`) REFERENCES `coadetail` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
