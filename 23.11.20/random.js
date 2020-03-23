function checkRandom(){
    var num=document.getElementById("number").value;
    console.log(num);
    var random=Math.floor(Math.random() * 11); 
    console.log(random);
    document.getElementById('displayRandom').innerText = random
    if(num==random)
    document.getElementById('display').innerText = "Good Work"
    else
    document.getElementById('display').innerText = "Not Matched"
}