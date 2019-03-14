//创建表格以及删除表格
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users',function(table){
        table.increments();//存放主键id的进行自增长
        table.string('username').notNullable().unique();//存放username，不为空并且唯一
        table.string('email').notNullable().unique();
        table.string('password_digest').notNullable();//存放加密后的密码，仅仅不为空就行
        table.timestamps();//存放时间戳
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users',function(table){
        
    });
};
