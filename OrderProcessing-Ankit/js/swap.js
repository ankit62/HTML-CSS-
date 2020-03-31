//arrow function 

var swap=(a,b)=>{
    console.log('a='+a+' b='+b);
    let t=a;a=b;b=t;
    console.log('a='+a+' b='+b);
}
swap(1,2);