import { BranchEntity } from '@src/modules/branch/branch.entity';
import { LevelEntity } from '@src/modules/level/level.entity';
import { PositionEntity } from '@src/modules/position/position.entity';
import { UserEntity } from '@src/modules/user/user.entity';
import { UserTypeEntity } from '@src/modules/UserType/userType.entity';

import AppUtil from 'src/common/utils';
import { dataSource } from '../../../ormconfig';

async function seedData() {
  await dataSource.initialize();

  const branchRepository = dataSource.getRepository(BranchEntity);
  const positionRepository = dataSource.getRepository(PositionEntity);
  const levelRepository = dataSource.getRepository(LevelEntity);
  const userTypeRepository = dataSource.getRepository(UserTypeEntity);
  const userRepository = dataSource.getRepository(UserEntity);

  const branches = [
    { name: 'QN', displayName: 'Quy Nhon' },
    { name: 'DN', displayName: 'Da Nang' },
  ];
  for (const branch of branches) {
    const exists = await branchRepository.findOneBy({ name: branch.name });
    if (!exists) {
      await branchRepository.save(branchRepository.create(branch));
    }
  }

  const positions = [{ name: 'Dev' }, { name: 'Admin' }];
  for (const position of positions) {
    const exists = await positionRepository.findOneBy({ name: position.name });
    if (!exists) {
      await positionRepository.save(positionRepository.create(position));
    }
  }

  const levels = [{ name: 'Intern' }, { name: 'Fresher' }];
  for (const level of levels) {
    const exists = await levelRepository.findOneBy({ name: level.name });
    if (!exists) {
      await levelRepository.save(levelRepository.create(level));
    }
  }

  const userTypes = [{ name: 'userTypes 1' }, { name: 'userTypes 2' }];
  for (const userType of userTypes) {
    const exists = await userTypeRepository.findOneBy({ name: userType.name });
    if (!exists) {
      await userTypeRepository.save(userTypeRepository.create(userType));
    }
  }

  const users = [
    {
      firstName: 'Admin',
      email: 'admin@it.com',
      password: 'admin123',
      sex: 0,
      branch: 'DN',
      position: 'Admin',
      level: 'Intern',
      userType: 'userTypes 1',
    },
    {
      firstName: 'VanHoa',
      email: 'vanhoa@it.com',
      password: '123456',
      sex: 0,
      branch: 'QN',
      position: 'Dev',
      level: 'Fresher',
      userType: 'userTypes 1',
    },
  ];

  for (const user of users) {
    const exists = await userRepository.findOneBy({ email: user.email });
    if (!exists) {
      const branch = await branchRepository.findOneBy({ name: user.branch });
      const position = await positionRepository.findOneBy({
        name: user.position,
      });
      const level = await levelRepository.findOneBy({ name: user.level });
      const userType = await userTypeRepository.findOneBy({
        name: user.userType,
      });

      if (!branch || !position || !level || !userType) {
        console.error(
          ` Branch/position/level/userType not found for user: ${user.email}`,
        );
        continue;
      }
      const hashedPassword = AppUtil.generateHash(user.password);
      const newUser = userRepository.create({
        firstName: user.firstName,
        email: user.email,
        password: hashedPassword,
        sex: user.sex,
        branch: { id: branch.id },
        position: { id: position.id },
        level: { id: level.id },
        type: { id: userType.id },
      });

      await userRepository.save(newUser);
    }
  }

  console.log('Seed data inserted!');
  //   await dataSource.destroy();
}

seedData().catch((error) => {
  console.error('Seeding failed:', error);
  dataSource.destroy();
});
