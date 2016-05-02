var imApp = angular.module("imApp", []);
imApp.controller("imController", function($scope){

	resetStates();
	$scope.states = states;
	$scope.smallState = smallStates;
	calcStateTotals();

	$scope.stateClicked = function(state){
		var newColor = getNewColor(state);
	}

	function getNewColor(state){
		if(state.stateColor === "red"){
			state.stateColor = "blue"
			blueStates[state.id] = state;
			redStates[state.id] = "";
		}else if(state.stateColor === "blue"){
			state.stateColor = "open";
			openStates[state.id] = state;
			blueStates[state.id] = "";
		}else if(state.stateColor === "open"){
			state.stateColor = "red";
			redStates[state.id] = state;
			openStates[state.id] = "";
		}
		calcStateTotals();
	}

	function calcStateTotals(){
		$scope.redStateVotes = 0;
		$scope.openStateVotes = 0;
		$scope.blueStateVotes = 0;
		for(var i = 0; i < numStates; i++){
			if(blueStates[i]){
				$scope.blueStateVotes += blueStates[i].electoralVotes;
			}else if(redStates[i]){
				$scope.redStateVotes += redStates[i].electoralVotes;
			}else if(openStates[i]){
				$scope.openStateVotes += openStates[i].electoralVotes;
			}
		}
		$scope.blueWidth = $scope.blueStateVotes / 538 * 100 + "%";
		$scope.openWidth = $scope.openStateVotes / 538 * 100 + "%";
		$scope.redWidth = $scope.redStateVotes / 538 * 100 + "%";
	}

});