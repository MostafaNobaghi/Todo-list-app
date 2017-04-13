var todolist = document.getElementById('todo');

// the list date and item, saving in the following Object to save in local storage
var data =(localStorage.getItem('todolist'))?JSON.parse(localStorage.getItem('todolist')): {
    todo: [],
    completed: []
}



// SVG icons code
var completeSvg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="nofill" width="22" height="22"></rect><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"></path></g></svg>';
var removeSvg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"></path></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"></path></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"></path></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"></path></g></g></g></svg>';

//reload Data object from local storage in the start
function reloadLocalStorage(text){
    for(var i = 0; i< data.todo.length; i++){
        text = data.todo[i];
        addItemToPage(text, todolist );
    }
    for(var i = 0; i<data.completed.length; i++){
        text = data.completed[i];
        var completedList = document.getElementById('completed')
        addItemToPage(text, completedList);
    }
}

reloadLocalStorage();

// when user click "add" button
document.getElementById('add').addEventListener('click', addItem);

//when user press "Enter" key
document.getElementById('item').addEventListener('keydown', function(e){
    if(e.key === "Enter"){
        addItem();
    }
});

// when user click on add button or press enter key in item, follewing function run to add item
function addItem() {
    var value = document.getElementById('item').value;
    // if item input not empty
    if(value){
        addItemToPage(value, todolist);
        document.getElementById('item').value = '';
        data.todo.push(value);
        dataObjectUpdated();
        
    }
}

// this function reset Data object to local storage after every changes
function dataObjectUpdated(){
    localStorage.setItem('todolist', JSON.stringify(data));
}

//remove iteme function
function removeItem(){
    var parent = this.parentNode.parentNode.parentNode;
    var item = this.parentNode.parentNode;
    var value = item.innerText;
    parent.removeChild(item);
    var parentID = parent.id;
    if(parentID === 'todo'){
        data.todo.splice(data.todo.indexOf(value),1);
    } else {
        console.log(data.completed.indexOf(value),1);
        data.completed.splice(data.completed.indexOf(value),1);
        
    }
    dataObjectUpdated();
}



//complete iteme function
function completeItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    parentID = parent.id;
    var value = item.innerText;

    if(parentID === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }

    var target = (parentID === 'todo')?document.getElementById('completed'):document.getElementById('todo');
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    dataObjectUpdated()

}

// Adds a new item to the list from list, and from data object
function addItemToPage(text, list){
    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.innerHTML=removeSvg;
    remove.classList.add('remove');
    // adding "remove" Event listener
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.innerHTML=completeSvg;
    complete.classList.add('complete');
    // adding "complete" Event listener
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    list.insertBefore(item, list.childNodes[0]);
    dataObjectUpdated();
}



