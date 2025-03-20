angular.module('page', ["ideUI", "ideView"])
	.config(["messageHubProvider", function (messageHubProvider) {
		messageHubProvider.eventIdPrefix = 'platform.Measurements.Measurements';
	}])
	.controller('PageController', ['$scope', 'messageHub', 'ViewParameters', function ($scope, messageHub, ViewParameters) {

		$scope.entity = {};
		$scope.forms = {
			details: {},
		};

		let params = ViewParameters.get();
		if (Object.keys(params).length) {
			$scope.entity = params.entity ?? {};
			$scope.selectedMainEntityKey = params.selectedMainEntityKey;
			$scope.selectedMainEntityId = params.selectedMainEntityId;
		}

		$scope.filter = function () {
			let entity = $scope.entity;
			const filter = {
				$filter: {
					equals: {
					},
					notEquals: {
					},
					contains: {
					},
					greaterThan: {
					},
					greaterThanOrEqual: {
					},
					lessThan: {
					},
					lessThanOrEqual: {
					}
				},
			};
			if (entity.Id !== undefined) {
				filter.$filter.equals.Id = entity.Id;
			}
			if (entity.Patient !== undefined) {
				filter.$filter.equals.Patient = entity.Patient;
			}
			if (entity.Timestamp) {
				filter.$filter.contains.Timestamp = entity.Timestamp;
			}
			if (entity.Longitude !== undefined) {
				filter.$filter.equals.Longitude = entity.Longitude;
			}
			if (entity.Latitude !== undefined) {
				filter.$filter.equals.Latitude = entity.Latitude;
			}
			if (entity.ECG) {
				filter.$filter.contains.ECG = entity.ECG;
			}
			if (entity.BloodOxidation !== undefined) {
				filter.$filter.equals.BloodOxidation = entity.BloodOxidation;
			}
			if (entity.HartRate !== undefined) {
				filter.$filter.equals.HartRate = entity.HartRate;
			}
			messageHub.postMessage("entitySearch", {
				entity: entity,
				filter: filter
			});
			$scope.cancel();
		};

		$scope.resetFilter = function () {
			$scope.entity = {};
			$scope.filter();
		};

		$scope.cancel = function () {
			messageHub.closeDialogWindow("Measurements-filter");
		};

		$scope.clearErrorMessage = function () {
			$scope.errorMessage = null;
		};

	}]);