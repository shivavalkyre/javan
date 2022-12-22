		var barcode_value;
		var rows_grid;
		var total_belanja;
		
		document.onkeypress = function (e) {
		e = e || window.event;
			//alert(e.keyCode);
			if(e.keyCode==97){
				TambahTransaksi();
			}else if(e.keyCode==116){
				HapusBarang();
			}
		}
	 
	 
		//var ks_auth='<?php echo ($ksno_auth); ?>';
		//alert (ks_auth);
		//$('#tr_nota').html($ks_auth);
		//document.getElementById('tr_nota').innerHTML =ks_auth;
		
		$(document).ready(function(){
		document.getElementById('tr_nota').innerHTML =ks_auth;
		$('#barcode').searchbox('textbox').focus();
		$('#nama_anggota').textbox({
			readonly:true
		});
		
		var nb = $('#total_bayar').numberbox('textbox');
		nb.bind('keydown',function(e){
			if (e.keyCode==13){
				var kembalian = $('#total_bayar').numberbox('getValue')- $('#total_belanjaan').numberbox('getValue');
				$('#total_kembalian').numberbox('setValue',kembalian);
				tutup_transaksi();
			}
		})
		
		var tb = $('#barcode').searchbox('textbox');
		tb.bind('keydown', function(e){
			if (e.keyCode==13){
				//alert(e.keyCode);
				var value= $('#barcode').searchbox('getValue');
				//
				TambahTransaksi();
				$('#barcode').searchbox('setValue','');
			}
		});
		
		$('#no_anggota').textbox({
					disabled:true
				});
		
		$('#sb_anggota').switchbutton('uncheck');
		$('#rb_kredit').radiobutton({
			disabled:true
		});
		$('#rb_tunai').radiobutton({
			checked:true
		});
		 $('#sb_anggota').switchbutton({
			 onText:'YES',
			 offText:'NO',
			 onChange: function(checked){
				
                if(checked==true){
				$('#rb_kredit').radiobutton({
					disabled:false,
					checked:true
				});
				$('#rb_tunai').radiobutton({
					checked:false
				});
				$('#no_anggota').textbox({
					disabled:false
				});
				$('#no_anggota').textbox('textbox').focus();
				}else{
				$('#rb_kredit').radiobutton({
					disabled:true
				});
				$('#rb_tunai').radiobutton({
					checked:true
				});
				$('#no_anggota').textbox({
					disabled:true,
					value:''
				});
				}
			$('#nama_anggota').textbox('setValue','');
            }
		 });
			$('#dg1').datagrid({

				onBeginEdit:function(index,row){
					rows_grid = $('#dg1').datagrid('getRows');
					//alert(rows_grid.length-1);
					
					if (rows_grid.length-1==0){
						$('#sb_anggota').switchbutton({
							disabled:false
						});
						$('#rb_tunai').radiobutton({
							disabled:false
						});
						$('#rb_kredit').radiobutton({
							disabled:false
						})
					}else{
						$('#sb_anggota').switchbutton({
							disabled:true
						});
						$('#rb_tunai').radiobutton({
							disabled:true
						});
						$('#rb_kredit').radiobutton({
							disabled:true
						});
						//$(
						//$('#ubah_barang').prop('disabled', false);
					}
				},
				onEndEdit:function(index,row,changes){
					var data = $('#dg1').datagrid('getData');
					var rows = data.total;
					if (rows>0){
					var rows = $('#dg1').datagrid('getRows');
					var total_belanja=0;
					for(var i=0; i<rows.length; i++){
						total_belanja= total_belanja+parseInt($('#dg1').datagrid('getRows')[i].subtotal);
					}
					$('#tr_total').html(toRp(total_belanja));
					}
				}
			});
		});
	function openfile(val,row){
		return '<button class="w3-button w3-green" onclick=PilihBarang();>Pilih</button>';
	}
		function openfile1(val,row){
		return '<button class="w3-button w3-green" onclick=PilihTransaksiKasir();>Pilih</button>';
	}
		function actionfile(val,row){
		return '<button id="ubah_barang"'+ row.id +' class="w3-button w3-green" onclick=UbahBarang();>Simpan</button>&nbsp;<button class="w3-button w3-green" onclick=HapusBarang();>Hapus</button>';
	}
        function doSearchBarang(value){
            //alert('You input: ' + value);
			barcode_value=value;
			if (value.length==0){
				$('#w').window('open');
				$('#findT').textbox('textbox').focus();
				var tx = $('#findT').textbox('textbox');
				tx.bind('keydown', function(e){
				if (e.keyCode==13){
					//alert('Enter');
					doSearch();
					$('#findT').textbox('textbox').focus();
				}
			});
			}else{
				//cari item berdasar kode
			}
        }
		
		function PilihTransaksiKasir(){
			//alert('Test');
			$('#dg1').datagrid('loadData', {"total":0,"rows":[]});
			
			var row = $('#dg2').edatagrid('getSelected');
            if (row){
              var no_penjualan = row.no_penjualan;
			  var subtotal = row.subtotal;
			  var kd_anggota= row.kd_anggota;
			  var cara_beli = row.cara_beli;
			  var jml_barang = row.jml_barang;
			  
			  if (kd_anggota.length>0){
				  $('#sb_anggota').switchbutton({
					  checked:true
				  });
				  if (cara_beli=="Tunai"){
					  $('#rb_tunai').radiobutton({
							checked:true
					  });
					  $('#rb_kredit').radiobutton({
							checked:false
					  });
				  }else{
					  $('#rb_tunai').radiobutton({
							checked:false
					  });
					  $('#rb_kredit').radiobutton({
							checked:true
					  });
				  }
				  $('#no_anggota').textbox('setValue',kd_anggota);
				  //var g = $('#no_anggota').combogrid('grid');	// get datagrid object
				  //var r = g.datagrid('getSelected');	// get the selected row
				  //$('#nama_anggota').textbox('setValue',r.nama_anggota);
			  }else{
				  $('#sb_anggota').switchbutton({
					  checked:false
				  });
			  }
			  	$('#sb_anggota').switchbutton({
					  disabled:true
				});
				
				// load data detail
			var string ='no_penjualan='+no_penjualan;
			$.ajax({
			type	: 'POST',
			url		: "../control/get_open_transaction_detail.php",
			data	: string,
			cache	: false,
			success	: function(data){
				//alert(data);
				var json_raw = data;
				var tt = JSON.parse(data);
				var total_record= tt.total;
				var n = json_raw.indexOf('[');
				var json = json_raw.substr((n+1),json_raw.length-(n+1));
				var json_datas = json.substr(0,json.length-2);
				json_datas='[' + json_datas + ']';
				//alert(json_datas);
				var obj = JSON.parse(json_datas);
				
				for (i=0;i<=total_record-1;i++){
				//alert (obj[i].id+obj[i].kd_barang+obj[i].nama_barang+obj[i].satuan+obj[i].qty+obj[i].subtotal);
					//alert (i + 'total_record:'+parseInt(total_record));
					$('#dg1').edatagrid('addRow',{
					index 	:i ,
					row		: {
						id			: obj[i].id,
						kd_barang 	: obj[i].kd_barang,
						nama_barang	: obj[i].nama_barang,
						satuan		: obj[i].satuan,
						qty			: obj[i].qty,
						subtotal	: obj[i].subtotal,
					}
					});
					
					

				}
				$('#dg1').edatagrid('addRow');
				$('#dg1').edatagrid('cancelRow');
				

			}});
				
			  $('#tr_nota').html(no_penjualan);
			  $('#tr_total').html(toRp(subtotal));
			  
			  $('#w1').window('close');
            }else{
				alert('Error');
			}
			
		}
		
		
		
		function PilihBarang(){
			
			var row = $('#dg').datagrid('getSelected');
            if (row){
                var kd_barang= row.kd_barang;
				$('#barcode').searchbox('setValue',kd_barang);
				$('#w').window('close');
				$('#barcode').searchbox('textbox').focus();
            }
			
		}
		
		function HapusBarang(){
			var selectedrow = $("#dg1").datagrid("getSelected");
			var no_penjualan = $('#tr_nota').html();
			var kd_barang = selectedrow.kd_barang;
			HapusData(no_penjualan,kd_barang);
			var rowIndex = $("#dg1").datagrid("getRowIndex", selectedrow);			
			$('#dg1').edatagrid('editRow',rowIndex);
			$('#dg1').edatagrid('cancelRow');
					var rows = $('#dg1').datagrid('getRows');
					var total_belanja=0;
					for(var i=0; i<rows.length; i++){
						total_belanja= total_belanja+parseInt($('#dg1').datagrid('getRows')[i].subtotal);
					}
					$('#tr_total').html(toRp(total_belanja));
		}
		
		function UbahBarang(){
			//alert('ubah');
			var dgs = $('#dg1');
			var index = dgs.datagrid('getRowIndex', dgs.datagrid('getSelected'));
			var row = dgs.datagrid('getRows')[index];
			//alert (row.id);
			var editors = dgs.datagrid('getEditors', index);
			var kd_barang_editor = $(editors[1].target);
			var kd_barang= kd_barang_editor.val();
			//alert (kd_barang);
			var string ="kd_barang="+kd_barang;
			$.ajax({
			type	: 'POST',
			url		: "../control/get_product_harga_filter.php",
			data	: string,
			cache	: false,
			success	: function(data){
				//alert(data);
				var json_raw = data
				var tt = JSON.parse(data);
				var total_record= tt.total;
				//alert (total_record);
				var n = json_raw.indexOf("[");
				var json = json_raw.substr((n+1),json_raw.length-(n+1))
				json=json.substr(0,json.length-2)
				json='[' + json+ ']';
				//alert(json);
				var obj = JSON.parse(json);
				for (i=0;i<total_record;i++){
				harga_tunai = obj[i].harga_tunai;
				harga_kredit = obj[i].harga_kredit;
				}
				//alert (harga_tunai);
				//alert (harga_kredit);
				var qty_editor=$(editors[4].target);
				var qty = qty_editor.val();
				//alert (qty);
				var checked = $('#sb_anggota').switchbutton('options').checked;
					if (checked==false){ // bukan anggota, harga tunai
						$(editors[5].target).val(qty*harga_tunai);
						var subtotal= qty*harga_tunai;
					}else{
						$(editors[5].target).val(qty*harga_kredit);
						var subtotal= qty*harga_kredit;
					}
					
				UpdateData($('#tr_nota').html(),kd_barang,qty, subtotal);	
				$('#dg1').edatagrid('addRow');
				$('#dg1').edatagrid('cancelRow');
			}});
			
		}
		
		function TambahTransaksi(){
			$('#sb_anggota').switchbutton({
				disabled:true,
			});
			barcode_value= $('#barcode').searchbox('getValue');
			
			var qty = $('#nb').numberbox('getValue');
			var id_barang;
			var kd_barang;
			var nama_barang;
			var satuan;
			var diskon_type;
			var diskon;
			var harga_tunai;
			var harga_kredit;
			var is_exist=false;
			var id_same_index;
			var qty_same_index;
			var harga_same_index;
			
			//alert(barcode_value.length);
			if (barcode_value.length!=0){
			var string ="kd_barang="+barcode_value;
			$.ajax({
			type	: 'POST',
			url		: "../control/get_stock_status.php",
			data	: string,
			cache	: false,
			success	: function(data){
				
				var json_raw = data
				var is_nol= JSON.parse(json_raw);
				var total_record = is_nol.total;
				
			if (total_record>0){	
			var n = json_raw.indexOf("[");
			var json = json_raw.substr((n+1),json_raw.length-(n+1))
			json=json.substr(0,json.length-2)
			var obj = JSON.parse(json);
			var stock = obj.stock
			if (stock>0 && stock>=qty){
			$.ajax({
			type	: 'POST',
			url		: "../control/get_product_harga_filter.php",
			data	: string,
			cache	: false,
			success	: function(data){
				//alert (data);
				var json_raw = data
				var is_nol= JSON.parse(json_raw);
				var total_record = is_nol.total;
				//alert (total_record);
				if (total_record>0){
				var n = json_raw.indexOf("[");
				var json = json_raw.substr((n+1),json_raw.length-(n+1))
				json=json.substr(0,json.length-2)
				//alert(json);
				var obj = JSON.parse(json);
				id_barang = obj.id;
				kd_barang = obj.kd_barang;
				nama_barang= obj.nama_barang;
				satuan = obj.satuan;
				harga_tunai = obj.harga_tunai;
				harga_kredit = obj.harga_kredit;
				//alert(harga_kredit);
				// check dulu data barang yg sudah di tambah
					var rows = $('#dg1').datagrid('getRows');
					for(var i=0; i<rows.length; i++){
						if (id_barang==rows[i]['id']){
							is_exist=true;
							id_same_index=i;
							qty_same_index=$('#dg1').datagrid('getRows')[i].qty;
							harga_same_index=$('#dg1').datagrid('getRows')[i].subtotal;
						}
						total_belanja=parseInt(total_belanja)+parseInt($('#dg1').datagrid('getRows')[i].subtotal);
					}
					
					
					//alert(is_exist);
				if (is_exist==false){
				
				$('#dg1').edatagrid('addRow');
					var dgs = $('#dg1');
					var index = dgs.datagrid('getRowIndex', dgs.datagrid('getSelected'));
					var editors = dgs.datagrid('getEditors', index);
					$(editors[0].target).val(id_barang);
					$(editors[1].target).val(kd_barang);
					$(editors[2].target).val(nama_barang);
					$(editors[3].target).val(satuan);
					$(editors[4].target).val(qty);
					
					var checked = $('#sb_anggota').switchbutton('options').checked;
					if (checked==false){ // bukan anggota, harga tunai
						$(editors[5].target).val(qty*harga_tunai);
					}else{
						var no_anggota = $('#no_anggota').textbox('getValue');
						if (no_anggota.length==0){
							alert('No. Anggota tidak boleh kosong');
							HapusBarang();
							$('#no_anggota').textbox('textbox').focus();
						}else{
						var rb_checked = $('#rb_tunai').radiobutton('options').checked;
						if (rb_checked==false){
							$(editors[5].target).val(qty*harga_kredit);
						}else{
							$(editors[5].target).val(qty*harga_tunai);
						}
					}}

				$('#dg1').edatagrid('addRow');
				$('#dg1').edatagrid('cancelRow');
				}else{
					//get same row index
					harga_same_index = harga_same_index/qty_same_index;
					qty_same_index = parseInt(qty_same_index)+ parseInt($('#nb').numberbox('getValue'));
					harga_same_index=harga_same_index*qty_same_index;
					$('#dg1').datagrid('updateRow',{
					index: id_same_index,
					row: {
						qty: qty_same_index,
						subtotal: harga_same_index,
						}
					});
				}
					var rows = $('#dg1').datagrid('getRows');
					var total_belanja=0;
					for(var i=0; i<rows.length; i++){
						total_belanja= total_belanja+parseInt($('#dg1').datagrid('getRows')[i].subtotal);
					}
					$('#tr_total').html(toRp(total_belanja));
					//tambah transaksi ke database
					
					if ($('#sb_anggota').switchbutton('options').checked==true){
						 var tk = $('#rb_tunai').radiobutton('options').checked;
						 if (tk==false){
							 var cara_beli= 'Kredit';
						 }else{
							 var cara_beli = 'Tunai';
						 }
						 
					}else{
						var cara_beli = 'Tunai';
					}
					//alert($('#tr_nota').html());
					//alert (currday());
					var username = parent.myusername;
					//var username='admin';
					//alert (username);
					//alert (cara_beli);
					SimpanData($('#tr_nota').html(),currday(),username, $('#no_anggota').textbox('getValue'),cara_beli);
				}else{
					// $.messager.alert('Koperasi Indonesia','Kode barang tidak ditemukan!','error');
					 //$('#barcode').searchbox('textbox').focus();
					$.messager.alert('Tokoo','Kode barang / Harga tidak ditemukan!','error',function(){
						$('#barcode').searchbox('textbox').focus();
					});
					 
				}
			},	error:function(e){
					alert('Error');
					
			}});
			}else{	
				$.messager.alert({
				title: 'Tokoo',
				msg: 'Stock Barang Kosong / Kurang!',
				icon: 'error',

			
		});
			}}}});		
			
					//$(editors[4].target).val(barcode_value);
			}else{
				alert('Harap isi barcode');
				
				$('#barcode').searchbox('textbox').focus();
				rows_grid = $('#dg1').datagrid('getRows');
				//alert(rows_grid.length-1);
					
					if (rows_grid.length-1==0){
						$('#sb_anggota').switchbutton({
							disabled:false
						});
					}else if (rows_grid.length-1==-1){
						$('#sb_anggota').switchbutton({
							disabled:false
						});
					}else if (rows_grid.length-1>0){
						$('#sb_anggota').switchbutton({
							disabled:true
						});	
					}
			}
		}
		function BatalTransaksi(){
			var row = $('#dg1').datagrid('getSelected');
			var index = $('#dg1').datagrid('getRowIndex', row);
			//alert(index);
			$('#dg1').datagrid('selectRow', index);
			$('#dg1').edatagrid('cancelRow');
			//alert(rows_grid);
		}
		function TransaksiBaru(){
			window.location.reload();
		}
		$(function(){
            $('#dg').edatagrid({
                url: '../control/get_product.php',
            });
			$('#dg2').edatagrid({
                url: '../control/get_open_transaction.php?username='+ parent.myusername,
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
		
		function SimpanData(no_penjualan,tgl,username,no_anggota,cara_beli,type_diskon,diskon){
			var string =  'no_penjualan='+no_penjualan+'&tgl='+tgl+'&username='+username+'&no_anggota='+ no_anggota+'&cara_beli='+ cara_beli+'&status=open';	
			//alert (string);
			$.ajax({
			type	: 'POST',
			url		: "../control/save_header_kasir.php",
			data	: string,
			cache	: false,
			success	: function(data){
				
				var rows = $('#dg1').datagrid('getRows');
				//alert(rows);
				for(var i=0; i<rows.length; i++){
				var string_detail= 'no_penjualan='+no_penjualan+'&kd_barang='+$('#dg1').datagrid('getRows')[i].kd_barang+'&qty='+$('#dg1').datagrid('getRows')[i].qty+'&subtotal='+$('#dg1').datagrid('getRows')[i].subtotal;
				//alert(string_detail);
				$.ajax({
					type	: 'POST',
					url		: "../control/save_detail_kasir.php",
					data	: string_detail,
					cache	: false,
					success	: function(data){
						//alert ('Data berhasil disimpan');
					}
				});
				
				}
			}
			});
		}
			
		function UpdateData(no_penjualan,kd_barang,qty,subtotal){
			
				//var rows = $('#dg1').datagrid('getRows');
				//for(var i=0; i<rows.length; i++){
				var string_detail= 'no_penjualan='+no_penjualan+'&kd_barang='+kd_barang+'&qty='+qty+'&subtotal='+subtotal;
				//alert(string_detail);
				$.ajax({
					type	: 'POST',
					url		: "../control/save_detail_kasir.php",
					data	: string_detail,
					cache	: false,
					success	: function(data){
						//alert ('Data berhasil disimpan');
					}
				});
				
				//}
		}
		
		function HapusData(no_penjualan,kd_barang){
			var string_detail= 'no_penjualan='+no_penjualan+'&kd_barang='+kd_barang;
			$.ajax({
					type	: 'POST',
					url		: "../control/delete_detail_kasir.php",
					data	: string_detail,
					cache	: false,
					success	: function(data){
						//alert ('Data berhasil disimpan');
					}
				});
		}
		
		function ListPendingBayar(){
			$('#dg2').datagrid('reload');
			$('#w1').window('open');
		}
function Pembayaran(){
			$('#dg2').datagrid('reload');
			$('#w2').window('open');
					var data = $('#dg1').datagrid('getData');
					var rows = data.total;
					if (rows>0){
					var rows = $('#dg1').datagrid('getRows')
					var total_belanja=0;
					for(var i=0; i<rows.length; i++){
						total_belanja= total_belanja+parseInt($('#dg1').datagrid('getRows')[i].subtotal);
					}
					//$('#tr_total').html(toRp(total_belanja));
					}
			$('#total_belanjaan').numberbox('setValue',total_belanja);
			$('#total_bayar').numberbox('setValue',0);
			$('#total_kembalian').numberbox('setValue',0);
			var n=$('#total_bayar').numberbox('textbox');
			n.focus();
			
}

function tutup_transaksi(){
	var no_penjualan = $('#tr_nota').html();
	var bayar = $('#total_bayar').numberbox('getValue');
	var kembalian = $('#total_kembalian').numberbox('getValue');
	//alert (kembalian);
	if (parseInt(kembalian)>=0){
			var string= 'no_penjualan='+no_penjualan+'&bayar='+bayar+'&kembalian='+kembalian+'&username='+parent.myusername;
			//alert (string);
			$.ajax({
					type	: 'POST',
					url		: "../control/tutup_transaksi.php",
					data	: string,
					cache	: false,
					success	: function(data){
						//alert ('Data berhasil disimpan');
						window.open('http://localhost:8080/tokoo/control/cetak_struk1.php/?no_penjualan='+no_penjualan+'&username='+parent.myusername+'&hideparams=1', 'width=710,height=555,left=160,top=170');
						$('#w2').window('close');
						// cetak struk
						TransaksiBaru();
					}
				});
	}else{
		$.messager.alert({
				title: 'Tokoo',
				msg: 'Jumlah Bayar Kurang!',
				icon: 'error',
				fn: function(){
				var nb = $('#total_bayar').numberbox('textbox');
				nb.focus();
				}
			
		});

	}
}
function onSelectcb(){
	var g = $('#no_anggota').combogrid('grid');	// get datagrid object
	var r = g.datagrid('getSelected');	// get the selected row
	$('#nama_anggota').textbox('setValue',r.nama_anggota);
}
		
function currday(){
today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //As January is 0.
var yyyy = today.getFullYear();

if(dd<10) dd='0'+dd;
if(mm<10) mm='0'+mm;
return (yyyy+'-'+mm+'-'+dd);
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

