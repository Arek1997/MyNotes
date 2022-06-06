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
let notesArr = JSON.parse(localStorage.getItem('note')) || [];

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
		notesArr = [];
		updateLocalStorage();
	}
};

const removeTask = function (e) {
	const index = e.target.closest('.note').dataset.id;

	if (
		e.target.classList.contains('delete-note') ||
		e.target.classList.contains('icon')
	)
		notesArr.splice(index, 1);
	e.target.closest('.note').remove();
	updateLocalStorage();
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

const updateLocalStorage = function () {
	localStorage.setItem('note', JSON.stringify(notesArr));
	renderLocalStorage();
};

const renderLocalStorage = function () {
	noteBoard.innerHTML = notesArr
		.map((note, i) => {
			return `
      
       <div class="note" style="background-color: ${note.color}" data-id="${i}">
        <div class="note-header">
          <h3 class="note-title">${note.title}</h3>
          <button class="delete-note">
            <i class="fas fa-times icon"></i>
          </button>
        </div>
        <div class="note-body">
          ${note.text}
        </div>
      </div>
      
      `;
		})
		.join('');
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
document.addEventListener('DOMContentLoaded', renderLocalStorage);
