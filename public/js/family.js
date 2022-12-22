var url;

$('#id_parent').combobox({
    url:'/get_parent',
    valueField:'id',
    textField:'nama',

});
            
function newChild(){
    $('#dlg').dialog('open').dialog('center').dialog('setTitle','New Data');
    $('#fm').form('clear');
    url = '/save_family';
}

function newChild1(){

    $('#dlg').dialog('open').dialog('center').dialog('setTitle','New Data');
    $('#fm').form('clear');
    var row = $('#dg').datagrid('getSelected')
   
    if (row)
    {
        //alert(row.id)
        var id = row.id
        //console.log(id)
        $('#id_parent').combobox('setValue',id)   
        $('#id_parent').combobox('select',id)   
        ///$('#id_parent').combobox('disable')  
        
    }
    
    
    url = '/save_family1';
}

function editChild(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg').dialog('open').dialog('center').dialog('setTitle','Edit Data');
        $('#fm').form('load',row);
        url = '/update_family/'+ row.id;
    }
}

function editChild1(){
    var row = $('#dg1').datagrid('getSelected');
    if (row){
        $('#dlg').dialog('open').dialog('center').dialog('setTitle','Edit Data');
        $('#fm').form('load',row);
        url = '/update_family1/'+ row.id;
    }
}

function saveChild(){
    var type 
    if(url == '/save_family' || url == '/save_family1')
    {
        type ='POST'
    }
    else
    {
        type = 'PUT'
    }

    var data = $('#fm').serialize();
    //alert(data)
    $.ajax({
    type:type,
    url:url,
    data: data,
    success:function(XMLHttpRequest, textStatus,result){
        //alert("Status: " + textStatus); 
        if(textStatus =='success')
        {
            $('#id_parent').combobox({
                url:'/get_parent',
                valueField:'id',
                textField:'nama'
            });

            $('#dlg').dialog('close');        
            $('#dg').datagrid('reload');  
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
                    url:'destroy_family',
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
                    url:'destroy_family',
                    data: data,
                    success:function(XMLHttpRequest, textStatus,result){
                        //alert("Status: " + textStatus); 
                        if(textStatus =='success')
                        {
                            $('#dlg').dialog('close');        
                            $('#dg').datagrid('reload');  
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
    return '<button class="w3-button w3-blue" onclick="view_anak();" style="width:80px;">Anak</button>';
}
// function openfile1(val,row){
//     return '<button class="w3-button w3-blue" onclick="view_asset();" style="width:80px;">Asset</button>';
// }

function view_anak()
{
    $('#dlg1').dialog('open')
     var row = $('#dg').datagrid('getSelected')
     
     if(row){
        $('#dg1').datagrid({
            url:'/get_child/'+ row.id
        })
     }
   
}