# Interactive State Electorial Vote Map

### Interactive SVG map that keeps track or electorial votes using CSS, HTML, javacript and AngularJS

## Summary

#### The maps states can be clicked on to change their staus from Republican, Democrat or open. The Map keeps track of the vote count and displays it above the map. Using javascript and array manipulation the app will predict and list the fewest amount of states with multiple possibilities needed for each party to get to 270 votes.

### Author: Tristan Lobaugh 
+ Github - https://github.com/TristanLobaugh
+ Homepage - http://tristanlobaugh.com

##Code Examples

### Code used to calculate the staes needed to get to 270 votes
```
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
```

### Code to calculte and sort the open states and then calls the functions to find states needed to get to 270 votes
```
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
```

## To Do