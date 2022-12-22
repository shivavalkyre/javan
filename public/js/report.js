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
		function cari_data(){
			//$("#p").slideUp('slow');

			var tglfrom = $('#from').datebox('getValue');
			var tglto = $('#to').datebox('getValue');
			var string ='tglfrom='+tglfrom+'&tglto='+tglto;
			//alert (string);
			$.ajax({
			type	: 'POST',
			url		: "po_report.php",
			data	: string,
			cache	: false,
			success	: function(data){
				//$('#pp').hide();
				//$('#back').show();
				//$('#result').show();
				//$('#result').html(data);
				var params = [
    'height='+screen.height,
    'width='+screen.width,
    'fullscreen=yes' // only works in IE, but here for completeness
].join(',');
var popup = window.open('po_report.php?tglfrom='+tglfrom+'&tglto='+tglto, 'popup_window', params); 
popup.moveTo(0,0);
			}});
		}
		
		
	function cari_data_by_supplier(){
			//$("#p").slideUp('slow');

			var tglfrom = $('#from_sup').datebox('getValue');
			var tglto = $('#to_sup').datebox('getValue');
			var supplier = $('#sup').combogrid('getValue');
			var string ='tglfrom='+tglfrom+'&tglto='+tglto+'&supplier='+supplier;
			//alert (string);
			$.ajax({
			type	: 'POST',
			url		: "po_report.php",
			data	: string,
			cache	: false,
			success	: function(data){
				//$('#pp').hide();
				//$('#back').show();
				//$('#result').show();
				//$('#result').html(data);
				var params = [
    'height='+screen.height,
    'width='+screen.width,
    'fullscreen=yes' // only works in IE, but here for completeness
].join(',');
var popup = window.open('po_report_by_supplier.php?tglfrom='+tglfrom+'&tglto='+tglto+'&supplier='+supplier, 'popup_window', params); 
popup.moveTo(0,0);
			}});
		}		
		
		
function cari_data1(){
			//$("#p").slideUp('slow');

			var tglfrom = $('#from1').datebox('getValue');
			var tglto = $('#to1').datebox('getValue');
			var string ='tglfrom='+tglfrom+'&tglto='+tglto;
			$.ajax({
			type	: 'POST',
			url		: "ro_report.php",
			data	: string,
			cache	: false,
			success	: function(data){
								var params = [
    'height='+screen.height,
    'width='+screen.width,
    'fullscreen=yes' // only works in IE, but here for completeness
].join(',');
var popup = window.open('ro_report.php?tglfrom='+tglfrom+'&tglto='+tglto, 'popup_window', params); 
popup.moveTo(0,0);
			}});
			}
			
function cari_data1_by_supplier(){
			//$("#p").slideUp('slow');

			var tglfrom = $('#from_sup1').datebox('getValue');
			var tglto = $('#to_sup1').datebox('getValue');
			var supplier = $('#sup1').combogrid('getValue');
			var string ='tglfrom='+tglfrom+'&tglto='+tglto+'&supplier='+supplier;
			$.ajax({
			type	: 'POST',
			url		: "ro_report.php",
			data	: string,
			cache	: false,
			success	: function(data){
								var params = [
    'height='+screen.height,
    'width='+screen.width,
    'fullscreen=yes' // only works in IE, but here for completeness
].join(',');
var popup = window.open('ro_report_by_supplier.php?tglfrom='+tglfrom+'&tglto='+tglto+'&supplier='+supplier, 'popup_window', params); 
popup.moveTo(0,0);
			}});
			}
function cari_data2(){
			//$("#p").slideUp('slow');

			var tglfrom = $('#from2').datebox('getValue');
			var tglto = $('#to2').datebox('getValue');
			var string ='tglfrom='+tglfrom+'&tglto='+tglto;
			$.ajax({
			type	: 'POST',
			url		: "ks_report.php",
			data	: string,
			cache	: false,
success	: function(data){
	var params = [
    'height='+screen.height,
    'width='+screen.width,
    'fullscreen=yes' // only works in IE, but here for completeness
].join(',');
var popup = window.open('ks_report.php?tglfrom='+tglfrom+'&tglto='+tglto, 'popup_window', params); 
popup.moveTo(0,0);
	
}})}