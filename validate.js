var mysql = require('./mysql.js')


var Read = function (req,res)
{
    // format
    //{"total":"1","rows":[{"id":"1","username":"Admin","password":"Admin","level":"Administrator"}]}
    console.log(req.body)
    var data = {"total":"0","rows": []}
    var page = 1;
    var rows = 10;
    var offset = (page - 1) * rows
    var data = req.body
    var query = "SELECT COUNT(*) as total FROM tbl_user WHERE username='"+ data.uname +"' AND password ='"+ data.upass  +"'" 
    mysql.DBView.query(query,null,'SELECT',function(getRes1){
    //console.log('getRes1',getRes1)
    if(getRes1[0].total >0)
    {
        data.total = getRes1[0].total
        //console.log('total:',data.total)
        var query = "SELECT * FROM tbl_user WHERE username='"+ data.uname+"' AND password ='"+ data.upass  +"' LIMIT "+ offset +"," + rows + ""
        mysql.DBView.query(query,null,'SELECT',function(getRes2){
            //console.log('getRes2',getRes2)
            data.rows = getRes2
            res.send('success')
        })
    }
    else
    {
        res.send(data)
    }
   
})

}
module.exports.Read = Read

