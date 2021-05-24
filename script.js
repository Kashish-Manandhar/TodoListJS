

let data=(localStorage.getItem("todoList")) ?JSON.parse(localStorage.getItem("todoList")) : {
    todo:[],
    completed:[]
} ;


var check='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">'
+'<path d="M5.80005 9.4L8.20005 11.8L12.2 7" stroke="#3BAC88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
+'<path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#3BAC88" stroke-width="2"/>'
+'</svg>'

var rem='<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">'
+'<path d="M7.00004 0.333344C3.32004 0.333344 0.333374 3.32001 0.333374 7.00001C0.333374 10.68 3.32004 13.6667 7.00004 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7.00001C13.6667 3.32001 10.68 0.333344 7.00004 0.333344ZM10.3334 7.66668H3.66671V6.33334H10.3334V7.66668Z" fill="#FF6363"/>'
+'</svg>';

render();



function render(){

 



 
   
    for(var i=0;i<data.todo.length;i++)
    {
        var item=data.todo[i];
        addItemToDOM(item,"todo");
    }
    for(var i=0;i<data.completed.length;i++)
    {
        var item=data.completed[i];
        addItemToDOM(item,"completed");
    }
    


       
}



document.getElementById("add").addEventListener("click",function(){

    var input=document.getElementById("task").value;
    if(input)
    {
        console.log(input); 
        addEvent(input);
        
    }
});

document.getElementById("task").addEventListener("keydown",function(e){

    var input=this.value;
    if((e.code==='Enter'||e.code==='NumpadEnter')&&input)
    {
        console.log(input); 
        addEvent(input);
       
    }
});

function addEvent(input){

    document.getElementById("task").value="";
    
     data.todo.push(input);
     console.log("The task was added "+ input);

     updateList();

     addItemToDOM(input,"todo");

}



function addItemToDOM(input,id){
    var list=(id=="todo") ? document.getElementById("todo") : document.getElementById("completed");

    var item=document.createElement("li");

    item.innerText=input;
    var buttons=document.createElement("div");
    buttons.classList.add("buttons");
    var buton1=document.createElement("button");
    buton1.classList.add("complete");
    buton1.addEventListener('click',completetask);
    buton1.innerHTML=check;
    var button2=document.createElement("button");
    button2.classList.add("delete");
    button2.innerHTML=rem;

    button2.addEventListener('click',removeItems);

    buttons.appendChild(buton1);
    buttons.appendChild(button2);
    
    
    item.appendChild(buttons);


    list.insertBefore(item,list.childNodes[0]);
}

function completetask(){
    var parentnode=this.parentNode.parentNode;
    data.completed.push(parentnode.innerText);
    console.log(parentnode.innerText);
    addItemToDOM(parentnode.innerText,"completed");
    data.todo.splice(data.todo.indexOf(parentnode.innerText),1);
    parentnode.parentNode.removeChild(parentnode);
    updateList();

}

function removeItems(){


    var parentnode=this.parentNode.parentNode;
    var list=parentnode.parentNode;
    if(list.id=="todo")
    {

        data.todo.splice(data.todo.indexOf(parentnode.innerText),1);
    }
    else
    {
        data.completed.splice(data.completed.indexOf(parentnode.innerText),1);
    }
    
    list.removeChild(parentnode);

    updateList();


    

}

function updateList()
{
    localStorage.setItem("todoList",JSON.stringify(data));
}