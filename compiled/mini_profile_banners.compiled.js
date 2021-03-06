"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mini_Profile_Banners = function () {
	function Mini_Profile_Banners() {
		_classCallCheck(this, Mini_Profile_Banners);
	}

	_createClass(Mini_Profile_Banners, null, [{
		key: "init",
		value: function init() {
			this.PLUGIN_ID = "pd_mini_profile_banners";

			this.banners = [];

			this.setup();

			$(this.ready.bind(this));
		}
	}, {
		key: "ready",
		value: function ready() {
			var location_check = pb.data("route").name == "search_results" || pb.data("route").name == "conversation" || pb.data("route").name == "list_messages" || pb.data("route").name == "thread" || pb.data("route").name == "list_posts" || pb.data("route").name == "permalink" || pb.data("route").name == "all_recent_posts" || pb.data("route").name == "recent_posts" || pb.data("route").name == "posts_by_ip";

			if (location_check) {
				Mini_Profile_Banners_Mini_Profile.init();
			}
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this.PLUGIN_ID);

			if (plugin && plugin.settings) {
				this.banners = plugin.settings.banners;
			}
		}
	}]);

	return Mini_Profile_Banners;
}();

var Mini_Profile_Banners_Mini_Profile = function () {
	function Mini_Profile_Banners_Mini_Profile() {
		_classCallCheck(this, Mini_Profile_Banners_Mini_Profile);
	}

	_createClass(Mini_Profile_Banners_Mini_Profile, null, [{
		key: "init",
		value: function init() {
			this.add_banners_to_mini_profile();

			pb.events.on("afterSearch", this.add_banners_to_mini_profile.bind(this));
		}
	}, {
		key: "add_banners_to_mini_profile",
		value: function add_banners_to_mini_profile() {
			var _this = this;

			var $mini_profiles = $(".item .mini-profile");

			if (!$mini_profiles.length) {
				return;
			}

			$mini_profiles.each(function (index, item) {
				var $mini_profile = $(item);
				var $elem = $mini_profile.find(".mini-profile-banners");
				var $user_link = $mini_profile.find("a.user-link[href*='user/']");
				var $info = $mini_profile.find(".info");

				if (!$elem.length && !$info.length) {
					return;
				}

				if ($user_link.length) {
					var user_id_match = $user_link.attr("href").match(/\/user\/(\d+)\/?/i);

					if (!user_id_match || !parseInt(user_id_match[1], 10)) {
						return;
					}

					var user_id = parseInt(user_id_match[1], 10);
					var user_banners = _this.get_user_banners(user_id);

					if (!user_banners.length) {
						return;
					}

					var using_info = false;

					if (!$elem.length) {
						using_info = true;
						$elem = $("<div class='mini-profile-banners'></div>");
					}

					var html = "";

					for (var i = 0; i < user_banners.length; ++i) {
						html += "<img src='" + user_banners[i] + "' /><br />";
					}

					$elem.html(html);

					if (using_info) {
						$info.append($elem);
					}

					$elem.show();
				}
			});
		}
	}, {
		key: "get_user_banners",
		value: function get_user_banners() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			if (!user_id) {
				return [];
			}

			var banners = Mini_Profile_Banners.banners;
			var user_banners = [];

			for (var b = 0, l = banners.length; b < l; ++b) {
				if ($.inArrayLoose(user_id, banners[b].members) > -1) {
					user_banners.push(banners[b].image_url);
				}
			}

			return user_banners;
		}
	}]);

	return Mini_Profile_Banners_Mini_Profile;
}();

;


Mini_Profile_Banners.init();