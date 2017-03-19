-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Мар 19 2017 г., 06:39
-- Версия сервера: 5.6.25
-- Версия PHP: 5.5.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `sarkazyaka`
--

-- --------------------------------------------------------

--
-- Структура таблицы `content_item`
--

CREATE TABLE IF NOT EXISTS `content_item` (
  `id` int(11) NOT NULL,
  `item_order` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `record_id` int(11) NOT NULL,
  `text` text,
  `url` text,
  `file_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `content_item`
--

INSERT INTO `content_item` (`id`, `item_order`, `type`, `record_id`, `text`, `url`, `file_id`) VALUES
(29, 5, 'text', 4, 'Текстовая плашка 1 обновлённая 1478947884313', NULL, NULL),
(31, 3, 'text', 4, 'Текстовая плашка 3', NULL, NULL),
(32, 4, 'text', 4, 'Текстовая плашка 4', NULL, NULL),
(33, 1, 'text', 5, 'Текстовая плашка 1', NULL, NULL),
(34, 2, 'text', 5, 'Текстовая плашка 2', NULL, NULL),
(35, 1, 'text', 6, 'Текстовая плашка 1', NULL, NULL),
(36, 2, 'text', 6, 'Текстовая плашка 2', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `file`
--

CREATE TABLE IF NOT EXISTS `file` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `type` varchar(32) NOT NULL,
  `add_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `record`
--

CREATE TABLE IF NOT EXISTS `record` (
  `id` int(11) NOT NULL,
  `title` varchar(32) NOT NULL,
  `user_id` int(11) NOT NULL,
  `record_id` int(11) DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `record`
--

INSERT INTO `record` (`id`, `title`, `user_id`, `record_id`, `create_date`, `update_date`) VALUES
(4, 'Обновлённая сарказяка 1478947884', 2, NULL, '2016-11-12 13:49:44', NULL),
(5, 'Новая сарказяка 1478949269321', 2, NULL, '2016-11-12 14:14:29', NULL),
(6, 'Новая сарказяка 1478949278377', 2, NULL, '2016-11-12 14:14:38', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `record_tag`
--

CREATE TABLE IF NOT EXISTS `record_tag` (
  `id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `record_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `record_tag`
--

INSERT INTO `record_tag` (`id`, `tag_id`, `record_id`) VALUES
(25, 3, 4),
(26, 4, 4),
(27, 1, 5),
(28, 2, 5),
(29, 1, 6),
(30, 2, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `tag`
--

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `color` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tag`
--

INSERT INTO `tag` (`id`, `name`, `color`) VALUES
(1, 'Обновлённое наименование тэга', '#FF0000'),
(2, 'шпроты в сахаре', '#ec9f4a'),
(3, 'реклама', '#5fbfd8'),
(4, 'дружко', '#f35043');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `social_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `social_id`) VALUES
(1, 1072742),
(2, 1051165);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `content_item`
--
ALTER TABLE `content_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `record_id` (`record_id`),
  ADD KEY `file_id` (`file_id`);

--
-- Индексы таблицы `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `record_id` (`record_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `record_id_2` (`record_id`);

--
-- Индексы таблицы `record_tag`
--
ALTER TABLE `record_tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `record_id` (`record_id`),
  ADD KEY `record_id_2` (`record_id`);

--
-- Индексы таблицы `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `content_item`
--
ALTER TABLE `content_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT для таблицы `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `record`
--
ALTER TABLE `record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `record_tag`
--
ALTER TABLE `record_tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT для таблицы `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `content_item`
--
ALTER TABLE `content_item`
  ADD CONSTRAINT `content_item_ibfk_1` FOREIGN KEY (`record_id`) REFERENCES `record` (`id`),
  ADD CONSTRAINT `content_item_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`);

--
-- Ограничения внешнего ключа таблицы `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `record_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `record_ibfk_2` FOREIGN KEY (`record_id`) REFERENCES `record` (`id`);

--
-- Ограничения внешнего ключа таблицы `record_tag`
--
ALTER TABLE `record_tag`
  ADD CONSTRAINT `record_tag_ibfk_1` FOREIGN KEY (`record_id`) REFERENCES `record` (`id`),
  ADD CONSTRAINT `record_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
