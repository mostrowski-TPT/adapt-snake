/*
 * adapt-piechart
 * License - http://github.com/adaptlearning/adapt_framework/LICENSE
 * Maintainers - Martin Sandberg <martin.sandberg@xtractor.se>
 */
define(function(require) {
    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');
    
    var Piechart = ComponentView.extend({
        
         preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.printChart);
        },
        
        /* this is use to set ready status for current component on postRender */
        postRender: function() {
            this.setReadyStatus();

            this.printChart();
        },
        
         printChart: function() {
            var canvas;
            var ctx;
            var lastend = 0;
            var myTotal = this.getTotal();
            
            canvas = document.getElementById("piechart_" + this.model.get('_id'));
            
            width = $(canvas).parent().width();
            if (width > parseInt(this.model.get('maxsize')))
            {
                width = parseInt(this.model.get('maxsize'));
            }
            canvas.width = width;
            canvas.height = width;
           
            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
             var myItemData = this.model.get('items');
           
            for (var i = 0; i < myItemData.length; i++) {
                ctx.fillStyle = myItemData[i].colour;
                var currValue = myItemData[i].value;
                ctx.beginPath();
                ctx.moveTo(width/2,width/2);
                ctx.arc(width/2,width/2,width/2,lastend,lastend+
                  (Math.PI*2*(currValue/myTotal)),false);
                ctx.lineTo(width/2,width/2);
                ctx.fill();
                lastend += Math.PI*2*(currValue/myTotal);
            }
        },
        
        getTotal: function(){
            var myTotal = 0;
            
           var myItemData = this.model.get('items');
           
            for (var i = 0; i < myItemData.length; i++) {
                
                var myvalue = parseInt(myItemData[i].value);
                myTotal += (typeof myvalue === 'number') ? myvalue : 0;
              
            }
            return myTotal;
        }
    });

    Adapt.register("piechart", Piechart);
    return Piechart;
});
