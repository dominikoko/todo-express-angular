module.exports = (sequelize,Sequelize) =>{
    const Todo = sequelize.define('todo',{
        title: {
            type: Sequelize.STRING
        },
        task: {
            type: Sequelize.STRING
        }
    });

    return Todo;
}