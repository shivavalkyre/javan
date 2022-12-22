
			
			document.onkeypress = function (e) {
			e = e || window.event;
				if(e.keyCode==97){
					reffpono = $('#reffpono').combogrid('getValue');
					if (reffpono.length!=0){
					$('#dg').edatagrid('addRow');
					var dgs = $('#dg');
					var index = dgs.edatagrid('getRowIndex', dgs.edatagrid('getSelected'));
					var editors = dgs.edatagrid('getEditors', index);
					var t = $(editors[0].target).combogrid('textbox').focus();
					t.focus();
					}else{
						alert('Pilih No PO Dulu');
					}
				}
			}
			
function newPO(){
var pono = $('#reffpono').combogrid('getValue');
if (pono.length!=0){
	$('#dg').edatagrid('addRow');
	
}else{
	alert('Pilih No PO Dulu');
}

}	

function getValue(){
	pono = $('#reffpono').combogrid('getValue');
	$('#dg').edatagrid('reload');
}



		function onBeforeLoad(param) {

				var opts = $(this).datagrid('options');
				opts.url = '../control/get_product_receive.php?pono='+pono;

			}
			
			function onSelectGrid(index,row) {
				if(cbg) {
					var cb = cbg;
					var opts =cb.combogrid('options');
					var grid = cb.combogrid('grid');
					var row= grid.datagrid('getSelected');
				//	alert (row.price);
					var dgs = $('#dg');
					var index = dgs.datagrid('getRowIndex', dgs.datagrid('getSelected'));
				//	var index = $('#dgs').datagrid('getSelected');
				//	alert (index);
			//		alert (row.price);

					var editors = dgs.datagrid('getEditors', index);

					//$(editors[3].target).val(row.price);
					//$(editors[4].target).val(row.price);
					
					//$(editors[0].target).combogrid('textbox').bind('keydown',function(e){
					//	alert(e.keyCode);
						//if (e.keyCode == 13){
						//$(editors[1].target).val(row.satuan);
						//$(editors[1].target).focus();
							$(editors[1].target).val(row.satuan);
							$(editors[2].target).val(row.os);
					//}
					//});


				}
			}
			


			function onShowPanel() {
				
				cbg = $(this);
				
			}
			function onHidePanel() {
				cbg = null;
				$('#dg').edatagrid('addRow');
				$('#dg').edatagrid('cancelRow');
			}
			
			function onValidate(valid){
				if (valid==true){
					var dgs = $('#dg');
					var index = dgs.datagrid('getRowIndex', dgs.datagrid('getSelected'));
					var editors = dgs.datagrid('getEditors', index);
					$(editors[2].target).focus();
				}
			}
			
			$('#dg').edatagrid({
		onEndEdit:function(index,row){
            var edQty = $(this).datagrid('getEditor', {
                index: index,
                field: 'qty'
            });

			
			 //row.productname = $(ed.target).combobox('getText');
			 var qty = $(edQty.target).text('getValue');

		}
		});
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
		
		
		
		
		$(function(){
			
			var cbg=null;
			var tb=null;
			var pono;
			//alert (ro_auth);
			//var ro_auth='<?php echo ($rono_auth); ?>';
			//$('#pono').textbox('setValue', po_auth);
			$('#receiveno').textbox({
				value: ro_auth
			});
			
			$('#trandate').datebox({
			value: (new Date().toString('yyyy-MMM-dd'))});
			
			var today = new Date();
			//alert (today);
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
				dd = '0'+dd
			} 

			if(mm<10) {
				mm = '0'+mm
			} 

			today = yyyy + '-' + mm + '-' + dd;
			//alert(today);
			$('#trandate').datebox('setValue',today);
			
		$('#btnSave').bind('click', function(){
			//alert('Test');
			data = $('#dg').datagrid('getData');
			var total = data.total;
			
			var receiveno = $('#receiveno').textbox('getValue');
			//alert (receiveno);
			var trandate = $('#trandate').datebox('getValue');
			//alert (trandate);
            var reffpono = $('#reffpono').textbox('getValue');
			//alert (reffpono);
			var receiver = $('#receiver').textbox('getValue');
			//alert (receiver);
			var shift = $('#shift').textbox('getValue');
			//alert (shift);
			

			
			if(receiveno!==''){
			//alert (receiveno);
			if (total>0){
			
				//ajax save transaction
			var string = "receiveno="+receiveno+"&trandate="+trandate+"&reffpono="+reffpono+"&receiver="+receiver+"&shift="+shift+"&username="+parent.myusername;
			//alert (string);	
			$.ajax({
			type	: 'POST',
			url		: "../control/saveheader_receive.php",
			data	: string,
			cache	: false,
			success	: function(data){
			
			for (i=0;i<total;i++){
				var row = $('#dg').datagrid('getRows')[i];
				var kd_barang = row.kd_barang;
				var satuan = row.satuan;
				var qty = row.qty;

			
				var stringdetail  = "receiveno="+receiveno+"&kd_barang=" +kd_barang+"&satuan="+satuan+"&qty="+qty+"&username="+parent.myusername;	
									$.ajax({
									type	: 'POST',
									url		: "../control/save_receive_detail.php",
									data	: stringdetail,
									cache	: false,
									success	: function(data){
										//alert (data);
										var win = $.messager.progress({
										title:'Please waiting',
										msg:'Saving data...'
										});	

										setTimeout(function(){
											$.messager.progress('close');
											$('#receiveno').textbox('setValue','');
											$('#trandate').datebox('setValue','');
											$('#reffpono').combogrid('setValue','');
											$('#receiver').textbox('setValue','');
											$('#shift').textbox('setValue','');
											$('#dg').datagrid('loadData', {"total":0,"rows":[]});
											$('#dlg').dialog('close');
											//newnumber();
										//$("#p3").html(data);
										//alert("Data: " + string );
										//alert("Data: " + data );
										},2800)
										$('#dg').datagrid('reload');
										location.reload();
									},
								error:	 function(data){
								alert ('error');
							}
								});
			
			
				}
			
			}
			
			});
				
				
			}else{
				alert ('Please fill detail transaction');
			}
			}else{
				alert ('Please fill Quotation No first');
			}
		});
		
		});