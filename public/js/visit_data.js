var url; 
var card;
var pict;
var id_number_card;

$('#btn_search').bind('click',function(){
    //alert('test');
    var tgl_filter = $('#tgl_filter').datebox('getValue');
    var state_filter = $('#state_filter').combobox('getValue');
    var url = '../control/get_visit_data_filtered.php?tgl_filter='+tgl_filter+'&state_filter='+state_filter;
    $('#dg').datagrid({
        url:url
    });
    //alert(tgl_filter);
    //alert(state_filter);

});

 $('#btn_save').bind('click', function(){
    //alert('hello');
    var state_of_card = $('#state').combobox('getValue');

    var valid_from_date = $('#cd1').datebox('getValue');
    var valid_from_time = $('#ct1').timespinner('getValue');
    var valid_from = valid_from_date+ ' '+ valid_from_time;

    var valid_to_date = $('#dt1').datebox('getValue');
    var valid_to_time = $('#tm1').timespinner('getValue');
    var valid_to = valid_to_date+ ' '+ valid_to_time;

    var string = "card="+card+"&state_of_card="+state_of_card+"&valid_from="+valid_from+"&valid_to="+valid_to;

        $.ajax({
            url:'../control/update_valid_card.php',
            method:'post',
            cache:false,
            data:string,
            success: function(data)
            {
                //alert(data);
                $('#w').window('close');
            },
            error: function(error)
            {
                //alert(error);
            }

        });
  });

function openfile(val,row){
    //alert(row.id_access_card);
    return '<button class="w3-button w3-blue" onclick="setup();" style="width:80px;">Access</button>';
}

        
function openfile1(val,row){

    return '<button class="w3-button w3-green" onclick="print();" style="width:80px;">Print</button>';
}
function setup()
{
    var row = $('#dg').datagrid('getSelected');
    //alert(row.id_access_card);
    card= row.id_access_card;


    $('#w').window({
        title:'Access Card Setup'
    });
    $('#w').window('open');
    $('#w').window('center');
}

function print()
{
    var row = $('#dg').datagrid('getSelected');
    pict = row.visitor_image;
    id_number_card = row.id_visitor;

    $('#pict').html(pict);
    $('#id_card_number').html('<b>'+ id_number_card +'</b>');

    $('#w1').window({
        title:'Print Card'
    });
    $('#w1').window('open');
    $('#w1').window('center');
}

function newVisit(){
    //alert('here');
    $('#dlg').dialog('open').dialog('center').dialog('setTitle','New Visitor');
    $('#fm').form('clear');
    url = '../control/save_visit.php';
    $('#floor').textbox('setValue','');
    //alert(url);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var nn = today.getMinutes();
    var time = hh+':'+nn;
    today = yyyy + '-' + mm + '/' + dd;

    $('#cc').combobox('setValue','In');
    $('#tt').tabs('select','Part1');
    $('#cd').datebox('setValue',today);
    $('#ct').timespinner('setValue',time);
}

function editVisit(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg').dialog('open').dialog('center').dialog('setTitle','Edit Visitor');
        $('#fm').form('load',row);
        url = '../control/update_visit.php?id='+row.id;
    }
}

function saveVisit(){
    //alert(url);

    $('#fm').form('submit',{
        url: url,
        iframe: false,
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(result){
            //console.log(result);   
            var result = eval('('+result+')');
            console.log(result);
            if (result.errorMsg){
                $.messager.show({
                    title: 'Error',
                    msg: result.errorMsg
                });
            } else {
                $('#dlg').dialog('close');        // close the dialog
                $('#dg').datagrid('reload');    // reload the user data
                $('#id_visitor').combogrid({
                    url: '../control/get_visitor_out.php'
                }); // refresh 
            }
        }
    });
}

function destroyVisit(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','Are you sure you want to destroy this user?',function(r){
            if (r){
                $.post('../control/delete_visit.php',{id:row.id},function(result){
                    if (result.success){
                        $('#dg').datagrid('reload');    // reload the user data
                    } else {
                        $.messager.show({    // show error message
                            title: 'Error',
                            msg: result.errorMsg
                        });
                    }
                },'json');
            }
        });
    }
}
  
function myformatter(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
function myparser(s){
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        return new Date(y,m-1,d);
    } else {
        return new Date();
    }
}