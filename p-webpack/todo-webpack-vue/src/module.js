/**
 * Created by 斌 on 2017/3/7.
 */
module.exports = {
    todoStorage: {
        STORY_KEY: 'todos-vuejs-2/2',

        fetch: function () {
            console.log(this);
            var todos = JSON.parse(localStorage.getItem(this.STORY_KEY)) || [];
            todos.forEach(function (todo, index) {
                todo.id = index;
            });
            this.uid = todos.length;
            return todos;
        },
        save: function (todos) {
            localStorage.setItem(this.STORY_KEY, JSON.stringify(todos));
        }
    },
    filters: {
        all: function (todos) {
            return todos;
        },
        active: function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed;
            });
        },
        completed: function (todos) {
            return todos.filter(function (todo) {
                return todo.completed
            });
        }
    }
};