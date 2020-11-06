"use strict";

// Vue.directive("auto-focus", {
//     bind: function () {
//         Vue.nextTick(function () {
//             this.el.focus();
//         }.bind(this));
//     }
// });

let get_url = 'https://dorogoy-proekt-final.kxxo.ru/api/items',
    save_url = 'https://dorogoy-proekt-final.kxxo.ru/api/items/set-data';

new Vue({
    el: "#todo",
    data: {
        newItemMessage: "",
        newItemCost: "",
        items: [],
        editingTask: {},
        IsButtonSaveActive:false,
        errorMessage:null
    },
    computed: {
        orderedItems: function () {
            return _.orderBy(this.items, 'rating')
        }
    },
    methods: {

        addTask: function () {
            var taskMessage = this.newItemMessage.trim();
            var taskCost = this.newItemCost;
            if (taskMessage !== "" && taskCost!== "") {
                this.items.push({name: taskMessage, rating: taskCost,is_edit_mode:false});
                this.newItemMessage = "";
                this.newItemCost = "";
                this.IsButtonSaveActive = true;
            }
        },

        removeTask: function (task) {
            if( confirm("Вы действительно хотите удалить запись?")){
                var index = this.items.indexOf(task);
                this.items.splice(index, 1);
                this.IsButtonSaveActive = true;
            }
        },

        editTask: function (task) {
            this.items.forEach((value, index) => {
                value.is_edit_mode = false;
            });

            task.is_edit_mode = true;
            this.editingTask = _.clone(task);
        },

        endEditing: function (task) {
            if(task.is_edit_mode) {
                task.is_edit_mode = false;
                if (this.editingTask.name.trim() !== "") {
                    task.name = this.editingTask.name;
                    this.IsButtonSaveActive = true;
                }
                if(this.editingTask.rating !== "") {
                    task.rating = this.editingTask.rating;
                    this.IsButtonSaveActive = true;
                }
                this.editingTask = {};
            }
        },
        save: function(){
            let self = this;
            self.startLoading();
            $.ajax({
                url: save_url,
                data: {
                    items:self.items
                },
                method: 'PUT',
                success: function (data) {
                    self.IsButtonSaveActive = false;
                    self.initItems(data);
                    self.errorMessage = null;
                    self.stopLoading();
                },
                error: function (error) {
                    console.log(error);
                    self.errorMessage = error.responseText;
                    self.stopLoading();
                }
            });
        },
        initItems: function(items){
            this.items = [];
            items.forEach(element => this.items.push({
                id:element.id,
                name:element.name,
                rating:element.rating,
                is_edit_mode: false
            }));
        },
        reset: function(){
            let self = this;
            self.startLoading();
            $.ajax({
                url: get_url,
                method: 'GET',
                success: function (data) {
                    self.initItems(data);
                    self.stopLoading();
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },

        startLoading(){
            $('#loader').show();
            $('#background-for-loader').show();
        },

        stopLoading(){
            $('#loader').hide();
            $('#background-for-loader').hide();
        }

    },
    mounted: function () {
        this.reset();
    }
});
