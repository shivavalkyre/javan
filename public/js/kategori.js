        $(function(){
            $('#dg').edatagrid({
                url: '../control/get_kategori.php',
                saveUrl: '../control/save_kategori.php',
                updateUrl: '../control/update_kategori.php',
                destroyUrl: '../control/delete_kategori.php'
            });
        });