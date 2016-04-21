angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $filter, ContatosAPI, OperadorasAPI, SerialGenerator) {
			$scope.app = "Lista Telefonica";
			$scope.contatos = [];
			$scope.operadoras = [];

			var carregarContatos = function(){
				ContatosAPI.getContatos().success(function(data){
					$scope.contatos = data;
				}).error(function(data, status) {
					$scope.error = "Não foi possível carregar os dados";
				});;
			};

			var carregarOperadoras = function(){
				OperadorasAPI.getOperadoras().success(function(data){
					$scope.operadoras = data;
				});
			};

			$scope.adicionarContato = function(contato) {
				contato.serial = SerialGenerator.generate();
				contato.data = new Date();
				ContatosAPI.saveContato(contato).success(function(data){
					delete $scope.contato;
					$scope.contatoForm.$setPristine();
					carregarContatos();
				});
			};
			$scope.apagarContatos = function(contatos) {
				$scope.contatos = contatos.filter(function(contato) {
					if(!contato.selecionado) return contato;
				});
			};
			$scope.isContatoSelecionado = function(contatos) {
				return contatos.some(function(contato){
					return contato.selecionado;
				});
			};
			$scope.ordenarPor = function(campo) {
				$scope.criterioDeOrdenacao = campo;
				$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao
			};

			carregarContatos();
			carregarOperadoras();
		});