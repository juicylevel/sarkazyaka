<?php

/**
* Get all values from specific key in a multidimensional array
*
* @param $key string
* @param $arr array
* @return array
*/
function array_value_recursive ($key, array $arr) {
    $val = array();
    array_walk_recursive($arr, function ($v, $k) use ($key, &$val) {
        if ($k == $key) array_push($val, $v);
    });
    return $val;
}

/**
 * Форматирование строки типа DATETIME в формат d.m.Y H:i:s
 *
 * @param $dateTimeString string
 * @return string
 */
function format_date_time ($dateTimeString) {
    $result = null;
    if (!empty($dateTimeString)) {
        $dateTime = new DateTime($dateTimeString);
        $result = $dateTime->format('d.m.Y H:i:s');
    }
    return $result;
}

/**
 * Добавление поля со значением всем элементам массива.
 *
 * @param $array array Целевой массив.
 * @param $fieldName string Ключ нового поля.
 * @param $fieldValue string Значение нового поля.
 */
function add_field_to_array_items (&$array, $fieldName, $fieldValue) {
    foreach ($array as $key => $item) {
        $array[$key][$fieldName] = $fieldValue;
    }
}

/**
 * Метод при необходимости оборачивает сингулярные данные в массив.
 * Если $data массив, то возвращает копию этого массива.
 *
 * @param $data array Оборачиваемые данные.
 * @return array Массив данных.
 */
function wrap_to_array ($data) {
    $array = null;
    if (is_assoc($data)) {
        $array = array();
        $array[] = $data;
    } else {
        $array = $data;
    }
    return $array;
}

/**
 * Метод определяет, является массив ассоциативным.
 *
 * @param $array array Целевой массив.
 * @return boolean
 */
function is_assoc ($array) {
    $keys = array_keys($array);
    return $keys !== array_keys($keys);
}

/**
 * Извлечение значения поля из целевого массива.
 *
 * @param $source array Целевой массив.
 * @param $field string Наименование поля.
 * @return Значение поля.
 */
function extarct_value ($source, $field) {
    return isset($source[$field]) ? $source[$field] : null;
}

/**
 * Извлечение значений указанного поля из целевого массива.
 *
 * @param $source array Целевой массив.
 * @param $field string Наименование поля.
 * @return Значения поля.
 */
function extarct_values ($source, $field) {
	$result = array();
	if (is_assoc($source)) {
		$source = wrap_to_array($source);
	}
	foreach ($source as $index => $item) {
		if (isset($item[$field])) {
			$result[] = $item[$field];
		}
	}
    return $result;
}

/**
 * Получение элементов массива по значению указанного поля элементов.
 *
 * @param $array array Целевой массив.
 * @param $fieldName string Наименование целевого поля.
 * @param $fieldValue Значение поля.
 * @return array
 */
function get_items_by_field ($array, $fieldName, $fieldValue) {
    $result = array();
    foreach ($array as $index => $item) {
        if (isset($item[$fieldName]) && $item[$fieldName] == $fieldValue) {
            $result[] = $item;
        }
    }
    return $result;
}

/**
 * Объединение ассоциативных массивов, которые являются элементами
 * индексированных массивов $array1 и $array2, по ключу $indexField,
 * который должен быть в этих ассоциативных массивах.
 *
 * $a = array(
 *     0 => array('id'=>1, 'data'=>'text1'),
 *     1 => array('id'=>2, 'data'=>'text2'),
 *     2 => array('id'=>3, 'data'=>'text3')
 * );

 * $b = array(
 *     0 => array('id'=>1, 'type'=>'type1'),
 *     1 => array('id'=>3, 'type'=>'type3'),
 *     2 => array('id'=>2, 'type'=>'type2')
 * );
 *
 * $c = merge_array_fields($a, $b, 'id');
 *
 * result:
 * Array (
 *     [0] => Array ( [id] => 1 [data] => text1 [type] => type1 )
 *     [1] => Array ( [id] => 2 [data] => text2 [type] => type2 )
 *     [2] => Array ( [id] => 3 [data] => text3 [type] => type3 )
 * )
 */
function merge_array_fields ($array1, $array2, $indexField) {
	$result = array();
	if (count($array1) === count($array2)) {
		foreach ($array1 as $index1 => $item1) {
			$indexValue = $item1[$indexField];
			foreach ($array2 as $index2 => $item2) {
				if ($indexValue == $item2[$indexField]) {
					$result[] = array_merge($item1, $item2);
					break;
				}
			}
		}
	}
	return $result;
}

?>
