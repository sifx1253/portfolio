(function () {
	var country = {'code':'dk','id':15,'defaultLangauge':'da'};

	if (!window.evidon) window.evidon = {};

	if (window.evidon.notice) {
		window.evidon.notice.setLocation(country);
	}
	else {
		window.evidon.location = country;
	}
})();
