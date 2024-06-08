import follower from '../followers/mysql';

describe('Follower Unit Tests', () => {

    test('should get all followers', async () => {
        
        const result = await follower.getAll();
        expect(result).not.toBeNull();
        expect(result.length).toBeGreaterThan(0);
    });
});
