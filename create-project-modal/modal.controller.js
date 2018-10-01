// project creation modal
(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateProjectModalController', CreateProjectModalController);

    CreateProjectModalController.$inject = ['$uibModalInstance', 'TaskService', 'FlashService'];
    function CreateProjectModalController ($uibModalInstance, TaskService, FlashService) {
            var vm = this;
            vm.projectName = '';

            // create button handler
            vm.create = function () {
                TaskService.CreateProject(vm.projectName, function(){
                    FlashService.Success('Project ' + vm.projectName + ' created');
                    $uibModalInstance.close();
                });
            };

            // cancel button handler
            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
    }
})();
