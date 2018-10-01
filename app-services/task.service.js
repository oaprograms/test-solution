(function () {
    'use strict';

    angular
        .module('app')
        .factory('TaskService', TaskService);

    TaskService.$inject = ['$http', 'FlashService', '$uibModal'];
    function TaskService($http, FlashService, $uibModal) {
        var PROJECT_ID = 'oaprograms/smart-variant-filtering';
        var AJAX_ROOT = 'https://cavatica-api.sbgenomics.com/v2';

        var service = {};

        service.GetTasks = GetTasks;
        service.GetTask = GetTask;
        service.DeleteTask = DeleteTask;

        service.GetUserInfo = GetUserInfo;
        service.CreateProject = CreateProject;
        service.CreateProjectModal = CreateProjectModal;

        return service;

        /**
         * Get tasks list from the API
         * @param callback
         */
        function GetTasks(options, callback) {
            $http({
                url: AJAX_ROOT + '/tasks',
                method: "GET",
                params: {
                    project: PROJECT_ID,
                    limit: options.limit,
                    status: options.status || undefined
                }
            }).then(function(response){
                if (response.data.items) {
                    callback(response.data.items);
                } else {
                    FlashService.NetworkError(response);
                }
            }, function(response){
                FlashService.NetworkError(response);
            });
        }

        /**
         * Get task details from the API
         * @param taskId
         * @param callback
         */
        function GetTask(taskId, callback) {
            $http.get(AJAX_ROOT + '/tasks/' + taskId, {})
                .then(function(response){
                    if (response.data) {
                        callback(response.data);
                    } else {
                        FlashService.NetworkError(response);
                    }
                },function(response){
                    FlashService.NetworkError(response);
                });
        }

        /**
         * Delete task
         * @param taskId
         * @param callback
         */
        function DeleteTask(taskId, callback) {
            $http({
                url: AJAX_ROOT + '/tasks/' + taskId,
                method: "DELETE"
            }).then(function(response){
                if (response.data) {
                    callback(response.data);
                } else {
                    FlashService.NetworkError(response);
                }
            }, function(response){
                FlashService.NetworkError(response);
            });
        }

        /**
         * Get user info
         * @param callback
         */
        function GetUserInfo(callback) {
            $http({
                url: AJAX_ROOT + '/user',
                method: "GET"
            }).then(function(response){
                if (response.data) {
                    callback(response.data);
                } else {
                    FlashService.NetworkError(response);
                }
            }, function(response){
                FlashService.NetworkError(response);
            });
        }

        /**
         * Create a project
         * @param projectName
         * @param callback
         */
        function CreateProject(projectName, callback) {
            $http({
                url: AJAX_ROOT + '/projects',
                method: "POST",
                data: {
                    project: projectName
                }
            }).then(function(response){
                if (response.data) {
                    callback(response.data);
                } else {
                    FlashService.NetworkError(response);
                }
            }, function(response){
                FlashService.NetworkError(response);
            });
        }

        function CreateProjectModal() {
            $uibModal.open({
                templateUrl: 'createProjectModal.html',
                controller: 'CreateProjectModalController',
                controllerAs: 'vm'
            });
        }

    }

})();

