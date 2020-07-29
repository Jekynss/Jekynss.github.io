let fillter="All";
let allTodos;
document.addEventListener("DOMContentLoaded", function () {
    let searchForm= document.forms['search-form'];
    let addTodoForm = document.forms['addTodoForm'];

    document.querySelector(".main__container").addEventListener("click", function(event){  //delegator
        if(event.target.classList.contains('todo-list__li__destroy')){
            event.target.parentElement.remove();
        }

        if(event.target.classList.contains('todo-list__li__checkbox')){
            set_complited(event.target);
        }

        if(event.target.classList.contains("filters-block__filter")){
            document.querySelectorAll(".filters-block__filter").forEach((elem)=>{elem.classList.remove('activated')})
            event.target.classList.add('activated');
            sort_by_status(event.target.value);
            search(document.querySelector(".search_string").value);

        }
    });

    document.querySelector(".input-search__icon").addEventListener("click", function(event){
        toggleAll(event.target);
    });

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        search(searchForm.search_string.value);
    });
    
    document.querySelector(".search_string").addEventListener("keyup", (event) => {
        searchForm.requestSubmit();
    });

    addTodoForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        addTodo();
        refreshResult();
    });
});

function addTodo(){
    const value = addTodoForm.add_string_input.value.replace(/[^\w\s]/gi, '');
    const list = document.createElement("li");
    const prevLists = document.querySelectorAll('.main__container__item__todo-list__li input');
    const idPrevCheckbox = prevLists[prevLists.length-1].id;
    list.className="main__container__item__todo-list__li";
    list.classList.add('scoped');
    const newId = "checkbox-"+(Number.parseInt(idPrevCheckbox.split("-")[1])+1).toString();
    list.innerHTML = `<input type="checkbox" id="${newId}" class="todo-list__li__checkbox" name="todo-list" value="${value}"/>
    <label for="${newId}" class="main__container__item__todo-list__li__label"></label>
    ${value}
    <button class="todo-list__li__destroy"></button>`;
    document.querySelector(".main__container__item__todo-list").append(list);
    document.querySelector(".main__container__input-add__input").value="";
}

function search(search_str){
    allTodos=document.querySelectorAll('.scoped');
    allTodos.forEach((item)=>{ 
        if(new RegExp(`\^${search_str}`,"i").test(item.querySelector('input').value))
        enableElement(item);
        else 
        disableElement(item);})
}

function sort_by_status(status){
    allTodos=document.querySelectorAll('.main__container__item__todo-list__li');
    status === "All" ?  sortAll() : 
    status === "Completed" ? sortCompleted() :
    status === "Active" ? sortActive() : sortAll();
}

function sortAll() {
  fillter = "All";
  allTodos.forEach((item) => {
    enableElement(item);
    item.classList.add("scoped");
  });
}

function sortCompleted(){
    fillter="Completed";
    allTodos.forEach((item)=>{ 
        if (item.classList.contains('completed')){
         item.classList.add('scoped');
         enableElement(item);
        }
         else {
         disableElement(item);
         item.classList.remove('scoped');
        }
    })
}

function sortActive(){
    fillter="Active";
    allTodos.forEach((item)=>{ 
        if (item.classList.contains('completed')) {
         disableElement(item);
         item.classList.remove('scoped')
        }
         else {
         enableElement(item);
         item.classList.add('scoped');}
    })
}

function set_complited(element){
    element.parentElement.classList.toggle('completed');
    refreshResult();
}

function enableElement(elem){
    elem.classList.remove('disabled')
    elem.classList.add('enabled')
}

function disableElement(elem){
    elem.classList.add('disabled')
    elem.classList.remove('enabled')
}

function toggleAll(arrow){
    const allTodosChecks=document.querySelectorAll('.main__container__item__todo-list__li');
    if (arrow.classList.contains('arrow-active')){
        allTodosChecks.forEach((elem)=>{elem.classList.remove('completed'); elem.querySelector('input').checked=false});
        arrow.className="input-search__icon"
    }
    else
    {
        allTodosChecks.forEach((elem)=>{elem.classList.add('completed');elem.querySelector('input').checked=true});
        arrow.className="arrow-active"
    }
    refreshResult();
}

function refreshResult(){
    sort_by_status(fillter);
    search(document.querySelector(".search_string").value);
}