 $(function(){
            $('#dg').edatagrid({
                url: '../control/get_card.php',
                saveUrl: '../control/save_card.php',
                updateUrl: '../control/update_card.php',
                destroyUrl: '../control/delete_card.php'
            });
        });