let inputBar = document.querySelector('#input');
let itemList = document.querySelector('#itemList');
let itemsLeft = document.querySelector('#counter');
let footerButtons = document.getElementById('buttonFooter');

let itemArray = [];


function itemCounter() {
    let todocounter = itemArray.filter(item => !item.completed).length;

    itemsLeft.textContent = todocounter;
  
    if (todocounter > 0) {
      footerButtons.style.display = 'flex';
    } else {
      footerButtons.style.display = 'none';
    }
  }

  inputBar.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
      addNewItem();
    }
  });

function addNewItem() {
    let newItem = inputBar.value.trim();
  
    if (newItem !== '') {
      itemArray.push({ text: newItem, completed: false });
      addItemToDOM(newItem); 
      itemCounter(); 
      inputBar.value = ''; 
    }
  }


function addItemToDOM(newItem) {
  let newListItem = document.createElement('li');
  let checkbox = document.createElement('input');
  let label = document.createElement('label');
  let deleteButton = document.createElement('button');

  
  checkbox.type = 'checkbox';
  label.textContent = newItem;
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-button'); 

 
  label.appendChild(checkbox);
  newListItem.appendChild(label);
  newListItem.appendChild(deleteButton);
  itemList.appendChild(newListItem);

  checkbox.addEventListener('change', function() {
    let labelText = label.textContent.trim(); 

    let itemToUpdate = itemArray.find(item => item.text === labelText);

    itemToUpdate.completed = checkbox.checked;

    itemCounter();
});
  
  deleteButton.addEventListener('click', () => {
    
    newListItem.remove();
    itemCounter(); 
  });
}
 itemCounter(); 

