 $(function(){
            $('#dg').edatagrid({
                url: '../control/get_saldo_akhir_simpanan.php',
            });
			
			

			
			
		});
	
		
		function onBeforeLoad(param) {
			//alert('helo');
			//alert(kd_supplier);
			
				var opts = $(this).datagrid('options');
				opts.url = '../control/get_anggota_all.php';

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