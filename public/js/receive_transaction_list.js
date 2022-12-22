
		function openfile(val,row){
        //return '<a href=javascript:window.open("'  + url + row.norekaman + ".pdf" +'","Test","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no","width=700,height=700,top='+ top +',left=' +left +'")><button>Open File</button></a>';
		return '<button class="w3-button w3-green" onclick=myJsFunc1();>View Detail</button>';
		}
        $(function(){
			
            $('#dg').edatagrid({
                url: '../control/get_receive_transaction.php',
                updateUrl: '../control/update_receive_transaction.php?username='+parent.myusername,
            });
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
			function myJsFunc1() {
	 rq= $('#dg').edatagrid('getSelected');
	 receiveno=rq.receiveno;
	 pono=rq.reffpono;
	 //alert(receiveno);
	$('#dg1').edatagrid({
				 url: '../control/get_receive_detail.php?receiveno='+receiveno,
				 saveUrl: '../control/save_receive_detail.php?receiveno='+receiveno+'&username='+parent.myusername,
                 updateUrl: '../control/update_receive_detail.php?receiveno='+receiveno+'&username='+parent.myusername,
				 destroyUrl: '../control/delete_receive_detail.php?receiveno='+receiveno+'&username='+parent.myusername,

	});		
	$.mobile.go("#p2");
	 //document.write ('<a href="javascript:void(0)" class="easyui-linkbutton" style="width:100px;height:30px" onclick="$.mobile.go('#p2")');
	}
				function onBeforeLoad(param) {
				var opts = $(this).datagrid('options');

				opts.url = '../control/get_product_receive.php?pono='+pono;

			}
	function onSelectGrid(index,record) {
				if(cbg) {
					var cb = cbg;
					var opts =cb.combogrid('options');
					var grid = cb.combogrid('grid');
					var row= grid.datagrid('getSelected');
				//	alert (row.price);
					var dgs = $('#dg1');
					var index = dgs.datagrid('getRowIndex', dgs.datagrid('getSelected'));
				//	var index = $('#dgs').datagrid('getSelected');
				//	alert (index);
			//		alert (row.price);

					var editors = dgs.datagrid('getEditors', index);
					$(editors[1].target).val(row.satuan);
					$(editors[2].target).val(row.os);
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
			
		$('#dg1').edatagrid({
		onEndEdit:function(index,row){
            var edQty = $(this).datagrid('getEditor', {
                index: index,
                field: 'qty'
            });

			
			 //row.productname = $(ed.target).combobox('getText');
			 var qty = $(edQty.target).text('getValue');

		}
		});
		
		 function deltransaction(){
		//alert('del');
		var rq = $('#dg').edatagrid('getSelected');
		var receiveno = rq.receiveno;
		//alert(quotationno);
		
		var string = "receiveno="+receiveno;
			//alert (string);	
			$.ajax({
			type	: 'POST',
			url		: "../control/delete_receive.php",
			data	: string,
			cache	: false,
			success	: function(data){
			 $.messager.show({
                title:'Deletion Result',
                msg:'Your data was deleted.',
                showType:'show'
            });
			 $('#dg').edatagrid('reload');
			}});
		
	 }