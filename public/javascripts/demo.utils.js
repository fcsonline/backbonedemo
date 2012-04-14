String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

tpl = {

    // Hash of preloaded templates for the app
    templates : {},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All
    // the template files should be concatenated in a single file.
    loadTemplates : function(path, type, names, callback) {

        var that = this;
        var count = 0;

        var loadTemplate = function(index) {
            var name = names[index];
            console.log('Loading template: ' + name + '.' + type);
            $.get(path + name + '.' + type, function(data) {
                that.templates[name] = data;
                count++;
                if (count == names.length) {
                    callback();
                }
            });
        };

        var i;
        for (i = 0; i < names.length; i++) {
            loadTemplate(i);
        }

    },

    // Get template by name from hash of preloaded templates
    get : function(name) {
        return this.templates[name];
    }

};
