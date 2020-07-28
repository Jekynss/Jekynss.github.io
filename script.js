let fillter=0;
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector(".main__container__item__todo-list").addEventListener("click", function(event){
        if(event.target.classList.contains('main__container__item__todo-list__li__destroy')){
            event.target.parentElement.remove();
        }
        if(event.target.classList.contains('main__container__item__todo-list__li__checkbox')){
            set_complited(event.target);
        }
    });

    document.querySelector(".input-search__icon").addEventListener("click", function(event){
        toggleAll(event.target);
    });

    document.querySelector(".search-form").addEventListener("submit", (event) => {
        event.preventDefault();
        search(event.target.querySelector('input').value);
    });
    
    document.querySelector(".main__container__item__input-search").addEventListener("keyup", (event) => {
        document.querySelector('#invisible_submit').click();
    });

    document.querySelectorAll(".main__container__filters__filter").forEach((item)=>{
        item.addEventListener("click", (event) => {
            document.querySelectorAll(".main__container__filters__filter").forEach((elem)=>{elem.classList.remove('activated')})
            event.target.classList.add('activated');
            sort_by_status(event.target.value);
        })
    });

    document.querySelector("#addTodoForm").addEventListener('submit',(event)=>{
        event.preventDefault();
        addTodo();
        refreshResult();
    });
});

function addTodo(){
    const value = document.querySelector(".main__container__input-add__input").value.replace(/[^\w\s]/gi, '');
    const list = document.createElement("li");
    list.className="main__container__item__todo-list__li";
    list.classList.add('scoped')
    const newId = "created"+document.querySelectorAll('.main__container__item__todo-list__li').length + 1;
    list.innerHTML = `<input type="checkbox" id="checkbox-${newId}" class="main__container__item__todo-list__li__checkbox" name="todo-list" value="${value}"/>
    <label for="checkbox-${newId}" class="main__container__item__todo-list__li__label"></label>
    ${value}
    <button class="main__container__item__todo-list__li__destroy"></button>`;
    document.querySelector(".main__container__item__todo-list").append(list);
    document.querySelector(".main__container__input-add__input").value="";
}

function search(search_str){
    const allTodos=document.querySelectorAll('.scoped');
    allTodos.forEach((item)=>{ 
        if(new RegExp(`\^${search_str}`,"i").test(item.querySelector('input').value))
        enableElement(item);
        else 
        disableElement(item);})
}

function sort_by_status(status){
    const allTodos=document.querySelectorAll('.main__container__item__todo-list__li');
    switch (status) {
        case "0":{
            fillter=0;
            allTodos.forEach((item)=>{
                enableElement(item);
                item.classList.add('scoped')
            })
          break;
        }
        case "2":{
            fillter=2;
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
          break;
        }
        case "1":{
            fillter=1;
            allTodos.forEach((item)=>{ 
                if (item.classList.contains('completed')) {
                 disableElement(item);
                 item.classList.remove('scoped')
                }
                 else {
                 enableElement(item);
                 item.classList.add('scoped');}
            })
          break;
        }
      }
      search(document.querySelector(".main__container__item__input-search").value);
}

function set_complited(element){
    element.parentElement.classList.toggle('completed');
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
    search(document.querySelector(".main__container__item__input-search").value);
    sort_by_status(fillter.toString());
}