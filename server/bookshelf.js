import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from '../knexfile';

export default bookshelf(knex(knexConfig.development));//这个development是knexConfile中的开发环境；之后要是用于上线的话可以配置到上线的那个目录之下

