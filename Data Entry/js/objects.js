function checkId(){
    var id=document.studentForm.idNumber.value;
    var pattern=/[a-z]/g;
    var result = id.match(pattern);
    if(result!=null){
    document.getElementById('idHelp').innerText="Enter valid ID";
    document.getElementById('idNumber').value="";
    }
    else
    document.getElementById('idHelp').innerText="";
}

function checkName(){
    var name= document.studentForm.firstName.value + document.studentForm.lastName.value;
    var pattern=/[0-9]/g;
    var result=name.match(pattern);
    if(result!=null){
    document.getElementById('nameHelp').innerText="Enter Valid Name";
    document.getElementById('firstName').value="";
    document.getElementById('lastName').value="";
    }
    else
    document.getElementById('nameHelp').innerText="";
}

function validate() {
        var emailID = document.studentForm.Email.value;
        atpos = emailID.indexOf("@");
        dotpos = emailID.lastIndexOf(".");
        
        if (atpos < 1 || ( dotpos - atpos < 2 )) {
           alert("Please enter correct email ID")
           document.myForm.Email.focus() ;
           return true;
        }
    return false;
}

function addStudent() {

    var item = {};
     if (validate()) {
         return;
     }
    item.studentId = document.studentForm.idNumber.value
    item.studentName = document.studentForm.firstName.value + ' ' +document.studentForm.lastName.value
    item.studentEmail = document.studentForm.Email.value

    var table = document.getElementById("studentTable").getElementsByTagName('tbody')[0];
    var row = table.insertRow(table.rows.length);

    var idCell = row.insertCell(0);
    var studentNameCell = row.insertCell(1);
    var emailCell = row.insertCell(2);
    var editCell=row.insertCell(3);

    idCell.innerHTML = item.studentId;
    studentNameCell.innerText = item.studentName;
    emailCell.innerText = item.studentEmail;
    editCell.innerHTML='<button type="button" class="btn btn-secondary btn-sm" onclick="editStudent(getRowIndex(this))">Edit</button> <button type="button" class="btn btn-secondary btn-sm" onclick="deleteStudent(getRowIndex(this))">Delete</button>'
}
function getRowIndex(el)
{
while( (el = el.parentNode) && el.nodeName.toLowerCase() !== 'tr' );

   if( el ) 
        return el.rowIndex;
}
function editStudent(index) {
    //console.log(index);
    //var objCells = myTab.rows.item(i).cells;
    var myTab = document.getElementById('studentTable');
    var objCells=myTab.rows.item(index).cells;
    for (var j = 0; j < objCells.length-1; j++) {
        if(j==0)
            document.getElementById('idNumber').value=objCells.item(j).innerHTML;
        if(j==1){
             var name=objCells.item(j).innerHTML;
             const parts=name.split(" ");
             let fname=parts[0];
             let lname=parts[1];
            document.getElementById('firstName').value=fname;
            document.getElementById('lastName').value=lname;
        }
        if(j==2)
            document.getElementById('Email').value=objCells.item(j).innerHTML;
    }
    myTab.deleteRow(index);
}
function deleteStudent(index){
    var r = confirm("Are you sure you want to delete this record?");
    if (r == true)
        document.getElementById('studentTable').deleteRow(index);
}
