        $(function(){
            $('#dg').edatagrid({
                url: '../control/get_anggota.php',
                saveUrl: '../control/save_anggota.php',
                updateUrl: '../control/update_anggota.php',
                destroyUrl: '../control/delete_anggota.php'
            });
        });