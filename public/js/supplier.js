        $(function(){
            $('#dg').edatagrid({
                url: '../control/get_supplier.php',
                saveUrl: '../control/save_supplier.php',
                updateUrl: '../control/update_supplier.php',
                destroyUrl: '../control/delete_supplier.php'
            });
        });