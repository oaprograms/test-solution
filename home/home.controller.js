(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', 'TaskService'];
    function HomeController($rootScope, TaskService) {
        var vm = this;

        vm.data = {
            user: {},
            options: {
                // Number of results to show. Initially 5.
                limit: '5',
                // Filter tasks by status. Initially any status.
                status: ''
            },
            // List of tasks to show. Initially empty.
            tasks : [],
            status: {
                // show loader before tasks are loaded
                loading: true
            }
        };

        vm.getTasks = getTasks;
        vm.deleteTask = deleteTask;
        vm.createProject = createProject;

        initController();

        function initController() {
            getUserInfo();
            getTasks();
        }

        function getUserInfo() {
            TaskService.GetUserInfo(function(user) {
                vm.data.user = user;
            });
        }

        // get all tasks for the current project
        function getTasks() {
            vm.data.status.loading = true;
            TaskService.GetTasks(vm.data.options, function(tasks) {
                vm.data.status.loading = false;
                vm.data.tasks = tasks;
            });
        }

        function deleteTask(task) {
            TaskService.DeleteTask(task.id, function(response) {
                FlashService.Success('Task ' + task.name + ' deleted');
                getTasks();
            });
        }

        // opens create project modal
        function createProject() {
            TaskService.CreateProjectModal();
        }

    }

})();

