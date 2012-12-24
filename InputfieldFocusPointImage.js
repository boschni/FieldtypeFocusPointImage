$(function() {

	var initFocusPointBehaviour = function(element) {

		if (element.attr('data-initialized-focus-point')) {
			return;
		}

		var handle,
			container,
			link = element.find('.InputfieldFileLink'),
			inputX = element.find('.InputfieldFocusPointImageX'),
			inputY = element.find('.InputfieldFocusPointImageY');

		// Hide focus point input fields
		inputX.hide();
		inputY.hide();

		// Set fancybox events
		link.fancybox({
			callbackOnShow: function() {

				container = $('#fancy_content');
				handle = $('<div class="FocusPointImageHandle"></div>');

				handle
					.appendTo(container)
					.css('left', inputX.val() + '%')
					.css('top', inputY.val() + '%');

				handle.draggable({
					scroll: false,
					containment: container,
					cursorAt: { top: 20, left: 20 },
					stop: function() {

						var percentageX = Math.round(parseInt(handle.css('left'), 10) / container.width() * 100);
						var percentageY = Math.round(parseInt(handle.css('top'), 10) / container.height() * 100);

						inputX.val(percentageX);
						inputY.val(percentageY);
					}
				});
			},
			callbackOnClose: function() {
				handle.remove();
				container = null;
				handle = null;
			}
		});

		element.attr('data-initialized-focus-point', 'true');
	};

	// Unable to delegate because fancybox returns false on click
	$('.InputfieldFocusPointImage .InputfieldFocusPointImage').each(function() {
		initFocusPointBehaviour($(this));
	});

	$('.InputfieldFocusPointImage .InputfieldFileList').live('AjaxUploadDone', function() {
		$(this).find('.InputfieldFocusPointImage').each(function() {
			initFocusPointBehaviour($(this));
		});
	});
});