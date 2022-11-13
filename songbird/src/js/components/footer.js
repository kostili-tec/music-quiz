export const createFooter = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const blur = document.createElement('div');
  blur.classList.add('footer-blur');

  const author = document.createElement('a');
  author.classList.add('footer-author');
  author.textContent = '@kostili-tec';
  author.href = 'https://github.com/kostili-tec';

  const date = document.createElement('p');
  date.classList.add('footer-date');
  date.textContent = '2022';

  const course = document.createElement('a');
  course.classList.add('footer-course');
  course.href = 'https://rs.school/js/';
  const imgRS = document.createElement('img');
  imgRS.src = 'https://rs.school/images/rs_school_js.svg';

  course.append(imgRS);

  footer.append(blur, author, date, course);
  return footer;
}

export const addFooter = () => {
  document.body.append(createFooter());
}