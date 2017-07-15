var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();
var bodyParser = require("body-parser");
var formidable = require('formidable');
var uuidV1 = require('uuid/v1');
var util = require('util'); 
var fs = require('fs');
var sightengine = require('sightengine')('677410387', 'L2menNuVpMMaUnf6A53K');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

connection.query('USE sportstagram');

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    return next();
});


function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

app.get('/guid', function (req, res) {
    const uuidV1 = require('uuid/v1');
    res.send(uuidV1());
});

app.get('/', function (req, res) {

    //res.sendFile(path.join(__dirname, 'views/index2.html'));
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.sendFile(path.join(__dirname, 'views/index.html'));
    /*res.writeHead(200, {'Content-Type': 'text/html'});
     res.write('<img src="images/41-512.png">');
     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
     res.write('<input type="file" name="filetoupload"><br>');
     res.write('<input type="submit">');
     res.write('</form>');
     return res.end();*/
});

app.post('/testForm', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    });
    res.json({"Error": false, "Message": "Image deleted"});
});

function deleteImageInDatabse(idPicture, callback) {
    var res = 'tata';
    callback(res);
}

function getPathImageToDelete(idImage, callback) {
     var query = "SELECT `path` FROM `t_image` WHERE `id` = ?";
     var table = [idImage];
     query = mysql.format(query, table);
     connection.query(query, function (err, rows) {
     if (err) {
      callback('null');
     } else {
         callback(rows);
       }
    });
}

function deleteImageInFolder(path) {
    fs.unlinkSync(path);
}


app.post('/deleteImage', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var idPicture = fields.idPicture;
    getPathImageToDelete(fields.idPicture, function(response){
    var path = response[0].path;
    var filePath = '../frontend/client/' + path; 
    deleteImageInFolder(filePath);
     var query = "DELETE FROM `t_image` WHERE `id`=?";
     var table = [idPicture];
     query = mysql.format(query, table);
     connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error Deleting image " + err});
        } else {
            res.json({"Error": false, "Message": "Image deleted"});
        }
     });
 });
    })   
});


app.post('/fileupload', function (req, res) {
    var form = new formidable.IncomingForm();
    var request = require('request');
    apiKey = 'acc_6a63d7dd0ba8155';
    apiSecret = 'dab409cf6bde7900ad1d993b16323d7d';
    form.uploadDir = path.join(__dirname, '../frontend/client/public/images');
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
       var guid = uuidV1();
       var newPath = guid + files.filetoupload.name;
        fs.rename(oldpath, path.join(form.uploadDir, newPath), function (guid, newPnewPathath, err) {
            if (err) throw err;

            sightengine.check(['nudity','wad','face-attributes']).image(path.join(form.uploadDir, newPath)).then(function(result) {
                var ret = JSON.stringify(result);
                var obj = JSON.parse(ret.replace('Headers: ',''));
                var alcohol = obj['alcohol'];
                var weapon = obj['weapon'];
                var drugs = obj['drugs'];
                var nudity = obj['nudity']['safe'];

                if (nudity < 0.1) {
                     return res.redirect(301, 'http://localhost:7770/information/');
                } else {
                    var query = "INSERT INTO `t_image`(`id`, `user_id`, `path`, `code`, `caption`, `nb_like`, `tag_1`, `tag_2`, `tag_3`) VALUES (DEFAULT,?,?,?,?,DEFAULT,?,?,?)";
                    var table = [fields.idUser, path.join("public/images", newPath), uuidV1(), fields.caption, fields.tag1, fields.tag2, fields.tag3];
                    query = mysql.format(query, table);

                    console.log("upload query = " + query);
                    connection.query(query, function (err, rows) {
                    if (err) {
                        console.log("upload error : " + err);
                        res.json({"Error": true, "Message": "Error executing MySQL query"});
                    } else {
                        return res.redirect(301, 'http://localhost:7770/profil/');
                    }
                    });
                }
                //console.log(obj);
                console.log("alcool = " + alcohol);
                console.log("weapon = " + weapon);
                console.log("drugs = " + drugs);
                console.log("nudity = " + nudity);
            })



            /**/
        });
    });
});

app.get("/checkContent", function (req,res){
    var request = require('request'),
    apiKey = 'acc_6a63d7dd0ba8155',
    apiSecret = 'dab409cf6bde7900ad1d993b16323d7d',
    imageUrl = 'https://www.chien.fr/assets/img/000/740/large/choisir-friandises-chien.jpg';

request.get('https://api.imagga.com/v1/tagging?url='+encodeURIComponent(imageUrl), function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
}).auth(apiKey, apiSecret, true);
})

app.get("/checkContent2", function (req,res){
  sightengine.check(['nudity','wad','face-attributes']).image('http://pic.filmpornofrancais.fr/wp-content/uploads/2016/09/23098839.0.jpg').then(function(result) {
  var ret = JSON.stringify(result);
   var obj = JSON.parse(ret.replace('Headers: ',''));
    var alcohol = obj['alcohol'];
    var weapon = obj['weapon'];
    var drugs = obj['drugs'];
    var nudity = obj['nudity']['safe'];

    if (nudity < 0.1 ) {
        console.log("porno");
    }
    //console.log(obj);
    console.log("alcool = " + alcohol);
    console.log("weapon = " + weapon);
    console.log("drugs = " + drugs);
    console.log("nudity = " + nudity);
})
})

app.get("/Json", function (req, res){
     var str = 'Headers: {"status":"success","request":{"id":"req_0XaIJxBIAHQd1T2xlAWkE","timestamp":1496876422.2539,"operations":3},"weapon":0.004,"alcohol":0.004,"drugs":0.001,"nudity":{"raw":0.296581,"partial":0.068054,"safe":0.000044},"faces":[{"x1":0.2021,"y1":0.2461,"x2":0.5042,"y2":0.8423,"features":{"left_eye":{"x":0.4167,"y":0.4353},"right_eye":{"x":0.2938,"y":0.5426},"nose_tip":{"x":0.3917,"y":0.6088},"left_mouth_corner":{"x":0.4708,"y":0.6404},"right_mouth_corner":{"x":0.3542,"y":0.7319}},"attributes":{"female":0.99,"male":0.01,"minor":0.89,"sunglasses":0.01}}],"media":{"id":"med_0XaIAFl3FzF9daclWX0ej","uri":"http://storenotrefamilleprod.blob.core.windows.net/images/cms/article/1659/1659_large.jpg"}}'
    var obj = JSON.parse(str.replace('Headers: ',''));
    var alcohol = obj['alcohol'];
    var weapon = obj['weapon'];
    var drugs = obj['drugs'];
    var nudity = obj['nudity']['safe'];

    if (nudity < 0.1 ) {
        console.log("porno");
    }
    //console.log(obj);
    console.log("alcool = " + alcohol);
    console.log("weapon = " + weapon);
    console.log("drugs = " + drugs);
    console.log("nudity = " + nudity);
})

app.get('/getPicturesProfil', function (req, res) {
   var idUser = req.query.idUser;
    var query = "SELECT `id`,`user_id`,`path`,`code`,`caption`,(select count(*) from t_image_liked where t_image_liked.id_image = t_image.id) AS nb_like, (select count(*) from t_image_shared where t_image_shared.id_image = t_image.id) AS shared,`tag_1`,`tag_2`,`tag_3` FROM `t_image` WHERE `user_id`=?";
    var table = [idUser];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({"Error": false, "Message": "Success", "Pictures": rows});
        }
    });
});

app.get('/getNumberRandomImage', function (req, res) {    
    var query = "SELECT `id`,`user_id`,`path`,`code`,`caption`,(select count(*) from t_image_liked where t_image_liked.id_image = t_image.id) AS nb_like ,(select count(*) from t_image_shared where t_image_shared.id_image = t_image.id) AS nb_shared FROM `t_image` ORDER BY RAND() LIMIT 10";
    query = mysql.format(query);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query : " + err});
        } else {
            res.json({"Error": false, "Message": "OK", "Pictures": rows});
        }
    });
});

app.get('/getTags', function (req, res) {    
    var query = "SELECT `tag_1` FROM `t_image` WHERE `tag_1` != ''";
    query = mysql.format(query);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query : " + err});
        } else {
            res.json({"Error": false, "Message": "Tags_ok", "tags": rows});
        }
    });
});

app.post('/likePicture', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var idUser = fields.idUser;
    var idImage = fields.idImage;
    var query = "INSERT INTO `t_image_liked`(`id_user`, `id_image`) VALUES (?,?)";
    var table = [idUser, idImage];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query : " + err});
        } else {           
            res.json({"Error": false, "Message": "like"});
        }
    });
    })
});

app.post('/follow', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var idFollower = fields.idFollower;
    var idFollowed = fields.idFollowed;
    var query = "INSERT INTO `t_user_follow`(`id_user_follower`, `id_user_followed`) VALUES (?,?)";
    var table = [idFollower, idFollowed];
    query = mysql.format(query, table);
    console.log("follow query = " + query);
    connection.query(query, function (err, rows) {
        if (err) {
            console.log("follow error : " + err);
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query : " + err});
        } else {
            console.log("follow added : ");
            res.json({"Error": false, "Message": "Follow"});
        }
    });
    })
});

app.post('/share', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var userId = fields.idUser;
    var imageId = fields.idImage;
    var query = "INSERT INTO `t_image_shared`(`id_user`, `id_image`) VALUES (?,?)";
    var table = [userId, imageId];
    query = mysql.format(query, table);
    console.log("share query = " + query);
    connection.query(query, function (err, rows) {
        if (err) {
             console.log("share err = " + err);
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query : " + err});
        } else {
            console.log("share ok");
            res.json({"Error": false, "Message": "Shared"});
        }
    });
    })
});

app.get('/getUserFollowed', function (req, res) {
    var idUser = req.query.idUser;
    var query = "SELECT DISTINCT `id`,`pseudo`,`password`,`like1`,`like2`,`like3` FROM `t_user`, `t_user_follow` WHERE t_user.id = t_user_follow.id_user_followed AND t_user_follow.id_user_follower = ?";
    var table = [idUser];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({"Error": false, "Message": "Followed", "Followed": rows});
        }
    });
})

app.post('/updatePicture', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var caption = fields.caption;
    var tag1 = fields.tag1;
    var tag2 = fields.tag2;
    var tag3 = fields.tag3;
    var idPhoto = fields.idPhoto;
    var query = "UPDATE `t_image` SET `caption`=?,`tag_1`=?,`tag_2`=?,`tag_3`=? WHERE `id`=?";
    var table = [caption, tag1, tag2, tag3, idPhoto];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query : " + err});
        } else {
            res.json({"Error": false, "Message": "Upload"});
        }
    });
    })
});


app.get('/getNewFeedUser', function (req, res) {
    var idUser = req.query.idUser;
    var query = 'CALL getNewsFeed(?)';
    //var query = "SELECT DISTINCT t_image.id, t_image.user_id, (select t_user.pseudo FROM t_user WHERE t_image.user_id = t_user.id) AS pseudo, t_image.path, t_image.code, t_image.caption, (select count(*) from t_image_liked where t_image_liked.id_image = t_image.id) AS nb_like, t_image.tag_1, t_image.tag_2, t_image.tag_3 FROM `t_image`, `t_user_follow` WHERE t_user_follow.id_user_follower = ? AND t_user_follow.id_user_followed = t_image.user_id";
    var table = [idUser];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {           
            res.json({"Error": false, "Message": "Success", "Pictures": rows.slice(rows.count, 1)[0]});
        }
    });
});

app.get('/getSuggestion', function (req, res) {
    var like1 = req.query.like1;
    var like2 = req.query.like2;
    var like3 = req.query.like3;
    var query = "SELECT `id`,`user_id`,`path`,`code`,`caption`,(select count(*) from t_image_liked where t_image_liked.id_image = t_image.id) AS nb_like,`tag_1`,`tag_2`,`tag_3` FROM `t_image` WHERE t_image.tag_1 = ? OR t_image.tag_1 = ? OR t_image.tag_1 = ? OR t_image.tag_2 = ? OR t_image.tag_2 = ? OR t_image.tag_2 = ? oR t_image.tag_3 = ? OR t_image.tag_3 = ? OR t_image.tag_3 = ? ORDER BY RAND() LIMIT 2";
    var table = [like1, like2, like3,like1, like2, like3,like1, like2, like3];
    query = mysql.format(query, table);
    console.log("get suggestion query = " + query);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({"Error": false, "Message": "Success", "Suggestion": rows});
        }
    });
});

app.get('/getSuggestionsTags', function (req, res) {
    var id = req.query.id;
    var query = 'CALL getSuggestionTags(?)';
    var table = [id];
    query = mysql.format(query, table);
    console.log("get suggestion tags query = " + query);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({"Error": false, "Message": "Success", "Suggestion": rows});
        }
    });
});

app.get('/user/', function (req, res) {
    var pseudo = req.query.pseudo;
    var password = req.query.password;
    var query = "SELECT * FROM t_user where pseudo = ? AND password = ?";
    var table = [pseudo, password];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            if (isEmptyObject(rows)) {
                res.status(404);
                res.json({"Error": true, "Message": "User does not exist"});
            } else {
                res.json({"Error": false, "Message": "Success", "Users": rows});
            }

        }
    });
});

app.get('/getImageLiked/', function (req, res) {
    var idUser = req.query.idUser;
    var query = "SELECT DISTINCT `id_image` FROM t_image_liked where id_user = ?";
    var table = [idUser];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({"Error": false, "Message": "Success", "ImageLiked": rows});
        }
    });
});

app.get('/getImageUser/', function (req, res) {
    var idUser = req.query.idUser;
    var query = "SELECT * FROM `t_image` WHERE `user_id`= ?";
    var table = [idUser];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({"Error": false, "Message": "Success", "MyImages": rows});
        }
    });
});

app.get('/getImageLikedProfil/', function (req, res) {
    var idUser = req.query.idUser;
    var query = "SELECT t_image.id, t_image.user_id,t_image.path,t_image.code,t_image.caption, (select count(*) from t_image_shared where t_image_shared.id_image = t_image.id) AS nb_shared, (select count(*) from t_image_liked where t_image.id = t_image_liked.id_image) AS nb_like,t_image.tag_1,t_image.tag_2,t_image.tag_3 FROM `t_image`, `t_image_liked` WHERE t_image.id = t_image_liked.id_image AND t_image_liked.id_user = ?";
    var table = [idUser];
    query = mysql.format(query, table);
    console.log("get image liked profil = " +  query);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({"Error": false, "Message": "Success", "ImageLikedProfil": rows});
        }
    });
});


app.get('/getImageShared/', function (req, res) {
    var idUser = req.query.idUser;
    var query = "SELECT DISTINCT `id_image` FROM t_image_shared where id_user = ?";
    var table = [idUser];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({"Error": true, "Message": "Error executing MySQL query"});
        } else {
            res.json({"Error": false, "Message": "Success", "ImageShared": rows});
        }
    });
});

app.post('/users/', function (req, res) {
     var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var pseudo = fields.login;
    var password = fields.password;
    var query = "INSERT INTO `t_user`(`id`, `pseudo`, `password`,`like1`,`like2`,`like3`) VALUES (DEFAULT,?,?,?,?,?)";
    var table = [pseudo, password, fields.like1, fields.like2, fields.like3];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({"Error": true, "Message": "Error executing MySQL query", "err": err});
        } else {
            res.json({"Error": false, "Message": "Success"});
        }
    });
    })
    //res.json({"Error": false, "Message": "Success"})
});

app.post('/upload', function (req, res) {

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/public/images');


    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {;
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function (err) {
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));