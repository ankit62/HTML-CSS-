var items = [];
var counter = 1;

//formname = orderForm


function setWarning(text) {

    var alertWarningHTML = ''
    alertWarningHTML += '<div class="alert alert-dismissible alert-danger">'
    alertWarningHTML += '<button type="button" class="close" data-dismiss="alert">&times;</button>'
    alertWarningHTML += '<h4 class="alert-heading">Warning!</h4>'
    alertWarningHTML += '<p class="mb-0">' + text + '</p>'
    alertWarningHTML += '</div>'

    document.getElementById('message').style.display = 'block'
    document.getElementById('message').innerHTML = alertWarningHTML;


}

function validate() {
    if (isNaN(document.orderForm.itemQty.value) || document.orderForm.itemQty.value == '') {
        setWarning('Quantity has to be a positive number and cannot be empty either.');
        return true;
    } else if (parseInt(document.orderForm.itemQty.value) < 0) {
        setWarning('Quantity has to be a positive number.');
        return true;

    } else if (isNaN(document.orderForm.itemPrice.value) || document.orderForm.itemPrice.value == '') {
        setWarning('Price has to be a positive number and cannot be empty either.');
        return true;

    } else if (parseInt(document.orderForm.itemPrice.value) < 0) {
        setWarning('Price has to be a positive number.');
        return true;
    }
    return false;
}

function addItem() {
    var item = {};
    if (validate()) {
        return;
    }
    item.id = counter;
    item.itemName = document.orderForm.itemName.value
    item.itemCode = document.orderForm.itemCode.value
    item.itemQty = document.orderForm.itemQty.value
    item.itemUnitPrice = document.orderForm.itemPrice.value
    item.itemNetPrice = parseInt(item.itemUnitPrice) * parseInt(item.itemQty)

    ++counter

    console.log('Item')
    console.log(item)

    var table = document.getElementById("ordersTable").getElementsByTagName('tbody')[0];
    var row = table.insertRow(table.rows.length);

    var idCell = row.insertCell(0);
    var itemNameCell = row.insertCell(1);
    var itemCodeCell = row.insertCell(2);
    var itemQtyCell = row.insertCell(3);
    var itemUnitPriceCell = row.insertCell(4);
    var itemNetPriceCell = row.insertCell(5);

    idCell.innerText = item.id;
    itemNameCell.innerText = item.itemName;
    itemCodeCell.innerText = item.itemCode;
    itemQtyCell.innerText = item.itemQty;
    itemUnitPriceCell.innerText = item.itemUnitPrice
    itemNetPriceCell.innerText = item.itemNetPrice

    items.push(item)

    totalBill()
}

function totalBill() {
    var itemCount = items.length;
    var itemAmount = 0;
    var itemAmount1=0;
    items.forEach(i => {
        itemAmount += parseInt(i.itemNetPrice);
    });
    itemAmount1=itemAmount
    itemAmount+=0.18*itemAmount;
    document.getElementById('count').innerText = ''
    document.getElementById('cost').innerText = ''
    document.getElementById('total').innerText = ''

    document.getElementById('count').innerText = itemCount
    document.getElementById('cost').innerText = itemAmount1
    document.getElementById('total').innerText = itemAmount
}

function checkOut() {
    $('#modal-info').modal()
    $('#modal-amount').text($('#total').text())
}
function payment() {

    let cardNumber=$('#cardNumber').val()
    let expiryMonth=$('#expiryMonth').val()
    let expiryYear=$('#expiryYear').val()
    let cardCvv=$('#cardCvv').val()
    let cardName=$('#cardName').val()
    let flag1=-1
    let flag2=-1
    let flag3=-1
    
    if(checkCardNumber(cardNumber)){
        flag1=1
        $('#helpIdNumber').text("")
    }
    else{
        
        $('#helpIdNumber').text("Invalid number")
        $('#cardNumber').val("")
        $('#cardNumber').focus()
        document.getElementById('viewBill').innerHTML=''
        $('#paymentStatus').text("")
    }
    if(checkDate(expiryMonth,expiryYear)){
        flag2=1;
        $('#helpIdDate').text("")
    }
    else{
        
        $('#helpIdDate').text("Invalid Date")
        $('#expiryMonth').val("")
        $('#expiryYear').val("")
        $('#expiryMonth').focus()
        document.getElementById('viewBill').innerHTML=''
        $('#paymentStatus').text("")
    }
    if(checkCvv(cardCvv)){
        flag3=1;
        $('#helpIdCvv').text("")
    }
    else{
        
        $('#helpIdCvv').text("Invalid Cvv")
        $('#cardCvv').val("")
        $('#cardCvv').focus()
        document.getElementById('viewBill').innerHTML=''
        $('#paymentStatus').text("")
    }
    if(flag1==flag2==flag3){
        $('#paymentStatus').text("Payment Successful")
        $('#paymentStatus').css({"color":"green"})
        document.getElementById('viewBill').innerHTML='<button type="button" class="btn btn-info btn-sm text-light" onclick="viewBill()" data-dismiss="modal">Bill</button>'
    }
}
function viewBill(){
    $('#modal-bill').modal()
    $( "#ordersTable" ).clone().appendTo( "#billTable" );
    $('#billAddress').text($('#address').val())
    //console.log($('#address').val())
}
function checkCardNumber(a){
    var patt = new RegExp("[0-9]");
    var res = patt.test(a);
    if(a.length==16 && res==true)
        return true;
    return false;
}
function checkDate(a,b){
    var patt = new RegExp("[0-9]");
    var res = patt.test(a);
    if(a.length==2 && b.length==4 && res==true && patt.test(a)==true)
        return true;
    return false;
}
function checkCvv(a){
    var patt = new RegExp("[0-9]");
    var res = patt.test(a);
    if(a.length==3 && res==true)
        return true;
    return false;
}

