-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost
-- Généré le :  Jeu 25 Mai 2017 à 15:25
-- Version du serveur :  10.1.21-MariaDB
-- Version de PHP :  5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sportstagram`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_image`
--

CREATE TABLE `t_image` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `path` varchar(4096) NOT NULL,
  `code` varchar(126) NOT NULL,
  `caption` varchar(256) NOT NULL,
  `nb_like` bigint(20) NOT NULL,
  `tag_1` varchar(256) NOT NULL DEFAULT '',
  `tag_2` varchar(256) NOT NULL,
  `tag_3` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `t_image`
--

INSERT INTO `t_image` (`id`, `user_id`, `path`, `code`, `caption`, `nb_like`, `tag_1`, `tag_2`, `tag_3`) VALUES
(1, 1, 'http://referentiel.nouvelobs.com/file/15368530-la-federation-francaise-de-foot-fait-enfin-sa-revolution-numerique.jpg', 'BTdaA', 'prot1', 1, '', '', ''),
(2, 1, 'http://cdn.wonderfulengineering.com/wp-content/uploads/2016/04/football-wallpaper-45-610x343.jpg', 'HTddez', 'prot2', 2, '', '', ''),
(3, 1, 'http://s2.dmcdn.net/jOk2D.jpg', 'YuhRSs', 'prot3', 3, '', '', ''),
(4, 2, 'http://www.sportune.fr/wp-content/uploads/2016/11/Rabah-Slimani-rugby-salaire.jpg', 'PJKYTt', 'kebab 4', 4, '', '', ''),
(5, 2, 'http://i.rugbyrama.fr/2016/07/08/1890974-39815320-2560-1440.jpg', 'OlhTRF', 'kebab5', 5, '', '', ''),
(6, 2, 'http://cdn.inquisitr.com/wp-content/uploads/2015/10/South-Africa-vs-New-Zealand-Rugby-World-Cup-Live-Online.jpg', 'GHGJjf', 'kebab6', 6, '', '', ''),
(7, 3, 'https://images.lesechos.fr/archives/2016/LesEchosWeekEnd/00017/ECWE00017011_1.jpg', 'JHFyfj', 'rugby7', 7, '', '', ''),
(9, 3, 'https://www.tuxboard.com/photos/2014/11/Odell-Beckham-Jr-touchdown-foot-us.jpg', 'NcdEd', 'rugby9', 9, '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `t_image_liked`
--

CREATE TABLE `t_image_liked` (
  `id_user` bigint(20) NOT NULL,
  `id_image` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `t_image_liked`
--

INSERT INTO `t_image_liked` (`id_user`, `id_image`) VALUES
(1, 7);

-- --------------------------------------------------------

--
-- Structure de la table `t_image_shared`
--

CREATE TABLE `t_image_shared` (
  `id_user` bigint(20) NOT NULL,
  `id_image` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `t_image_shared`
--

INSERT INTO `t_image_shared` (`id_user`, `id_image`) VALUES
(1, 6),
(1, 9);

-- --------------------------------------------------------

--
-- Structure de la table `t_user`
--

CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL,
  `pseudo` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `t_user`
--

INSERT INTO `t_user` (`id`, `pseudo`, `password`) VALUES
(1, 'julien', 'test'),
(2, 'samy', 'test'),
(3, 'benjamin', 'test');

-- --------------------------------------------------------

--
-- Structure de la table `t_user_follow`
--

CREATE TABLE `t_user_follow` (
  `id_user_follower` bigint(20) NOT NULL,
  `id_user_followed` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `t_user_follow`
--

INSERT INTO `t_user_follow` (`id_user_follower`, `id_user_followed`) VALUES
(1, 2);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `t_image`
--
ALTER TABLE `t_image`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `t_image`
--
ALTER TABLE `t_image`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `t_user`
--
ALTER TABLE `t_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
