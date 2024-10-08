const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id 
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    
    getProductsFromFile(products => {
      if(this.id){
         const exiting=products.findIndex(prod => prod.id===this.id);
         const updatedProducts=[...products];
         if(exiting>=0){
          updatedProducts[exiting]=this;
         }
         
         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }else{
        this.id=Math.random().toString();
        console.log(products)
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
     }
      
    });
  }

  static fetchAll(cb) {
    //getProductsFromFile(cb);
    fs.readFile(p, (err, fileContent) => {
      console.log(1);
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }
  static findById(id,cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
 static deleteById(id){
    getProductsFromFile(products => {
      const updatedProducts = products.filter(prod => prod.id !== id); // Remove the product
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          if (err) {
              console.log(err);
          }
      });
  });
}
  
};
