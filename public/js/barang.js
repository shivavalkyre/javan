$(function(){
            $('#dg').edatagrid({
                url: '../control/get_product.php',
                saveUrl: '../control/save_product.php',
                updateUrl: '../control/update_product.php',
                destroyUrl: '../control/delete_product.php'
            });
				
		$('#findT').textbox({
			onClickButton: function(value){
			//console.log('The value has been changed to ' + value);
			doSearch();
		}
		});
        });
		

	$(document).ready(function(){
		$('#dg2').edatagrid({
			onBeginEdit:function(index,row){
				var editors = $('#dg2').edatagrid('getEditors', index);
				var n0 = editors[0].target;
				var n1 = editors[1].target;
				var n2 = editors[2].target;
				var n3 = editors[3].target;
				var n4 = editors[4].target;
				var n5 = editors[5].target;
				var n6 = editors[6].target;

				n1.numberbox({
					onChange: function(){
						var cb = n0.combogrid('getValue');
						if (cb=='% (Persen)'){
						var harga_tunai_diskon = n2.numberbox('getValue')-((n1.numberbox('getValue')/100) * n2.numberbox('getValue'));
						var harga_kredit_diskon = n3.numberbox('getValue')-((n1.numberbox('getValue')/100) * n3.numberbox('getValue'));
						n4.numberbox('setValue',harga_tunai_diskon);
						n5.numberbox('setValue',harga_kredit_diskon);
						}else{
						var harga_tunai_diskon = n2.numberbox('getValue') - n1.numberbox('getValue');
						var harga_kredit_diskon = n3.numberbox('getValue')- n1.numberbox('getValue');
						n4.numberbox('setValue',harga_tunai_diskon);
						n5.numberbox('setValue',harga_kredit_diskon);	
						}
						n6.focus();
					}
				})
				//alert(editors[1].target.numberbox('getValue'));
				//n6.datebox({
				//	onSelect: function(){
				//		n7.focus();
				//	}
				//})
			}
		});
	});
	
	function openfile(val,row){
		return '<button class="w3-button w3-green" onclick=myJsFunc1();>Lihat Harga</button> &nbsp; <button class="w3-button w3-green" onclick=myJsFunc2();>Setting Diskon</button>';
	}
	
	function myJsFunc1() {
	var row = $('#dg').datagrid('getSelected');
	//alert (row.kd_barang);
	$('#dg1').edatagrid({
                url: '../control/get_barang_harga.php?kd_barang='+row.kd_barang,
				saveUrl: '../control/save_barang_harga.php?kd_barang='+row.kd_barang,
                updateUrl: '../control/update_barang_harga.php',
                destroyUrl: '../control/delete_barang_harga.php'
            });
	$.mobile.go("#p2");
	}
	
	function myJsFunc2(){
		var row = $('#dg').datagrid('getSelected');
			$('#dg2').edatagrid({
                url: '../control/get_barang_harga_diskon.php?kd_barang='+row.kd_barang,
				saveUrl: '../control/save_barang_harga_diskon.php?kd_barang='+row.kd_barang,
                updateUrl: '../control/update_barang_harga_diskon.php',
                destroyUrl: '../control/delete_barang_harga_diskon.php'
            });
		
		$.mobile.go("#p3");
	}

	 
	 function doSearch(){
			var findby = $('#findby').combobox('getValue');
			//alert(findby);
			var finT =$('#findT').textbox('getValue');
			//alert(finT+' ' +findby);
			
			if (findby==''){
			//alert('kosong');
			$('#dg').edatagrid({
				 url: '../control/get_product.php',
			
			});
			}else if (findby=='kd_barang'){
			//alert(findT);
			$('#dg').edatagrid({
				 url: '../control/get_product_filter.php?kd_barang='+finT,
			
			});
			
			}else if (findby=='nama_barang'){
			//alert(findT);
				$('#dg').edatagrid({
				 url: '../control/get_product_filter1.php?nama_barang='+finT,
			
				});
			}
		}
		
		
			function onSelectGrid(index,record) {
				if(cbg) {
					var cb = cbg;
					var opts =cb.combogrid('options');
					var grid = cb.combogrid('grid');
					var row= grid.datagrid('getSelected');
					
					var harga_tunai=0;
					var harga_kredit=0;
					var harga_tunai_diskon=0;
					var harga_kredit_diskon=0;
					var dgs = $('#dg2');
					var index = dgs.datagrid('getRowIndex', dgs.datagrid('getSelected'));
					var editors = dgs.datagrid('getEditors', index);
					//$(editors[1].target).val(0);
					
					var row = $('#dg').datagrid('getSelected');
					var kd_barang= row.kd_barang
					var string ='kd_barang='+kd_barang;
					
					$.ajax({
					type	: 'POST',
					url		: "../control/get_list_barang_harga.php",
					data	: string,
					cache	: false,
					success	: function(data){
					
						var json_raw = data;
						var tt = JSON.parse(data);
						var total_record= tt.total;
						var n = json_raw.indexOf('[');
						var json = json_raw.substr((n+1),json_raw.length-(n+1));
						var json_datas = json.substr(0,json.length-2);
						json_datas='[' + json_datas + ']';
						var obj = JSON.parse(json_datas);
						for (i=0;i<=total_record-1;i++){
							harga_tunai = obj[i].harga_tunai;
							harga_kredit = obj[i].harga_kredit;
							//alert (harga_tunai);
							//harga_tunai_diskon = obj[i].h;
						}
					n1=$(editors[2].target);
					n2=$(editors[3].target);
					n1.numberbox('setValue',harga_tunai);
					n2.numberbox('setValue',harga_kredit);
					
					//if ($(editors[0].target).val()=='% (Persen)'){
					//$(editors[4].target).val(harga_tunai*$(editors[1].target).val());
					//}else{
					//$(editors[4].target).val(harga_tunai-$(editors[1].target).val());	
					//}
					//$(editors[3].target).val(row.price);
					//$(editors[4].target).val(row.price);
					}});

				}
			}
			
				function onShowPanel() {
				cbg = $(this);
				
			}
			function onHidePanel() {
				cbg = null;
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
	  alert (data);
	var params = [
    'height='+screen.height,
    'width='+screen.width,
    'fullscreen=yes' // only works in IE, but here for completeness
].join(',');
var popup = window.open('../report/list_product.pdf', 'popup_window', params); 
popup.moveTo(0,0);
}});
		}

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