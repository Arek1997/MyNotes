import { noteArrInterface } from './interface';

const addBtn = document.querySelector('.add') as HTMLButtonElement;
const removeAllTasks = document.querySelector(
	'.delete-all'
) as HTMLButtonElement;
const allNotes = document.getElementsByClassName('note')!;
const noteBoard = document.querySelector('.note-area') as HTMLDivElement;
const notePanel = document.querySelector('.note-panel') as HTMLDivElement;
const taskCategory = document.querySelector('#category') as HTMLSelectElement;
const taskContent = document.querySelector('#text') as HTMLTextAreaElement;
const errorMsg = document.querySelector('.error') as HTMLParagraphElement;
const noNotes = document.querySelector('.no-notes') as HTMLParagraphElement;
const save = document.querySelector('.save') as HTMLButtonElement;
const cancel = document.querySelector('.cancel ') as HTMLButtonElement;

let taskCategoryText: string, newNote: HTMLDivElement, color: string;
let notesArr: noteArrInterface[] =
	JSON.parse(localStorage.getItem('note')!) || [];

const showPopup = function () {
	notePanel.classList.add('showPanel');
};

const hidePanel = function () {
	notePanel.classList.remove('showPanel');
	clearPopupInputs();
};

const removeTasks = function () {
	if (allNotes.length === 0) {
		noNotes.classList.add('show');
		setTimeout(() => noNotes.classList.remove('show'), 1500);
	} else {
		[...allNotes].forEach((el) => el.remove());
		notesArr = [];
		updateLocalStorage();
	}
};

const removeTask = function (e: Event) {
	const target = e.target as HTMLElement;

	const index = (target.closest('.note') as HTMLDivElement).dataset.id!;

	if (
		target.classList.contains('delete-note') ||
		target.classList.contains('icon')
	)
		notesArr.splice(+index, 1);
	target.closest('.note').remove();
	updateLocalStorage();
};

const clearPopupInputs = function () {
	taskContent.value = '';
	taskCategory.value = '0';
	errorMsg.style.visibility = 'hidden';
};

const setColor = function (value: string, element: HTMLDivElement) {
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
		.map((note, i: number) => {
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
	if (taskCategory.value === '0' || taskContent.value === '') {
		return (errorMsg.style.visibility = 'visible');
	}

	taskCategoryText = taskCategory.options[+taskCategory.value].text;
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
