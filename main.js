var tittle = document.getElementById('tittle');
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads =  document.getElementById('ads');
var diss = document.getElementById('diss');
var total = document.getElementById('total');
var count =document.getElementById('count');
var category = document.getElementById('category');
var submit =document.getElementById('submit') ;
var mood = 'Create' ;
let tmp;



var productContainer =[];
 if(localStorage.getItem('product') != null){
    productContainer = JSON.parse(localStorage.getItem('product'))
    readProduct(productContainer)

 }


// get tolttal
function getTotal(){
    if(price.value !=''){
        var result = (+price.value + +taxes.value + +ads.value ) - +diss.value ;
        total.innerHTML = result;
        total.style.background='green'
        
    } else{
    
        total.innerHTML='' 
        total.style.background='red' ;
    }
    
} 




// create product 
 function createproduct (){
    var product ={
        tittle : tittle.value,
        price :price.value,
        ads:ads.value,
        taxes : taxes.value,
        diss : diss.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value,
        submit : submit.value,
    }
    if ( mood === 'Create'){
        if(product.count>1){
            for(var i=0 ; i<product.count;i++){
                productContainer.push(product)
            }
        }else{
            productContainer.push(product)
        }
    }else{
        productContainer[tmp]= product;
        mood ='Create' ;
        count.style.display='block';
        submit.innerHTML='Create'
    }

    
    localStorage.setItem('product' , JSON.stringify(productContainer))
    claerdata()
    readProduct (productContainer)

}
// localstoreg 
// clear input 
function claerdata(){
    tittle.value='';
    price.value='';
    taxes.value='';
    diss.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    submit.value='';
    ads.value=''
}
// read 

function readProduct (arr){
    getTotal();
    document.getElementById('tablaebody').innerHTML='';
    for( var i=0 ; i<arr.length;i++){
        document.getElementById('tablaebody').innerHTML+= `
        
         <tr>
                <td>${i+1}</td>
                <td>${arr[i].tittle}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].taxes}</td>
                <td>${arr[i].ads}</td>
                <td>${arr[i].category}</td>
                <td>${arr[i].total}</td>
                <td><button onclick="updeateProduct(${i})">update</button></td>
                <td><button onclick="deleteProduct(${i})">delete</button></td>
            </tr>
        
        `
    }

    if(arr.length>0){
        document.getElementById('deleteAll').innerHTML=`
        <button onclick="deleteAll()">delete All (${arr.length} )</button>
        `
    }else{
        document.getElementById('deleteAll').innerHTML=''
    }
}
// readProduct(productContainer)
// count 

// delete 
function deleteProduct(arrindex){
    productContainer.splice(arrindex,1)
    localStorage.product = JSON.stringify(productContainer)
    readProduct(productContainer)

}
function deleteAll(){
    localStorage.clear()
    productContainer.splice(0)
    readProduct(productContainer)
}
// update 
function updeateProduct(i){

    tittle.value = productContainer[i].tittle
    price.value = productContainer[i].price
    taxes.value = productContainer[i].taxes
    ads.value = productContainer[i].ads
    diss.value = productContainer[i].diss
    getTotal()
    count.style.display='none'
    submit.innerHTML='Updeate'
    category.value = productContainer[i].category;
    mood = 'Updeate'
    tmp = i;
    scroll ({
        top:0,
        behavior: "smooth"
    })

}

// Search
 var searchmood;
function getSearchMood(id){
     var search = document.getElementById('srearch');
     if(id=='searchtitle'){
        search.placeholder='Search By Tittle'
        searchmood='tittle'
    
     }else{
        search.placeholder='Search By Category'
        searchmood='category'
     } 
     
   search.focus()

}



function getSearch (value){
    document.getElementById('tablaebody').innerHTML=''
    if(searchmood=='tittle'){
       
        for(var i=0;i<productContainer.length;i++){
            if(productContainer[i].tittle.toLowerCase().includes(value.toLowerCase())){
                
                document.getElementById('tablaebody').innerHTML+= `
        
                <tr>
                       <td>${i}</td>
                       <td>${productContainer[i].tittle}</td>
                       <td>${productContainer[i].price}</td>
                       <td>${productContainer[i].taxes}</td>
                       <td>${productContainer[i].ads}</td>
                       <td>${productContainer[i].category}</td>
                       <td>${productContainer[i].total}</td>
                       <td><button onclick="updeateProduct(${i})">update</button></td>
                       <td><button onclick="deleteProduct(${i})">delete</button></td>
                   </tr>
               
               `
            }
        }





    }else{

        for(var i=0;i<productContainer.length;i++){
            if(productContainer[i].category.toLowerCase().includes(value.toLowerCase())){
                
                document.getElementById('tablaebody').innerHTML+= `
        
                <tr>
                       <td>${i}</td>
                       <td>${productContainer[i].tittle}</td>
                       <td>${productContainer[i].price}</td>
                       <td>${productContainer[i].taxes}</td>
                       <td>${productContainer[i].ads}</td>
                       <td>${productContainer[i].category}</td>
                       <td>${productContainer[i].total}</td>
                       <td><button onclick="updeateProduct(${i})">update</button></td>
                       <td><button onclick="deleteProduct(${i})">delete</button></td>
                   </tr>
               
               `
            }
        } 

    }



    

}


// clean data

