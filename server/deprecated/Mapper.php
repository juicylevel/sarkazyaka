<?php

/**
 * Вспомогательный класс для преобразования полей
 * трансферных объектов для БД и клиента.
 */
class Mapper {
    /**
     * Соотношение наименования поля объекта, использующееся в клиенте,
     * и натменования поля в таблице БД.
     * (client field => db table field)
     */
    protected $fieldsMap = array(
        'order'  => 'item_order',
        'fileId' => 'file_id'
    );

    /**
     * Соотношение типа контента и наименования поля в таблице БД, в котором
     * хранятся данные элемента контента.
     */
    protected $contentItemsMap = array(
        'text' => 'text',
        'image' => 'file_id',
        'audio' => 'file_id',
        'video' => 'url'
    );

    /**
     * Преобразование полей объектов.
     *
     * @param $source array Исходный трансфер.
     * @param $target string Целевое преобразование (для БД или для клиента).
     * @return array Результат преобразования.
     */
    protected function map ($source, $target) {
        $source = wrap_to_array($source);
        $result = array();

        $fieldsMap = $target == 'client' ?
            array_flip($this->fieldsMap) :
            $this->fieldsMap;

        for ($i = 0; $i < count($source); $i++) {
            $item = $source[$i];
            $convertedItem = array();
            foreach ($item as $key => $value) {
                if (isset($this->fieldsMap[$key])) {
                    $dbField = $this->fieldsMap[$key];
                    $convertedItem[$dbField] = $value;
                } else {
                    $convertedItem[$key] = $value;
                }
            }
            $result[] = $convertedItem;
        }

        return $result;
    }
}

?>
