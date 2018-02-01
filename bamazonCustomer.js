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
});



//function queryAllItems() {
connection.query("SELECT * FROM products", function(err, res) {

    makeTable(res);
    runSearch();


});


// table 

makeTable = function(data) {
    var myTable = new table;


    data.forEach(function(product) {
        myTable.cell(chalk.cyanBright('Product Id'), product.item_id);
        myTable.cell(chalk.cyanBright('Product Name'), product.product_name);
        myTable.cell(chalk.cyanBright('Department Name'), product.department_name);
        myTable.cell(chalk.cyanBright('Price, USD'), product.price, table.number(2));
        myTable.cell(chalk.cyanBright('Quantity'), product.stock_quantity > 0 ? product.stock_quantity : chalk.red(product.stock_quantity));
        myTable.newRow();
    })

    console.log(myTable.toString())
}


function runSearch() {


    inquirer.prompt([{
            type: "input",
            name: "item_id",
            message: "What would you like to buy? Input the item id"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },


    ]).then(function(answers) {

        var query = "SELECT * FROM products WHERE item_id = ?";
        connection.query(query, [answers.item_id], function(err, res) {

            // }
            if (err) {
                console.log(err);
            }

            var stock = res[0].stock_quantity;
            var item = res[0].item_id;
            var product = res[0].product_name;
            var price = res[0].price;
            var total = answers.quantity * price;
            // var total = parseFloat(res[answers.item_id].price) * stock;



            // console.log(res);


            if (answers.quantity > stock) {
                console.log("Insufficient quantity!, Try again!");
                runSearch();


            } else {
                console.log("You bought: " + answers.quantity + " " + product + "(s)");
                console.log("Your total is: $" + total.toFixed(2));
                var newQuantity = stock - answers.quantity;

                updateProduct(newQuantity, item);
                connection.end();

            }
        })

    });
}

//update quatitiy in table using update
function updateProduct(quantity, item_id) {
    console.log("Updating the stock quantity...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: quantity
            },
            {
                item_id: item_id
            }
        ],
        function(err, res) {
            console.log(res.affectedRows + " product updated!\n");

        }
    );

    // logs the actual query being run
    console.log(query.sql);
}