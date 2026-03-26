import * as migration_20260322_184027 from './20260322_184027';
import * as migration_20260324_image_optimizer from './20260324_image_optimizer';
import * as migration_20260325_remove_image_optimizer from './20260325_remove_image_optimizer';
import * as migration_20260326_202206 from './20260326_202206';

export const migrations = [
  {
    up: migration_20260322_184027.up,
    down: migration_20260322_184027.down,
    name: '20260322_184027',
  },
  {
    up: migration_20260324_image_optimizer.up,
    down: migration_20260324_image_optimizer.down,
    name: '20260324_image_optimizer',
  },
  {
    up: migration_20260325_remove_image_optimizer.up,
    down: migration_20260325_remove_image_optimizer.down,
    name: '20260325_remove_image_optimizer',
  },
  {
    up: migration_20260326_202206.up,
    down: migration_20260326_202206.down,
    name: '20260326_202206'
  },
];
