
var todos ;
let idedit;

window.addEventListener("DOMContentLoaded",()=>{
   

if(!localStorage["todo"]){
todos = readFormData();

}
else{
    todos = JSON.parse(localStorage["todo"]);
}

//////this is like our main function that solves the creation and editing of data
function submit_data(e) {
    e.preventDefault();
    if (document.getElementById ("ia").innerHTML == "Save"){
        updateRecord(idedit);
    }
    else{
        if(validate()){
            readFormData();          
            resetForm();
        }
    }   
    location.reload()
        
}

////calling the click function to add and update
document.getElementById('ia').onclick = submit_data
//this renders the table containing all we want
window.onload(insertNewRecord(todos));

// /////this function validates inputs
function validate() {
    isValid = true;
    if (document.getElementById("txtTitle").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
        document.getElementById("fullNameValidationError").style.background="#abffac";
        
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

////// this help to reset the textarea back to empty
function resetForm() {
    document.getElementById("txtTitle").value = "";
    document.getElementsByClassName("date").value = "";
    selectedRow = null;
}

/// this function creates the elements in the table
function insertNewRecord(data) {
    console.log("this is data: " + data)
    console.log("Type of data "+ typeof data)
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    
       for(let i=0; i<data.length; i++){
        var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data[i].todo;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data[i].date;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML += (`<button onClick='onEdit(${i})'' id=${i} class="btn btn-primary">Edit</button>
                       <button onClick='onDelete(${i})' id =${i} class="btn btn-danger">Delete</button>`);
    }
}

///this function reads data from the html text field
function readFormData() {

    let val=new Date();
    let vale= val.getFullYear() +"-" +  val.getMonth()  +"-" + val.getDate() 
    let todo = document.getElementById("txtTitle").value;
    let date = vale;
   
    if( todo.match(/\W+/) || todo == ''){

         return false;
    }

    if(localStorage['todo']){
        todo_data=JSON.parse(localStorage["todo"]);
        todo_data.push({todo,date})
        localStorage["todo"] = JSON.stringify(todo_data);
        return  todo_data
   }
    else{
         localStorage['todo'] = JSON.stringify([{todo,date}])
         todo_data=JSON.parse(localStorage["todo"]);
         console.log("todo_data has been taken")
         console.log(todo_data)
    }
    console.log(todo_data)
    return todo_data
}
 readFormData()

})

/// this function is to delete the selected row
function onDelete(td) {
    tod =  JSON.parse(localStorage["todo"]);
    console.log("this is tod:", tod)
    if (confirm('Are you sure to delete this record ?')) {
         tod.splice(td,1)
        localStorage["todo"] = JSON.stringify(tod)
        location.reload()
    }
}

///this is to update back the value into the local storage
function updateRecord(td) {
    let updateDate = new Date ();
    let setUpdatedDate = updateDate.getFullYear() + "-" + updateDate.getMonth() + "-"  + updateDate.getDate()
    tok =  JSON.parse(localStorage["todo"]);
    console.log("this is tod:", tok)
    tok[td].todo = document.getElementById("txtTitle").value
    tok[td].date = setUpdatedDate
    localStorage["todo"] = JSON.stringify(tok)
    location.reload()
    
}

///////this return the text to edit back into the textbox to be edited
function onEdit(td) {
    tod =  JSON.parse(localStorage["todo"]);
    selectedRow = tod[td].todo;
    document.getElementById("txtTitle").value = selectedRow;
    document.getElementById ("ia").innerHTML = "Save";
    idedit = td
}



function searchtodo(){
   let keyword = document.getElementById("search").value
   if(keyword.length==0){
    document.getElementById("searchdiv").innerHTML+=`<button class="btn btn-primary">Input cannot be empty</button>`
    document.getElementById("searchdiv").classList.remove("hidesearchdiv")
    setTimeout(() => {
        location.reload()
    }, 2000);
    
}
  else{

   console.log( "this is key",keyword)
   let newReg = new RegExp(keyword)
   fullArr =  JSON.parse(localStorage["todo"]);
   console.log(" this is full Arr",fullArr)
    let filtrates = fullArr.filter((part)=>{
        console.log("this is part  :" + part['todo'])
        if(part['todo'].match(newReg)){
            console.log(part)
            return part
        }

    })
    console.log("this is filtrates: ", filtrates)
    if(filtrates.length==0){
        document.getElementById("searchdiv").innerHTML+=`<button class="btn btn-primary">No Result Match</button>`
        document.getElementById("searchdiv").classList.remove("hidesearchdiv")
        setTimeout(() => {
            location.reload()
        }, 2000);
      }
   
    for (let i = 0; i<filtrates.length; i++){
        document.getElementById("searchdiv").classList.remove("hidesearchdiv")
        document.getElementById("searchdiv").innerHTML+=`<br><a href="#" id="${i}" class="btn btn-success">${filtrates[i].todo}</a><br> `
    }
  }
}


document.getElementById('searchbutton').onclick = searchtodo

function takemethere(where){
    location.reload()

}


// if (document.getElementById("txtTitle").value == "") {
//     isValid = false;
//     document.getElementById("fullNameValidationError").classList.remove("hide");
//     document.getElementById("fullNameValidationError").style.background="#abffac";
    
// } else {
//     isValid = true;
//     if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
//         document.getElementById("fullNameValidationError").classList.add("hide");
// }