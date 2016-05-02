var imApp = angular.module("imApp", []);
imApp.controller("imController", function($scope){

	openStates = [];
	resetStates();
	$scope.states = states;
	$scope.smallState = smallStates;
	calcStateTotals();
	$scope.DemStates = [];

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

		sortOpenStates();
	}

	function sortOpenStates(){
		sortedOpenStates = [];
		for(var i = 0; i < states.length; i++){
			if(states[i].stateColor === "open"){
				sortedOpenStates.push(states[i]);
			}
		}
		sortedOpenStates.sort(function(a, b){
			return b.electoralVotes - a.electoralVotes;
		});
		if($scope.openStateVotes <= 135){
			calcRepStates();
			calcDemStates();
		}
	}

	function calcDemStates(){
		$scope.demStates = [];
		demStatesFull = [];
		votesNeeded = 270 - $scope.blueStateVotes;
		if(votesNeeded <= 0){
			$scope.demStates = ["No More States Needed"];
		}else{
			for(var j = 0; j < 5; j++){
				x = true;
				var i = j;
				votesInArray = 0;
				demStatesArray = [];
				while(votesInArray <= votesNeeded){
					console.log("I="+i);
					console.log("Open States "+sortedOpenStates.length);
					if(i >= sortedOpenStates.length){
						console.log("FALSE!")
						x = false;
						votesInArray = 10000;
					}else{
						demStatesArray.push(sortedOpenStates[i]);
						votesInArray += sortedOpenStates[i].electoralVotes;
						i++;
					}
				}
				if(x){
					demStatesFull.push(demStatesArray);
				}
			}
		}
		$scope.demStates = demStatesFull;
		console.log($scope.demStates);
	}

	function calcRepStates(){
		$scope.repStates = [];
		repStatesFull = [];
		votesNeeded = 270 - $scope.redStateVotes;
		if(votesNeeded <= 0){
			$scope.repStates = ["No More States Needed"];
		}else{
			for(var j = 0; j < 5; j++){
				x = true;
				var i = j;
				votesInArray = 0;
				repStatesArray = [];
				while(votesInArray <= votesNeeded){
					console.log("I="+i);
					console.log("Open States "+sortedOpenStates.length);
					if(i >= sortedOpenStates.length){
						console.log("FALSE!")
						x = false;
						votesInArray = 10000;
					}else{
						repStatesArray.push(sortedOpenStates[i]);
						votesInArray += sortedOpenStates[i].electoralVotes;
						i++;
					}
				}
				if(x){
					repStatesFull.push(repStatesArray);
				}
			}
		}
		$scope.repStates = repStatesFull;
		console.log($scope.repStates);
	}










});