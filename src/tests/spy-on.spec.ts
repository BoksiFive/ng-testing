// Actual implementation of todo service without constructor injection
export class TodoService {
  constructor() {}

  public async getTodos(): Promise<string[]> {
    const response = await fetch('/todos');
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
    spyOn(window, "fetch").and.returnValue(Promise.resolve(okResponse))
    const todoService = new TodoService();

    // Act
    const actualTodos = await todoService.getTodos();

    // Assert
    expect(actualTodos).toEqual(todos);
    expect(window.fetch).toHaveBeenCalledWith('/todos');
  });

  it('gets the to-dos error', async () => {
    // Arrange
    const errorResponse = new Response('Not Found', {
      status: 404,
      statusText: 'Not Found',
    });
    spyOn(window, "fetch").and.returnValue(Promise.resolve(errorResponse))
    const todoService = new TodoService();


    // Act
    try {
      await todoService.getTodos();
    } catch(err) {
      expect(err).toEqual(new Error('HTTP error: 404 Not Found'))
    }

    expect(window.fetch).toHaveBeenCalledWith('/todos');
  });
});