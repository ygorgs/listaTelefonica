angular.module("listaTelefonica").service("OperadorasAPI", function ($http, config) {
	this.getOperadoras = function () {
		return $http.get(config.baseUrl + "/operadoras");
	};
});