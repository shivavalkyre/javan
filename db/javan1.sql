/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : javan1

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 23/12/2022 03:48:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_asset
-- ----------------------------
DROP TABLE IF EXISTS `tbl_asset`;
CREATE TABLE `tbl_asset`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_owner` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_asset
-- ----------------------------
INSERT INTO `tbl_asset` VALUES (2, 2);
INSERT INTO `tbl_asset` VALUES (3, 6);
INSERT INTO `tbl_asset` VALUES (4, 7);
INSERT INTO `tbl_asset` VALUES (5, 3);
INSERT INTO `tbl_asset` VALUES (6, 8);
INSERT INTO `tbl_asset` VALUES (7, 9);
INSERT INTO `tbl_asset` VALUES (8, 4);
INSERT INTO `tbl_asset` VALUES (9, 10);
INSERT INTO `tbl_asset` VALUES (10, 11);

-- ----------------------------
-- Table structure for tbl_asset_detail
-- ----------------------------
DROP TABLE IF EXISTS `tbl_asset_detail`;
CREATE TABLE `tbl_asset_detail`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_asset` varchar(11) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `id_product` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_asset_detail
-- ----------------------------
INSERT INTO `tbl_asset_detail` VALUES (1, '2', 1);
INSERT INTO `tbl_asset_detail` VALUES (3, '3', 2);
INSERT INTO `tbl_asset_detail` VALUES (4, '3', 3);
INSERT INTO `tbl_asset_detail` VALUES (5, '4', 4);
INSERT INTO `tbl_asset_detail` VALUES (6, '5', 5);
INSERT INTO `tbl_asset_detail` VALUES (7, '6', 1);
INSERT INTO `tbl_asset_detail` VALUES (8, '7', 5);
INSERT INTO `tbl_asset_detail` VALUES (9, '7', 4);
INSERT INTO `tbl_asset_detail` VALUES (10, '8', 1);
INSERT INTO `tbl_asset_detail` VALUES (11, '9', 2);
INSERT INTO `tbl_asset_detail` VALUES (12, '10', 4);
INSERT INTO `tbl_asset_detail` VALUES (13, '2', 2);

-- ----------------------------
-- Table structure for tbl_family
-- ----------------------------
DROP TABLE IF EXISTS `tbl_family`;
CREATE TABLE `tbl_family`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `jk` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `id_parent` int(255) NULL DEFAULT 0,
  `id_asset` int(255) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_family
-- ----------------------------
INSERT INTO `tbl_family` VALUES (1, 'Bani', 'Laki-Laki', 0, 0);
INSERT INTO `tbl_family` VALUES (2, 'Budi', 'Laki-Laki', 1, 0);
INSERT INTO `tbl_family` VALUES (3, 'Nida', 'Perempuan', 1, 0);
INSERT INTO `tbl_family` VALUES (4, 'Andi', 'Laki-Laki', 1, 0);
INSERT INTO `tbl_family` VALUES (5, 'Sigit', 'Laki-Laki', 1, 0);
INSERT INTO `tbl_family` VALUES (6, 'Hari', 'Laki-Laki', 2, 0);
INSERT INTO `tbl_family` VALUES (7, 'Siti', 'Perempuan', 2, 0);
INSERT INTO `tbl_family` VALUES (8, 'Bila', 'Perempuan', 3, 0);
INSERT INTO `tbl_family` VALUES (9, 'Lesti', 'Perempuan', 3, 0);
INSERT INTO `tbl_family` VALUES (10, 'Diki', 'Laki-Laki', 4, 0);
INSERT INTO `tbl_family` VALUES (11, 'Doni', 'Laki-Laki', 5, 0);
INSERT INTO `tbl_family` VALUES (12, 'Toni', 'Laki-Laki', 5, 0);
INSERT INTO `tbl_family` VALUES (14, 'Rahul', 'Laki-Laki', 1, 0);
INSERT INTO `tbl_family` VALUES (15, 'Novita', 'Perempuan', 14, 0);

-- ----------------------------
-- Table structure for tbl_product
-- ----------------------------
DROP TABLE IF EXISTS `tbl_product`;
CREATE TABLE `tbl_product`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT 0.00,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_product
-- ----------------------------
INSERT INTO `tbl_product` VALUES (1, 'Samsung Universe 9', 1249.00);
INSERT INTO `tbl_product` VALUES (2, 'Samsung Galaxy Book', 1499.00);
INSERT INTO `tbl_product` VALUES (3, 'iPhone 9', 549.00);
INSERT INTO `tbl_product` VALUES (4, 'iPhone X', 899.00);
INSERT INTO `tbl_product` VALUES (5, 'Huawei P30', 499.00);
INSERT INTO `tbl_product` VALUES (9, 'Xiaomi Note 4', 1000.00);

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `level` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES (1, 'Admin', 'Admin', 'Administrator');

-- ----------------------------
-- View structure for tbl_asset_detail_view
-- ----------------------------
DROP VIEW IF EXISTS `tbl_asset_detail_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `tbl_asset_detail_view` AS SELECT
	tbl_asset_detail.id, 
	tbl_asset_detail.id_asset, 
	tbl_asset_detail.id_product, 
	tbl_product.product, 
	tbl_product.price
FROM
	tbl_asset
	INNER JOIN
	tbl_asset_detail
	ON 
		tbl_asset.id = tbl_asset_detail.id_asset
	INNER JOIN
	tbl_product
	ON 
		tbl_asset_detail.id_product = tbl_product.id ;

-- ----------------------------
-- View structure for tbl_asset_header
-- ----------------------------
DROP VIEW IF EXISTS `tbl_asset_header`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `tbl_asset_header` AS SELECT
	tbl_asset.id,
	tbl_family.id as id_owner, 
	tbl_family.nama
	
FROM
	tbl_asset
	INNER JOIN
	tbl_family
	ON 
		tbl_asset.id_owner = tbl_family.id ;

-- ----------------------------
-- View structure for tbl_child
-- ----------------------------
DROP VIEW IF EXISTS `tbl_child`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `tbl_child` AS SELECT 
  * 
FROM tbl_family
WHERE 
  id NOT IN (
    SELECT id FROM tbl_parent_child_group
  ) ;

-- ----------------------------
-- View structure for tbl_family_child
-- ----------------------------
DROP VIEW IF EXISTS `tbl_family_child`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `tbl_family_child` AS SELECT
	tbl_family.nama, 
	tbl_family.jk, 
	tbl_family.id_parent, 
	tbl_family.id_asset
FROM
	tbl_family ;

-- ----------------------------
-- View structure for tbl_parent_child
-- ----------------------------
DROP VIEW IF EXISTS `tbl_parent_child`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `tbl_parent_child` AS SELECT
	tbl_family.nama, 
	tbl_family.jk, 
	tbl_family.id_asset, 
	tbl_family.id_parent, 
	tbl_family_child.id_parent AS id_parent_anak, 
	tbl_family_child.nama AS nama_anak, 
	tbl_family_child.jk AS jk_anak, 
	tbl_family_child.id_asset AS id_asset_anak
FROM
	tbl_family
	INNER JOIN
	tbl_family_child
	ON 
		tbl_family.id = tbl_family_child.id_parent
ORDER BY
	tbl_family_child.id_parent ASC ;

-- ----------------------------
-- View structure for tbl_parent_child_group
-- ----------------------------
DROP VIEW IF EXISTS `tbl_parent_child_group`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `tbl_parent_child_group` AS SELECT
	tbl_parent_child.id_parent_anak AS id, 
	tbl_parent_child.nama, 
	tbl_parent_child.jk, 
	tbl_parent_child.id_parent,
	tbl_parent_child.id_asset

FROM
	tbl_parent_child
GROUP BY
	tbl_parent_child.id_parent_anak ;

-- ----------------------------
-- View structure for tbl_parent_child_group_child
-- ----------------------------
DROP VIEW IF EXISTS `tbl_parent_child_group_child`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `tbl_parent_child_group_child` AS SELECT
	tbl_parent_child_group.id, 
	tbl_parent_child_group.nama, 
	tbl_parent_child_group.jk, 
	tbl_parent_child_group.id_parent, 
	tbl_parent_child_group.id_asset
FROM
	tbl_parent_child_group
WHERE
	tbl_parent_child_group.id_parent <> 0 ;

-- ----------------------------
-- View structure for tbl_parent_child_union
-- ----------------------------
DROP VIEW IF EXISTS `tbl_parent_child_union`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `tbl_parent_child_union` AS SELECT
	tbl_parent_child_group_child.id, 
	tbl_parent_child_group_child.nama, 
	tbl_parent_child_group_child.jk, 
	tbl_parent_child_group_child.id_parent, 
	tbl_parent_child_group_child.id_asset
FROM
	tbl_parent_child_group_child
UNION 
SELECT
	tbl_child.id, 
	tbl_child.nama, 
	tbl_child.jk, 
	tbl_child.id_parent, 
	tbl_child.id_asset
FROM
	tbl_child ;

SET FOREIGN_KEY_CHECKS = 1;
