import { ModuleMapNgFactoryLoader, MODULE_MAP } from '@nguniversal/module-map-ngfactory-loader';
import { AppServerModuleNgFactory, LAZY_MODULE_MAP } from './dist/login/server/main';
import { from } from 'rxjs';

export const MODULE_MAP = LAZY_MODULE_MAP;
