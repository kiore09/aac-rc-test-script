import tap from 'tap';
import fastify from 'fastify';
import getUsersRoute from '../../routes/users';
import User from '../../models/user';

const registeredUsers = [
  new User(1, "user-1", "tester-1"),
  new User(2, "user-2", "tester-2"),
  new User(3, "user-3", "tester-3"),
  new User(4, "user-4", "tester-4"),
  new User(5, "user-5", "tester-5"),
];

let server;

tap.beforeEach(() => {
  server = fastify();
  server.register(getUsersRoute);
  server.decorate('users', {
    getUsers: () => registeredUsers,
    getUserById: (id: number) => registeredUsers.find(user => user.userId === id),
  });
});

tap.test('GET `/users` route', async (t) => {
  // route '/users' is derived from folder structure
  const response = await server.inject({
    method: 'GET',
    url: '/'
  });

  t.equal(response.statusCode, 200);
  t.same(JSON.parse(response.payload), registeredUsers);
});

