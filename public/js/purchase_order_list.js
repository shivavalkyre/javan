			var cbg=null;
			var tb=null;
			var quotationno=null;
			var rq=null;
			var dono;
			var pono;
			var customer;
			
			//alert(parent.mylevel);
			
			 $(function(){
				 
			$.extend($.fn.datagrid.defaults.editors, {
				switchbutton:{
			init: function(container, options){
				var input = $('<input>').appendTo(container);
				input.switchbutton(options);
				return input;
			},
			getValue: function(target){
				return $(target).switchbutton('options').checked ? 'yes' : 'no';
			},
			setValue: function(target, value){
				$(target).switchbutton(value=='yes'?'check':'uncheck');
			},
			resize: function(target, width){
				$(target).switchbutton('resize', {width: width,height:22});
			}
		}
	}) 
				 
			var t= $('#findT');
			t.textbox('textbox').bind('keydown', function(e){
			if (e.keyCode == 13){   // when press ENTER key, accept the inputed value.
				//t.textbox('setValue', $(this).val());
				//alert ('Enter');
				doSearch();
		}
			});	 
				 
				 
			 $('#dg1').edatagrid({
                 destroyUrl: '../control/delete_salesdetail.php'
            });
        });
		
		
			function onBeforeLoad(param) {
				var opts = $(this).datagrid('options');

				opts.url = '../control/get_product_price_filter_by_supplier.php?kd_supplier='+kd_supplier;

			}
			
			function onLoadSuccess(){
			
			//var opts = $(this).datagrid('options');
			//opts.url = '../control/get_product_price_join_filter.php?customer='+customer;
			//alert (data);
			
			}
			
			function onSelectGrid(index,record) {
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
					//$(editors[1].target).val(row.sisaDO);
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
                field: 'poqty'
            });
			var edPrice = $(this).datagrid('getEditor', {
                index: index,
                field: 'unitprice'
            });
			
			 //row.productname = $(ed.target).combobox('getText');
			 var qty = $(edQty.target).text('getValue');
			 var price = $(edPrice.target).text('getValue');
			 var amount = qty.val() * price.val();
			 row.amount = amount;
		}
		});

	function openfile(val,row){
        //return '<a href=javascript:window.open("'  + url + row.norekaman + ".pdf" +'","Test","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no","width=700,height=700,top='+ top +',left=' +left +'")><button>Open File</button></a>';
		//return ' <a href="javascript:void(0)"  onclick=myJsFunc1();>View Detail</a>&nbsp; <a href="javascript:void(0)"  onclick=myJsFunc2();>Print</a>';
		return '<button class="w3-button w3-green" onclick=myJsFunc1();>View Detail</button>&nbsp; <button class="w3-button w3-green" onclick=myJsFunc2();>Print</button>';
	}
	function myJsFunc() {
    $('#dlg1').dialog('open').dialog('center');
	}
	function myJsFunc1() {
	 rq= $('#dg').edatagrid('getSelected');
	 //dono=rq.dono;
	 pono=rq.pono;
	 kd_supplier=rq.kd_supplier;
	 //alert (kd_supplier);
	 //alert(dono+' '+pono);
	 //alert(customer);
	$('#dg1').edatagrid({
				 url: '../control/get_purch_detail.php?pono='+pono,
				 saveUrl: '../control/save_purch_detail.php?pono='+pono+'&username='+parent.myusername,
                 updateUrl: '../control/update_purch_detail.php?username='+parent.myusername,
				 destroyUrl:'../control/destroy_purch_detail.php?pono='+pono+'&username='+parent.myusername,
			});
			
	$.mobile.go("#p2");
	 //document.write ('<a href="javascript:void(0)" class="easyui-linkbutton" style="width:100px;height:30px" onclick="$.mobile.go('#p2")');
	 onBeforeLoad()
	}
		String.prototype.replaceAll = function(searchStr, replaceStr) {
	var str = this;

    // no match exists in string?
    if(str.indexOf(searchStr) === -1) {
        // return string
        return str;
    }

    // replace and remove first match, and do another recursirve search/replace
    return (str.replace(searchStr, replaceStr)).replaceAll(searchStr, replaceStr);
	}
	function myJsFunc2() {
    //alert("myJsFunc2");
	
		var rq = $('#dg').edatagrid('getSelected');
		var pono = rq.pono;
		//alert(quotationno);
		var str= pono;
		var nopo=str.replaceAll('/', '_');
		var string = "pono="+pono;
			//alert (string);	
			$.ajax({
			type	: 'POST',
			url		: "../control/print_po.php",
			data	: string,
			cache	: false,
			success	: function(data){
			
			var params = [
    'height='+screen.height,
    'width='+screen.width,
    'fullscreen=yes' // only works in IE, but here for completeness
].join(',');
var url='../ViewerJS/#../report/print_po('+nopo+').pdf';
var popup = window.open(url, 'popup_window', params); 
			
			}});
	}
	
	 function deldo(){
		//alert('del');
		var rq = $('#dg').edatagrid('getSelected');
		var pono = rq.pono;
		//alert(pono);
		
		var string = "pono="+pono+"&username="+parent.myusername;
			//alert (string);	
			$.ajax({
			type	: 'POST',
			url		: "../control/delete_purchase.php",
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
			$('#findT').textbox({
			onClickButton: function(value){
			//console.log('The value has been changed to ' + value);
			doSearch();
		}
		});
	 
	 		function doSearch(){
			var findby = $('#findby').combobox('getValue');
			//alert(findby);
			var finT =$('#findT').textbox('getValue');
			//alert(finT+' ' +findby);
			
			if (findby==''){
			//alert('kosong');
			$('#dg').edatagrid({
				 url: '../control/get_sales.php',
			
			});
			}else if (findby=='pono'){
			//alert(finT);
			$('#dg').edatagrid({
				 url: '../control/get_sales_filter.php?pono='+finT,
			
			});
			}else if (findby=='supplier'){
			//alert(findT);
				$('#dg').edatagrid({
				 url: '../control/get_sales_filter2.php?supplier='+finT,
			
				});
			}
		}
	 function create_sales(){
	 //alert ('Create Sales');
	 var pono= $('#pono').textbox('getValue');
	 var podate = $('#podate').datebox('getValue');
	 var deliveryplace= $('#deliveryplace').textbox('getValue');
	 var rw= $('#dg').edatagrid('getSelected');
	 var quotationno= rw.quotationno;
	 var customer =rw.customer;
	 var duedate = new Date(podate);
	 duedate.setDate(duedate.getDate() + 30);
	 var poduedate = new Date(duedate).toISOString();;
	 //alert (poduedate);
	 var ppn = rw.ppn;
	 //alert (pono+''+podate+''+deliveryplace+''+customer+''+quotationno +''+poduedate+''+ppn);
		// ajax return then parse for save data
		var string_header="pono="+pono+"&podate="+podate+"&deliveryplace="+deliveryplace+"&customer="+customer+"&quotationno="+quotationno+"&poduedate="+poduedate+"&ppn="+ppn;
		//alert (string_header);
		$.ajax({
			type	: 'POST',
			url		: "../control/createpo_quo.php",
			data	: string_header,
			cache	: false,
			success	: function(data){
				
			var string = "quotationno="+quotationno;
			//alert (string);	
			$.ajax({
			type	: 'POST',
			url		: "../control/get_quotation_detail1.php",
			data	: string,
			cache	: false,
			success	: function(data){
			//alert(data);
				
				
		var parsedJSON = JSON.parse(data);
		//alert(parsedJSON.length);
		for (var i=0;i<parsedJSON.length;i++) {
            //alert(parsedJSON[i].id);
			//create po_quo_detail
			var product=parsedJSON[i].product;
			var unit=parsedJSON[i].unit;
			var qty=parsedJSON[i].qty;
			var price=parsedJSON[i].price;
			var amount=parsedJSON[i].amount;
			
			//alert (product);
			var stringdetail= "pono="+pono+"&product="+product+"&unit="+unit+"&qty="+qty+"&price="+price+"&amount="+amount;
			$.ajax({
			type	: 'POST',
			url		: "../control/createpodetail_quo.php",
			data	: stringdetail,
			cache	: false,
			success	: function(data){
			
			
			
			
			}});
			
         }
				
			}});	
			$("#pono").textbox('setValue','');
			$("#podate").datebox('setValue','');
			$("#deliveryplace").textbox('setValue','');
			
			$("#dlg1").dialog('close');
			  $.messager.show({
                title:'Saving Data',
                msg:'Create Sales From Quotation Success',
                showType:'show'
            });
				
			$("#dg").edatagrid('reload');
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