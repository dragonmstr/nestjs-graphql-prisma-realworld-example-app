import { Test, TestingModule } from '@nestjs/testing';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';

jest.mock('./user.repository');

describe('UserService', () => {
    let service: UserService;
    let repository: jest.Mocked<UserRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, UserRepository],
        }).compile();

        service = module.get(UserService);
        repository = module.get(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    it('find one user', async () => {
        await service.findUnique({ userId: 'u' });
        expect(repository.findUnique).toHaveBeenCalledWith({
            where: { userId: 'u' },
        });
    });

    it('follow should call connect if value is true', async () => {
        await service.follow({ userId: 'u' }, { userId: '1' }, true);
        const args = repository.update.mock.calls.pop();
        expect(args?.[0].data?.followers?.connect).toEqual({ userId: '1' });
    });

    it('follow should call disconnect if value is false', async () => {
        await service.follow({ userId: 'u' }, { userId: '2' }, false);
        const args = repository.update.mock.calls.pop();
        expect(args?.[0].data?.followers?.disconnect).toEqual({ userId: '2' });
    });
});
