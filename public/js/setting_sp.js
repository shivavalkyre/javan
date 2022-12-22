 $(function(){
            $('#dg').edatagrid({
                url: '../control/get_setting_sp.php',
                saveUrl: '../control/save_setting_sp.php',
                updateUrl: '../control/update_setting_sp.php',
                destroyUrl: '../control/delete_setting_sp.php'
            });
        });