var url;

$('#id_owner').combobox({
    url:'/get_parent',
    valueField:'id',
    textField:'nama',

});

$('#id_product').combogrid({
    panelWidth:450,
    idField:'id',
    textField:'product',
    url:'/get_product_all',
    columns:[[
        {field:'id',title:'ID',width:60,hidden:true},
        {field:'product',title:'Product',width:200},
        {field:'price',title:'Price',width:120}
    ]]
});
            
function newChild(){
    $('#dlg').dialog('open').dialog('center').dialog('setTitle','New Data');
    $('#fm').form('clear');
    url = '/save_asset';
}

function newChild1(){
    $('#dlg2').dialog('open').dialog('center').dialog('setTitle','New Data');
    $('#fm1').form('clear');
    url = '/save_asset_detail';
}

function editChild(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg').dialog('open').dialog('center').dialog('setTitle','Edit Data');
        $('#fm').form('load',row);
        $('#id_owner').combobox('setValue',row.id_owner)
        $('#id_owner').combobox('select',row.id_owner)
        url = 'update_asset/'+ row.id;
        //alert(url)
    }
}

function editChild1(){
    var row = $('#dg1').datagrid('getSelected');
    if (row){
        $('#dlg2').dialog('open').dialog('center').dialog('setTitle','Edit Data');
        $('#fm1').form('load',row);
        $('#id_product').combogrid('setValue',row.id_product)
        
        url = 'update_asset_detail/'+ row.id;
        //alert(url)
    }
}

function saveChild(){

    
    var data = $('#fm').serialize();
    //alert(data)
    $.ajax({
    type:'POST',
    url:url,
    data: data,
    success:function(XMLHttpRequest, textStatus,result){
        //alert("Status: " + textStatus); 
        if(textStatus =='success')
        {
            $('#dlg').dialog('close');        
            $('#dg').datagrid('reload');  
            
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        alert("Status: " + textStatus); 
        alert("Error: " + errorThrown); 
    }       
    });
}

function saveChild1(){

    
    var data_form = $('#fm1').serialize();
    var row = $('#dg').datagrid('getSelected')
    console.log(row)
    if (row)
    {
        var id_asset = row.id
    }

    var id_product = $('#id_product').combogrid('getValue')

    var data = {"id_asset":id_asset,"id_product":id_product}
    //alert(url)

    console.log(data)

    $.ajax({
    type:'POST',
    url:url,
    data: data,
    success:function(XMLHttpRequest, textStatus,result){
        //alert("Status: " + textStatus); 
        if(textStatus =='success')
        {
            $('#dlg2').dialog('close');        
            $('#dg1').datagrid('reload');  
            
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        alert("Status: " + textStatus); 
        alert("Error: " + errorThrown); 
    }       
    });
}

function destroyChild(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','Are you sure you want to destroy this data?',function(r){
            if (r){
    
                var data = {id:row.id}
                $.ajax({
                    type:'DELETE',
                    url:'destroy_asset',
                    data: data,
                    success:function(XMLHttpRequest, textStatus,result){
                        //alert("Status: " + textStatus); 
                        if(textStatus =='success')
                        {
                            $('#dlg').dialog('close');        
                            $('#dg').datagrid('reload');    
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); 
                        alert("Error: " + errorThrown); 
                    }       
                    });
            }
        });
    }
}

function destroyChild1(){
    var row = $('#dg1').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','Are you sure you want to destroy this data?',function(r){
            if (r){
    
                var data = {id:row.id}
                $.ajax({
                    type:'DELETE',
                    url:'destroy_asset_detail',
                    data: data,
                    success:function(XMLHttpRequest, textStatus,result){
                        //alert("Status: " + textStatus); 
                        if(textStatus =='success')
                        {
                            //$('#dlg1').dialog('close');        
                            $('#dg1').datagrid('reload');    
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); 
                        alert("Error: " + errorThrown); 
                    }       
                    });
            }
        });
    }
}

function openfile(val,row){
    return '<button class="w3-button w3-blue" onclick="view_asset();" style="width:80px;">View</button>';
}

function view_asset()
{
    $('#dlg1').dialog('open')
    var row = $('#dg').datagrid('getSelected')
    if(row)
    {
        $('#dg1').datagrid({
            url: '/get_asset_detail/'+ row.id
        })
    }
   
}