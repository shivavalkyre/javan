 $(function(){
            $('#dg').datagrid({
                url: '../control/get_penjualan.php?username='+parent.myusername,
            });
        });
		
		function openfile(val,row){
		return '<button class="w3-button w3-green" onclick=myJsFunc1();>Lihat Detail</button>';
	}
	function myJsFunc1(){
	var row = $('#dg').datagrid('getSelected');
	$('#dg1').edatagrid({
                url: '../control/get_penjualan_detail.php?no_penjualan='+row.no_penjualan,
            });
		$.mobile.go("#p2");
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