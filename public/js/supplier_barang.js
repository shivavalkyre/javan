$(function(){
            $('#dg').edatagrid({
                url: '../control/get_supplier.php',
            });

        });
	
	function openfile(val,row){
		return '<button class="w3-button w3-green" onclick=myJsFunc1();>View Detail</button>';
	}
	function myJsFunc1() {
	var row = $('#dg').datagrid('getSelected');
	//alert (row.kd_supplier);
	$('#dg1').edatagrid({
                url: '../control/get_supplier_barang.php?kd_supplier='+row.kd_supplier,
				saveUrl: '../control/save_supplier_barang.php?kd_supplier='+row.kd_supplier,
                updateUrl: '../control/update_supplier_barang.php',
                destroyUrl: '../control/delete_supplier_barang.php'
            });
	$.mobile.go("#p2");
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
					var dgs = $('#dg1');
					var index = dgs.datagrid('getRowIndex', dgs.datagrid('getSelected'));
				//	var index = $('#dgs').datagrid('getSelected');
					//alert (index);
					//alert (row.nama_barang);

					var editors = dgs.datagrid('getEditors', index);
					$(editors[1].target).val(row.nama_barang);
					//$(editors[2].target).val(row.satuan);
					//$(editors[3].target).val('1');
					//$(editors[3].target).focus();
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
	