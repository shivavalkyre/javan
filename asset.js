var mysql = require('./mysql.js')


var Create = function (req,res)
{
    var data = req.body
    console.log(data)
    // var price = 0
    // if (data.price=='')
    // {
    //     price = 0
    // }
    // else
    // {
    //     price= data.price
    // }

    var query = "INSERT INTO tbl_asset(id_owner) VALUES ('"+ data.id_owner +"')"
    mysql.DBView.query(query,null,'INSERT',function(getRes){
        res.send(getRes)
    })
}
module.exports.Create = Create

var CreateDetail = function (req,res)
{
    var data = req.body
    console.log(data)
    

    var query = "INSERT INTO tbl_asset_detail(id_asset,id_product) VALUES ('"+ data.id_asset+"','"+ data.id_product +"')"
    mysql.DBView.query(query,null,'INSERT',function(getRes){
        res.send(getRes)
    })
}
module.exports.CreateDetail = CreateDetail

var Read = function (req,res)
{
    // format
    //{"total":"1","rows":[{"id":"1","username":"Admin","password":"Admin","level":"Administrator"}]}
    //console.log(req.body)
    var data = {"total":"0","rows": []}
    var page = req.body.page;
    var rows =  req.body.rows;
    var offset = (page - 1) * rows
    var query = "SELECT COUNT(*) as total FROM tbl_asset_header" 
    mysql.DBView.query(query,null,'SELECT',function(getRes1){
    //console.log('getRes1',getRes1)
    if(getRes1[0].total >0)
    {
        data.total = getRes1[0].total
        //console.log('total:',data.total)
        var query = "SELECT * FROM tbl_asset_header LIMIT "+ offset +"," + rows + ""
        mysql.DBView.query(query,null,'SELECT',function(getRes2){
            //console.log('getRes2',getRes2)
            data.rows = getRes2
            res.send(data)
        })
    }
    else
    {
        res.send(data)
    }
   
})

}
module.exports.Read = Read

var ReadDetail = function (req,res)
{
    // format
    //{"total":"1","rows":[{"id":"1","username":"Admin","password":"Admin","level":"Administrator"}],"Footer":[{"name":"total","Price":18.00}]}
    //console.log(req.body)
    var param = req.params
    var data = {"total":"0","rows": [],"footer":[]}
    var page = req.body.page;
    var rows =  req.body.rows;
    var offset = (page - 1) * rows
    var query = "SELECT COUNT(*) as total FROM tbl_asset_detail_view WHERE id_asset='"+ param.id +"'" 
    mysql.DBView.query(query,null,'SELECT',function(getRes1){
    //console.log('getRes1',getRes1)
    if(getRes1[0].total >0)
    {
        data.total = getRes1[0].total
        //console.log('total:',data.total)
        var query = "SELECT * FROM tbl_asset_detail_view WHERE id_asset='"+ param.id +"' LIMIT "+ offset +"," + rows + ""
        mysql.DBView.query(query,null,'SELECT',function(getRes2){
            //console.log('getRes2',getRes2)
            data.rows = getRes2
            var total = 0
            for (i=0;i<=getRes2.length-1;i++)
            {
                total = total + getRes2[i].price
            }
            var footer_format = {"name":"Total","price":total}
            console.log(footer_format)
            var footer_array =[]
            footer_array.push(footer_format)
            data.footer = footer_array
            console.log(data)
            res.send(data)
        })
    }
    else
    {
        res.send(data)
    }
   
})

}
module.exports.ReadDetail = ReadDetail

var ReadAssets = function (req,res)
{
    //var data = {"total":"0","rows": []}
    var query = "SELECT COUNT(*) as total FROM tbl_asset" 
    mysql.DBView.query(query,null,'SELECT',function(getRes3){
    //console.log('getRes1',getRes1)
    if(getRes3[0].total >0)
    {
        //data.total = getRes3[0].total
        //console.log('total:',data.total)
        var query = "SELECT * FROM tbl_asset"
        mysql.DBView.query(query,null,'SELECT',function(getRes4){
            //console.log('getRes4',getRes4)
            // console.log(data)
            //data.rows = getRes4
            //console.log(getRes4)
            res.send(getRes4)
        })
    }
    else
    {
        res.send(data)
    }
    })
}
module.exports.ReadAssets = ReadAssets

var Update = function (req,res)
{
    var data = req.body
    //console.log(req.body)
    //console.log(req.params)
    var id= req.params.id
    console.log(id)
    console.log(data.id_owner)

    var query = "UPDATE tbl_asset SET id_owner='"+ data.id_owner +"' WHERE id='"+ id +"'"
    //console.log(query)
    mysql.DBView.query(query,null,'UPDATE',function(getRes){
        console.log(getRes)
        res.send(getRes)
    })

}
module.exports.Update = Update

var UpdateDetail = function (req,res)
{
    var data = req.body
    console.log(req.body)
    console.log(req.params)
    var id= req.params.id


    var query = "UPDATE tbl_asset_detail SET id_asset='"+ data.id_asset +"',id_product='"+ data.id_product +"' WHERE id='"+ id +"'"
    console.log(query)
    mysql.DBView.query(query,null,'UPDATE',function(getRes){
        console.log(getRes)
        res.send(getRes)
    })

}
module.exports.UpdateDetail = UpdateDetail

var Delete = function (req,res)
{
    var id = (req.body.id)
    var query = "DELETE FROM tbl_asset WHERE id='"+ id +"'"
    mysql.DBView.query(query,null,'DELETE',function(getRes){
        //console.log(getRes)
        res.send(getRes)
    })
}
module.exports.Delete = Delete

var DeleteDetail = function (req,res)
{
    var id = (req.body.id)
    var query = "DELETE FROM tbl_asset_detail WHERE id='"+ id +"'"
    mysql.DBView.query(query,null,'DELETE',function(getRes){
        //console.log(getRes)
        res.send(getRes)
    })
}
module.exports.DeleteDetail = DeleteDetail