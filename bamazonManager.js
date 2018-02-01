var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("easy-table");
var chalk = require("chalk");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "products_DB"
});



connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
    runSearch();
});


function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    productsForSale();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    songSearch();
                    break;
            }
        });
}

// show products for sale 
function productsForSale() {

    console.log("<-------Viewing products for sale------->");


    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("Item id: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + "|| Price: " + res[i].price + "|| Stock Quantity " + res[i].stock_quantity);
        }
        runSearch();
    });
}

function viewLowInventory() {
    console.log("<-------Viewing Low Inventory------->");
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.log("Item Id: " + res[i].item_id + "|| Product: " + res[i].product_name + "|| Department: " + res[i].department_name);

            }

        }
        runSearch();
    });
}

function addToInventory() {
    console.log("<-------Adding to Inventory-------->");
}