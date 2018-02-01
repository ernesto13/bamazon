DROP DATABASE IF EXISTS products_DB;

CREATE database products_DB;

USE products_DB;

CREATE TABLE products
(

    item_id INT(10)AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  year INT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(250) NULL,
  
  PRIMARY KEY
    (item_id)
);



    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("Macbook", "electronics", 2017, 1299.99, 20);

    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("iMac", "electronics", 2017, 1399.99, 80);

    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("iPad Pro", "electronics", 2017, 999.99, 50);

    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("iPhone X", "electronics", 2017, 1250, 10);

    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("iPad", "electronics", 2016, 599.99, 10);

    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("powerbeats", "electronics", 2017, 149.99, 30);

    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("bluetooth speaker", "electronics", 2016, 79.99, 50);

    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("keurig", "appliances", 2017, 89.99, 50);

    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("kenmore refrigerator", "appliances", 2018, 1200, 30);

    INSERT INTO products
        (product_name, department_name, year, price, stock_quantity)
    VALUES
        ("kenmore stove", "appliances", 2018, 900, 30);




    SELECT * FROM products;
