const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);
const fs = require('fs');
module.exports=class Cart{
    constructor(){
        this.product=[];
        this.total=0;
    }
    static addProduct(id,productPrice){
        //fetch previous Cart
        fs.readFile(p,(err,filecontent)=>{
            let cart={products:[],total:0};
            if(!err){
               cart=JSON.parse(filecontent);
            }
            //analyze the cart=> find existing product
            const existingProductIndex=cart.products.findIndex(prod=> prod.id===id);
            const existingProduct=cart.products[existingProductIndex];
            let updateProduct;
            if(existingProduct){
                updateProduct={...existingProduct};
                updateProduct.qty=updateProduct.qty+1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updateProduct;
            }
            else{
                updateProduct={id:id,qty:1};
                cart.products=[...cart.products,updateProduct];
            }
            cart.total=cart.total+ +productPrice;
            // add new product
            fs.writeFile(p, JSON.stringify(cart),err=>{
                console.log(err);
            })
        })

    }
}