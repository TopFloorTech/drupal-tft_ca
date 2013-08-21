(function($){
    // jQuery Namespaces:
    // jquery for menu page
    var $menu_page = function(sel){
        return $('.page-admin-structure-menu-manage').find(sel);
    }

    function convert_to_slug(text){
        return text
            .trim()
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'');
    }

    function set_state_value_to_class(){
        var $states = $('.field-name-field-content-state,.views-field-field-content-state');
        $states.each(function(){
            var $this = $(this);
            $this.addClass(convert_to_slug($this.text()));
        });
    }

    function add_menu_add_sibling_links(){
        var $mp = $menu_page;
        var $add_item = $mp('.menu-additem');
        var $menu_items = $mp('tr.menu-enabled');
        $menu_items.find('.menu-overview-title-link').
            append('<a href="#" class="add-sibling">Add Content</a>').
            click(function(e){
                var scroll_pos = window.scrollY;
                var tableDrag = $(e.currentTarget).parent().parent();
                var diff = $add_item.position().top - tableDrag.position().top;
                var indentation = tableDrag.find('.indentation').length;
                var dy = diff > 0 ? (diff * -1) + 30: (diff *-1);
                $add_item.find('a').simulate( "drag", {
		    dx: 0,
		    dy: dy
		});
                
                //TODO:investigate futher, this doesn't seem necessary
                // not sure why this is necessary
                setTimeout(function(){
                    window.scrollTo(0,scroll_pos);
                },1);

            });
    }

    function add_menu_add_form_placeholder(){
        $menu_page('.menu-additem input').attr('placeholder','New content title');
    }

    $(document).ready(function(){
        // add 'Back To Dashboard link on all titles except dashboard'
        $('body').not('.page-admin-dashboard').
            find('h1.page-title').
            append('<a href="/admin/dashboard" class="dashboard">Back To Dashboard</a>');

        // add titles of links for descriptions
        $('.page-admin-dashboard .block a').each(function(){
            var $this = $(this);
            if($this.attr('title')){
            $this.append("<span>"+$this.attr('title')+"</span>");
            }
        });

        // add logout button
        $('h1.page-title').prepend('<a class="logout" href="/user/logout">Log Out</a>');
        // add logout button
        $('h1.page-title').prepend('<a class="account-settings" href="/user/me/edit">Account Settings</a>');

        // unbind the annoying menu ctools things in firefox
        $menu_page('#menu-overview-form .menu-operations *').unbind('');


        jQuery('#edit-additem-target-content option').
            filter('[value="dummy"]').
            filter('[value="url"]').
            filter('[value="existing"]')
            .remove;

        // remove additional complexity from menu additem
        jQuery('#edit-additem-target-content option').
            filter('[value="dummy"],[value="url"],[value="existing"]').
            remove();


        // add state css
        set_state_value_to_class();
        add_menu_add_sibling_links();
        add_menu_add_form_placeholder();

    });
})(jQuery);
