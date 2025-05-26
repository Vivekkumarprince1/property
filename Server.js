const express = require('express');
const app = express();

const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");

var database = require('./config/database');
var Details = require('./Models/details');
var Logins = require('./Models/logins');
var Liked = require('./Models/liked');
var Products = require('./Models/products');
var Pnotifications = require('./Models/Pnotification');





const mongoose = require('mongoose');

mongoose.connect(database.url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
console.log(database.url);

//multer
var imagename = '';
var notify = [];
var pnotify = [];
var check = {};
var dates = new Date().getUTCFullYear() + "-" + "0" + (new Date().getUTCMonth() + 1) + "-" + new Date().getUTCDate();

const storage = multer.diskStorage({
    destination: (req, image, cb) => {
        cb(null, 'public');
    },
    filename: (req, image, cb) => {
        console.log(image);

        imagename = Date.now() + path.extname(image.originalname) + '';
        console.log(imagename);
        cb(null, imagename);
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/public'));


//route for insert logins
app.post('/logins', (req, res) => {
    Logins.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.cpassword,
        phone: req.body.phone,
        type: req.body.type
    });
    res.end();
});

app.post('/Details', (req, res) => {
    Details.create({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city
    });
    res.end();
});

//route for login

app.post('/login', function(req, res) {

    Logins.find({
        email: req.body.email,
        password: req.body.password
    }).then((data) => {
        console.log(data);
        res.json(data);
    })

});

//route
app.get('/list', (req, res) => {

    Logins.find({}).then((data) => {
        console.log(data);
        res.json(data);
    })

});

//route for edit
app.get('/edit/:email', (req, res) => {

    Logins.find({
        email: req.params.email
    }).then((data) => {
        console.log(data);
        res.json(data);
    })

});

//route for update
app.post('/update', async function(req, res) {
    try {
        await Logins.updateOne({ email: req.body.email }, {
            $set: {
                name: req.body.name,
                password: req.body.password,
                phone: req.body.phone,
                type: req.body.type
            }
        })

    } catch (err) {
        res.send(err);
    }

    Logins.find().then((data) => {
        console.log(data);
        res.json(data);
    });

});


//route for add employee
app.post('/addemployee', async function(req, res) {
    try {
        await Logins.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            phone: req.body.phone,
            type: req.body.type
        })
    } catch (err) {
        res.send(err);
    }

    Logins.find().then((data) => {
        console.log(data);
        res.json(data);
    });

});


//route for delete employee
app.get('/delete/:email', async function(req, res) {
    try {
        console.log(req.params.email);
        await Logins.deleteOne({
            email: req.params.email
        });

    } catch (err) {
        res.send(err);
    }

    Logins.find().then((data) => {
        console.log(data);
        res.json(data);
    });
});



//to show likeds
app.get('/likeds/:cname', (req, res) => {

    Liked.find({ cname: req.params.cname }).then((data) => {
        res.json(data);
    })

});

//route for add to liked
app.post('/addliked/:pid', async function(req, res) {

    console.log(req.params.pid)
    const product = await Products.findOne({
        pid: req.params.pid
    }).then((data) => {
        console.log(data);
        Liked.create({
            name: data.name,
            pid: data.pid,
            price: data.price,
            size: data.size,
            location: data.location,
            phone: data.phone,
            image: data.image,
            cname: req.body.cname
        });
    });
    //console.log(product)



    res.json("{status:'done'");
});


//unlikeproperty
app.get('/unlikeproperty/:pid', async function(req, res) {
    try {
        console.log(req.params.pid);
        await Liked.deleteOne({
            pid: req.params.pid
        });

    } catch (err) {
        res.send(err);
    }

    Liked.find().then((data) => {
        console.log(data);
        res.json(data);
    });

});

//to show Pnotifications
app.get('/Pnotifications/:pname', async(req, res) => {

    var x = await Pnotifications.aggregate([{
        $lookup: {
            from: 'products',
            localField: 'pid',
            foreignField: 'pid',
            as: 'demo'
        }
    }])
    console.log("done");
    for (i = 0; i < x.length; i++) {
        if (x[i].pname == req.params.pname) {
            notify.push(x[i]);
            console.log("ok");
            console.log(req.params.pname);
        }
    }
    for (let i = 0; i < notify.length; i++) {
        console.log(notify[i].name);
        if (!check[notify[i].name]) {
            check[notify[i].name] = true;
            pnotify.push(notify[i]);
        }
    }
    console.log(pnotify);
    res.json(pnotify);

    // console.log(notify = notify.filter((value, index) => notify.indexOf(value) === index));

    // for (i = 0; i < notify.length; i++) {
    //     console.log(notify[i].pname);
    //     // if (notify[i].pname == notify[i + 1].name) {
    //     //     pnotify.push(notify[i]);
    //     //     console.log("yes");
    //     // }
    // }
    // console.log(pnotify);
    // res.json(pnotify);
    // console.log(x[0].email);
    // console.log(x[0].demo[0].size);
    // for (i = 0; i < x.length; i++) {
    //     console.log(x[i].email);
    //     console.log(x[i].demo[0].size);
    //     console.log(x[i].demo[0].location);
    // }
    // x.forEach(stu => {
    //         console.log(stu)
    //         console.log(stu.size)
    //console.log(student.student_marks); 
    // })
    // x.forEach(s => {
    //     console.log(s.size)
    //     console.log(s.location);
    // })

    // Pnotifications.find({ pname: req.params.pname }).then((data) => {
    //     res.json(data);
    //     console.log(data);
    // })

});

//date formats
// app.post('/okji', async function(req, res) {
//     console.log(new Date().getUTCDate() + "-" + new Date().getUTCMonth() + "-" + new Date().getUTCFullYear());
//     console.log("----------");
//     console.log(new Date().getUTCFullYear() + "-" + (new Date().getUTCMonth() + 1) + "-" + new Date().getUTCDate());

//     // new Date().toLocaleDateString();

// })


app.post('/providernotification/:name', async function(req, res) {
    console.log(req.params.name)
    await Logins.find({
        name: req.params.name
    }).then((data) => {
        console.log(data);
        Pnotifications.create({
            name: data[0].name,
            phone: data[0].phone,
            email: data[0].email,
            pname: req.body.pname,
            pid: req.body.pid,
            date: dates
        });
    });

    res.json("{status:'done'");
});

//delete pnotifications
app.get('/deletenotification/:pid', async function(req, res) {
    try {
        console.log(req.params.pid);
        console.log(req.body.name);
        await Pnotifications.delete({
            pid: req.params.pid
        });

    } catch (err) {
        res.send(err);
    }

});

//route for properties
app.get('/products', (req, res) => {

    Products.find({}).then((data) => {
        console.log(data);
        res.json(data);
    })

});

//to find last pid and increment
// app.post('/okji', async function(req, res) {
//     // var lastPid;
//     // await Products.find().sort({ $natural: -1 }).limit(1).then((data) => {
//     //     console.log("--------------------")
//     //     console.log(data[0].pid);
//     //     lastPid = data[0].pid;
//         // res.json(data);
//         var lastPid;
//     await Products.find().sort({ $natural: -1 }).limit(1).then((data) => {
//         console.log("--------------------")
//         console.log(data[0].pid);
//         lastPid = data[0].pid;
//     })

//     console.log("--------------------")
//     console.log(lastPid);
// })

app.post('/addproperty', upload.single('image'), async function(req, res) {
    var lastPid;
    try {
        // const lastPid = await Products.find().sort({ $natural: -1 }).limit(1)[0];
        // console.log(Products.find().sort({ $natural: -1 }).limit(1)[0])


        await Products.find({}).sort({ 'pid': -1 }).limit(1).then((data) => {
            console.log("--------------------")
            console.log(data[0].pid);
            lastPid = data[0].pid;
            // res.json(data);
        })

        console.log("-------")
        console.log(lastPid)
        await Products.create({
            pid: lastPid + 1,
            name: req.body.name,
            size: req.body.size,
            location: req.body.location,
            price: req.body.price,
            phone: req.body.phone,
            image: imagename
        })
    } catch (err) {
        res.send(err);
    }

    Products.find().then((data) => {
        console.log(data);
        res.json(data);
    });
});


// delete a product by id
app.get('/deleteproperty/:pid', async function(req, res) {
    try {
        console.log(req.params.pid);
        await Products.deleteOne({
            pid: req.params.pid
        });

    } catch (err) {
        res.send(err);
    }

    Products.find().then((data) => {
        console.log(data);
        res.json(data);
    });

});

//server listening
app.listen(8000, () => {
    console.log('Server is running at port 8000');
});