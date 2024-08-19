const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Ajout de la bibliothèque JWT


app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb+srv://abdoubencheikh01:191919AZ@cluster0.o3bel8w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// API creation
app.get("/", (req, res) => {
    res.send("Express app is running");
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
       image_url: `https://game-heaven-back-end.onrender.com/images/${req.file.filename}`
    });
});

// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

async function updateImageURLs() {
    const localHostURL = "http://localhost:4000";
    const productionURL = "https://game-heaven-back-end.onrender.com";

    try {
        // Trouver tous les produits avec une image stockée en localhost
        const products = await Product.find({ image: { $regex: localHostURL } });

        for (let product of products) {
            // Remplacer l'URL localhost par l'URL de production
            const updatedImageURL = product.image.replace(localHostURL, productionURL);

            // Mettre à jour le produit dans la base de données
            await Product.updateOne({ _id: product._id }, { $set: { image: updatedImageURL } });
            console.log(`Updated product ID ${product.id}: ${updatedImageURL}`);
        }

        console.log("All image URLs updated successfully!");
    } catch (error) {
        console.error("Error updating image URLs:", error);
    } 
}

// Exécuter le script
updateImageURLs();


// Endpoint to add a product
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log("saved");

    res.json({
        success: true,
        name: req.body.name,
    });
});

// Endpoint to remove a product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("removed");

    res.json({
        success: true,
        name: req.body.name
    });
});

// Endpoint to get all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("all products fetched");
    res.send(products);
});

// Schema creation for User model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    wishData:{
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Creating end point for registering users
app.post('/signup', async (req, res) => {
    // Vérification que les champs obligatoires ne sont pas vides
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // Vérifier si un utilisateur avec le même email existe déjà
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "Existing user found, email already in use" });
    }

    // Création du panier par défaut
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    //creation du wishlist par defaut
    let wish = {};
    for(let i = 0; i< 300; i++){
        wish[i] = 0
    }
    

    // Création du nouvel utilisateur
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password, // Correction du champ password
        cartData: cart,
        wishData: wish,
    });

    await user.save();

    // Génération du token JWT
    const data = {
        user: {
            id: user.id
        }
    };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// Creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
            console.log("user connected")
        } else {
            res.json({ success: false, errors: "wrong password" });
        }
    } else {
        res.json({ success: false, errors: "wrong email id" });
    }
});
// creating end point for new collection data
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log("newcollection fecthed")
    res.send(newcollection)
})
// creating end point for popular women
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"})
    let popular_in_women = products.slice(0,4);
    console.log("popular in women fetched")
    res.send(popular_in_women)
})
// creating end point for Offers
app.get('/offers',async(req,res)=>{
    let products = await Product.find({})
    let offers = products.slice(6).slice(15)
    console.log("Offers fetched")
    res.send(offers)

})
// creating middleweare to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate, token missing" });
    }
    
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Please authenticate, invalid token" });
    }
};

// creating endpoint for adding products in wishlist
// Creating endpoint for adding products to wishlist
app.post('/addtowish', fetchUser, async (req, res) => {
    try {
        console.log("addedwish", req.body.itemid);
        let userData = await Users.findOne({_id: req.user.id});

        // Initialize wishData if it doesn't exist
        if (!userData.wishData) {
            userData.wishData = {};
        }

        // Initialize the item if it doesn't exist in wishData
        if (!userData.wishData[req.body.itemid]) {
            userData.wishData[req.body.itemid] = 0;
        }

        // Increment the item count
        userData.wishData[req.body.itemid] += 1;

        // Save the updated wishData
        await Users.findOneAndUpdate({_id: req.user.id}, {wishData: userData.wishData});
        res.send("Added");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});



// creating endpoint for removing products in wishlist
// Creating endpoint for removing products from wishlist
app.post('/removefromwish', fetchUser, async (req, res) => {
    try {
        console.log("removed", req.body.itemid);
        let userData = await Users.findOne({_id: req.user.id});

        // Ensure wishData is initialized
        if (userData.wishData && userData.wishData[req.body.itemid]) {
            // Decrement the item count if it's greater than 0
            if (userData.wishData[req.body.itemid] > 0) {
                userData.wishData[req.body.itemid] -= 1;

                // If the count reaches 0, optionally remove the item entirely
                if (userData.wishData[req.body.itemid] === 0) {
                    delete userData.wishData[req.body.itemid];
                }

                // Save the updated wishData
                await Users.findOneAndUpdate({_id: req.user.id}, {wishData: userData.wishData});
                res.send("Removed");
            } else {
                res.status(400).send("Item not in wishlist or already at zero count");
            }
        } else {
            res.status(400).send("Item not found in wishlist");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});


//creating end point to get cartdata
app.post('/getwish', fetchUser, async (req, res) => {
    console.log("Getwish");
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.wishData);
    console.log(userData.wishData);  // Correction ici
});

  
// creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemid)
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemid] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")


})

// creating endpoint for removing products in cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemid)
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemid] >0){
        userData.cartData[req.body.itemid] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("remove")}


})

//creating end point to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
    console.log(userData.cartData);  // Correction ici
});

let orders = []; // Stocker les commandes ici

// Route pour recevoir les commandes
app.post('/sendOrder', (req, res) => {
    const orderDetails = req.body;
    
    console.log('Commande reçue :', orderDetails); // Log pour vérifier les données reçues
    orders.push(orderDetails); // Ajouter la commande reçue à la liste
    
    res.status(200).json({ message: 'Commande reçue avec succès' });
});

// Route pour récupérer les commandes
app.get('/getOrders', (req, res) => {
    res.status(200).json(orders); // Retourner les commandes stockées
});




// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on :" + port);
    } else {
        console.log("Error:" + error);
    }
});
