var blind = angular.module('blind', ['jsbn.BigInteger', 'ui.router']);

blind.constant('config', {
    URLTTP: "http://localhost:3000/"
});

blind.controller("singController", function ($scope, $rootScope, $http, config, BigInteger, $state, $timeout) {

    $rootScope.isLogged=true;
    $rootScope.isLogged2=false;
    $rootScope.salir=true;
    $scope.voto="";
    $scope.chatAVotar="";
    $scope.message = 'Formulario para añadir clave compartida';
    $scope.CiegaFirmada="";
    $scope.r=0;
    $scope.blindPriv={};
    $scope.blindPub={};
    //////////Parte SSS
    $scope.secreto = '';
    $scope.secretoHex = '';
    $scope.n = ''; //nº shares
    $scope.t = ''; //threshold
    $scope.shares = '';
    $scope.share = '';
    $scope.message = 'Formulario para añadir los "shares"';
    //////////Parte SSS
    $scope.comb = '';
    $scope.secreto = '';
    $scope.secretoHex = '';
    $scope.n = ''; //nº shares
    $scope.t = ''; //threshold
    $scope.shares = [];
    $scope.share = '';
    $scope.s0 = '';
    $scope.s1 = '';
    $scope.s2 = '';
    $scope.verificar=false;



    $scope.registrar = function() {

            console.log('\nSecreto Compartido\n');
            //var secreto = 'supersecerto';
            //Convierte el texto del secreto a hexadecimal
            $scope.secretoHex = secrets.str2hex($scope.secreto); // => 240-bit
            // Genera secreto aleatorio de 512-bit en hexadecimal
            //var secreto = secrets.random(1024);
            var n = parseInt($scope.n);
            var t = parseInt($scope.t);
            var i = 0;
            console.log('-Secreto:', $scope.secreto);
            console.log('-Secreto en hexa:', $scope.secretoHex);
            console.log('-Número de shares:', $scope.n);
            console.log('-Umbral de cooperación:', $scope.t);

            // Divide el secreto en "n" shares, con un umbral de "t" shares para descifrarlo, añadiendo zero-padding si los shares no llegan a 1024 bits
            $scope.shares = secrets.share($scope.secretoHex, n, t, 1024); // => 1024-bit shares
            //Muestra por consola  todos los shares
            while (i < $scope.n) {
                console.log('Share', i, ':', $scope.shares[i]);
                i++;
            }
            $scope.verificar=true;
        };


        $scope.addShare = function () {
            console.log($scope.share);
            $scope.shares.push($scope.share);
            console.log($scope.shares);
            $scope.share = "";
        };


        $scope.combine = function () {

            console.log('\n Recuperar Secreto Compartido \n');

            // Combina los shares (mínimo de "t" para conseguir descifrar el secreto)
            //$scope.comb = secrets.combine( [ $scope.s0, $scope.s1, $scope.s2 ] );
            // Combina toods los shares
            $scope.comb = secrets.combine($scope.shares);
            // Combina "x" shares seguidos
            //var comb = secrets.combine($scope.shares.slice(2, 6));

            // Convierte de nuevo a UTF
            $scope.comb = secrets.hex2str($scope.comb);

            console.log('\nCombinación de los shares:', $scope.comb);
            console.log('Descifrado correctamente:', $scope.comb === $scope.secreto); // => true / false

            $scope.supported = false;
    };
    


});