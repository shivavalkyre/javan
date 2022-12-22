        $(function(){
			//alert(parent.myusername);
			
            $('#dg').edatagrid({
                url: '../control/get_initial_stock.php',
                saveUrl: '../control/save_initial_stock.php',
                updateUrl: '../control/update_initial_stock.php',
                destroyUrl: '../control/delete_initial_stock.php'
            });
			
		
		$('#findT').textbox({
			onClickButton: function(value){
			//console.log('The value has been changed to ' + value);
			doSearch();
		}
		});
	     });
		 
	 function doSearch(){
			var findby = $('#findby').combobox('getValue');
			//alert(findby);
			var finT =$('#findT').textbox('getValue');
			//alert(finT+' ' +findby);
			
			if (findby==''){
			//alert('kosong');
			$('#dg').edatagrid({
				 url: '../control/get_initialstock.php',
			
			});
			}else if (findby=='kd_barang'){
			//alert(findT);
			$('#dg').edatagrid({
				 url: '../control/get_initialstock_filter.php?kd_barang='+finT,
			
			});
			
			}else if (findby=='product'){
			//alert(findT);
				$('#dg').edatagrid({
				 url: '../control/get_initialstock_filter1.php?nama_barang='+finT,
			
				});
			}
		}
		
		function myJsFunc(){

    var string = "";
    //var string= "halo";
	 //alert (string);
     $.ajax({
      type  : 'POST',
      url   : "../control/print_product.php",
      data  : string,
      cache : false,
      success : function(data){
	var params = [
    'height='+screen.height,
    'width='+screen.width,
    'fullscreen=yes' // only works in IE, but here for completeness
].join(',');
var popup = window.open('http:/beautica/report/list_product.pdf', 'popup_window', params); 
popup.moveTo(0,0);
}});
		}
		
		
		
			var cbg=null;
			var tb=null;

			
			function onSelectGrid(index,record) {
				if(cbg) {
					var cb = cbg;
					var opts =cb.combogrid('options');
					var grid = cb.combogrid('grid');
					var row= grid.datagrid('getSelected');
				//	alert (row.satuan);
				//	alert (row.price);
					var dgs = $('#dg');
					var index = dgs.datagrid('getRowIndex', dgs.datagrid('getSelected'));
				//	var index = $('#dgs').datagrid('getSelected');
				//	alert (index);
					

					var editors = dgs.datagrid('getEditors', index);
					$(editors[1].target).val(row.nama_barang);
					$(editors[2].target).val(row.satuan);
					$(editors[3].target).val('1');
					$(editors[3].target).focus();
					//$(editors[3].target).val(row.price);
					//$(editors[4].target).val(row.price);


				}
			}
			


			function onShowPanel() {
				cbg = $(this);
				
			}
			function onHidePanel() {
				cbg = null;
			}
			
			

		$('#dg').edatagrid({
		onEndEdit:function(index,row){
			var edProduct = $(this).datagrid('getEditor', {
                index: index,
                field: 'product'
            });
			var edUnit = $(this).datagrid('getEditor', {
                index: index,
                field: 'unit'
            });
            var edQty = $(this).datagrid('getEditor', {
                index: index,
                field: 'qty'
            });
			//var edPrice = $(this).datagrid('getEditor', {
            //    index: index,
                field: 'price'
            //});
			
			 //row.productname = $(ed.target).combobox('getText');
			 var qty = $(edQty.target).text('getValue');
			 //var price = $(edPrice.target).text('getValue');
			 //var amount = qty.val() * price.val();
			 //row.amount = amount;
		}
		});