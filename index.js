var express = require ('express')
var bodyParser = require('body-parser');
var util = require('util');
var futil = require('./utility.js');
var path = require('path')


var user = require('./users.js')
var product = require('./product.js')
var asset = require('./asset.js')
var validate = require('./validate.js')
var family = require('./family.js')


var app = express()
var router = express.Router()

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// EJS PART =================================

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/home', (req, res)=>{
    res.render('home');
});

router.get('/family', (req, res)=>{
    res.render('family');
});

router.get('/product', (req, res)=>{
    res.render('product');
});

router.get('/asset', (req, res)=>{
    res.render('asset');
});

// EJS PART =================================

// ROUTING PART =============================

router.post('/validate',function(req,res){
    validate.Read(req,res)
})

router.post('/get_parent',function(req,res){
    family.ReadParent(req,res)
})
router.post('/get_family',function(req,res){
    family.Read(req,res)
})

router.post('/get_child/:id',function(req,res){
    family.ReadChild(req,res)
})

router.post('/save_family',function(req,res){
    family.Create(req,res)
})

router.post('/save_family1',function(req,res){
    family.Create(req,res)
})

router.put('/update_family/:id',function(req,res){
    family.Update(req,res)
})

router.put('/update_family1/:id',function(req,res){
    family.Update(req,res)
})

router.delete('/destroy_family',function(req,res){
    family.Delete(req,res)
})

router.delete('/destroy_family1',function(req,res){
    family.Delete(req,res)
})

router.post('/get_product',function(req,res){
    product.Read(req,res)
})

router.post('/get_product_all',function(req,res){
    product.ReadProducts(req,res)
})

router.post('/save_product',function(req,res){
    product.Create(req,res)
 })

 router.post('/update_product/:id',function(req,res){
    product.Update(req,res)
})

router.delete('/destroy_product',function(req,res){
    product.Delete(req,res)
})

router.post('/get_asset',function(req,res){
    asset.Read(req,res)
})

router.post('/get_asset_all',function(req,res){
    asset.ReadAssets(req,res)

})

router.post('/save_asset',function(req,res){
    asset.Create(req,res)
 })

 router.post('/update_asset/:id',function(req,res){
    asset.Update(req,res)
})

router.delete('/destroy_asset',function(req,res){
    asset.Delete(req,res)
})

router.post('/get_asset_detail/:id',function(req,res){
    asset.ReadDetail(req,res)
})

router.post('/get_asset_all',function(req,res){
    asset.ReadAssets(req,res)

})

router.post('/save_asset_detail',function(req,res){
    asset.CreateDetail(req,res)
 })

 router.post('/update_asset/:id',function(req,res){
    asset.Update(req,res)
})

router.post('/update_asset_detail/:id',function(req,res){
    asset.UpdateDetail(req,res)
})
router.delete('/destroy_asset_detail',function(req,res){
    asset.DeleteDetail(req,res)
})

// ROUTING PART =============================


app.use(router)

var server = app.listen(process.env.SERVER_PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    futil.logger.debug('\n' + futil.shtm() + '- [ W A K E   U P ] | STARTING ' + util.inspect(process.env.TITLE));
    futil.logger.debug(futil.shtm() + '- [ W A K E   U P ] | RUN AT PATH: /api/controller/pattern, PORT: ' + port);
});
