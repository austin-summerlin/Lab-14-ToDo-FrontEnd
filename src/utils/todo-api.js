import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signup')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function logIn(credentials) {
  const response = await request
    .post('/api/auth/signin')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function addTodo(credentials){
  const response = await request
    .post('/api/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;

}

export async function getTodo(){
  const response = await request
    .get('/api/me/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function deleteTodo(){
  const response = await request
    .delete('/api/todos/:id')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function updateTodo(id) {
  
  const response = await request
    .put(`/api/todos/${id}/completed`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;

}


