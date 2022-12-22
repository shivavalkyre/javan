var mysql = require('./mysql.js')


var Create = function (req,res)
{
    var data = req.body
    var id_asset = 0
   
    if (data.id_asset == '')
    {
        id_asset =0
    }else{
        id_asset = data.id_asset
    }
    var query = "INSERT INTO tbl_parent (nama,jk,id_asset) VALUES ('"+ data.nama +"','"+ data.jk +"','"+ id_asset +"')"
    mysql.DBView.query(query,null,'INSERT',function(getRes){
        res.send(getRes)
    })
}
module.exports.Create = Create

var Read = function (req,res)
{
    // format
    //{"total":"1","rows":[{"id":"1","username":"Admin","password":"Admin","level":"Administrator"}]}
    var data = {"total":"0","rows": []}
    var page = 1;
    var rows = 10;
    var offset = (page - 1) * rows
    var query = "SELECT COUNT(*) as total FROM tbl_parent" 
    mysql.DBView.query(query,null,'SELECT',function(getRes1){
    //console.log('getRes1',getRes1)
    if(getRes1[0].total >0)
    {
        data.total = getRes1[0].total
        //console.log('total:',data.total)
        var query = "SELECT * FROM tbl_parent LIMIT "+ offset +"," + rows + ""
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

var ReadParent = function (req,res)
{
    //var data = {"total":"0","rows": []}
    var query = "SELECT COUNT(*) as total FROM tbl_parent" 
    mysql.DBView.query(query,null,'SELECT',function(getRes3){
    console.log('getRes1',getRes1)
    if(getRes3[0].total >0)
    {
        //data.total = getRes3[0].total
        //console.log('total:',data.total)
        var query = "SELECT id,nama FROM tbl_parent"
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
module.exports.ReadParent = ReadParent

var Update = function (req,res)
{
    var data = req.body
    //console.log(req.body)
    //console.log(req.params)
    var id= req.params.id
    var id_parent = 0
    var id_asset = 0

    if (data.id_parent == '')
    {
        id_parent =0
    }else{
        id_parent = data.id_parent
    }

    if (data.id_asset == '')
    {
        id_asset =0
    }else{
        id_asset = data.id_asset
    }

    var query = "UPDATE tbl_parent SET nama='"+ data.nama +"',jk='"+ data.jk +"',id_asset='"+ id_asset +"' WHERE id='"+ id +"'"
    //console.log(query)
    mysql.DBView.query(query,null,'UPDATE',function(getRes){
        //console.log(getRes)
        res.send(getRes)
    })

}
module.exports.Update = Update

var Delete = function (req,res)
{
    var id = (req.body.id)
    var query = "DELETE FROM tbl_parent WHERE id='"+ id +"'"
    mysql.DBView.query(query,null,'DELETE',function(getRes){
        //console.log(getRes)
        res.send(getRes)
    })
}
module.exports.Delete = Delete

