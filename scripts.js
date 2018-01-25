function checking () {
	var price;
	var current;
	$.get( "https://api.coinbase.com/v2/prices/ETH-USD/spot", function( data ) {

		price = data.data.amount;
		current = data.data.amount;

		if(data !== null || data !== undefined) {
			$('.live-price span').text(data.data.amount);
			document.title = "$" + data.data.amount + " - ETH/USD";
		}

	});

	setInterval(function() { 
		$.get( "https://api.coinbase.com/v2/prices/ETH-USD/spot", function( data ) {
		
			price = data.data.amount;

			if(price !== null || price !== undefined && price !== current) {

				if(current === price) {
					return;
				}
				else if (current >= price) {

					$('.live-price span').css('background', '#FF0000');
					$('.live-price span').css('color', '#FFFFFF');
					setTimeout(function() {
						$('.live-price span').css('background', 'transparent');
						$('.live-price span').css('color', '#f80759');
					}, 750);
					current = price;

				}
				else if (current < price) {

					$('.live-price span').css('background', '#00FF00');
					$('.live-price span').css('color', '#FFFFFF');
					setTimeout(function() {
						$('.live-price span').css('background', 'transparent');
						$('.live-price span').css('color', '#f80759');
					}, 750);

					current = price;
				}

				$('.live-price span').text(price);
				document.title = "$" + price + " - ETH/USD";
				

			}
		});
		
	}, 3500);
}

checking();
