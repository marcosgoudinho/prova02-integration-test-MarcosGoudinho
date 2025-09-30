const pactum = require('pactum');

describe('API JSONPlaceholder - PactumJS', () => {

  it('Deve retornar lista de posts', async () => {
    await pactum.spec()
      .get('https://jsonplaceholder.typicode.com/posts')
      .expectStatus(200)
      .expectJsonLike([
        { userId: 1 }
      ]);
  });

  it('Deve retornar um post pelo id', async () => {
    await pactum.spec()
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .expectStatus(200)
      .expectJsonMatch({ id: 1 });
  });

  it('Deve retornar 404 para post inexistente', async () => {
    await pactum.spec()
      .get('https://jsonplaceholder.typicode.com/posts/99999')
      .expectStatus(404);
  });

  it('Deve criar um novo post', async () => {
    await pactum.spec()
      .post('https://jsonplaceholder.typicode.com/posts')
      .withJson({ title: 'Teste', body: 'Corpo do post', userId: 1 })
      .expectStatus(201)
      .expectJsonLike({ title: 'Teste', body: 'Corpo do post', userId: 1 });
  });

  it('Deve criar post mesmo com campos faltando', async () => {
    await pactum.spec()
      .post('https://jsonplaceholder.typicode.com/posts')
      .withJson({ title: 'Somente título' })
      .expectStatus(201)
      .expectJsonLike({ title: 'Somente título' });
  });

  it('Deve atualizar um post existente', async () => {
    await pactum.spec()
      .put('https://jsonplaceholder.typicode.com/posts/1')
      .withJson({ title: 'Atualizado', body: 'Novo corpo', userId: 1 })
      .expectStatus(200)
      .expectJsonLike({ title: 'Atualizado', body: 'Novo corpo', userId: 1 });
  });

  it('Deve atualizar parcialmente um post', async () => {
    await pactum.spec()
      .patch('https://jsonplaceholder.typicode.com/posts/1')
      .withJson({ title: 'Parcial' })
      .expectStatus(200)
      .expectJsonLike({ title: 'Parcial' });
  });

  it('Deve deletar um post existente', async () => {
    await pactum.spec()
      .delete('https://jsonplaceholder.typicode.com/posts/1')
      .expectStatus(200)
      .expectJsonLike({});
  });

  it('Deve retornar um usuário pelo id', async () => {
    await pactum.spec()
      .get('https://jsonplaceholder.typicode.com/users/1')
      .expectStatus(200)
      .expectJsonMatch({ id: 1 });
  });

});