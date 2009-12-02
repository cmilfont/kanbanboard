;(function($){
	
	var merge = function(el, cp) {
		for(i in cp) {
			if( typeof cp[i] == 'object') {
				if(el[i] == undefined) {
					el[i] = cp[i]
				}
				merge(el[i], cp[i]);
			} else {
				el[i] = cp[i];
			}
		}
	};
	
    var makeJsonFromText = function(id, value) {
		var objeto = {};
		if(id != undefined) {
			var obj = id.split('.');
	        for(var t = obj.length; t > 0  ; t--) {
	            var temp = {};
	            var name = obj[t-1];
	            if(name == obj[obj.length-1]) {
					if(value != undefined) {
						temp[name] = value;
					} else {
						temp[name] = "";
					}
	            } else {
	                temp[name] = objeto;
	            }
	            objeto = temp;
	        }
	        return objeto;
		}
    };
	
	$.fn.getValues = function(bean)	{
		var json = {};
		merge(json, bean);
		var elements = $(this)[0].elements;
		for(var x in elements) {
			var el = elements[x];
			if(el.type != "submit" && el.type != undefined) {
				var jsonTemp = {};
				var name = $(el).attr("name");
				var value = $(el).val();
				jsonTemp = makeJsonFromText(name, value);
				merge(json, jsonTemp);
			}
		}
		return json;
	};
	
	$.fn.JsonForm = function(bean, fn, callback) {
		$(this).bind("submit", function() {
			try {
				var filter = $(this).getValues(bean);
				console.log(filter.toSource());
				fn(filter, callback);
			} catch (e) {
				console.log(e);
				throw new Error("pare porra")
			}
			return false;
		});
	};
	
})(jQuery);