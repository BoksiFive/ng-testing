// Actual implementation of todo service with constructor injection
export class TodoService {
  constructor(private fetch = window.fetch.bind(window)) {}

  public async getTodos(): Promise<string[]> {
    const response = await this.fetch('/todos');
    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  }
}

const todos = [
  'shop groceries',
  'mow the lawn',
  'take the cat to the vet'
];

describe('TodoService using fetch', () => {
  it('gets the to-dos success', async () => {
    // Arrange
    const okResponse = new Response(JSON.stringify(todos), {
      status: 200,
      statusText: 'ok',
    });
    const fetchSpy = jasmine.createSpy('fetch')
      .and.returnValue(okResponse);
    const todoService = new TodoService(fetchSpy);

    // Act
    const actualTodos = await todoService.getTodos();

    // Assert
    expect(actualTodos).toEqual(todos);
    expect(fetchSpy).toHaveBeenCalledWith('/todos');
  });

  it('gets the to-dos error', async () => {
    // Arrange
    const errorResponse = new Response('Not Found', {
      status: 404,
      statusText: 'Not Found',
    });
    const fetchSpy = jasmine.createSpy('fetch')
      .and.returnValue(errorResponse);
    const todoService = new TodoService(fetchSpy);

    // Act
    try {
      await todoService.getTodos();
    } catch(err) {
      expect(err).toEqual(new Error('HTTP error: 404 Not Found'))
    }

    expect(fetchSpy).toHaveBeenCalledWith('/todos');
  });
});