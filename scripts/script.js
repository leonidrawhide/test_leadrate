'use strict';

function randomNumber(min, max) { 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Получаем данные для вывода и выводим их
 * @param {string} title название для задачи
 * @param {string} description описание, взятое из чужого названия
 * @param {number} id номер задачи
 * @param {boolean} completed завершена задача или нет
 * @returns html код для строчки с задачей
 */

function create(title, description, id, completed) {
	let displayValue = `contents`

	console.log(`%cTask № ${id+1} \nName        - ${title} \nDescription - ${description} \nCompleted   - ${completed}`, 
	`background: black; color: green`)
	if (title == undefined) title = "Lorem"
	if (description == undefined) description = "ipsum"
	if (id == undefined) id = 0
	if (completed == true) {
		completed = 'checked'
		displayValue = `none`
	} else completed = ''
	
	return(
		`<div class="main__list_front_form_block" id="form_block-`+ id + `">
						<div class="main__list_front_form_block_checkbox-wrapper">
							<input type="checkbox" id="check-` + id + `" name="check" class="main__list_front_form_block_checkbox-wrapper_checkbox" ` + completed + `/>
							<div class="main__list_front_form_block_checkbox-wrapper_custom-checkbox" id="custom-` + id + `"></div>
						</div>
						<label for="check-` + id + `" id="text-` + id + `" class="main__list_front_form_block_text-wrapper">
							<div id="check-` + id + `-title" class="main__list_front_form_block_title">`
								+ title +
							`</div>
							<div id="check-` + id + `-description" class="main__list_front_form_block_description" style="display: ` + displayValue + `;">
								` + description + `
							</div>
						</label>
					</div>`
	)
}

/**
 * просматриваем api, и 4 раза вызываем ф-цию для вывода 
 * html кода
 */

function fetchTitles() {
	return (fetch('https:/jsonplaceholder.typicode.com/todos')
		.then((response) => {
			return response.json();
		})
		.then((body) => {
			for (let i = 0; i < 4; i++) {
				let k = randomNumber(0, 199)
				document.getElementById('list-of-jobs').innerHTML += create(body[k].title, body[randomNumber(0, 199)].title, i, body[k].completed)
			}
		})
		.catch(function (err) {
			console.log('error: ' + err);
			throw err
		})
	)
}

/**
 * eventы для нажатия и мыши
 */

fetchTitles().then(function() {
	for (let i = 0; i < 4; i++) {
		const blockElement = document.getElementById(`form_block-` + i);

		blockElement.addEventListener('mouseenter', () => {
			if (document.getElementById(`check-` + i).checked) {
				document.getElementById(`check-` + i + `-title`).style.color = 'white';
				document.getElementById(`custom-` + i).style.background = '#FF8469';
			}
			if (!document.getElementById(`check-` + i).checked) {
				document.getElementById(`check-` + i + `-title`).style.color = '#d95133';
				document.getElementById(`custom-` + i).style.background = 'rgba(255, 132, 105, 0.2)';
			}
		})

		blockElement.addEventListener('mouseleave', () => {
			if (document.getElementById(`check-` + i).checked) {
				document.getElementById(`check-` + i + `-title`).style.color = 'gray';
				document.getElementById(`custom-` + i).style.background = '#FF8469';
			}
			if (!document.getElementById(`check-` + i).checked) {
				document.getElementById(`check-` + i + `-title`).style.color = 'white';
				document.getElementById(`custom-` + i).style.background = '#4f5565';
			}
		})

		const checkButton = document.getElementById(`check-` + i);

		checkButton.addEventListener('input', (event) => {
			if (document.getElementById(`check-` + i).checked) {
				document.getElementById(`check-` + i + `-title`).style.textDecoration = 'line-through';
				document.getElementById(`check-` + i + `-title`).style.color = 'grey';
				document.getElementById(`check-` + i + `-description`).style.display = 'none';
				document.getElementById(`custom-` + i).style.background = '#FF8469';
			}
			if (!document.getElementById(`check-` + i).checked) {
				document.getElementById(`check-` + i + `-title`).style.textDecoration = 'none';
				document.getElementById(`check-` + i + `-title`).style.color = 'white';
				document.getElementById(`check-` + i + `-description`).style.display = 'contents'
				document.getElementById(`custom-` + i).style.background = '#4f5565';
			}
		})
	}
})

