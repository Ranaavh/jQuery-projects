$(function() {
    $(".costume").draggable({
        helper: "clone",
        revert: "invalid" // Revert to original position if not dropped in a valid droppable
    });

    $(".side-container").droppable({
        accept: ".costume",
        drop: function(event, ui) {
            var costumeSrc = ui.helper.attr("src");
            var costumeAlt = ui.helper.attr("alt");

            // Check if the costume already exists in the side-container
            var existingCostume = $(".side-container img").filter(function() {
                return $(this).attr("src") === costumeSrc && $(this).attr("alt") === costumeAlt;
            });

            if (existingCostume.length === 0) {
                var droppedItem = $(ui.helper).clone();
                $(this).append(droppedItem);

                // Set the cloned item's width and height to match the original
                droppedItem.css({
                    position: "absolute",
                    top: ui.offset.top - $(this).offset().top,
                    left: ui.offset.left - $(this).offset().left,
                    width: ui.helper.width(),
                    height: ui.helper.height()
                });

                droppedItem.draggable({
                    containment: ".container", // Allow dragging within the entire container
                    stop: function(event, ui) {
                        // Check if the item is dragged back to the original container
                        var offset = droppedItem.offset();
                        var containerOffset = $(".costumes-container").offset();
                        var containerHeight = $(".costumes-container").height();
                        var containerWidth = $(".costumes-container").width();

                        if (
                            offset.top > containerOffset.top &&
                            offset.left > containerOffset.left &&
                            offset.top < containerOffset.top + containerHeight &&
                            offset.left < containerOffset.left + containerWidth
                        ) {
                            // Remove the item from side-container if dropped back to original container
                            droppedItem.remove();
                        }
                    }
                });
            }
        }
    });

    $(".costumes-container").droppable({
        accept: ".side-container img",
        drop: function(event, ui) {
            // Remove the costume from the side-container when dropped back into the costumes-container
            ui.helper.remove();
        }
    });
});
