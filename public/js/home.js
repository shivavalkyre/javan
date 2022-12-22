
// $.ajax({
//     type:'GET',
//     url:'get_parent',
//     dataType: 'JSON',
//     success:function(XMLHttpRequest, textStatus,result){
//         //alert(result)
//         //alert("Status: " + textStatus); 
//         if(textStatus =='success')
//         {
            
//             var data = []
//             // data.push(result.responseJSON.rows)
//             // console.log(data)
//             data.push({id:'idvalue',text:'textvalue'});
//             $('#id_parents').combobox('loadData',data)
//         }
//     },
//     error: function(XMLHttpRequest, textStatus, errorThrown) { 
//         alert("Status: " + textStatus); 
//         alert("Error: " + errorThrown); 
//     }       
//     });