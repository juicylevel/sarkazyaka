<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Страница тестирования API сарказяки</title>
		<script src="../js/vendor/jquery/jquery-3.1.0.min.js"></script>
		<script src="../js/vendor/underscore/underscore-min.js"></script>
        <script src="../js/service/Service.js"></script>
	</head>
	<body>
		<!--http://www.sarkazyaka/server/api-test-page.php-->

        <fieldset>
            <legend>getRecords - Получение списка записей</legend>
            <button id="getRecords_button">getRecords</button>
        </fieldset>

        <fieldset>
            <legend>createRecord - Создание сарказяки</legend>
			<div style="margin-bottom: 4px;">
				<input type="text" id="create_sarkozyaka_title" />
			</div>
			<div style="margin-bottom: 3px;">
				<select id="create_sarkozyaka_tags" size="5" multiple style="width: 300px;"></select>
			</div>
			<div>
				<button id="createRecord_button">createRecord</button>
			</div>
        </fieldset>

		<!--
        <fieldset>
            <legend>createTag - Создание тэга</legend>
            <input type="text" id="create_tag_name" />
            <input type="color" id="create_tag_color" />
            <button id="createTag_button">createTag</button>
        </fieldset>

		<fieldset>
            <legend>editTag - Редактирование тэга</legend>
            <button id="editTag_button">editTag</button>
        </fieldset>
		-->
		<fieldset>
            <legend>updateRecord - Редактирование сарказяки</legend>
            <button id="updateRecord_button">updateRecord</button>
        </fieldset>

		<script>
            var addListener = function (elementId, eventType, eventHandler) {
                var element = document.getElementById(elementId);
                element.addEventListener(eventType, eventHandler);
            };

            var getInputValue = function (elementId) {
                var element = document.getElementById(elementId);
                return element.value;
            };

			var removeChilds = function (node) {
				var last;
				while (last = node.lastChild) {
					node.removeChild(last);
				}
			};

			var getSelectedValues = function (selectId) {
				var result = [];
				var select = document.getElementById(selectId);
				var options = select && select.options;
				var opt;

				for (var i = 0, iLen = options.length; i < iLen; i++) {
					opt = options[i];
					if (opt.selected) {
						result.push(parseInt(opt.value) || opt.text);
					}
				}
				return result;
			};

			function feedTagsList () {
				var selectEl = document.getElementById('create_sarkozyaka_tags');
				removeChilds(selectEl);
				new Service().getTags().then(function (response) {
					var tags = response.result;
					if (!_.isEmpty(tags)) {
						var tag, optionEl;
						for (var i = 0; i < tags.length; i++) {
							tag = tags[i];
							optionEl = document.createElement('option');
							optionEl.style.backgroundColor = tag.color;
							optionEl.value = tag.id;
							optionEl.innerHTML = tag.name;
							selectEl.appendChild(optionEl);
						}
					}
				});
			}

            addListener('getRecords_button', 'click', function () {
                new Service().getRecords(0, 10);
            });

            addListener('createRecord_button', 'click', function () {
                var record = {
                    title: 'Новая сарказяка ' + (new Date().getTime()),
                    content: [{
                        type: 'text',
                        data: 'Текстовая плашка 1',
                        order: 1
                    }, {
                        type: 'text',
                        data: 'Текстовая плашка 2',
                        order: 2
                    }],
					tags: [1, 2]
                };
				new Service().createRecord(record);
            });

            /*addListener('createTag_button', 'click', function () {
                new Service().createTag({
                    name: getInputValue('create_tag_name'),
                    color: getInputValue('create_tag_color')
                }).then(function () {
					feedTagsList();
				});
            });

			addListener('editTag_button', 'click', function () {
                new Service().editTag({
					id: 1,
					name: 'Обновлённое наименование тэга',
					color: '#FF0000'
				});
            });*/

			addListener('updateRecord_button', 'click', function () {
                new Service().updateRecord({
					id: 4,
					title: 'Обновлённая сарказяка ' + (new Date().getTime()),
					content: {
						created: [{
	                        type: 'text',
	                        data: 'Текстовая плашка 3',
	                        order: 3
	                    }, {
	                        type: 'text',
	                        data: 'Текстовая плашка 4',
	                        order: 4
	                    }],
						updated: [{
							id: 29,
							order: 5,
							data: 'Текстовая плашка 1 обновлённая ' + (new Date().getTime())
						}],
						deleted: [30]
					},
					tags: {
						added: [3, 4],
						deleted: [1, 2]
					}
				});
            });

			//feedTagsList();
        </script>
	</body>
</html>
