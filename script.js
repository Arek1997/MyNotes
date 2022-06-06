const addBtn = document.querySelector('.add');
const removeAllTasks = document.querySelector('.delete-all');
const allNotes = document.getElementsByClassName('note');
const noteBoard = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const taskCategory = document.querySelector('#category');
const taskContent = document.querySelector('#text');
const errorMsg = document.querySelector('.error');
const noNotes = document.querySelector('.no-notes');
const save = document.querySelector('.save');
const cancel = document.querySelector('.cancel ');

let taskCategoryText, newNote, color;
const notesArr = [];

const showPopup = function () {
	notePanel.classList.add('showPanel');
};

const hidePanel = function () {
	notePanel.classList.remove('showPanel');
	clearPopupInputs();
};

const removeTasks = function (e) {
	if (allNotes.length === 0) {
		noNotes.classList.add('show');
		setTimeout(() => noNotes.classList.remove('show'), 1500);
	} else {
		[...allNotes].forEach((el) => el.remove());
	}
};

const removeTask = function (e) {
	if (
		e.target.classList.contains('delete-note') ||
		e.target.classList.contains('icon')
	)
		e.target.closest('.note').remove();
};

const clearPopupInputs = function () {
	taskContent.value = '';
	taskCategory.value = '0';
	errorMsg.style.visibility = 'hidden';
};

const setColor = function (value, element) {
	if (value === 'Zakupy') {
		element.style.backgroundColor = 'rgb(74, 211, 80)';
		return (color = 'rgb(74, 211, 80)');
	}

	if (value === 'Praca') {
		element.style.backgroundColor = 'rgb(255, 243, 0)';
		return (color = 'rgb(255, 243, 0)');
	}

	if (value === 'Inne') {
		element.style.backgroundColor = 'rgb(15, 203, 227)';
		return (color = 'rgb(15, 203, 227)');
	}
};

const addToLocalStorage = function () {
	color = setColor(taskCategoryText, newNote);
	const note = {
		title: taskCategoryText,
		text: taskContent.value,
		color,
	};

	notesArr.push(note);
	localStorage.setItem('note', JSON.stringify(notesArr));
};

const addNote = function () {
	if (taskCategory.value === '0' || taskContent.value === '')
		return (errorMsg.style.visibility = 'visible');

	taskCategoryText = taskCategory.options[taskCategory.value].text;
	newNote = document.createElement('div');
	newNote.classList.add('note');

	const html = `
            <div class="note-header">
          <h3 class="note-title">${taskCategoryText}</h3>
          <button class="delete-note">
            <i class="fas fa-times icon"></i>
          </button>
        </div>
        <div class="note-body">
          ${taskContent.value}
        </div>
        `;

	addToLocalStorage();

	newNote.insertAdjacentHTML('beforeend', html);
	//   newNote.innerHTML = html;
	//   noteBoard.insertAdjacentHTML("beforeend", newNote);
	setColor(taskCategoryText, newNote);
	noteBoard.append(newNote);
	hidePanel();
};

addBtn.addEventListener('click', showPopup);
cancel.addEventListener('click', hidePanel);
removeAllTasks.addEventListener('click', removeTasks);
save.addEventListener('click', addNote);
noteBoard.addEventListener('click', removeTask);
