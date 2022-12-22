 $(function(){
            $('#dg').edatagrid({
                url: '../control/get_setting_sw.php',
                saveUrl: '../control/save_setting_sw.php',
                updateUrl: '../control/update_setting_sw.php',
                destroyUrl: '../control/delete_setting_sw.php'
            });
        });