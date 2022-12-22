			var cbg=null;
			var tb=null;
			var customer;
			

			
			document.onkeypress = function (e) {
			e = e || window.event;
			// use e.keyCode
			//alert (e.keyCode);
			if(e.keyCode==97){
			kd_supplier = $('#cc').combogrid('getValue');
			//alert (kd_supplier.length);
			if (kd_supplier.length!=0){
			$('#dg').edatagrid('addRow');
			var dgs = $('#dg');
			var index = dgs.edatagrid('getRowIndex', dgs.edatagrid('getSelected'));
			var editors = dgs.edatagrid('getEditors', index);
			var t = $(editors[0].target).combogrid('textbox').focus();
			t.focus();
			}
			else if(kd_supplier.length==0)
			{
				alert('Pilih Supplier Dulu');
			}}else if(e.keyCode==13)
			{
			var dgs = $('#dg');
			var index = dgs.edatagrid('getRowIndex', dgs.edatagrid('getSelected'));
			var editors = dgs.edatagrid('getEditors', index);
			//alert($(editors[3].target).val());
			if($(editors[1].target).val()!=""){
					if ($(editors[2].target).val()!=""){
						$('#dg').edatagrid('addRow');
						$('#dg').edatagrid('cancelRow');
					}else{
						$(editors[2].target).focus();
					}
				}else{
					$(editors[1].target).focus();
				}
			}
		};	
		function getValue(){
       kd_supplier = $('#cc').combogrid('getValue');
	   $('#dg').edatagrid('reload');

          
  }
			function supplier_check(){
			//alert ('test');
			kd_supplier = $('#cc').combogrid('getValue');
			if (kd_supplier.length!=0){
			//$('#dg').edatagrid('addRow');
			$('#dg').edatagrid('addRow');
			var dgs = $('#dg');
			var index = dgs.edatagrid('getRowIndex', dgs.edatagrid('getSelected'));
			var editors = dgs.edatagrid('getEditors', index);
			var t = $(editors[0].target).combogrid('textbox').focus();
			t.focus();
				}
			else{
				alert ('Pilih supplier dulu');
			}
			}
			
			function onBeforeLoad(param) {
			//alert('helo');
			//alert(kd_supplier);
			
				var opts = $(this).datagrid('options');
				opts.url = '../control/get_product_price_filter_by_supplier.php?kd_supplier='+kd_supplier;

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
					//var index = $('#dgs').datagrid('getSelected');
					//alert (index);
					//alert (row.satuan);

					var editors = dgs.datagrid('getEditors', index);
					//$(editors[1].target).val(row.satuan);
					
					$(editors[0].target).combogrid('textbox').bind('keydown',function(e){
						if (e.keyCode == 13){
						//$(editors[1].target).val(row.satuan);
						//$(editors[1].target).focus();
						//alert('Enter');
					}
					});

				}
			}


			function onShowPanel() {
				cbg = $(this);
				
			}
			function onHidePanel() {
				cbg = null;
			}
			
			function onValidate(valid){
				if (valid==true){
					var dgs = $('#dg');
					var index = dgs.datagrid('getRowIndex', dgs.datagrid('getSelected'));
					var editors = dgs.datagrid('getEditors', index);
					$(editors[2].target).focus();
				}
			}
		 	function onValidate1(valid){
				if (valid==true){
					//alert(valid);
					var dgs = $('#dg');
					var index = dgs.edatagrid('getRowIndex', dgs.edatagrid('getSelected'));
					var row = dgs.edatagrid('getRows')[index];
					//$('#dg').edatagrid('addRow');
				}
			}
			

		
		
	
		
		$(function(){
			
			$('#pono').textbox('setValue',po_auth);
			$('#currency').combogrid({
				value: 'Rp.'
			});	
			$('#podate').datebox({
			value: (new Date().toString('yyyy-MMM-dd'))});
			
					$('#dg').edatagrid({

		onEndEdit:function(index,row){
            var edQty = $(this).datagrid('getEditor', {
                index: index,
                field: 'qty'
            });
			var edPrice = $(this).datagrid('getEditor', {
                index: index,
                field: 'price'
            });
			
			 //row.productname = $(ed.target).combobox('getText');
			 var qty = $(edQty.target).text('getValue');
			 var price = $(edPrice.target).text('getValue');
			 var amount = qty.val() * price.val();
			 row.amount = amount;
		},

		});
			
			
			
			
			
			
			
			
		$('#btnSave').bind('click', function(){
			
			data = $('#dg').datagrid('getData');
			var total = data.total;
			var pono= $('#pono').textbox('getValue');
			var podate=$('#podate').datebox('getValue');
            var supplier = $('#cc').combogrid('getValue');
			//var deliveryplace=$('#deliveryplace').textbox('getValue');
            var currency = $('#currency').combogrid('getValue');
			var username = parent.myusername;
			//var pic = $('#pic').combogrid('getValue');
			//var status = $('#status').combogrid('getValue');
			//var valid_until=$('#validdate').datebox('getValue');
			//var ppn=$('#ppn').switchbutton('options').checked ? 'yes' : 'no';
			//var discount= $('#discount').textbox('getValue');
			//var sample=$('#sample').switchbutton('options').checked ? 'yes' : 'no';
			if(pono!==''){
			if (total>0){
			
				//ajax save transaction
			var string = "pono="+pono+"&podate="+podate+"&kd_supplier="+supplier+"&currency="+currency+"&username="+username;
			//alert (string);	
			$.ajax({
			type	: 'POST',
			url		: "../control/saveheader_purchase.php",
			data	: string,
			cache	: false,
			success	: function(data){
			//alert(data);
			for (i=0;i<total;i++){
				var row = $('#dg').datagrid('getRows')[i];
				var kd_barang = row.kd_barang;
				//alert(kd_barang);
				//var unit = row.unit;
				var qty = row.qty;
				var price = row.price;
				var amount = row.amount;
			
				var stringdetail  = "pono="+pono+"&kd_barang="+kd_barang+"&qty="+qty+"&price="+price+"&amount="+amount+"&username="+username;	
				//alert (stringdetail);
									$.ajax({
									type	: 'POST',
									url		: "../control/savedetail_purchase.php",
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
											$('#pono').textbox('setValue','');
											$('#deliveryplace').textbox('setValue','');
											$('#discount').textbox('setValue','');
											$('#podate').datebox('setValue','');
											$('#cc').combogrid('setValue','');
											$('#currency').combogrid('setValue','');
											$('#pic').combogrid('setValue','');
											$('#status').combogrid('setValue','');
											$('#validdate').datebox('setValue','');
											$('#sample').switchbutton('uncheck');
											$('#ppn').switchbutton('uncheck');
											$('#dg').datagrid('loadData', {"total":0,"rows":[]});
											$('#dlg').dialog('close');
											location.reload();
										//$("#p3").html(data);
										//alert("Data: " + string );
										//alert("Data: " + data );
										},2800)
										$('#dg').datagrid('reload');
										
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
			
		 function formatPrice(val,row){
    if (val <= 0){
    return '<span style="color:red;">('+val+')</span>';
    } else {
	var Rp=toRp(val);
    return (Rp);
    }
    }
function toRp(angka){
    var rev     = parseInt(angka, 10).toString().split('').reverse().join('');
    var rev2    = '';
    for(var i = 0; i < rev.length; i++){
        rev2  += rev[i];
        if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
            rev2 += '.';
        }
    }
    return  rev2.split('').reverse().join('') ;
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