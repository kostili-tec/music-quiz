const createLi = (text) => {
  const li = document.createElement('li');
  const spanLi = document.createElement('span');
  spanLi.textContent = text;
  li.append(spanLi);
  return li;
}

const createListBirds = () => {
  const namesArr = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'];
  const navContainer = document.createElement('div');
  navContainer.classList.add('birds-container');
  const ul = document.createElement('ul');
  ul.classList.add('nav-birds__ul');

  namesArr.forEach((el) => ul.append(createLi(el)));
  return ul;
}

export const createGame = () => {
  const main = document.createElement('main');
  main.classList.add('main');
  const navContainer = document.createElement('div');
  navContainer.classList.add('birds-container');
  navContainer.append(createListBirds());

  main.append(navContainer);
  document.body.append(main);
}
