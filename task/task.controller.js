// task controller - for showing task details
(function () {
    'use strict';

    angular
        .module('app')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$rootScope', 'TaskService', '$routeParams', 'FlashService'];
    function TaskController($rootScope, TaskService, $routeParams, FlashService) {
        var vm = this;

        vm.data = {
            task: {}
        };

        vm.createProject = createProject;

        initController();

        function initController() {
            getTask($routeParams.id);
        }

        function getTask(taskId){
            TaskService.GetTask(taskId, function(task) {
                vm.data.task = task;
            });
        }

        // opens create project modal
        function createProject() {
            TaskService.CreateProjectModal();
        }
    }
})();
